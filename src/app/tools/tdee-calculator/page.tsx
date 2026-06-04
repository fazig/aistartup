"use client";

import { useState, useMemo } from "react";
import { Scale, Copy, Check, ArrowLeft, Info, HelpCircle } from "lucide-react";
import Link from "next/link";

type Gender = "male" | "female";
type UnitSystem = "metric" | "imperial";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "extreme";

export default function TDEECalculator() {
  // Input states
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<Gender>("male");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [weightKg, setWeightKg] = useState<string>("80");
  const [weightLbs, setWeightLbs] = useState<string>("176");
  const [heightCm, setHeightCm] = useState<string>("180");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("11");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [bodyFat, setBodyFat] = useState<string>("");

  // Macro Split builder states
  const [carbPct, setCarbPct] = useState<number>(40);
  const [proteinPct, setProteinPct] = useState<number>(30);
  const [fatPct, setFatPct] = useState<number>(30);

  const [copied, setCopied] = useState(false);

  // Conversion helpers
  const weight = useMemo(() => {
    if (unitSystem === "metric") {
      return parseFloat(weightKg) || 0;
    } else {
      const lbs = parseFloat(weightLbs) || 0;
      return lbs * 0.45359237; // to kg
    }
  }, [unitSystem, weightKg, weightLbs]);

  const height = useMemo(() => {
    if (unitSystem === "metric") {
      return parseFloat(heightCm) || 0;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      return (ft * 12 + inch) * 2.54; // to cm
    }
  }, [unitSystem, heightCm, heightFt, heightIn]);

  // Main TDEE & BMR Calculation
  const results = useMemo(() => {
    const ageNum = parseInt(age) || 0;
    if (!weight || !height || !ageNum) return null;

    let bmr = 0;
    const bodyFatNum = parseFloat(bodyFat);
    const hasBodyFat = !isNaN(bodyFatNum) && bodyFatNum > 0 && bodyFatNum < 100;

    // 1. BMR Calculation (Katch-McArdle vs Mifflin-St Jeor)
    let formulaUsed = "Mifflin-St Jeor";
    if (hasBodyFat) {
      formulaUsed = "Katch-McArdle";
      const lbm = weight * (1 - bodyFatNum / 100);
      bmr = 370 + 21.6 * lbm;
    } else {
      if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * ageNum + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * ageNum - 161;
      }
    }

    // 2. Activity Multiplier
    const multipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extreme: 1.9,
    };
    const multiplier = multipliers[activity];
    const tdee = bmr * multiplier;

    // 3. BMI Score
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let bmiCategory = "";
    if (bmi < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmi < 25) {
      bmiCategory = "Normal weight";
    } else if (bmi < 30) {
      bmiCategory = "Overweight";
    } else {
      bmiCategory = "Obese";
    }

    // 4. Ideal Body Weight (Devine & Robinson formulas)
    // Formula works for heights over 5 feet (60 inches / 152.4 cm)
    const heightInInches = height / 2.54;
    const inchesOver60 = Math.max(0, heightInInches - 60);

    let devineIbw = 0;
    let robinsonIbw = 0;

    if (gender === "male") {
      devineIbw = 50 + 2.3 * inchesOver60;
      robinsonIbw = 52 + 1.9 * inchesOver60;
    } else {
      devineIbw = 45.5 + 2.3 * inchesOver60;
      robinsonIbw = 49 + 1.7 * inchesOver60;
    }

    return {
      bmr,
      tdee,
      bmi,
      bmiCategory,
      devineIbw,
      robinsonIbw,
      formulaUsed,
    };
  }, [age, gender, weight, height, activity, bodyFat]);

  // Live Macro calculations based on sliders
  const liveMacros = useMemo(() => {
    if (!results) return null;
    const tdee = results.tdee;

    const carbsCal = tdee * (carbPct / 100);
    const proteinCal = tdee * (proteinPct / 100);
    const fatCal = tdee * (fatPct / 100);

    return {
      carbsG: Math.max(0, Math.round(carbsCal / 4)),
      proteinG: Math.max(0, Math.round(proteinCal / 4)),
      fatG: Math.max(0, Math.round(fatCal / 9)),
      carbsCal: Math.max(0, Math.round(carbsCal)),
      proteinCal: Math.max(0, Math.round(proteinCal)),
      fatCal: Math.max(0, Math.round(fatCal)),
      totalPct: carbPct + proteinPct + fatPct,
    };
  }, [results, carbPct, proteinPct, fatPct]);

  // Snap to preset splits
  const applyPreset = (c: number, p: number, f: number) => {
    setCarbPct(c);
    setProteinPct(p);
    setFatPct(f);
  };

  const handleCopy = () => {
    if (!results || !liveMacros) return;
    const text = `--- TDEE CALCULATOR RESULTS ---
Inputs:
- Age: ${age} years
- Gender: ${gender}
- Weight: ${unitSystem === "metric" ? weightKg + " kg" : weightLbs + " lbs"}
- Height: ${unitSystem === "metric" ? heightCm + " cm" : `${heightFt} ft ${heightIn} in`}
- Activity Level: ${activity}
- Body Fat: ${bodyFat ? bodyFat + "%" : "Not Provided"}

Calculated Basal Metabolic Rate (BMR): ${Math.round(results.bmr)} kcal/day (${results.formulaUsed})
Total Daily Energy Expenditure (TDEE): ${Math.round(results.tdee)} kcal/day

Health Metrics:
- BMI: ${results.bmi.toFixed(1)} (${results.bmiCategory})
- Ideal Body Weight:
  * Devine Formula: ${Math.round(results.devineIbw)} kg (${Math.round(results.devineIbw * 2.20462)} lbs)
  * Robinson Formula: ${Math.round(results.robinsonIbw)} kg (${Math.round(results.robinsonIbw * 2.20462)} lbs)

Macronutrient Split (${carbPct}% Carbs / ${proteinPct}% Protein / ${fatPct}% Fat):
- Carbohydrates: ${liveMacros.carbsG}g (${liveMacros.carbsCal} kcal)
- Protein: ${liveMacros.proteinG}g (${liveMacros.proteinCal} kcal)
- Fats: ${liveMacros.fatG}g (${liveMacros.fatCal} kcal)
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem", maxWidth: "1200px" }}>
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
          border: "1px solid var(--border-light)",
          borderRadius: "8px",
          color: "var(--text-main)",
          textDecoration: "none",
        }}
      >
        <ArrowLeft size={16} /> Back to Free Sumo Tools
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", fontSize: "2.25rem", fontWeight: 800 }}>
          <Scale color="var(--primary)" size={32} /> TDEE Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
          Find your Total Daily Energy Expenditure (TDEE) using Mifflin-St Jeor or Katch-McArdle formulas. Check your BMI, estimate ideal body weight, and design a custom macronutrient plan.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid-2" style={{ gap: "2rem", alignItems: "start", marginBottom: "3rem" }}>
        {/* Left Hand: Input Stats Card */}
        <div className="card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, borderBottom: "1px solid var(--border-light)", paddingBottom: "0.75rem", margin: 0 }}>
            Physique & Activity
          </h2>

          {/* Unit Toggle */}
          <div>
            <label className="input-label" style={{ marginBottom: "0.5rem", display: "block" }}>Unit System</label>
            <div style={{ display: "flex", background: "var(--bg-main)", borderRadius: "8px", padding: "0.25rem", border: "1px solid var(--border-light)" }}>
              <button
                type="button"
                onClick={() => setUnitSystem("metric")}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  background: unitSystem === "metric" ? "var(--primary)" : "transparent",
                  color: unitSystem === "metric" ? "white" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                }}
              >
                Metric (kg/cm)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem("imperial")}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  background: unitSystem === "imperial" ? "var(--primary)" : "transparent",
                  color: unitSystem === "imperial" ? "white" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                }}
              >
                Imperial (lbs/ft-in)
              </button>
            </div>
          </div>

          {/* Age & Gender Row */}
          <div className="grid-2" style={{ gap: "1.25rem" }}>
            <div>
              <label className="input-label">Age (years)</label>
              <input
                type="number"
                className="input-field"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="120"
                placeholder="30"
              />
            </div>
            <div>
              <label className="input-label" style={{ display: "block", marginBottom: "0.5rem" }}>Gender</label>
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.25rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    style={{ accentColor: "var(--primary)" }}
                  />
                  <span>Male</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    style={{ accentColor: "var(--primary)" }}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* Height and Weight Row */}
          <div className="grid-2" style={{ gap: "1.25rem" }}>
            {unitSystem === "metric" ? (
              <>
                <div>
                  <label className="input-label">Weight (kg)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    min="1"
                    max="500"
                    placeholder="80"
                  />
                </div>
                <div>
                  <label className="input-label">Height (cm)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    min="50"
                    max="300"
                    placeholder="180"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="input-label">Weight (lbs)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    min="1"
                    max="1000"
                    placeholder="176"
                  />
                </div>
                <div>
                  <label className="input-label">Height (ft / in)</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="number"
                      className="input-field"
                      style={{ flex: 1 }}
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      placeholder="5"
                      min="1"
                      max="10"
                    />
                    <input
                      type="number"
                      className="input-field"
                      style={{ flex: 1 }}
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      placeholder="11"
                      min="0"
                      max="11"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Activity Level */}
          <div>
            <label className="input-label">Activity Level</label>
            <select
              className="input-field"
              value={activity}
              onChange={(e) => setActivity(e.target.value as ActivityLevel)}
              style={{ width: "100%" }}
            >
              <option value="sedentary">Sedentary (little/no exercise)</option>
              <option value="light">Light (exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (exercise 3-5 days/week)</option>
              <option value="active">Active (heavy exercise 6-7 days/week)</option>
              <option value="extreme">Extreme (heavy physical job/twice-a-day training)</option>
            </select>
          </div>

          {/* Optional Body Fat */}
          <div>
            <label className="input-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              Body Fat Percentage <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(Optional)</span>
            </label>
            <input
              type="number"
              className="input-field"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              placeholder="e.g. 15"
              min="2"
              max="70"
              step="0.1"
            />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
              * If left blank, we default to the Mifflin-St Jeor formula. If entered, we use the body-fat sensitive Katch-McArdle formula.
            </span>
          </div>
        </div>

        {/* Right Hand: Caloric & Health Metrics Results */}
        <div>
          {results ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Primary TDEE Card */}
              <div className="card" style={{ padding: "2rem", borderTop: "4px solid var(--primary)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div>
                    <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
                      Daily TDEE (Maintenance Calories)
                    </span>
                    <h3 style={{ fontSize: "2.75rem", fontWeight: 800, margin: "0.25rem 0 0 0", color: "var(--primary)" }}>
                      {Math.round(results.tdee).toLocaleString()}
                      <span style={{ fontSize: "1rem", fontWeight: 400, color: "var(--text-muted)", marginLeft: "0.5rem" }}>kcal/day</span>
                    </h3>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="btn btn-secondary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.8rem",
                      padding: "0.4rem 0.8rem",
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy Results"}
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Basal Metabolic Rate (BMR):</span>
                    <span style={{ fontWeight: 600 }}>{Math.round(results.bmr).toLocaleString()} kcal/day</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Formula Applied:</span>
                    <span style={{ fontWeight: 600, color: "var(--text-main)" }}>{results.formulaUsed}</span>
                  </div>
                </div>
              </div>

              {/* BMI and Ideal Weight Card */}
              <div className="card" style={{ padding: "2rem" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem", marginTop: 0 }}>
                  Body Mass & Weight Estimates
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {/* BMI */}
                  <div style={{ padding: "1rem", background: "var(--bg-main)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Body Mass Index (BMI)</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.15rem" }}>
                        {results.bmi.toFixed(1)}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        background:
                          results.bmiCategory === "Normal weight"
                            ? "#10b98120"
                            : results.bmiCategory === "Underweight"
                            ? "#ef444420"
                            : "#f59e0b20",
                        color:
                          results.bmiCategory === "Normal weight"
                            ? "#10b981"
                            : results.bmiCategory === "Underweight"
                            ? "#ef4444"
                            : "#d97706",
                      }}
                    >
                      {results.bmiCategory}
                    </span>
                  </div>

                  {/* Ideal Body Weights */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.5rem 0" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Estimated Ideal Body Weight:</span>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <span>Devine Formula (1974)</span>
                      <strong>
                        {Math.round(results.devineIbw)} kg ({Math.round(results.devineIbw * 2.20462)} lbs)
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <span>Robinson Formula (1983)</span>
                      <strong>
                        {Math.round(results.robinsonIbw)} kg ({Math.round(results.robinsonIbw * 2.20462)} lbs)
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: "3rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>
              Provide age, weight, and height to compute your core metrics.
            </div>
          )}
        </div>
      </div>

      {/* Interactive Macronutrient Split Builder */}
      {results && liveMacros && (
        <div className="card" style={{ padding: "2rem", marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
                Macronutrient Split Builder
              </h3>
              <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.9rem" }}>
                Drag the sliders to adjust your daily protein, fat, and carb ratios. The totals update live in grams and calories based on your TDEE ({Math.round(results.tdee)} kcal).
              </p>
            </div>

            {/* Presets buttons */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
                onClick={() => applyPreset(40, 30, 30)}
              >
                Zone (40c/30p/30f)
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
                onClick={() => applyPreset(25, 45, 30)}
              >
                Low Carb (25c/45p/30f)
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
                onClick={() => applyPreset(50, 25, 25)}
              >
                High Carb (50c/25p/25f)
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
                onClick={() => applyPreset(10, 40, 50)}
              >
                Keto-ish (10c/40p/50f)
              </button>
            </div>
          </div>

          <div className="grid-2" style={{ gap: "2rem", alignItems: "start" }}>
            {/* Sliders Block */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Carbs Slider */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#3b82f6" }}>Carbohydrates</span>
                  <span style={{ fontWeight: 700 }}>{carbPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={carbPct}
                  onChange={(e) => setCarbPct(parseInt(e.target.value) || 0)}
                  style={{ width: "100%", accentColor: "#3b82f6", cursor: "pointer" }}
                />
              </div>

              {/* Protein Slider */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#ef4444" }}>Protein</span>
                  <span style={{ fontWeight: 700 }}>{proteinPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={proteinPct}
                  onChange={(e) => setProteinPct(parseInt(e.target.value) || 0)}
                  style={{ width: "100%", accentColor: "#ef4444", cursor: "pointer" }}
                />
              </div>

              {/* Fat Slider */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#f59e0b" }}>Fat</span>
                  <span style={{ fontWeight: 700 }}>{fatPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={fatPct}
                  onChange={(e) => setFatPct(parseInt(e.target.value) || 0)}
                  style={{ width: "100%", accentColor: "#f59e0b", cursor: "pointer" }}
                />
              </div>

              {/* Sum Checklist indicator */}
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "space-between",
                  background: liveMacros.totalPct === 100 ? "#10b98115" : "#ef444415",
                  color: liveMacros.totalPct === 100 ? "#10b981" : "#ef4444",
                }}
              >
                <span>Total Allocation:</span>
                <span>
                  {liveMacros.totalPct}% {liveMacros.totalPct === 100 ? "✓ (Balanced)" : `(Must equal 100%)`}
                </span>
              </div>
            </div>

            {/* Calculated Live Grams / Calories Block */}
            <div
              className="glass-panel"
              style={{
                padding: "1.5rem",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Daily Portions</h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {/* Carbs Result */}
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#3b82f6" }} />
                    <span>Carbs (4 kcal/g)</span>
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <strong style={{ fontSize: "1.1rem" }}>{liveMacros.carbsG}g</strong>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{liveMacros.carbsCal} kcal</div>
                  </div>
                </div>

                {/* Protein Result */}
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
                    <span>Protein (4 kcal/g)</span>
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <strong style={{ fontSize: "1.1rem" }}>{liveMacros.proteinG}g</strong>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{liveMacros.proteinCal} kcal</div>
                  </div>
                </div>

                {/* Fat Result */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
                    <span>Fats (9 kcal/g)</span>
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <strong style={{ fontSize: "1.1rem" }}>{liveMacros.fatG}g</strong>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{liveMacros.fatCal} kcal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO Educational Section */}
      <div className="prose">
        <h2>What's the difference between Mifflin-St Jeor and Katch-McArdle?</h2>
        <p>
          Most calorie calculators rely entirely on standard equations like Mifflin-St Jeor, which estimate your energy burning
          capacity based on your overall weight, height, age, and gender. It is an outstanding formula that works for most people.
          However, Mifflin-St Jeor has one limitation: it assumes a standard body composition. If you have an unusually high amount
          of muscle tissue (or if you are carrying extra body fat), the formula might slightly overestimate or underestimate your needs.
        </p>
        <p>
          The Katch-McArdle formula solves this by focusing entirely on Lean Body Mass (LBM). Instead of guessing your composition based
          on age or gender, it takes your direct body fat percentage, subtracts it from your weight to find your muscle mass, and calculates
          BMR based strictly on active metabolic tissue. This makes it the go-to formula for athletes, bodybuilders, and anyone who has
          a clear measurement of their body fat.
        </p>

        <h2>Demystifying BMI and its Limitations</h2>
        <p>
          Body Mass Index (BMI) is a simple statistical ratio of weight-to-height. It has been used for decades as a fast screening tool for
          general health categories. While it works well for analyzing large populations, it should not be treated as a definitive health diagnostic.
          Because BMI does not differentiate between fat and muscle, a heavily muscled weightlifter can easily register as "overweight" or even "obese"
          on the BMI scale despite having a low body fat percentage. Use BMI as a general reference, but keep body fat percentage and how you feel in mind.
        </p>

        <h2>Estimating Your Ideal Body Weight</h2>
        <p>
          Determining an "ideal" weight is highly subjective, which is why we show both the Devine and Robinson formulas. Originally designed in the
          1970s and 1980s to help doctors calculate correct medication dosages, these formulas establish a baseline weight for a person of a given
          height, assuming a standardized healthy body build. They provide a general benchmark, but remember that your personal ideal weight depends
          immensely on your body structure, muscle mass density, and personal fitness goals.
        </p>
      </div>
    </div>
  );
}
