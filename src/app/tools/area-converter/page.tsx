"use client";

import { useState, useMemo } from "react";
import { ArrowLeftRight, Copy, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Unit {
  value: string;
  label: string;
  ratio: number; // multiplier to convert from this unit to square meters
}

const UNITS: Unit[] = [
  { value: "sqm", label: "Square Meters (m²)", ratio: 1 },
  { value: "sqkm", label: "Square Kilometers (km²)", ratio: 1000000 },
  { value: "sqcm", label: "Square Centimeters (cm²)", ratio: 0.0001 },
  { value: "sqmm", label: "Square Millimeters (mm²)", ratio: 0.000001 },
  { value: "sqmi", label: "Square Miles (mi²)", ratio: 2589988.110336 },
  { value: "ac", label: "Acres (ac)", ratio: 4046.8564224 },
  { value: "ha", label: "Hectares (ha)", ratio: 10000 },
  { value: "sqyd", label: "Square Yards (yd²)", ratio: 0.83612736 },
  { value: "sqft", label: "Square Feet (ft²)", ratio: 0.09290304 },
  { value: "sqin", label: "Square Inches (in²)", ratio: 0.00064516 },
];

export default function AreaConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("ha");
  const [toUnit, setToUnit] = useState("ac");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // Main conversion
  const convertedValue = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const toRatio = UNITS.find((u) => u.value === toUnit)?.ratio || 1;
    const sqms = numericValue * fromRatio;
    return sqms / toRatio;
  }, [numericValue, fromUnit, toUnit]);

  // Comparison grid
  const allConversions = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const sqms = numericValue * fromRatio;
    return UNITS.map((unit) => {
      const val = sqms / unit.ratio;
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
          <ArrowLeftRight color="var(--primary)" /> Area Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert between metric and imperial area units including square meters, feet, acres, and hectares.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Area Unit Calculator</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Input Value */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Area Value</label>
              <input
                type="number"
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. 100"
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
                <ArrowLeftRight size={16} />
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
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>All Area Equivalents Grid</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            See the equivalent value across all supported units of area:
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
        <h2>What are the standard units of area?</h2>
        <p>
          Area represents the size or extent of a two-dimensional surface. Just like length and weight, we use both metric
          (square meters, square kilometers, hectares) and imperial units (square feet, square yards, square miles, acres):
        </p>
        <ul>
          <li>
            <strong>Square Meter (m²)</strong> is the baseline SI unit of area. 1 square meter is the area of a square whose sides
            are exactly 1 meter.
          </li>
          <li>
            <strong>Hectare (ha)</strong> is a metric unit representing 10,000 square meters (roughly equal to a square with
            100m sides). It is the standard land measurement unit in Europe and agriculture.
          </li>
          <li>
            <strong>Acre (ac)</strong> is the traditional land measurement unit used in the US and UK. Historically, 1 acre was the
            amount of land a single yoke of oxen could plow in one day. 1 acre is equal to exactly 43,560 square feet.
          </li>
        </ul>
      </div>
    </div>
  );
}
