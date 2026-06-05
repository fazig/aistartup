"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Trash2, ArrowLeft, Image as ImageIcon, Sliders, Check, Copy } from "lucide-react";
import Link from "next/link";

export default function JpgToPng() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [removeBg, setRemoveBg] = useState(false);
  const [targetColor, setTargetColor] = useState("#ffffff");
  const [tolerance, setTolerance] = useState(30); // 0 to 150
  const [pngSize, setPngSize] = useState<number | null>(null);
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
        setPngSize(null);
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
  }, [imageSrc, removeBg, targetColor, tolerance]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 255, b: 255 };
  };

  const renderImage = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    if (removeBg) {
      const rgb = hexToRgb(targetColor);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Euclidean distance in RGB color space
        const dist = Math.sqrt(
          Math.pow(r - rgb.r, 2) + Math.pow(g - rgb.g, 2) + Math.pow(b - rgb.b, 2)
        );

        if (dist <= tolerance) {
          data[i + 3] = 0; // Set alpha to transparent
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // Estimate png file size
    canvas.toBlob((blob) => {
      if (blob) {
        setPngSize(blob.size);
      }
    }, "image/png");
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = file ? `${file.name.replace(/\.[^/.]+$/, "")}.png` : "converted.png";
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
    setPngSize(null);
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
          <ImageIcon color="var(--primary)" /> JPG to PNG Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert JPG images into high-quality, transparent PNG files in your browser. Includes custom background-color removal.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Options/Upload */}
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
                      Input Size: {file ? (file.size / 1024).toFixed(1) : 0} KB
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }} onClick={handleClear}>
                    <Trash2 size={14} /> Clear
                  </button>
                </div>

                <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={removeBg}
                      onChange={(e) => setRemoveBg(e.target.checked)}
                      style={{ accentColor: "var(--primary)" }}
                    />
                    <span>Make background color transparent</span>
                  </label>
                </div>

                {removeBg && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: "0.75rem", background: "#f8fafc", borderRadius: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600 }}>Color to remove:</label>
                      <input
                        type="color"
                        value={targetColor}
                        onChange={(e) => setTargetColor(e.target.value)}
                        style={{ border: "none", width: "40px", height: "24px", cursor: "pointer", background: "none" }}
                      />
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        <button
                          className="btn btn-outline"
                          style={{ padding: "0.15rem 0.4rem", fontSize: "0.7rem", border: "1px solid var(--border-strong)" }}
                          onClick={() => setTargetColor("#ffffff")}
                        >
                          White
                        </button>
                        <button
                          className="btn btn-outline"
                          style={{ padding: "0.15rem 0.4rem", fontSize: "0.7rem", border: "1px solid var(--border-strong)" }}
                          onClick={() => setTargetColor("#000000")}
                        >
                          Black
                        </button>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                        <span>Tolerance threshold:</span>
                        <strong>{tolerance}</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="150"
                        value={tolerance}
                        onChange={(e) => setTolerance(parseInt(e.target.value))}
                        style={{ width: "100%", accentColor: "var(--primary)" }}
                      />
                    </div>
                  </div>
                )}

                {pngSize && (
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                    Estimated PNG size: <strong style={{ color: "var(--text-main)" }}>{(pngSize / 1024).toFixed(1)} KB</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Output/Preview */}
        <div className="card" style={{ display: "flex", flexDirection: "column", minHeight: "300px" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>PNG Output Preview</h3>
          {!imageSrc ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--border-light)", borderRadius: "8px", background: "#f8fafc", padding: "2rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center" }}>
                Upload a JPEG image to view and extract the transparent PNG.
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
                  background: "repeating-conic-gradient(#f0f0f0 0% 25%, transparent 0% 50%) 50% / 16px 16px",
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
                  <Download size={16} /> Download PNG
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
        <h2>What is the difference between JPG and PNG?</h2>
        <p>
          JPG (or JPEG) and PNG are two of the most widely used image file formats on the web, but they serve very different purposes. JPG uses lossy compression, which discards some color information to achieve much smaller file sizes. It is ideal for digital photographs where slight changes in color gradients are difficult for the human eye to notice. However, JPG does not support transparent layers.
        </p>
        <p>
          PNG, on the other hand, uses lossless compression and supports an alpha channel for transparency. This makes PNG the default choice for logos, user interface designs, charts, and diagrams where sharp lines, transparent backdrops, and pixel-perfect clarity are required.
        </p>
        <h2>Advanced Background Removal built right in</h2>
        <p>
          Converting a JPG to a PNG directly normally leaves the original white or solid background intact, since JPEGs contain no transparency data. If you need a transparent backdrop for a design template, you usually have to use heavy photo editing software.
        </p>
        <p>
          This converter features an integrated chroma-key shader. When you toggle the background removal option, the tool performs a scan of all pixels, calculates the color difference vector between each pixel and your target color (using Euclidean color-distance matching), and replaces matching pixels with transparent alpha values. You can adjust the tolerance threshold to get the perfect edge cutoff.
        </p>
      </div>
    </div>
  );
}
