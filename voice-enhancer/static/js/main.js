document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const fileInfoBox = document.getElementById('file-info-box');
    const fileNameEl = document.getElementById('file-name');
    const fileSizeEl = document.getElementById('file-size');
    const removeFileBtn = document.getElementById('remove-file');
    const enhanceBtn = document.getElementById('enhance-btn');
    
    // Preset Selector
    const presetSelect = document.getElementById('preset-select');

    // Toggles & Sliders
    const aiDenoiseToggle = document.getElementById('ai-denoise');
    const aiMixSlider = document.getElementById('ai-mix');
    const valAiMix = document.getElementById('val-ai-mix');
    const aiMixContainer = document.getElementById('ai-mix-container');

    const dspDenoiseToggle = document.getElementById('dsp-denoise');
    const rumbleCutToggle = document.getElementById('rumble-cut');
    const warmthBoostToggle = document.getElementById('warmth-boost');
    
    const deesserToggle = document.getElementById('deesser-toggle');
    const deesserSlider = document.getElementById('deesser-strength');
    const valDeesser = document.getElementById('val-deesser');
    const deesserSliderContainer = document.getElementById('deesser-slider-container');

    const compressorSlider = document.getElementById('compressor-strength');
    const valCompressor = document.getElementById('val-compressor');

    const volumeSlider = document.getElementById('volume-boost');
    const valVolume = document.getElementById('val-volume');

    const presenceSlider = document.getElementById('presence-boost');
    const valPresence = document.getElementById('val-presence');

    const airSlider = document.getElementById('air-boost');
    const valAir = document.getElementById('val-air');

    // UI States
    const emptyState = document.getElementById('empty-state');
    const processingState = document.getElementById('processing-state');
    const previewContainer = document.getElementById('preview-container');
    const downloadArea = document.getElementById('download-area');
    const downloadBtn = document.getElementById('download-btn');

    // WaveSurfer Instances
    let wavesurferOriginal = null;
    let wavesurferEnhanced = null;
    let selectedFile = null;

    // --- Preset Definitions ---
    const presets = {
        youtube: {
            ai_denoise: true,
            ai_mix: 90,
            dsp_denoise: false,
            rumble_cut: true,
            deesser_toggle: true,
            deesser_strength: 70,
            warmth_boost: true,
            presence_boost: 45,        // +4.5 dB
            air_boost: 50,             // +5.0 dB
            compressor_strength: 60,
            volume_boost: 40           // +4.0 dB
        },
        studio: {
            ai_denoise: true,
            ai_mix: 75,
            dsp_denoise: false,
            rumble_cut: true,
            deesser_toggle: true,
            deesser_strength: 50,
            warmth_boost: false,
            presence_boost: 20,        // +2.0 dB
            air_boost: 30,             // +3.0 dB
            compressor_strength: 40,
            volume_boost: 20           // +2.0 dB
        },
        noisy: {
            ai_denoise: true,
            ai_mix: 100,
            dsp_denoise: true,
            rumble_cut: true,
            deesser_toggle: true,
            deesser_strength: 80,
            warmth_boost: true,
            presence_boost: 55,        // +5.5 dB
            air_boost: 20,             // +2.0 dB
            compressor_strength: 70,
            volume_boost: 50           // +5.0 dB
        },
        natural: {
            ai_denoise: true,
            ai_mix: 80,
            dsp_denoise: false,
            rumble_cut: true,
            deesser_toggle: true,
            deesser_strength: 40,
            warmth_boost: true,
            presence_boost: 15,        // +1.5 dB
            air_boost: 15,             // +1.5 dB
            compressor_strength: 30,
            volume_boost: 15           // +1.5 dB
        },
        asmr: {
            ai_denoise: true,
            ai_mix: 85,
            dsp_denoise: false,
            rumble_cut: true,
            deesser_toggle: true,
            deesser_strength: 60,
            warmth_boost: false,
            presence_boost: 30,        // +3.0 dB
            air_boost: 70,             // +7.0 dB
            compressor_strength: 80,
            volume_boost: 60           // +6.0 dB
        }
    };

    // --- Dynamic Slider UI Bindings ---

    // 1. AI Denoise Blend
    aiDenoiseToggle.addEventListener('change', () => {
        aiMixContainer.style.opacity = aiDenoiseToggle.checked ? '1' : '0.4';
        aiMixSlider.disabled = !aiDenoiseToggle.checked;
    });
    aiMixSlider.addEventListener('input', (e) => {
        valAiMix.textContent = e.target.value + '%';
    });

    // 2. Vocal Compressor
    compressorSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (val === 0) {
            valCompressor.textContent = 'Disabled';
        } else if (val <= 30) {
            valCompressor.textContent = val + '% (Low)';
        } else if (val <= 70) {
            valCompressor.textContent = val + '% (Medium)';
        } else {
            valCompressor.textContent = val + '% (High)';
        }
    });

    // 3. Volume Level Boost
    volumeSlider.addEventListener('input', (e) => {
        const db = (parseInt(e.target.value, 10) / 10).toFixed(1);
        valVolume.textContent = db === '0.0' ? '0.0 dB (Flat)' : `+${db} dB`;
    });

    // 4. De-esser
    deesserToggle.addEventListener('change', () => {
        deesserSliderContainer.style.opacity = deesserToggle.checked ? '1' : '0.4';
        deesserSlider.disabled = !deesserToggle.checked;
    });
    deesserSlider.addEventListener('input', (e) => {
        valDeesser.textContent = e.target.value + '%';
    });

    // 5. Vocal Presence EQ
    presenceSlider.addEventListener('input', (e) => {
        const db = (parseInt(e.target.value, 10) / 10).toFixed(1);
        valPresence.textContent = db === '0.0' ? '0.0 dB (Flat)' : `+${db} dB`;
    });

    // 6. Studio Air EQ
    airSlider.addEventListener('input', (e) => {
        const db = (parseInt(e.target.value, 10) / 10).toFixed(1);
        valAir.textContent = db === '0.0' ? '0.0 dB (Flat)' : `+${db} dB`;
    });

    // --- Preset Application Logic ---
    function applyPreset(presetKey) {
        const preset = presets[presetKey];
        if (!preset) return;

        // Temporarily disable custom-override listener
        isApplyingPreset = true;

        aiDenoiseToggle.checked = preset.ai_denoise;
        aiMixSlider.value = preset.ai_mix;
        dspDenoiseToggle.checked = preset.dsp_denoise;
        rumbleCutToggle.checked = preset.rumble_cut;
        deesserToggle.checked = preset.deesser_toggle;
        deesserSlider.value = preset.deesser_strength;
        warmthBoostToggle.checked = preset.warmth_boost;
        presenceSlider.value = preset.presence_boost;
        airSlider.value = preset.air_boost;
        compressorSlider.value = preset.compressor_strength;
        volumeSlider.value = preset.volume_boost;

        // Trigger updates manually to redraw values & layouts
        dispatchEvents();
        
        isApplyingPreset = false;
    }

    function dispatchEvents() {
        // Dispatch event triggers so sliders redraw their value text & states
        aiDenoiseToggle.dispatchEvent(new Event('change'));
        aiMixSlider.dispatchEvent(new Event('input'));
        dspDenoiseToggle.dispatchEvent(new Event('change'));
        rumbleCutToggle.dispatchEvent(new Event('change'));
        deesserToggle.dispatchEvent(new Event('change'));
        deesserSlider.dispatchEvent(new Event('input'));
        warmthBoostToggle.dispatchEvent(new Event('change'));
        presenceSlider.dispatchEvent(new Event('input'));
        airSlider.dispatchEvent(new Event('input'));
        compressorSlider.dispatchEvent(new Event('input'));
        volumeSlider.dispatchEvent(new Event('input'));
    }

    let isApplyingPreset = false;

    // Detect user manual tweaks and set selector to "Custom"
    const inputsToWatch = [
        aiDenoiseToggle, aiMixSlider, dspDenoiseToggle, rumbleCutToggle,
        deesserToggle, deesserSlider, warmthBoostToggle, presenceSlider,
        airSlider, compressorSlider, volumeSlider
    ];

    inputsToWatch.forEach(input => {
        const eventType = input.type === 'checkbox' ? 'change' : 'input';
        input.addEventListener(eventType, () => {
            if (!isApplyingPreset) {
                presetSelect.value = 'custom';
            }
        });
    });

    // Preset dropdown listener
    presetSelect.addEventListener('change', (e) => {
        if (e.target.value !== 'custom') {
            applyPreset(e.target.value);
        }
    });

    // Initialize default preset on load (Podcast & YouTube Vocal)
    applyPreset('youtube');

    // --- WaveSurfer & Audio Player Code ---

    // Initialize WaveSurfer
    function initWaveSurfer(containerId, isEnhanced = false) {
        const progressColor = isEnhanced ? '#00bbf9' : '#b5179e';
        const cursorColor = isEnhanced ? '#00f5d4' : '#8a2be2';
        
        return WaveSurfer.create({
            container: containerId,
            waveColor: 'rgba(255, 255, 255, 0.08)',
            progressColor: progressColor,
            cursorColor: cursorColor,
            barWidth: 3,
            barRadius: 3,
            cursorWidth: 1.5,
            height: 80,
            barGap: 3,
            responsive: true,
            normalize: true
        });
    }

    // Drag and Drop handlers
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });

    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    function handleFileSelect(file) {
        if (!file.type.startsWith('audio/') && !file.name.endsWith('.mp3') && !file.name.endsWith('.wav') && !file.name.endsWith('.m4a') && !file.name.endsWith('.ogg')) {
            alert('Please select a valid audio file (.wav, .mp3, .m4a, or .ogg).');
            return;
        }

        selectedFile = file;
        fileNameEl.textContent = file.name;
        fileSizeEl.textContent = formatBytes(file.size);
        
        dropzone.style.display = 'none';
        fileInfoBox.style.display = 'flex';
        enhanceBtn.disabled = false;
        
        emptyState.style.display = 'block';
        previewContainer.style.display = 'none';
        downloadArea.style.display = 'none';
        
        destroyWaveSurfers();
    }

    removeFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedFile = null;
        fileInput.value = '';
        fileInfoBox.style.display = 'none';
        dropzone.style.display = 'block';
        enhanceBtn.disabled = true;
        
        destroyWaveSurfers();
        emptyState.style.display = 'block';
        previewContainer.style.display = 'none';
        downloadArea.style.display = 'none';
    });

    function destroyWaveSurfers() {
        if (wavesurferOriginal) {
            wavesurferOriginal.destroy();
            wavesurferOriginal = null;
        }
        if (wavesurferEnhanced) {
            wavesurferEnhanced.destroy();
            wavesurferEnhanced = null;
        }
    }

    // Process & Enhance
    enhanceBtn.addEventListener('click', async () => {
        if (!selectedFile) return;

        // Show loading state
        emptyState.style.display = 'none';
        previewContainer.style.display = 'none';
        downloadArea.style.display = 'none';
        processingState.style.display = 'flex';
        enhanceBtn.disabled = true;
        removeFileBtn.disabled = true;

        // Pack JSON options
        const settings = {
            ai_denoise: aiDenoiseToggle.checked,
            ai_mix: parseInt(aiMixSlider.value, 10),
            dsp_denoise: dspDenoiseToggle.checked,
            rumble_cut: rumbleCutToggle.checked,
            deesser_strength: deesserToggle.checked ? parseFloat(deesserSlider.value) / 100.0 : 0.0,
            warmth_boost: warmthBoostToggle.checked,
            presence_boost: parseFloat(presenceSlider.value) / 10.0,
            air_boost: parseFloat(airSlider.value) / 10.0,
            compressor_strength: parseFloat(compressorSlider.value) / 100.0,
            volume_boost: parseFloat(volumeSlider.value) / 10.0,
            normalize: true // Limiter is always on for loudness maximization & clip safety
        };

        const formData = new FormData();
        formData.append('audio', selectedFile);
        formData.append('settings', JSON.stringify(settings));

        try {
            const startTime = performance.now();
            const response = await fetch('/api/enhance', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server error during processing');
            }

            const data = await response.json();
            const endTime = performance.now();
            console.log(`Audio processing took ${((endTime - startTime) / 1000).toFixed(2)} seconds.`);
            
            displayEnhancedAudio(data.original_url, data.enhanced_url);
        } catch (error) {
            alert(`Error enhancing audio: ${error.message}`);
            emptyState.style.display = 'block';
        } finally {
            processingState.style.display = 'none';
            enhanceBtn.disabled = false;
            removeFileBtn.disabled = false;
        }
    });

    function displayEnhancedAudio(originalUrl, enhancedUrl) {
        destroyWaveSurfers();

        emptyState.style.display = 'none';
        previewContainer.style.display = 'block';
        downloadArea.style.display = 'block';
        downloadBtn.href = enhancedUrl;
        downloadBtn.download = `enhanced_${selectedFile.name.split('.')[0]}.wav`;

        // Initialize players
        wavesurferOriginal = initWaveSurfer('#waveform-original', false);
        wavesurferEnhanced = initWaveSurfer('#waveform-enhanced', true);

        // Load files
        wavesurferOriginal.load(originalUrl);
        wavesurferEnhanced.load(enhancedUrl);

        // Bind playback buttons
        setupPlayerControls(wavesurferOriginal, '#btn-play-original', '#time-original');
        setupPlayerControls(wavesurferEnhanced, '#btn-play-enhanced', '#time-enhanced');

        // Playback indicators
        wavesurferOriginal.on('play', () => {
            wavesurferOriginal.container.closest('.waveform-card').classList.add('active');
        });
        wavesurferOriginal.on('pause', () => {
            wavesurferOriginal.container.closest('.waveform-card').classList.remove('active');
        });
        
        wavesurferEnhanced.on('play', () => {
            wavesurferEnhanced.container.closest('.waveform-card').classList.add('active');
        });
        wavesurferEnhanced.on('pause', () => {
            wavesurferEnhanced.container.closest('.waveform-card').classList.remove('active');
        });
    }

    function setupPlayerControls(ws, playBtnId, timeId) {
        const btn = document.querySelector(playBtnId);
        const timeEl = document.querySelector(timeId);

        btn.addEventListener('click', () => {
            ws.playPause();
        });

        ws.on('play', () => {
            btn.innerHTML = '<span class="icon">&#9646;&#9646;</span>'; // Pause icon
        });

        ws.on('pause', () => {
            btn.innerHTML = '<span class="icon">&#9654;</span>'; // Play icon
        });

        ws.on('audioprocess', () => {
            timeEl.textContent = formatTime(ws.getCurrentTime()) + ' / ' + formatTime(ws.getDuration());
        });

        ws.on('ready', () => {
            timeEl.textContent = '0:00 / ' + formatTime(ws.getDuration());
        });
    }

    // Helper: format time in MM:SS
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Helper: format bytes
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
});
