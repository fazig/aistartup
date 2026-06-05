"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { Scale, Copy, Check, ArrowRightLeft, ArrowLeft } from "lucide-react";

interface Unit {
  value: string;
  label: string;
  ratio: number; // multiplier to convert from this unit to kilograms
}

const UNITS: Unit[] = [
  { value: "kg", label: "Kilograms (kg)", ratio: 1 },
  { value: "g", label: "Grams (g)", ratio: 0.001 },
  { value: "mg", label: "Milligrams (mg)", ratio: 0.000001 },
  { value: "t", label: "Metric Tons (t)", ratio: 1000 },
  { value: "lb", label: "Pounds (lb)", ratio: 0.45359237 },
  { value: "oz", label: "Ounces (oz)", ratio: 0.028349523125 },
  { value: "st", label: "Stones (st)", ratio: 6.35029318 },
  { value: "ct", label: "Carats (ct)", ratio: 0.0002 },
];

export default function WeightConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("kg");
  const [toUnit, setToUnit] = useState("lb");
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // Main single conversion
  const convertedValue = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const toRatio = UNITS.find((u) => u.value === toUnit)?.ratio || 1;
    const kgs = numericValue * fromRatio;
    return kgs / toRatio;
  }, [numericValue, fromUnit, toUnit]);

  // Convert to all units comparison list
  const allConversions = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const kgs = numericValue * fromRatio;
    return UNITS.map((unit) => {
      const val = kgs / unit.ratio;
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
          <Scale color="var(--primary)" /> Weight Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert weight and mass units instantly. Translate between kilograms, pounds, ounces, grams, and carats.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Mass & Weight Calculator</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Input Value */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Weight Value</label>
              <input
                type="number"
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. 150"
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
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>All Weight Units Grid</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            See the equivalent value across all supported units of weight based on your input of{" "}
            <strong>
              {numericValue} {fromUnit}
            </strong>
            :
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
        <h2>What is the difference between weight and mass?</h2>
        <p>
          In everyday conversation, we use the terms &quot;mass&quot; and &quot;weight&quot; interchangeably, but in physics, they
          are two very different concepts. <strong>Mass</strong> is the actual amount of matter in an object, which stays
          constant no matter where you go in the universe. A 10kg metal block is 10kg on Earth, on the Moon, or floating in deep space.
          <strong>Weight</strong> is the force exerted on that mass by gravity. Since gravity varies depending on where you are,
          your weight changes. The same 10kg block would weight roughly 1.6kg on the Moon because moon gravity is weaker. Since
          we live on Earth, our converters use the standard Earth gravitational constant to translate between mass and weight units.
        </p>

        <h2>Understanding imperial vs. metric mass units</h2>
        <p>
          The Metric system uses base-10 prefixes making it very simple to scale up and down. 1,000 milligrams is a gram, and 1,000
          grams is a kilogram. The Imperial system, however, relies on historic ratios: 16 ounces make a pound, and 14 pounds
          make a stone (a unit still widely used in the UK and Ireland for body weight). Carats are highly specialized units used for
          precious gems and diamonds (1 carat is exactly 200 milligrams).
        </p>

        <h2>Why use our weight converter?</h2>
        <p>
          Whether you are converting a recipe from grams to ounces, calculating shipping weights for courier packages, checking your
          body weight in pounds vs. stones, or weighing gold and jewelry in carats, our tool makes the calculation simple and
          instant. The side-by-side grid gives you immediate lookups of all units simultaneously, so you don&apos;t have to keep resetting the
          calculator.
        </p>
      </div>
    </div>
  );
}
