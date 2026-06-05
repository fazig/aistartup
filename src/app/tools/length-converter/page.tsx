"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { Ruler, Copy, Check, ArrowRightLeft, ArrowLeft } from "lucide-react";

interface Unit {
  value: string;
  label: string;
  ratio: number; // multiplier to convert from this unit to meters
}

const UNITS: Unit[] = [
  { value: "m", label: "Meters (m)", ratio: 1 },
  { value: "km", label: "Kilometers (km)", ratio: 1000 },
  { value: "cm", label: "Centimeters (cm)", ratio: 0.01 },
  { value: "mm", label: "Millimeters (mm)", ratio: 0.001 },
  { value: "dm", label: "Decimeters (dm)", ratio: 0.1 },
  { value: "mi", label: "Miles (mi)", ratio: 1609.344 },
  { value: "yd", label: "Yards (yd)", ratio: 0.9144 },
  { value: "ft", label: "Feet (ft)", ratio: 0.3048 },
  { value: "in", label: "Inches (in)", ratio: 0.0254 },
  { value: "nmi", label: "Nautical Miles (nmi)", ratio: 1852 },
];

export default function LengthConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
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
    // convert fromUnit to meters, then to toUnit
    const meters = numericValue * fromRatio;
    return meters / toRatio;
  }, [numericValue, fromUnit, toUnit]);

  // Convert to all units comparison list
  const allConversions = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const meters = numericValue * fromRatio;
    return UNITS.map((unit) => {
      const val = meters / unit.ratio;
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
          <Ruler color="var(--primary)" /> Length Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert between metric and imperial length units instantly. Check conversions for all units in a single click.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Conversion Calculator</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Input Value */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Length Value</label>
              <input
                type="number"
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. 10"
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
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>All Units Conversion Grid</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            See the equivalent value across all supported units of length based on your input of{" "}
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
        <h2>Understanding metric and imperial systems of length</h2>
        <p>
          Throughout history, humans have used whatever was nearby to measure length—usually parts of their own body. An inch
          was the width of a thumb, a foot was literally the length of a foot, and a yard was the distance from a king&apos;s
          nose to his fingertips. While these worked fine locally, they caused massive confusion in trade. This led to two
          dominant systems today: the Metric system (based on decimals and physical constants, used by 95% of the world) and
          the Imperial system (still used primarily in the United States).
        </p>
        <p>
          Converting between these systems used to involve memorizing awkward fractions (like multiplying feet by 0.3048 to get
          meters). This converter does all that math behind the scenes instantly, utilizing high-precision constants to ensure
          your conversions are accurate down to the decimal point.
        </p>

        <h2>What are these different length units used for?</h2>
        <p>
          Different industries use specific units for practical reasons. Meter and kilometer are standard for everyday
          distances, building construction, and maps in most countries. Decimeters and centimeters handle smaller items like
          stationery, clothing measurements, and screen sizes. Inches are popular for screen sizes, wheel rims, and plumbing
          pipes globally. Yards are mostly seen in sports layouts (like American football or golf courses) and fabrics. Nautical
          Miles are unique—one nautical mile equals exactly one minute of latitude on Earth, making it the international
          standard for air and sea navigation.
        </p>

        <h2>How this tool helps you work faster</h2>
        <p>
          Instead of forcing you to select one unit, convert it, and then change settings to look at another, this tool gives
          you a complete comparison grid. Once you type in your input value and select your base unit, you will instantly see
          what that length equals in inches, centimeters, feet, meters, kilometers, and miles all on the same screen. You can
          copy any specific result by clicking the small copy icon next to it, making it extremely easy to copy values directly into
          spreadsheets, design files, or code.
        </p>
      </div>
    </div>
  );
}
