"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check } from "lucide-react";

export default function HexToRgb() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Clean string
    let cleanHex = hex.trim();
    if (cleanHex.startsWith("#")) cleanHex = cleanHex.slice(1);
    
    // Validate
    const isValid = /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleanHex);
    setError(!isValid && hex.length > 0);

    if (isValid) {
      if (cleanHex.length === 3) {
        cleanHex = cleanHex.split("").map(x => x + x).join("");
      }
      
      const r = parseInt(cleanHex.slice(0, 2), 16);
      const g = parseInt(cleanHex.slice(2, 4), 16);
      const b = parseInt(cleanHex.slice(4, 6), 16);
      
      setRgb(`rgb(${r}, ${g}, ${b})`);
    } else {
      setRgb("Invalid HEX");
    }
  }, [hex]);

  const handleCopy = () => {
    if (error || !hex) return;
    navigator.clipboard.writeText(rgb);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Palette color="var(--primary)" /> HEX to RGB Converter
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly convert hexadecimal web colors into standard RGB values for CSS and graphic design.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Enter HEX Code</h3>
          
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1.25rem', fontWeight: 600 }}>#</span>
            <input 
              type="text" 
              className="input-field" 
              placeholder="ffffff"
              value={hex.replace('#', '')}
              onChange={(e) => setHex(e.target.value)}
              style={{ paddingLeft: '2.5rem', fontSize: '1.25rem', fontFamily: 'monospace', textTransform: 'uppercase', borderColor: error ? '#dc2626' : 'var(--border-strong)' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Color Preview</label>
            <div 
              style={{ 
                width: '100%', 
                height: '120px', 
                borderRadius: '8px', 
                background: !error && hex ? `#${hex.replace('#', '')}` : '#f1f5f9',
                border: '1px solid var(--border-light)',
                transition: 'background 0.3s ease'
              }} 
            />
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Converted RGB Value</h3>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={error || !hex}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy RGB'}
            </button>
          </div>
          
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border-strong)' }}>
            <span style={{ fontSize: '2rem', fontFamily: 'monospace', color: error ? '#dc2626' : 'var(--primary)', fontWeight: 600 }}>
              {rgb}
            </span>
          </div>
          
          {!error && hex && (
             <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
               <strong>CSS Example:</strong> <br/>
               <code style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '4px', display: 'block', marginTop: '0.5rem' }}>
                 background-color: {rgb};
               </code>
             </div>
          )}
        </div>
      </div>

      <div className="prose">
        <h2>What is HEX and RGB?</h2>
        <p>In the world of web development and digital design, computers need mathematical ways to represent color. The two most popular systems are <strong>HEX</strong> (Hexadecimal) and <strong>RGB</strong> (Red, Green, Blue).</p>
        
        <h3>HEX Colors</h3>
        <p>A Hexadecimal color code is a six-digit string of letters and numbers preceded by a hashtag (like <code>#FF0000</code>). It is essentially a base-16 mathematical shortcut that tells a computer screen how much color to display. It is the absolute standard for writing colors in HTML and CSS code.</p>

        <h3>RGB Colors</h3>
        <p>RGB stands for Red, Green, and Blue. Instead of confusing letters and numbers, RGB uses a scale from 0 to 255 for each color channel. For example, solid red is written as <code>rgb(255, 0, 0)</code> because the red channel is maxed out, and green and blue are set to zero.</p>

        <h2>Why do you need to convert them?</h2>
        <p>If you are building a website, your graphic designer will usually hand you a brand guidebook filled with HEX codes like <code>#3B82F6</code>. However, modern CSS styling often requires you to use RGB instead.</p>
        <p>Why? Because of <strong>Opacity (Transparency)</strong>.</p>
        <p>If you want to take a solid blue HEX code and make it 50% transparent, you cannot easily do that with a standard six-digit HEX code. You must convert it to RGB, and then add an "Alpha" channel to create RGBA. By converting <code>#3B82F6</code> to <code>rgba(59, 130, 246, 0.5)</code>, you successfully create a 50% transparent blue overlay for your website!</p>
      </div>
    </div>
  );
}
