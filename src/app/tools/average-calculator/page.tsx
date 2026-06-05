"use client";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check, Trash2, ArrowLeft, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AverageCalculator() {
  const [input, setInput] = useState("10, 15, 20, 25, 30");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Parse numbers from input
  const numbers = useMemo(() => {
    return input
      .split(/[\s,;]+/)
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num));
  }, [input]);

  const stats = useMemo(() => {
    if (numbers.length === 0) return null;

    const count = numbers.length;
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    const mean = sum / count;
    
    // Sort array for median and min/max
    const sorted = [...numbers].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[count - 1];
    const range = max - min;

    // Median
    let median = 0;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    // Mode
    const freq: { [key: number]: number } = {};
    let maxFreq = 0;
    numbers.forEach((val) => {
      freq[val] = (freq[val] || 0) + 1;
      if (freq[val] > maxFreq) {
        maxFreq = freq[val];
      }
    });

    const modesList: number[] = [];
    if (maxFreq > 1) {
      Object.keys(freq).forEach((key) => {
        const val = parseFloat(key);
        if (freq[val] === maxFreq) {
          modesList.push(val);
        }
      });
    }
    const modeString = modesList.length > 0 ? modesList.join(", ") : "No mode (all unique)";

    // Standard Deviation & Variance
    const sumSquares = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    const variancePop = sumSquares / count;
    const sdPop = Math.sqrt(variancePop);

    const varianceSample = count > 1 ? sumSquares / (count - 1) : 0;
    const sdSample = Math.sqrt(varianceSample);

    return {
      count,
      sum,
      mean,
      median,
      modeString,
      min,
      max,
      range,
      variancePop,
      sdPop,
      varianceSample,
      sdSample,
      sortedString: sorted.join(", "),
    };
  }, [numbers]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
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

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <BarChart3 color="var(--primary)" /> Average & Statistics Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Find the mean, median, mode, standard deviation, and variance for any list of numbers instantly.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Input area */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Input Data Set</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>
            Enter your numbers separated by commas, spaces, semicolons, or newlines:
          </p>
          <textarea
            className="input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 10, 15, 20, 25, 30"
            style={{ minHeight: "180px", fontSize: "1.1rem", fontFamily: "monospace", lineHeight: "1.6" }}
          />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <button className="btn btn-outline" style={{ display: "flex", gap: "0.4rem", alignItems: "center" }} onClick={() => setInput("")} disabled={!input}>
              <Trash2 size={16} /> Clear All
            </button>
          </div>
        </div>

        {/* Core Quick Stats Panel */}
        {stats && (
          <div className="card" style={{ background: "linear-gradient(135deg, var(--bg-card), #f8fafc)", border: "1px solid var(--border-light)" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Key Metrics Summary</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Average (Mean):</span>
                <span style={{ fontWeight: 800, color: "var(--primary)", fontSize: "1.25rem" }}>
                  {stats.mean.toLocaleString("en-US", { maximumFractionDigits: 4 })}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Median:</span>
                <span style={{ fontWeight: 600 }}>{stats.median.toLocaleString("en-US", { maximumFractionDigits: 4 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Mode:</span>
                <span style={{ fontWeight: 600 }}>{stats.modeString}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Range (Max - Min):</span>
                <span style={{ fontWeight: 600 }}>
                  {stats.range.toLocaleString("en-US", { maximumFractionDigits: 4 })} ({stats.max} - {stats.min})
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Sum total:</span>
                <span style={{ fontWeight: 600 }}>{stats.sum.toLocaleString("en-US", { maximumFractionDigits: 4 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Number Count:</span>
                <span style={{ fontWeight: 600 }}>{stats.count}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Statistics */}
      {stats && (
        <div className="card" style={{ marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Advanced Statistics</h3>
          <div className="grid-3" style={{ gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ padding: "1.25rem", background: "#f8fafc", borderRadius: "10px", border: "1px solid var(--border-light)" }}>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Standard Deviation (Sample)</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--primary)" }}>
                {stats.sdSample.toLocaleString("en-US", { maximumFractionDigits: 5 })}
              </div>
            </div>
            <div style={{ padding: "1.25rem", background: "#f8fafc", borderRadius: "10px", border: "1px solid var(--border-light)" }}>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Standard Deviation (Population)</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                {stats.sdPop.toLocaleString("en-US", { maximumFractionDigits: 5 })}
              </div>
            </div>
            <div style={{ padding: "1.25rem", background: "#f8fafc", borderRadius: "10px", border: "1px solid var(--border-light)" }}>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Variance (Sample)</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                {stats.varianceSample.toLocaleString("en-US", { maximumFractionDigits: 5 })}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "1rem",
              background: "#eff6ff",
              borderRadius: "8px",
              fontSize: "0.9rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ color: "var(--text-muted)", marginRight: "0.5rem" }}>Sorted Values:</span>
              <strong style={{ fontFamily: "monospace", color: "var(--text-main)", wordBreak: "break-all" }}>{stats.sortedString}</strong>
            </div>
            <button
              onClick={() => copyToClipboard(stats.sortedString, "sorted")}
              style={{ background: "none", border: "none", color: copiedKey === "sorted" ? "#16a34a" : "var(--text-muted)", cursor: "pointer" }}
            >
              {copiedKey === "sorted" ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div className="prose">
        <h2>What are Mean, Median, and Mode?</h2>
        <p>
          In statistics, mean, median, and mode are the three primary measurements of &quot;central tendency&quot;—they describe the
          middle or center points of a data set in different ways:
        </p>
        <ul>
          <li>
            <strong>Mean (Average)</strong> is calculated by adding all the values in a set and dividing the sum by the count of
            elements. It is the most common average type, though it can be heavily affected by extreme outliers.
          </li>
          <li>
            <strong>Median</strong> is the exact middle value in a data set when it is arranged from lowest to highest. If the set
            has an even number of values, the median is the average of the two middle numbers. The median is highly useful because it
            is not skewed by extreme outliers (like house prices or salaries).
          </li>
          <li>
            <strong>Mode</strong> is the number that appears most frequently in a set. A data set can have a single mode, multiple
            modes (multimodal), or no mode at all if every value is unique.
          </li>
        </ul>

        <h2>Understanding Standard Deviation and Variance</h2>
        <p>
          Standard deviation and variance measure the **dispersion** or spread of your data points—meaning how far apart the numbers are
          spread from their average.
        </p>
        <p>
          <strong>Variance</strong> is the average of the squared differences from the Mean. A high variance means the numbers are
          widely scattered, while a low variance means they are clustered tightly around the mean.
        </p>
        <p>
          <strong>Standard Deviation (SD)</strong> is the square root of the variance. Because variance is expressed in squared
          units (which can be hard to visualize), standard deviation returns the measurement to the original unit scale.
        </p>
        <p>
          The difference between **Sample** and **Population** calculations relates to what data you have. Use <em>Population</em> if your
          set contains every single item in the group (e.g., the test scores of all students in a classroom). Use <em>Sample</em> if
          your data is a smaller subset taken from a larger group (e.g., surveying 10 students to represent a whole university).
        </p>
      </div>
    </div>
  );
}
