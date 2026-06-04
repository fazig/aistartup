"use client";

import { useState, useMemo } from "react";
import { Hash, Copy, Check, Trash2, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

interface DivisionStep {
  original: number;
  quotient: number;
  remainder: number;
  hexChar: string;
}

export default function DecimalToHex() {
  const [input, setInput] = useState("2619");
  const [copied, setCopied] = useState(false);

  // Clean the input to check validation
  const cleaned = useMemo(() => input.trim().replace(/,/g, ""), [input]);

  // Validation: must be a positive integer (non-negative)
  const isValid = useMemo(() => {
    if (!cleaned) return true;
    return /^\d+$/.test(cleaned);
  }, [cleaned]);

  const decimalValue = useMemo(() => {
    if (!cleaned || !isValid) return null;
    return parseInt(cleaned, 10);
  }, [cleaned, isValid]);

  // Successive division math steps
  const calculationSteps = useMemo(() => {
    if (decimalValue === null) return null;

    const steps: DivisionStep[] = [];
    let temp = decimalValue;

    if (temp === 0) {
      steps.push({
        original: 0,
        quotient: 0,
        remainder: 0,
        hexChar: "0",
      });
    } else {
      while (temp > 0) {
        const quotient = Math.floor(temp / 16);
        const remainder = temp % 16;
        const hexChar = remainder.toString(16).toUpperCase();
        steps.push({
          original: temp,
          quotient,
          remainder,
          hexChar,
        });
        temp = quotient;
      }
    }

    const hexString = steps
      .map((s) => s.hexChar)
      .reverse()
      .join("");

    return {
      steps,
      hexString,
    };
  }, [decimalValue]);

  const handleCopy = () => {
    if (calculationSteps?.hexString) {
      navigator.clipboard.writeText(calculationSteps.hexString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
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
          <Hash color="var(--primary)" /> Decimal to HEX Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert decimal numbers (Base 10) to hexadecimal representation (Base 16) with successive division step tracking.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Card */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Convert Decimal</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Enter Positive Decimal Integer
              </label>
              <input
                type="text"
                className="input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 2619, 255, 1024"
                style={{ fontSize: "1.1rem", fontFamily: "monospace" }}
              />
              {!isValid && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#dc2626", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <AlertCircle size={16} />
                  <span>Invalid positive decimal number. Please input integer digits only.</span>
                </div>
              )}
            </div>

            {isValid && calculationSteps && (
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
                  <p style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.2rem" }}>Hexadecimal Value (Base 16)</p>
                  <p style={{ fontSize: "2rem", fontWeight: 800, wordBreak: "break-all", fontFamily: "monospace" }}>
                    {calculationSteps.hexString || "0"}
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
                  title="Copy hex to clipboard"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            )}

            <button className="btn btn-outline" onClick={() => setInput("")} disabled={!input}>
              <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Clear Input
            </button>
          </div>
        </div>

        {/* Division steps Guide Card */}
        {isValid && calculationSteps && (
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Successive Division Table</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              To convert a decimal number to HEX manually, divide the number by 16 repeatedly. Keep track of the remainder at each step. Your hex number is built from the remainders, starting from the bottom (last remainder) up to the top.
            </p>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid var(--border-light)",
                borderRadius: "10px",
                padding: "1rem",
                overflowX: "auto",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", fontFamily: "monospace" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-light)", textAlign: "left" }}>
                    <th style={{ padding: "0.5rem" }}>Step</th>
                    <th style={{ padding: "0.5rem" }}>Division (N ÷ 16)</th>
                    <th style={{ padding: "0.5rem" }}>Quotient</th>
                    <th style={{ padding: "0.5rem" }}>Remainder (Base 10)</th>
                    <th style={{ padding: "0.5rem", color: "var(--primary)" }}>Hex Digit</th>
                  </tr>
                </thead>
                <tbody>
                  {calculationSteps.steps.map((step, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--border-light)" }}>
                      <td style={{ padding: "0.5rem" }}>{idx + 1}</td>
                      <td style={{ padding: "0.5rem" }}>{step.original} ÷ 16</td>
                      <td style={{ padding: "0.5rem" }}>{step.quotient}</td>
                      <td style={{ padding: "0.5rem" }}>{step.remainder}</td>
                      <td style={{ padding: "0.5rem", fontWeight: 700, color: "var(--primary)" }}>
                        {step.hexChar} {step.remainder >= 10 ? `(${step.hexChar})` : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "2px solid var(--border-light)", fontSize: "0.9rem" }}>
                <span style={{ color: "var(--text-muted)" }}>Reading remainders from bottom to top:</span>
                <div style={{ marginTop: "0.25rem", fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)", fontFamily: "monospace" }}>
                  {calculationSteps.steps.map((s) => s.hexChar).reverse().join(" ← ")} = {calculationSteps.hexString}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Section */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <h2>Understanding Decimal to Hexadecimal Conversion</h2>
        <p>
          Converting numbers from the standard decimal system (Base 10) to hexadecimal (Base 16) is a vital operation in software development, web engineering, and digital electronics. Decimal counts in steps of ten using digits 0-9, whereas hexadecimal counts in steps of sixteen using digits 0-9 followed by letters A-F to represent values from ten through fifteen.
        </p>
        <p>
          The standard algorithm for this conversion is <strong>Successive Division-by-16</strong>. Here is how it works: You divide the decimal integer by 16 and record the quotient and the remainder. Next, you take the quotient and divide it by 16 again, noting the new quotient and remainder. You repeat this process until your quotient is zero. Once done, you write down all the remainders starting from the very last step up to the first step.
        </p>
        <p>
          Let&apos;s run through an example: converting the decimal number <code>2619</code> to hex.
          First, we divide 2619 by 16. That gives us a quotient of 163 and a remainder of 11. In hex, 11 translates to the letter &apos;B&apos;.
          Next, we take the quotient 163 and divide it by 16. That gives us a quotient of 10 and a remainder of 3.
          Finally, we divide 10 by 16, resulting in a quotient of 0 and a remainder of 10. In hex, 10 translates to the letter &apos;A&apos;.
          Reading the remainders from the last division to the first, we get A, 3, and B, giving us the final hexadecimal string: <code>A3B</code>.
        </p>
        <p>
          Why do we use hex anyway? It is because computers operate on binary code (Base 2), which consists entirely of ones and zeros. Since writing out binary sequences is error-prone and tedious for humans, we group binary digits into blocks of four (a nibble). Because a nibble can have sixteen different states (from 0000 to 1111), a single hexadecimal digit represents a 4-bit block perfectly. Using hex makes memory addresses, RGB colors (such as #FF5733), and file formats much shorter and easier for developers to read and debug.
        </p>
      </div>
    </div>
  );
}
