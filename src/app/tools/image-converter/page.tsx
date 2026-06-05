"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, RefreshCw, Download, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type ImageFormat = "png" | "jpeg" | "webp" | "bmp";

export default function ImageConverter() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("webp");
  const [quality, setQuality] = useState(85); // 0 to 100 for jpeg/webp

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        setImageSrc(src);

        const img = new Image();
        img.src = src;
        img.onload = () => {
          imgRef.current = img;
          renderCanvas();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (imageSrc) renderCanvas();
  }, [imageSrc, targetFormat, quality]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Map format keys to standard mime types
    let mime = "image/png";
    if (targetFormat === "jpeg") mime = "image/jpeg";
    if (targetFormat === "webp") mime = "image/webp";
    if (targetFormat === "bmp") mime = "image/bmp";

    const q = quality / 100;
    const dataUrl = canvas.toDataURL(mime, q);

    const a = document.createElement("a");
    a.href = dataUrl;
    // Replace extension
    const newName = fileName ? fileName.replace(/(\.[\w\d]+)$/, `.${targetFormat}`) : `converted-image.${targetFormat}`;
    a.download = newName;
    a.click();
  };

  const handleClear = () => {
    setImageSrc(null);
    setFileName("");
    setTargetFormat("webp");
    setQuality(85);
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
          <RefreshCw color="var(--primary)" /> Image Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert images between WebP, PNG, JPEG, and BMP formats instantly inside your browser.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Inputs */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Conversion Settings</h3>

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
                textAlign: "center",
              }}
            >
              <Upload size={36} color="var(--text-muted)" style={{ marginBottom: "1rem" }} />
              <span style={{ fontWeight: 600, fontSize: "0.95rem", display: "block", marginBottom: "0.25rem" }}>
                Upload Image File
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Drag and drop or browse files</span>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
            </label>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                {fileName}
              </div>

              {/* Target Format select */}
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Target Format</label>
                <select
                  className="input-field"
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value as ImageFormat)}
                  style={{ cursor: "pointer", fontFamily: "inherit" }}
                >
                  <option value="webp">WebP (.webp)</option>
                  <option value="png">PNG (.png)</option>
                  <option value="jpeg">JPEG / JPG (.jpg)</option>
                  <option value="bmp">BMP (.bmp)</option>
                </select>
              </div>

              {/* Quality slider for WebP and JPEG */}
              {(targetFormat === "jpeg" || targetFormat === "webp") && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 600 }}>
                    <span>Conversion Quality:</span>
                    <span style={{ color: "var(--primary)" }}>{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--primary)" }}
                  />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
                    Lower quality results in smaller file sizes. Standard default is 80–85%.
                  </span>
                </div>
              )}

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button className="btn btn-primary" style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.4rem" }} onClick={handleDownload}>
                  <Download size={16} /> Convert & Download
                </button>
                <button className="btn btn-outline" style={{ display: "flex", gap: "0.4rem" }} onClick={handleClear}>
                  <Trash2 size={16} /> Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Preview */}
        <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
          <h3 style={{ fontSize: "1rem", alignSelf: "flex-start", marginBottom: "1rem" }}>Image Preview</h3>
          {!imageSrc ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No image uploaded.</p>
          ) : (
            <div style={{ maxWidth: "100%", overflow: "auto", border: "1px solid var(--border-light)", borderRadius: "8px", background: "#f8fafc", padding: "0.5rem" }}>
              <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }} />
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>Understanding image file formats (WebP, PNG, JPEG, BMP)</h2>
        <p>
          Different image file formats serve distinct purposes based on their compression types:
        </p>
        <ul>
          <li>
            <strong>WebP</strong>: A modern image format developed by Google that provides superior lossless and lossy compression.
            WebP images are typically 30% smaller than JPEGs and 26% smaller than PNGs while preserving visual quality. It is the
            best format for web pages to ensure fast load times.
          </li>
          <li>
            <strong>PNG (Portable Network Graphics)</strong>: A lossless compression format that supports background transparency. It
            is the standard format for logos, illustrations, and UI graphics where pixel-perfect precision and alpha channels are required.
          </li>
          <li>
            <strong>JPEG (Joint Photographic Experts Group)</strong>: A lossy compression format optimized for photographic images.
            It allows for massive file size reductions by discarding details that human eyes can&apos;t easily notice, but it does
            not support transparent backgrounds.
          </li>
          <li>
            <strong>BMP (Bitmap Image File)</strong>: An uncompressed, raw raster graphics format historically used by Windows. BMP
            files preserve exact pixel matrices, making them very large and rarely used on the web.
          </li>
        </ul>
      </div>
    </div>
  );
}
