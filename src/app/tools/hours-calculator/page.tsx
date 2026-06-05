"use client";

import { useState, useMemo } from "react";
import { Clock, Copy, Check, ArrowLeft, Calendar, Trash2 } from "lucide-react";
import Link from "next/link";

type CalcMode = "simple" | "timesheet";

interface DailyShift {
  dayName: string;
  active: boolean;
  start: string;
  end: string;
  breakMins: string;
}

const DEFAULT_SHIFTS: DailyShift[] = [
  { dayName: "Monday", active: true, start: "09:00", end: "17:00", breakMins: "30" },
  { dayName: "Tuesday", active: true, start: "09:00", end: "17:00", breakMins: "30" },
  { dayName: "Wednesday", active: true, start: "09:00", end: "17:00", breakMins: "30" },
  { dayName: "Thursday", active: true, start: "09:00", end: "17:00", breakMins: "30" },
  { dayName: "Friday", active: true, start: "09:00", end: "17:00", breakMins: "30" },
  { dayName: "Saturday", active: false, start: "09:00", end: "17:00", breakMins: "0" },
  { dayName: "Sunday", active: false, start: "09:00", end: "17:00", breakMins: "0" },
];

export default function HoursCalculator() {
  const [mode, setMode] = useState<CalcMode>("simple");
  
  // Simple Mode Inputs
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:30");
  const [simpleBreak, setSimpleBreak] = useState("30"); // break in minutes

  // Timesheet Mode Inputs
  const [shifts, setShifts] = useState<DailyShift[]>(DEFAULT_SHIFTS);
  const [hourlyRate, setHourlyRate] = useState("20");

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Simple Mode calculation
  const simpleResults = useMemo(() => {
    if (mode !== "simple") return null;

    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    const brk = parseInt(simpleBreak, 10) || 0;

    if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return null;

    let startMins = sh * 60 + sm;
    let endMins = eh * 60 + em;

    // Handle crossing midnight
    if (endMins < startMins) {
      endMins += 24 * 60; // add a full day
    }

    let netMins = endMins - startMins - brk;
    if (netMins < 0) netMins = 0;

    const hours = Math.floor(netMins / 60);
    const mins = netMins % 60;
    const decimalHours = netMins / 60;

    return {
      hours,
      mins,
      decimalHours,
    };
  }, [mode, startTime, endTime, simpleBreak]);

  // Timesheet calculations
  const timesheetResults = useMemo(() => {
    if (mode !== "timesheet") return null;

    let totalMins = 0;
    const rate = parseFloat(hourlyRate) || 0;

    const computedShifts = shifts.map((s) => {
      if (!s.active) return { ...s, totalHours: 0 };
      
      const [sh, sm] = s.start.split(":").map(Number);
      const [eh, em] = s.end.split(":").map(Number);
      const brk = parseInt(s.breakMins, 10) || 0;

      if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) {
        return { ...s, totalHours: 0 };
      }

      let startMins = sh * 60 + sm;
      let endMins = eh * 60 + em;

      if (endMins < startMins) {
        endMins += 24 * 60;
      }

      let netMins = endMins - startMins - brk;
      if (netMins < 0) netMins = 0;

      totalMins += netMins;

      return {
        ...s,
        totalHours: netMins / 60,
      };
    });

    const totalHours = totalMins / 60;
    const totalPay = totalHours * rate;

    return {
      shifts: computedShifts,
      totalHours,
      totalPay,
    };
  }, [mode, shifts, hourlyRate]);

  const updateShift = (index: number, key: keyof DailyShift, val: any) => {
    setShifts((prev) =>
      prev.map((s, idx) => (idx === index ? { ...s, [key]: val } : s))
    );
  };

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
          <Clock color="var(--primary)" /> Hours Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Calculate elapsed time between hours, or compute weekly timesheets and wages instantly.
        </p>
      </div>

      {/* Mode switcher */}
      <div style={{ display: "flex", border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", marginBottom: "1.5rem", maxWidth: "400px" }}>
        <button
          onClick={() => setMode("simple")}
          style={{
            flex: 1,
            padding: "0.7rem 0.5rem",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.85rem",
            background: mode === "simple" ? "var(--primary)" : "transparent",
            color: mode === "simple" ? "white" : "var(--text-muted)",
          }}
        >
          Time Difference
        </button>
        <button
          onClick={() => setMode("timesheet")}
          style={{
            flex: 1,
            padding: "0.7rem 0.5rem",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.85rem",
            background: mode === "timesheet" ? "var(--primary)" : "transparent",
            color: mode === "timesheet" ? "white" : "var(--text-muted)",
          }}
        >
          Weekly Timesheet
        </button>
      </div>

      {/* Mode 1 Layout */}
      {mode === "simple" && (
        <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Time Inputs</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Start Time</label>
                <input
                  type="time"
                  className="input-field"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={{ fontFamily: "inherit", fontSize: "1.1rem" }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>End Time</label>
                <input
                  type="time"
                  className="input-field"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  style={{ fontFamily: "inherit", fontSize: "1.1rem" }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Deduct Break (Minutes)</label>
                <input
                  type="number"
                  className="input-field"
                  value={simpleBreak}
                  onChange={(e) => setSimpleBreak(e.target.value)}
                  placeholder="30"
                />
              </div>
            </div>
          </div>

          {simpleResults && (
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Calculated Duration</h3>
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
                  <span style={{ fontSize: "0.85rem", opacity: 0.85, display: "block" }}>Total Hours</span>
                  <span style={{ fontWeight: 800, fontSize: "2rem" }}>
                    {simpleResults.hours}h {simpleResults.mins}m
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(`${simpleResults.hours}h ${simpleResults.mins}m`, "simple-duration")}
                  style={{ background: "rgba(255,255,255,0.2)", border: "none", padding: "0.5rem", borderRadius: "8px", color: "white", cursor: "pointer" }}
                >
                  {copiedKey === "simple-duration" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Decimal Hours:</span>
                <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>{simpleResults.decimalHours.toFixed(2)} hours</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2 Layout (Timesheet) */}
      {mode === "timesheet" && timesheetResults && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
          {/* Main Grid table for days */}
          <div className="card" style={{ overflowX: "auto" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Weekly Hours Log</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-light)", textAlign: "left", color: "var(--text-muted)" }}>
                  <th style={{ padding: "0.75rem 0.5rem", width: "40px" }}>Active</th>
                  <th style={{ padding: "0.75rem 0.5rem" }}>Day</th>
                  <th style={{ padding: "0.75rem 0.5rem" }}>Start Time</th>
                  <th style={{ padding: "0.75rem 0.5rem" }}>End Time</th>
                  <th style={{ padding: "0.75rem 0.5rem", width: "110px" }}>Break (mins)</th>
                  <th style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>Daily Hours</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((s, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-light)", opacity: s.active ? 1 : 0.6 }}>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <input
                        type="checkbox"
                        checked={s.active}
                        onChange={(e) => updateShift(idx, "active", e.target.checked)}
                        style={{ width: "1.1rem", height: "1.1rem", cursor: "pointer", accentColor: "var(--primary)" }}
                      />
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem", fontWeight: 600 }}>{s.dayName}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <input
                        type="time"
                        className="input-field"
                        value={s.start}
                        disabled={!s.active}
                        onChange={(e) => updateShift(idx, "start", e.target.value)}
                        style={{ padding: "0.3rem 0.5rem", maxWidth: "120px" }}
                      />
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <input
                        type="time"
                        className="input-field"
                        value={s.end}
                        disabled={!s.active}
                        onChange={(e) => updateShift(idx, "end", e.target.value)}
                        style={{ padding: "0.3rem 0.5rem", maxWidth: "120px" }}
                      />
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <input
                        type="number"
                        className="input-field"
                        value={s.breakMins}
                        disabled={!s.active}
                        onChange={(e) => updateShift(idx, "breakMins", e.target.value)}
                        style={{ padding: "0.3rem 0.5rem" }}
                      />
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem", textAlign: "right", fontWeight: 700 }}>
                      {s.active ? `${timesheetResults.shifts[idx].totalHours.toFixed(2)}h` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Wage / Total Panel */}
          <div className="grid-2" style={{ gap: "1.5rem", alignItems: "stretch" }}>
            {/* Rates */}
            <div className="card">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Hourly Wages Rate</h3>
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Hourly Pay Rate ($)</label>
                <input
                  type="number"
                  className="input-field"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="20"
                  style={{ fontSize: "1.1rem" }}
                />
              </div>
            </div>

            {/* Calculations results */}
            <div className="card" style={{ display: "flex", flexDirection: "column", justifySelf: "stretch", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.75rem" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>Total Weekly Hours</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>{timesheetResults.totalHours.toFixed(2)} hours</span>
                </div>
                <button
                  onClick={() => copyToClipboard(timesheetResults.totalHours.toFixed(2), "total-hours")}
                  style={{ background: "none", border: "none", color: copiedKey === "total-hours" ? "#16a34a" : "var(--text-muted)", cursor: "pointer" }}
                >
                  {copiedKey === "total-hours" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "linear-gradient(135deg, var(--primary), #1d4ed8)",
                  borderRadius: "10px",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.85rem", opacity: 0.85, display: "block" }}>Estimated Gross Pay</span>
                  <span style={{ fontWeight: 800, fontSize: "1.8rem" }}>
                    ${timesheetResults.totalPay.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(timesheetResults.totalPay.toFixed(2), "total-pay")}
                  style={{ background: "rgba(255,255,255,0.2)", border: "none", padding: "0.4rem", borderRadius: "6px", color: "white", cursor: "pointer" }}
                >
                  {copiedKey === "total-pay" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div className="prose">
        <h2>How this hours calculator helps you</h2>
        <p>
          Managing schedules and tracking payroll hours can get complex, especially when working shifts with varying break
          durations. This calculator handles the math for you:
        </p>
        <ul>
          <li>
            <strong>Simple Mode (Time difference)</strong>: Easily find out how many hours and minutes occur between two times
            (e.g., 9:00 AM to 5:30 PM minus a 30-minute lunch break is exactly 8 hours). It handles crossing midnight automatically if
            your shift goes into the next day.
          </li>
          <li>
            <strong>Timesheet Mode</strong>: Log start and end times for all days of the week, input lunch break subtractions for
            each shift, and calculate the total weekly hours instantly. Add your hourly pay rate to calculate your estimated gross wages
            for easy invoicing and timesheet verification.
          </li>
        </ul>
      </div>
    </div>
  );
}
