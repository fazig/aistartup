"use client";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check, ArrowLeft, Landmark } from "lucide-react";
import Link from "next/link";

interface Preset {
  country: string;
  rate: number;
}

const PRESETS: Preset[] = [
  { country: "Australia", rate: 10 },
  { country: "New Zealand", rate: 15 },
  { country: "Singapore", rate: 9 },
  { country: "Canada (GST)", rate: 5 },
  { country: "India (Standard)", rate: 18 },
  { country: "India (Low)", rate: 12 },
  { country: "India (High)", rate: 28 },
  { country: "UK (Standard VAT)", rate: 20 },
];

export default function GSTCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("10");
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const results = useMemo(() => {
    const A = parseFloat(amount);
    const R = parseFloat(rate);

    if (isNaN(A) || isNaN(R) || A <= 0 || R < 0) return null;

    if (mode === "add") {
      const gstAmount = A * (R / 100);
      const totalAmount = A + gstAmount;
      return {
        original: A,
        gst: gstAmount,
        total: totalAmount,
      };
    } else {
      // Remove GST: Base = Total / (1 + R/100)
      const baseAmount = A / (1 + R / 100);
      const gstAmount = A - baseAmount;
      return {
        original: baseAmount,
        gst: gstAmount,
        total: A,
      };
    }
  }, [amount, rate, mode]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const fmt = (val: number) =>
    val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Landmark color="var(--primary)" /> GST Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Calculate Goods and Services Tax (GST) easily by adding or removing tax values for invoices.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Inputs */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>GST Setup</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Mode Select */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>Calculation Mode</label>
              <div style={{ display: "flex", border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden" }}>
                <button
                  onClick={() => setMode("add")}
                  style={{
                    flex: 1,
                    padding: "0.7rem 0.5rem",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    background: mode === "add" ? "var(--primary)" : "transparent",
                    color: mode === "add" ? "white" : "var(--text-muted)",
                    transition: "all 0.2s",
                  }}
                >
                  Add GST
                </button>
                <button
                  onClick={() => setMode("remove")}
                  style={{
                    flex: 1,
                    padding: "0.7rem 0.5rem",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    background: mode === "remove" ? "var(--primary)" : "transparent",
                    color: mode === "remove" ? "white" : "var(--text-muted)",
                    transition: "all 0.2s",
                  }}
                >
                  Remove GST
                </button>
              </div>
            </div>

            {/* Input Value */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Amount ($) ({mode === "add" ? "Excluding GST" : "Including GST"})
              </label>
              <input
                type="number"
                className="input-field"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 1000"
                style={{ fontSize: "1.1rem", fontFamily: "inherit" }}
              />
            </div>

            {/* Tax Rate */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>GST Rate (%)</label>
              <input
                type="number"
                className="input-field"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g. 10"
                style={{ fontSize: "1.1rem", fontFamily: "inherit" }}
              />
            </div>

            {/* Presets */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Quick Country Rates:
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    className="btn btn-outline"
                    onClick={() => setRate(p.rate.toString())}
                    style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem", fontWeight: 600 }}
                  >
                    {p.country} ({p.rate}%)
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        {results && (
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>GST Breakdown</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Original Net */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  background: "#f8fafc",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>Net Amount (excluding GST)</span>
                  <span style={{ fontWeight: 700, fontSize: "1.15rem" }}>${fmt(results.original)}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(results.original.toString(), "net")}
                  style={{ background: "none", border: "none", color: copiedKey === "net" ? "#16a34a" : "var(--text-muted)", cursor: "pointer" }}
                >
                  {copiedKey === "net" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* GST Amount */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  background: "#f8fafc",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>GST Amount ({rate}%)</span>
                  <span style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--primary)" }}>${fmt(results.gst)}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(results.gst.toString(), "gst")}
                  style={{ background: "none", border: "none", color: copiedKey === "gst" ? "#16a34a" : "var(--text-muted)", cursor: "pointer" }}
                >
                  {copiedKey === "gst" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Total Gross */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem",
                  background: "linear-gradient(135deg, var(--primary), #1d4ed8)",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.85rem", opacity: 0.85, display: "block" }}>Total Gross Amount (including GST)</span>
                  <span style={{ fontWeight: 800, fontSize: "1.6rem" }}>${fmt(results.total)}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(results.total.toString(), "total")}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    padding: "0.4rem",
                    borderRadius: "6px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {copiedKey === "total" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is GST (Goods and Services Tax)?</h2>
        <p>
          <strong>GST</strong> is a broad-based value-added tax levied on most goods and services sold for domestic consumption.
          In countries like Australia, New Zealand, Canada, and India, it is the primary indirect tax system. It is paid by
          consumers but remitted to the government by businesses.
        </p>

        <h2>Add vs. Remove GST: How are they calculated?</h2>
        <p>
          Calculating invoice tax requires using correct percentages, depending on if you are adding GST to a net price or stripping it
          from a gross price:
        </p>
        <ul>
          <li>
            <strong>Add GST (Tax Exclusive)</strong>: If your base product price is $1,000 and the tax rate is 10%, you add 10%
            on top: <code>$1,000 × 0.10 = $100 GST</code>. The total invoice is <code>$1,100</code>.
          </li>
          <li>
            <strong>Remove GST (Tax Inclusive)</strong>: If you charge a customer a flat rate of $1,000 and need to calculate how much
            of that total is tax, you cannot just subtract 10% from $1,000. You must divide by the factor of 1 + rate:
            <code>$1,000 / 1.10 = $909.09 Base Amount</code>. The tax amount portion is <code>$1,000 − $909.09 = $90.91 GST</code>.
          </li>
        </ul>
      </div>
    </div>
  );
}
