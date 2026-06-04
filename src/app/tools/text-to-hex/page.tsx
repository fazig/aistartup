"use client";

import { useState, useEffect } from "react";
import { Hash, Copy, Check, Trash2 } from "lucide-react";

export default function TextToHex() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [prefix, setPrefix] = useState(false);
  const [spaces, setSpaces] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }

    try {
      const hexArr = Array.from(input).map((char) => {
        let code = char.charCodeAt(0).toString(16);
        if (uppercase) code = code.toUpperCase();
        if (code.length < 2) code = "0" + code; // pad single digit
        return prefix ? "0x" + code : code;
      });

      setOutput(hexArr.join(spaces ? " " : ""));
    } catch (e) {
      setOutput("Error encoding text to hex");
    }
  }, [input, uppercase, prefix, spaces]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Hash color="var(--primary)" /> Text to Hex Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert plain text strings into hexadecimal codes. Perfect for developers working with raw buffers and encodings.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left: Input & Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Input Card */}
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Plain Text Input</h3>
            <textarea
              className="input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or paste your text here..."
              style={{ minHeight: "160px", fontSize: "1rem", lineHeight: "1.6" }}
            />
            <div style={{ textAlign: "right", marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {input.length} characters &bull; {new Blob([input]).size} bytes (UTF-8)
            </div>
          </div>

          {/* Options Card */}
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Formatting Options</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.95rem" }}>
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  style={{ accentColor: "var(--primary)", width: "1.15rem", height: "1.15rem" }}
                />
                Uppercase Hex (e.g., 4A vs 4a)
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.95rem" }}>
                <input
                  type="checkbox"
                  checked={prefix}
                  onChange={(e) => setPrefix(e.target.checked)}
                  style={{ accentColor: "var(--primary)", width: "1.15rem", height: "1.15rem" }}
                />
                Add &quot;0x&quot; prefix
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.95rem" }}>
                <input
                  type="checkbox"
                  checked={spaces}
                  onChange={(e) => setSpaces(e.target.checked)}
                  style={{ accentColor: "var(--primary)", width: "1.15rem", height: "1.15rem" }}
                />
                Separate by spaces
              </label>
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Hexadecimal Output</h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-primary" style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }} onClick={handleCopy} disabled={!output}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy"}
              </button>
              <button className="btn btn-outline" style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }} onClick={handleClear} disabled={!input && !output}>
                Clear
              </button>
            </div>
          </div>
          <textarea
            className="input-field"
            value={output}
            readOnly
            placeholder="Hexadecimal characters will show here..."
            style={{ flex: 1, minHeight: "260px", fontSize: "1rem", fontFamily: "monospace", lineHeight: "1.6", background: "#f8fafc" }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is hexadecimal and how is it used in computing?</h2>
        <p>
          While binary code uses base-2 (representing numbers with 0s and 1s), humans find reading long strings of bits extremely
          tiresome. The <strong>hexadecimal system</strong> solves this by using base-16. Since a standard decimal system only has
          numbers 0-9, hex uses the letters A-F to represent decimal values 10-15.
        </p>
        <p>
          Hexadecimal is incredibly efficient because exactly one byte of digital data (8 bits, e.g., <code>11111111</code>) can
          be represented by exactly two hex digits (e.g., <code>FF</code>). This matches the binary structure perfectly, making
          it the standard layout for inspecting memory contents, representing color codes in CSS, writing assembly programs, and
          formatting network packages.
        </p>

        <h2>Understanding the formatting options</h2>
        <p>
          Our converter is designed with professional developer workflows in mind:
        </p>
        <ul>
          <li>
            <strong>Capitalization (Uppercase/Lowercase)</strong>: Hex outputs are case-insensitive, but styling guides vary.
            HTML/CSS developers often prefer lowercase hex, while lower-level network logs might output uppercase.
          </li>
          <li>
            <strong>The 0x prefix</strong>: In C, C++, Java, and JavaScript, hexadecimal numbers are prefix-coded with <code>0x</code> to
            distinguish them from normal base-10 integers.
          </li>
          <li>
            <strong>Space separators</strong>: Adding spaces helps make long blocks readable, while removing them is useful if you are
            pasting values into hex editors.
          </li>
        </ul>
      </div>
    </div>
  );
}
