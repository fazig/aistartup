"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Crop, Download, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ImageCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  
  // Crop Box state
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(200);
  const [cropH, setCropH] = useState(200);

  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

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
          setImgWidth(img.width);
          setImgHeight(img.height);
          
          // Initial crop settings: center square
          const size = Math.min(img.width, img.height, 300);
          const x = Math.round((img.width - size) / 2);
          const y = Math.round((img.height - size) / 2);
          setCropX(x);
          setCropY(y);
          setCropW(size);
          setCropH(size);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Redraw canvas with crop overlay when coordinates change
  useEffect(() => {
    drawPreview();
  }, [imageSrc, cropX, cropY, cropW, cropH]);

  const drawPreview = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    // Draw main image
    ctx.drawImage(img, 0, 0);

    // Semi-transparent overlay over non-cropped areas
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    
    // Top
    ctx.fillRect(0, 0, canvas.width, cropY);
    // Bottom
    ctx.fillRect(0, cropY + cropH, canvas.width, canvas.height - (cropY + cropH));
    // Left
    ctx.fillRect(0, cropY, cropX, cropH);
    // Right
    ctx.fillRect(cropX + cropW, cropY, canvas.width - (cropX + cropW), cropH);

    // Draw outline border for crop box
    ctx.strokeStyle = "var(--primary)";
    ctx.lineWidth = 4;
    ctx.strokeRect(cropX, cropY, cropW, cropH);
  };

  const applyCropPreset = (ratio: "1:1" | "16:9" | "4:3" | "free") => {
    if (!imgWidth || !imgHeight) return;

    let w = 200;
    let h = 200;

    if (ratio === "1:1") {
      const size = Math.min(imgWidth, imgHeight, 300);
      w = size;
      h = size;
    } else if (ratio === "16:9") {
      w = Math.min(imgWidth, 480);
      h = Math.round((w * 9) / 16);
      if (h > imgHeight) {
        h = imgHeight;
        w = Math.round((h * 16) / 9);
      }
    } else if (ratio === "4:3") {
      w = Math.min(imgWidth, 400);
      h = Math.round((w * 3) / 4);
      if (h > imgHeight) {
        h = imgHeight;
        w = Math.round((h * 4) / 3);
      }
    } else {
      w = Math.round(imgWidth * 0.8);
      h = Math.round(imgHeight * 0.8);
    }

    const x = Math.round((imgWidth - w) / 2);
    const y = Math.round((imgHeight - h) / 2);

    setCropX(x);
    setCropY(y);
    setCropW(w);
    setCropH(h);
  };

  const handleDownload = () => {
    const img = imgRef.current;
    if (!img) return;

    // Create an offscreen canvas to render only the cropped bounds
    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = cropW;
    cropCanvas.height = cropH;

    const cropCtx = cropCanvas.getContext("2d");
    if (!cropCtx) return;

    // Draw subset of image
    cropCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const dataUrl = cropCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    const newName = fileName ? fileName.replace(/(\.[\w\d]+)$/, "-cropped$1") : "cropped-image.png";
    a.download = newName;
    a.click();
  };

  const handleClear = () => {
    setImageSrc(null);
    setFileName("");
    setCropX(0);
    setCropY(0);
    setCropW(200);
    setCropH(200);
    setImgWidth(0);
    setImgHeight(0);
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
          <Crop color="var(--primary)" /> Image Cropper
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Crop images using custom coordinate dimensions or standard ratios locally in your browser.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Control Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
                  {fileName} ({imgWidth} x {imgHeight} px)
                </div>

                {/* Aspect Presets */}
                <div>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    Aspect Ratio Presets:
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    <button className="btn btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }} onClick={() => applyCropPreset("1:1")}>
                      Square (1:1)
                    </button>
                    <button className="btn btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }} onClick={() => applyCropPreset("16:9")}>
                      Wide (16:9)
                    </button>
                    <button className="btn btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }} onClick={() => applyCropPreset("4:3")}>
                      Photo (4:3)
                    </button>
                  </div>
                </div>

                {/* Coordinate inputs */}
                <div className="grid-2" style={{ gap: "0.75rem" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>X Position</label>
                    <input
                      type="number"
                      className="input-field"
                      value={cropX}
                      onChange={(e) => setCropX(Math.max(0, Math.min(imgWidth - cropW, parseInt(e.target.value) || 0)))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Y Position</label>
                    <input
                      type="number"
                      className="input-field"
                      value={cropY}
                      onChange={(e) => setCropY(Math.max(0, Math.min(imgHeight - cropH, parseInt(e.target.value) || 0)))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Width (px)</label>
                    <input
                      type="number"
                      className="input-field"
                      value={cropW}
                      onChange={(e) => setCropW(Math.max(10, Math.min(imgWidth - cropX, parseInt(e.target.value) || 10)))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Height (px)</label>
                    <input
                      type="number"
                      className="input-field"
                      value={cropH}
                      onChange={(e) => setCropH(Math.max(10, Math.min(imgHeight - cropY, parseInt(e.target.value) || 10)))}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button className="btn btn-primary" style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.4rem" }} onClick={handleDownload}>
                    <Download size={16} /> Crop & Download
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
          <h3 style={{ fontSize: "1rem", alignSelf: "flex-start", marginBottom: "1rem" }}>Crop Preview Area</h3>
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
        <h2>What is image cropping and how is it used?</h2>
        <p>
          Cropping is the process of removing unwanted outer areas from a photographic or illustrated image. It is used to:
        </p>
        <ul>
          <li><strong>Improve Composition</strong>: Align subjects with the rule of thirds or center focus.</li>
          <li><strong>Adjust Aspect Ratios</strong>: Fit images into standard template frames (like square 1:1 for Instagram, 16:9 for YouTube headers).</li>
          <li><strong>Focus on details</strong>: Trim off distracting background elements.</li>
        </ul>
      </div>
    </div>
  );
}
