"use client";

import { useState, useMemo } from "react";
import { FileText, Copy, Check, Trash2, ArrowLeft, Table, List, Info } from "lucide-react";
import Link from "next/link";

export default function TextToDecimal() {
  const [inputText, setInputText] = useState("Hello! 👋");
  const [separator, setSeparator] = useState<"space" | "comma">("space");
  const [viewMode, setViewMode] = useState<"list" | "table">("list");
  const [copied, setCopied] = useState(false);

  // Characters with their code points
  const charData = useMemo(() => {
    if (!inputText) return [];
    
    // Array.from splits UTF-16 surrogate pairs (like emojis) correctly
    const chars = Array.from(inputText);
    
    return chars.map((char, index) => {
      const code = char.codePointAt(0) || 0;
      
      // Label helper for non-printable characters
      let displayChar = char;
      let charName = "Letter / Symbol";
      
      if (char === " ") {
        displayChar = "␣";
        charName = "Space";
      } else if (char === "\n") {
        displayChar = "↵";
        charName = "Line Feed (LF)";
      } else if (char === "\r") {
        displayChar = "␍";
        charName = "Carriage Return (CR)";
      } else if (char === "\t") {
        displayChar = "⇥";
        charName = "Tab (TAB)";
      } else if (code < 32) {
        displayChar = "";
        charName = "Control Character";
      }

      return {
        index: index + 1,
        rawChar: char,
        displayChar,
        charName,
        decimal: code,
        hex: `U+${code.toString(16).toUpperCase().padStart(4, "0")}`,
      };
    });
  }, [inputText]);

  // Generate output list format
  const decimalOutput = useMemo(() => {
    if (charData.length === 0) return "";
    const delimiter = separator === "space" ? " " : ", ";
    return charData.map((d) => d.decimal).join(delimiter);
  }, [charData, separator]);

  // Byte size of UTF-8 text
  const byteSize = useMemo(() => {
    try {
      return new TextEncoder().encode(inputText).length;
    } catch (e) {
      return inputText.length; // fallback
    }
  }, [inputText]);

  const handleCopy = () => {
    if (decimalOutput) {
      navigator.clipboard.writeText(decimalOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleClear = () => {
    setInputText("");
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* Back Button */}
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

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <FileText color="var(--primary)" /> Text to Decimal Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert plain text characters to their Unicode decimal code point values, with detailed tables and copy options.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Input Panel */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem" }}>Input Text</h3>
            {inputText && (
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Length: {inputText.length} chars | Size: {byteSize} bytes
              </span>
            )}
          </div>
          <textarea
            className="input-field"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
            style={{ minHeight: "180px", fontSize: "1.1rem", fontFamily: "inherit", lineHeight: "1.5", marginBottom: "1rem" }}
          />

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-outline" onClick={handleClear} disabled={!inputText} style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
              <Trash2 size={16} /> Clear Text
            </button>
          </div>
        </div>

        {/* Output Options and Display Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Decimal Output</h3>

          {/* Controls */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Separator</span>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button
                  className={`btn ${separator === "space" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setSeparator("space")}
                  style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                >
                  Space Separated
                </button>
                <button
                  className={`btn ${separator === "comma" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setSeparator("comma")}
                  style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                >
                  Comma Separated
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>View Format</span>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button
                  className={`btn ${viewMode === "list" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setViewMode("list")}
                  style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.25rem" }}
                >
                  <List size={14} /> List
                </button>
                <button
                  className={`btn ${viewMode === "table" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setViewMode("table")}
                  style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.25rem" }}
                >
                  <Table size={14} /> Table
                </button>
              </div>
            </div>
          </div>

          {/* List Display */}
          {inputText && viewMode === "list" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div
                style={{
                  padding: "1.25rem",
                  background: "#f8fafc",
                  border: "1px solid var(--border-light)",
                  borderRadius: "10px",
                  maxHeight: "260px",
                  overflowY: "auto",
                }}
              >
                <code style={{ wordBreak: "break-all", fontFamily: "monospace", fontSize: "1rem", lineHeight: "1.6", color: "var(--text-main)" }}>
                  {decimalOutput}
                </code>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleCopy}
                style={{ display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center" }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />} Copy Decimals
              </button>
            </div>
          )}

          {/* Table Display */}
          {inputText && viewMode === "table" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div
                style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: "10px",
                  maxHeight: "260px",
                  overflowY: "auto",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", fontFamily: "monospace" }}>
                  <thead style={{ background: "#f8fafc", borderBottom: "1px solid var(--border-light)", position: "sticky", top: 0 }}>
                    <tr>
                      <th style={{ padding: "0.6rem 0.75rem", textAlign: "left" }}>Index</th>
                      <th style={{ padding: "0.6rem 0.75rem", textAlign: "center" }}>Char</th>
                      <th style={{ padding: "0.6rem 0.75rem", textAlign: "left" }}>Name / Type</th>
                      <th style={{ padding: "0.6rem 0.75rem", textAlign: "right", color: "var(--primary)" }}>Decimal</th>
                      <th style={{ padding: "0.6rem 0.75rem", textAlign: "right" }}>Unicode Hex</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charData.map((data, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid var(--border-light)" }}>
                        <td style={{ padding: "0.5rem 0.75rem" }}>{data.index}</td>
                        <td style={{ padding: "0.5rem 0.75rem", textAlign: "center", fontWeight: 700, fontSize: "1.1rem" }}>
                          {data.displayChar}
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>{data.charName}</td>
                        <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", fontWeight: 700, color: "var(--primary)" }}>{data.decimal}</td>
                        <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", color: "var(--text-muted)" }}>{data.hex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  className="btn btn-primary"
                  onClick={handleCopy}
                  style={{ display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center", flex: 1 }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />} Copy Decimals
                </button>
              </div>
            </div>
          )}

          {!inputText && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", color: "var(--text-muted)" }}>
              <Info size={32} style={{ marginBottom: "0.5rem", opacity: 0.5 }} />
              <p>Type some text in the left input box to see the decimal values here.</p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Section */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <h2>How Does Text to Decimal Translation Work?</h2>
        <p>
          Whenever we type letters, punctuation marks, spaces, or emojis on a computer, the machine doesn&apos;t store them as actual drawings or symbols. Instead, every character corresponds to a unique numerical value known as a <strong>code point</strong>. The universal standard that defines these values is called Unicode.
        </p>
        <p>
          Unicode maps characters to numbers in base-10 (decimal), base-16 (hexadecimal), and base-2 (binary). For instance, the uppercase letter &apos;A&apos; is assigned the decimal number 65, lowercase &apos;a&apos; is 97, and the exclamation mark &apos;!&apos; is 33. Emojis and other advanced characters are also part of Unicode, but their numbers are much larger. For example, the waving hand emoji 👋 has the decimal code point value of 128075.
        </p>
        <p>
          To translate text to decimal manually, you take each character in a word or phrase, look up its position in the Unicode Character Set table, and write down the corresponding base-10 number. With this tool, the system scans through your string character-by-character, executes a quick <code>codePointAt()</code> call behind the scenes, and produces the list of base-10 values instantly.
        </p>
        <p>
          This conversion is highly useful for developers, system administrators, and cybersecurity researchers. It helps to analyze hidden or non-printable character codes (like line endings, zero-width spaces, or control bytes) that might break databases or configuration files. It also helps you understand how different encodings—like UTF-8, which represents code points using different numbers of bytes—store your data physically.
        </p>
      </div>
    </div>
  );
}
