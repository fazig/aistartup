"use client";

import { useState, useMemo } from "react";
import { Gauge, ArrowLeftRight, Copy, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Unit {
  value: string;
  label: string;
  ratio: number; // multiplier to convert from this unit to Pascals (Pa)
  description: string;
}

const UNITS: Unit[] = [
  { value: "Pa", label: "Pascal (Pa)", ratio: 1, description: "SI base unit of pressure" },
  { value: "kPa", label: "Kilopascal (kPa)", ratio: 1000, description: "Commonly used for tire pressure and meteorology" },
  { value: "MPa", label: "Megapascal (MPa)", ratio: 1000000, description: "Used in structural engineering and hydraulics" },
  { value: "bar", label: "Bar", ratio: 100000, description: "Approximate atmospheric pressure at sea level" },
  { value: "mbar", label: "Millibar (mbar)", ratio: 100, description: "Commonly used in weather forecasting" },
  { value: "psi", label: "Pounds per Square Inch (PSI)", ratio: 6894.757293168, description: "Mainly used in US for tire pressure and industrial applications" },
  { value: "atm", label: "Atmosphere (atm)", ratio: 101325, description: "Standard atmospheric pressure at mean sea level" },
  { value: "Torr", label: "Torr / mmHg", ratio: 133.322368421, description: "Mainly used in vacuum systems and medicine" },
  { value: "inHg", label: "Inches of Mercury (inHg)", ratio: 3386.388666667, description: "Commonly used for barometric pressure in the US" },
];

export default function PressureConverter() {
  const [inputValue, setInputValue] = useState("101.325");
  const [fromUnit, setFromUnit] = useState("kPa");
  const [toUnit, setToUnit] = useState("atm");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // Main conversion
  const convertedValue = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const toRatio = UNITS.find((u) => u.value === toUnit)?.ratio || 1;
    const pascals = numericValue * fromRatio;
    return pascals / toRatio;
  }, [numericValue, fromUnit, toUnit]);

  // Comparison grid
  const allConversions = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const pascals = numericValue * fromRatio;
    return UNITS.map((unit) => {
      const val = pascals / unit.ratio;
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
          <Gauge color="var(--primary)" /> Pressure Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert values between Pascal, Kilopascal, PSI, Bar, Atmosphere, Torr, and more. Visualise equivalents in real time.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Quick Calculator</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Input Value */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Pressure Value</label>
              <input
                type="number"
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. 101.325"
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
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>All Pressure Equivalents Grid</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            See how your entered value translates across all major pressure scales simultaneously:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "380px", overflowY: "auto", paddingRight: "0.25rem" }}>
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
                  <div style={{ fontWeight: 600, color: "var(--text-main)", wordBreak: "break-all" }}>
                    {unit.valueFormatted} <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 400 }}>{unit.value}</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>
                    {unit.label}
                  </div>
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
        <h2>What is pressure and how do we measure it?</h2>
        <p>
          At its core, pressure is the amount of force applied perpendicular to a surface area. In standard equations, it is written as 
          <em> P = F/A</em>. But in the real world, how we measure pressure depends entirely on the context. If you are inflating a car tire, 
          you probably think in PSI. If you are watching a hurricane build up on the weather news, you will hear meteorologists talk 
          about millibars or inches of mercury. If you are doing laboratory physics, it is all about Pascals or Torr.
        </p>

        <h2>Understanding the different pressure units</h2>
        <p>
          The SI unit for pressure is the <strong>Pascal (Pa)</strong>, defined as one Newton per square meter. Because one Pascal is a tiny amount of 
          pressure (comparable to a single dollar bill lying flat on a table), we frequently use <strong>Kilopascals (kPa)</strong> or 
          <strong>Megapascals (MPa)</strong>. When it comes to imperial systems, <strong>PSI (pounds per square inch)</strong> is the standard. 
          For everyday atmospheric benchmarks, we use <strong>Atmospheres (atm)</strong>, where 1 atm is the normal air pressure at sea level. 
          To put things in perspective, 1 atm is exactly 101,325 Pascals, 1.01325 bar, or about 14.696 PSI.
        </p>

        <h2>Why are weather forecasters using inches of mercury?</h2>
        <p>
          Historically, pressure was measured using liquid columns. A traditional barometer contains a column of mercury (Hg) that rises and falls 
          depending on atmospheric pressure. That is where units like <strong>Inches of Mercury (inHg)</strong> and <strong>Torr / millimeters of 
          mercury (mmHg)</strong> come from. In standard weather conditions at sea level, the atmosphere pushes mercury up exactly 29.92 inches or 
          760 millimeters. This tool lets you bounce between these historical mercury scales and modern metric grids seamlessly, giving you the math 
          behind weather readings, engineering tasks, or automotive tire calibrations in a single click.
        </p>
      </div>
    </div>
  );
}
