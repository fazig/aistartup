"use client";
import Link from "next/link";

import { useState } from "react";
import { Download, QrCode, ArrowLeft } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function QrGenerator() {
  const [url, setUrl] = useState("https://startupai.tech");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#0f172a");

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    
    // Convert SVG to string
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    // Setup canvas size
    canvas.width = size + 40; // padding
    canvas.height = size + 40;
    
    img.onload = () => {
      // White background
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw image in center
        ctx.drawImage(img, 20, 20);
        // Trigger download
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "qrcode.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
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
          <QrCode color="#16a34a" /> Free QR Code Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly generate high-quality QR codes for URLs, text, or contact info.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Settings Area */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Configuration</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>URL or Text</label>
            <input 
              type="text" 
              className="input-field" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              placeholder="https://example.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Size (px)</label>
            <input 
              type="range" 
              min="128" 
              max="512" 
              step="32"
              style={{ width: '100%', marginBottom: '0.5rem' }}
              value={size} 
              onChange={(e) => setSize(Number(e.target.value))} 
            />
            <div style={{ textAlign: 'right', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{size} x {size} px</div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Color</label>
            <input 
              type="color" 
              value={fgColor} 
              onChange={(e) => setFgColor(e.target.value)} 
              style={{ width: '100%', height: '40px', padding: '0', border: '1px solid var(--border-strong)', borderRadius: '4px', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Preview Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ alignSelf: 'flex-start', fontSize: '1.25rem', marginBottom: '2rem' }}>Preview</h3>
          
          <div style={{ padding: '20px', background: 'white', borderRadius: '12px', border: '1px solid var(--border-light)', marginBottom: '2rem' }}>
            <QRCodeSVG 
              id="qr-code-svg"
              value={url || "https://startupai.tech"} 
              size={size} 
              fgColor={fgColor} 
              level="H"
            />
          </div>

          <button className="btn btn-primary" onClick={downloadQR} disabled={!url.trim()}>
            <Download size={18} /> Download PNG
          </button>
        </div>
      </div>

      {/* SEO Content Section for AdSense */}
      <div className="prose">
        <h2>What is a QR Code?</h2>
        <p>A QR code (Quick Response code) is a two-dimensional matrix barcode that can store a variety of data types, most commonly URLs, plain text, email addresses, or contact information. Unlike traditional UPC barcodes which are read mechanically by a narrow beam of light, QR codes are detected as a 2-dimensional digital image by a semiconductor image sensor and are then digitally analyzed by a programmed processor. Today, nearly every smartphone comes with a built-in QR code scanner within its native camera application, making them incredibly popular for marketing, menus, and information sharing.</p>

        <h2>How to Generate a Custom QR Code</h2>
        <p>Using our completely free QR code generator is incredibly straightforward. Follow these simple steps:</p>
        <ul>
          <li><strong>Step 1: Enter your content.</strong> Paste the URL of your website, a YouTube video link, your social media profile, or just plain text into the input field above.</li>
          <li><strong>Step 2: Adjust the size.</strong> Use the slider to increase or decrease the resolution of your QR code. If you plan to print the QR code on a large banner, you should increase the size to the maximum (512px) to prevent pixelation. If it's for a business card, a smaller size will work perfectly.</li>
          <li><strong>Step 3: Pick a color.</strong> While black and white is standard, you can customize the foreground color to match your brand's aesthetic. Ensure you pick a dark color to maintain high contrast with the white background, otherwise, older smartphone cameras might struggle to scan it.</li>
          <li><strong>Step 4: Download.</strong> Once you are happy with the preview, click "Download PNG" to instantly save the high-resolution image to your device.</li>
        </ul>

        <h2>Are these QR Codes static or dynamic?</h2>
        <p>Our tool generates <strong>Static QR Codes</strong>. This means the data you input (like the URL) is encoded directly into the pattern of the QR code itself. Because of this, the destination URL cannot be changed once the code is generated and printed. The massive advantage of static QR codes is that they are permanent, do not expire, and you do not need to pay a subscription fee to keep them active.</p>

        <h2>Common Use Cases for QR Codes</h2>
        <p>QR codes bridge the gap between the physical and digital worlds. Restaurants use them extensively to provide touchless digital menus. Marketers place them on flyers and posters to drive foot traffic to promotional landing pages. Business professionals add them to their business cards to quickly share their LinkedIn profiles or vCard contact details. They are also widely used in retail for contactless payments and on product packaging to link to user manuals or warranty registrations.</p>
        
        <h2>Is my data private?</h2>
        <p>Absolutely. Similar to our other developer tools, the generation of the QR code happens entirely locally inside your web browser using an open-source javascript library. We do not track the URLs you enter, and we do not store the generated images on any server.</p>
      </div>
    </div>
  );
}
