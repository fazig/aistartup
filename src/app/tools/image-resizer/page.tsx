"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Minimize2, Download, Trash2, ArrowLeft, Link as LinkIcon, Link2Off } from "lucide-react";
import Link from "next/link";

export default function ImageResizer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockRatio, setLockRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState(1);

  const [scale, setScale] = useState(100); // 10% to 100%

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

        // Load image properties to set default size
        const img = new Image();
        img.src = src;
        img.onload = () => {
          imgRef.current = img;
          setWidth(img.width.toString());
          setHeight(img.height.toString());
          setOriginalRatio(img.width / img.height);
          setScale(100);
          renderCanvas(img.width, img.height);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCanvas = (w: number, h: number) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
  };

  const handleWidthChange = (val: string) => {
    setWidth(val);
    const parsedW = parseInt(val, 10);
    if (!isNaN(parsedW) && parsedW > 0) {
      if (lockRatio) {
        const calculatedH = Math.round(parsedW / originalRatio);
        setHeight(calculatedH.toString());
        renderCanvas(parsedW, calculatedH);
      } else {
        const parsedH = parseInt(height, 10) || 100;
        renderCanvas(parsedW, parsedH);
      }
    }
  };

  const handleHeightChange = (val: string) => {
    setHeight(val);
    const parsedH = parseInt(val, 10);
    if (!isNaN(parsedH) && parsedH > 0) {
      if (lockRatio) {
        const calculatedW = Math.round(parsedH * originalRatio);
        setWidth(calculatedW.toString());
        renderCanvas(calculatedW, parsedH);
      } else {
        const parsedW = parseInt(width, 10) || 100;
        renderCanvas(parsedW, parsedH);
      }
    }
  };

  const handleScaleChange = (val: number) => {
    setScale(val);
    const img = imgRef.current;
    if (img) {
      const calculatedW = Math.round((img.width * val) / 100);
      const calculatedH = Math.round((img.height * val) / 100);
      setWidth(calculatedW.toString());
      setHeight(calculatedH.toString());
      renderCanvas(calculatedW, calculatedH);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    const newName = fileName ? fileName.replace(/(\.[\w\d]+)$/, "-resized$1") : "resized-image.png";
    a.download = newName;
    a.click();
  };

  const handleClear = () => {
    setImageSrc(null);
    setFileName("");
    setWidth("");
    setHeight("");
    setOriginalRatio(1);
    setScale(100);
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
          <Minimize2 color="var(--primary)" /> Image Resizer
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Resize images to custom width/height dimensions or percentage scales without uploading files to any server.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Upload and controls */}
          <div className="card">
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

                {/* Custom dimensions */}
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem", fontSize: "0.85rem" }}>Width (px)</label>
                    <input
                      type="number"
                      className="input-field"
                      value={width}
                      onChange={(e) => handleWidthChange(e.target.value)}
                    />
                  </div>

                  {/* Lock Aspect Ratio button */}
                  <button
                    className="btn btn-outline"
                    onClick={() => setLockRatio(!lockRatio)}
                    style={{
                      padding: "0.75rem",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "46px",
                      marginBottom: "2px",
                      minWidth: "46px",
                    }}
                    title={lockRatio ? "Unlock Aspect Ratio" : "Lock Aspect Ratio"}
                  >
                    {lockRatio ? <LinkIcon size={18} color="var(--primary)" /> : <Link2Off size={18} />}
                  </button>

                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem", fontSize: "0.85rem" }}>Height (px)</label>
                    <input
                      type="number"
                      className="input-field"
                      value={height}
                      onChange={(e) => handleHeightChange(e.target.value)}
                    />
                  </div>
                </div>

                {/* Scale slider */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 600 }}>
                    <span>Scale Percentage:</span>
                    <span style={{ color: "var(--primary)" }}>{scale}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={scale}
                    onChange={(e) => handleScaleChange(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--primary)" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button className="btn btn-primary" style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.4rem" }} onClick={handleDownload}>
                    <Download size={16} /> Download Resized Image
                  </button>
                  <button className="btn btn-outline" style={{ display: "flex", gap: "0.4rem" }} onClick={handleClear}>
                    <Trash2 size={16} /> Clear
                  </button>
                </div>
              </div>
            )}
          </div>
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
        <h2>Why resize images and lock aspect ratios?</h2>
        <p>
          High-resolution photos from modern phones are often huge (exceeding 4000px width and 5MB size). While great for printing,
          uploading these directly to a blog or portfolio slows down page loading speeds dramatically, hurting your website SEO rankings.
        </p>
        <p>
          Resizing images reduces file size. Locking the **aspect ratio** ensures that as you shrink the width, the height scales
          down proportionally. If the ratio is unlocked, the image will stretch or compress, making shapes look distorted.
        </p>
      </div>
    </div>
  );
}
