import os
import numpy as np
import soundfile as sf
from scipy.signal import butter, lfilter
import noisereduce as nr
import traceback

class AudioProcessingEngine:
    def __init__(self, model_path=None):
        self.model_path = model_path
        self.enhancer = None

    def load_enhancer(self):
        """Lazy load the Sherpa-ONNX speech enhancer using the correct OfflineSpeechDenoiser class."""
        if self.enhancer is not None:
            return True
        
        if not self.model_path or not os.path.exists(self.model_path):
            print(f"Model path not found: {self.model_path}")
            return False
            
        try:
            import sherpa_onnx
            # 1. Define model config
            gtcrn_config = sherpa_onnx.OfflineSpeechDenoiserGtcrnModelConfig()
            gtcrn_config.model = self.model_path
            
            model_config = sherpa_onnx.OfflineSpeechDenoiserModelConfig()
            model_config.gtcrn = gtcrn_config
            model_config.num_threads = 4
            model_config.provider = "cpu"
            model_config.debug = False
            
            # 2. Define top level config
            config = sherpa_onnx.OfflineSpeechDenoiserConfig()
            config.model = model_config
            
            # 3. Instantiate denoiser
            self.enhancer = sherpa_onnx.OfflineSpeechDenoiser(config)
            print("Successfully loaded OfflineSpeechDenoiser (GTCRN).")
            return True
        except Exception as e:
            print("Failed to load Sherpa-ONNX model:")
            traceback.print_exc()
            return False

    def load_audio(self, file_path, target_sr=16000):
        """Loads an audio file and resamples it. Uses fast soundfile+soxr path with fallback."""
        try:
            import soxr
            # soundfile.read is extremely fast compared to librosa
            data, sr = sf.read(file_path)
            
            # Convert multi-channel (stereo) to mono
            if len(data.shape) > 1:
                data = np.mean(data, axis=1)
                
            # Convert to float32
            data = data.astype(np.float32)
            
            # Resample if sample rate doesn't match target using soxr (C-speed)
            if sr != target_sr:
                data = soxr.resample(data, sr, target_sr)
            print(f"Loaded audio via fast path (soundfile + soxr): {len(data)} samples, {target_sr}Hz")
            return data, target_sr
        except Exception as e:
            print(f"Fast load path failed, falling back to librosa: {e}")
            import librosa
            data, sr = librosa.load(file_path, sr=target_sr)
            return data.astype(np.float32), sr

    def save_audio(self, file_path, samples, sr):
        """Saves audio samples to a WAV file."""
        sf.write(file_path, samples, sr)

    def apply_highpass_filter(self, samples, sr, cutoff=80.0):
        """Applies a high-pass Butterworth filter to remove low-frequency rumble (below 80Hz)."""
        nyq = 0.5 * sr
        normal_cutoff = cutoff / nyq
        b, a = butter(2, normal_cutoff, btype='high', analog=False)
        return lfilter(b, a, samples)

    def apply_deesser(self, samples, sr, deess_strength=0.7):
        """Dynamically suppresses harsh sibilant "s", "sh", "t" sounds in the 5k-8k range."""
        if deess_strength <= 0:
            return samples
            
        nyq = 0.5 * sr
        # 1. Bandpass filter for the sibilance frequency range (5000Hz - 8000Hz)
        low = 5000.0 / nyq
        high = 8000.0 / nyq
        # Limit bands to legal Nyquist limits
        high = min(high, 0.99)
        b, a = butter(2, [low, high], btype='bandpass', analog=False)
        sibilance = lfilter(b, a, samples)
        
        # 2. Get sibilance envelope (smoothed absolute value)
        # Using a low-pass filter at 40Hz to track the sibilant amplitude envelope
        b_lp, a_lp = butter(1, 40.0 / nyq, btype='low', analog=False)
        sib_env = lfilter(b_lp, a_lp, np.abs(sibilance))
        
        # 3. Get overall signal envelope (smoothed absolute value)
        sig_env = lfilter(b_lp, a_lp, np.abs(samples))
        
        # 4. Compare sibilance energy to overall energy
        # Sibilant words have disproportionate energy in high-frequency bands
        ratio = sib_env / (sig_env + 1e-6)
        
        # If high-frequency ratio exceeds threshold (0.35), compress sibilants
        threshold = 0.35
        gain_reduction = np.ones_like(samples)
        
        excess = ratio - threshold
        over_thresh = excess > 0
        
        if np.any(over_thresh):
            # Dynamic reduction factor scaled by de-esser slider strength
            reduction = 1.0 - (excess[over_thresh] * 2.0 * deess_strength)
            # Clip maximum attenuation to -12dB (0.25) to avoid lisping artifacts
            reduction = np.clip(reduction, 0.25, 1.0)
            gain_reduction[over_thresh] = reduction
            
        # Smooth the gain reduction curve at 30Hz to prevent quick volume flutter
        b_sm, a_sm = butter(1, 30.0 / nyq, btype='low', analog=False)
        gain_reduction_smoothed = lfilter(b_sm, a_sm, gain_reduction)
        
        # Split the original signal: Low-mid band (<5kHz) and High band (>5kHz)
        b_hp, a_hp = butter(2, 5000.0 / nyq, btype='high', analog=False)
        highs = lfilter(b_hp, a_hp, samples)
        lows = samples - highs
        
        # Apply the dynamic reduction *only* to the high band and sum them back
        return lows + (highs * gain_reduction_smoothed)

    def apply_vocal_compressor(self, samples, sr, strength=0.5, makeup_db=3.0):
        """
        Dynamically compresses the dynamic range of vocals.
        Smooths volume spikes, lifts quiet details, and makes speech sound punchy and thick.
        - strength: 0.0 to 1.0. Higher values lower threshold and increase compression ratio.
        """
        if strength <= 0:
            makeup_linear = 10 ** (makeup_db / 20.0)
            return samples * makeup_linear

        # Calculate compressor threshold and ratio based on strength slider
        # threshold ranges from -12dB (strength=0) to -30dB (strength=1)
        threshold_db = -12.0 - (strength * 18.0)
        # ratio ranges from 2:1 (strength=0) to 5:1 (strength=1)
        ratio = 2.0 + (strength * 3.0)

        # 1. Compute signal envelope using a 30Hz low-pass filter
        nyq = 0.5 * sr
        b, a = butter(1, 30.0 / nyq, btype='low', analog=False)
        envelope = lfilter(b, a, np.abs(samples))
        
        # Convert envelope to dB scale
        envelope_db = 20 * np.log10(envelope + 1e-6)
        
        # 2. Compute gain reduction curve in dB
        gain_db = np.zeros_like(samples)
        over_threshold = envelope_db > threshold_db
        gain_db[over_threshold] = (threshold_db - envelope_db[over_threshold]) * (1.0 - 1.0 / ratio)
        
        # 3. Smooth the gain reduction curve at 20Hz (attack/release emulation) to avoid crackles
        b_g, a_g = butter(1, 20.0 / nyq, btype='low', analog=False)
        gain_db_smoothed = lfilter(b_g, a_g, gain_db)
        
        # 4. Convert gain reduction to linear scale
        gain_linear = 10 ** (gain_db_smoothed / 20.0)
        
        # 5. Apply compression and makeup gain
        # Plus an additional auto-makeup gain based on compression depth to maintain loudness
        auto_makeup_db = abs(threshold_db + 15) * 0.15 * strength
        total_makeup_db = makeup_db + auto_makeup_db
        makeup_linear = 10 ** (total_makeup_db / 20.0)
        
        print(f"Compressor: Thr={threshold_db:.1f}dB, Ratio={ratio:.1f}:1, Total Makeup={total_makeup_db:.1f}dB")
        return samples * gain_linear * makeup_linear

    def apply_vocal_eq(self, samples, sr, warmth_on=True, presence_db=3.0, air_db=4.0):
        """3-band parametric EQ to add body (warmth), clarity (presence), and sheen (air)."""
        nyq = 0.5 * sr
        out = samples.copy()
        
        # 1. Warmth (150Hz - 300Hz bandpass boost for vocal body/depth)
        if warmth_on:
            low_w = 150.0 / nyq
            high_w = 300.0 / nyq
            b_warm, a_warm = butter(2, [low_w, high_w], btype='bandpass', analog=False)
            warm_band = lfilter(b_warm, a_warm, samples)
            gain_warm = 10 ** (2.0 / 20.0) - 1.0  # +2dB boost
            out += gain_warm * warm_band
            
        # 2. Presence (2.5kHz - 4.5kHz bandpass boost for speech clarity/intelligibility)
        if presence_db > 0:
            low_p = 2500.0 / nyq
            high_p = 4500.0 / nyq
            b_pres, a_pres = butter(2, [low_p, high_p], btype='bandpass', analog=False)
            pres_band = lfilter(b_pres, a_pres, samples)
            gain_pres = 10 ** (presence_db / 20.0) - 1.0
            out += gain_pres * pres_band
            
        # 3. Studio Air (Highpass boost for high-end crispness and sheen)
        if air_db > 0:
            air_freq = min(6500.0, 0.85 * nyq)
            b_air, a_air = butter(2, air_freq / nyq, btype='high', analog=False)
            air_band = lfilter(b_air, a_air, samples)
            gain_air = 10 ** (air_db / 20.0) - 1.0
            out += gain_air * air_band
            
        return out

    def apply_limiter(self, samples, limit_db=-1.0):
        """Loudness Maximizer / Limiter. Caps peaks at -1.0dB to prevent clipping while maximizing volume."""
        target_linear = 10 ** (limit_db / 20.0)
        peak = np.max(np.abs(samples))
        
        if peak > target_linear:
            # Scale down signal so that peak is exactly target_linear (prevent digital clipping)
            factor = target_linear / peak
            samples = samples * factor
            print(f"Limiter: Attenuated peaks by {20 * np.log10(factor):.2f}dB to prevent clipping")
        else:
            # Maximizer: Boost volume of quiet recordings so they peak exactly at target_linear
            if peak > 0:
                factor = target_linear / peak
                # Don't boost by more than +15dB to avoid amplifying low noise floor
                factor = min(factor, 10 ** (15.0 / 20.0))
                samples = samples * factor
                print(f"Limiter/Maximizer: Boosted overall volume by {20 * np.log10(factor):.2f}dB")
        return samples

    def process(self, input_path, output_path, settings):
        """
        Processes an audio file based on user-selected options.
        Settings dict parameters:
        - ai_denoise: bool (run Sherpa-ONNX GTCRN)
        - ai_mix: float (0.0 to 1.0, AI wet/dry mix)
        - dsp_denoise: bool (run noisereduce)
        - rumble_cut: bool (apply 80Hz high-pass filter)
        - deesser_strength: float (0.0 to 1.0, sibilance reduction)
        - warmth_boost: bool (apply vocal body warmth EQ)
        - presence_boost: float (0.0 to 8.0 dB, clarity EQ boost)
        - air_boost: float (0.0 to 8.0 dB, studio sheen EQ boost)
        - compressor_strength: float (0.0 to 1.0, dynamic range compression)
        - volume_boost: float (0.0 to 12.0 dB, additional makeup gain)
        - normalize: bool (apply limiter/maximizer)
        """
        target_sr = 16000
        
        # 1. Load Audio using the fast soundfile+soxr path
        original_samples, sr = self.load_audio(input_path, target_sr=target_sr)
        samples = original_samples.copy()
        
        # 2. Apply AI-Powered Denoising (GTCRN)
        if settings.get('ai_denoise', False):
            if self.load_enhancer():
                try:
                    # Run AI enhancement using OfflineSpeechDenoiser
                    denoised_obj = self.enhancer.run(samples, sr)
                    
                    # Extract list of samples and convert to numpy array
                    cleaned = np.array(denoised_obj.samples, dtype=np.float32)
                    
                    # Blend original and cleaned audio based on the wet/dry mix slider
                    ai_mix = float(settings.get('ai_mix', 100)) / 100.0
                    
                    # Match shapes for blending (STFT boundary padding can cause length difference)
                    min_len = min(len(samples), len(cleaned))
                    samples = (ai_mix * cleaned[:min_len]) + ((1.0 - ai_mix) * samples[:min_len])
                    print(f"AI denoising applied with {ai_mix * 100:.0f}% wet blend. Output length: {min_len} samples.")
                except Exception as e:
                    print(f"Error during AI denoising: {e}")
                    traceback.print_exc()
            else:
                print("Skipping AI denoising because model could not be loaded.")

        # 3. Apply DSP Denoising (Spectral Gating)
        if settings.get('dsp_denoise', False):
            try:
                samples = nr.reduce_noise(y=samples, sr=sr)
                print("DSP spectral noise reduction applied.")
            except Exception as e:
                print(f"Error during DSP noise reduction: {e}")
                traceback.print_exc()

        # 4. Apply Rumble Cut (80Hz High-pass filter)
        if settings.get('rumble_cut', False):
            samples = self.apply_highpass_filter(samples, sr, cutoff=80.0)
            print("Rumble cut filter applied.")

        # 5. Apply Studio De-esser (Sibilance Control)
        deesser_strength = float(settings.get('deesser_strength', 0.0))
        if deesser_strength > 0:
            samples = self.apply_deesser(samples, sr, deess_strength=deesser_strength)
            print(f"De-esser applied with strength: {deesser_strength:.2f}")

        # 6. Apply Three-Band Vocal EQ
        warmth_on = settings.get('warmth_boost', False)
        presence_db = float(settings.get('presence_boost', 0.0))
        air_db = float(settings.get('air_boost', 0.0))
        if warmth_on or presence_db > 0 or air_db > 0:
            samples = self.apply_vocal_eq(samples, sr, warmth_on=warmth_on, presence_db=presence_db, air_db=air_db)
            print(f"Vocal EQ applied: Warmth={warmth_on}, Presence={presence_db}dB, Air={air_db}dB")

        # 7. Apply Vocal Compressor (Dynamic Range Leveler)
        comp_strength = float(settings.get('compressor_strength', 0.0))
        vol_boost_db = float(settings.get('volume_boost', 0.0))
        if comp_strength > 0 or vol_boost_db > 0:
            samples = self.apply_vocal_compressor(samples, sr, strength=comp_strength, makeup_db=vol_boost_db)
            print(f"Vocal Compressor/Leveler applied: Strength={comp_strength:.2f}, Volume Boost={vol_boost_db:.1f}dB")

        # 8. Apply Limiter & Loudness Maximizer (Peak Normalization)
        if settings.get('normalize', True):
            samples = self.apply_limiter(samples, limit_db=-1.0)
            print("Limiter and Volume Maximizer applied.")

        # 9. Save Output WAV
        self.save_audio(output_path, samples, sr)
        print(f"Enhanced output saved to: {output_path}")
        return True
