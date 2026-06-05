"use client";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check, ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";

type Mode = "margin" | "price";

export default function MarginCalculator() {
  const [mode, setMode] = useState<Mode>("margin");
  const [cost, setCost] = useState("100");
  const [revenue, setRevenue] = useState("150");
  const [targetMargin, setTargetMargin] = useState("30");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const results = useMemo(() => {
    const C = parseFloat(cost);
    const R = parseFloat(revenue);
    const M = parseFloat(targetMargin);

    if (mode === "margin") {
      if (isNaN(C) || isNaN(R) || C < 0 || R <= 0 || R < C) return null;
      const grossProfit = R - C;
      const grossMargin = (grossProfit / R) * 100;
      const markup = (grossProfit / C) * 100;
      return {
        profit: grossProfit,
        margin: grossMargin,
        markup,
        sellingPrice: R,
      };
    } else {
      if (isNaN(C) || isNaN(M) || C < 0 || M >= 100 || M < 0) return null;
      // Price = Cost / (1 - Margin/100)
      const sellingPrice = C / (1 - M / 100);
      const grossProfit = sellingPrice - C;
      const markup = (grossProfit / C) * 100;
      return {
        profit: grossProfit,
        margin: M,
        markup,
        sellingPrice,
      };
    }
  }, [mode, cost, revenue, targetMargin]);

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
          <TrendingUp color="var(--primary)" /> Margin & Markup Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Solve for profit margins, markups, and calculate selling prices to hit target profit goals.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Inputs */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Profit Solver Options</h3>
          
          {/* Mode Switcher */}
          <div style={{ display: "flex", border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", marginBottom: "1.5rem" }}>
            <button
              onClick={() => setMode("margin")}
              style={{
                flex: 1,
                padding: "0.7rem 0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
                background: mode === "margin" ? "var(--primary)" : "transparent",
                color: mode === "margin" ? "white" : "var(--text-muted)",
                transition: "all 0.2s",
              }}
            >
              Solve Margin & Markup
            </button>
            <button
              onClick={() => setMode("price")}
              style={{
                flex: 1,
                padding: "0.7rem 0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
                background: mode === "price" ? "var(--primary)" : "transparent",
                color: mode === "price" ? "white" : "var(--text-muted)",
                transition: "all 0.2s",
              }}
            >
              Solve Selling Price
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Cost Input */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Cost of Item ($)</label>
              <input
                type="number"
                className="input-field"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="e.g. 50"
              />
            </div>

            {/* Conditional Fields */}
            {mode === "margin" ? (
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Selling Price / Revenue ($)</label>
                <input
                  type="number"
                  className="input-field"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="e.g. 75"
                />
              </div>
            ) : (
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Target Gross Margin (%)</label>
                <input
                  type="number"
                  className="input-field"
                  value={targetMargin}
                  onChange={(e) => setTargetMargin(e.target.value)}
                  placeholder="e.g. 30"
                  min="0"
                  max="99"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Output */}
        {results && (
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Calculation Summary</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Selling Price Result */}
              <div
                style={{
                  padding: "1rem",
                  background: "linear-gradient(135deg, var(--primary), #1d4ed8)",
                  borderRadius: "10px",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.85rem", opacity: 0.85, display: "block" }}>Required Selling Price</span>
                  <span style={{ fontWeight: 800, fontSize: "1.6rem" }}>${fmt(results.sellingPrice)}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(results.sellingPrice.toString(), "price")}
                  style={{ background: "rgba(255,255,255,0.2)", border: "none", padding: "0.4rem", borderRadius: "6px", color: "white", cursor: "pointer" }}
                >
                  {copiedKey === "price" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Profit */}
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Gross Profit:</span>
                <span style={{ fontWeight: 600, color: "#16a34a" }}>${fmt(results.profit)}</span>
              </div>

              {/* Gross Margin */}
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Gross Margin:</span>
                <span style={{ fontWeight: 600 }}>{results.margin.toFixed(2)}%</span>
              </div>

              {/* Markup */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Markup percentage:</span>
                <span style={{ fontWeight: 600 }}>{results.markup.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>Gross Margin vs. Markup: What is the difference?</h2>
        <p>
          One of the most common points of confusion in retail pricing is the difference between <strong>margin</strong> and
          <strong>markup</strong>. Both calculate profit relative to different baseline metrics:
        </p>
        <ul>
          <li>
            <strong>Gross Margin</strong> is profit divided by the <em>selling price</em>. It shows what percentage of your revenue
            is actual profit. For example, if you sell an item for $100 and it cost you $70 to acquire, your profit is $30, and
            your margin is <code>($30 / $100) × 100 = 30%</code>.
          </li>
          <li>
            <strong>Markup</strong> is profit divided by the <em>cost price</em>. It shows how much you marked up the price relative to
            what you paid. Using the same numbers, your markup is <code>($30 / $70) × 100 = 42.86%</code>.
          </li>
        </ul>
        <p>
          Confusing these two can lead to pricing errors. If your product cost is $100 and you want to achieve a 30% gross margin,
          adding a 30% markup (selling for $130) will only yield a 23% gross margin. To achieve a true 30% margin, you must calculate:
          <code>Selling Price = Cost / (1 - 0.30) = $100 / 0.70 = $142.86</code>.
        </p>
      </div>
    </div>
  );
}
