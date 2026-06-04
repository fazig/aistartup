"use client";

import { useState, useMemo } from "react";
import { Cpu, ArrowLeftRight, Copy, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Unit {
  value: string;
  label: string;
  ratio: number; // multiplier to convert from this unit to Volts (V)
  symbol: string;
  description: string;
}

const UNITS: Unit[] = [
  { value: "V", label: "Volt", symbol: "V", ratio: 1, description: "SI unit of electrical potential" },
  { value: "mV", label: "Millivolt", symbol: "mV", ratio: 0.001, description: "One-thousandth of a volt" },
  { value: "kV", label: "Kilovolt", symbol: "kV", ratio: 1000, description: "One thousand volts" },
  { value: "MV", label: "Megavolt", symbol: "MV", ratio: 1000000, description: "One million volts" },
  { value: "uV", label: "Microvolt", symbol: "µV", ratio: 0.000001, description: "One-millionth of a volt" },
  { value: "statV", label: "Statvolt", symbol: "statV", ratio: 299.792458, description: "CGS electrostatic unit of potential" },
  { value: "abV", label: "Abvolt", symbol: "abV", ratio: 0.00000001, description: "CGS electromagnetic unit of potential" },
];

export default function VoltageConverter() {
  const [inputValue, setInputValue] = useState("12");
  const [fromUnit, setFromUnit] = useState("V");
  const [toUnit, setToUnit] = useState("mV");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // Convert to Volts as base
  const voltsValue = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    return numericValue * fromRatio;
  }, [numericValue, fromUnit]);

  // Main conversion result
  const convertedValue = useMemo(() => {
    const toRatio = UNITS.find((u) => u.value === toUnit)?.ratio || 1;
    return voltsValue / toRatio;
  }, [voltsValue, toUnit]);

  // Comparison grid
  const allConversions = useMemo(() => {
    return UNITS.map((unit) => {
      const val = voltsValue / unit.ratio;
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
  }, [voltsValue]);

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
          <Cpu color="var(--primary)" /> Voltage Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert between Volts, Millivolts, Microvolts, Kilovolts, Megavolts, Statvolts, and Abvolts.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "stretch" }}>
        {/* Input Card */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Calculator</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Input Value */}
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Voltage</label>
                <input
                  type="number"
                  className="input-field"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. 12"
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

        {/* Grid Conversion View */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Voltage Conversion Grid</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            Real-time equivalent electric potentials across all supported scales:
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
        <h2>What is electrical voltage?</h2>
        <p>
          Think of voltage as electrical pressure. Just like water pressure pushes water through a pipe, voltage is the force that 
          pushes electrical current through a conductor. Officially, it is the difference in electrical potential energy between two 
          points, measured in Joules per Coulomb. That is why it is often called "potential difference." When you look at a battery, 
          the voltage rating (like 1.5V for AA batteries or 12V for a car battery) tells you how much energy can be discharged per charge carrier.
        </p>

        <h2>Metric prefixes: From microvolts to megavolts</h2>
        <p>
          In electronics and engineering, we work with widely different scales of potential. The <strong>Volt (V)</strong> is the standard 
          anchor. When analyzing biological signals like brainwaves (EEG) or heartbeats (ECG), we measure in <strong>microvolts (µV)</strong> 
          or <strong>millivolts (mV)</strong> because these signals are incredibly small. On the other hand, the distribution grid that carries 
          electricity over mountains and across cities runs at high potentials, measured in <strong>kilovolts (kV)</strong> or <strong>megavolts (MV)</strong>, 
          to reduce energy loss.
        </p>

        <h2>Electrostatic and electromagnetic units: Statvolt and Abvolt</h2>
        <p>
          Before the international metric system (SI) was standardized, physicists used the CGS (Centimeter-Gram-Second) system. This system split 
          into two different setups for electrical properties: electrostatic units (esu) and electromagnetic units (emu). 
          The <strong>statvolt</strong> is the esu unit of potential, which equals roughly 299.79 volts. It is based on the work needed to move 
          a charge against an electrostatic force. The <strong>abvolt</strong> is the emu unit, which is tiny—equal to exactly one hundred-millionth 
          (10<sup>-8</sup>) of a volt. While they are rarely used in modern consumer electronics, having a converter that handles them is 
          essential for retrofitting old equations or doing theoretical research in astrophysics and magnetics.
        </p>
      </div>
    </div>
  );
}
