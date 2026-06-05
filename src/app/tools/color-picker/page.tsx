"use client";
import Link from "next/link";

import { useState } from "react";
import { Pipette, Copy, Check, ArrowLeft } from "lucide-react";

export default function ColorPicker() {
  const [color, setColor] = useState("#3b82f6"); // Default blue
  const [copiedHex, setCopiedHex] = useState(false);
  const [copiedRgb, setCopiedRgb] = useState(false);

  // Derive RGB from HEX
  const getRgb = (hex: string) => {
    let cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map(c => c + c).join("");
    }
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleCopyHex = () => {
    navigator.clipboard.writeText(color);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleCopyRgb = () => {
    navigator.clipboard.writeText(getRgb(color));
    setCopiedRgb(true);
    setTimeout(() => setCopiedRgb(false), 2000);
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
          <Pipette color="var(--primary)" /> HTML Color Picker Tool
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Visually select any color and instantly get the HTML, CSS HEX, and RGB codes.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Visual Picker Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', alignSelf: 'flex-start' }}>Select a Color</h3>
          
          <div style={{ position: 'relative', width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginBottom: '2rem', border: '4px solid white' }}>
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              style={{ position: 'absolute', top: '-10px', left: '-10px', width: '170px', height: '170px', cursor: 'pointer', border: 'none', padding: 0 }}
            />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Click the circle above to open the visual color wheel.</p>
        </div>

        {/* Results Area */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Color Codes</h3>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: color, border: '1px solid var(--border-strong)' }}></div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.25rem' }}>Preview</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>How it looks on a white background</div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>HEX Code (CSS / HTML)</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="input-field" 
                style={{ fontWeight: 'bold', fontFamily: 'monospace' }}
                readOnly
                value={color.toUpperCase()}
              />
              <button className="btn btn-primary" onClick={handleCopyHex}>
                {copiedHex ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>RGB Code</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="input-field" 
                style={{ fontWeight: 'bold', fontFamily: 'monospace' }}
                readOnly
                value={getRgb(color)}
              />
              <button className="btn btn-secondary" onClick={handleCopyRgb}>
                {copiedRgb ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>Why use a visual color picker?</h2>
        <p>If you are designing a website, building an app, or just putting together a digital presentation, getting your colors exactly right is incredibly important for your branding. But unless you are a computer, you probably don't know exactly what hex code corresponds to a "soft, muted sunset orange."</p>
        <p>That's what this HTML Color Picker is for. Instead of guessing codes or pulling up massive, memory-heavy design software like Photoshop just to grab a color, you can click the visual color wheel above. You can drag your mouse around to visually find the exact shade you are looking for. Once you land on it, the tool automatically calculates the exact mathematical codes you need for web development.</p>

        <h2>Where do I use these color codes?</h2>
        <p>The tool provides two different outputs for the color you selected:</p>
        <ul>
          <li><strong>HEX Code (e.g., #3B82F6):</strong> This is the most common format used in web development. If you are writing CSS to change the background of a button or the color of some text, you will almost always use the HEX code. It's compact and universally supported by every web browser on the planet.</li>
          <li><strong>RGB Code (e.g., rgb(59, 130, 246)):</strong> RGB stands for Red, Green, and Blue. This is the exact same color, just written in a different format. Developers often use RGB when they need to add transparency to a color (which they do by adding an "alpha" value to make it RGBA).</li>
        </ul>

        <h2>How do I find a color from an image?</h2>
        <p>While this tool lets you pick colors visually from a spectrum, sometimes you want to extract a specific color from a photo or a logo. If you're on a modern operating system (like Mac or Windows), you can actually use their built-in screen capture tools. On a Mac, the "Digital Color Meter" app is built-in and lets you hover your mouse over any pixel on your screen to get the RGB values, which you can then plug into our RGB to HEX converter tool to get your web-ready code.</p>
        <p>Alternatively, many modern web browsers (like Google Chrome) have a tiny eyedropper tool built right into their native color selector. Depending on your browser, clicking the color circle at the top of this page might actually open a popup that includes an eyedropper icon, allowing you to click anywhere on your screen to steal that exact color!</p>
      </div>
    </div>
  );
}
