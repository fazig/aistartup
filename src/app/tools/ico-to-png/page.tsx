"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Trash2, ArrowLeft, Image as ImageIcon, Copy, Check, Info } from "lucide-react";
import Link from "next/link";

interface IcoFrame {
  index: number;
  width: number;
  height: number;
  bpp: number;
  size: number;
  offset: number;
  isPng: boolean;
  pngUrl?: string; // Direct URL to extracted PNG if available
}

export default function IcoToPng() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Full ICO Object URL
  const [frames, setFrames] = useState<IcoFrame[]>([]);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setError(null);
    setFrames([]);
    setSelectedFrameIndex(0);

    // Validate extension/type just in case
    if (!uploadedFile.name.endsWith(".ico") && uploadedFile.type !== "image/x-icon") {
      setError("Please upload a valid .ico file.");
      return;
    }

    setFile(uploadedFile);

    // Read file as ArrayBuffer for binary parsing
    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const view = new DataView(arrayBuffer);

      if (arrayBuffer.byteLength < 6) {
        throw new Error("File is too small to be a valid ICO.");
      }

      const reserved = view.getUint16(0, true);
      const type = view.getUint16(2, true);
      const count = view.getUint16(4, true);

      if (reserved !== 0 || (type !== 1 && type !== 2)) {
        throw new Error("Invalid ICO header signature. This file might not be a valid icon.");
      }

      if (count === 0) {
        throw new Error("No images found in the ICO file.");
      }

      const parsedFrames: IcoFrame[] = [];

      for (let i = 0; i < count; i++) {
        const offset = 6 + i * 16;
        if (offset + 16 > arrayBuffer.byteLength) break;

        const wByte = view.getUint8(offset);
        const hByte = view.getUint8(offset + 1);
        const width = wByte === 0 ? 256 : wByte;
        const height = hByte === 0 ? 256 : hByte;

        const bpp = view.getUint16(offset + 6, true);
        const size = view.getUint32(offset + 8, true);
        const dataOffset = view.getUint32(offset + 12, true);

        // Check if image data starts with PNG signature
        let isPng = false;
        let pngUrl: string | undefined;

        if (dataOffset + 8 <= arrayBuffer.byteLength) {
          const sig = new Uint8Array(arrayBuffer, dataOffset, 8);
          if (
            sig[0] === 0x89 &&
            sig[1] === 0x50 &&
            sig[2] === 0x4E &&
            sig[3] === 0x47 &&
            sig[4] === 0x0D &&
            sig[5] === 0x0A &&
            sig[6] === 0x1A &&
            sig[7] === 0x0A
          ) {
            isPng = true;
            // Create a direct blob for the raw PNG frame to ensure lossless extraction
            const pngData = new Uint8Array(arrayBuffer, dataOffset, size);
            const pngBlob = new Blob([pngData], { type: "image/png" });
            pngUrl = URL.createObjectURL(pngBlob);
          }
        }

        parsedFrames.push({
          index: i,
          width,
          height,
          bpp,
          size,
          offset: dataOffset,
          isPng,
          pngUrl,
        });
      }

      setFrames(parsedFrames);

      // Create object URL for the entire ICO file so browser can load it as an image
      const icoUrl = URL.createObjectURL(uploadedFile);
      setImageSrc(icoUrl);
    } catch (err: any) {
      setError(err.message || "Failed to parse the ICO file structure.");
      setFile(null);
    }
  };

  // Redraw canvas when selected frame changes or full image loads
  useEffect(() => {
    if (!imageSrc || frames.length === 0) return;

    const frame = frames[selectedFrameIndex];
    if (!frame) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      renderCanvas(frame);
    };
  }, [imageSrc, frames, selectedFrameIndex]);

  const renderCanvas = (frame: IcoFrame) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to the selected frame dimensions
    canvas.width = frame.width;
    canvas.height = frame.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the image. The browser's native decoder will select or scale the closest frame.
    ctx.drawImage(img, 0, 0, frame.width, frame.height);
  };

  const handleDownload = () => {
    const frame = frames[selectedFrameIndex];
    if (!frame) return;

    // If it's a PNG frame, we download the original binary directly to ensure 100% losslessness!
    if (frame.isPng && frame.pngUrl) {
      const a = document.createElement("a");
      a.href = frame.pngUrl;
      a.download = `${file?.name.replace(/\.[^/.]+$/, "")}-${frame.width}x${frame.height}.png`;
      a.click();
      return;
    }

    // Otherwise, read from canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${file?.name.replace(/\.[^/.]+$/, "")}-${frame.width}x${frame.height}.png`;
    a.click();
  };

  const handleCopyToClipboard = async () => {
    const frame = frames[selectedFrameIndex];
    if (!frame) return;

    try {
      let blob: Blob | null = null;

      // Try to fetch original PNG blob first if lossless
      if (frame.isPng && frame.pngUrl) {
        const response = await fetch(frame.pngUrl);
        blob = await response.blob();
      } else {
        // Fall back to canvas blob
        const canvas = canvasRef.current;
        if (!canvas) return;
        blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      }

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
      alert("Clipboard copy not supported or failed. Try downloading the image instead.");
    }
  };

  const handleClear = () => {
    // Revoke object URLs to prevent memory leaks
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    frames.forEach((f) => {
      if (f.pngUrl) URL.revokeObjectURL(f.pngUrl);
    });

    setFile(null);
    setImageSrc(null);
    setFrames([]);
    setSelectedFrameIndex(0);
    setError(null);
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
          <ImageIcon color="var(--primary)" /> ICO to PNG Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Extract and convert individual frames from an .ico file into transparent PNG images completely in your browser.
        </p>
      </div>

      {error && (
        <div className="card" style={{ borderLeft: "4px solid #ef4444", marginBottom: "1.5rem", background: "#fef2f2" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "#b91c1c", fontWeight: 600 }}>
            <Info size={18} /> Error loading file
          </div>
          <p style={{ color: "#7f1d1d", fontSize: "0.9rem", marginTop: "0.25rem" }}>{error}</p>
        </div>
      )}

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Side: Upload & Frame Selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
            {!file ? (
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
                  Select or Drop ICO File
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Supports .ico files containing one or more sizes</span>
                <input type="file" accept=".ico,image/x-icon" onChange={handleFileChange} style={{ display: "none" }} />
              </label>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "0.95rem", color: "var(--text-main)", fontWeight: 600, wordBreak: "break-all" }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {(file.size / 1024).toFixed(1)} KB &bull; {frames.length} sizes found
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }} onClick={handleClear}>
                    <Trash2 size={14} /> Clear
                  </button>
                </div>

                {frames.length > 0 && (
                  <div style={{ textAlign: "left", marginTop: "1rem" }}>
                    <label className="input-label" style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
                      Select Frame Size to Extract:
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "200px", overflowY: "auto", border: "1px solid var(--border-light)", borderRadius: "8px", padding: "0.5rem" }}>
                      {frames.map((frame, idx) => (
                        <button
                          key={frame.index}
                          onClick={() => setSelectedFrameIndex(idx)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.6rem 0.8rem",
                            borderRadius: "6px",
                            border: selectedFrameIndex === idx ? "1px solid var(--primary)" : "1px solid transparent",
                            background: selectedFrameIndex === idx ? "#eff6ff" : "transparent",
                            cursor: "pointer",
                            textAlign: "left",
                            fontSize: "0.85rem",
                            color: selectedFrameIndex === idx ? "var(--primary)" : "var(--text-main)",
                          }}
                        >
                          <span style={{ fontWeight: selectedFrameIndex === idx ? 700 : 500 }}>
                            {frame.width} × {frame.height} ({frame.bpp}-bit)
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {frame.isPng ? "Lossless PNG" : "BMP Frame"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Preview & Export */}
        <div className="card" style={{ display: "flex", flexDirection: "column", minHeight: "320px" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>Frame Preview</h3>
          {!file || frames.length === 0 ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--border-light)", borderRadius: "8px", background: "#f8fafc", padding: "2rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center" }}>
                Upload an icon file to preview and extract individual PNG frames.
              </p>
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                  background: "repeating-conic-gradient(#f0f0f0 0% 25%, transparent 0% 50%) 50% / 20px 20px",
                  backgroundColor: "#ffffff",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  minHeight: "180px",
                }}
              >
                <canvas
                  ref={canvasRef}
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "180px",
                    objectFit: "contain",
                    imageRendering: "pixelated",
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
        <h2>How does the ICO to PNG Converter work?</h2>
        <p>
          ICO files are actually containers that hold multiple smaller images at different resolutions and color depths. Operating systems (like Windows and macOS) use these container files to choose the optimal icon resolution based on where it is displayed (e.g., small taskbar icons vs. large desktop shortcuts).
        </p>
        <p>
          This tool performs client-side binary parsing of the ICO directory structure. When you load a file, it reads the 6-byte header to verify the count of embedded images and then scans the 16-byte directories to extract each individual frame. If a frame is stored natively as a PNG, our tool reads the raw binary segments and delivers it back to you byte-for-byte losslessly. For older legacy frames stored in BMP format, we render the data onto a canvas and export it cleanly.
        </p>
        <h2>Why extract PNGs from an ICO file?</h2>
        <p>
          Sometimes you only have the favicon or app launcher icon, but you need a crisp, transparent PNG logo for a mock-up, website layout, or presentation. Extracting the largest resolution PNG frame (such as 128x128 or 256x256 pixels) gives you a high-quality logo asset directly from the source.
        </p>
        <p>
          Additionally, processing everything directly in your browser means you do not have to worry about privacy or copyright leaks. Your image is parsed entirely inside your local device memory using JavaScript ArrayBuffers. No server communication occurs, keeping your corporate assets completely secure.
        </p>
      </div>
    </div>
  );
}
