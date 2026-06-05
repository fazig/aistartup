"use client";

import { useState, useMemo } from "react";
import { Hash, Copy, Check, Trash2, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function HexToDecimal() {
  const [input, setInput] = useState("A3B");
  const [copied, setCopied] = useState(false);

  // Clean the input: remove whitespace and common prefixes like # or 0x
  const cleaned = useMemo(() => {
    let str = input.trim();
    if (str.toLowerCase().startsWith("0x")) {
      str = str.substring(2);
    } else if (str.startsWith("#")) {
      str = str.substring(1);
    }
    return str.replace(/\s+/g, "");
  }, [input]);

  // Validation: Check if it's a valid hex string
  const isValid = useMemo(() => {
    if (!cleaned) return true;
    return /^[0-9a-fA-F]+$/.test(cleaned);
  }, [cleaned]);

  // Convert Hex to Decimal
  const decimalValue = useMemo(() => {
    if (!cleaned || !isValid) return null;
    const val = parseInt(cleaned, 16);
    return isNaN(val) ? null : val;
  }, [cleaned, isValid]);

  // Calculation steps with formula breakdown
  const calculationSteps = useMemo(() => {
    if (!cleaned || !isValid || decimalValue === null) return null;

    const len = cleaned.length;
    const steps: string[] = [];
    const termValues: number[] = [];

    for (let i = 0; i < len; i++) {
      const char = cleaned[i].toUpperCase();
      // Get the value of the single hex digit
      const value = parseInt(char, 16);
      const power = len - 1 - i;
      const termValue = value * Math.pow(16, power);

      steps.push(`(${value} × 16^${power})`);
      termValues.push(termValue);
    }

    return {
      digits: cleaned.split(""),
      expansion: steps.join(" + "),
      terms: termValues.join(" + "),
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

  const clearInput = () => {
    setInput("");
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
          <Hash color="var(--primary)" /> HEX to Decimal Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert hexadecimal numbers (Base 16) to decimal values (Base 10) with an interactive step-by-step guide.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Card */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Convert Hexadecimal</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Enter Hexadecimal Value
              </label>
              <input
                type="text"
                className="input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. A3B, 0xFF, #1A"
                style={{ fontSize: "1.1rem", fontFamily: "monospace", letterSpacing: "0.05em" }}
              />
              {!isValid && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#dc2626", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <AlertCircle size={16} />
                  <span>Invalid hex character detected! Use digits 0-9 and letters A-F.</span>
                </div>
              )}
            </div>

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
                    {decimalValue.toLocaleString()}
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
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            )}

            <button className="btn btn-outline" onClick={clearInput} disabled={!input}>
              <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Clear Input
            </button>
          </div>
        </div>

        {/* Positional Math Card */}
        {isValid && calculationSteps && (
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Step-by-Step Explanation</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              To convert a hexadecimal number to base-10, we calculate the sum of each digit multiplied by 16 raised to the power of its position index (starting at index 0 from the right side).
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
                <span style={{ color: "var(--text-muted)" }}>1. Map Digits to Values & Powers:</span>
                <div style={{ paddingLeft: "0.5rem", marginTop: "0.25rem" }}>
                  {calculationSteps.digits.map((char, index) => {
                    const power = calculationSteps.digits.length - 1 - index;
                    const val = parseInt(char, 16);
                    return (
                      <div key={index} style={{ color: "var(--text-main)" }}>
                        Char &apos;{char}&apos; (val: {val}) at index {power} &rarr; {val} × 16<sup>{power}</sup>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)" }}>2. Mathematical Formula:</span>
                <div style={{ fontWeight: 600, color: "var(--text-main)", overflowX: "auto", whiteSpace: "nowrap", padding: "0.25rem 0" }}>
                  {calculationSteps.expansion}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)" }}>3. Calculate Terms:</span>
                <div style={{ fontWeight: 600, color: "var(--text-main)", overflowX: "auto", whiteSpace: "nowrap", padding: "0.25rem 0" }}>
                  {calculationSteps.terms}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)" }}>4. Total Sum:</span>
                <div style={{ fontSize: "1.25rem", fontWeight: 850, color: "var(--primary)" }}>
                  {calculationSteps.sum}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Section */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <h2>How Does HEX to Decimal Conversion Actually Work?</h2>
        <p>
          Unlike the decimal system we use in everyday life, which counts in powers of ten (Base 10), the hexadecimal system counts in powers of sixteen (Base 16). In hex, we represent values from 0 to 15 using single characters: digits 0 through 9 represent their usual values, while the letters A through F represent the values 10 through 15. Specifically, A = 10, B = 11, C = 12, D = 13, E = 14, and F = 15.
        </p>
        <p>
          To convert a hex value to its decimal equivalent, you look at each character in the string starting from the rightmost character (which represents the 16<sup>0</sup> position) and work your way left. For each position, you take the decimal value of the hex digit and multiply it by 16 raised to the power of that position index. For example, if you have the hexadecimal number <code>A3B</code>, the letter &apos;B&apos; sits at position 0, &apos;3&apos; is at position 1, and &apos;A&apos; is at position 2.
        </p>
        <p>
          Let&apos;s run through the math for <code>A3B</code>. Position 0 holds &apos;B&apos; (decimal 11), so we calculate 11 × 16<sup>0</sup> = 11. Position 1 holds &apos;3&apos; (decimal 3), giving us 3 × 16<sup>1</sup> = 48. Position 2 holds &apos;A&apos; (decimal 10), which yields 10 × 16<sup>2</sup> = 2560. Summing these three results gives 2560 + 48 + 11 = 2619. It is that straightforward!
        </p>
        <p>
          Programmers and electrical engineers rely heavily on hexadecimal notation because it serves as a human-friendly shorthand for binary code. A single hex digit can represent exactly four binary digits (bits), also known as a nibble. This makes hex values incredibly useful for looking at memory addresses, color codes (like web hex codes), register values, and raw network packet dumps without getting lost in a sea of ones and zeros.
        </p>
      </div>
    </div>
  );
}
