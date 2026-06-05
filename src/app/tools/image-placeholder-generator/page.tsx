"use client";
import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import { Image as ImageIcon, Download, Settings, ArrowLeft } from "lucide-react";

export default function ImagePlaceholderGenerator() {
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [bgColor, setBgColor] = useState("#cccccc");
  const [textColor, setTextColor] = useState("#333333");
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawPlaceholder = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = parseInt(width) || 800;
    const h = parseInt(height) || 600;

    // Set canvas actual size
    canvas.width = w;
    canvas.height = h;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    // Draw text
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    const displayText = text || `${w} x ${h}`;
    
    // Auto scale font size based on canvas size
    let fontSize = Math.min(w, h) / 5;
    ctx.font = `bold ${fontSize}px sans-serif`;

    // Ensure text fits width
    while (ctx.measureText(displayText).width > w * 0.9 && fontSize > 10) {
      fontSize -= 2;
      ctx.font = `bold ${fontSize}px sans-serif`;
    }

    ctx.fillText(displayText, w / 2, h / 2);
  };

  // Re-draw whenever inputs change
  useEffect(() => {
    drawPlaceholder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, bgColor, textColor, text]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `placeholder-${width}x${height}.png`;
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
          <ImageIcon color="var(--primary)" /> Image Placeholder Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly generate dummy images with custom dimensions, colors, and text for your web design mockups.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
            <Settings size={20} /> Configuration
          </h3>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Width (px)</label>
              <input type="number" className="input-field" value={width} onChange={(e) => setWidth(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Height (px)</label>
              <input type="number" className="input-field" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Background Color</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="color" style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }} value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                <input type="text" className="input-field" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Text Color</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="color" style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }} value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                <input type="text" className="input-field" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Custom Text (Optional)</label>
            <input type="text" className="input-field" placeholder="Leave blank to show dimensions" value={text} onChange={(e) => setText(e.target.value)} />
          </div>

          <button className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }} onClick={handleDownload}>
            <Download size={20} /> Download PNG
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Live Preview</h3>
          
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', borderRadius: '8px', border: '1px dashed var(--border-strong)', padding: '1rem', overflow: 'hidden' }}>
            {/* The actual canvas is hidden, we use a CSS-scaled version of it for the preview so it fits in the box */}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            
            <div 
              style={{
                width: '100%',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: bgColor, 
                  color: textColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '2rem',
                  fontFamily: 'sans-serif',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              >
                {text || `${width} x ${height}`}
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
            Note: The preview above is scaled to fit your screen. When you click download, the file will be exactly {width}x{height} pixels.
          </p>
        </div>
      </div>

      <div className="prose">
        <h2>What is an Image Placeholder?</h2>
        <p>When web developers and UI designers are building the layout for a new website, they rarely have the final, polished photographs ready to use. Instead of halting production to wait for the photography team, developers use "dummy images" or "placeholders" to map out where the graphics will eventually go.</p>
        
        <h2>Why use our Generator?</h2>
        <p>While there are third-party services that generate placeholders via URLs (like <code>via.placeholder.com</code>), relying on them can severely slow down your local development environment because your computer has to download the image from their external server every time you refresh the page.</p>
        <p>Our tool runs 100% locally in your browser using the HTML5 Canvas API. This means you can instantly generate and download physical, lightweight PNG files to store locally inside your project folder. This guarantees that your development server will run at lightning speed, even without an internet connection.</p>
        
        <h3>Perfect for Rapid Prototyping</h3>
        <ul>
          <li><strong>Custom Dimensions:</strong> Create perfect hero banners (1920x1080), square avatars (500x500), or vertical sidebars (300x600).</li>
          <li><strong>Brand Colors:</strong> Use your exact HEX color codes to ensure the mockup matches your company's aesthetic before the real images arrive.</li>
          <li><strong>Contextual Labels:</strong> Add custom text (e.g., "Main Product Image" or "Author Headshot") so your client knows exactly what is supposed to go in that box during the design review.</li>
        </ul>
      </div>
    </div>
  );
}
