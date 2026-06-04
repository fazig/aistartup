"use client";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check, Trash2, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Triplet {
  triplet: string;
  octalValue: number;
  isPadded: boolean;
  paddedCount: number;
}

export default function BinaryToOctal() {
  const [input, setInput] = useState("101111");
  const [copied, setCopied] = useState(false);

  // Strip spaces from the input
  const cleaned = useMemo(() => {
    return input.replace(/[\s,]+/g, "");
  }, [input]);

  // Validation: Only binary digits 0 and 1
  const isValid = useMemo(() => {
    if (!cleaned) return true;
    return /^[01]+$/.test(cleaned);
  }, [cleaned]);

  // Triplet grouping visual guide logic
  const conversionData = useMemo(() => {
    if (!cleaned || !isValid) return null;

    const len = cleaned.length;
    const remainder = len % 3;
    const paddingNeeded = remainder === 0 ? 0 : 3 - remainder;
    const paddedBinary = "0".repeat(paddingNeeded) + cleaned;

    const triplets: Triplet[] = [];
    for (let i = 0; i < paddedBinary.length; i += 3) {
      const trip = paddedBinary.substring(i, i + 3);
      const val = parseInt(trip, 2);
      triplets.push({
        triplet: trip,
        octalValue: val,
        isPadded: i === 0 && paddingNeeded > 0,
        paddedCount: i === 0 ? paddingNeeded : 0,
      });
    }

    const rawOctal = triplets.map((t) => t.octalValue).join("");
    // Trim leading zeros unless the output is just a single "0"
    const cleanedOctal = rawOctal.replace(/^0+/, "") || "0";

    return {
      paddingNeeded,
      paddedBinary,
      triplets,
      cleanedOctal,
    };
  }, [cleaned, isValid]);

  const handleCopy = () => {
    if (conversionData?.cleanedOctal) {
      navigator.clipboard.writeText(conversionData.cleanedOctal);
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
          <Calculator color="var(--primary)" /> Binary to Octal Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert binary numbers (Base 2) to octal string values (Base 8) with a detailed triplet grouping visualizer.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Input Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Convert Binary</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Enter Binary Number
              </label>
              <input
                type="text"
                className="input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 101111, 1101, 10001"
                style={{ fontSize: "1.1rem", fontFamily: "monospace", letterSpacing: "0.05em" }}
              />
              {!isValid && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#dc2626", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <AlertCircle size={16} />
                  <span>Invalid binary characters! Binary inputs must contain only 0s and 1s.</span>
                </div>
              )}
            </div>

            {isValid && conversionData && (
              <div
                style={{
                  padding: "1.5rem",
                  background: "linear-gradient(135deg, var(--primary), #1d4ed8)",
                  borderRadius: "12px",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.2rem" }}>Octal Value (Base 8)</p>
                  <p style={{ fontSize: "2.2rem", fontWeight: 800, wordBreak: "break-all", fontFamily: "monospace" }}>
                    {conversionData.cleanedOctal}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className="btn"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    border: "none",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                  }}
                  title="Copy octal value"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            )}

            <button className="btn btn-outline" onClick={handleClear} disabled={!input}>
              <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Clear Input
            </button>
          </div>
        </div>

        {/* Triplet Groupings Card */}
        {isValid && conversionData && (
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Triplet Groupings Guide</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              To convert binary to octal, we group the bits into sets of three starting from the right. If the left-most group doesn&apos;t have three digits, we pad it with leading zeros.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                background: "#f8fafc",
                border: "1px solid var(--border-light)",
                borderRadius: "10px",
                padding: "1.25rem",
              }}
            >
              {/* Padding info */}
              {conversionData.paddingNeeded > 0 && (
                <div style={{ fontSize: "0.8rem", color: "#b45309", background: "#fffbeb", padding: "0.6rem 0.8rem", borderRadius: "6px", border: "1px solid #fef3c7" }}>
                  <strong>Note:</strong> Padded {conversionData.paddingNeeded} zero(es) to the left to complete the triplet.
                </div>
              )}

              {/* Step 1: Padded String */}
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", display: "block" }}>1. Padded Binary Representation:</span>
                <span style={{ fontFamily: "monospace", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)" }}>
                  {conversionData.paddingNeeded > 0 ? (
                    <>
                      <span style={{ color: "#d97706" }}>{"0".repeat(conversionData.paddingNeeded)}</span>
                      {cleaned}
                    </>
                  ) : (
                    cleaned
                  )}
                </span>
              </div>

              {/* Step 2: Triplet Boxes */}
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", display: "block", marginBottom: "0.5rem" }}>
                  2. Group in triplets & convert:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  {conversionData.triplets.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid var(--border-light)",
                        borderRadius: "8px",
                        background: "white",
                        padding: "0.5rem 0.75rem",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                      }}
                    >
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Triplet #{idx + 1}</span>
                      <span style={{ fontSize: "1.1rem", fontFamily: "monospace", fontWeight: 700, margin: "0.2rem 0", color: "#1e293b" }}>
                        {item.isPadded ? (
                          <>
                            <span style={{ color: "#d97706" }}>{item.triplet.substring(0, item.paddedCount)}</span>
                            {item.triplet.substring(item.paddedCount)}
                          </>
                        ) : (
                          item.triplet
                        )}
                      </span>
                      <div style={{ borderTop: "1px solid var(--border-light)", width: "100%", margin: "0.3rem 0" }} />
                      <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary)" }}>
                        {item.octalValue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Combined output */}
              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", display: "block" }}>3. Combined Result:</span>
                <span style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: 800, color: "var(--primary)" }}>
                  {conversionData.cleanedOctal}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Section */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <h2>How to Convert Binary to Octal Manually</h2>
        <p>
          Translating binary values (Base 2) to octal string representations (Base 8) is a straightforward process when you group the bits. Since the octal system represents eight values (0 through 7) and 8 is 2<sup>3</sup>, each octal digit corresponds exactly to a three-digit block of binary numbers (a triplet).
        </p>
        <p>
          To convert binary to octal manually, follow these simple steps:
        </p>
        <ol>
          <li>Write down the binary string.</li>
          <li>Start from the rightmost digit and separate the binary number into groups of three bits.</li>
          <li>If the leftmost group has fewer than three bits, pad it with one or two leading zeros on the far left.</li>
          <li>Convert each 3-bit block into its corresponding decimal number (which will be a value from 0 to 7). The translation rule is:
            <code>000 &rarr; 0</code>,
            <code>001 &rarr; 1</code>,
            <code>010 &rarr; 2</code>,
            <code>011 &rarr; 3</code>,
            <code>100 &rarr; 4</code>,
            <code>101 &rarr; 5</code>,
            <code>110 &rarr; 6</code>, and
            <code>111 &rarr; 7</code>.
          </li>
          <li>Write down the resulting digits in order. This sequence is your final octal number.</li>
        </ol>
        <p>
          Let&apos;s look at an example: converting <code>101111</code> to octal.
          We break the binary string into triplets starting from the right: the first triplet is <code>111</code>, and the second is <code>101</code>.
          Converting each triplet: <code>111</code> is equal to 7, and <code>101</code> is equal to 5.
          Putting these together gives us 5 and 7, resulting in the final octal number: <code>57</code>.
        </p>
        <p>
          This method is incredibly efficient because you don&apos;t need to convert the binary number into a large decimal integer first. Systems programmers often use octal representations because it represents a compact, human-readable compromise between long strings of binary code and decimal numbers.
        </p>
      </div>
    </div>
  );
}
