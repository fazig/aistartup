"use client";

import { useState, useMemo } from "react";
import { BadgePercent, Copy, Check, DollarSign, ArrowDownUp } from "lucide-react";

const CURRENCIES = [
  { symbol: "$", label: "USD ($)" },
  { symbol: "€", label: "EUR (€)" },
  { symbol: "£", label: "GBP (£)" },
  { symbol: "¥", label: "JPY (¥)" },
  { symbol: "₹", label: "INR (₹)" },
  { symbol: "₽", label: "RUB (₽)" },
  { symbol: "R$", label: "BRL (R$)" },
  { symbol: "A$", label: "AUD (A$)" },
  { symbol: "C$", label: "CAD (C$)" },
  { symbol: "kr", label: "SEK (kr)" },
];

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>("100");
  const [discountPercent, setDiscountPercent] = useState<string>("20");
  const [discountAmount, setDiscountAmount] = useState<string>("");
  const [mode, setMode] = useState<"percent" | "fixed">("percent");
  const [currency, setCurrency] = useState("$");
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const price = parseFloat(originalPrice) || 0;
    if (price <= 0) return null;

    let saved = 0;
    let percent = 0;

    if (mode === "percent") {
      percent = parseFloat(discountPercent) || 0;
      percent = Math.max(0, Math.min(100, percent));
      saved = (price * percent) / 100;
    } else {
      saved = parseFloat(discountAmount) || 0;
      saved = Math.max(0, Math.min(price, saved));
      percent = (saved / price) * 100;
    }

    const finalPrice = price - saved;
    const savingsPercent = percent;

    return {
      originalPrice: price,
      saved,
      finalPrice,
      savingsPercent,
    };
  }, [originalPrice, discountPercent, discountAmount, mode]);

  const handleCopy = () => {
    if (!results) return;
    const text = `Original: ${currency}${results.originalPrice.toFixed(2)}\nDiscount: ${results.savingsPercent.toFixed(1)}% (${currency}${results.saved.toFixed(2)})\nFinal Price: ${currency}${results.finalPrice.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const barWidth = results ? (results.savingsPercent / 100) * 100 : 0;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <BadgePercent color="var(--primary)" /> Discount Calculator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Quickly figure out how much you save with any discount — enter a percentage or fixed amount and see the final price instantly.
        </p>
      </div>

      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        {/* Mode Toggle */}
        <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem' }}>
          <button
            className={mode === "percent" ? "btn btn-primary" : "btn btn-outline"}
            style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
            onClick={() => setMode("percent")}
          >
            <BadgePercent size={16} /> Percentage Discount
          </button>
          <button
            className={mode === "fixed" ? "btn btn-primary" : "btn btn-outline"}
            style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
            onClick={() => setMode("fixed")}
          >
            <DollarSign size={16} /> Fixed Amount
          </button>
        </div>

        {/* Inputs */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1rem' }}>
            <div>
              <label className="input-label">Original Price</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 600, fontSize: '1.1rem' }}>{currency}</span>
                <input
                  type="number"
                  className="input-field"
                  style={{ paddingLeft: '2rem', fontSize: '1.1rem' }}
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>
            {mode === "percent" ? (
              <div>
                <label className="input-label">Discount Percentage</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    className="input-field"
                    style={{ paddingRight: '2rem', fontSize: '1.1rem' }}
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    min={0}
                    max={100}
                    step="0.1"
                    placeholder="0"
                  />
                  <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 600, fontSize: '1.1rem' }}>%</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="input-label">Discount Amount</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 600, fontSize: '1.1rem' }}>{currency}</span>
                  <input
                    type="number"
                    className="input-field"
                    style={{ paddingLeft: '2rem', fontSize: '1.1rem' }}
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="input-label">Currency</label>
            <select className="input-field" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {CURRENCIES.map((c) => (
                <option key={c.symbol} value={c.symbol}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {results && (
          <>
            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="card" style={{ textAlign: 'center', padding: '1.5rem', borderTop: '3px solid #16a34a', background: '#16a34a08' }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>You Save</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#16a34a', lineHeight: 1 }}>
                  {currency}{results.saved.toFixed(2)}
                </div>
                <div style={{ color: '#16a34a', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 600 }}>
                  {results.savingsPercent.toFixed(1)}% off
                </div>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '1.5rem', borderTop: '3px solid var(--primary)', background: 'var(--primary-light, #6366f108)' }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Final Price</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                  {currency}{results.finalPrice.toFixed(2)}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <s>{currency}{results.originalPrice.toFixed(2)}</s>
                </div>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#16a34a', fontWeight: 600 }}>Savings: {results.savingsPercent.toFixed(1)}%</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>You Pay: {(100 - results.savingsPercent).toFixed(1)}%</span>
              </div>
              <div style={{ height: '32px', borderRadius: '16px', overflow: 'hidden', background: '#6366f120', position: 'relative' }}>
                <div style={{
                  height: '100%',
                  width: `${barWidth}%`,
                  background: 'linear-gradient(90deg, #16a34a, #22c55e)',
                  borderRadius: '16px',
                  transition: 'width 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  minWidth: barWidth > 8 ? 'auto' : '0',
                }}>
                  {barWidth > 12 && `${currency}${results.saved.toFixed(2)}`}
                </div>
              </div>
            </div>

            <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginBottom: '3rem' }} onClick={handleCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Results'}
            </button>
          </>
        )}
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>Why use a discount calculator?</h2>
        <p>We've all been there — you're staring at a sale price tag that says "35% off" and your brain just refuses to do the math. Especially when the original price is something weird like $67.49. Nobody wants to stand in a store aisle doing mental arithmetic just to figure out if the deal is actually good. This calculator does it in a split second.</p>
        <p>And it's not just for shopping. Freelancers use this when offering client discounts. Small business owners use it to calculate promotional pricing. Finance teams use it for bulk pricing calculations. Basically, anytime money involves a percentage, this tool saves you time and avoids errors.</p>

        <h2>What's the difference between percentage and fixed discount?</h2>
        <p>A percentage discount takes a fraction of the original price. So 20% off a $100 item saves you $20. A fixed discount is a flat amount subtracted from the price — like a "$15 off" coupon. The toggle at the top lets you switch between these two modes. When using fixed amount mode, the tool automatically calculates what percentage that fixed amount represents relative to the original price, so you always see both numbers.</p>

        <h2>What about the visual savings bar?</h2>
        <p>The green bar gives you an instant visual feel for how significant the discount is. A tiny sliver of green means the discount is marginal — maybe not worth driving across town for. A bar that's mostly green? That's a deal worth grabbing. It's a simple psychological trick: numbers are abstract, but seeing that bar fill up makes the savings feel real.</p>

        <h2>Can I use different currencies?</h2>
        <p>Yep! Just pick your currency from the dropdown. It supports USD, EUR, GBP, JPY, INR, and several others. This only changes the display symbol — the math works the same regardless. Whether you're calculating in dollars, euros, or rupees, the discount percentage and final price logic is identical. The copy button includes the currency symbol too, so you can paste it straight into a message or spreadsheet.</p>
      </div>
    </div>
  );
}
