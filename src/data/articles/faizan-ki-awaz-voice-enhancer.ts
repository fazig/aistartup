import { BlogPost } from "../posts";

export const postFaizanKiAwazVoiceEnhancer: BlogPost = {
  slug: "build-ai-voice-enhancer-tool-faizankiawaz",
  title: "How I Built FaizanKiAwaz: A Professional AI Voice Enhancer Tool in Python",
  description: "Learn how to build a professional-grade AI Voice Enhancer (FaizanKiAwaz) using Python, Flask, PyWebView, and Sherpa-ONNX. Download the source code and get the master prompts to recreate it in the Antigravity IDE.",
  date: new Date().toISOString().split('T')[0],
  readTime: "15 min read",
  category: "AI Tools Development",
  author: "Faizan Arif",
  image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  content: `
  <div class="mb-8">
      <div class="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl mb-8">
          <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/nz57igUDjxU?si=-rkGp8T3i-q1H5zG" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen>
          </iframe>
      </div>
  </div>

  <h2>Introduction to FaizanKiAwaz: The Ultimate AI Voice Enhancer</h2>
  <p>If you're a content creator, podcaster, or video editor, you know how incredibly frustrating bad audio can be. Background noise, low-frequency rumbles, harsh sibilant "S" sounds, and inconsistent volume levels can ruin an otherwise perfect recording. While there are premium VST plugins and expensive software suites available to fix these issues, I wanted to create something completely free, highly effective, and deeply integrated with artificial intelligence. That's how <strong>FaizanKiAwaz</strong> was born.</p>
  
  <p>In this comprehensive, 3,000-word deep dive, I'm going to walk you through exactly how I built this professional-grade AI Voice Enhancer tool. I will explore the architecture, the specific Digital Signal Processing (DSP) algorithms used, the deep learning AI models that power the noise cancellation, and how I packaged it all into a sleek desktop application using web technologies. And the best part? I'm going to give you the exact "Master Prompts" I used so you can recreate this entire tool yourself using the <a href="/blog/ai-tool-hunt" class="text-blue-500 hover:underline">Antigravity IDE or similar AI coding assistants</a>.</p>
  
  <p>By the end of this article, you will not only understand how advanced audio processing works in Python, but you'll also be able to download the complete source code using the ZIP file provided at the bottom of this page.</p>

  <h2>The Vision: Why Build Another Audio Tool?</h2>
  <p>Audio engineering is often seen as a dark art. Getting vocals to sound "punchy," "warm," and "clear" usually requires chaining together multiple plugins: an EQ, a De-Esser, a Compressor, a Limiter, and a Noise Gate. For beginners, dialing in the perfect settings on a compressor (threshold, ratio, attack, release, makeup gain) is overwhelming. My goal was to build a tool that abstracted all this complexity behind simple, intuitive sliders.</p>
  <p>I envisioned a tool where the user could simply check a box for "Studio Air" or adjust a slider for "Warmth," and under the hood, the application would automatically calculate the complex math required to apply a 3-band parametric EQ. Furthermore, with the rise of AI, traditional noise gates (which simply mute audio when it gets quiet) are obsolete. I wanted to integrate a real-time neural network that could distinguish human speech from background noise—whether it's a dog barking, an air conditioner humming, or a keyboard clacking—and remove the noise without degrading the vocal quality.</p>
  
  <p>This vision aligns with the ethos of building <a href="/blog/premium-pizza-delivery-website-ai-prompt" class="text-blue-500 hover:underline">premium, highly-functional applications</a> powered by AI.</p>

  <h2>The Tech Stack: Bridging Web and Desktop</h2>
  <p>To build FaizanKiAwaz, I had to carefully select a technology stack that was powerful enough to handle heavy audio processing, yet flexible enough to provide a beautiful, modern User Interface. Here is the architecture I landed on:</p>
  
  <ul class="list-disc pl-6 mb-6">
      <li><strong>Python Backend</strong>: Python is the undisputed king of AI and scientific computing. It has an incredible ecosystem of audio libraries.</li>
      <li><strong>Flask Framework</strong>: I used Flask to spin up a lightweight local REST API server. This server handles file uploads, routes the audio through the DSP engine, and returns the processed audio URLs.</li>
      <li><strong>Sherpa-ONNX & GTCRN</strong>: For the AI denoising, I utilized the Sherpa-ONNX library running a GTCRN (Gated Temporal Convolutional Recurrent Network) model. This allows for lightning-fast, offline speech enhancement.</li>
      <li><strong>SciPy & NoiseReduce</strong>: For traditional DSP (EQ, Filtering, Limiting), I used SciPy to design digital Butterworth filters.</li>
      <li><strong>HTML, CSS, Vanilla JavaScript</strong>: The frontend is built using standard web technologies for ultimate styling control.</li>
      <li><strong>PyWebView</strong>: To make this feel like a native application rather than a website, I wrapped the Flask server and the web frontend inside a Chromium-based desktop window using PyWebView.</li>
      <li><strong>PyInstaller</strong>: Finally, to distribute the app, I used PyInstaller to bundle everything (Python interpreter, dependencies, and HTML files) into a single, executable <code>.exe</code> file for Windows.</li>
  </ul>

  <h2>Deep Dive into the Audio Engine (<code>audio_engine.py</code>)</h2>
  <p>The heart of FaizanKiAwaz is the <code>audio_engine.py</code> file. This script is a masterclass in sequential audio processing. Audio must be processed in a very specific order to achieve professional results. If you compress before you EQ, or if you De-Ess after you boost the high frequencies, you will amplify the worst parts of your audio. Here is the exact pipeline the tool follows:</p>

  <h3>Step 1: Fast Resampling and Normalization</h3>
  <p>When a user uploads an audio file (WAV, MP3, M4A), it must be converted into a raw array of floating-point numbers. I initially used <code>librosa</code>, but found it too slow for large files. I optimized the pipeline by using the <code>soundfile</code> library combined with <code>soxr</code> (a C-level resampling library). The audio is forcefully converted to mono and resampled to 16,000 Hz, which is the required sample rate for the AI Denoising model.</p>

  <h3>Step 2: AI Denoising (GTCRN Model)</h3>
  <p>This is where the magic happens. The engine loads the <code>gtcrn_simple.onnx</code> model using the <code>sherpa_onnx.OfflineSpeechDenoiser</code> class. GTCRN is a state-of-the-art neural network designed specifically to separate speech from noise in the time-frequency domain. It analyzes the spectrogram of the audio, predicts a complex ideal ratio mask, and applies it to filter out everything that isn't human speech. I also added a "Wet/Dry Blend" feature. Sometimes, 100% AI denoising can sound slightly robotic or artificial. By blending 80% of the AI-cleaned audio with 20% of the original audio, you retain the natural timbre of the voice while significantly reducing the room noise.</p>

  <h3>Step 3: Rumble Cut (High-Pass Filter)</h3>
  <p>Even after AI denoising, low-frequency rumbles (like microphone stand bumps, passing trucks, or heavy breathing) can muddy up the mix. I implemented a strict 80Hz High-Pass Butterworth filter using <code>scipy.signal.butter</code>. This mathematically calculates filter coefficients that aggressively roll off any audio frequencies below 80Hz. Since the fundamental frequency of human speech rarely dips below 85Hz, this cleans up the "mud" without affecting the voice.</p>

  <h3>Step 4: The Studio De-Esser</h3>
  <p>Sibilance—those harsh "S" and "Sh" sounds—can pierce the listener's ears, especially if the speaker was too close to the microphone. Building a De-Esser from scratch in Python was one of the most challenging parts of this project. It requires dynamic equalization. Here is how I built it:</p>
  <ol class="list-decimal pl-6 mb-6">
      <li><strong>Bandpass Isolation</strong>: I created a bandpass filter that isolates frequencies between 5,000 Hz and 8,000 Hz.</li>
      <li><strong>Envelope Tracking</strong>: I calculate the amplitude envelope of this high-frequency band, and compare it to the amplitude envelope of the entire signal.</li>
      <li><strong>Dynamic Gain Reduction</strong>: If the high-frequency energy suddenly spikes relative to the rest of the audio (meaning the person just said an "S"), the algorithm automatically calculates a gain reduction curve. This acts as a targeted compressor that rapidly ducks the volume of those specific high frequencies for a fraction of a second, preventing ear-piercing sibilance.</li>
  </ol>

  <h3>Step 5: Three-Band Vocal EQ</h3>
  <p>With the noise and harshness removed, it's time to shape the tone. The Vocal EQ module applies three distinct parametric EQ bands based on user toggles:</p>
  <ul class="list-disc pl-6 mb-6">
      <li><strong>Warmth (150Hz - 300Hz)</strong>: A broad boost in the low-mid frequencies to give the voice a rich, radio-broadcaster depth.</li>
      <li><strong>Presence (2.5kHz - 4.5kHz)</strong>: The human ear is most sensitive in this range. A slight boost here vastly improves speech intelligibility and helps the voice cut through a mix.</li>
      <li><strong>Studio Air (>6.5kHz)</strong>: A high-shelf boost that adds a crisp, expensive-sounding "sheen" to the top end of the vocal recording.</li>
  </ul>

  <h3>Step 6: Dynamic Vocal Compressor</h3>
  <p>Untrained speakers constantly change their distance from the microphone, resulting in fluctuating volume levels. The custom compressor I built tracks the RMS envelope of the audio using a 30Hz low-pass filter. When the volume exceeds a dynamically calculated threshold, it applies a mathematical ratio to reduce the gain. I programmed "Auto-Makeup Gain" so that as the compressor squashes the audio, the overall volume is pushed back up, ensuring quiet whispers become audible and loud shouts don't clip.</p>

  <h3>Step 7: Limiter and Volume Maximizer</h3>
  <p>The final stage of the audio pipeline is the Limiter. In digital audio, exceeding 0.0dBFS results in harsh, destructive clipping distortion. The limiter scans the entire processed array of audio samples, finds the absolute maximum peak, and mathematically scales the entire file down so the highest peak hits exactly -1.0dB. Conversely, if the recording is incredibly quiet, it acts as a Maximizer, multiplying all the samples until the highest peak reaches -1.0dB. This guarantees your final output is perfectly broadcast-ready.</p>

  <h2>The Desktop Wrapper: PyWebView</h2>
  <p>While having a powerful Python script is great, asking end-users to run terminal commands is not ideal. I wanted a modern GUI. Traditional Python UI frameworks like Tkinter or PyQt look outdated and are incredibly difficult to style beautifully.</p>
  <p>This is why I chose <strong>Flask + PyWebView</strong>. By running Flask in a background daemon thread, I can serve standard HTML, CSS, and JS. The <code>webview.create_window()</code> function simply opens a native desktop window pointing to <code>http://127.0.0.1:5000</code>. This allows me to use modern web design techniques—glassmorphism, CSS grid, smooth transition animations, and dark mode interfaces—while leveraging Python's raw processing power underneath. This approach is similar to Electron, but much more lightweight because it uses the operating system's native rendering engine (Edge/Chromium on Windows, WebKit on macOS) instead of bundling an entire browser.</p>

  <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Audio Waveform Visualization" class="w-full rounded-2xl shadow-xl my-8 border border-gray-200 dark:border-gray-800" />

  <h2>Recreating FaizanKiAwaz: The Master Prompts</h2>
  <p>One of the most powerful things about modern AI coding assistants like the Antigravity IDE or Cursor is that you don't necessarily need to be a senior software engineer to build complex applications. You just need to know how to prompt the AI effectively. Below, I am providing the exact "Master Prompts" you can use to reconstruct the FaizanKiAwaz application from scratch.</p>
  
  <p>If you enjoy building advanced tools with AI, you might also want to read my guide on <a href="/blog/ai-free-animation-video-generator" class="text-blue-500 hover:underline">building an AI free animation video generator</a>.</p>

  <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl my-6 border-l-4 border-blue-500">
      <h4 class="text-xl font-bold mb-4">Prompt 1: Project Initialization & Audio Engine</h4>
      <code class="block whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-300">
"I want to build a desktop Voice Enhancer application in Python. First, create the core DSP audio engine in a file called 'audio_engine.py'. 

Requirements:
1. Create a class called AudioProcessingEngine.
2. It must load audio files fast using 'soundfile' and 'soxr' (fallback to librosa), converting stereo to mono and resampling to 16000Hz.
3. Integrate AI Denoising using 'sherpa-onnx' OfflineSpeechDenoiser and the GTCRN model. Add a wet/dry blend slider parameter.
4. Add traditional DSP using 'scipy.signal':
   - A Rumble Cut: 80Hz High-Pass Butterworth filter.
   - A De-esser: Dynamically suppress 5k-8kHz sibilance by tracking amplitude envelopes.
   - A 3-Band Parametric EQ for Warmth (150-300Hz boost), Presence (2.5k-4.5kHz boost), and Air (>6.5kHz high-shelf).
   - A Vocal Compressor: Track RMS with a 30Hz low-pass filter, apply dynamic gain reduction based on a strength parameter, and add auto-makeup gain.
   - A Limiter: Ensure peaks never exceed -1.0dB by scaling the numpy array.
5. Provide a master 'process()' method that applies these steps sequentially based on a settings dictionary and saves the output to a WAV file."
      </code>
  </div>

  <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl my-6 border-l-4 border-blue-500">
      <h4 class="text-xl font-bold mb-4">Prompt 2: The Flask Backend and PyWebView Wrapper</h4>
      <code class="block whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-300">
"Now, build the main application wrapper in 'app.py'.

Requirements:
1. Setup a Flask application that serves static files from a 'static' directory and templates from a 'templates' directory.
2. Create endpoints to serve uploaded audio files ('/temp_uploads/') and processed audio files ('/temp_outputs/').
3. Create a POST endpoint '/api/enhance' that accepts an audio file and a JSON string of settings. It should save the file, call the AudioProcessingEngine's process() method, and return the URLs of the original and enhanced audio files.
4. Implement an automatic downloader for the 'gtcrn_simple.onnx' model via urllib so the user doesn't have to download it manually.
5. Use 'pywebview' to open a native desktop window pointing to the local Flask server on port 5000. Run the Flask server in a daemon thread so it doesn't block the webview UI. Make sure the window title is 'FaizanKiAwaz' and size is 1200x850."
      </code>
  </div>

  <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl my-6 border-l-4 border-blue-500">
      <h4 class="text-xl font-bold mb-4">Prompt 3: The Frontend UI</h4>
      <code class="block whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-300">
"Finally, generate the frontend interface for the Voice Enhancer.

Requirements:
1. Create an 'index.html' file using modern HTML5. Do not use Tailwind; write clean Vanilla CSS in a 'style.css' file.
2. The UI must have a premium, dark-mode aesthetic with glassmorphism elements, subtle gradients, and smooth hover micro-animations.
3. Include an intuitive drag-and-drop file upload area.
4. Create a settings panel with modern sliders (range inputs) for: AI Denoise Mix, De-esser Strength, Compressor Strength, Presence Boost, and Air Boost.
5. Add toggle switches for AI Denoising, DSP Denoise, Rumble Cut, and Normalize.
6. Write JavaScript in 'main.js' to handle the file upload via FormData, send the AJAX POST request to '/api/enhance', display loading states, and finally show two custom HTML audio players side-by-side so the user can easily compare the Original vs. the Enhanced audio."
      </code>
  </div>

  <h2>Overcoming Challenges During Development</h2>
  <p>Building an audio engine from scratch comes with several mathematical hurdles. For example, implementing the dynamic De-esser initially caused "zipper noise" (audible clicking artifacts). This happened because the gain reduction was changing instantly from sample to sample. To fix this, I had to implement a smoothing filter. By applying a low-pass filter (around 30Hz) to the gain reduction envelope itself, the compressor applies its attenuation smoothly, perfectly mimicking the attack and release times of analog studio hardware.</p>
  
  <p>Another major challenge was packaging the application. PyInstaller is notorious for failing to bundle dynamic libraries and HTML template folders. I had to explicitly handle the <code>sys._MEIPASS</code> directory structure in <code>app.py</code> to ensure that when the <code>.exe</code> is launched, Flask knows exactly where the unpacked <code>index.html</code> and CSS files are temporarily stored.</p>

  <h2>Future Roadmap for FaizanKiAwaz</h2>
  <p>While the current iteration of the tool is incredibly robust, there is always room for improvement. In future updates, I plan to integrate:</p>
  <ul class="list-disc pl-6 mb-6">
      <li><strong>Real-time VST Integration</strong>: Re-compiling the Python DSP logic using C++ and the JUCE framework to release FaizanKiAwaz as an actual VST3 plugin that can be loaded directly into Adobe Premiere, OBS, or FL Studio.</li>
      <li><strong>AI Reverb Removal (De-reverberation)</strong>: Currently, the GTCRN model is fantastic at removing noise, but struggles with heavy room echo. I plan to integrate an additional AI model dedicated entirely to stripping acoustic reflections to make it sound like the audio was recorded in a soundproof vocal booth.</li>
      <li><strong>Batch Processing</strong>: Adding a queue system to the frontend so podcast editors can drag and drop 50 separate audio files and have them all mastered automatically overnight.</li>
  </ul>

  <h2>Download The Source Code</h2>
  <p>As promised, I am open-sourcing the basic code structure of FaizanKiAwaz. You can download the ZIP file containing the Flask backend, the DSP Audio Engine, and the frontend template structure. Note that to keep the download size small, the pre-trained ONNX models are not included in the ZIP file; the script will automatically download them the first time you run it!</p>

  <div class="mt-12 text-center bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
      <h3 class="text-2xl font-bold mb-4">Get The Source Code</h3>
      <p class="mb-6 text-gray-700 dark:text-gray-300">Download the full basic code structure and start experimenting with AI audio enhancement today.</p>
      <a href="/downloads/faizan-ki-awaz.zip" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1" download>
          📥 Download faizan-ki-awaz.zip
      </a>
      <p class="text-sm text-gray-500 mt-4">Requires Python 3.9+. Follow the instructions in the codebase to run.</p>
  </div>
  `
};
