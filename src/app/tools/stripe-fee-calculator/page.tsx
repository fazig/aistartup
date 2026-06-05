"use client";

import { useState, useMemo } from "react";
import { CreditCard, Copy, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

type StripeMode = "receive" | "send";

interface RatePreset {
  name: string;
  rate: number;
  fixed: number;
}

const PRESETS: RatePreset[] = [
  { name: "US Credit Cards (Standard)", rate: 2.9, fixed: 0.30 },
  { name: "EU Cards (Standard)", rate: 1.5, fixed: 0.20 },
  { name: "Stripe Terminal (In-Person)", rate: 2.7, fixed: 0.05 },
  { name: "International Cards", rate: 3.9, fixed: 0.30 },
  { name: "Custom Rate", rate: 2.9, fixed: 0.30 },
];

export default function StripeFeeCalculator() {
  const [mode, setMode] = useState<StripeMode>("receive"); // default: I want to receive
  const [amount, setAmount] = useState("100");
  
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [customRate, setCustomRate] = useState("2.9");
  const [customFixed, setCustomFixed] = useState("0.30");

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeRateRule = useMemo(() => {
    if (selectedPresetIdx === PRESETS.length - 1) {
      // Custom option
      return {
        rate: parseFloat(customRate) || 0,
        fixed: parseFloat(customFixed) || 0,
      };
    }
    return {
      rate: PRESETS[selectedPresetIdx].rate,
      fixed: PRESETS[selectedPresetIdx].fixed,
    };
  }, [selectedPresetIdx, customRate, customFixed]);

  const results = useMemo(() => {
    const A = parseFloat(amount);
    const R = activeRateRule.rate / 100;
    const F = activeRateRule.fixed;

    if (isNaN(A) || A <= 0) return null;

    if (mode === "receive") {
      // We want to keep A net. What should we charge?
      // Invoice = (A + F) / (1 - R)
      if (R >= 1) return null; // Avoid division by zero/negative
      const invoice = (A + F) / (1 - R);
      const fee = invoice - A;
      return {
        totalCharge: invoice,
        feeAmount: fee,
        netKept: A,
      };
    } else {
      // Customer pays A. What do we keep?
      // Fee = A * R + F
      const fee = A * R + F;
      const net = A - fee;
      return {
        totalCharge: A,
        feeAmount: fee,
        netKept: net,
      };
    }
  }, [mode, amount, activeRateRule]);

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
          <CreditCard color="var(--primary)" /> Stripe Fee Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Calculate Stripe processing fees and know exactly how much to invoice to receive your target amount.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Inputs */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Fee Settings</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Mode selector */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>Calculator Mode</label>
              <div style={{ display: "flex", border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden" }}>
                <button
                  onClick={() => setMode("receive")}
                  style={{
                    flex: 1,
                    padding: "0.7rem 0.5rem",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    background: mode === "receive" ? "var(--primary)" : "transparent",
                    color: mode === "receive" ? "white" : "var(--text-muted)",
                  }}
                >
                  I want to receive (Net)
                </button>
                <button
                  onClick={() => setMode("send")}
                  style={{
                    flex: 1,
                    padding: "0.7rem 0.5rem",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    background: mode === "send" ? "var(--primary)" : "transparent",
                    color: mode === "send" ? "white" : "var(--text-muted)",
                  }}
                >
                  I am receiving (Gross)
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Amount ($) ({mode === "receive" ? "Target Net to Keep" : "Total Customer Paid"})
              </label>
              <input
                type="number"
                className="input-field"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 100"
                style={{ fontSize: "1.1rem", fontFamily: "inherit" }}
              />
            </div>

            {/* Presets */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Stripe Fee Preset</label>
              <select
                className="input-field"
                value={selectedPresetIdx}
                onChange={(e) => setSelectedPresetIdx(parseInt(e.target.value))}
                style={{ cursor: "pointer", fontFamily: "inherit" }}
              >
                {PRESETS.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {p.name} {idx < PRESETS.length - 1 ? `(${p.rate}% + $${p.fixed.toFixed(2)})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Inputs */}
            {selectedPresetIdx === PRESETS.length - 1 && (
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem", fontSize: "0.85rem" }}>Custom Rate (%)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={customRate}
                    onChange={(e) => setCustomRate(e.target.value)}
                    placeholder="2.9"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem", fontSize: "0.85rem" }}>Fixed Fee ($)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={customFixed}
                    onChange={(e) => setCustomFixed(e.target.value)}
                    placeholder="0.30"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Output */}
        {results && (
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Fees & Invoice Breakdowns</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Total Charge */}
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
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>You should charge / Invoice amount</span>
                  <span style={{ fontWeight: 700, fontSize: "1.15rem", color: mode === "receive" ? "var(--primary)" : "inherit" }}>
                    ${fmt(results.totalCharge)}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(results.totalCharge.toString(), "charge")}
                  style={{ background: "none", border: "none", color: copiedKey === "charge" ? "#16a34a" : "var(--text-muted)", cursor: "pointer" }}
                >
                  {copiedKey === "charge" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Fee Amount */}
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
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>Stripe processing fees ({activeRateRule.rate}% + ${activeRateRule.fixed.toFixed(2)})</span>
                  <span style={{ fontWeight: 700, fontSize: "1.15rem", color: "#dc2626" }}>-${fmt(results.feeAmount)}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(results.feeAmount.toString(), "fee")}
                  style={{ background: "none", border: "none", color: copiedKey === "fee" ? "#16a34a" : "var(--text-muted)", cursor: "pointer" }}
                >
                  {copiedKey === "fee" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Net Kept */}
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
                  <span style={{ fontSize: "0.85rem", opacity: 0.85, display: "block" }}>Net you keep after fees</span>
                  <span style={{ fontWeight: 800, fontSize: "1.6rem" }}>${fmt(results.netKept)}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(results.netKept.toString(), "net")}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    padding: "0.4rem",
                    borderRadius: "6px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {copiedKey === "net" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>How are Stripe merchant fees structured?</h2>
        <p>
          Stripe is one of the world&apos;s leading online payment processors. For credit and debit card transactions, they charge a
          percentage-based rate plus a small fixed transaction fee. In the United States, the standard merchant fee is
          <strong>2.9% + $0.30</strong> per successful charge.
        </p>
        <p>
          This pricing model means that for small payments, the fixed $0.30 fee represents a large percentage of your margin,
          while for larger payments, the 2.9% portion dominates.
        </p>

        <h2>Why does the invoicing direction matter?</h2>
        <p>
          If you want to receive exactly $100 for a service, you cannot just add 2.9% + $0.30 ($3.20) to your invoice and charge
          the customer $103.20. If you charge $103.20, Stripe will deduct 2.9% of that total ($2.99) plus $0.30 ($3.29 total fee), leaving
          you with <code>$103.20 − $3.29 = $99.91</code>. You are still short.
        </p>
        <p>
          To receive exactly $100 net, you must adjust the invoice using the formula:
          <code>Invoice Amount = (Target Net + Fixed Fee) / (1 - Rate/100)</code>.
          For a $100 net target at 2.9% + $0.30, you should bill exactly <code>($100 + $0.30) / 0.971 = $103.30</code>. Stripe
          will deduct 2.9% of $103.30 ($3.00) plus $0.30, which equals exactly $3.30 in fees, leaving you with exactly $100.
        </p>
      </div>
    </div>
  );
}
