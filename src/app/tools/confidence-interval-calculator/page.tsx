"use client";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

type DistType = "sample" | "population"; // sample = T-dist, population = Z-dist

// --- STATISTICS MATHEMATICAL HELPER FUNCTIONS ---

// Abramowitz & Stegun inverse normal CDF approximation (error < 0.00045)
function rationalApproximation(t: number): number {
  const c0 = 2.515517;
  const c1 = 0.802853;
  const c2 = 0.010328;
  const d1 = 1.432788;
  const d2 = 0.189269;
  const d3 = 0.001308;
  return t - ((c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t));
}

function ndtri(p: number): number {
  if (p <= 0 || p >= 1) return 0;
  if (p < 0.5) {
    const t = Math.sqrt(-2.0 * Math.log(p));
    return -rationalApproximation(t);
  } else {
    const t = Math.sqrt(-2.0 * Math.log(1.0 - p));
    return rationalApproximation(t);
  }
}

function normalCDF(z: number): number {
  const t = 1.0 / (1.0 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327; // 1 / sqrt(2*pi)
  const prob =
    1.0 -
    d *
      Math.exp(-0.5 * z * z) *
      t *
      (0.31938153 +
        t *
          (-0.356563782 +
            t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  if (z >= 0.0) return prob;
  return 1.0 - prob;
}

// Student's T exact CDF series for integer degrees of freedom (df)
function tCDF(t: number, df: number): number {
  if (df > 1000) return normalCDF(t);

  const theta = Math.atan(t / Math.sqrt(df));
  const sinTheta = Math.sin(theta);
  const cosSqTheta = Math.cos(theta) * Math.cos(theta);

  if (df % 2 === 0) {
    // df even
    let sum = 1.0;
    let term = 1.0;
    for (let k = 1; k <= df / 2 - 1; k++) {
      term *= ((2 * k - 1) / (2 * k)) * cosSqTheta;
      sum += term;
    }
    return 0.5 + 0.5 * sinTheta * sum;
  } else {
    // df odd
    let sum = 0.0;
    if (df > 1) {
      let term = Math.cos(theta);
      sum = term;
      for (let k = 1; k <= (df - 3) / 2; k++) {
        term *= ((2 * k) / (2 * k + 1)) * cosSqTheta;
        sum += term;
      }
    }
    return 0.5 + (1.0 / Math.PI) * (theta + sinTheta * sum);
  }
}

// Lanczos Log-Gamma approximation
function lnGamma(x: number): number {
  if (x < 0.5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * x)) - lnGamma(1 - x);
  const cof = [
    76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
  ];
  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += cof[j] / ++y;
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}

function tPDF(t: number, df: number): number {
  const logK = lnGamma((df + 1) / 2) - 0.5 * Math.log(df * Math.PI) - lnGamma(df / 2);
  return Math.exp(logK) * Math.pow(1 + (t * t) / df, -(df + 1) / 2);
}

// Newton-Raphson solver to find critical t-value for a given tail probability
function getTCritical(confidence: number, df: number): number {
  if (df <= 0) return 0;
  
  // exact solutions for df = 1 and df = 2
  const r = confidence / 100;
  if (df === 1) {
    return Math.abs(Math.tan((Math.PI * r) / 2));
  }
  if (df === 2) {
    return r * Math.sqrt(2 / (1 - r * r));
  }

  const alpha = 1 - r;
  const pTarget = 1 - alpha / 2; // target CDF value

  // starting guess: normal distribution critical value
  let t = ndtri(pTarget);

  // Cornish-Fisher expansion starting point refinement
  const z = t;
  const z3 = z * z * z;
  const z5 = z3 * z * z;
  const z7 = z5 * z * z;
  
  const c1 = (z3 + z) / 4;
  const c2 = (5 * z5 + 16 * z3 + 3 * z) / 96;
  const c3 = (3 * z7 + 19 * z5 + 17 * z3 - 15 * z) / 384;
  
  t = z + c1 / df + c2 / (df * df) + c3 / (df * df * df);

  // Newton-Raphson refinement loop (typically converges in 3-4 steps)
  for (let i = 0; i < 10; i++) {
    const cdfVal = tCDF(t, df);
    const pdfVal = tPDF(t, df);
    if (pdfVal === 0) break;
    const diff = cdfVal - pTarget;
    if (Math.abs(diff) < 1e-12) break;
    t = t - diff / pdfVal;
  }

  return Math.abs(t);
}

export default function ConfidenceIntervalCalculator() {
  // Input states
  const [meanInput, setMeanInput] = useState<string>("100");
  const [nInput, setNInput] = useState<string>("50");
  const [sdInput, setSdInput] = useState<string>("15");
  const [confInput, setConfInput] = useState<string>("95");
  const [distType, setDistType] = useState<DistType>("sample");

  const [copied, setCopied] = useState(false);

  // Perform Calculations
  const stats = useMemo(() => {
    const mean = parseFloat(meanInput);
    const n = parseInt(nInput);
    const sd = parseFloat(sdInput);
    const confidence = parseFloat(confInput);

    // Validation
    if (isNaN(mean) || isNaN(n) || isNaN(sd) || isNaN(confidence)) return null;
    if (n < 1) return { error: "Sample size (N) must be 1 or greater." };
    if (distType === "sample" && n <= 1) {
      return { error: "For sample standard deviation (T-distribution), sample size (N) must be greater than 1." };
    }
    if (sd <= 0) return { error: "Standard deviation must be greater than 0." };
    if (confidence <= 50 || confidence >= 100) {
      return { error: "Confidence level must be between 50% and 99.99%." };
    }

    const df = n - 1;
    const standardError = sd / Math.sqrt(n);

    let criticalValue = 0;
    if (distType === "population") {
      const alpha = 1 - confidence / 100;
      criticalValue = ndtri(1 - alpha / 2);
    } else {
      criticalValue = getTCritical(confidence, df);
    }

    const marginOfError = criticalValue * standardError;
    const lowerBound = mean - marginOfError;
    const upperBound = mean + marginOfError;

    return {
      mean,
      n,
      sd,
      confidence,
      df,
      standardError,
      criticalValue,
      marginOfError,
      lowerBound,
      upperBound,
      error: null,
    };
  }, [meanInput, nInput, sdInput, confInput, distType]);

  const handleCopy = () => {
    if (!stats || stats.error) return;
    const text = `--- CONFIDENCE INTERVAL CALCULATOR RESULTS ---
Inputs:
- Sample Mean: ${stats.mean}
- Sample Size (N): ${stats.n}
- Standard Deviation: ${stats.sd} (${distType === "sample" ? "Sample SD / T-dist" : "Population SD / Z-dist"})
- Confidence Level: ${stats.confidence}%

Calculated Metrics:
- Standard Error: ${stats.standardError?.toFixed(5)}
- Critical Value (${distType === "sample" ? "t*" : "z*"}): ${stats.criticalValue?.toFixed(5)} (df = ${distType === "sample" ? stats.df : "N/A"})
- Margin of Error (ME): ${stats.marginOfError?.toFixed(5)}
- Confidence Interval: [${stats.lowerBound?.toFixed(5)}, ${stats.upperBound?.toFixed(5)}]
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
          <Calculator color="var(--primary)" size={32} /> Confidence Interval Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
          Calculate the confidence interval for your sample mean using T-distribution or Z-distribution. See standard error, critical values, and step-by-step mathematical breakdowns.
        </p>
      </div>

      {/* Main Grid: Inputs and Outputs */}
      <div className="grid-2" style={{ gap: "2rem", alignItems: "start", marginBottom: "2.5rem" }}>
        {/* Left Side: Inputs Card */}
        <div className="card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0, borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
            Calculator Inputs
          </h2>

          {/* SD Toggle: Population vs Sample */}
          <div>
            <label className="input-label" style={{ marginBottom: "0.4rem", display: "block" }}>Standard Deviation Type</label>
            <div style={{ display: "flex", background: "var(--bg-main)", borderRadius: "8px", padding: "0.25rem", border: "1px solid var(--border-light)" }}>
              <button
                type="button"
                onClick={() => setDistType("sample")}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  background: distType === "sample" ? "var(--primary)" : "transparent",
                  color: distType === "sample" ? "white" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                }}
              >
                Sample SD (T-Dist)
              </button>
              <button
                type="button"
                onClick={() => setDistType("population")}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  background: distType === "population" ? "var(--primary)" : "transparent",
                  color: distType === "population" ? "white" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                }}
              >
                Population SD (Z-Dist)
              </button>
            </div>
          </div>

          {/* Sample Mean & Size inputs */}
          <div className="grid-2" style={{ gap: "1rem" }}>
            <div>
              <label className="input-label">Sample Mean (x̄)</label>
              <input
                type="number"
                className="input-field"
                value={meanInput}
                onChange={(e) => setMeanInput(e.target.value)}
                placeholder="e.g. 100"
                step="any"
              />
            </div>
            <div>
              <label className="input-label">Sample Size (N)</label>
              <input
                type="number"
                className="input-field"
                value={nInput}
                onChange={(e) => setNInput(e.target.value)}
                placeholder="e.g. 50"
                min="1"
              />
            </div>
          </div>

          {/* SD Input */}
          <div>
            <label className="input-label">
              Standard Deviation ({distType === "sample" ? "s" : "σ"})
            </label>
            <input
              type="number"
              className="input-field"
              value={sdInput}
              onChange={(e) => setSdInput(e.target.value)}
              placeholder="e.g. 15"
              min="0.00001"
              step="any"
            />
          </div>

          {/* Confidence Level Presets & Input */}
          <div>
            <label className="input-label" style={{ display: "block", marginBottom: "0.4rem" }}>Confidence Level (%)</label>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
              {["90", "95", "99"].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setConfInput(preset)}
                  className="btn btn-secondary"
                  style={{
                    flex: 1,
                    fontSize: "0.85rem",
                    padding: "0.4rem",
                    border: confInput === preset ? "2px solid var(--primary)" : "1px solid var(--border-light)",
                    fontWeight: confInput === preset ? 700 : 500,
                  }}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <input
              type="number"
              className="input-field"
              value={confInput}
              onChange={(e) => setConfInput(e.target.value)}
              placeholder="e.g. 95"
              min="50"
              max="99.999"
              step="any"
            />
          </div>
        </div>

        {/* Right Side: Results Display */}
        <div>
          {stats && !stats.error && stats.mean !== undefined ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Main Interval Box */}
              <div className="card" style={{ padding: "2rem", borderTop: "4px solid var(--primary)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div>
                    <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
                      {stats.confidence}% Confidence Interval
                    </span>
                    <h3 style={{ fontSize: "2.25rem", fontWeight: 800, margin: "0.25rem 0 0 0", color: "var(--text-main)" }}>
                      [{stats.lowerBound?.toFixed(4)}, {stats.upperBound?.toFixed(4)}]
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
                    {copied ? "Copied!" : "Copy results"}
                  </button>
                </div>

                {/* Sub Stats List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid var(--border-light)", paddingTop: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Margin of Error (ME):</span>
                    <span style={{ fontWeight: 700 }}>±{stats.marginOfError?.toFixed(5)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>
                      Critical Value ({distType === "sample" ? "t*" : "z*"}):
                    </span>
                    <span style={{ fontWeight: 700 }}>{stats.criticalValue?.toFixed(5)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Standard Error:</span>
                    <span style={{ fontWeight: 600 }}>{stats.standardError?.toFixed(5)}</span>
                  </div>
                  {distType === "sample" && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>Degrees of Freedom (df):</span>
                      <span style={{ fontWeight: 600 }}>{stats.df}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: "3rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>
              {stats?.error || "Enter valid statistical data to compute the confidence interval."}
            </div>
          )}
        </div>
      </div>

      {/* Mathematical Step-by-Step Walkthrough */}
      {stats && !stats.error && stats.mean !== undefined && (
        <div className="card" style={{ padding: "2rem", marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 1.25rem 0", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
            Step-by-Step Calculation Breakdown
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Step 1 */}
            <div>
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.05rem", fontWeight: 700 }}>
                Step 1: Calculate Standard Error (SE)
              </h4>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                The Standard Error measures the variation in the sample mean from sample to sample.
              </p>
              <div
                style={{
                  padding: "1rem",
                  background: "var(--bg-main)",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  borderLeft: "4px solid var(--primary)",
                }}
              >
                <div>Formula: SE = SD / √N</div>
                <div style={{ marginTop: "0.25rem" }}>
                  Calculation: {stats.sd} / √{stats.n} = {stats.sd} / {Math.sqrt(stats.n).toFixed(5)} ={" "}
                  <strong>{stats.standardError?.toFixed(5)}</strong>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.05rem", fontWeight: 700 }}>
                Step 2: Determine Critical Value
              </h4>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                Based on your {stats.confidence}% Confidence level, significance level α = 1 - C ={" "}
                {(1 - stats.confidence / 100).toFixed(4)}. The two-tailed probability for the cutoff is α / 2 ={" "}
                {((1 - stats.confidence / 100) / 2).toFixed(5)}.
              </p>
              <div
                style={{
                  padding: "1rem",
                  background: "var(--bg-main)",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  borderLeft: "4px solid var(--primary)",
                }}
              >
                {distType === "sample" ? (
                  <>
                    <div>Distribution Type: T-Distribution (Sample SD, population SD unknown)</div>
                    <div>Degrees of Freedom (df): N - 1 = {stats.n} - 1 = {stats.df}</div>
                    <div style={{ marginTop: "0.25rem" }}>
                      Critical Value (t*):{" "}
                      <strong>{stats.criticalValue?.toFixed(5)}</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div>Distribution Type: Z-Distribution (Population SD known)</div>
                    <div style={{ marginTop: "0.25rem" }}>
                      Critical Value (z*):{" "}
                      <strong>{stats.criticalValue?.toFixed(5)}</strong>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.05rem", fontWeight: 700 }}>
                Step 3: Calculate Margin of Error (ME)
              </h4>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                The margin of error tells us the maximum expected difference between the true population mean and our sample mean.
              </p>
              <div
                style={{
                  padding: "1rem",
                  background: "var(--bg-main)",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  borderLeft: "4px solid var(--primary)",
                }}
              >
                <div>Formula: ME = Critical Value × SE</div>
                <div style={{ marginTop: "0.25rem" }}>
                  Calculation: {stats.criticalValue?.toFixed(5)} × {stats.standardError?.toFixed(5)} ={" "}
                  <strong>±{stats.marginOfError?.toFixed(5)}</strong>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.05rem", fontWeight: 700 }}>
                Step 4: Construct the Confidence Interval
              </h4>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.95rem", color: "var(--text-muted)" }}>
                Subtract and add the Margin of Error from the Sample Mean to establish the range boundaries.
              </p>
              <div
                style={{
                  padding: "1rem",
                  background: "var(--bg-main)",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  borderLeft: "4px solid var(--primary)",
                }}
              >
                <div>Formula: CI = Mean ± ME</div>
                <div>Lower Limit: {stats.mean} - {stats.marginOfError?.toFixed(5)} = {stats.lowerBound?.toFixed(5)}</div>
                <div>Upper Limit: {stats.mean} + {stats.marginOfError?.toFixed(5)} = {stats.upperBound?.toFixed(5)}</div>
                <div style={{ marginTop: "0.25rem", fontWeight: 700 }}>
                  Interval: [{stats.lowerBound?.toFixed(5)}, {stats.upperBound?.toFixed(5)}]
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO Prose Guide */}
      <div className="prose">
        <h2>What actually is a Confidence Interval?</h2>
        <p>
          In statistics, we rarely have the ability to measure an entire population. Instead, we take a smaller sample and calculate
          its mean. However, because our sample represents only a portion of the whole, we cannot say with 100% certainty that the
          sample mean is exactly equal to the true population mean. This is where confidence intervals come in.
        </p>
        <p>
          A confidence interval gives us a range of values that is highly likely to contain the true population parameter. When you calculate
          a 95% confidence interval, for example, it means that if you were to repeat your sample study 100 times, approximately 95 of those
          resulting intervals would successfully capture the actual population mean. It is one of the most powerful concepts in modern scientific research
          and data analysis.
        </p>

        <h2>T-Distribution vs Z-Distribution: Which should you choose?</h2>
        <p>
          Deciding between a T-distribution and a Z-distribution is a classic statistical fork in the road. In school, you might have been told that
          you choose Z if your sample size ($N$) is greater than 30. While that was a helpful guideline before computers, the real rule depends on whether
          you know the standard deviation of the entire population ($\sigma$).
        </p>
        <p>
          If you know the population standard deviation, you use the Z-distribution. If you do not know it (which is true in 99% of real-world research)
          and instead must calculate the standard deviation from your own sample data ($s$), you should use the T-distribution. The T-distribution accounts for the
          extra uncertainty of estimating the standard deviation by using degrees of freedom ($df = N - 1$). It creates slightly wider confidence intervals for
          smaller samples, protecting you from overconfident conclusions.
        </p>

        <h2>What does the Margin of Error tell you?</h2>
        <p>
          The margin of error represents the "plus-or-minus" value you often hear in news reports and polls. It is directly influenced by three things:
          your confidence level, standard deviation, and sample size. If you want a higher level of confidence (say 99% instead of 90%), your critical value
          increases, which widens your interval.
        </p>
        <p>
          Conversely, if you increase your sample size (N), the standard error shrinks because your denominator (√N) gets larger. A larger sample
          means your sample mean is a better estimator of the true mean, which decreases the margin of error and narrows your confidence interval, providing
          a more precise estimate.
        </p>
      </div>
    </div>
  );
}
