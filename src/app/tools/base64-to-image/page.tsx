"use client";
import Link from "next/link";

import { useState } from "react";
import { Image as ImageIcon, Download, Code, AlertTriangle, ArrowLeft } from "lucide-react";

export default function Base64ToImage() {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Attempt to parse base64 and attach data prefix if missing
  const getValidImageSrc = () => {
    if (!base64.trim()) return null;
    
    let src = base64.trim();
    
    // Check if it already has the data URI scheme
    if (src.startsWith("data:image")) {
      return src;
    }
    
    // If it's raw base64, assume it's a PNG for preview purposes
    // (the browser will often figure it out anyway)
    return `data:image/png;base64,${src}`;
  };

  const imageSrc = getValidImageSrc();

  const handleDownload = () => {
    if (!imageSrc) return;
    const a = document.createElement("a");
    a.href = imageSrc;
    a.download = "decoded-image.png"; // default name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
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

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ImageIcon color="var(--primary)" /> Base64 to Image Decoder
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Paste a raw Base64 string to instantly decode it, preview the hidden image, and download the file.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem', gap: '2rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Paste Base64 String</h3>
            <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => setBase64("")} disabled={!base64}>
              Clear
            </button>
          </div>
          
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '350px', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.8rem', background: '#1e293b', color: '#f8fafc' }}
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
          />
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Decoded Image Preview</h3>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleDownload} disabled={!imageSrc}>
              <Download size={14} /> Download Image
            </button>
          </div>
          
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border-strong)', padding: '1rem', overflow: 'hidden' }}>
            {!imageSrc ? (
              <div style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                <Code size={48} style={{ opacity: 0.3, marginBottom: '1rem', margin: '0 auto' }} />
                <p>Paste a valid Base64 string to see the image.</p>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={imageSrc} 
                alt="Decoded output" 
                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
                onError={() => setError("Invalid Base64 string. Cannot decode image.")}
                onLoad={() => setError(null)}
              />
            )}
          </div>

          {error && (
             <div style={{ marginTop: '1rem', padding: '1rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <AlertTriangle size={18} /> {error}
             </div>
          )}
        </div>
      </div>

      <div className="prose">
        <h2>What does this tool do?</h2>
        <p>This tool is the exact opposite of our <strong>Image to Base64</strong> converter. If you are a developer inspecting the source code of a website, or reading through a massive JSON payload from an API, you might stumble across a massive, terrifying block of random characters that looks like this: <code>data:image/jpeg;base64,/9j/4AAQSkZJRgABA...</code></p>
        <p>Because humans cannot read Base64 code, there is no way to know what that image actually is without decoding it. You simply paste that massive string of code into the box above, and your web browser will instantly reassemble the text back into the original photograph, logo, or icon. You can then download the file directly to your hard drive.</p>
      </div>
    </div>
  );
}
