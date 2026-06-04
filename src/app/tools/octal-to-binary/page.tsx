"use client";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check, Trash2, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function OctalToBinary() {
  const [input, setInput] = useState("752");
  const [copied, setCopied] = useState(false);

  // Clean the input (remove spaces/commas)
  const cleaned = useMemo(() => {
    return input.replace(/[\s,]+/g, "");
  }, [input]);

  // Validation: Octal digits are only 0-7
  const isValid = useMemo(() => {
    if (!cleaned) return true;
    return /^[0-7]+$/.test(cleaned);
  }, [cleaned]);

  // Digit breakdown mapping
  const digitBreakdown = useMemo(() => {
    if (!cleaned || !isValid) return null;

    const mapping = cleaned.split("").map((digit, index) => {
      const val = parseInt(digit, 10);
      const binary = val.toString(2).padStart(3, "0");
      return {
        digit,
        index,
        binary,
      };
    });

    const concatenatedRaw = mapping.map((m) => m.binary).join("");
    // Strip leading zeros for the clean math display (unless result is just "0")
    const cleanedBinaryOutput = concatenatedRaw.replace(/^0+/, "") || "0";

    return {
      mapping,
      concatenatedRaw,
      cleanedBinaryOutput,
    };
  }, [cleaned, isValid]);

  const handleCopy = () => {
    if (digitBreakdown?.cleanedBinaryOutput) {
      navigator.clipboard.writeText(digitBreakdown.cleanedBinaryOutput);
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
          <Calculator color="var(--primary)" /> Octal to Binary Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert octal values (Base 8) to binary numbers (Base 2) with a live visual digit-by-digit mapping representation.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Input Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Convert Octal</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Enter Octal Number (Base 8)
              </label>
              <input
                type="text"
                className="input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 752, 17, 340"
                style={{ fontSize: "1.1rem", fontFamily: "monospace", letterSpacing: "0.05em" }}
              />
              {!isValid && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#dc2626", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <AlertCircle size={16} />
                  <span>Invalid octal digits! Octal numbers only contain digits 0 through 7.</span>
                </div>
              )}
            </div>

            {isValid && digitBreakdown && (
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
                  <p style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.2rem" }}>Binary Value (Base 2)</p>
                  <p style={{ fontSize: "2.2rem", fontWeight: 800, wordBreak: "break-all", fontFamily: "monospace" }}>
                    {digitBreakdown.cleanedBinaryOutput}
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
                  title="Copy binary code"
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

        {/* Digit-by-digit Visual Mapping */}
        {isValid && digitBreakdown && (
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Digit-by-Digit Breakdown</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              Since 8 is 2<sup>3</sup>, each digit in an octal number converts directly to exactly three binary bits (triplets). See how each digit maps below:
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                background: "#f8fafc",
                border: "1px solid var(--border-light)",
                borderRadius: "10px",
                padding: "1.25rem",
              }}
            >
              {/* Visual Boxes for Mapping */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {digitBreakdown.mapping.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      border: "1px solid var(--border-light)",
                      borderRadius: "8px",
                      background: "white",
                      minWidth: "60px",
                      padding: "0.5rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
                      Octal
                    </span>
                    <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)" }}>
                      {item.digit}
                    </span>
                    <div style={{ borderTop: "1px solid var(--border-light)", width: "100%", margin: "0.4rem 0" }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
                      3-Bits
                    </span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "monospace", color: "#1e293b" }}>
                      {item.binary}
                    </span>
                  </div>
                ))}
              </div>

              {/* Concatenation Guide */}
              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem", marginTop: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>1. Conjoined Groups:</span>
                <div style={{ fontFamily: "monospace", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)", marginTop: "0.25rem" }}>
                  {digitBreakdown.mapping.map((m) => m.binary).join(" ")}
                </div>
              </div>

              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>2. Full Binary Output:</span>
                <div style={{ fontFamily: "monospace", fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)", marginTop: "0.25rem" }}>
                  {digitBreakdown.concatenatedRaw}
                </div>
                {digitBreakdown.concatenatedRaw !== digitBreakdown.cleanedBinaryOutput && (
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                    Normalized (trimmed leading zeroes): <strong>{digitBreakdown.cleanedBinaryOutput}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Section */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <h2>How to Convert Octal to Binary Manually</h2>
        <p>
          Converting numbers from octal (Base 8) to binary (Base 2) is one of the easiest number base transformations you can do. This simplicity exists because 8 is a perfect power of two (specifically, 2<sup>3</sup> = 8). Because of this mathematical relationship, every single digit of an octal number can be represented by exactly three binary digits (bits).
        </p>
        <p>
          To perform the conversion manually, you just take each digit of the octal number individually and write down its 3-digit binary equivalent. The translation rules are simple and never change:
          <code>0 &rarr; 000</code>,
          <code>1 &rarr; 001</code>,
          <code>2 &rarr; 010</code>,
          <code>3 &rarr; 011</code>,
          <code>4 &rarr; 100</code>,
          <code>5 &rarr; 101</code>,
          <code>6 &rarr; 110</code>, and
          <code>7 &rarr; 111</code>.
        </p>
        <p>
          For example, let&apos;s convert the octal number <code>752</code> to binary.
          We take the first digit, 7, and write its binary representation: <code>111</code>.
          Next, we take the second digit, 5, and write its binary representation: <code>101</code>.
          Finally, we take the third digit, 2, and write its binary representation: <code>010</code>.
          Concatenating these groups together gives us <code>111 101 010</code>, or simply <code>111101010</code> in binary.
        </p>
        <p>
          This digit-by-digit approach makes conversions extremely fast because you don&apos;t need to convert the octal number to decimal first. Developers working with Unix file permissions, system architectures, or assembly code frequently use octal as an intermediate notation because it is easier to read than binary but can be instantly expanded or collapsed into bits without performing complex divisions or multiplications.
        </p>
      </div>
    </div>
  );
}
