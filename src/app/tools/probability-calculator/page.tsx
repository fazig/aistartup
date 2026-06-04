"use client";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check, ArrowLeft, Percent } from "lucide-react";
import Link from "next/link";

export default function ProbabilityCalculator() {
  const [probA, setProbA] = useState("50");
  const [probB, setProbB] = useState("30");
  const [inputUnit, setInputUnit] = useState<"percent" | "decimal">("percent");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parsedProbs = useMemo(() => {
    let a = parseFloat(probA);
    let b = parseFloat(probB);

    if (isNaN(a) || isNaN(b)) return null;

    if (inputUnit === "percent") {
      a = a / 100;
      b = b / 100;
    }

    if (a < 0 || a > 1 || b < 0 || b > 1) return null;

    return { a, b };
  }, [probA, probB, inputUnit]);

  const results = useMemo(() => {
    if (!parsedProbs) return null;

    const { a, b } = parsedProbs;

    const notA = 1 - a;
    const notB = 1 - b;
    const both = a * b; // P(A AND B)
    const union = a + b - both; // P(A OR B)
    const mutuallyExclusive = a + b; // P(A OR B assuming mutually exclusive)
    const neither = notA * notB;
    const aNotB = a * notB;

    return {
      a,
      b,
      notA,
      notB,
      both,
      union,
      mutuallyExclusive,
      neither,
      aNotB,
    };
  }, [parsedProbs]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const fmt = (val: number) => {
    return `${(val * 100).toFixed(2)}% (${val.toFixed(4)})`;
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

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Percent color="var(--primary)" /> Probability Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Calculate the probability of single and multiple independent events occurring.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Inputs */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Enter Probabilities</h3>

          {/* Unit Switcher */}
          <div style={{ display: "flex", border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", marginBottom: "1.25rem" }}>
            <button
              onClick={() => setInputUnit("percent")}
              style={{
                flex: 1,
                padding: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
                background: inputUnit === "percent" ? "var(--primary)" : "transparent",
                color: inputUnit === "percent" ? "white" : "var(--text-muted)",
              }}
            >
              Percentage (0 - 100%)
            </button>
            <button
              onClick={() => setInputUnit("decimal")}
              style={{
                flex: 1,
                padding: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
                background: inputUnit === "decimal" ? "var(--primary)" : "transparent",
                color: inputUnit === "decimal" ? "white" : "var(--text-muted)",
              }}
            >
              Decimal (0 - 1.0)
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Probability of Event A — P(A)
              </label>
              <input
                type="number"
                className="input-field"
                value={probA}
                onChange={(e) => setProbA(e.target.value)}
                placeholder={inputUnit === "percent" ? "e.g. 50" : "e.g. 0.5"}
                min="0"
                max={inputUnit === "percent" ? "100" : "1"}
                step={inputUnit === "percent" ? "1" : "0.01"}
              />
            </div>

            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Probability of Event B — P(B)
              </label>
              <input
                type="number"
                className="input-field"
                value={probB}
                onChange={(e) => setProbB(e.target.value)}
                placeholder={inputUnit === "percent" ? "e.g. 30" : "e.g. 0.3"}
                min="0"
                max={inputUnit === "percent" ? "100" : "1"}
                step={inputUnit === "percent" ? "1" : "0.01"}
              />
            </div>
          </div>
        </div>

        {/* Right Output */}
        {results && (
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Probability Calculations</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>P(A does NOT occur):</span>
                <span style={{ fontWeight: 600 }}>{fmt(results.notA)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>P(B does NOT occur):</span>
                <span style={{ fontWeight: 600 }}>{fmt(results.notB)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 700 }}>P(Both A AND B occur):</span>
                <span style={{ fontWeight: 700, color: "var(--primary)" }}>{fmt(results.both)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>P(At least one occurs - A OR B):</span>
                <span style={{ fontWeight: 600 }}>{fmt(results.union)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>P(Event A occurs but NOT B):</span>
                <span style={{ fontWeight: 600 }}>{fmt(results.aNotB)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>P(Neither Event occurs):</span>
                <span style={{ fontWeight: 600 }}>{fmt(results.neither)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>Understanding Probability Rules</h2>
        <p>
          Probability describes the likelihood of an event occurring, scaled on a range from 0 (impossible) to 1 (absolute certainty).
          When dealing with multiple events, we use standard probability rules:
        </p>
        <ul>
          <li>
            <strong>Independent Events</strong>: Event A and Event B are independent if the outcome of one does not affect the other
            (like rolling two separate dice).
          </li>
          <li>
            <strong>The AND Rule (Multiplication)</strong>: The probability of both independent events A and B occurring together is
            calculated by multiplying their probabilities: <code>P(A AND B) = P(A) × P(B)</code>.
          </li>
          <li>
            <strong>The OR Rule (Addition)</strong>: The probability of at least one event A or B occurring is calculated by adding
            their probabilities and subtracting the overlap (to avoid double-counting): <code>P(A OR B) = P(A) + P(B) − P(A AND B)</code>.
          </li>
        </ul>
      </div>
    </div>
  );
}
