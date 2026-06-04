"use client";

import { useState, useMemo } from "react";
import { Flame, Copy, Check, ArrowLeft, Info } from "lucide-react";
import Link from "next/link";

type Gender = "male" | "female";
type UnitSystem = "metric" | "imperial";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "extreme";

export default function CalorieCalculator() {
  // State variables
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<Gender>("male");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [weightKg, setWeightKg] = useState<string>("80");
  const [weightLbs, setWeightLbs] = useState<string>("176");
  const [heightCm, setHeightCm] = useState<string>("180");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("11");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  
  // Selected goal for the interactive macro builder
  const [selectedGoalKey, setSelectedGoalKey] = useState<string>("maintenance");

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

  // Mifflin-St Jeor Equation
  const calculations = useMemo(() => {
    const ageNum = parseInt(age) || 0;
    if (!weight || !height || !ageNum) return null;

    // BMR Calculation
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * ageNum + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * ageNum - 161;
    }

    // Activity multiplier
    const multipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extreme: 1.9,
    };
    const multiplier = multipliers[activity];
    const tdee = bmr * multiplier;

    // Goals calculations (7700 calories per kg of fat)
    // 0.25 kg/week = 275 cal/day
    // 0.50 kg/week = 550 cal/day
    // 1.00 kg/week = 1100 cal/day
    const goals = [
      { key: "lose_fast", label: "Extreme Weight Loss (-1.0 kg/week)", calories: tdee - 1100, type: "deficit" },
      { key: "lose_moderate", label: "Weight Loss (-0.5 kg/week)", calories: tdee - 550, type: "deficit" },
      { key: "lose_slow", label: "Mild Weight Loss (-0.25 kg/week)", calories: tdee - 275, type: "deficit" },
      { key: "maintenance", label: "Weight Maintenance", calories: tdee, type: "maintenance" },
      { key: "gain_slow", label: "Mild Weight Gain (+0.25 kg/week)", calories: tdee + 275, type: "surplus" },
      { key: "gain_moderate", label: "Weight Gain (+0.5 kg/week)", calories: tdee + 550, type: "surplus" },
      { key: "gain_fast", label: "Fast Weight Gain (+1.0 kg/week)", calories: tdee + 1100, type: "surplus" },
    ];

    return {
      bmr,
      tdee,
      goals,
    };
  }, [age, gender, weight, height, activity]);

  // Selected calories for macro calculator
  const selectedGoalCalories = useMemo(() => {
    if (!calculations) return 0;
    const goal = calculations.goals.find((g) => g.key === selectedGoalKey);
    return goal ? Math.max(goal.calories, 1000) : calculations.tdee;
  }, [calculations, selectedGoalKey]);

  // Macro diets breakdown
  const macroBreakdowns = useMemo(() => {
    if (!selectedGoalCalories) return null;
    const calories = selectedGoalCalories;

    // Diets setup: [Carbs%, Protein%, Fat%]
    const diets = [
      {
        name: "Balanced Diet (40/30/30)",
        carbsPct: 40,
        proteinPct: 30,
        fatPct: 30,
        desc: "An all-rounder split ideal for everyday energy, endurance, and general health maintenance.",
      },
      {
        name: "Low Carb / High Fat (25/40/35)",
        carbsPct: 25,
        proteinPct: 40,
        fatPct: 35,
        desc: "Popular for stabilizing insulin, burning body fat, and retaining lean muscle tissue.",
      },
      {
        name: "High Protein / Bulk (35/30/35)",
        carbsPct: 35,
        proteinPct: 30,
        fatPct: 35,
        desc: "Geared towards muscle gain and recovery, providing plenty of amino acids for tissue repair.",
      },
    ];

    return diets.map((diet) => {
      const carbCal = calories * (diet.carbsPct / 100);
      const protCal = calories * (diet.proteinPct / 100);
      const fatCal = calories * (diet.fatPct / 100);

      return {
        ...diet,
        carbsG: Math.round(carbCal / 4),
        proteinG: Math.round(protCal / 4),
        fatG: Math.round(fatCal / 9),
        carbsCal: Math.round(carbCal),
        proteinCal: Math.round(protCal),
        fatCal: Math.round(fatCal),
      };
    });
  }, [selectedGoalCalories]);

  const handleCopy = () => {
    if (!calculations) return;
    const goalText = calculations.goals
      .map((g) => `  - ${g.label}: ${Math.round(Math.max(g.calories, 1000))} kcal/day`)
      .join("\n");

    const macroText = macroBreakdowns
      ? macroBreakdowns
          .map(
            (m) =>
              `  * ${m.name}:\n    Carbs: ${m.carbsG}g (${m.carbsCal} kcal) | Protein: ${m.proteinG}g (${m.proteinCal} kcal) | Fat: ${m.fatG}g (${m.fatCal} kcal)`
          )
          .join("\n")
      : "";

    const text = `--- CALORIE CALCULATOR RESULTS ---
Inputs:
- Age: ${age} years
- Gender: ${gender}
- Weight: ${unitSystem === "metric" ? weightKg + " kg" : weightLbs + " lbs"}
- Height: ${unitSystem === "metric" ? heightCm + " cm" : `${heightFt} ft ${heightIn} in`}
- Activity Level: ${activity}

Calculated Basal Metabolic Rate (BMR): ${Math.round(calculations.bmr)} kcal/day
Total Daily Energy Expenditure (TDEE): ${Math.round(calculations.tdee)} kcal/day

Daily Targets by Goal:
${goalText}

Macro breakdowns for Selected Goal (${calculations.goals.find((g) => g.key === selectedGoalKey)?.label || ""}):
${macroText}
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
          <Flame color="var(--primary)" size={32} /> Calorie Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
          Accurately calculate your daily caloric needs using the Mifflin-St Jeor equation and instantly map out your macro breakdowns for muscle gain, fat loss, or maintenance.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid-2" style={{ gap: "2rem", alignItems: "start", marginBottom: "3rem" }}>
        {/* Left Hand Card: Input Form */}
        <div className="card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, borderBottom: "1px solid var(--border-light)", paddingBottom: "0.75rem", margin: 0 }}>
            Your Stats
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
              <option value="sedentary">Sedentary (little/no exercise, desk job)</option>
              <option value="light">Light (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
              <option value="active">Active (heavy exercise 6-7 days/week)</option>
              <option value="extreme">Extreme (very heavy exercise twice a day / physical job)</option>
            </select>
          </div>
        </div>

        {/* Right Hand Card: Results View */}
        <div>
          {calculations ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Primary TDEE Card */}
              <div className="card" style={{ padding: "2rem", borderTop: "4px solid var(--primary)", position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
                      Maintenance Calories (TDEE)
                    </span>
                    <h3 style={{ fontSize: "2.75rem", fontWeight: 800, margin: "0.25rem 0 0 0", color: "var(--primary)" }}>
                      {Math.round(calculations.tdee).toLocaleString()}
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
                    {copied ? "Copied!" : "Copy Details"}
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-light)", paddingTop: "1rem", fontSize: "0.95rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Basal Metabolic Rate (BMR):</span>
                  <span style={{ fontWeight: 700 }}>{Math.round(calculations.bmr).toLocaleString()} kcal/day</span>
                </div>
              </div>

              {/* Goal Targets Card */}
              <div className="card" style={{ padding: "2rem" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem", marginTop: 0 }}>
                  Daily Calories by Target Goal
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {calculations.goals.map((g) => {
                    const isSelected = selectedGoalKey === g.key;
                    const finalCalories = Math.max(g.calories, 1000);
                    const safeWarning = (g.calories < 1200 && gender === "female") || (g.calories < 1500 && gender === "male");
                    return (
                      <div
                        key={g.key}
                        onClick={() => setSelectedGoalKey(g.key)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.75rem 1rem",
                          border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-light)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          background: isSelected ? "var(--bg-main)" : "var(--bg-card)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontWeight: isSelected ? 700 : 500, fontSize: "0.95rem" }}>{g.label}</span>
                          {safeWarning && isSelected && (
                            <span style={{ color: "#eab308", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.15rem" }}>
                              ⚠️ Exceeds minimum safe deficit threshold.
                            </span>
                          )}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: isSelected ? "var(--primary)" : "inherit" }}>
                            {Math.round(finalCalories).toLocaleString()}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "0.25rem" }}>kcal</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: "3rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>
              Please enter valid age, weight, and height to calculate your caloric requirements.
            </div>
          )}
        </div>
      </div>

      {/* Interactive Macros Breakdown Section */}
      {calculations && macroBreakdowns && (
        <div className="card" style={{ padding: "2rem", marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>
              Macronutrient Breakdown
            </h3>
            <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.95rem" }}>
              Displaying macronutrients for the selected goal:{" "}
              <strong style={{ color: "var(--text-main)" }}>
                {calculations.goals.find((g) => g.key === selectedGoalKey)?.label} ({Math.round(selectedGoalCalories)} kcal/day)
              </strong>
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {macroBreakdowns.map((diet) => (
              <div
                key={diet.name}
                className="glass-panel"
                style={{
                  padding: "1.5rem",
                  borderRadius: "12px",
                  border: "1px solid var(--border-light)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>{diet.name}</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem", lineHeight: 1.4 }}>
                    {diet.desc}
                  </p>

                  {/* Horizontal Bar Chart Representation */}
                  <div style={{ display: "flex", height: "10px", borderRadius: "5px", overflow: "hidden", marginBottom: "1.25rem" }}>
                    <div style={{ width: `${diet.carbsPct}%`, background: "#3b82f6" }} title={`Carbs: ${diet.carbsPct}%`} />
                    <div style={{ width: `${diet.proteinPct}%`, background: "#ef4444" }} title={`Protein: ${diet.proteinPct}%`} />
                    <div style={{ width: `${diet.fatPct}%`, background: "#f59e0b" }} title={`Fat: ${diet.fatPct}%`} />
                  </div>

                  {/* Macro Specs */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6" }} />
                        <span>Carbohydrates ({diet.carbsPct}%)</span>
                      </span>
                      <strong>
                        {diet.carbsG}g <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({diet.carbsCal} kcal)</span>
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
                        <span>Protein ({diet.proteinPct}%)</span>
                      </span>
                      <strong>
                        {diet.proteinG}g <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({diet.proteinCal} kcal)</span>
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} />
                        <span>Fat ({diet.fatPct}%)</span>
                      </span>
                      <strong>
                        {diet.fatG}g <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({diet.fatCal} kcal)</span>
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Prose Guide Section */}
      <div className="prose">
        <h2>How do BMR and TDEE actually work?</h2>
        <p>
          Calculating your calorie needs might seem like a science project, but it comes down to a few basic variables:
          how much energy your body needs to survive at rest, and how much extra energy you expend going about your day.
          Your Basal Metabolic Rate (BMR) represents that baseline survival energy. If you stayed in bed all day without moving
          a single finger, your heart, lungs, and brain would still burn your BMR calories just to keep you alive.
        </p>
        <p>
          Once you add in physical movements — from typing at your desk and brushing your teeth to intense lifting sessions
          or running marathons — you get your Total Daily Energy Expenditure (TDEE). Think of TDEE as your caloric "break-even"
          point. If you consume exactly your TDEE in food every day, your weight will remain practically unchanged.
        </p>

        <h2>The Mifflin-St Jeor Formula: Why We Use It</h2>
        <p>
          There are several popular formulas for calculating metabolic rates, including the classic Harris-Benedict equation.
          However, modern nutritional science and clinical studies generally favor the Mifflin-St Jeor equation because it has
          proven to be the most accurate predictor of metabolic rate for the vast majority of healthy adults. Developed in the 1990s,
          it provides a tighter calculation that aligns closer to actual measured laboratory results than older mathematical models.
        </p>
        <p>
          While no formula is 100% perfect (since it cannot account for differences in lean muscle mass or genetics without advanced tools),
          Mifflin-St Jeor provides a highly reliable starting line. If you find you are losing or gaining weight slower than calculated,
          you can easily adjust your daily intake by 100–200 calories to match your real-world progress.
        </p>

        <h2>Navigating Deficits, Surpluses, and Macro Splits</h2>
        <p>
          To lose weight, you must create a calorie deficit; to gain weight, a calorie surplus. We've structured the goals here based
          on the standard guideline that 1 kg of body fat is roughly equivalent to 7,700 calories of stored energy. This means that
          reducing your intake by 550 calories below your TDEE each day will result in approximately 0.5 kg of weight loss per week.
          However, we strongly suggest not letting your daily calories dip below 1,200 for women or 1,500 for men unless guided by a professional.
          Doing so makes it incredibly hard to hit your essential micronutrient goals.
        </p>
        <p>
          Once your target calorie number is set, how you divide those calories between carbohydrates, proteins, and fats (your macro split)
          defines how you feel and perform. A balanced approach works beautifully for general activity. If you are highly active and focused on
          muscle retention or muscle growth, raising protein ratios to 30%–40% supports muscle protein synthesis. Meanwhile, people looking to keep insulin
          levels low or manage hunger triggers often find success with a lower-carb profile.
        </p>
      </div>
    </div>
  );
}
