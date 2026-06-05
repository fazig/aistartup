"use client";

import { useState, useMemo } from "react";
import { Calendar, Copy, Check, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

type CalcMode = "between" | "add-sub";

export default function DaysCalculator() {
  const [mode, setMode] = useState<CalcMode>("between");
  
  // Date-Between Inputs
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30); // 30 days from now
    return d.toISOString().split("T")[0];
  });
  const [includeEndDay, setIncludeEndDay] = useState(false);

  // Add-Subtract Inputs
  const [baseDate, setBaseDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [daysCount, setDaysCount] = useState("30");
  const [dateAction, setDateAction] = useState<"add" | "sub">("add");

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Mode 1 calculations
  const durationResults = useMemo(() => {
    if (mode !== "between") return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    // Millisecond difference
    let diffMs = end.getTime() - start.getTime();
    const isPast = diffMs < 0;
    diffMs = Math.abs(diffMs);

    const msPerDay = 1000 * 60 * 60 * 24;
    let days = Math.floor(diffMs / msPerDay);

    if (includeEndDay) {
      days += 1;
    }

    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    // Approximate breakdown (taking 30.44 days per month and 365.25 days per year)
    const years = Math.floor(days / 365.25);
    const remainingAfterYears = days % 365.25;
    const months = Math.floor(remainingAfterYears / 30.44);
    const finalDays = Math.round(remainingAfterYears % 30.44);

    return {
      totalDays: days,
      weeks,
      remainingDays,
      years,
      months,
      finalDays,
      isPast,
      hours: days * 24,
    };
  }, [mode, startDate, endDate, includeEndDay]);

  // Mode 2 calculations
  const addSubResults = useMemo(() => {
    if (mode !== "add-sub") return null;

    const start = new Date(baseDate);
    const count = parseInt(daysCount, 10);

    if (isNaN(start.getTime()) || isNaN(count)) return null;

    const targetDate = new Date(start);
    if (dateAction === "add") {
      targetDate.setDate(targetDate.getDate() + count);
    } else {
      targetDate.setDate(targetDate.getDate() - count);
    }

    return {
      formatted: targetDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      iso: targetDate.toISOString().split("T")[0],
    };
  }, [mode, baseDate, daysCount, dateAction]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
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
          <Calendar color="var(--primary)" /> Days & Date Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Calculate the number of days between two dates, or add/subtract days to find a future or past date.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Left Input Control */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Options</h3>

          {/* Mode Switch */}
          <div style={{ display: "flex", border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", marginBottom: "1.5rem" }}>
            <button
              onClick={() => setMode("between")}
              style={{
                flex: 1,
                padding: "0.7rem 0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
                background: mode === "between" ? "var(--primary)" : "transparent",
                color: mode === "between" ? "white" : "var(--text-muted)",
              }}
            >
              Days Between Dates
            </button>
            <button
              onClick={() => setMode("add-sub")}
              style={{
                flex: 1,
                padding: "0.7rem 0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
                background: mode === "add-sub" ? "var(--primary)" : "transparent",
                color: mode === "add-sub" ? "white" : "var(--text-muted)",
              }}
            >
              Add / Subtract Days
            </button>
          </div>

          {/* Mode 1 fields */}
          {mode === "between" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Start Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ fontFamily: "inherit" }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>End Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{ fontFamily: "inherit" }}
                />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.95rem" }}>
                <input
                  type="checkbox"
                  checked={includeEndDay}
                  onChange={(e) => setIncludeEndDay(e.target.checked)}
                  style={{ accentColor: "var(--primary)" }}
                />
                Include end day (adds 1 day)
              </label>
            </div>
          )}

          {/* Mode 2 fields */}
          {mode === "add-sub" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Base Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  style={{ fontFamily: "inherit" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Number of Days</label>
                  <input
                    type="number"
                    className="input-field"
                    value={daysCount}
                    onChange={(e) => setDaysCount(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <select
                  className="input-field"
                  value={dateAction}
                  onChange={(e) => setDateAction(e.target.value as "add" | "sub")}
                  style={{ cursor: "pointer", maxWidth: "120px" }}
                >
                  <option value="add">Add</option>
                  <option value="sub">Subtract</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Right Output Panel */}
        <div>
          {/* Mode 1 Outputs */}
          {mode === "between" && durationResults && (
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div
                style={{
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
                  <p style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.25rem" }}>Duration Total</p>
                  <p style={{ fontSize: "2.2rem", fontWeight: 800 }}>
                    {durationResults.totalDays.toLocaleString()} Day{durationResults.totalDays !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(durationResults.totalDays.toString(), "duration")}
                  style={{ background: "rgba(255,255,255,0.2)", border: "none", padding: "0.5rem", borderRadius: "8px", color: "white", cursor: "pointer" }}
                >
                  {copiedKey === "duration" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Grid detail stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Weeks & Days:</span>
                  <span style={{ fontWeight: 600 }}>
                    {durationResults.weeks} week{durationResults.weeks !== 1 ? "s" : ""}, {durationResults.remainingDays} day{durationResults.remainingDays !== 1 ? "s" : ""}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Years & Months breakdown:</span>
                  <span style={{ fontWeight: 600 }}>
                    {durationResults.years} year{durationResults.years !== 1 ? "s" : ""}, {durationResults.months} month{durationResults.months !== 1 ? "s" : ""}, {durationResults.finalDays} day{durationResults.finalDays !== 1 ? "s" : ""}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Hours total:</span>
                  <span style={{ fontWeight: 600 }}>{durationResults.hours.toLocaleString()} hours</span>
                </div>
              </div>
            </div>
          )}

          {/* Mode 2 Outputs */}
          {mode === "add-sub" && addSubResults && (
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div
                style={{
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
                  <p style={{ fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.25rem" }}>Calculated Date</p>
                  <p style={{ fontSize: "1.4rem", fontWeight: 800 }}>
                    {addSubResults.formatted}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(addSubResults.formatted, "add-sub-date")}
                  style={{ background: "rgba(255,255,255,0.2)", border: "none", padding: "0.5rem", borderRadius: "8px", color: "white", cursor: "pointer" }}
                >
                  {copiedKey === "add-sub-date" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                ISO Format: <code style={{ fontFamily: "monospace" }}>{addSubResults.iso}</code>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>How date calculators work and why they are useful</h2>
        <p>
          Date math is notoriously difficult to calculate in your head because of irregular calendar components. Months vary in
          length, leap years introduce a 366th day every four years, and timezone differences can slip dates backward.
        </p>
        <p>
          This calculator simplifies date math into two simple modes:
        </p>
        <ul>
          <li>
            <strong>Duration Solver</strong>: Enter two dates to calculate the exact number of days, weeks, months, or years
            separating them. This is highly useful for managing project timelines, measuring employee tenure, or tracking how
            long ago a historical milestone took place.
          </li>
          <li>
            <strong>Date Adjuster</strong>: Add or subtract a specific number of days from any date to find the target date. It is
            essential for calculating contract expiration dates, invoice payment deadlines, or planning travel schedules.
          </li>
        </ul>
      </div>
    </div>
  );
}
