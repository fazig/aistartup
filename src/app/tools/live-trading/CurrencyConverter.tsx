"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";

type FxPayload = {
  usdRates: Record<string, number>;
  cryptoUsdt: Record<string, number>;
  usdtUsd: number;
};

const FIAT = [
  "USD", "EUR", "GBP", "JPY", "CNY", "INR", "PKR", "AED", "SAR", "CAD",
  "AUD", "CHF", "TRY", "BRL", "KRW", "IDR", "PHP", "THB", "MYR", "SGD",
  "NZD", "ZAR", "NGN", "EGP", "HKD", "TWD", "VND", "BDT", "LKR", "KWD",
  "QAR", "BHD", "MAD", "KES",
];

const CRYPTO = [
  "USDT", "USDC", "BTC", "ETH", "SOL", "BNB", "XRP", "DOGE", "ADA", "AVAX",
  "LINK", "DOT", "LTC", "TRX", "TON",
];

const QUICK = ["USD", "EUR", "GBP", "PKR", "INR", "AED", "TRY", "USDT", "BTC", "ETH"];
const STRIP = ["USD", "EUR", "GBP", "PKR", "INR", "AED", "TRY", "BRL", "JPY", "NGN"];

function unitInUsd(code: string, data: FxPayload) {
  if (CRYPTO.includes(code)) {
    const usdt = data.cryptoUsdt[code] ?? (code === "USDT" ? 1 : 0);
    return usdt * (data.usdtUsd || 1);
  }
  const perUsd = data.usdRates[code];
  if (!perUsd) return 0;
  return 1 / perUsd;
}

function formatAmount(value: number) {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  let digits = 2;
  if (abs >= 1000) digits = 2;
  else if (abs >= 1) digits = 4;
  else if (abs >= 0.01) digits = 6;
  else digits = 8;
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: digits });
}

function useFxRates() {
  const [data, setData] = useState<FxPayload | null>(null);
  const [status, setStatus] = useState<"live" | "offline">("live");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/fx-rates");
        if (!res.ok) throw new Error("fx");
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setStatus("live");
        }
      } catch {
        if (!cancelled) setStatus("offline");
      }
    };
    load();
    const id = setInterval(load, 10000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return { data, status };
}

export function UsdtStrip() {
  const { data, status } = useFxRates();
  const fromUsd = data ? unitInUsd("USDT", data) : 0;

  return (
    <div className="tf-strip" aria-label="Live USDT rates">
      <b>USDT</b>
      {STRIP.map((code) => {
        const toUsd = data ? unitInUsd(code, data) : 0;
        const value = fromUsd && toUsd ? fromUsd / toUsd : 0;
        return (
          <span key={code}>
            {code} <em>{value ? formatAmount(value) : "—"}</em>
          </span>
        );
      })}
      <i className={status === "offline" ? "is-off" : ""}>{status === "live" ? "LIVE FX" : "FX PAUSED"}</i>
    </div>
  );
}

export default function CurrencyConverter() {
  const { data, status } = useFxRates();
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USDT");
  const [to, setTo] = useState("USD");

  const qty = Number(amount);
  const result = useMemo(() => {
    if (!data || !Number.isFinite(qty)) return null;
    const fromUsd = unitInUsd(from, data);
    const toUsd = unitInUsd(to, data);
    if (!fromUsd || !toUsd) return null;
    return {
      converted: (qty * fromUsd) / toUsd,
      rate: fromUsd / toUsd,
      inverse: toUsd / fromUsd,
    };
  }, [data, qty, from, to]);

  const basket = useMemo(() => {
    if (!data || !Number.isFinite(qty)) return [];
    const fromUsd = unitInUsd(from, data);
    return ["USD", "EUR", "GBP", "PKR", "INR", "AED", "JPY", "TRY", "USDT", "BTC"]
      .filter((code) => code !== from)
      .map((code) => {
        const toUsd = unitInUsd(code, data);
        return { code, value: toUsd ? (qty * fromUsd) / toUsd : 0 };
      });
  }, [data, qty, from]);

  return (
    <section className="tf-fx">
      <div className="tf-panel-head">
        <div>
          <h2>Currency converter</h2>
          <p>Convert any fiat or coin at live USDT and FX rates.</p>
        </div>
        <span className={`tf-live ${status === "offline" ? "is-off" : ""}`}>
          {status === "live" ? "Live rates" : "Rates paused"}
        </span>
      </div>

      <div className="tf-ticket">
        <label className="tf-leg">
          <span>You send</span>
          <div className="tf-leg-row">
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              aria-label="Amount to convert"
            />
            <select value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From currency">
              <optgroup label="Crypto">
                {CRYPTO.map((c) => <option key={c} value={c}>{c}</option>)}
              </optgroup>
              <optgroup label="Fiat">
                {FIAT.map((c) => <option key={c} value={c}>{c}</option>)}
              </optgroup>
            </select>
          </div>
        </label>

        <button type="button" className="tf-swap" onClick={() => { setFrom(to); setTo(from); }} aria-label="Swap currencies">
          <ArrowLeftRight size={16} />
        </button>

        <div className="tf-leg">
          <span>You get</span>
          <div className="tf-leg-row">
            <strong aria-live="polite">{result ? formatAmount(result.converted) : "—"}</strong>
            <select value={to} onChange={(e) => setTo(e.target.value)} aria-label="To currency">
              <optgroup label="Fiat">
                {FIAT.map((c) => <option key={c} value={c}>{c}</option>)}
              </optgroup>
              <optgroup label="Crypto">
                {CRYPTO.map((c) => <option key={c} value={c}>{c}</option>)}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <p className="tf-fx-rate">
        {result
          ? `1 ${from} = ${formatAmount(result.rate)} ${to}  ·  1 ${to} = ${formatAmount(result.inverse)} ${from}`
          : "Connecting FX and USDT feeds…"}
      </p>

      <div className="tf-chips">
        {QUICK.map((code) => (
          <button key={code} type="button" className={to === code ? "is-on" : ""} onClick={() => setTo(code)}>
            {code}
          </button>
        ))}
      </div>

      <ul className="tf-basket">
        {basket.map((row) => (
          <li key={row.code}>
            <span>{qty || 0} {from} → {row.code}</span>
            <b>{formatAmount(row.value)}</b>
          </li>
        ))}
      </ul>
    </section>
  );
}
