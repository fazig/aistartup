"use client";

import { useState, useMemo } from "react";
import { FileText, Copy, Check, Trash2, ArrowLeft, AlertTriangle, Table, Info } from "lucide-react";
import Link from "next/link";

interface TokenValidation {
  token: string;
  index: number;
  isValid: boolean;
  val?: number;
  error?: string;
}

export default function DecimalToText() {
  const [input, setInput] = useState("72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33");
  const [copied, setCopied] = useState(false);

  // Split input into separate tokens
  const parsedTokens = useMemo(() => {
    if (!input.trim()) return [];
    // Split by spaces, commas, newlines, semicolons
    return input.split(/[\s,;]+/).filter((token) => token !== "");
  }, [input]);

  // Validate each token
  const validation = useMemo(() => {
    if (parsedTokens.length === 0) {
      return { allValid: true, results: [] as TokenValidation[], invalidCount: 0 };
    }

    let invalidCount = 0;
    const results = parsedTokens.map((token, idx): TokenValidation => {
      // Must contain only digits
      const isNumeric = /^\d+$/.test(token);
      if (!isNumeric) {
        invalidCount++;
        return { token, index: idx + 1, isValid: false, error: "Not a valid integer" };
      }

      const val = parseInt(token, 10);
      // Valid Unicode code points range from 0 to 0x10FFFF (1,114,111)
      if (val < 0 || val > 1114111) {
        invalidCount++;
        return {
          token,
          index: idx + 1,
          isValid: false,
          error: "Out of Unicode range (0 - 1,114,111)",
        };
      }

      return { token, index: idx + 1, isValid: true, val };
    });

    return {
      allValid: invalidCount === 0,
      results,
      invalidCount,
    };
  }, [parsedTokens]);

  // Convert numbers to text output
  const textOutput = useMemo(() => {
    if (!validation.allValid || validation.results.length === 0) return "";
    try {
      const codePoints = validation.results.map((r) => r.val as number);
      return String.fromCodePoint(...codePoints);
    } catch (e) {
      return "Conversion error. Verify Unicode range values.";
    }
  }, [validation]);

  const handleCopy = () => {
    if (textOutput) {
      navigator.clipboard.writeText(textOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* Back Button */}
      <Link
        href="/free-sumo-tools"
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
        <ArrowLeft size={16} /> Back to Free Sumo Tools
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <FileText color="var(--primary)" /> Decimal to Text Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Translate a sequence of Unicode decimal values back into readable text characters with immediate safety validations.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Input Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Decimal Values Input</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            Enter decimal numbers separated by spaces, commas, or semicolons:
          </p>
          <textarea
            className="input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 72, 101, 108, 108, 111"
            style={{ minHeight: "180px", fontSize: "1.1rem", fontFamily: "monospace", lineHeight: "1.6", marginBottom: "1rem" }}
          />

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-outline" onClick={handleClear} disabled={!input} style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
              <Trash2 size={16} /> Clear Input
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Converted Text Output</h3>

          {/* Validation Warnings */}
          {!validation.allValid && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "10px",
                padding: "1rem",
                color: "#991b1b",
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700 }}>
                <AlertTriangle size={18} />
                <span>Input Validation Failed ({validation.invalidCount} issue(s) detected)</span>
              </div>
              <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "0.85rem" }}>
                {validation.results
                  .filter((r) => !r.isValid)
                  .slice(0, 5) // Show first 5 errors
                  .map((err, idx) => (
                    <li key={idx} style={{ marginBottom: "0.25rem" }}>
                      Item #{err.index} (<code>&quot;{err.token}&quot;</code>): {err.error}
                    </li>
                  ))}
                {validation.invalidCount > 5 && (
                  <li>...and {validation.invalidCount - 5} more error(s) below.</li>
                )}
              </ul>
            </div>
          )}

          {/* Text Output Block */}
          {validation.allValid && input.trim() && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div
                style={{
                  padding: "1.25rem",
                  background: "#f8fafc",
                  border: "1px solid var(--border-light)",
                  borderRadius: "10px",
                  minHeight: "150px",
                  maxHeight: "260px",
                  overflowY: "auto",
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  color: "var(--text-main)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {textOutput}
              </div>

              <button
                className="btn btn-primary"
                onClick={handleCopy}
                disabled={!textOutput}
                style={{ display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center" }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />} Copy Text to Clipboard
              </button>
            </div>
          )}

          {/* Empty State */}
          {!input.trim() && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", color: "var(--text-muted)" }}>
              <Info size={32} style={{ marginBottom: "0.5rem", opacity: 0.5 }} />
              <p>Provide a sequence of decimal codes in the left panel to translate them to text.</p>
            </div>
          )}
        </div>
      </div>

      {/* Map visual table for code points */}
      {validation.allValid && validation.results.length > 0 && (
        <div className="card" style={{ marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Table size={18} /> Character Translation Mapping
          </h3>
          <div style={{ maxHeight: "250px", overflowY: "auto", border: "1px solid var(--border-light)", borderRadius: "10px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", fontFamily: "monospace" }}>
              <thead style={{ background: "#f8fafc", borderBottom: "1px solid var(--border-light)", position: "sticky", top: 0 }}>
                <tr>
                  <th style={{ padding: "0.5rem 0.75rem", textAlign: "left" }}>Position</th>
                  <th style={{ padding: "0.5rem 0.75rem", textAlign: "left" }}>Decimal Value</th>
                  <th style={{ padding: "0.5rem 0.75rem", textAlign: "center" }}>Character Output</th>
                  <th style={{ padding: "0.5rem 0.75rem", textAlign: "left" }}>Type Details</th>
                </tr>
              </thead>
              <tbody>
                {validation.results.map((r, idx) => {
                  const val = r.val || 0;
                  const char = String.fromCodePoint(val);
                  let name = "Standard Character";
                  let visual = char;

                  if (val === 32) {
                    name = "Space";
                    visual = "␣";
                  } else if (val === 10) {
                    name = "Line Feed (LF)";
                    visual = "↵";
                  } else if (val === 13) {
                    name = "Carriage Return (CR)";
                    visual = "␍";
                  } else if (val === 9) {
                    name = "Horizontal Tab";
                    visual = "⇥";
                  } else if (val < 32) {
                    name = "Control Byte";
                    visual = "";
                  } else if (val > 127) {
                    name = "Extended Unicode";
                  }

                  return (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--border-light)" }}>
                      <td style={{ padding: "0.5rem 0.75rem" }}>#{r.index}</td>
                      <td style={{ padding: "0.5rem 0.75rem", fontWeight: 700, color: "var(--primary)" }}>{val}</td>
                      <td style={{ padding: "0.5rem 0.75rem", textAlign: "center", fontSize: "1.1rem", fontWeight: 700 }}>
                        {visual}
                      </td>
                      <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-muted)" }}>{name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SEO Section */}
      <div className="prose">
        <h2>How Does Decimal to Text Translation Work?</h2>
        <p>
          Computers operate with numbers beneath their graphical interfaces. To display words, symbols, and emojis, systems depend on a master list that indexes characters against specific numbers. This system is known as Unicode. When you convert a list of decimal values back into text, you are running this mapping index in reverse.
        </p>
        <p>
          To translate manually, you take each decimal integer, locate it on the ASCII or Unicode charts, find the corresponding character symbol, and write it down. For example, if you are given the numbers <code>72, 101, 108, 108, 111</code>, looking at a basic ASCII table shows:
          72 corresponds to uppercase &apos;H&apos;,
          101 maps to lowercase &apos;e&apos;,
          108 corresponds to lowercase &apos;l&apos; (which appears twice), and
          111 corresponds to lowercase &apos;o&apos;.
          Arranged in order, these code points spell the word <code>Hello</code>.
        </p>
        <p>
          While basic characters map to numbers between 0 and 127 (which is the classic ASCII range), the modern Unicode catalog extends much further. It covers values up to <code>1,114,111</code> (or <code>0x10FFFF</code> in hexadecimal), which includes mathematical symbols, scripts from almost every language in history, and thousands of emojis.
        </p>
        <p>
          It is important to remember that not all number entries can translate into readable symbols. Our converter includes a built-in safety checker. If you enter letters, punctuation marks instead of digits, negative numbers, or integers beyond the maximum limit of <code>1,114,111</code>, the app will instantly flag exactly which entry is throwing the error. This helps protect you from invalid Unicode values that would cause errors or crashes in your text processing software.
        </p>
      </div>
    </div>
  );
}
