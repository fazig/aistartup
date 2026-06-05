"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { Calculator, ReceiptText, ArrowLeft } from "lucide-react";

const TAX_PRESETS = [
  { label: "CA", rate: 7.25 },
  { label: "NY", rate: 8.0 },
  { label: "TX", rate: 6.25 },
  { label: "FL", rate: 6.0 },
  { label: "WA", rate: 6.5 },
  { label: "IL", rate: 6.25 },
  { label: "PA", rate: 6.0 },
  { label: "OH", rate: 5.75 },
  { label: "NJ", rate: 6.625 },
  { label: "MA", rate: 6.25 },
  { label: "UK", rate: 20.0 },
  { label: "Canada", rate: 5.0 },
  { label: "EU (avg)", rate: 21.0 },
  { label: "Australia", rate: 10.0 },
  { label: "India", rate: 18.0 },
];

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const results = useMemo(() => {
    const p = parseFloat(price);
    const r = parseFloat(taxRate);
    if (isNaN(p) || isNaN(r) || p < 0 || r < 0) return null;

    const rateDecimal = r / 100;

    if (mode === "add") {
      const taxAmount = p * rateDecimal;
      return {
        priceBeforeTax: p,
        taxAmount: taxAmount,
        priceAfterTax: p + taxAmount,
      };
    } else {
      // Remove tax: given price includes tax, find original
      const priceBeforeTax = p / (1 + rateDecimal);
      const taxAmount = p - priceBeforeTax;
      return {
        priceBeforeTax: priceBeforeTax,
        taxAmount: taxAmount,
        priceAfterTax: p,
      };
    }
  }, [price, taxRate, mode]);

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
          <ReceiptText color="var(--primary)" /> Sales Tax Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Quickly calculate sales tax or reverse-calculate the pre-tax price. Includes common tax rate presets.
        </p>
      </div>

      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Mode Toggle */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-light)" }}>
            <button
              onClick={() => setMode("add")}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.95rem",
                background: mode === "add" ? "var(--primary)" : "transparent",
                color: mode === "add" ? "white" : "var(--text-main)",
                transition: "all 0.2s",
              }}
            >
              + Add Tax
            </button>
            <button
              onClick={() => setMode("remove")}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.95rem",
                background: mode === "remove" ? "var(--primary)" : "transparent",
                color: mode === "remove" ? "white" : "var(--text-main)",
                transition: "all 0.2s",
              }}
            >
              − Remove Tax
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                <Calculator size={16} style={{ verticalAlign: "middle", marginRight: "0.4rem" }} />
                {mode === "add" ? "Price Before Tax ($)" : "Price Including Tax ($)"}
              </label>
              <input
                type="number"
                className="input-field"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                style={{ fontFamily: "inherit", fontSize: "1.1rem" }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Tax Rate (%)</label>
              <input
                type="number"
                className="input-field"
                placeholder="0.00"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                min="0"
                step="0.01"
                style={{ fontFamily: "inherit", fontSize: "1.1rem" }}
              />
            </div>
          </div>

          {/* Preset Rates */}
          <div style={{ marginTop: "1.25rem" }}>
            <p style={{ fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>Quick presets:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {TAX_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setTaxRate(preset.rate.toString())}
                  style={{
                    padding: "0.35rem 0.7rem",
                    borderRadius: "6px",
                    border: "1px solid var(--border-light)",
                    background: parseFloat(taxRate) === preset.rate ? "var(--primary)" : "white",
                    color: parseFloat(taxRate) === preset.rate ? "white" : "var(--text-main)",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    transition: "all 0.15s",
                  }}
                >
                  {preset.label} ({preset.rate}%)
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="card" style={{ marginBottom: "3rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>Results</h3>
            <div className="grid-3" style={{ gap: "1rem" }}>
              <div
                style={{
                  padding: "1.25rem",
                  background: "#f8fafc",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid var(--border-light)",
                }}
              >
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Price Before Tax</p>
                <p style={{ fontSize: "1.4rem", fontWeight: 700 }}>${fmt(results.priceBeforeTax)}</p>
              </div>
              <div
                style={{
                  padding: "1.25rem",
                  background: "#fef9c3",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid #fde68a",
                }}
              >
                <p style={{ color: "#92400e", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Tax Amount</p>
                <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#92400e" }}>
                  ${fmt(results.taxAmount)}
                </p>
              </div>
              <div
                style={{
                  padding: "1.25rem",
                  background: "#f0fdf4",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid #bbf7d0",
                }}
              >
                <p style={{ color: "#166534", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Total (After Tax)</p>
                <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#166534" }}>
                  ${fmt(results.priceAfterTax)}
                </p>
              </div>
            </div>

            {/* Breakdown bar */}
            <div style={{ marginTop: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                <span>Principal: {((results.priceBeforeTax / results.priceAfterTax) * 100).toFixed(1)}%</span>
                <span>Tax: {((results.taxAmount / results.priceAfterTax) * 100).toFixed(1)}%</span>
              </div>
              <div style={{ width: "100%", height: "12px", borderRadius: "6px", overflow: "hidden", background: "#fde68a" }}>
                <div
                  style={{
                    width: `${(results.priceBeforeTax / results.priceAfterTax) * 100}%`,
                    height: "100%",
                    background: "var(--primary)",
                    borderRadius: "6px 0 0 6px",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>How sales tax actually works (the quick version)</h2>
        <p>
          Sales tax is a percentage added to the purchase price of goods and services. In the US, there&apos;s no federal
          sales tax—each state (and often each county and city) sets its own rate, which is why you might pay 7.25% in
          California but 0% in Oregon. This makes pricing and budgeting a bit of a headache, especially if you&apos;re
          selling products across multiple states or shopping online from different regions.
        </p>
        <p>
          Outside the US, most countries use a Value Added Tax (VAT) system instead. The concept is similar—a percentage
          is added on top of the base price—but VAT is typically included in the displayed price rather than added at checkout.
          This calculator works for both scenarios: use &quot;Add Tax&quot; to see what a customer pays at a US register, or
          &quot;Remove Tax&quot; to extract the pre-VAT price from a European shelf price.
        </p>

        <h2>When to use &quot;Add Tax&quot; vs &quot;Remove Tax&quot;</h2>
        <p>
          &quot;Add Tax&quot; is straightforward: you know the sticker price, you know your local tax rate, and you want to
          see the total you&apos;ll actually pay. This is how most American retail works—the price tag shows the pre-tax amount,
          and tax gets tacked on at the register.
        </p>
        <p>
          &quot;Remove Tax&quot; is the reverse. Say you see a receipt that shows a $53.63 total and you know the tax rate
          was 8%. You want to find out the original pre-tax price and how much of that total was tax. This mode divides the
          total by (1 + tax rate) to back out the base price—handy for expense reports, reimbursements, and accounting.
        </p>

        <h2>Tax rate presets and a word of caution</h2>
        <p>
          We&apos;ve included common tax rates for the most populated US states plus a handful of international rates to save you
          a search. But keep in mind these are base state rates—many localities add their own tax on top. Los Angeles County,
          for example, has a combined rate closer to 9.5%, not just California&apos;s base 7.25%. Always double-check your
          exact local rate on your state&apos;s tax authority website if accuracy really matters (like for invoicing or
          compliance). For quick ballpark estimates and personal budgeting? These presets will get you close enough.
        </p>
      </div>
    </div>
  );
}
