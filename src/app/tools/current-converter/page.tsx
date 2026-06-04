"use client";

import { useState, useMemo } from "react";
import { Activity, ArrowLeftRight, Copy, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Unit {
  value: string;
  label: string;
  symbol: string;
  ratio: number; // multiplier to convert from this unit to Amperes (A)
  description: string;
}

const UNITS: Unit[] = [
  { value: "A", label: "Ampere", symbol: "A", ratio: 1, description: "SI base unit of electric current" },
  { value: "mA", label: "Milliampere", symbol: "mA", ratio: 0.001, description: "One-thousandth of an ampere" },
  { value: "kA", label: "Kiloampere", symbol: "kA", ratio: 1000, description: "One thousand amperes" },
  { value: "uA", label: "Microampere", symbol: "µA", ratio: 0.000001, description: "One-millionth of an ampere" },
  { value: "Bi", label: "Biot", symbol: "Bi", ratio: 10, description: "CGS electromagnetic unit of current" },
  { value: "abA", label: "Abampere", symbol: "abA", ratio: 10, description: "CGS electromagnetic equivalent (equivalent to Biot)" },
  { value: "statA", label: "Statampere", symbol: "statA", ratio: 3.33564095198e-10, description: "CGS electrostatic unit of current" },
];

export default function CurrentConverter() {
  const [inputValue, setInputValue] = useState("5");
  const [fromUnit, setFromUnit] = useState("A");
  const [toUnit, setToUnit] = useState("mA");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // Convert to Amperes as base
  const amperesValue = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    return numericValue * fromRatio;
  }, [numericValue, fromUnit]);

  // Main conversion result
  const convertedValue = useMemo(() => {
    const toRatio = UNITS.find((u) => u.value === toUnit)?.ratio || 1;
    return amperesValue / toRatio;
  }, [amperesValue, toUnit]);

  // Comparison grid
  const allConversions = useMemo(() => {
    return UNITS.map((unit) => {
      const val = amperesValue / unit.ratio;
      let valStr = "";
      if (val === 0) {
        valStr = "0";
      } else if (Math.abs(val) < 0.0001 || Math.abs(val) > 10000000) {
        valStr = val.toExponential(6);
      } else {
        valStr = val.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 6,
        });
      }
      return {
        ...unit,
        valueFormatted: valStr,
        rawValue: val,
      };
    });
  }, [amperesValue]);

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
          <Activity color="var(--primary)" /> Current Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert electric current values between Amperes, Milliamperes, Microamperes, Kiliamperes, Biots, Abamperes, and Statamperes.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "stretch" }}>
        {/* Input Card */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Current Calculator</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Input Value */}
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Current Value</label>
                <input
                  type="number"
                  className="input-field"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. 5"
                  style={{ fontSize: "1.1rem", fontFamily: "inherit" }}
                />
              </div>

              {/* Selectors */}
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>From</label>
                  <select
                    className="input-field"
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    style={{ cursor: "pointer", fontFamily: "inherit" }}
                  >
                    {UNITS.map((u) => (
                      <option key={u.value} value={u.value}>
                        {u.label} ({u.symbol})
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

                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>To</label>
                  <select
                    className="input-field"
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    style={{ cursor: "pointer", fontFamily: "inherit" }}
                  >
                    {UNITS.map((u) => (
                      <option key={u.value} value={u.value}>
                        {u.label} ({u.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "1.5rem",
              padding: "1.25rem",
              background: "linear-gradient(135deg, var(--primary), #1d4ed8)",
              borderRadius: "12px",
              color: "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.2rem" }}>Result</p>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, wordBreak: "break-all" }}>
                  {convertedValue.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 6,
                  })}{" "}
                  {toUnit}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(convertedValue.toString(), "main")}
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

        {/* Live conversion grid */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Current Conversion Grid</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            Real-time conversion of your input current across all supported units:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
            {allConversions.map((unit) => (
              <div
                key={unit.value}
                style={{
                  padding: "0.75rem 1rem",
                  background: "#f8fafc",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "75px",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.15rem" }}>
                    {unit.label} ({unit.symbol})
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--text-main)", wordBreak: "break-all", fontSize: "0.95rem" }}>
                    {unit.valueFormatted}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.25rem" }}>
                  <button
                    onClick={() => copyToClipboard(unit.rawValue.toString(), unit.value)}
                    style={{
                      background: "none",
                      border: "none",
                      color: copiedIndex === unit.value ? "#16a34a" : "var(--text-muted)",
                      cursor: "pointer",
                      padding: "0.15rem",
                    }}
                  >
                    {copiedIndex === unit.value ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is electric current and how is it measured?</h2>
        <p>
          While voltage acts as the pressure pushing electrons, electric current is the actual flow rate of those electrons. 
          Imagine water flowing through a garden hose—the amount of water passing through a point in the hose per second represents the current. 
          In electronics, we measure current in <strong>Amperes (A)</strong>, named after André-Marie Ampère. One Ampere represents one Coulomb 
          of charge (which is about 6.242 × 10<sup>18</sup> electrons) passing through a point in a circuit every second.
        </p>

        <h2>Common current scales: Milliamperes and Microamperes</h2>
        <p>
          Most everyday gadgets and microcontrollers (like Arduinos or smartphones) operate on small amounts of current. They draw current in 
          <strong>milliamperes (mA)</strong> or even <strong>microamperes (µA)</strong> when in sleep mode. For example, a typical USB port 
          supplies up to 500mA or 900mA, and a simple LED light needs about 20mA to run. Conversely, heavy machinery, power stations, and 
          industrial welders consume electricity in <strong>kiloamperes (kA)</strong>. Bouncing between these scales lets you calculate battery 
          life and wire thickness requirements easily.
        </p>

        <h2>Scientific units: Biot, Abampere, and Statampere</h2>
        <p>
          Before standard SI metric was adopted globally, electromagnetic units were defined in the CGS electromagnetic system. The CGS unit for 
          current is the <strong>Biot (Bi)</strong>, which is named after Jean-Baptiste Biot and is equal to exactly 10 Amperes. It is also 
          referred to as the <strong>abampere</strong>. In the companion CGS electrostatic system, current is measured in <strong>statamperes</strong>. 
          One statampere is incredibly small, equal to approximately 3.3356 × 10<sup>-10</sup> Amperes. It is derived from the electrostatic 
          charge unit flowing per second, and is still useful when calculating electrostatic fields or modeling molecular-level physics.
        </p>
      </div>
    </div>
  );
}
