"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, FlipHorizontal, FlipVertical, Download, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FlipImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setFlipH(false);
        setFlipV(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run canvas rendering on load/transformations change
  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      renderCanvas();
    };
  }, [imageSrc, flipH, flipV]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions matching source image
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Apply translations & scale adjustments based on flip actions
    let scaleX = flipH ? -1 : 1;
    let scaleY = flipV ? -1 : 1;
    
    let transX = flipH ? canvas.width : 0;
    let transY = flipV ? canvas.height : 0;

    ctx.translate(transX, transY);
    ctx.scale(scaleX, scaleY);

    ctx.drawImage(img, 0, 0);
    ctx.restore();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    // Append flipped name
    const newName = fileName ? fileName.replace(/(\.[\w\d]+)$/, "-flipped$1") : "flipped-image.png";
    a.download = newName;
    a.click();
  };

  const handleClear = () => {
    setImageSrc(null);
    setFileName("");
    setFlipH(false);
    setFlipV(false);
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
          <FlipHorizontal color="var(--primary)" /> Flip Image Tool
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Mirror your images vertically or horizontally instantly right in your browser.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Options/Upload */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Upload Area */}
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
                  Upload Image File
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Drag and drop or browse files</span>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
              </label>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--text-main)", fontWeight: 600 }}>{fileName}</div>
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                  <button
                    className={flipH ? "btn btn-primary" : "btn btn-outline"}
                    onClick={() => setFlipH(!flipH)}
                    style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                  >
                    <FlipHorizontal size={16} /> Horizontal Flip
                  </button>
                  <button
                    className={flipV ? "btn btn-primary" : "btn btn-outline"}
                    onClick={() => setFlipV(!flipV)}
                    style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                  >
                    <FlipVertical size={16} /> Vertical Flip
                  </button>
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
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No image uploaded. Please upload a file to preview.</p>
          ) : (
            <div style={{ maxWidth: "100%", overflow: "auto", border: "1px solid var(--border-light)", borderRadius: "8px", background: "#f8fafc", padding: "0.5rem" }}>
              <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }} />
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What does it mean to flip an image?</h2>
        <p>
          Flipping an image (also known as mirroring) is a basic layout operation that mirrors pixels across an axis:
        </p>
        <ul>
          <li>
            <strong>Horizontal Flipping</strong> mirrors the image from left to right. It is commonly used to adjust the pointing
            direction of a person in a photo, align objects to layout flow, or fix selfie photos that were saved in reverse by phone cams.
          </li>
          <li>
            <strong>Vertical Flipping</strong> mirrors the image from top to bottom. It creates a vertical reflection effect,
            useful for design graphics or textures.
          </li>
        </ul>

        <h2>100% Client-Side, Secure Image Processing</h2>
        <p>
          Most online image editors upload your files to their remote server, process them, and send them back. This exposes your
          private photos to external networks and slows down processing.
        </p>
        <p>
          This tool runs completely inside your browser using the HTML5 Canvas API. When you upload your image, the browser loads it
          into memory, redraws the pixels onto an offscreen canvas using coordinate transformations, and generates a local download URL.
          Your image is never uploaded to any server.
        </p>
      </div>
    </div>
  );
}
