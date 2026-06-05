"use client";
import Link from "next/link";

import { useState } from "react";
import { Image as ImageIcon, Copy, Check, Code, ArrowLeft } from "lucide-react";

export default function ImageToBase64() {
  const [base64, setBase64] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [fileDetails, setFileDetails] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileDetails({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type
    });

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setBase64(result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setBase64("");
    setPreview(null);
    setFileDetails(null);
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
          <ImageIcon color="var(--primary)" /> Image to Base64 Converter
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly convert any JPG, PNG, WEBP, or SVG image file into a Base64 string for direct HTML/CSS embedding.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem', gap: '2rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Upload Image</h3>
            {preview && (
              <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleClear}>
                Clear
              </button>
            )}
          </div>
          
          {!preview ? (
            <div style={{ flexGrow: 1, border: '2px dashed var(--border-strong)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', textAlign: 'center', background: '#f8fafc', cursor: 'pointer', position: 'relative' }}>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileUpload}
                style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} 
              />
              <ImageIcon size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <strong style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Drag & Drop or Click to Upload</strong>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Supports JPG, PNG, WEBP, GIF, SVG</p>
            </div>
          ) : (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
              <div style={{ marginTop: '1rem', background: '#f1f5f9', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                <div><strong>File:</strong> {fileDetails.name}</div>
                <div><strong>Size:</strong> {fileDetails.size}</div>
                <div><strong>Type:</strong> {fileDetails.type}</div>
              </div>
            </div>
          )}
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Base64 String</h3>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!base64}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          
          <div style={{ flexGrow: 1, position: 'relative' }}>
            {base64 ? (
              <textarea 
                className="input-field"
                style={{ width: '100%', height: '100%', minHeight: '300px', resize: 'none', fontFamily: 'monospace', fontSize: '0.8rem', background: '#1e293b', color: '#f8fafc' }}
                readOnly
                value={base64}
              />
            ) : (
              <div style={{ height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border-strong)', color: 'var(--text-muted)' }}>
                <Code size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <p>Upload an image to generate the Base64 code.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose">
        <h2>What is Base64 Image Encoding?</h2>
        <p>Typically, when you want to display an image on a website, you upload the <code>.jpg</code> or <code>.png</code> file to your server, and then you link to it using an HTML tag like <code>&lt;img src="image.jpg"&gt;</code>. The browser reads the HTML, sees the link, and then makes a separate network request to download the image.</p>
        <p><strong>Base64 encoding completely changes this.</strong> It is a mathematical process that translates a binary image file into a massive string of ASCII text characters. Instead of linking to a file, you literally paste the massive string of text directly into your HTML or CSS code.</p>

        <h2>Why do web developers use this?</h2>
        <p>Converting an image to Base64 actually increases the file size of the image by about 30%. So why would anyone do it?</p>
        <ul>
          <li><strong>Fewer HTTP Requests:</strong> Every time a browser has to download a separate image file, it slows down the page load time. If you have 10 tiny UI icons (like a magnifying glass or a menu hamburger), converting them to Base64 text and embedding them directly into your CSS means the browser doesn't have to make 10 separate network requests. It loads instantly.</li>
          <li><strong>Email Signatures:</strong> Many email clients (like Outlook or Gmail) automatically block external image links to protect users from spam. By embedding your company logo as a Base64 string directly into your email signature's HTML code, it bypasses the block and displays instantly.</li>
          <li><strong>Offline Applications:</strong> If you are building a Progressive Web App (PWA) that needs to work without an internet connection, embedding assets as Base64 ensures they never break.</li>
        </ul>

        <h2>Is this tool safe to use?</h2>
        <p>Absolutely. Just like our other utility tools, this Base64 converter runs 100% locally using Javascript's native <code>FileReader</code> API. When you select an image, it is never uploaded to our servers. The conversion happens entirely within the RAM of your own web browser.</p>
      </div>
    </div>
  );
}
