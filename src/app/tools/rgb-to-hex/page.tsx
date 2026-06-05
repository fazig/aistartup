"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import { Palette, Copy, Check, ArrowLeft } from "lucide-react";

export default function RgbToHex() {
  const [r, setR] = useState<number | "">(255);
  const [g, setG] = useState<number | "">(99);
  const [b, setB] = useState<number | "">(71);
  const [hex, setHex] = useState("#FF6347");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (r !== "" && g !== "" && b !== "") {
      const red = Math.max(0, Math.min(255, r)).toString(16).padStart(2, "0");
      const green = Math.max(0, Math.min(255, g)).toString(16).padStart(2, "0");
      const blue = Math.max(0, Math.min(255, b)).toString(16).padStart(2, "0");
      setHex(`#${red}${green}${blue}`.toUpperCase());
    } else {
      setHex("#000000"); // default fallback if empty
    }
  }, [r, g, b]);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleHexChange = (val: string) => {
    let cleanHex = val.replace("#", "");
    if (cleanHex.length === 6) {
      const parsedR = parseInt(cleanHex.substring(0, 2), 16);
      const parsedG = parseInt(cleanHex.substring(2, 4), 16);
      const parsedB = parseInt(cleanHex.substring(4, 6), 16);
      if (!isNaN(parsedR) && !isNaN(parsedG) && !isNaN(parsedB)) {
        setR(parsedR);
        setG(parsedG);
        setB(parsedB);
      }
    }
    setHex(val); // let them type
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
          <Palette color="var(--primary)" /> RGB to Hex Converter
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly convert RGB color codes into HEX format, or vice-versa.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Controls Area */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>RGB Values</h3>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#dc2626' }}>Red (R)</label>
              <input 
                type="number" 
                className="input-field" 
                min="0" max="255"
                value={r}
                onChange={(e) => setR(e.target.value === "" ? "" : parseInt(e.target.value))}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#16a34a' }}>Green (G)</label>
              <input 
                type="number" 
                className="input-field" 
                min="0" max="255"
                value={g}
                onChange={(e) => setG(e.target.value === "" ? "" : parseInt(e.target.value))}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2563eb' }}>Blue (B)</label>
              <input 
                type="number" 
                className="input-field" 
                min="0" max="255"
                value={b}
                onChange={(e) => setB(e.target.value === "" ? "" : parseInt(e.target.value))}
              />
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>HEX Value</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className="input-field" 
              style={{ fontWeight: 'bold', fontSize: '1.1rem' }}
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleCopy}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: hex, minHeight: '300px', border: '1px solid var(--border-strong)' }}>
          <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{hex}</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', textAlign: 'center' }}>rgb({r || 0}, {g || 0}, {b || 0})</p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What's the difference between RGB and HEX?</h2>
        <p>If you've ever dabbled in graphic design, photo editing, or building a website, you've probably stared at a color picker and wondered why there are so many different ways to describe a single color. The two most common ways are RGB and HEX.</p>
        <p><strong>RGB</strong> stands for Red, Green, and Blue. It's the system that your computer monitor or phone screen uses to actually produce the colors you see. It mixes different intensities of red, green, and blue light. Each color gets a number from 0 to 255. So, if you want pure red, you crank red all the way up to 255, and leave green and blue at 0 (rgb(255, 0, 0)).</p>
        <p><strong>HEX</strong> (short for Hexadecimal) is just a different way of writing that exact same RGB code, but it's formatted for web browsers. It uses a base-16 number system (0-9 and A-F) to squish those three numbers into a short, six-character string. For example, pure red in HEX is #FF0000.</p>

        <h2>Why do web developers use HEX?</h2>
        <p>Honestly? Because it's faster to type and easier to copy and paste. Writing <code>color: #FF0000;</code> in your CSS file takes up less space and is less prone to typos than writing <code>color: rgb(255, 0, 0);</code>. Browsers can read both perfectly fine, but HEX has become the standard shorthand for web design.</p>
        <p>The problem is that our human brains are pretty bad at doing base-16 math on the fly. If I hand you an RGB value of 71, 142, 209, you aren't going to be able to guess that the HEX equivalent is #478ED1 without a calculator. That's exactly why I built this tool.</p>

        <h2>How to use this converter</h2>
        <p>I tried to make this as foolproof as possible. You have two ways to use it:</p>
        <ul>
          <li><strong>Converting RGB to HEX:</strong> Just type your three numbers into the Red, Green, and Blue boxes. The HEX code will instantly generate below it, and the big preview box will change colors so you know you got it right. Click the copy button, and paste it into your CSS.</li>
          <li><strong>Converting HEX to RGB:</strong> You can also work backwards! If you have a HEX code (like #3B82F6), just paste it directly into the HEX input box. The tool will automatically calculate the math and fill in the Red, Green, and Blue boxes for you.</li>
        </ul>
      </div>
    </div>
  );
}
