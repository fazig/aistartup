"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import { Binary, Copy, Check, Trash2, AlertCircle, ArrowLeft } from "lucide-react";

export default function BinaryToText() {
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

    // Clean up input by removing spaces and newlines to validate raw binary stream
    const cleaned = input.replace(/\s+/g, "");

    // Validate that input consists only of 0s and 1s
    if (!/^[01]+$/.test(cleaned)) {
      setError("Invalid input: Binary code must only contain 0s and 1s (and spaces).");
      setOutput("");
      return;
    }

    setError("");

    try {
      // Split into 8-bit bytes (if continuous, split every 8 chars; if space-separated, process chunks)
      let bytes: string[] = [];
      if (input.includes(" ")) {
        bytes = input.split(/\s+/).filter(Boolean);
      } else {
        // Chunk into blocks of 8 characters
        for (let i = 0; i < cleaned.length; i += 8) {
          bytes.push(cleaned.slice(i, i + 8));
        }
      }

      const text = bytes
        .map((byte) => {
          const decimalVal = parseInt(byte, 2);
          return String.fromCharCode(decimalVal);
        })
        .join("");

      setOutput(text);
    } catch (e) {
      setError("Failed to decode binary code. Ensure bytes are formatted correctly (8 bits each).");
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
          <Binary color="var(--primary)" /> Binary to Text Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Decode binary code (zeros and ones) back into readable English plain text in real-time.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "stretch" }}>
        {/* Input */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Binary Code Input</h3>
          <textarea
            className="input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 01001000 01100101 01101100 01101100 01101111"
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
            placeholder="Decoded text will show here..."
            style={{ flex: 1, minHeight: "250px", fontSize: "1rem", lineHeight: "1.6", background: "#f8fafc" }}
          />
          <div style={{ textAlign: "right", marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {output.length} characters &bull; {output.trim() ? output.trim().split(/\s+/).length : 0} words
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>How to read binary code manually</h2>
        <p>
          While computers can read binary instantly, humans require a bit of arithmetic to convert it back to letters.
          Each 8-digit block of binary represents a single character, known as a byte. The digits in a byte are positional powers
          of 2, starting from right to left (2^0 to 2^7).
        </p>
        <p>
          For example, the binary byte <code>01001000</code> can be calculated by adding the values of the slots where a 1 exists:
          <code>(0*128) + (1*64) + (0*32) + (0*16) + (1*8) + (0*4) + (0*2) + (0*1)</code> which equals <code>64 + 8 = 72</code>.
          Checking the standard ASCII table, the code 72 corresponds to the capital letter <strong>H</strong>.
        </p>

        <h2>Why does formatting matter?</h2>
        <p>
          Binary code is easiest to convert when it is separated by spaces into neat 8-bit blocks (bytes). However, this tool can also
          handle continuous binary streams (e.g., `0100100001100101` which is &quot;He&quot;) by automatically chunking the text
          every 8 characters. If your code contains letters, punctuation, or numbers other than 0 and 1, the built-in validator
          will flag the error immediately.
        </p>

        <h2>Offline, secure decoding</h2>
        <p>
          Your input strings are never sent to any server. Everything is decoded locally in your browser memory using client-side JavaScript.
          This ensures high-speed performance and complete confidentiality for whatever data you paste into the conversion box.
        </p>
      </div>
    </div>
  );
}
