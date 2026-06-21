import os
import sys
import uuid
import json
import urllib.request
import threading
import webview
from flask import Flask, request, jsonify, send_from_directory, render_template_string
from audio_engine import AudioProcessingEngine

# Check if application is running as a bundled executable
if getattr(sys, 'frozen', False):
    # PyInstaller unpacks data files to sys._MEIPASS
    BASE_DIR = sys._MEIPASS
    EXE_DIR = os.path.dirname(sys.executable)
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    EXE_DIR = BASE_DIR

app = Flask(__name__,
            static_folder=os.path.join(BASE_DIR, 'static'),
            template_folder=os.path.join(BASE_DIR, 'templates'))

# Directory paths for user files (uploads/outputs must be writeable next to the exe)
UPLOAD_FOLDER = os.path.join(EXE_DIR, 'temp_uploads')
OUTPUT_FOLDER = os.path.join(EXE_DIR, 'temp_outputs')

# Default path for the bundled model
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'gtcrn_simple.onnx')
MODEL_URL = "https://github.com/k2-fsa/sherpa-onnx/releases/download/speech-enhancement-models/gtcrn_simple.onnx"

# Ensure writeable directories exist
for folder in [UPLOAD_FOLDER, OUTPUT_FOLDER]:
    os.makedirs(folder, exist_ok=True)

# Audio processing engine
audio_engine = AudioProcessingEngine(model_path=MODEL_PATH)

def download_model():
    """Downloads the GTCRN model if it doesn't exist."""
    global MODEL_PATH
    if not os.path.exists(MODEL_PATH):
        # If we are frozen and the model is missing, sys._MEIPASS is read-only,
        # so we download to a writeable directory next to the EXE
        if getattr(sys, 'frozen', False):
            alt_model_dir = os.path.join(EXE_DIR, 'models')
            os.makedirs(alt_model_dir, exist_ok=True)
            MODEL_PATH = os.path.join(alt_model_dir, 'gtcrn_simple.onnx')
            audio_engine.model_path = MODEL_PATH
            if os.path.exists(MODEL_PATH):
                return
        
        print("----------------------------------------------------------------")
        print(f"Downloading pre-trained GTCRN model (approx. 25MB)...")
        print("Please wait, this will only happen once.")
        print("----------------------------------------------------------------")
        try:
            def progress(block_num, block_size, total_size):
                downloaded = block_num * block_size
                percent = min(100, (downloaded * 100) / total_size)
                print(f"\rDownloading: {percent:.1f}% ({downloaded / (1024*1024):.2f}MB / {total_size / (1024*1024):.2f}MB)", end="")

            urllib.request.urlretrieve(MODEL_URL, MODEL_PATH, progress)
            print("\nDownload complete! Model saved successfully.")
        except Exception as e:
            print(f"\nError downloading model: {e}")
            print("AI denoising might be unavailable. Other DSP enhancements will still work.")

@app.route('/')
def index():
    template_path = os.path.join(BASE_DIR, 'templates', 'index.html')
    if os.path.exists(template_path):
        with open(template_path, 'r', encoding='utf-8') as f:
            return render_template_string(f.read())
    return "Error: index.html template not found.", 404

# Serve uploaded files for playback
@app.route('/temp_uploads/<filename>')
def serve_upload(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# Serve processed files for playback/download
@app.route('/temp_outputs/<filename>')
def serve_output(filename):
    return send_from_directory(OUTPUT_FOLDER, filename)

# Core API Endpoint for processing
@app.route('/api/enhance', methods=['POST'])
def enhance_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file uploaded'}), 400

    file = request.files['audio']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Parse settings
    settings_str = request.form.get('settings', '{}')
    try:
        settings = json.loads(settings_str)
    except Exception:
        settings = {}

    file_id = str(uuid.uuid4())
    _, ext = os.path.splitext(file.filename)
    if not ext:
        ext = '.wav'
    
    input_filename = f"input_{file_id}{ext}"
    output_filename = f"enhanced_{file_id}.wav"

    input_path = os.path.join(UPLOAD_FOLDER, input_filename)
    output_path = os.path.join(OUTPUT_FOLDER, output_filename)

    try:
        file.save(input_path)
        print(f"File uploaded: {input_filename}")

        # Run audio engine processing
        success = audio_engine.process(input_path, output_path, settings)

        if not success:
            return jsonify({'error': 'Audio processing failed'}), 500

        return jsonify({
            'original_url': f'/temp_uploads/{input_filename}',
            'enhanced_url': f'/temp_outputs/{output_filename}'
        })

    except Exception as e:
        print(f"Error processing audio: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

def start_flask():
    print("Starting local Flask backend...")
    # use_reloader=False is mandatory when running Flask in a non-main thread
    app.run(host='127.0.0.1', port=5000, debug=False, use_reloader=False)

if __name__ == '__main__':
    # Start download of model if it doesn't exist
    download_model()

    # Start Flask server on a background daemon thread
    t = threading.Thread(target=start_flask)
    t.daemon = True
    t.start()

    # Open local web app inside a native webview window
    webview.create_window(
        title='FaizanKiAwaz',
        url='http://127.0.0.1:5000',
        width=1200,
        height=850,
        resizable=True
    )
    
    print("Launching FaizanKiAwaz Desktop UI...")
    webview.start()
