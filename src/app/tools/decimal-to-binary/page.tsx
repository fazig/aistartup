"use client";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check, Trash2, AlertCircle } from "lucide-react";

export default function DecimalToBinary() {
  const [input, setInput] = useState("42");
  const [copied, setCopied] = useState(false);

  const numericValue = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return null;
    const parsed = parseInt(trimmed, 10);
    return isNaN(parsed) ? null : parsed;
  }, [input]);

  const isValid = useMemo(() => {
    if (input.trim() === "") return true;
    if (numericValue === null) return false;
    return /^\d+$/.test(input.trim()) && numericValue >= 0;
  }, [input, numericValue]);

  const binaryValue = useMemo(() => {
    if (numericValue === null || !isValid) return "";
    return numericValue.toString(2);
  }, [numericValue, isValid]);

  // Generate step-by-step division trace explanation
  const calculationSteps = useMemo(() => {
    if (numericValue === null || !isValid) return null;
    if (numericValue === 0) {
      return [{ dividend: 0, quotient: 0, remainder: 0, binaryChar: "0" }];
    }

    const steps: { dividend: number; quotient: number; remainder: number; binaryChar: string }[] = [];
    let temp = numericValue;

    while (temp > 0) {
      const quotient = Math.floor(temp / 2);
      const remainder = temp % 2;
      steps.push({
        dividend: temp,
        quotient,
        remainder,
        binaryChar: remainder.toString(),
      });
      temp = quotient;
    }

    return steps;
  }, [numericValue, isValid]);

  const handleCopy = () => {
    if (binaryValue) {
      navigator.clipboard.writeText(binaryValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Calculator color="var(--primary)" /> Decimal to Binary Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert base-10 decimal integers to binary numbers (Base 2) with a step-by-step division trace.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Decimal to Binary Calculator</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Input Decimal */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Decimal Integer</label>
              <input
                type="text"
                className="input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 256"
                style={{ fontSize: "1.1rem", fontFamily: "inherit" }}
              />
              {!isValid && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#dc2626", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  <AlertCircle size={16} />
                  <span>Invalid integer. Please enter a positive decimal number.</span>
                </div>
              )}
            </div>

            {/* Output Binary */}
            {isValid && numericValue !== null && (
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
                  <p style={{ fontSize: "2rem", fontWeight: 800, wordBreak: "break-all", fontFamily: "monospace", letterSpacing: "0.03em" }}>
                    {binaryValue}
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

        {/* Step-by-Step Tracing Panel */}
        {isValid && calculationSteps && calculationSteps.length > 0 && (
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Repeated Division-by-2 Trace</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
              To convert a decimal integer, divide it repeatedly by 2 and track the remainders. Read remainders from bottom to top:
            </p>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid var(--border-light)",
                borderRadius: "10px",
                padding: "1.25rem",
                maxHeight: "350px",
                overflowY: "auto",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left", fontFamily: "monospace" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-light)", color: "var(--text-muted)" }}>
                    <th style={{ padding: "0.4rem" }}>Division</th>
                    <th style={{ padding: "0.4rem" }}>Quotient</th>
                    <th style={{ padding: "0.4rem" }}>Remainder</th>
                  </tr>
                </thead>
                <tbody>
                  {calculationSteps.map((step, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--border-light)" }}>
                      <td style={{ padding: "0.4rem" }}>{step.dividend} &divide; 2</td>
                      <td style={{ padding: "0.4rem" }}>{step.quotient}</td>
                      <td style={{ padding: "0.4rem", fontWeight: 700, color: "var(--primary)" }}>
                        {step.remainder}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 600 }}>
                Binary string (reverse remainders order):{" "}
                <span style={{ color: "var(--primary)", fontSize: "1rem", fontFamily: "monospace" }}>
                  {binaryValue}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>How to convert decimal to binary manually</h2>
        <p>
          Converting decimal values to binary is historically done using the **repeated division-by-2** method:
        </p>
        <ol>
          <li>Divide your decimal integer by 2.</li>
          <li>Note the quotient (result without decimals) and the remainder (which will always be either 0 or 1).</li>
          <li>Repeat the division using the quotient as the new number.</li>
          <li>Continue this process until your quotient becomes 0.</li>
          <li>Write down the list of remainders in reverse order (from your last division to your first division).</li>
        </ol>
        <p>
          For example, converting <code>13</code>:
        </p>
        <ul>
          <li><code>13 &divide; 2 = 6</code> with remainder <strong>1</strong></li>
          <li><code>6 &divide; 2 = 3</code> with remainder <strong>0</strong></li>
          <li><code>3 &divide; 2 = 1</code> with remainder <strong>1</strong></li>
          <li><code>1 &divide; 2 = 0</code> with remainder <strong>1</strong></li>
        </ul>
        <p>
          Writing remainders backward gives <code>1101</code>.
        </p>
      </div>
    </div>
  );
}
