"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Trash2, ArrowLeft, Image as ImageIcon, Sliders, Check, Copy } from "lucide-react";
import Link from "next/link";

export default function JpgToWebp() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [lossless, setLossless] = useState(false);
  const [quality, setQuality] = useState(80); // 10 to 100
  const [webpSize, setWebpSize] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setWebpSize(null);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      renderImage();
    };
  }, [imageSrc, lossless, quality]);

  const renderImage = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    // Draw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Calculate quality and estimate size
    const qValue = lossless ? 1.0 : quality / 100;
    canvas.toBlob(
      (blob) => {
        if (blob) {
          setWebpSize(blob.size);
        }
      },
      "image/webp",
      qValue
    );
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const qValue = lossless ? 1.0 : quality / 100;
    const dataUrl = canvas.toDataURL("image/webp", qValue);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = file ? `${file.name.replace(/\.[^/.]+$/, "")}.webp` : "converted.webp";
    a.click();
  };

  const handleCopyToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to copy image to clipboard.");
    }
  };

  const handleClear = () => {
    setFile(null);
    setImageSrc(null);
    setWebpSize(null);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* Back Button */}
      <Link
        href="/free-sumo-tools"
        className="btn btn-outline"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          padding: "0.5rem 1rem",
        }}
      >
        <ArrowLeft size={16} /> Back to Free Sumo Tools
      </Link>

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <ImageIcon color="var(--primary)" /> JPG to WebP Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert JPG/JPEG images to modern, highly compressed WebP files. Custom quality settings and lossless compression options are available.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
            {!imageSrc ? (
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "180px",
                  border: "2px dashed var(--border-light)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  padding: "1.5rem",
                  transition: "border-color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = "var(--border-light)")}
              >
                <Upload size={36} color="var(--text-muted)" style={{ marginBottom: "1rem" }} />
                <span style={{ fontWeight: 600, fontSize: "0.95rem", display: "block", marginBottom: "0.25rem" }}>
                  Upload JPG Image
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Drag and drop or select file</span>
                <input type="file" accept="image/jpeg,image/jpg" onChange={handleFileChange} style={{ display: "none" }} />
              </label>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-main)", wordBreak: "break-all" }}>
                      {file?.name}
                    </span>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Original JPG: {file ? (file.size / 1024).toFixed(1) : 0} KB
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }} onClick={handleClear}>
                    <Trash2 size={14} /> Clear
                  </button>
                </div>

                <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={lossless}
                        onChange={(e) => setLossless(e.target.checked)}
                        style={{ accentColor: "var(--primary)" }}
                      />
                      <span>Enable Lossless Compression</span>
                    </label>
                  </div>

                  {!lossless && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                        <span style={{ fontWeight: 600 }}>WebP Quality:</span>
                        <strong>{quality}%</strong>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(parseInt(e.target.value))}
                        style={{ width: "100%", accentColor: "var(--primary)" }}
                      />
                    </div>
                  )}
                </div>

                {webpSize && (
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                    Estimated WebP size: <strong style={{ color: "var(--text-main)" }}>{(webpSize / 1024).toFixed(1)} KB</strong>
                    {"  "}({(100 - (webpSize / (file ? file.size : 1)) * 100).toFixed(0)}% reduction!)
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Output Preview */}
        <div className="card" style={{ display: "flex", flexDirection: "column", minHeight: "300px" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>WebP Output Preview</h3>
          {!imageSrc ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--border-light)", borderRadius: "8px", background: "#f8fafc", padding: "2rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center" }}>
                Upload a JPEG image to view and export the WebP.
              </p>
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  background: "#1e293b",
                  minHeight: "220px",
                  maxHeight: "300px",
                  overflow: "auto",
                }}
              >
                <canvas
                  ref={canvasRef}
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "260px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button className="btn btn-primary" style={{ flex: 1, display: "flex", justifyContent: "center" }} onClick={handleDownload}>
                  <Download size={16} /> Download WebP
                </button>
                <button
                  className="btn btn-outline"
                  style={{ display: "flex", gap: "0.4rem" }}
                  onClick={handleCopyToClipboard}
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO prose */}
      <div className="prose">
        <h2>Why convert JPG to WebP?</h2>
        <p>
          JPG is one of the oldest and most widely used formats on the internet. However, since it was created in the 1990s, compression algorithms have evolved significantly. WebP was developed to take advantage of modern hardware and decoding math, offering compression that is much more efficient than legacy JPEG.
        </p>
        <p>
          Converting your JPG images to WebP can yield file size reductions of 30% to 50% or more with no noticeable loss of quality. In turn, web pages load much faster, reducing mobile data consumption and server hosting costs.
        </p>
        <h2>Optimizing details with Lossless and Quality settings</h2>
        <p>
          Our converter processes files entirely on your local machine using the client-side canvas engine. Your private data is never uploaded to external servers, providing full confidentiality for company graphics or photo directories.
        </p>
        <p>
          You have direct control over the conversion algorithm. Choose lossy mode and adjust the quality slider to find the perfect compromise between file size and digital clarity. Alternatively, toggle lossless compression to compile a pixel-perfect copy.
        </p>
      </div>
    </div>
  );
}
