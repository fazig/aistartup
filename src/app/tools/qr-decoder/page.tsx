"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  QrCode, Camera, Upload, Copy, Check, ExternalLink, RefreshCw, AlertCircle, Trash2, ArrowLeft, VideoOff
} from "lucide-react";

export default function QRDecoder() {
  const [libraryLoaded, setLibraryLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "webcam">("upload");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [decodedResult, setDecodedResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Dynamically load the jsQR library from the CDN
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).jsQR) {
        setLibraryLoaded(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";
      script.async = true;
      script.onload = () => {
        setLibraryLoaded(true);
      };
      script.onerror = () => {
        setError("Ah, we couldn't load the QR decoding engine. Please check your internet connection and refresh.");
      };
      document.body.appendChild(script);
    }
  }, []);

  // Clean up webcam stream on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Webcam Scanning continuous loops
  const tick = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current || document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const width = videoRef.current.videoWidth;
        const height = videoRef.current.videoHeight;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(videoRef.current, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const jsQR = (window as any).jsQR;
        if (jsQR) {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          if (code && code.data) {
            setDecodedResult(code.data);
            stopScan();
            return;
          }
        }
      }
    }
    if (streamRef.current && streamRef.current.active) {
      animationFrameId.current = requestAnimationFrame(tick);
    }
  };

  const startScan = async () => {
    setError("");
    setDecodedResult("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true"); // Safari compatibility
        videoRef.current.play();
        setIsScanning(true);
        animationFrameId.current = requestAnimationFrame(tick);
      }
    } catch (err: any) {
      console.error(err);
      setError("Oops! We couldn't access your camera. Make sure you gave browser permission and aren't using the camera in another app.");
    }
  };

  const stopScan = () => {
    setIsScanning(false);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Image Upload Parsing
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setDecodedResult("");

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewImage(dataUrl);

      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current || document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const jsQR = (window as any).jsQR;
          if (jsQR) {
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code && code.data) {
              setDecodedResult(code.data);
            } else {
              setError("We couldn't find a valid QR code in that image. Try checking if it's blurry or cropped too tightly.");
            }
          } else {
            setError("The decoding library isn't fully loaded yet. Give it a brief moment and try again.");
          }
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreviewImage(null);
    setDecodedResult("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCopy = () => {
    if (!decodedResult) return;
    navigator.clipboard.writeText(decodedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabChange = (tab: "upload" | "webcam") => {
    stopScan();
    setError("");
    setActiveTab(tab);
  };

  // Detect if result is a link
  const isUrl = (str: string) => {
    try {
      const url = new URL(str);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* Back Button */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/free-sumo-tools" className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", gap: "0.35rem", display: "inline-flex", alignItems: "center" }}>
          <ArrowLeft size={16} /> Back to Free Sumo Tools
        </Link>
      </div>

      {/* Hero Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", fontSize: "2rem" }}>
          <QrCode size={36} color="var(--primary)" /> QR Code Decoder
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: "800px" }}>
          Instantly decode QR codes from image files or directly through your live device webcam. Everything is processed locally in your browser—no uploads required.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="grid-2" style={{ gap: "2rem", marginBottom: "4rem" }}>
        
        {/* Input Panel (Webcam or File Upload) */}
        <div className="card" style={{ display: "flex", flexDirection: "column", minHeight: "400px" }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
            <button 
              className="btn" 
              onClick={() => handleTabChange("upload")}
              style={{
                flex: 1,
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
                background: activeTab === "upload" ? "var(--primary)" : "transparent",
                color: activeTab === "upload" ? "white" : "var(--text-muted)",
                border: activeTab === "upload" ? "none" : "1px solid var(--border-light)",
              }}
            >
              <Upload size={16} /> Upload Image
            </button>
            <button 
              className="btn" 
              onClick={() => handleTabChange("webcam")}
              style={{
                flex: 1,
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
                background: activeTab === "webcam" ? "var(--primary)" : "transparent",
                color: activeTab === "webcam" ? "white" : "var(--text-muted)",
                border: activeTab === "webcam" ? "none" : "1px solid var(--border-light)",
              }}
            >
              <Camera size={16} /> Scan via Webcam
            </button>
          </div>

          {/* Upload Mode UI */}
          {activeTab === "upload" && (
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              {!previewImage ? (
                <div style={{
                  flexGrow: 1,
                  border: "2px dashed var(--border-strong)",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "3.5rem 2rem",
                  textAlign: "center",
                  background: "#f8fafc",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background-color 0.2s"
                }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", cursor: "pointer" }} 
                  />
                  <Upload size={48} style={{ color: "var(--primary)", marginBottom: "1rem" }} />
                  <strong style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Select or Drop QR Code Image</strong>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>Supports PNG, JPG, JPEG, WEBP, and GIF</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ position: "relative", alignSelf: "center", width: "100%", maxWidth: "300px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-light)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewImage} alt="QR Code Preview" style={{ width: "100%", height: "auto", display: "block", maxHeight: "250px", objectFit: "contain" }} />
                  </div>
                  <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                    <button className="btn btn-outline" style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }} onClick={clearImage}>
                      <Trash2 size={14} /> Clear Image
                    </button>
                    <label className="btn btn-primary" style={{ padding: "0.4rem 1rem", fontSize: "0.85rem", cursor: "pointer" }}>
                      <Upload size={14} /> Change Image
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }} 
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Webcam Mode UI */}
          {activeTab === "webcam" && (
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
              {!isScanning ? (
                <div style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "3rem 1.5rem",
                  background: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px dashed var(--border-strong)",
                  textAlign: "center"
                }}>
                  <Camera size={48} style={{ color: "var(--text-muted)", marginBottom: "1rem", opacity: 0.6 }} />
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                    Scan directly using your camera. We will decode it in real time.
                  </p>
                  <button className="btn btn-primary" onClick={startScan}>
                    <Camera size={16} /> Start Live Scan
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, position: "relative" }}>
                  <div style={{
                    position: "relative",
                    width: "100%",
                    height: "300px",
                    background: "black",
                    borderRadius: "12px",
                    overflow: "hidden"
                  }}>
                    <video 
                      ref={videoRef} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    {/* Scanner scanning effect/box */}
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "180px",
                      height: "180px",
                      border: "3px solid var(--primary)",
                      borderRadius: "12px",
                      boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                      pointerEvents: "none"
                    }}>
                      {/* Laser Line */}
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "2px",
                        background: "#ef4444",
                        boxShadow: "0 0 8px #ef4444",
                        animation: "scanLine 2s linear infinite"
                      }} />
                    </div>
                  </div>
                  
                  {/* Style for animation */}
                  <style>{`
                    @keyframes scanLine {
                      0% { top: 0%; }
                      50% { top: 100%; }
                      100% { top: 0%; }
                    }
                  `}</style>

                  <div style={{ marginTop: "1rem", textAlign: "center" }}>
                    <button className="btn btn-outline" style={{ borderColor: "#ef4444", color: "#ef4444" }} onClick={stopScan}>
                      <VideoOff size={16} /> Stop Camera
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Message Box */}
          {error && (
            <div style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: "#fef2f2",
              color: "#b91c1c",
              borderRadius: "8px",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem"
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
              <div>{error}</div>
            </div>
          )}
        </div>

        {/* Output Panel (Decoded Text Content) */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-light)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.25rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              Decoded Results
            </h3>
            {decodedResult && (
              <button 
                className="btn btn-primary" 
                onClick={handleCopy} 
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", marginLeft: "auto" }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy Output"}
              </button>
            )}
          </div>

          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            {decodedResult ? (
              <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "1.5rem" }}>
                <textarea 
                  className="input-field"
                  style={{
                    flexGrow: 1,
                    minHeight: "180px",
                    resize: "none",
                    fontFamily: "monospace",
                    fontSize: "0.95rem",
                    background: "#f8fafc",
                    borderColor: "var(--border-strong)",
                    padding: "1rem"
                  }}
                  readOnly
                  value={decodedResult}
                />

                {isUrl(decodedResult) && (
                  <div style={{
                    padding: "1rem",
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem"
                  }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 700, display: "block", marginBottom: "0.2rem" }}>DETECTED URL</span>
                      <a href={decodedResult} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                        {decodedResult}
                      </a>
                    </div>
                    <a 
                      href={decodedResult} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary" 
                      style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", whiteSpace: "nowrap" }}
                    >
                      Visit Site <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8fafc",
                borderRadius: "8px",
                border: "1px dashed var(--border-strong)",
                color: "var(--text-muted)",
                padding: "3rem 1.5rem",
                textAlign: "center"
              }}>
                <QrCode size={48} style={{ opacity: 0.25, marginBottom: "1rem" }} />
                <p style={{ margin: 0, fontSize: "0.95rem" }}>
                  Upload a QR image file or fire up your webcam to parse the content. The decrypted text details will show up right here.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Hidden canvas for extraction */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Educational & SEO section */}
      <div className="prose" style={{ marginTop: "4rem" }}>
        <h2>How Does This QR Code Decoder Work?</h2>
        <p>
          QR codes (Quick Response codes) are essentially visual representations of data. Instead of sending your images over the internet to a remote server to extract this data, this tool does it right inside your browser. Here is the magic: we pull in a lightweight library called <code>jsQR</code>. When you upload an image or scan a QR using your live webcam feed, we draw that image onto an invisible HTML5 canvas, read the raw color values (the pixel array) from the canvas, and hand it to the decoder. Within milliseconds, it translates those black-and-white patterns back into the original plain text, URL, or contact details.
        </p>

        <h2>Is My Data Private?</h2>
        <p>
          Absolutely. Unlike many online tools that upload your scanned images to their company servers for processing, this decoder is 100% client-side. The image files you drop, and the video stream from your webcam, never go anywhere. In fact, you could load this web page, completely disconnect your internet, and the tool will still decode QR codes perfectly fine. Your camera permissions are solely used by your browser to render the local feed, and we never record or transmit any metadata.
        </p>

        <h2>Tips for Troubleshooting Scans</h2>
        <p>
          If you are having trouble getting a QR code to read, here are a few simple developer tips to try. First, ensure the camera lens is clean and the QR code is reasonably flat and well-lit. Shadows or glare from overhead lights are the most common reasons a scanner fails. Second, if you are uploading an image file, avoid images where the QR code is extremely small or blurry. The scanner needs a clear contrast between the dark squares and the light background. If your image is huge, the browser can handle it easily—just make sure the QR code isn't warped or severely angled.
        </p>

        <h2>What Types of QR Codes Can Be Parsed?</h2>
        <p>
          This decoder supports all standard QR codes, regardless of what information they contain. It can read standard web URLs, plain text messages, email addresses, phone numbers, SMS, Wi-Fi credentials (which look like <code>WIFI:S:MyNetwork;T:WPA;P:MyPassword;;</code>), contact details (vCards), and even Bitcoin or other crypto wallet addresses. If the result is a website link, our interface automatically detects the protocol and gives you a quick click-through option so you don't have to copy-paste it yourself.
        </p>
      </div>
    </div>
  );
}
