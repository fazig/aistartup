"use client";

import { useState, useMemo } from "react";
import { Thermometer, Copy, Check, ArrowRightLeft } from "lucide-react";

type TempUnit = "C" | "F" | "K";

export default function TemperatureConverter() {
  const [inputValue, setInputValue] = useState("0");
  const [fromUnit, setFromUnit] = useState<TempUnit>("C");
  const [toUnit, setToUnit] = useState<TempUnit>("F");
  const [copied, setCopied] = useState(false);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // Convert inputs to Celsius as base, then to target
  const conversions = useMemo(() => {
    let celsius = 0;
    if (fromUnit === "C") {
      celsius = numericValue;
    } else if (fromUnit === "F") {
      celsius = ((numericValue - 32) * 5) / 9;
    } else {
      celsius = numericValue - 273.15;
    }

    const fahrenheit = (celsius * 9) / 5 + 32;
    const kelvin = celsius + 273.15;

    return {
      C: celsius,
      F: fahrenheit,
      K: kelvin,
    };
  }, [numericValue, fromUnit]);

  const resultValue = conversions[toUnit];

  const formula = useMemo(() => {
    if (fromUnit === "C" && toUnit === "F") {
      return `(${numericValue}°C × 9/5) + 32 = ${resultValue.toFixed(2)}°F`;
    }
    if (fromUnit === "C" && toUnit === "K") {
      return `${numericValue}°C + 273.15 = ${resultValue.toFixed(2)}K`;
    }
    if (fromUnit === "F" && toUnit === "C") {
      return `(${numericValue}°F − 32) × 5/9 = ${resultValue.toFixed(2)}°C`;
    }
    if (fromUnit === "F" && toUnit === "K") {
      return `(${numericValue}°F − 32) × 5/9 + 273.15 = ${resultValue.toFixed(2)}K`;
    }
    if (fromUnit === "K" && toUnit === "C") {
      return `${numericValue}K − 273.15 = ${resultValue.toFixed(2)}°C`;
    }
    if (fromUnit === "K" && toUnit === "F") {
      return `(${numericValue}K − 273.15) × 9/5 + 32 = ${resultValue.toFixed(2)}°F`;
    }
    return `${numericValue} = ${resultValue}`; // Same unit
  }, [numericValue, fromUnit, toUnit, resultValue]);

  // Calculate thermometer height representation (Celsius range: -40 to 100)
  const thermometerFill = useMemo(() => {
    const minC = -40;
    const maxC = 100;
    const currentC = conversions.C;
    const percentage = ((currentC - minC) / (maxC - minC)) * 100;
    return Math.max(0, Math.min(100, percentage));
  }, [conversions]);

  // Visual text description for temperature ranges
  const tempComfortLabel = useMemo(() => {
    const c = conversions.C;
    if (c <= -20) return { label: "Freezing Cold", color: "#1d4ed8" };
    if (c <= 0) return { label: "Below Freezing", color: "#3b82f6" };
    if (c <= 15) return { label: "Chilly / Cool", color: "#60a5fa" };
    if (c <= 25) return { label: "Room Temperature / Pleasant", color: "#10b981" };
    if (c <= 35) return { label: "Warm / Hot", color: "#f59e0b" };
    return { label: "Extremely Hot / Scorching", color: "#dc2626" };
  }, [conversions]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultValue.toFixed(4));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Thermometer color="var(--primary)" /> Temperature Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert temperatures between Celsius, Fahrenheit, and Kelvin with step-by-step mathematical formulas.
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
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Temperature</label>
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
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>From</label>
                  <select
                    className="input-field"
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value as TempUnit)}
                    style={{ cursor: "pointer", fontFamily: "inherit" }}
                  >
                    <option value="C">Celsius (°C)</option>
                    <option value="F">Fahrenheit (°F)</option>
                    <option value="K">Kelvin (K)</option>
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

                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>To</label>
                  <select
                    className="input-field"
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value as TempUnit)}
                    style={{ cursor: "pointer", fontFamily: "inherit" }}
                  >
                    <option value="C">Celsius (°C)</option>
                    <option value="F">Fahrenheit (°F)</option>
                    <option value="K">Kelvin (K)</option>
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
                  {resultValue.toFixed(2)} {toUnit === "K" ? "K" : `°${toUnit}`}
                </p>
              </div>
              <button
                onClick={handleCopy}
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
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            {fromUnit !== toUnit && (
              <div
                style={{
                  marginTop: "0.75rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                  fontSize: "0.8rem",
                  fontFamily: "monospace",
                  opacity: 0.95,
                }}
              >
                Formula: {formula}
              </div>
            )}
          </div>
        </div>

        {/* Thermometer visualization panel */}
        <div className="card" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {/* Thermometer Graphic */}
          <div
            style={{
              position: "relative",
              width: "24px",
              height: "220px",
              background: "#e2e8f0",
              borderRadius: "20px 20px 0 0",
              border: "3px solid #cbd5e1",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* Liquid Fill */}
            <div
              style={{
                width: "100%",
                height: `${thermometerFill}%`,
                background: tempComfortLabel.color,
                borderRadius: "20px 20px 0 0",
                transition: "height 0.4s ease, background 0.4s ease",
              }}
            />
            {/* Bulb at bottom */}
            <div
              style={{
                position: "absolute",
                bottom: "-15px",
                width: "42px",
                height: "42px",
                background: tempComfortLabel.color,
                borderRadius: "50%",
                border: "3px solid #cbd5e1",
                zIndex: 2,
                transition: "background 0.4s ease",
              }}
            />
          </div>

          <div style={{ flex: 1, paddingLeft: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Temperature Status</h3>
            <div
              style={{
                display: "inline-block",
                padding: "0.4rem 1rem",
                borderRadius: "20px",
                background: tempComfortLabel.color + "15",
                color: tempComfortLabel.color,
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: "1rem",
                border: `1px solid ${tempComfortLabel.color}30`,
              }}
            >
              {tempComfortLabel.label}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Celsius Equivalent:</span>
                <span style={{ fontWeight: 600 }}>{conversions.C.toFixed(2)} °C</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Fahrenheit Equivalent:</span>
                <span style={{ fontWeight: 600 }}>{conversions.F.toFixed(2)} °F</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.4rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Kelvin Equivalent:</span>
                <span style={{ fontWeight: 600 }}>{conversions.K.toFixed(2)} K</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>Celsius, Fahrenheit, and Kelvin: What is the story?</h2>
        <p>
          Why do we have different ways to measure temperature? It comes down to what the creators of these scales chose as
          their reference points.
        </p>
        <ul>
          <li>
            <strong>Celsius (°C)</strong> was created by Anders Celsius in 1742. He built his scale on the simplest properties
            of water: 0°C is where water freezes, and 100°C is where it boils (at sea level). This base-100 logic makes it
            extremely practical and the global standard.
          </li>
          <li>
            <strong>Fahrenheit (°F)</strong>, created by Daniel Gabriel Fahrenheit in 1724, used a different logic. He set
            0°F based on the freezing temperature of a brine solution, and roughly 96°F as human body temperature. This scale is
            highly precise for air temperature since the difference between hot and cold weather falls neatly within a 0 to 100
            scale.
          </li>
          <li>
            <strong>Kelvin (K)</strong> is the thermodynamic temperature scale created by Lord Kelvin in 1848. Unlike the other
            two, it doesn&apos;t use degrees. It starts at absolute zero (0 K)—the absolute coldest theoretical temperature
            possible, where all molecular motion stops. It is the core scale used in scientific equations and astrophysics.
          </li>
        </ul>

        <h2>Formulas for temperature conversion</h2>
        <p>
          Converting temperatures is slightly different from other converters because the scales have offset starting points
          (0°C is 32°F, and 273.15 K).
        </p>
        <p>
          To convert Celsius to Fahrenheit, you multiply by 9/5 (1.8) and add 32. To convert Fahrenheit back to Celsius, you
          subtract 32 first, then multiply by 5/9. Since Kelvin scales exactly like Celsius, you only have to add or subtract
          273.15 to move between Kelvin and Celsius.
        </p>

        <h2>Using the visual thermometer</h2>
        <p>
          The interactive thermometer on the right adjusts in real-time as you type, filling with colors that reflect the
          environmental temperature. Blue represents freezing conditions, green is comfortable room temperature, and orange to
          red scales up into high heat. It makes visualizing conversions quick and intuitive.
        </p>
      </div>
    </div>
  );
}
