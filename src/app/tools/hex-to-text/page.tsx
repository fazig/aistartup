"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import { Hash, Copy, Check, Trash2, AlertCircle, ArrowLeft } from "lucide-react";

export default function HexToText() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }

    // Clean input: remove spaces, commas, newlines, and common prefixes (like 0x or \x)
    let cleaned = input
      .replace(/0x/gi, "")
      .replace(/\\x/gi, "")
      .replace(/[\s,]+/g, "");

    // Validate that cleaned text contains only hexadecimal digits
    if (!/^[0-9a-fA-F]+$/.test(cleaned)) {
      setError("Invalid hexadecimal format: Please use digits 0-9 and letters A-F only (spaces and '0x' prefixes are fine).");
      setOutput("");
      return;
    }

    // Ensure hex characters are in pairs (each byte is 2 hex chars)
    if (cleaned.length % 2 !== 0) {
      setError("Incomplete byte sequence: Hex code must have an even number of characters (each byte is represented by a pair).");
      setOutput("");
      return;
    }

    setError("");

    try {
      const bytes: string[] = [];
      for (let i = 0; i < cleaned.length; i += 2) {
        bytes.push(cleaned.slice(i, i + 2));
      }

      const text = bytes
        .map((hexByte) => {
          const charCode = parseInt(hexByte, 16);
          return String.fromCharCode(charCode);
        })
        .join("");

      setOutput(text);
    } catch (err: any) {
      setError("Failed to decode hexadecimal code. Ensure valid byte sequences are entered.");
      setOutput("");
    }
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
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
          <Hash color="var(--primary)" /> Hex to Text Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Decode hexadecimal character strings back into readable plain text instantly.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "stretch" }}>
        {/* Input */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Hexadecimal Input</h3>
          <textarea
            className="input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 48 65 6c 6c 6f or 0x48 0x65 0x6c 0x6c 0x6f"
            style={{ flex: 1, minHeight: "250px", fontSize: "1rem", fontFamily: "monospace", lineHeight: "1.6" }}
          />
          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#dc2626", fontSize: "0.85rem", marginTop: "0.5rem" }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Output */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Plain Text Output</h3>
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
            placeholder="Decoded plain text will show here..."
            style={{ flex: 1, minHeight: "250px", fontSize: "1rem", lineHeight: "1.6", background: "#f8fafc" }}
          />
          <div style={{ textAlign: "right", marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {output.length} characters
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>How to convert hex to text</h2>
        <p>
          Each pair of hexadecimal digits matches exactly one byte of character data. Decoding is the inverse of encoding:
        </p>
        <p>
          Let&apos;s say you want to decode the string <code>48 65 6c 6c 6f</code>:
        </p>
        <ul>
          <li><code>48</code> in base-16 equals <code>(4 * 16) + 8 = 72</code> in decimal. The ASCII character for 72 is <strong>H</strong>.</li>
          <li><code>65</code> in base-16 equals <code>(6 * 16) + 5 = 101</code>. The character is <strong>e</strong>.</li>
          <li><code>6c</code> in base-16 equals <code>(6 * 16) + 12 = 108</code>. The character is <strong>l</strong>.</li>
          <li><code>6f</code> in base-16 equals <code>(6 * 16) + 15 = 111</code>. The character is <strong>o</strong>.</li>
        </ul>
        <p>
          Assembled together, you get the word <strong>Hello</strong>.
        </p>

        <h2>Robust parsing capabilities</h2>
        <p>
          Our converter is built to handle multiple notation styles automatically. It will strip out common code prefixes like
          <code>0x</code> or C-style escape codes like <code>\x</code>, and clean up any spaces, commas, or line breaks. This allows
          you to copy hex dump values directly from memory visualizers, wireshark logs, or compiler outputs, and paste them straight
          in for instant decoding.
        </p>
      </div>
    </div>
  );
}
