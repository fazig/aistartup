"use client";

import { useState, useMemo } from "react";
import { Zap, ArrowLeftRight, Copy, Check, ArrowLeft, Lightbulb } from "lucide-react";
import Link from "next/link";

interface Unit {
  value: string;
  label: string;
  ratio: number; // multiplier to convert from this unit to Watts (W)
  description: string;
}

const UNITS: Unit[] = [
  { value: "W", label: "Watt (W)", ratio: 1, description: "SI unit of power (1 Joule per second)" },
  { value: "kW", label: "Kilowatt (kW)", ratio: 1000, description: "Commonly used for engines and home appliances" },
  { value: "MW", label: "Megawatt (MW)", ratio: 1000000, description: "Used for power plants and large electric grids" },
  { value: "hp", label: "Mechanical Horsepower (hp)", ratio: 745.699872, description: "US/Imperial horsepower standard" },
  { value: "ps", label: "Metric Horsepower (ps / ch)", ratio: 735.49875, description: "European automotive horsepower standard" },
  { value: "BTU", label: "BTU/hour (BTU/hr)", ratio: 0.29307107, description: "Used for heating and air conditioning capacities" },
  { value: "cal_s", label: "Calorie per second (cal/s)", ratio: 4.184, description: "Thermal energy rate measurement" },
  { value: "ft_lb_s", label: "Foot-pound per second (ft-lb/s)", ratio: 1.355817948, description: "Imperial mechanical power unit" },
];

export default function PowerConverter() {
  const [inputValue, setInputValue] = useState("10");
  const [fromUnit, setFromUnit] = useState("kW");
  const [toUnit, setToUnit] = useState("hp");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // Convert to Watts as base
  const wattsValue = useMemo(() => {
    const fromRatio = UNITS.find((u) => u.value === fromUnit)?.ratio || 1;
    return numericValue * fromRatio;
  }, [numericValue, fromUnit]);

  // Main conversion result
  const convertedValue = useMemo(() => {
    const toRatio = UNITS.find((u) => u.value === toUnit)?.ratio || 1;
    return wattsValue / toRatio;
  }, [wattsValue, toUnit]);

  // Comparison grid
  const allConversions = useMemo(() => {
    return UNITS.map((unit) => {
      const val = wattsValue / unit.ratio;
      return {
        ...unit,
        valueFormatted: val.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 6,
        }),
        rawValue: val,
      };
    });
  }, [wattsValue]);

  // Real world equivalents scales
  const realWorldComparisons = useMemo(() => {
    return [
      {
        name: "Smartphone Chargers",
        desc: "Equivalent running smartphone fast-chargers (15W each)",
        value: wattsValue / 15,
        icon: "📱",
      },
      {
        name: "Household Hairdryers",
        desc: "Equivalent running professional hairdryers (1,500W each)",
        value: wattsValue / 1500,
        icon: "💨",
      },
      {
        name: "Standard Car Engines",
        desc: "Equivalent family sedan engines (approx. 150kW / 201hp each)",
        value: wattsValue / 150000,
        icon: "🚗",
      },
      {
        name: "Household Power Consumption",
        desc: "Equivalent homes powered at typical peak draw (5kW each)",
        value: wattsValue / 5000,
        icon: "🏠",
      },
    ];
  }, [wattsValue]);

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
          <Zap color="var(--primary)" /> Power Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert horsepower, kilowatts, megawatts, BTU/hr, and more. Compare real-world power scales dynamically.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Power Calculator</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Input Value */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Power Value</label>
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

        {/* Dynamic Real-world Comparison Card */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Lightbulb size={18} color="var(--primary)" /> Real-World Scale Comparisons
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            Wondering what {numericValue} {fromUnit} is equivalent to? Here is how that energy compares in everyday life:
          </p>

          <div className="grid-2" style={{ gap: "0.75rem" }}>
            {realWorldComparisons.map((comp) => {
              const displayVal = comp.value < 0.01 
                ? comp.value.toExponential(3) 
                : comp.value.toLocaleString("en-US", { maximumFractionDigits: 2 });
              
              return (
                <div
                  key={comp.name}
                  style={{
                    padding: "1rem",
                    background: "#f8fafc",
                    border: "1px solid var(--border-light)",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "1.5rem", marginBottom: "0.5rem", display: "block" }}>{comp.icon}</span>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}>{comp.name}</h4>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.25" }}>
                      {comp.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: "1rem", fontSize: "1.3rem", fontWeight: 800, color: "var(--primary)" }}>
                    {displayVal}x
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of all equivalents */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Equivalents Table</h3>
        <div className="grid-3" style={{ gap: "0.75rem" }}>
          {allConversions.map((unit) => (
            <div
              key={unit.value}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 1rem",
                background: "#f8fafc",
                border: "1px solid var(--border-light)",
                borderRadius: "8px",
              }}
            >
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0 0 0.15rem 0" }}>{unit.label}</p>
                <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", margin: 0, wordBreak: "break-all" }}>
                  {unit.valueFormatted} <span style={{ fontSize: "0.8rem", fontWeight: 400 }}>{unit.value}</span>
                </p>
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
                {copiedIndex === unit.value ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is power and how is it calculated?</h2>
        <p>
          In physics, power is defined as the rate at which work is done or energy is transferred over time. While energy tells us 
          how much total work can be done, power tells us how fast that work gets completed. The standard equation is 
          <em> P = W/t</em> (Power = Work / Time). In practical terms, a high-power machine can perform the same action as a low-power 
          machine, but in a fraction of the time.
        </p>

        <h2>Understanding the metric and imperial scales</h2>
        <p>
          The standard SI unit of power is the <strong>Watt (W)</strong>, named in honor of James Watt. One watt equals one Joule of energy 
          expended per second. For electric grids and home appliances, we regularly use <strong>Kilowatts (kW)</strong> or <strong>Megawatts (MW)</strong>. 
          When we look at engines, we often talk about <strong>Horsepower (hp)</strong>. However, there are two common definitions: mechanical 
          horsepower (mostly used in the US and UK, about 745.7 watts) and metric horsepower (used in Continental Europe, about 735.5 watts). 
          These two scales emerged from slightly different ways of measuring how much force a horse could lift over a set duration.
        </p>

        <h2>Thermodynamic power: BTU and Calories</h2>
        <p>
          When you purchase an air conditioner or a heater, you will notice the output rating is written in <strong>BTU/hr (British Thermal Units per 
          hour)</strong>. This measures how much thermal energy the appliance can move. Similarly, <strong>Calories per second (cal/s)</strong> measures 
          thermal power in metric terms. Converting between these units allows you to compare the mechanical performance of an engine, 
          the electrical draw of a heater, and the raw thermal capacity of a cooling unit side-by-side.
        </p>
      </div>
    </div>
  );
}
