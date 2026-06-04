"use client";

import { useState, useEffect } from "react";
import { Binary, Copy, Check, Trash2, ArrowRight } from "lucide-react";

export default function TextToBinary() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }

    try {
      const binaryArr = Array.from(input).map((char) => {
        const codePoint = char.charCodeAt(0);
        // Pad to 8 bits
        return codePoint.toString(2).padStart(8, "0");
      });
      setOutput(binaryArr.join(" "));
    } catch (e) {
      setOutput("Error encoding text to binary");
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
  };

  const bitCount = output.replace(/\s+/g, "").length;
  const byteCount = input.length;

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Binary color="var(--primary)" /> Text to Binary Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert plain text into binary code (zeros and ones) instantly in your browser.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "stretch" }}>
        {/* Input */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Plain Text Input</h3>
          <textarea
            className="input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste your text here..."
            style={{ flex: 1, minHeight: "250px", fontSize: "1rem", lineHeight: "1.6" }}
          />
          <div style={{ textAlign: "right", marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {byteCount} character{byteCount !== 1 ? "s" : ""} &bull; {byteCount * 8} bits (approx)
          </div>
        </div>

        {/* Output */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Binary Code Output</h3>
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
            placeholder="Binary output (zeros and ones) will show here..."
            style={{ flex: 1, minHeight: "250px", fontSize: "1rem", fontFamily: "monospace", lineHeight: "1.6", background: "#f8fafc" }}
          />
          <div style={{ textAlign: "right", marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {bitCount} bits total &bull; {output.split(" ").filter(Boolean).length} bytes representation
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is binary code and how does it work?</h2>
        <p>
          At their lowest physical level, computers don&apos;t understand words, pixels, or decimal numbers. They are made of billions
          of microscopic transistors that act as switches, which can either be off (representing 0) or on (representing 1).
          This 2-symbol language is called the <strong>binary system</strong>.
        </p>
        <p>
          To represent human text as binary, we need a code system that maps every letter, number, and punctuation mark to a specific
          binary pattern. Historically, this mapping was done using ASCII (American Standard Code for Information Interchange), which
          assigns a number from 0 to 127 to 128 basic characters. Modern text translation uses UTF-8, which supports over 1.1 million
          characters (including emojis and international alphabets) by scaling codes from 8 to 32 bits.
        </p>

        <h2>How this text-to-binary tool converts your data</h2>
        <p>
          This tool runs completely inside your browser using JavaScript. When you type in text, the converter looks up the UTF-8
          code point of each character (its index number in the global unicode database), converts that base-10 number to a base-2
          binary number, pads it with leading zeros to make a standard 8-bit byte block, and outputs them separated by spaces for
          readability. It does all of this on-the-fly as you type, with zero server requests.
        </p>

        <h2>Common use cases</h2>
        <p>
          Developers use binary conversion when debugging data encodings or raw socket buffers. Students use it to learn how
          computers process and format strings under the hood. Or you can just use it to send a hidden, encrypted &quot;binary message&quot;
          to a friend as a joke!
        </p>
      </div>
    </div>
  );
}
