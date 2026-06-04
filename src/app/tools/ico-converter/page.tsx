"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Trash2, ArrowLeft, Image as ImageIcon, Settings, Info, Check, Copy } from "lucide-react";
import Link from "next/link";

interface SizeOption {
  width: number;
  height: number;
  label: string;
  selected: boolean;
}

export default function IcoConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [sizes, setSizes] = useState<SizeOption[]>([
    { width: 16, height: 16, label: "16x16 (Favicon)", selected: true },
    { width: 32, height: 32, label: "32x32 (Standard)", selected: true },
    { width: 48, height: 48, label: "48x48 (Desktop)", selected: true },
    { width: 64, height: 64, label: "64x64 (App)", selected: false },
    { width: 128, height: 128, label: "128x128 (Retina)", selected: true },
    { width: 256, height: 256, label: "256x256 (High-Res)", selected: false },
  ]);
  const [converting, setConverting] = useState(false);
  const [icoBlob, setIcoBlob] = useState<Blob | null>(null);
  const [icoUrl, setIcoUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setIcoBlob(null);
        if (icoUrl) URL.revokeObjectURL(icoUrl);
        setIcoUrl(null);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const toggleSize = (index: number) => {
    const updated = [...sizes];
    updated[index].selected = !updated[index].selected;
    setSizes(updated);
    setIcoBlob(null);
    if (icoUrl) URL.revokeObjectURL(icoUrl);
    setIcoUrl(null);
  };

  const handleConvert = async () => {
    if (!imageSrc) return;
    const selectedSizes = sizes.filter((s) => s.selected);
    if (selectedSizes.length === 0) {
      alert("Please select at least one icon size.");
      return;
    }

    setConverting(true);

    try {
      // Load source image
      const img = new Image();
      img.src = imageSrc;
      await new Promise((resolve) => (img.onload = resolve));

      const canvasList: { canvas: HTMLCanvasElement; width: number; height: number }[] = [];

      for (const size of selectedSizes) {
        const canvas = document.createElement("canvas");
        canvas.width = size.width;
        canvas.height = size.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Enable high-quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, size.width, size.height);
          canvasList.push({ canvas, width: size.width, height: size.height });
        }
      }

      // Convert all canvases to PNG blobs
      const pngBlobs: Blob[] = [];
      for (const item of canvasList) {
        const blob = await new Promise<Blob | null>((resolve) =>
          item.canvas.toBlob((b) => resolve(b), "image/png")
        );
        if (blob) pngBlobs.push(blob);
      }

      const N = pngBlobs.length;
      const headerSize = 6;
      const dirSize = 16;
      const directoryOffset = headerSize + N * dirSize;

      let currentOffset = directoryOffset;
      const fileParts: ArrayBuffer[] = [];

      // Header: 6 bytes
      const headerBuffer = new ArrayBuffer(headerSize);
      const headerView = new DataView(headerBuffer);
      headerView.setUint16(0, 0, true); // Reserved
      headerView.setUint16(2, 1, true); // Type (1 = ICO)
      headerView.setUint16(4, N, true); // Count
      fileParts.push(headerBuffer);

      // Directory entries compile
      const directoriesBuffer = new ArrayBuffer(N * dirSize);
      const dirView = new DataView(directoriesBuffer);

      const blobBuffers: ArrayBuffer[] = [];
      for (let i = 0; i < N; i++) {
        const blob = pngBlobs[i];
        const arrayBuffer = await blob.arrayBuffer();
        blobBuffers.push(arrayBuffer);

        const width = canvasList[i].width;
        const height = canvasList[i].height;
        const sizeBytes = arrayBuffer.byteLength;

        const entryOffset = i * dirSize;
        dirView.setUint8(entryOffset + 0, width >= 256 ? 0 : width); // Width (0 means 256)
        dirView.setUint8(entryOffset + 1, height >= 256 ? 0 : height); // Height (0 means 256)
        dirView.setUint8(entryOffset + 2, 0); // Palette color count
        dirView.setUint8(entryOffset + 3, 0); // Reserved
        dirView.setUint16(entryOffset + 4, 1, true); // Color planes
        dirView.setUint16(entryOffset + 6, 32, true); // Bits per pixel
        dirView.setUint32(entryOffset + 8, sizeBytes, true); // Size
        dirView.setUint32(entryOffset + 12, currentOffset, true); // Offset

        currentOffset += sizeBytes;
      }

      fileParts.push(directoriesBuffer);
      blobBuffers.forEach((buf) => fileParts.push(buf));

      const finalIcoBlob = new Blob(fileParts, { type: "image/x-icon" });
      setIcoBlob(finalIcoBlob);
      const url = URL.createObjectURL(finalIcoBlob);
      setIcoUrl(url);
    } catch (err) {
      console.error(err);
      alert("An error occurred during ICO generation.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (!icoUrl) return;
    const a = document.createElement("a");
    a.href = icoUrl;
    a.download = file ? `${file.name.replace(/\.[^/.]+$/, "")}.ico` : "favicon.ico";
    a.click();
  };

  const handleCopyBase64 = async () => {
    if (!icoBlob) return;
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        navigator.clipboard.writeText(base64data);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };
      reader.readAsDataURL(icoBlob);
    } catch (err) {
      console.error(err);
      alert("Failed to copy Base64 string.");
    }
  };

  const handleClear = () => {
    if (icoUrl) URL.revokeObjectURL(icoUrl);
    setFile(null);
    setImageSrc(null);
    setIcoBlob(null);
    setIcoUrl(null);
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
          <Settings color="var(--primary)" /> ICO Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert PNG, JPG, or WebP images into real single or multi-resolution Windows ICO files instantly in your browser.
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
                  Upload Source Image
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Select a high-res PNG, JPG, or WebP</span>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
              </label>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-main)", wordBreak: "break-all", textAlign: "left" }}>
                    {file?.name}
                  </span>
                  <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }} onClick={handleClear}>
                    <Trash2 size={14} /> Clear
                  </button>
                </div>

                <div style={{ textAlign: "left" }}>
                  <label className="input-label" style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
                    Select embedded resolutions:
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem" }}>
                    {sizes.map((sz, idx) => (
                      <label
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.5rem",
                          border: "1px solid var(--border-light)",
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          background: sz.selected ? "#f0fdf4" : "transparent",
                          borderColor: sz.selected ? "#86efac" : "var(--border-light)",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={sz.selected}
                          onChange={() => toggleSize(idx)}
                          style={{ accentColor: "var(--primary)" }}
                        />
                        <span>{sz.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={handleConvert}
                  disabled={converting}
                >
                  {converting ? "Processing..." : "Convert to ICO"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Output */}
        <div className="card" style={{ display: "flex", flexDirection: "column", minHeight: "300px" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>ICO Output</h3>
          {!icoUrl ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--border-light)", borderRadius: "8px", background: "#f8fafc", padding: "2rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center" }}>
                Generate your icon to download or copy the raw Base64 data.
              </p>
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", padding: "1.5rem", border: "1px solid var(--border-light)", borderRadius: "8px", background: "#ffffff" }}>
                {sizes.filter((s) => s.selected).map((s, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                    <div style={{ width: s.width, height: s.height, border: "1px solid #e2e8f0", position: "relative", overflow: "hidden", background: "repeating-conic-gradient(#f0f0f0 0% 25%, transparent 0% 50%) 50% / 8px 8px" }}>
                      <img src={imageSrc!} alt={`${s.width}x`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{s.width}x{s.height}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button className="btn btn-primary" style={{ flex: 1, display: "flex", justifyContent: "center" }} onClick={handleDownload}>
                  <Download size={16} /> Download .ICO File
                </button>
                <button
                  className="btn btn-outline"
                  style={{ display: "flex", gap: "0.4rem" }}
                  onClick={handleCopyBase64}
                  title="Copy as Data URL Base64"
                >
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  {copied ? "Base64 Copied!" : "Copy Base64"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO prose */}
      <div className="prose">
        <h2>What makes a real ICO file unique?</h2>
        <p>
          Unlike formats like PNG or JPEG, which hold a single pixel grid, an ICO file is a wrapper designed for icon storage. It contains a look-up table directory pointing to multiple distinct images of different sizes. This means a single `.ico` file can store a 16x16 icon for small browser tabs, a 32x32 icon for bookmark lists, and a 128x128 or 256x256 icon for system shells.
        </p>
        <p>
          When you select sizes like 16x16, 32x32, and 128x128 in our converter, we create distinct canvases, downscale your high-resolution original image onto them with high-quality smoothing, compress them into independent PNG blocks, and package them together in a binary stream. The resulting file is a genuine, multi-resolution `.ico` container compliant with standard Windows and web browser specs.
        </p>
        <h2>Why use a client-side ICO converter?</h2>
        <p>
          Normally, compiling multi-resolution icons requires specialized software or command-line utilities like ImageMagick. Online converters often require you to upload your files, which presents security issues if you are working on private business logos or brand assets.
        </p>
        <p>
          Our tool runs 100% locally. By generating raw file bytes in the browser via JavaScript ArrayBuffers and compiled directories, we can build the ICO header, write directories pointing to exact offsets, and assemble the file without sending a single byte to an external server. It is extremely fast, private, and compatible with all modern systems.
        </p>
      </div>
    </div>
  );
}
