"use client";

import { useState, useMemo } from "react";
import { Timer, ArrowLeft, Copy, Check, Info } from "lucide-react";
import Link from "next/link";

type PaceUnit = "min/km" | "min/mile";

export default function PaceConverter() {
  const [paceMin, setPaceMin] = useState("5");
  const [paceSec, setPaceSec] = useState("30");
  const [unit, setUnit] = useState<PaceUnit>("min/km");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Convert inputs to numeric values safely
  const { min, sec, totalSecondsPerUnit } = useMemo(() => {
    const m = parseInt(paceMin) || 0;
    const s = parseInt(paceSec) || 0;
    const total = m * 60 + s;
    return { min: m, sec: s, totalSecondsPerUnit: total };
  }, [paceMin, paceSec]);

  // Convert pace to opposite unit
  const oppositePace = useMemo(() => {
    if (totalSecondsPerUnit <= 0) return { min: 0, sec: 0, formatted: "0:00", rawValue: "0:00" };

    const mileToKmRatio = 1.609344;
    let convertedSeconds = 0;

    if (unit === "min/km") {
      // Pace gets slower (more time per mile)
      convertedSeconds = totalSecondsPerUnit * mileToKmRatio;
    } else {
      // Pace gets faster (less time per km)
      convertedSeconds = totalSecondsPerUnit / mileToKmRatio;
    }

    const m = Math.floor(convertedSeconds / 60);
    const s = Math.round(convertedSeconds % 60);
    
    // Formatting: add leading zero to seconds if < 10
    const displaySec = s < 10 ? `0${s}` : `${s}`;
    const targetUnitLabel = unit === "min/km" ? "min/mile" : "min/km";

    return {
      min: m,
      sec: s,
      formatted: `${m}:${displaySec} ${targetUnitLabel}`,
      rawValue: `${m}:${displaySec}`,
    };
  }, [totalSecondsPerUnit, unit]);

  // Speeds in km/h and mph
  const speeds = useMemo(() => {
    if (totalSecondsPerUnit <= 0) return { kmh: 0, mph: 0 };

    let kmh = 0;
    let mph = 0;

    if (unit === "min/km") {
      // distance in 1 hour = 3600 seconds / totalSecondsPerUnit km
      kmh = 3600 / totalSecondsPerUnit;
      mph = kmh / 1.609344;
    } else {
      // distance in 1 hour = 3600 seconds / totalSecondsPerUnit miles
      mph = 3600 / totalSecondsPerUnit;
      kmh = mph * 1.609344;
    }

    return {
      kmh: parseFloat(kmh.toFixed(2)),
      mph: parseFloat(mph.toFixed(2)),
    };
  }, [totalSecondsPerUnit, unit]);

  // Format seconds to HH:MM:SS or MM:SS
  const formatDuration = (totalSeconds: number) => {
    if (totalSeconds <= 0 || isNaN(totalSeconds)) return "00:00";
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.round(totalSeconds % 60);

    const pad = (num: number) => (num < 10 ? `0${num}` : num);

    if (hrs > 0) {
      return `${hrs}:${pad(mins)}:${pad(secs)}`;
    }
    return `${mins}:${pad(secs)}`;
  };

  // Estimator for races
  const raceEstimates = useMemo(() => {
    if (totalSecondsPerUnit <= 0) {
      return [];
    }

    // Convert everything to seconds per km for easy multiplication
    const secondsPerKm = unit === "min/km" 
      ? totalSecondsPerUnit 
      : totalSecondsPerUnit / 1.609344;

    const races = [
      { name: "5K", distanceKm: 5, desc: "A short, fast road race distance" },
      { name: "10K", distanceKm: 10, desc: "Standard middle-distance road race" },
      { name: "Half Marathon", distanceKm: 21.0975, desc: "21.1 km / 13.1 miles" },
      { name: "Marathon", distanceKm: 42.195, desc: "42.2 km / 26.2 miles" },
    ];

    return races.map((race) => {
      const finishSeconds = secondsPerKm * race.distanceKm;
      
      // Calculate key milestone splits (every 5km for half/full, 1km/5km for others)
      const splits = [];
      const interval = race.distanceKm > 15 ? 5 : 1;
      
      for (let i = interval; i < race.distanceKm; i += interval) {
        splits.push({
          label: `${i}K`,
          time: formatDuration(secondsPerKm * i),
        });
      }
      
      // Add final distance split
      splits.push({
        label: "Finish",
        time: formatDuration(finishSeconds),
      });

      return {
        ...race,
        timeFormatted: formatDuration(finishSeconds),
        splits,
      };
    });
  }, [totalSecondsPerUnit, unit]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 1500);
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
          <Timer color="var(--primary)" /> Pace Converter & Estimator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Convert running paces between minutes/km and minutes/mile. View speed equivalents and estimate race finish times.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Input Panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Enter Running Pace</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Time Fields */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <div style={{ flex: 1 }}>
                <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  className="input-field"
                  value={paceMin}
                  onChange={(e) => setPaceMin(e.target.value)}
                  placeholder="Min"
                  style={{ fontSize: "1.1rem", fontFamily: "inherit" }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  className="input-field"
                  value={paceSec}
                  onChange={(e) => setPaceSec(e.target.value)}
                  placeholder="Sec"
                  style={{ fontSize: "1.1rem", fontFamily: "inherit" }}
                />
              </div>
            </div>

            {/* Unit Selector */}
            <div>
              <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Pace Unit</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  className={`btn ${unit === "min/km" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setUnit("min/km")}
                  style={{ flex: 1, padding: "0.6rem" }}
                >
                  Minutes per Kilometer (min/km)
                </button>
                <button
                  type="button"
                  className={`btn ${unit === "min/mile" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setUnit("min/mile")}
                  style={{ flex: 1, padding: "0.6rem" }}
                >
                  Minutes per Mile (min/mile)
                </button>
              </div>
            </div>

            {/* Quick Helper Text */}
            <div style={{ display: "flex", gap: "0.5rem", padding: "0.75rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid var(--border-light)" }}>
              <Info size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
              <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                You entered a pace of <strong>{min}:{sec < 10 ? `0${sec}` : sec} per {unit === "min/km" ? "kilometer" : "mile"}</strong>. 
                Below is how fast that translates and estimated finish times for major races.
              </p>
            </div>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", height: "100%", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Converted Paces & Speeds</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Opposite Pace */}
              <div style={{ padding: "0.85rem 1rem", background: "#f8fafc", border: "1px solid var(--border-light)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Equivalent Pace</span>
                  <strong style={{ fontSize: "1.25rem", color: "var(--primary)" }}>{oppositePace.formatted}</strong>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => copyToClipboard(oppositePace.rawValue, "opp")}
                  style={{ padding: "0.4rem 0.6rem", fontSize: "0.75rem" }}
                >
                  {copiedText === "opp" ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              {/* Speed equivalents */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ padding: "0.85rem 1rem", background: "#f8fafc", border: "1px solid var(--border-light)", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Metric Speed</span>
                  <strong style={{ fontSize: "1.2rem", color: "var(--text-main)" }}>{speeds.kmh} km/h</strong>
                </div>
                <div style={{ padding: "0.85rem 1rem", background: "#f8fafc", border: "1px solid var(--border-light)", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Imperial Speed</span>
                  <strong style={{ fontSize: "1.2rem", color: "var(--text-main)" }}>{speeds.mph} mph</strong>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1rem", padding: "1rem", background: "linear-gradient(135deg, var(--primary), #1d4ed8)", borderRadius: "10px", color: "white" }}>
            <p style={{ fontSize: "0.8rem", margin: "0 0 0.25rem 0", opacity: 0.85 }}>Marathon Goal</p>
            <p style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>
              {raceEstimates.find(r => r.name === "Marathon")?.timeFormatted || "0:00:00"}
            </p>
            <p style={{ fontSize: "0.75rem", margin: "0.25rem 0 0 0", opacity: 0.9 }}>
              Total estimated duration to finish 42.195 kilometers.
            </p>
          </div>
        </div>
      </div>

      {/* Race Finish Time Estimator */}
      {raceEstimates.length > 0 && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Race Finish Time & Splits Estimator</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            Here is a breakdown of how long it will take to complete various standard races at this pace, along with intermediate checkpoints:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {raceEstimates.map((race) => (
              <div
                key={race.name}
                style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: "10px",
                  padding: "1.25rem",
                  background: "#ffffff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <h4 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "var(--primary)" }}>{race.name}</h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{race.desc}</span>
                  </div>
                  
                  <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "8px", marginBottom: "1rem", textAlign: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Estimated Finish Time</span>
                    <strong style={{ fontSize: "1.4rem", color: "var(--text-main)" }}>{race.timeFormatted}</strong>
                  </div>

                  <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "0.4rem" }}>Estimated Splits:</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", maxHeight: "150px", overflowY: "auto", paddingRight: "0.25rem" }}>
                      {race.splits.map((split, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", borderBottom: "1px dashed #f1f5f9", paddingBottom: "0.15rem" }}>
                          <span style={{ color: "var(--text-muted)" }}>{split.label}</span>
                          <span style={{ fontWeight: 600 }}>{split.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                  <button
                    className="btn btn-outline"
                    onClick={() => copyToClipboard(`Estimated ${race.name} Finish Time: ${race.timeFormatted} (${min}:${sec < 10 ? `0${sec}` : sec} ${unit} pace)`, race.name)}
                    style={{ padding: "0.3rem 0.6rem", fontSize: "0.7rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                  >
                    {copiedText === race.name ? <Check size={12} /> : <Copy size={12} />} Copy Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div className="prose">
        <h2>How does running pace work?</h2>
        <p>
          Running pace is the inverse of speed. Instead of measuring how much distance you cover in a set amount of time (like kilometers or 
          miles per hour), pace measures how much time it takes to cover a set distance (minutes and seconds per kilometer or mile). 
          For runners, pace is the absolute language of training. It allows you to monitor your energy expenditure, plan intervals, 
          and stick to strict pacing strategies during a long road race without having to do quick mental math in the middle of a run.
        </p>

        <h2>Converting min/km to min/mile</h2>
        <p>
          Because standard racing tracks and running watches toggle between metric and imperial measurements, understanding both systems 
          is vital. One mile is exactly 1.609344 kilometers. Because a mile is longer, your pace per mile will always show a higher 
          time value than your pace per kilometer. For example, a comfortable 5:30 minutes/kilometer pace converts to roughly 8:51 minutes/mile. 
          This tool does that math dynamically, letting you convert instantly so you can read training plans written in either unit.
        </p>

        <h2>Estimating finish times for 5K, 10K, Half Marathon, and Marathon</h2>
        <p>
          Pacing is the secret behind a successful race. Going out too fast in the first few kilometers leads to lactic acid buildup and 
          the dreaded "wall" later on. Our race estimator helps you visualize your target timeline by calculating cumulative splits. 
          If you want to run a sub-4 hour Marathon, you need to maintain a steady pace of 5:41 per kilometer (9:09 per mile). 
          Using the split charts, you can memorize your target times for checkpoints like 10K, 20K, and the Half Marathon mark, 
          ensuring you stay on pace from start to finish.
        </p>
      </div>
    </div>
  );
}
