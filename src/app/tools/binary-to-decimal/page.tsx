"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check, Trash2, AlertCircle, ArrowLeft } from "lucide-react";

export default function BinaryToDecimal() {
  const [input, setInput] = useState("101010");
  const [copied, setCopied] = useState(false);

  const cleaned = useMemo(() => input.replace(/\s+/g, ""), [input]);

  const isValid = useMemo(() => {
    if (!cleaned) return true;
    return /^[01]+$/.test(cleaned);
  }, [cleaned]);

  const decimalValue = useMemo(() => {
    if (!cleaned || !isValid) return null;
    return parseInt(cleaned, 2);
  }, [cleaned, isValid]);

  // Generate step-by-step expansion math explanation
  const calculationSteps = useMemo(() => {
    if (!cleaned || !isValid || decimalValue === null) return null;

    const len = cleaned.length;
    const steps: string[] = [];
    const values: number[] = [];

    for (let i = 0; i < len; i++) {
      const bit = cleaned[i];
      const power = len - 1 - i;
      const termValue = parseInt(bit) * Math.pow(2, power);
      
      steps.push(`(${bit} × 2^${power})`);
      values.push(termValue);
    }

    return {
      expansion: steps.join(" + "),
      termsValues: values.join(" + "),
      sum: decimalValue,
    };
  }, [cleaned, isValid, decimalValue]);

  const handleCopy = () => {
    if (decimalValue !== null) {
      navigator.clipboard.writeText(decimalValue.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
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
          <Calculator color="var(--primary)" /> Binary to Decimal Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert binary numbers (Base 2) to decimal numbers (Base 10) with detailed mathematical explanations.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Binary to Decimal Calculator</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Input Binary */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Binary Number</label>
              <input
                type="text"
                className="input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 11011"
                style={{ fontSize: "1.1rem", fontFamily: "monospace", letterSpacing: "0.05em" }}
              />
              {!isValid && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#dc2626", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <AlertCircle size={16} />
                  <span>Invalid binary number. Only 0 and 1 are allowed.</span>
                </div>
              )}
            </div>

            {/* Output Decimal */}
            {isValid && decimalValue !== null && (
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
                  <p style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.2rem" }}>Decimal Value (Base 10)</p>
                  <p style={{ fontSize: "2rem", fontWeight: 800, wordBreak: "break-all" }}>
                    {decimalValue}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            )}
            
            <button className="btn btn-outline" onClick={() => setInput("")} disabled={!input}>
              <Trash2 size={16} /> Clear Input
            </button>
          </div>
        </div>

        {/* Step-by-Step Math Card */}
        {isValid && calculationSteps && (
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Mathematical Expansion</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              To convert a binary number to decimal, multiply each digit by the power of 2 corresponding to its position (starting at 0 on the far right):
            </p>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid var(--border-light)",
                borderRadius: "10px",
                padding: "1.25rem",
                fontFamily: "monospace",
                fontSize: "0.9rem",
                lineHeight: "1.6",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div>
                <span style={{ color: "var(--text-muted)" }}>1. Formula:</span>
                <div style={{ fontWeight: 600, color: "var(--text-main)", overflowX: "auto" }}>
                  {calculationSteps.expansion}
                </div>
              </div>
              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)" }}>2. Intermediate terms:</span>
                <div style={{ fontWeight: 600, color: "var(--text-main)", overflowX: "auto" }}>
                  {calculationSteps.termsValues}
                </div>
              </div>
              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)" }}>3. Final Sum:</span>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary)" }}>
                  {calculationSteps.sum}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>How to convert binary to decimal manually</h2>
        <p>
          The decimal number system we use in everyday life is a <strong>base-10</strong> positional system, which means each position represents a power of 10. The binary system is a <strong>base-2</strong> positional system, where each slot represents a power of 2.
        </p>
        <p>
          To translate manually:
        </p>
        <ol>
          <li>Write down the binary number.</li>
          <li>Assign powers of 2 to each bit starting from right to left, beginning with 2^0 (which equals 1), then 2^1 (2), 2^2 (4), 2^3 (8), etc.</li>
          <li>Multiply each bit (0 or 1) by its corresponding power of 2.</li>
          <li>Add all the results together to find the final decimal value.</li>
        </ol>
        <p>
          For example, <code>1101</code> is: <code>(1 × 2^3) + (1 × 2^2) + (0 × 2^1) + (1 × 2^0) = 8 + 4 + 0 + 1 = 13</code>.
        </p>
      </div>
    </div>
  );
}
