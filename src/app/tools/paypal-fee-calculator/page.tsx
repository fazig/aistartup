"use client";
import Link from "next/link";

import { useState, useMemo } from "react";
import { Wallet, ArrowRightLeft, ArrowLeft } from "lucide-react";

const TRANSACTION_TYPES = [
  { label: "Domestic (2.99% + $0.49)", percentFee: 2.99, fixedFee: 0.49 },
  { label: "International (4.99% + $0.49)", percentFee: 4.99, fixedFee: 0.49 },
  { label: "Friends & Family (Free)", percentFee: 0, fixedFee: 0 },
];

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "CAD", symbol: "CA$" },
  { code: "AUD", symbol: "A$" },
  { code: "JPY", symbol: "¥" },
  { code: "INR", symbol: "₹" },
  { code: "BRL", symbol: "R$" },
];

export default function PayPalFeeCalculator() {
  const [amount, setAmount] = useState("");
  const [txTypeIndex, setTxTypeIndex] = useState(0);
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [mode, setMode] = useState<"sending" | "receiving">("sending");

  const txType = TRANSACTION_TYPES[txTypeIndex];
  const currency = CURRENCIES[currencyIndex];

  const results = useMemo(() => {
    const a = parseFloat(amount);
    if (isNaN(a) || a <= 0) return null;

    const pctRate = txType.percentFee / 100;
    const fixed = txType.fixedFee;

    if (mode === "sending") {
      // I'm sending amount X. How much does recipient get?
      const fee = a * pctRate + fixed;
      const received = a - fee;
      return {
        amountSent: a,
        fee: Math.max(fee, 0),
        amountReceived: Math.max(received, 0),
      };
    } else {
      // I want to receive amount X. How much to charge/invoice?
      if (pctRate === 0 && fixed === 0) {
        return { amountSent: a, fee: 0, amountReceived: a };
      }
      // received = sent - (sent * pctRate + fixed)
      // received = sent * (1 - pctRate) - fixed
      // sent = (received + fixed) / (1 - pctRate)
      const amountToSend = (a + fixed) / (1 - pctRate);
      const fee = amountToSend - a;
      return {
        amountSent: amountToSend,
        fee: Math.max(fee, 0),
        amountReceived: a,
      };
    }
  }, [amount, txType, mode]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
          <Wallet color="var(--primary)" /> PayPal Fee Calculator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Figure out exactly how much PayPal will take from your transaction—or how much to invoice so you get the full amount.
        </p>
      </div>

      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Mode Toggle */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid var(--border-light)",
            }}
          >
            <button
              onClick={() => setMode("sending")}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.95rem",
                background: mode === "sending" ? "var(--primary)" : "transparent",
                color: mode === "sending" ? "white" : "var(--text-main)",
                transition: "all 0.2s",
              }}
            >
              I&apos;m Sending
            </button>
            <button
              onClick={() => setMode("receiving")}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.95rem",
                background: mode === "receiving" ? "var(--primary)" : "transparent",
                color: mode === "receiving" ? "white" : "var(--text-main)",
                transition: "all 0.2s",
              }}
            >
              I Want to Receive
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                {mode === "sending" ? "Amount You're Sending" : "Amount You Want to Receive"}
              </label>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <input
                  type="number"
                  className="input-field"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  style={{ fontFamily: "inherit", fontSize: "1.1rem", flex: 1 }}
                />
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Transaction Type</label>
                <select
                  className="input-field"
                  value={txTypeIndex}
                  onChange={(e) => setTxTypeIndex(parseInt(e.target.value))}
                  style={{ fontFamily: "inherit", cursor: "pointer" }}
                >
                  {TRANSACTION_TYPES.map((t, i) => (
                    <option key={i} value={i}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Currency</label>
                <select
                  className="input-field"
                  value={currencyIndex}
                  onChange={(e) => setCurrencyIndex(parseInt(e.target.value))}
                  style={{ fontFamily: "inherit", cursor: "pointer" }}
                >
                  {CURRENCIES.map((c, i) => (
                    <option key={i} value={i}>
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Fee info */}
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              background: "#eff6ff",
              borderRadius: "8px",
              fontSize: "0.85rem",
              color: "var(--primary)",
              border: "1px solid #bfdbfe",
            }}
          >
            <strong>Current fee:</strong> {txType.percentFee}% + {currency.symbol}
            {txType.fixedFee.toFixed(2)} per transaction
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="card" style={{ marginBottom: "3rem" }}>
            <h3 style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ArrowRightLeft size={20} /> Breakdown
            </h3>

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
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Amount to Send</p>
                <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                  {currency.symbol}{fmt(results.amountSent)}
                </p>
              </div>
              <div
                style={{
                  padding: "1.25rem",
                  background: "#fef2f2",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid #fecaca",
                }}
              >
                <p style={{ color: "#991b1b", fontSize: "0.8rem", marginBottom: "0.3rem" }}>PayPal Fee</p>
                <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#dc2626" }}>
                  {currency.symbol}{fmt(results.fee)}
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
                <p style={{ color: "#166534", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Amount Received</p>
                <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#166534" }}>
                  {currency.symbol}{fmt(results.amountReceived)}
                </p>
              </div>
            </div>

            {/* Visual bar */}
            {results.fee > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.3rem",
                  }}
                >
                  <span>You keep: {((results.amountReceived / results.amountSent) * 100).toFixed(1)}%</span>
                  <span>Fee: {((results.fee / results.amountSent) * 100).toFixed(1)}%</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "14px",
                    borderRadius: "7px",
                    overflow: "hidden",
                    background: "#fecaca",
                  }}
                >
                  <div
                    style={{
                      width: `${(results.amountReceived / results.amountSent) * 100}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #16a34a, #22c55e)",
                      borderRadius: "7px 0 0 7px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>How PayPal fees work (and why they&apos;re confusing)</h2>
        <p>
          PayPal&apos;s fee structure is one of those things that seems simple until you actually try to figure out exactly
          how much money you&apos;ll end up with after a transaction. The standard domestic rate for goods and services
          is 2.99% of the transaction amount plus a $0.49 fixed fee. International transactions bump the percentage up
          to 4.99%. Friends and family payments sent from a PayPal balance or bank account are free within the same country,
          which is why people love using it for splitting dinner tabs and rent.
        </p>
        <p>
          The tricky part is that PayPal deducts the fee from the recipient, not the sender. So if someone sends you $100
          for a freelance job, you don&apos;t get $100—you get about $96.52 after PayPal takes its cut. This calculator
          handles both scenarios: figuring out what the recipient actually gets, and the reverse math of how much to
          invoice so you end up with the exact amount you need.
        </p>

        <h2>When to use &quot;I&apos;m Sending&quot; vs &quot;I Want to Receive&quot;</h2>
        <p>
          Use &quot;I&apos;m Sending&quot; when you want to know the impact of fees on a specific payment. If you send $500
          to a contractor, this mode tells you they&apos;ll receive about $484.56 after PayPal&apos;s domestic fee. The
          other mode—&quot;I Want to Receive&quot;—is what freelancers and sellers should use. Need exactly $500 in your pocket?
          This mode calculates that you need to invoice $515.87 so that after PayPal takes its 2.99% + $0.49, you&apos;re
          left with your target amount.
        </p>

        <h2>Tips for minimizing PayPal fees</h2>
        <p>
          If you&apos;re just sending money to a friend and neither of you is buying or selling anything, always use the
          Friends & Family option—it&apos;s free when funded from your PayPal balance or bank account. For business transactions,
          PayPal&apos;s fees are pretty much non-negotiable for most users, but high-volume merchants can sometimes qualify
          for discounted rates. Also, keep in mind that currency conversion adds another 3-4% on top of the transaction
          fee, so if possible, try to transact in the same currency to avoid that hidden surcharge.
        </p>
        <p>
          One more thing: the fees shown here are PayPal&apos;s standard published rates as of 2024, but PayPal occasionally
          adjusts them. Always double-check the current rate on PayPal&apos;s official fee page for your specific country
          and account type. Micropayments, charity donations, and PayPal.me links may have slightly different fee structures.
          This calculator gives you a solid estimate for the most common transaction types, but your exact fee may vary by
          a few cents depending on rounding and regional rules.
        </p>
      </div>
    </div>
  );
}
