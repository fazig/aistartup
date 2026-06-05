"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Trash2, ArrowLeft, Image as ImageIcon, Sliders, Check, Copy } from "lucide-react";
import Link from "next/link";

export default function PngToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [quality, setQuality] = useState(90); // 10 to 100
  const [jpgSize, setJpgSize] = useState<number | null>(null);
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
        setJpgSize(null);
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
  }, [imageSrc, bgColor, quality]);

  const renderImage = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    // Fill background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the image
    ctx.drawImage(img, 0, 0);

    // Calculate quality and estimate size
    const qValue = quality / 100;
    canvas.toBlob(
      (blob) => {
        if (blob) {
          setJpgSize(blob.size);
        }
      },
      "image/jpeg",
      qValue
    );
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const qValue = quality / 100;
    const dataUrl = canvas.toDataURL("image/jpeg", qValue);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = file ? `${file.name.replace(/\.[^/.]+$/, "")}.jpg` : "converted.jpg";
    a.click();
  };

  const handleCopyToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const qValue = quality / 100;
      // Copying to clipboard as PNG is standard because clipboard doesn't natively support copying JPG files on some platforms
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
    setJpgSize(null);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* Back Button */}
            <Link
        href="/tools"
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
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <ImageIcon color="var(--primary)" /> PNG to JPG Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert transparent PNG files into high-quality JPEG images. Select a custom background color to fill the alpha transparency.
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
                  Upload PNG Image
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Drag and drop or select file</span>
                <input type="file" accept="image/png" onChange={handleFileChange} style={{ display: "none" }} />
              </label>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-main)", wordBreak: "break-all" }}>
                      {file?.name}
                    </span>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Original PNG: {file ? (file.size / 1024).toFixed(1) : 0} KB
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }} onClick={handleClear}>
                    <Trash2 size={14} /> Clear
                  </button>
                </div>

                <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="input-label" style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
                      Background Fill Color:
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        style={{ border: "none", width: "48px", height: "32px", cursor: "pointer", background: "none" }}
                      />
                      <input
                        type="text"
                        className="input-field"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        style={{ flex: 1, padding: "0.4rem 0.75rem", fontSize: "0.85rem" }}
                      />
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        <button className="btn btn-outline" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", border: "1px solid var(--border-strong)" }} onClick={() => setBgColor("#ffffff")}>White</button>
                        <button className="btn btn-outline" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", border: "1px solid var(--border-strong)" }} onClick={() => setBgColor("#000000")}>Black</button>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
                      Fills the transparent parts of the PNG.
                    </span>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: 600 }}>JPEG Quality:</span>
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
                </div>

                {jpgSize && (
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                    Estimated JPEG size: <strong style={{ color: "var(--text-main)" }}>{(jpgSize / 1024).toFixed(1)} KB</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Output Preview */}
        <div className="card" style={{ display: "flex", flexDirection: "column", minHeight: "300px" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>JPG Output Preview</h3>
          {!imageSrc ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--border-light)", borderRadius: "8px", background: "#f8fafc", padding: "2rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center" }}>
                Upload a PNG image to view the filled background JPG export.
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
                  <Download size={16} /> Download JPG
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
        <h2>What happens when converting a PNG to JPG?</h2>
        <p>
          PNG (Portable Network Graphics) is a lossless format designed to support transparent areas. JPG (Joint Photographic Experts Group), however, does not support transparency. When you save a transparent PNG file as a JPG, the transparent areas must be filled with a solid background color.
        </p>
        <p>
          By default, standard converters fill transparent areas with solid white. This can look bad if your image is meant to sit on a dark interface or custom layout. Our tool solves this by providing a background color picker. You can choose white, black, or input a custom hex code to match your brand's color theme perfectly.
        </p>
        <h2>Optimizing file sizes with JPG compression</h2>
        <p>
          PNG files are often much larger than JPGs because lossless compression stores all pixel data exactly as it was created. If you have graphic assets, screenshots, or photos saved as PNGs, converting them to JPGs can reduce file sizes by 70% or more. This makes them much faster to load on websites and easier to share via email or messaging apps.
        </p>
        <p>
          With our quality compression slider, you have direct control over the balance between file size and image clarity. Setting the quality to 80-90% typically yields a massive file size reduction with zero visible loss of quality. Everything runs locally in your browser memory via the HTML5 Canvas API, ensuring complete privacy.
        </p>
      </div>
    </div>
  );
}
