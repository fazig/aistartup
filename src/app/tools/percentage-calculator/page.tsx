"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { Percent, Copy, Check, Calculator, ArrowLeft } from "lucide-react";

type Mode = "xPercentOfY" | "xIsWhatPercentOfY" | "xIsYPercentOfWhat";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("xPercentOfY");
  const [copied, setCopied] = useState(false);

  // Mode 1: What is X% of Y?
  const [m1x, setM1x] = useState<string>("25");
  const [m1y, setM1y] = useState<string>("200");

  // Mode 2: X is what % of Y?
  const [m2x, setM2x] = useState<string>("50");
  const [m2y, setM2y] = useState<string>("200");

  // Mode 3: X is Y% of what?
  const [m3x, setM3x] = useState<string>("50");
  const [m3y, setM3y] = useState<string>("25");

  const result = useMemo(() => {
    switch (mode) {
      case "xPercentOfY": {
        const x = parseFloat(m1x);
        const y = parseFloat(m1y);
        if (isNaN(x) || isNaN(y)) return null;
        const val = (x / 100) * y;
        return {
          value: val,
          formula: `${x}% × ${y} = (${x} ÷ 100) × ${y}`,
          step1: `Convert ${x}% to a decimal: ${x} ÷ 100 = ${(x / 100)}`,
          step2: `Multiply by ${y}: ${(x / 100)} × ${y} = ${val}`,
          label: `${x}% of ${y} is`,
        };
      }
      case "xIsWhatPercentOfY": {
        const x = parseFloat(m2x);
        const y = parseFloat(m2y);
        if (isNaN(x) || isNaN(y) || y === 0) return null;
        const val = (x / y) * 100;
        return {
          value: val,
          formula: `(${x} ÷ ${y}) × 100`,
          step1: `Divide ${x} by ${y}: ${x} ÷ ${y} = ${(x / y)}`,
          step2: `Multiply by 100: ${(x / y)} × 100 = ${val}%`,
          label: `${x} is what % of ${y}?`,
          suffix: "%",
        };
      }
      case "xIsYPercentOfWhat": {
        const x = parseFloat(m3x);
        const y = parseFloat(m3y);
        if (isNaN(x) || isNaN(y) || y === 0) return null;
        const val = (x / y) * 100;
        return {
          value: val,
          formula: `${x} ÷ (${y} ÷ 100)`,
          step1: `Convert ${y}% to a decimal: ${y} ÷ 100 = ${(y / 100)}`,
          step2: `Divide ${x} by ${(y / 100)}: ${x} ÷ ${(y / 100)} = ${val}`,
          label: `${x} is ${y}% of`,
        };
      }
    }
  }, [mode, m1x, m1y, m2x, m2y, m3x, m3y]);

  const handleCopy = () => {
    if (!result) return;
    const suffix = (result as { suffix?: string }).suffix || "";
    navigator.clipboard.writeText(`${result.label} ${Number(result.value.toFixed(6))}${suffix}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { key: Mode; label: string; description: string }[] = [
    { key: "xPercentOfY", label: "X% of Y", description: "What is X% of Y?" },
    { key: "xIsWhatPercentOfY", label: "X is ?% of Y", description: "X is what percent of Y?" },
    { key: "xIsYPercentOfWhat", label: "X is Y% of ?", description: "X is Y% of what number?" },
  ];

  const resultSuffix = mode === "xIsWhatPercentOfY" ? "%" : "";

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
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

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Percent color="var(--primary)" /> Percentage Calculator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Three calculation modes to solve any percentage problem — results update instantly as you type.
        </p>
      </div>

      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={mode === tab.key ? "btn btn-primary" : "btn btn-outline"}
              style={{ flex: 1, minWidth: '160px', textAlign: 'center', fontSize: '0.9rem' }}
              onClick={() => setMode(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mode Description */}
        <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '0.75rem', background: 'var(--primary-light, #6366f108)' }}>
          <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.05rem' }}>
            {tabs.find((t) => t.key === mode)?.description}
          </span>
        </div>

        {/* Input Fields */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          {mode === "xPercentOfY" && (
            <div style={{ display: 'flex', alignItems: 'end', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label className="input-label">What is</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    className="input-field"
                    style={{ paddingRight: '2rem', fontSize: '1.2rem', fontWeight: 600 }}
                    value={m1x}
                    onChange={(e) => setM1x(e.target.value)}
                    step="any"
                  />
                  <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '1.1rem' }}>%</span>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-muted)', paddingBottom: '0.7rem' }}>of</div>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label className="input-label">Value</label>
                <input
                  type="number"
                  className="input-field"
                  style={{ fontSize: '1.2rem', fontWeight: 600 }}
                  value={m1y}
                  onChange={(e) => setM1y(e.target.value)}
                  step="any"
                />
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-muted)', paddingBottom: '0.7rem' }}>=</div>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label className="input-label">Result</label>
                <div style={{ padding: '0.65rem 1rem', background: '#16a34a10', border: '2px solid #16a34a40', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 800, color: '#16a34a', textAlign: 'center' }}>
                  {result ? Number(result.value.toFixed(6)) : "—"}
                </div>
              </div>
            </div>
          )}

          {mode === "xIsWhatPercentOfY" && (
            <div style={{ display: 'flex', alignItems: 'end', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label className="input-label">Value</label>
                <input
                  type="number"
                  className="input-field"
                  style={{ fontSize: '1.2rem', fontWeight: 600 }}
                  value={m2x}
                  onChange={(e) => setM2x(e.target.value)}
                  step="any"
                />
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-muted)', paddingBottom: '0.7rem' }}>is what % of</div>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label className="input-label">Total</label>
                <input
                  type="number"
                  className="input-field"
                  style={{ fontSize: '1.2rem', fontWeight: 600 }}
                  value={m2y}
                  onChange={(e) => setM2y(e.target.value)}
                  step="any"
                />
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-muted)', paddingBottom: '0.7rem' }}>=</div>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label className="input-label">Result</label>
                <div style={{ padding: '0.65rem 1rem', background: '#16a34a10', border: '2px solid #16a34a40', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 800, color: '#16a34a', textAlign: 'center' }}>
                  {result ? `${Number(result.value.toFixed(6))}%` : "—"}
                </div>
              </div>
            </div>
          )}

          {mode === "xIsYPercentOfWhat" && (
            <div style={{ display: 'flex', alignItems: 'end', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label className="input-label">Value</label>
                <input
                  type="number"
                  className="input-field"
                  style={{ fontSize: '1.2rem', fontWeight: 600 }}
                  value={m3x}
                  onChange={(e) => setM3x(e.target.value)}
                  step="any"
                />
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-muted)', paddingBottom: '0.7rem' }}>is</div>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label className="input-label">Percent</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    className="input-field"
                    style={{ paddingRight: '2rem', fontSize: '1.2rem', fontWeight: 600 }}
                    value={m3y}
                    onChange={(e) => setM3y(e.target.value)}
                    step="any"
                  />
                  <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '1.1rem' }}>%</span>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-muted)', paddingBottom: '0.7rem' }}>of</div>
              <div style={{ flex: 1, minWidth: '120px' }}>
                <label className="input-label">Result</label>
                <div style={{ padding: '0.65rem 1rem', background: '#16a34a10', border: '2px solid #16a34a40', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 800, color: '#16a34a', textAlign: 'center' }}>
                  {result ? Number(result.value.toFixed(6)) : "—"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Formula Explanation */}
        {result && (
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Calculator size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Step-by-Step Solution</h3>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: '2' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Formula:</div>
              <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.75rem' }}>{result.formula}</div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Step 1:</div>
              <div style={{ marginBottom: '0.5rem' }}>{result.step1}</div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Step 2:</div>
              <div style={{ marginBottom: '0.75rem' }}>{result.step2}</div>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', fontWeight: 800, fontSize: '1.1rem', color: '#16a34a' }}>
                Answer: {Number(result.value.toFixed(6))}{resultSuffix}
              </div>
            </div>
          </div>
        )}

        {/* Copy Button */}
        {result && (
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '3rem' }} onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Result'}
          </button>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>How to use this percentage calculator</h2>
        <p>Here's the thing about percentage problems — there are really only three types. Either you know the percentage and the total and want the result, or you know the part and the total and want the percentage, or you know the part and the percentage and want the original total. That's it. Every percentage question you'll ever encounter is one of these three. And this calculator handles all of them.</p>
        <p>Just pick the right tab at the top. The first tab — "X% of Y" — is what most people need. Like "what is 15% of 240?" for calculating tips, taxes, or discounts. The inputs update the result in real time, so there's no button to press. Just type and see your answer.</p>

        <h2>When would I use each mode?</h2>
        <p>Mode 1 ("What is X% of Y") is your everyday workhorse. Tips at restaurants, sales tax, discount amounts, markup pricing — all Mode 1. Mode 2 ("X is what % of Y") is for when you want to understand proportions. Like if you scored 42 out of 50 on a test, what percentage is that? Or if 300 out of 1,200 employees work remotely, what's the remote work percentage? Mode 3 ("X is Y% of what") is the least common but incredibly useful. If a store says you're saving $30 and that's 20% off, Mode 3 tells you the original price was $150.</p>

        <h2>Why does it show the step-by-step formula?</h2>
        <p>Because just getting the answer isn't always enough. If you're a student trying to learn percentage math, seeing the formula and each step makes it click way faster than just memorizing rules. If you're a professional putting numbers in a report, the step-by-step breakdown lets you verify the logic and explain it to others. And honestly, even if you're good at math, it's just satisfying to see the calculation laid out clearly.</p>

        <h2>Is this calculator accurate for large or decimal numbers?</h2>
        <p>Absolutely. It uses standard JavaScript floating-point arithmetic, which handles numbers with up to 15-16 significant digits of precision. For everyday percentage calculations — and even most financial or scientific uses — that's more than accurate enough. Results are displayed to 6 decimal places by default, but trailing zeros are trimmed so the output stays clean. Whether you're calculating 0.5% of 3.7 or 99.9% of 1,000,000, the math is solid.</p>
      </div>
    </div>
  );
}
