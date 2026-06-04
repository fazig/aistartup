"use client";

import { useState, useEffect } from "react";
import { Code, Copy, Check, Trash2, AlertCircle } from "lucide-react";

export default function ASCIIToText() {
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

    // Split input by space, comma, newline, or tab
    const tokens = input.split(/[\s,]+/).filter(Boolean);

    // Validate that all tokens are positive integers
    const invalidToken = tokens.find((token) => !/^\d+$/.test(token));
    if (invalidToken) {
      setError(`Invalid entry: "${invalidToken}" is not a valid decimal code. ASCII values must be positive numbers.`);
      setOutput("");
      return;
    }

    setError("");

    try {
      const chars = tokens.map((token) => {
        const val = parseInt(token, 10);
        if (val < 0 || val > 65535) {
          throw new Error(`Out of range: "${token}" exceeds character boundaries.`);
        }
        return String.fromCharCode(val);
      });
      setOutput(chars.join(""));
    } catch (err: any) {
      setError(err.message || "Failed to convert ASCII codes. Double-check your numbers.");
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
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Code color="var(--primary)" /> ASCII to Text Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert numeric ASCII decimal codes back into readable text characters instantly.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "stretch" }}>
        {/* Input */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>ASCII Decimal Codes</h3>
          <textarea
            className="input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 72, 101, 108, 108, 111 or 72 101 108 108 111"
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
                <Trash2 size={14} /> Clear
              </button>
            </div>
          </div>
          <textarea
            className="input-field"
            value={output}
            readOnly
            placeholder="Decoded text characters will show here..."
            style={{ flex: 1, minHeight: "250px", fontSize: "1rem", lineHeight: "1.6", background: "#f8fafc" }}
          />
          <div style={{ textAlign: "right", marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {output.length} characters
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>How to translate ASCII codes to text</h2>
        <p>
          Translating ASCII values back to text is straightforward once you separate the numbers. Each integer matches a specific character:
        </p>
        <p>
          Let&apos;s say you receive the codes <code>87 111 114 100</code>. Looking up the standard ASCII chart:
        </p>
        <ul>
          <li><code>87</code> corresponds to <strong>W</strong></li>
          <li><code>111</code> corresponds to <strong>o</strong></li>
          <li><code>114</code> corresponds to <strong>r</strong></li>
          <li><code>103</code> / <code>100</code> corresponds to <strong>d</strong></li>
        </ul>
        <p>
          Joining them together gives you the word <strong>Word</strong>.
        </p>

        <h2>Supported input formats</h2>
        <p>
          This ASCII decoder is designed to be highly flexible. You can separate your ASCII codes using spaces, commas, newlines,
          or tabs. The parser will automatically strip out commas and empty tokens to extract raw decimal codes and translate
          them. If it detects non-numeric letters or numbers outside the standard character ranges, it shows a helpful error description.
        </p>

        <h2>Confidentiality and safety first</h2>
        <p>
          Just like all other translation tools on our platform, this ASCII code reader operates completely on the client-side.
          Your text entries and decoded files are processed in local memory and are never sent to external servers or logged.
        </p>
      </div>
    </div>
  );
}
