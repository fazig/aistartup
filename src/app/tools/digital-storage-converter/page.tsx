"use client";

import { useState, useMemo } from "react";
import { HardDrive, Copy, Check, ArrowRightLeft } from "lucide-react";

interface UnitDef {
  value: string;
  label: string;
  factor10: number; // power of 1000
  factor2: number;  // power of 1024
  isBit?: boolean;  // is it bit instead of byte
}

const STORAGE_UNITS: UnitDef[] = [
  { value: "b", label: "Bits (b)", factor10: 1, factor2: 1, isBit: true },
  { value: "B", label: "Bytes (B)", factor10: 1, factor2: 1 },
  { value: "KB", label: "Kilobytes (KB / KiB)", factor10: 1000, factor2: 1024 },
  { value: "MB", label: "Megabytes (MB / MiB)", factor10: Math.pow(1000, 2), factor2: Math.pow(1024, 2) },
  { value: "GB", label: "Gigabytes (GB / GiB)", factor10: Math.pow(1000, 3), factor2: Math.pow(1024, 3) },
  { value: "TB", label: "Terabytes (TB / TiB)", factor10: Math.pow(1000, 4), factor2: Math.pow(1024, 4) },
  { value: "PB", label: "Petabytes (PB / PiB)", factor10: Math.pow(1000, 5), factor2: Math.pow(1024, 5) },
];

export default function DigitalStorageConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("GB");
  const [toUnit, setToUnit] = useState("MB");
  const [baseMode, setBaseMode] = useState<"10" | "2">("2"); // default is base-2 (1024)
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const numericValue = useMemo(() => {
    const parsed = parseFloat(inputValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  // Convert input value to standard bytes
  const valueInBytes = useMemo(() => {
    const unit = STORAGE_UNITS.find((u) => u.value === fromUnit);
    if (!unit) return 0;

    const factor = baseMode === "10" ? unit.factor10 : unit.factor2;
    if (unit.isBit) {
      return numericValue / 8;
    }
    return numericValue * factor;
  }, [numericValue, fromUnit, baseMode]);

  // Calculate specific target conversion
  const convertedValue = useMemo(() => {
    const targetUnit = STORAGE_UNITS.find((u) => u.value === toUnit);
    if (!targetUnit) return 0;

    const factor = baseMode === "10" ? targetUnit.factor10 : targetUnit.factor2;
    if (targetUnit.isBit) {
      return valueInBytes * 8;
    }
    return valueInBytes / factor;
  }, [valueInBytes, toUnit, baseMode]);

  // All conversions table
  const allConversions = useMemo(() => {
    return STORAGE_UNITS.map((unit) => {
      const factor = baseMode === "10" ? unit.factor10 : unit.factor2;
      const rawVal = unit.isBit ? valueInBytes * 8 : valueInBytes / factor;
      
      return {
        ...unit,
        valueFormatted: rawVal.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 6,
        }),
        rawValue: rawVal,
      };
    });
  }, [valueInBytes, baseMode]);

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
          <HardDrive color="var(--primary)" /> Digital Storage Converter
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert between bits, bytes, KB, MB, GB, TB, and PB. Compare Decimal (1000) vs Binary (1024) formats instantly.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Converter Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Storage Calculator</h3>

          {/* Base selector */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Calculation Standard:
            </label>
            <div style={{ display: "flex", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-light)", maxWidth: "320px" }}>
              <button
                onClick={() => setBaseMode("2")}
                style={{
                  flex: 1,
                  padding: "0.6rem 0.75rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  background: baseMode === "2" ? "var(--primary)" : "transparent",
                  color: baseMode === "2" ? "white" : "var(--text-main)",
                  transition: "all 0.2s",
                }}
              >
                Binary (1 KB = 1024 B)
              </button>
              <button
                onClick={() => setBaseMode("10")}
                style={{
                  flex: 1,
                  padding: "0.6rem 0.75rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  background: baseMode === "10" ? "var(--primary)" : "transparent",
                  color: baseMode === "10" ? "white" : "var(--text-main)",
                  transition: "all 0.2s",
                }}
              >
                Decimal (1 KB = 1000 B)
              </button>
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Input Value */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Enter Data Value</label>
              <input
                type="number"
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. 50"
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
                  {STORAGE_UNITS.map((u) => (
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
                  {STORAGE_UNITS.map((u) => (
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
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Equivalents List</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            See the equivalent capacity across all sizes using standard{" "}
            <strong>
              {baseMode === "2" ? "Binary (1024)" : "Decimal (1000)"}
            </strong>{" "}
            base:
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
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {unit.value} {baseMode === "2" && unit.value !== "b" && unit.value !== "B" ? `(${unit.value.replace("B", "iB")})` : ""}
                  </span>
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
        <h2>KB vs. KiB: What is the difference and why does it matter?</h2>
        <p>
          Have you ever bought a 1 Terabyte (1 TB) external hard drive, plugged it into your Windows PC, and felt cheated
          when Windows reported only 931 GB of space?
        </p>
        <p>
          You weren&apos;t scammed. It is a conflict of standard definitions:
        </p>
        <ul>
          <li>
            <strong>Decimal Standard (Base 10)</strong>: Hardware manufacturers (like Seagate, Western Digital, and Apple) define
            storage using decimal standards. Under this definition, 1 Kilobyte is exactly 1,000 bytes, 1 Megabyte is 1,000,000
            bytes, and 1 Gigabyte is 1,000,000,000 bytes. It aligns with the metric system prefix rule.
          </li>
          <li>
            <strong>Binary Standard (Base 2)</strong>: Operating systems (like Microsoft Windows) historically measure memory
            capacity using binary standards because computer circuits operate on 0s and 1s. Under this, 1 Kilobyte is 1,024 bytes (2^10),
            1 Megabyte is 1,048,576 bytes (2^20), and 1 Gigabyte is 1,073,741,824 bytes (2^30).
          </li>
        </ul>
        <p>
          To clear up this confusion, the IEC (International Electrotechnical Commission) introduced the binary prefixes:
          Kibibyte (KiB = 1024), Mebibyte (MiB = 1,048,576), Gibibyte (GiB), and Tebibyte (TiB). While macOS and Linux have
          updated their file systems to display metric decimal standards, Windows still uses binary measurements but calls them
          "KB" and "GB".
        </p>

        <h2>Standard conversion table references</h2>
        <p>
          This digital storage converter lets you easily switch between both systems. Just use the toggle buttons at the top
          to switch calculations instantly from Base 2 (1024) to Base 10 (1000) and compare the difference.
        </p>
      </div>
    </div>
  );
}
