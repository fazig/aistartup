"use client";

import { useState, useMemo } from "react";
import { Gauge, Copy, Check, ArrowRightLeft } from "lucide-react";

interface Unit {
  value: string;
  label: string;
  ratio: number; // multiplier to convert from this unit to m/s
}

const UNITS: Unit[] = [
  { value: "m/s", label: "Meters per second (m/s)", ratio: 1 },
  { value: "km/h", label: "Kilometers per hour (km/h)", ratio: 0.27777778 },
  { value: "mph", label: "Miles per hour (mph)", ratio: 0.44704 },
  { value: "kn", label: "Knots (kn)", ratio: 0.51444444 },
  { value: "mach", label: "Mach (mach)", ratio: 340.29 }, // Speed of sound in dry air at 15 °C
];

export default function SpeedConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("km/h");
  const [toUnit, setToUnit] = useState("mph");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // Main conversion
  const convertedValue = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const toRatio = UNITS.find((u) => u.value === toUnit)?.ratio || 1;
    const mps = numericValue * fromRatio;
    return mps / toRatio;
  }, [numericValue, fromUnit, toUnit]);

  // Comparison grid
  const allConversions = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    const mps = numericValue * fromRatio;
    return UNITS.map((unit) => {
      const val = mps / unit.ratio;
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

  // Real-world comparisons (mps based)
  const realWorldComparisons = useMemo(() => {
    const mps = numericValue * (UNITS.find((u) => u.value === fromUnit)?.ratio || 1);
    
    return [
      { name: "Human Walking Speed", value: 1.4, desc: "Roughly 1.4 m/s (5 km/h)" },
      { name: "Cheetah Sprint", value: 30, desc: "A top speed of about 30 m/s (108 km/h)" },
      { name: "Commercial Jetliner", value: 250, desc: "Cruising speed of ~250 m/s (900 km/h)" },
      { name: "Speed of Sound (Mach 1)", value: 340.29, desc: "Approx. 340 m/s at 15 °C" },
      { name: "Speed of Light", value: 299792458, desc: "The ultimate cosmic limit: 299,792,458 m/s" },
    ].map((item) => {
      const ratio = mps / item.value;
      let relation = "";
      if (ratio < 0.000001) {
        relation = "Infinitesimally fraction of";
      } else if (ratio < 0.01) {
        relation = `${(ratio * 100).toFixed(4)}% of`;
      } else if (ratio < 1) {
        relation = `${(ratio * 100).toFixed(1)}% of`;
      } else {
        relation = `${ratio.toFixed(2)}x faster than`;
      }
      return {
        ...item,
        relation,
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
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Gauge color="var(--primary)" /> Speed Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert velocity values between metric, imperial, maritime, and acoustic units instantly.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Speed & Velocity Calculator</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Input Value */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Speed Value</label>
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
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>All Velocity Equivalents</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            See the equivalent speed across all supported units of velocity:
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

      {/* Real-World Reference Panel */}
      {numericValue > 0 && (
        <div className="card" style={{ marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Real-World Comparisons</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            How fast is your input speed (<strong>{numericValue} {fromUnit}</strong>) compared to major velocities in the universe?
          </p>
          <div className="grid-3" style={{ gap: "1rem" }}>
            {realWorldComparisons.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1.25rem",
                  background: "#f8fafc",
                  borderRadius: "10px",
                  border: "1px solid var(--border-light)",
                }}
              >
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.25rem" }}>{item.name}</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>{item.desc}</p>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--primary)" }}>{item.relation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div className="prose">
        <h2>What are the standard units of speed?</h2>
        <p>
          Speed describes how fast an object changes position. Different systems measure speed in different contexts:
        </p>
        <ul>
          <li>
            <strong>Meters per second (m/s)</strong> is the standard SI unit of velocity in physics. It is the core unit used
            in mathematical calculations and engineering specs.
          </li>
          <li>
            <strong>Kilometers per hour (km/h)</strong> is the standard speed unit for road travel, vehicles, and speed limits
            in most countries that use the metric system.
          </li>
          <li>
            <strong>Miles per hour (mph)</strong> is the road travel equivalent used primarily in the United States and the United
            Kingdom.
          </li>
          <li>
            <strong>Knots (kn)</strong> is the nautical speed measurement unit, where 1 knot equals exactly 1 nautical mile per hour
            (approx. 1.852 km/h). It is the universal speed metric for marine navigation and aviation.
          </li>
          <li>
            <strong>Mach (M)</strong> is the acoustic speed measurement, representing multiples of the speed of sound. Since sound
            speed changes with air density, temperature, and pressure, the standard Mach calculation is calibrated at 15 °C at
            sea level (approx. 340.3 meters per second or 1225 km/h).
          </li>
        </ul>

        <h2>Understanding the speed of sound and speed of light</h2>
        <p>
          As objects approach extreme speeds, standard road units become difficult to use. Supersonic flight is measured in
          multiples of Mach (like Mach 2, which is twice the speed of sound). If you could travel at the speed of light, you could
          circle Earth 7.5 times in a single second. Our comparison card calculator scales your input values from a walking pace all
          the way to astronomical light speeds, giving you a practical appreciation of velocities.
        </p>
      </div>
    </div>
  );
}
