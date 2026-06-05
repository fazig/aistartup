"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { Landmark, TrendingUp, ArrowLeft } from "lucide-react";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [termUnit, setTermUnit] = useState<"years" | "months">("years");

  const results = useMemo(() => {
    const P = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const t = parseFloat(term);

    if (isNaN(P) || isNaN(annualRate) || isNaN(t) || P <= 0 || annualRate < 0 || t <= 0) return null;

    const n = termUnit === "years" ? t * 12 : t;
    
    if (annualRate === 0) {
      // No interest edge case
      const monthlyPayment = P / n;
      return {
        monthlyPayment,
        totalPayment: P,
        totalInterest: 0,
        principal: P,
        n,
      };
    }

    const r = annualRate / 100 / 12; // Monthly interest rate
    // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    const factor = Math.pow(1 + r, n);
    const emi = (P * r * factor) / (factor - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      monthlyPayment: emi,
      totalPayment,
      totalInterest,
      principal: P,
      n,
    };
  }, [amount, rate, term, termUnit]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const principalPercent = results ? (results.principal / results.totalPayment) * 100 : 0;
  const interestPercent = results ? (results.totalInterest / results.totalPayment) * 100 : 0;

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
          <Landmark color="var(--primary)" /> Loan & EMI Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Calculate your monthly EMI payments, total interest, and see a visual breakdown of your loan.
        </p>
      </div>

      <div style={{ maxWidth: "750px", margin: "0 auto" }}>
        {/* Inputs */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Loan Amount ($)</label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 250000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="1000"
                style={{ fontFamily: "inherit", fontSize: "1.1rem" }}
              />
            </div>

            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 6.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                min="0"
                step="0.1"
                style={{ fontFamily: "inherit", fontSize: "1.1rem" }}
              />
            </div>

            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Loan Term</label>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <input
                  type="number"
                  className="input-field"
                  placeholder={termUnit === "years" ? "e.g. 30" : "e.g. 360"}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  min="1"
                  style={{ fontFamily: "inherit", fontSize: "1.1rem", flex: 1 }}
                />
                <div
                  style={{
                    display: "flex",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid var(--border-light)",
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={() => setTermUnit("years")}
                    style={{
                      padding: "0.75rem 1rem",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                      background: termUnit === "years" ? "var(--primary)" : "transparent",
                      color: termUnit === "years" ? "white" : "var(--text-main)",
                      transition: "all 0.2s",
                    }}
                  >
                    Years
                  </button>
                  <button
                    onClick={() => setTermUnit("months")}
                    style={{
                      padding: "0.75rem 1rem",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 600,
                      background: termUnit === "months" ? "var(--primary)" : "transparent",
                      color: termUnit === "months" ? "white" : "var(--text-main)",
                      transition: "all 0.2s",
                    }}
                  >
                    Months
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="card" style={{ marginBottom: "3rem" }}>
            <h3 style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <TrendingUp size={20} /> Loan Summary
            </h3>

            {/* Main EMI */}
            <div
              style={{
                padding: "1.5rem",
                background: "linear-gradient(135deg, var(--primary), #1d4ed8)",
                borderRadius: "12px",
                textAlign: "center",
                marginBottom: "1.25rem",
                color: "white",
              }}
            >
              <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "0.3rem" }}>Monthly EMI Payment</p>
              <p style={{ fontSize: "2.5rem", fontWeight: 800 }}>${fmt(results.monthlyPayment)}</p>
            </div>

            <div className="grid-3" style={{ gap: "1rem", marginBottom: "1.5rem" }}>
              <div
                style={{
                  padding: "1.25rem",
                  background: "#f8fafc",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid var(--border-light)",
                }}
              >
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Total Payment</p>
                <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>${fmt(results.totalPayment)}</p>
              </div>
              <div
                style={{
                  padding: "1.25rem",
                  background: "#f8fafc",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid var(--border-light)",
                }}
              >
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Total Interest</p>
                <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#dc2626" }}>${fmt(results.totalInterest)}</p>
              </div>
              <div
                style={{
                  padding: "1.25rem",
                  background: "#f8fafc",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid var(--border-light)",
                }}
              >
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Loan Duration</p>
                <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                  {results.n} month{results.n !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Visual Breakdown Bar */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.85rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--primary)" }}>
                  Principal: {principalPercent.toFixed(1)}%
                </span>
                <span style={{ fontWeight: 600, color: "#dc2626" }}>
                  Interest: {interestPercent.toFixed(1)}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "24px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "#fecaca",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: `${principalPercent}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, var(--primary), #3b82f6)",
                    borderRadius: "12px 0 0 12px",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  marginTop: "0.3rem",
                }}
              >
                <span>${fmt(results.principal)}</span>
                <span>${fmt(results.totalInterest)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is EMI and how does this calculator work?</h2>
        <p>
          EMI stands for Equated Monthly Installment—it&apos;s the fixed amount you pay every month to your bank or lender
          until your loan is fully paid off. Each EMI payment is a mix of principal (paying down what you borrowed) and
          interest (what the bank charges you for the privilege of borrowing). Early in the loan, most of your payment goes
          toward interest. As the years go by, the balance flips and more of each payment chips away at the principal.
        </p>
        <p>
          The formula behind this calculator is the standard amortization formula used by banks worldwide:
          EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the principal loan amount, r is the monthly interest rate
          (annual rate divided by 12, then divided by 100), and n is the total number of monthly payments. It&apos;s the
          same math your bank uses—no simplifications or estimates.
        </p>

        <h2>Understanding the principal vs. interest breakdown</h2>
        <p>
          The progress bar above shows you something most loan officers won&apos;t emphasize: how much of your total payment
          over the life of the loan goes to the bank as interest versus how much actually pays down your debt. On a typical
          30-year mortgage at 7%, you&apos;ll pay more in interest than the original home price. A $300,000 mortgage at 7%
          for 30 years means you&apos;ll pay roughly $418,000 in interest alone—bringing the true cost of the house to over
          $718,000.
        </p>
        <p>
          This is exactly why even a small reduction in interest rate or a shorter loan term can save you a staggering amount.
          Try plugging in a 15-year term instead of 30 years—your monthly payment goes up, but the total interest drops
          dramatically. Or try bumping the rate down by just 0.5% and watch how much it saves over the full term. Playing
          with these numbers before you sign anything is one of the smartest financial moves you can make.
        </p>

        <h2>Quick tips for using this calculator</h2>
        <p>
          Comparing a home loan? Plug in the purchase price minus your down payment as the loan amount, the quoted APR as
          the rate, and 30 (or 15) years as the term. For a car loan, typical terms are 3 to 6 years with rates ranging from
          4% to 12% depending on your credit. Student loans? Federal rates hover around 5-7%, and terms are usually 10 years
          (though income-driven plans can extend to 20-25 years).
        </p>
        <p>
          The &quot;years vs. months&quot; toggle is there because some loan products quote terms in months—especially auto loans
          (like 60 months or 72 months). Just flip the toggle so you don&apos;t have to do the mental math. And remember:
          this calculator gives you the base EMI. Your actual payment might include property taxes, insurance, or PMI that
          get rolled into your monthly bill if you&apos;re dealing with a mortgage.
        </p>
      </div>
    </div>
  );
}
