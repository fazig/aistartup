"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { removeBackground, Config } from "@imgly/background-removal";
import { UploadCloud, Download, Image as ImageIcon, CheckCircle, Trash2, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

const COLORS = [
  { label: "Transparent", value: "transparent" },
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#000000" },
  { label: "Red", value: "#ef4444" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Green", value: "#22c55e" },
  { label: "Yellow", value: "#eab308" },
  { label: "Purple", value: "#a855f7" },
  { label: "Pink", value: "#ec4899" },
];

export default function RemoveBackgroundTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState("");
  
  const [transparentBlob, setTransparentBlob] = useState<Blob | null>(null);
  const [transparentPreviewUrl, setTransparentPreviewUrl] = useState<string | null>(null);
  
  const [bgColor, setBgColor] = useState<string>("transparent");
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Clean up ObjectURLs
  useEffect(() => {
    return () => {
      if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
      if (transparentPreviewUrl) URL.revokeObjectURL(transparentPreviewUrl);
    };
  }, [originalPreviewUrl, transparentPreviewUrl]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    setOriginalFile(file);
    setOriginalPreviewUrl(URL.createObjectURL(file));
    setTransparentBlob(null);
    setTransparentPreviewUrl(null);
    setIsProcessing(false);
    setProgressText("");
  };

  const handleRemoveBackground = async () => {
    if (!originalFile) return;
    setIsProcessing(true);
    setProgressText("Initializing ML Model...");

    try {
      const config: Config = {
        progress: (key, current, total) => {
          const percent = Math.round((current / total) * 100) || 0;
          setProgressText(`Loading assets... ${percent}%`);
        }
      };

      const resultBlob = await removeBackground(originalFile, config);
      setTransparentBlob(resultBlob);
      setTransparentPreviewUrl(URL.createObjectURL(resultBlob));
      setProgressText("Background Removed Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error removing background. Please try a different image.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Draw on Canvas whenever bg color or transparent blob changes
  useEffect(() => {
    if (!transparentPreviewUrl || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      // Set canvas to match image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw transparent image
      ctx.drawImage(img, 0, 0);
    };
    img.src = transparentPreviewUrl;
  }, [transparentPreviewUrl, bgColor]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `removed_bg_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetAll = () => {
    setOriginalFile(null);
    setOriginalPreviewUrl(null);
    setTransparentBlob(null);
    setTransparentPreviewUrl(null);
    setIsProcessing(false);
    setProgressText("");
    setBgColor("transparent");
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* SEO Title & Meta for Next.js App Router can be added via head if needed, but since it's a client component, 
          we usually rely on layout or let Google crawl the static text below. */}
      <title>Free AI Background Remover | Remove BG from Images Free</title>
      <meta name="description" content="Use our free AI Background Remover to easily make image backgrounds transparent. Add custom colors and download instantly. Fast, private, and 100% free." />

      <Link
        href="/tools"
        className="btn btn-outline"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "0.85rem", padding: "0.5rem 1rem" }}
      >
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <Sparkles color="var(--primary)" /> Remove Image Background
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
          100% Free and fully private. Removes the background from your photos instantly using edge-AI. Add vibrant solid colors or download as transparent PNGs!
        </p>
      </div>

      <div className="grid-2" style={{ gap: "2rem", marginBottom: "4rem" }}>
        {/* Upload & Original View */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.75rem" }}>
            1. Upload Photo
          </h3>

          {!originalPreviewUrl ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{
                border: "2px dashed var(--primary)",
                borderRadius: "16px",
                padding: "4rem 2rem",
                textAlign: "center",
                background: "rgba(37, 99, 235, 0.05)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px"
              }}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <UploadCloud size={48} color="var(--primary)" style={{ marginBottom: "1rem" }} />
              <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>Drag & Drop an image</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>or click to browse from your device</p>
              <button className="btn btn-primary">Select Image</button>
              <input type="file" id="file-upload" accept="image/*" style={{ display: "none" }} onChange={onFileChange} />
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", background: "#f1f5f9", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
                <img src={originalPreviewUrl} alt="Original" style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }} />
              </div>
              
              <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                {!transparentBlob && (
                  <button 
                    onClick={handleRemoveBackground} 
                    disabled={isProcessing}
                    className="btn btn-primary" 
                    style={{ flex: 1, fontSize: "1.1rem", padding: "1rem" }}
                  >
                    {isProcessing ? (
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                        <Loader2 className="spin" size={20} /> Processing...
                      </span>
                    ) : (
                      "✨ Remove Background"
                    )}
                  </button>
                )}
                <button onClick={resetAll} className="btn btn-outline" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Trash2 size={20} />
                </button>
              </div>
              {progressText && !transparentBlob && <p style={{ textAlign: "center", marginTop: "1rem", color: "var(--primary)", fontSize: "0.9rem", fontWeight: 600 }}>{progressText}</p>}
            </div>
          )}
        </div>

        {/* Result View */}
        <div className="card" style={{ display: "flex", flexDirection: "column", opacity: transparentBlob ? 1 : 0.6, pointerEvents: transparentBlob ? "auto" : "none" }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.75rem" }}>
            2. Result & Download
          </h3>

          <div style={{ 
            position: "relative", 
            borderRadius: "12px", 
            overflow: "hidden", 
            background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYV2NkYGAwYkAD////jwymEhAGACw2DAXYpAklAAAAAElFTkSuQmCC')", 
            flex: 1, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            minHeight: "300px",
            border: "1px solid var(--border-light)"
          }}>
            <canvas ref={canvasRef} style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain", display: transparentBlob ? "block" : "none" }} />
            {!transparentBlob && (
              <div style={{ color: "var(--text-muted)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <ImageIcon size={48} opacity={0.3} />
                <p>Your result will appear here</p>
              </div>
            )}
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "0.75rem", fontSize: "0.95rem" }}>Background Color:</label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setBgColor(c.value)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: c.value === "transparent" ? "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYV2NkYGAwYkAD////jwymEhAGACw2DAXYpAklAAAAAElFTkSuQmCC')" : c.value,
                    border: bgColor === c.value ? "3px solid var(--primary)" : "1px solid var(--border-light)",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                  title={c.label}
                />
              ))}
              <input 
                type="color" 
                value={bgColor !== "transparent" ? bgColor : "#ffffff"} 
                onChange={(e) => setBgColor(e.target.value)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "none",
                  padding: 0
                }}
                title="Custom Color"
              />
            </div>

            <button 
              onClick={handleDownload}
              className="btn btn-primary" 
              style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", fontSize: "1.1rem", padding: "1rem" }}
            >
              <Download size={20} /> Download Image
            </button>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose card">
        <h2>Free AI Background Remover Online</h2>
        <p>
          Welcome to the most advanced, fully private, and free Background Remover. Whether you are creating 
          product listings for an eCommerce store, making custom stickers, or designing a professional presentation, 
          isolating your subject from the background is an essential workflow.
        </p>

        <h3>How It Works: Python & JS Edge Technology</h3>
        <p>
          Behind the scenes, this tool utilizes advanced deep learning and computer vision architectures. Historically, 
          processing complex neural networks required heavy Python backends and expensive GPU servers. However, 
          thanks to the power of modern <strong>WebAssembly (WASM) and JS</strong>, we have ported these complex mathematical models directly into your browser!
        </p>
        <p>
          This means:
        </p>
        <ul>
          <li><strong>Zero Cost:</strong> Because you aren't using our server GPUs, we can offer this tool 100% for free.</li>
          <li><strong>Absolute Privacy:</strong> Your images are NEVER uploaded to any server. The ML model is downloaded to your device, and processing happens natively on your own machine.</li>
          <li><strong>Blazing Fast:</strong> Once the model is cached, subsequent image processing takes only milliseconds.</li>
        </ul>

        <h3>Features</h3>
        <p>
          Not only does our engine strip away the most complex backgrounds (like hair, fur, and intricate edges), but 
          we also provide a suite of tools to finish your composition:
        </p>
        <ul>
          <li><strong>Transparent PNG:</strong> Export pristine transparent backgrounds for use in Figma, Photoshop, or Canva.</li>
          <li><strong>Solid Colors:</strong> Instantly apply professional studio backgrounds like solid white, pitch black, or energetic vibrant colors directly within the app.</li>
          <li><strong>High Resolution:</strong> We maintain the native resolution of your uploaded photograph without applying compressions.</li>
        </ul>
      </div>

      <style jsx>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
