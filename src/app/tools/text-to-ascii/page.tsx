"use client";

import { useState, useEffect } from "react";
import { Code, Copy, Check, Trash2 } from "lucide-react";

export default function TextToASCII() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }

    const asciiCodes = Array.from(input).map((char) => char.charCodeAt(0));
    setOutput(asciiCodes.join(" "));
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  // Sample lookup list for UI card
  const sampleAsciiList = [
    { char: "A-Z", range: "65 - 90" },
    { char: "a-z", range: "97 - 122" },
    { char: "0-9", range: "48 - 57" },
    { char: "[Space]", range: "32" },
    { char: "!", range: "33" },
    { char: "@", range: "64" },
    { char: "#", range: "35" },
    { char: "?", range: "63" },
  ];

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Code color="var(--primary)" /> Text to ASCII Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert plain text characters into their corresponding decimal ASCII numerical codes instantly.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Input */}
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Plain Text Input</h3>
            <textarea
              className="input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or paste text to convert..."
              style={{ minHeight: "150px", fontSize: "1rem", lineHeight: "1.6" }}
            />
            <div style={{ textAlign: "right", marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {input.length} character{input.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Output */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", margin: 0 }}>ASCII Codes Output</h3>
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
              placeholder="ASCII decimal codes will show here..."
              style={{ minHeight: "150px", fontSize: "1rem", fontFamily: "monospace", lineHeight: "1.6", background: "#f8fafc" }}
            />
          </div>
        </div>

        {/* ASCII Reference Guide Card */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>ASCII Quick Reference Chart</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            Common character sets and their corresponding decimal codes on the standard ASCII index:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            {sampleAsciiList.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.5rem 0.75rem",
                  background: "#f8fafc",
                  border: "1px solid var(--border-light)",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                }}
              >
                <span style={{ fontWeight: 700, color: "var(--text-main)" }}>{item.char}</span>
                <span style={{ color: "var(--primary)", fontFamily: "monospace" }}>{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is ASCII?</h2>
        <p>
          ASCII stands for <strong>American Standard Code for Information Interchange</strong>. Formulated in 1963, it was the
          first major universal coding system created to allow different teleprinters, telegraphs, and computers to share text.
          ASCII translates English characters into numbers ranging from 0 to 127.
        </p>
        <p>
          These 128 codes include lowercase letters (a-z), uppercase letters (A-Z), numbers (0-9), punctuation marks, and control
          characters (like newlines or backspaces). For example, capital letter <code>A</code> has the ASCII value <code>65</code>,
          while lowercase <code>a</code> is <code>97</code>.
        </p>

        <h2>Difference between ASCII and Unicode / UTF-8</h2>
        <p>
          Standard ASCII only works for basic English characters. It uses 7 bits per character, meaning it has a maximum limit of
          128 unique characters. As computer systems expanded globally, this became a major issue since other alphabets and symbols
          could not be coded. This led to the development of <strong>Unicode</strong>, which can map over a million characters. UTF-8
          was designed to be completely backward-compatible with ASCII—the first 128 character codes in UTF-8 are identical to standard ASCII.
        </p>

        <h2>Real-time translation</h2>
        <p>
          This converter processes each character you type by looking up its UTF-8 integer index (which matches ASCII for standard characters) and displays them as a space-separated string of integers. It is fully client-side and performs instantly.
        </p>
      </div>
    </div>
  );
}
