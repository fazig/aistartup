"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Trash2, ArrowLeft, Image as ImageIcon, Sparkles, AlertTriangle, Check, Copy } from "lucide-react";
import Link from "next/link";

type ScalingAlgorithm = "nearest" | "bilinear-native" | "bicubic-native" | "bicubic-js";

export default function ImageEnlarger() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(2); // 2, 4, 8
  const [algorithm, setAlgorithm] = useState<ScalingAlgorithm>("bicubic-native");
  const [processing, setProcessing] = useState(false);
  const [outputWidth, setOutputWidth] = useState(0);
  const [outputHeight, setOutputHeight] = useState(0);
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
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  // Run scaling rendering
  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      setOutputWidth(img.width * scale);
      setOutputHeight(img.height * scale);
      processScaling();
    };
  }, [imageSrc, scale, algorithm]);

  const cubicHermite = (A: number, B: number, C: number, D: number, t: number) => {
    const a = -A / 2 + (3 * B) / 2 - (3 * C) / 2 + D / 2;
    const b = A - (5 * B) / 2 + 2 * C - D / 2;
    const c = -A / 2 + C / 2;
    const d = B;
    return a * t * t * t + b * t * t + c * t + d;
  };

  const processScaling = async () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    setProcessing(true);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setProcessing(false);
      return;
    }

    const w1 = img.width;
    const h1 = img.height;
    const w2 = w1 * scale;
    const h2 = h1 * scale;

    canvas.width = w2;
    canvas.height = h2;

    // Use native scaling or JS-based custom Bicubic interpolation
    if (algorithm !== "bicubic-js") {
      ctx.clearRect(0, 0, w2, h2);
      if (algorithm === "nearest") {
        ctx.imageSmoothingEnabled = false;
      } else if (algorithm === "bilinear-native") {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "low";
      } else if (algorithm === "bicubic-native") {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
      ctx.drawImage(img, 0, 0, w2, h2);
      setProcessing(false);
    } else {
      // Run custom JS bicubic calculation
      // Yield thread using setTimeout to avoid locking browser UI on large images
      setTimeout(() => {
        const offCanvas = document.createElement("canvas");
        offCanvas.width = w1;
        offCanvas.height = h1;
        const offCtx = offCanvas.getContext("2d");
        if (!offCtx) {
          setProcessing(false);
          return;
        }

        offCtx.drawImage(img, 0, 0);
        const srcData = offCtx.getImageData(0, 0, w1, h1);
        const dstData = ctx.createImageData(w2, h2);

        const xRatio = w1 / w2;
        const yRatio = h1 / h2;

        const srcBytes = srcData.data;
        const dstBytes = dstData.data;

        for (let i = 0; i < h2; i++) {
          const y = i * yRatio;
          const yInt = Math.floor(y);
          const dy = y - yInt;

          for (let j = 0; j < w2; j++) {
            const x = j * xRatio;
            const xInt = Math.floor(x);
            const dx = x - xInt;

            const dstOffset = (i * w2 + j) * 4;

            for (let c = 0; c < 4; c++) {
              const colVals = [];
              for (let m = -1; m < 3; m++) {
                const yIdx = Math.min(Math.max(0, yInt + m), h1 - 1);

                const xIdxN1 = Math.min(Math.max(0, xInt - 1), w1 - 1);
                const xIdx0  = Math.min(Math.max(0, xInt), w1 - 1);
                const xIdx1  = Math.min(Math.max(0, xInt + 1), w1 - 1);
                const xIdx2  = Math.min(Math.max(0, xInt + 2), w1 - 1);

                const valN1 = srcBytes[(yIdx * w1 + xIdxN1) * 4 + c];
                const val0  = srcBytes[(yIdx * w1 + xIdx0)  * 4 + c];
                const val1  = srcBytes[(yIdx * w1 + xIdx1)  * 4 + c];
                const val2  = srcBytes[(yIdx * w1 + xIdx2)  * 4 + c];

                colVals.push(cubicHermite(valN1, val0, val1, val2, dx));
              }
              const finalVal = cubicHermite(colVals[0], colVals[1], colVals[2], colVals[3], dy);
              dstBytes[dstOffset + c] = Math.min(Math.max(0, finalVal), 255);
            }
          }
        }

        ctx.putImageData(dstData, 0, 0);
        setProcessing(false);
      }, 50);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = file ? `${file.name.replace(/\.[^/.]+$/, "")}-${scale}x.png` : `enlarged-${scale}x.png`;
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
      alert("Clipboard copy failed. Your browser might block copying large images.");
    }
  };

  const handleClear = () => {
    setFile(null);
    setImageSrc(null);
    setOutputWidth(0);
    setOutputHeight(0);
  };

  // Warn if output dimensions are massive
  const isLargeOutput = outputWidth > 3000 || outputHeight > 3000;

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
          <Sparkles color="var(--primary)" /> Image Enlarger
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Upscale your images by 2x, 4x, or 8x with custom interpolation methods to keep details sharp or smooth out pixels.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left: Settings & Upload */}
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
                  Upload Image File
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Drag and drop or select file</span>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
              </label>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-main)", wordBreak: "break-all" }}>
                      {file?.name}
                    </span>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Original: {imgRef.current?.width} × {imgRef.current?.height} px
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }} onClick={handleClear}>
                    <Trash2 size={14} /> Clear
                  </button>
                </div>

                {/* Scale selection */}
                <div>
                  <label className="input-label" style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
                    Select Scale Factor:
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {[2, 4, 8].map((s) => (
                      <button
                        key={s}
                        className={scale === s ? "btn btn-primary" : "btn btn-outline"}
                        style={{ flex: 1, padding: "0.5rem", fontSize: "0.9rem" }}
                        onClick={() => setScale(s)}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Algorithm selection */}
                <div>
                  <label className="input-label" style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
                    Interpolation Quality:
                  </label>
                  <select
                    className="input-field"
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value as ScalingAlgorithm)}
                    style={{ background: "var(--bg-card)" }}
                  >
                    <option value="nearest">Nearest Neighbor (Retro/Pixelated)</option>
                    <option value="bilinear-native">Bilinear (Smooth - Browser Native)</option>
                    <option value="bicubic-native">Bicubic (Ultra Smooth - Browser Native)</option>
                    <option value="bicubic-js">Bicubic (Precise custom JS shader)</option>
                  </select>
                </div>

                {/* Warning for large files */}
                {isLargeOutput && algorithm === "bicubic-js" && (
                  <div style={{ display: "flex", gap: "0.5rem", padding: "0.75rem", background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "8px", color: "#b45309", fontSize: "0.8rem" }}>
                    <AlertTriangle size={20} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Warning:</strong> Upscaling to {outputWidth} × {outputHeight} px with custom JS shader might take a few seconds and freeze your tab briefly.
                    </div>
                  </div>
                )}

                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                  Output size: <strong style={{ color: "var(--text-main)" }}>{outputWidth} × {outputHeight} px</strong>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Preview */}
        <div className="card" style={{ display: "flex", flexDirection: "column", minHeight: "350px" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>Enlarged Preview</h3>
          {!imageSrc ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--border-light)", borderRadius: "8px", background: "#f8fafc", padding: "2rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center" }}>
                Upload an image to test out resizing and detail interpolation.
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
                  maxHeight: "350px",
                  overflow: "auto",
                  position: "relative",
                }}
              >
                {processing && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
                    <span style={{ fontWeight: 600, color: "var(--primary)" }}>Interpolating pixels...</span>
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1, display: "flex", justifyContent: "center" }}
                  onClick={handleDownload}
                  disabled={processing}
                >
                  <Download size={16} /> Download PNG
                </button>
                <button
                  className="btn btn-outline"
                  style={{ display: "flex", gap: "0.4rem" }}
                  onClick={handleCopyToClipboard}
                  disabled={processing}
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
        <h2>How does image enlargement work?</h2>
        <p>
          Raster images (like JPEGs and PNGs) are collections of individual pixels. When you make an image larger, you are spreading those pixels farther apart. The computer has to decide how to fill in the gaps between the original pixels. This process is called <strong>interpolation</strong>.
        </p>
        <p>
          We offer three primary interpolation options:
        </p>
        <ul>
          <li>
            <strong>Nearest Neighbor:</strong> This method finds the nearest pixel in the original image and copies its color directly. It does not mix colors or smooth things out. The result is a sharp, pixelated, retro-looking image. It is perfect for pixel art, screenshots of UI code, or preserving crisp lines.
          </li>
          <li>
            <strong>Bilinear Interpolation:</strong> This averages the colors of the nearest 2x2 grid of pixels. It softens the image and helps get rid of pixel blocks, though it can look slightly blurry.
          </li>
          <li>
            <strong>Bicubic Interpolation:</strong> The gold standard for photo resizing. It calculates a weighted average of a 4x4 grid of surrounding pixels, applying a cubic mathematical curve to create smooth, natural transitions and preserve edges.
          </li>
        </ul>
        <h2>Why use our offline client-side upscaler?</h2>
        <p>
          Unlike cloud-based upscalers that send your files to remote servers (where they might get saved or looked at), this tool is completely local. Everything happens inside your browser tab using the canvas graphics processor.
        </p>
        <p>
          For normal resizing, our tool uses high-quality hardware-accelerated rendering pipelines native to modern browsers. For users who need maximum mathematical precision, we also provide a custom bicubic shader implemented directly in JavaScript that calculates the Hermite curves pixel by pixel.
        </p>
      </div>
    </div>
  );
}
