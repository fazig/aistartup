"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { Clock, Copy, Check, ArrowRightLeft, ArrowLeft } from "lucide-react";

interface Unit {
  value: string;
  label: string;
  ratio: number; // multiplier to convert from this unit to seconds
}

const UNITS: Unit[] = [
  { value: "ms", label: "Milliseconds (ms)", ratio: 0.001 },
  { value: "s", label: "Seconds (s)", ratio: 1 },
  { value: "min", label: "Minutes (min)", ratio: 60 },
  { value: "h", label: "Hours (h)", ratio: 3600 },
  { value: "d", label: "Days (d)", ratio: 86400 },
  { value: "wk", label: "Weeks (wk)", ratio: 604800 },
  { value: "mo", label: "Months (mo)", ratio: 2629746 }, // Average month length
  { value: "yr", label: "Years (yr)", ratio: 31557600 }, // Julian year (365.25 days)
  { value: "dec", label: "Decades (dec)", ratio: 315576000 },
  { value: "cen", label: "Centuries (cen)", ratio: 3155760000 },
];

export default function TimeConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("h");
  const [toUnit, setToUnit] = useState("min");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // Main conversion
  const convertedValue = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const toRatio = UNITS.find((u) => u.value === toUnit)?.ratio || 1;
    const secs = numericValue * fromRatio;
    return secs / toRatio;
  }, [numericValue, fromUnit, toUnit]);

  // Comparison grid
  const allConversions = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const secs = numericValue * fromRatio;
    return UNITS.map((unit) => {
      const val = secs / unit.ratio;
      return {
        ...unit,
        valueFormatted: val.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 6,
        }),
        rawValue: val,
      };
    });
  }, [numericValue, fromUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
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
          <Clock color="var(--primary)" /> Time Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert between seconds, minutes, hours, days, weeks, months, years, and centuries instantly.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Time Unit Calculator</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Input Value */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Time Value</label>
              <input
                type="number"
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. 24"
                style={{ fontSize: "1.1rem", fontFamily: "inherit" }}
              />
            </div>

            {/* Selectors */}
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "140px" }}>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>From</label>
                <select
                  className="input-field"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  style={{ cursor: "pointer", fontFamily: "inherit" }}
                >
                  {UNITS.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn btn-outline"
                onClick={handleSwap}
                style={{
                  padding: "0.75rem",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "46px",
                  marginBottom: "2px",
                }}
                title="Swap units"
              >
                <ArrowRightLeft size={16} />
              </button>

              <div style={{ flex: 1, minWidth: "140px" }}>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>To</label>
                <select
                  className="input-field"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  style={{ cursor: "pointer", fontFamily: "inherit" }}
                >
                  {UNITS.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Result Box */}
            <div
              style={{
                marginTop: "0.5rem",
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
                <p style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.2rem" }}>Converted Result</p>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, wordBreak: "break-all" }}>
                  {convertedValue.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 6,
                  })}{" "}
                  {toUnit}
                </p>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    convertedValue.toString(),
                    "main"
                  )
                }
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
                {copiedIndex === "main" ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* All Units Comparison */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Equivalent Duration Grid</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            Compare your entry of{" "}
            <strong>
              {numericValue} {fromUnit}
            </strong>{" "}
            against all supported scales:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "350px", overflowY: "auto", paddingRight: "0.25rem" }}>
            {allConversions.map((unit) => (
              <div
                key={unit.value}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.6rem 0.85rem",
                  background: "#f8fafc",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, color: "var(--text-main)" }}>{unit.valueFormatted}</span>{" "}
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{unit.value}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(unit.rawValue.toString(), unit.value)}
                  style={{
                    background: "none",
                    border: "none",
                    color: copiedIndex === unit.value ? "#16a34a" : "var(--text-muted)",
                    cursor: "pointer",
                    padding: "0.25rem",
                  }}
                >
                  {copiedIndex === unit.value ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>The physics and mathematics of time measurement</h2>
        <p>
          Time is one of the fundamental dimensions of our universe. Measuring it accurately has been one of humanity&apos;s greatest
          scientific achievements. Today, we measure time based on the vibrations of cesium atoms, which defines the standard
          second. While metric values scale nicely, time units follow ancient Babylonian base-60 divisions (60 seconds in a minute,
          60 minutes in an hour) and Earth&apos;s orbit/rotation patterns (24 hours in a day, 365.2422 days in a solar year).
        </p>

        <h2>Why do time conversions get tricky?</h2>
        <p>
          Converting seconds, minutes, and hours is straightforward since the ratios are constant. But converting to months
          and years introduces variables: months can have 28, 29, 30, or 31 days, and leap years add an extra day every 4 years.
          To ensure accuracy in long-term conversions, this tool utilizes the Julian year definition (365.25 days exactly) and
          the average month length (30.436875 days), which are the standard units used by international astronomical and scientific bodies.
        </p>

        <h2>Use cases for this time converter</h2>
        <p>
          This calculator is highly useful for a wide range of situations. Developers use it to convert server execution timeouts
          from milliseconds to minutes. Project planners use it to estimate project lengths from weeks into months or business
          quarters. Students and writers use it for historical checks, such as converting decades and centuries into days or seconds.
          The live comparison panel lists equivalent durations across all units immediately, saving you time.
        </p>
      </div>
    </div>
  );
}
