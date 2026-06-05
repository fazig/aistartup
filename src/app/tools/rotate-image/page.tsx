"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, RotateCw, RotateCcw, RefreshCw, Download, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RotateImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      renderCanvas();
    };
  }, [imageSrc, rotation]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Adjust canvas size based on rotation angle (swap width/height for 90/270 degrees)
    const is90or270 = rotation === 90 || rotation === 270;
    canvas.width = is90or270 ? img.height : img.width;
    canvas.height = is90or270 ? img.width : img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Move translation center to canvas middle
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);
    // Draw image centered
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    
    ctx.restore();
  };

  const rotateClockwise = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const rotateCounterClockwise = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    const newName = fileName ? fileName.replace(/(\.[\w\d]+)$/, "-rotated$1") : "rotated-image.png";
    a.download = newName;
    a.click();
  };

  const handleClear = () => {
    setImageSrc(null);
    setFileName("");
    setRotation(0);
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
          <RotateCw color="var(--primary)" /> Rotate Image Tool
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Rotate your images 90°, 180°, or 270° instantly using local browser processing.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Inputs */}
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
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{fileName}</div>
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                  <button className="btn btn-outline" style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }} onClick={rotateCounterClockwise}>
                    <RotateCcw size={16} /> 90° CCW
                  </button>
                  <button className="btn btn-outline" style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }} onClick={rotateClockwise}>
                    <RotateCw size={16} /> 90° CW
                  </button>
                  <button className="btn btn-outline" style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }} onClick={() => setRotation((prev) => (prev + 180) % 360)}>
                    <RefreshCw size={16} /> 180°
                  </button>
                </div>

                <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Current Rotation: <strong>{rotation}°</strong>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button className="btn btn-primary" style={{ flex: 1, display: "flex", justifyContent: "center", gap: "0.4rem" }} onClick={handleDownload}>
                    <Download size={16} /> Download
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
        <h2>Why would you need to rotate an image?</h2>
        <p>
          Image rotation is critical for correcting formatting orientations. When you take photos on digital cameras or smartphones,
          they include hidden metadata (EXIF tags) describing the camera orientation. However, some operating systems or website
          platforms ignore this metadata, causing your photos to appear sideways or upside down when uploaded.
        </p>
        <p>
          This rotation tool rewrites the image pixel grid directly onto a new canvas layout. Rotating your image 90° or 180° and
          downloading the result updates the physical pixel layouts, ensuring the image renders correctly on every device and platform.
        </p>
      </div>
    </div>
  );
}
