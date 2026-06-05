"use client";

import { useState, useMemo } from "react";
import { Calculator, HelpCircle, ArrowLeft, Percent } from "lucide-react";
import Link from "next/link";

type Mode = "cpm" | "cost" | "impressions";

export default function CPMCalculator() {
  const [mode, setMode] = useState<Mode>("cpm");
  
  // Inputs
  const [cost, setCost] = useState("150");
  const [cpm, setCpm] = useState("5");
  const [impressions, setImpressions] = useState("30000");

  const results = useMemo(() => {
    const C = parseFloat(cost);
    const CPM = parseFloat(cpm);
    const I = parseFloat(impressions);

    if (mode === "cpm") {
      if (isNaN(C) || isNaN(I) || C < 0 || I <= 0) return null;
      // CPM = (Cost / Impressions) * 1000
      const calculatedCpm = (C / I) * 1000;
      return {
        label: "Calculated CPM",
        value: `$${calculatedCpm.toFixed(2)}`,
        desc: `Cost per 1,000 impressions is $${calculatedCpm.toFixed(2)}.`,
        formula: `CPM = (Cost / Impressions) × 1,000 = ($${C.toLocaleString()} / ${I.toLocaleString()}) × 1,000`,
      };
    } else if (mode === "cost") {
      if (isNaN(CPM) || isNaN(I) || CPM < 0 || I < 0) return null;
      // Cost = (CPM * Impressions) / 1000
      const calculatedCost = (CPM * I) / 1000;
      return {
        label: "Calculated Cost",
        value: `$${calculatedCost.toFixed(2)}`,
        desc: `Total campaign budget cost is $${calculatedCost.toFixed(2)}.`,
        formula: `Cost = (CPM × Impressions) / 1,000 = ($${CPM.toFixed(2)} × ${I.toLocaleString()}) / 1,000`,
      };
    } else {
      if (isNaN(C) || isNaN(CPM) || C < 0 || CPM <= 0) return null;
      // Impressions = (Cost / CPM) * 1000
      const calculatedImpressions = (C / CPM) * 1000;
      return {
        label: "Calculated Impressions",
        value: Math.round(calculatedImpressions).toLocaleString(),
        desc: `Target campaign impressions to purchase is ${Math.round(calculatedImpressions).toLocaleString()}.`,
        formula: `Impressions = (Cost / CPM) × 1,000 = ($${C.toLocaleString()} / $${CPM.toFixed(2)}) × 1,000`,
      };
    }
  }, [mode, cost, cpm, impressions]);

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
          <Calculator color="var(--primary)" /> CPM (Cost Per Mille) Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Solve for campaign CPM, budget cost, or impressions based on your marketing metrics.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Inputs */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Select What to Solve For</h3>
          
          {/* Tabs */}
          <div style={{ display: "flex", border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", marginBottom: "1.5rem" }}>
            {(["cpm", "cost", "impressions"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  padding: "0.7rem 0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  background: mode === m ? "var(--primary)" : "transparent",
                  color: mode === m ? "white" : "var(--text-muted)",
                  transition: "all 0.2s",
                }}
              >
                {m === "cpm" ? "CPM" : m === "cost" ? "Cost" : "Impressions"}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Conditional input fields */}
            {mode !== "cost" && (
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Total Campaign Cost ($)</label>
                <input
                  type="number"
                  className="input-field"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="e.g. 500"
                />
              </div>
            )}

            {mode !== "cpm" && (
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>CPM Rate ($)</label>
                <input
                  type="number"
                  className="input-field"
                  value={cpm}
                  onChange={(e) => setCpm(e.target.value)}
                  placeholder="e.g. 7.50"
                />
              </div>
            )}

            {mode !== "impressions" && (
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Impressions / Ad Views</label>
                <input
                  type="number"
                  className="input-field"
                  value={impressions}
                  onChange={(e) => setImpressions(e.target.value)}
                  placeholder="e.g. 100000"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Output */}
        {results && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Value Card */}
            <div
              style={{
                padding: "2rem 1.5rem",
                background: "linear-gradient(135deg, var(--primary), #1d4ed8)",
                borderRadius: "12px",
                color: "white",
              }}
            >
              <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "0.3rem" }}>{results.label}</p>
              <p style={{ fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.1, wordBreak: "break-all" }}>
                {results.value}
              </p>
              <p style={{ fontSize: "0.9rem", opacity: 0.9, marginTop: "0.75rem" }}>{results.desc}</p>
            </div>

            {/* Formula Card */}
            <div className="card">
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>Formula Breakdown</h4>
              <div
                style={{
                  fontFamily: "monospace",
                  background: "#f8fafc",
                  padding: "0.85rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  color: "var(--text-main)",
                  border: "1px solid var(--border-light)",
                  overflowX: "auto",
                }}
              >
                {results.formula}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is CPM in digital advertising?</h2>
        <p>
          In online marketing, <strong>CPM</strong> stands for <strong>Cost Per Mille</strong> (&quot;mille&quot; is Latin for
          thousand). It is a standard pricing model representing the cost an advertiser pays for every 1,000 views or impressions
          of an advertisement.
        </p>
        <p>
          Unlike CPC (Cost Per Click) or CPA (Cost Per Acquisition) where you pay only when someone interacts with your ad, CPM
          charges you purely based on reach and views. It is the dominant pricing model for brand awareness campaigns, video ads
          (like YouTube), social media campaigns (like Facebook/Instagram), and banner networks (like Google Display Network).
        </p>

        <h2>How are CPM campaigns calculated?</h2>
        <p>
          Campaign metrics are linked by the standard formula:
          <code>CPM = (Total Cost / Impressions) × 1,000</code>.
        </p>
        <p>
          This calculator allows you to solve for any of the three metrics:
        </p>
        <ul>
          <li>
            <strong>Solve for CPM</strong>: If you know your total spend and how many impressions you received, find out your CPM
            rate to compare efficiency.
          </li>
          <li>
            <strong>Solve for Cost</strong>: If a network quotes you a CPM rate and you want to purchase a specific number of impressions,
            calculate the required budget.
          </li>
          <li>
            <strong>Solve for Impressions</strong>: If you have a fixed budget and a set CPM rate, calculate how many ad views
            your budget will buy.
          </li>
        </ul>
      </div>
    </div>
  );
}
