"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChartCandlestick, RefreshCw, Search, Wallet } from "lucide-react";
import Sparkline from "./Sparkline";
import CurrencyConverter, { UsdtStrip } from "./CurrencyConverter";
import ExchangeBoard from "./ExchangeBoard";
import { useMarketFeeds } from "./useMarketFeeds";
import {
  CATEGORIES,
  MARKET_ASSETS,
  assetsByCategory,
  findAsset,
  formatChange,
  formatCompact,
  formatPrice,
  type MarketAsset,
  type MarketCategory,
} from "./markets";
import "./live-trading.css";

function tone(value: number) {
  if (value > 0) return "is-up";
  if (value < 0) return "is-down";
  return "";
}

function heatColor(pct: number) {
  const t = Math.max(-6, Math.min(6, pct));
  if (t >= 0) return `rgba(14, 203, 129, ${0.22 + t / 12})`;
  return `rgba(246, 70, 93, ${0.22 + Math.abs(t) / 12})`;
}

function Clock() {
  const [label, setLabel] = useState("UTC");
  useEffect(() => {
    const tick = () => {
      setLabel(`${new Date().toLocaleTimeString("en-GB", { hour12: false, timeZone: "UTC" })} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{label}</span>;
}

type View = "desk" | "fx" | "venues";

export default function LiveTradingDesk() {
  const [category, setCategory] = useState<MarketCategory>("crypto");
  const [selectedId, setSelectedId] = useState("BTCUSDT");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("desk");

  const selected = findAsset(selectedId) ?? MARKET_ASSETS[0];
  const { quotes, status, points, trades, bids, asks, pulse } = useMarketFeeds(selected, category);
  const quote = quotes[selected.id];
  const up = (quote?.changePercent ?? 0) >= 0;

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assetsByCategory(category).filter((asset) => {
      if (!q) return true;
      return (
        asset.display.toLowerCase().includes(q) ||
        asset.name.toLowerCase().includes(q) ||
        asset.id.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  const tapeAssets = useMemo(() => {
    const rows = MARKET_ASSETS.filter((asset) => quotes[asset.id]);
    return [...rows, ...rows];
  }, [quotes]);

  const heatAssets = list.slice(0, 9);
  const maxBid = Math.max(...bids.map((b) => b.qty), 0.0001);
  const maxAsk = Math.max(...asks.map((a) => a.qty), 0.0001);
  const pulsePct = Math.max(-8, Math.min(8, pulse));
  const gauge = 100 + (pulsePct / 8) * 88;
  const venuePair = selected.category === "crypto" ? selected.display : "BTC";

  const selectAsset = (asset: MarketAsset) => {
    setSelectedId(asset.id);
    setCategory(asset.category);
    setView("desk");
  };

  return (
    <section className={`tf-desk tf-show-${view}`}>
      <div className="pulse-tape" aria-hidden="true">
        <div className="pulse-tape-track">
          {tapeAssets.map((asset, i) => {
            const row = quotes[asset.id];
            if (!row) return null;
            return (
              <span key={`${asset.id}-${i}`} className={`pulse-chip ${tone(row.changePercent)}`}>
                <b>{asset.display}</b>
                {formatPrice(row.price, asset.category)}
                {formatChange(row.changePercent)}%
              </span>
            );
          })}
        </div>
      </div>

      <header className="tf-appbar">
        <Link href="/tools" className="tf-back">
          <ArrowLeft size={15} /> Tools
        </Link>
        <div className="tf-brand">
          <div className="tf-mark" aria-hidden="true">TF</div>
          <div>
            <h1>TradingFEST</h1>
            <p>Live markets · converter · 18 USDT venues</p>
          </div>
        </div>
        <div className="tf-app-meta">
          <span className={`tf-conn ${status}`}>
            <i />
            {status === "live" ? "Live wire" : status === "polling" ? "Polling" : "Offline"}
          </span>
          <span className="tf-clock"><Clock /></span>
          {quote && (
            <span className={`tf-sticky-px ${tone(quote.changePercent)}`}>
              {selected.display} {formatPrice(quote.price, selected.category)}
            </span>
          )}
        </div>
      </header>

      <UsdtStrip />

      <div className="tf-shell">
        <div className="tf-toolbar">
          <div className="pulse-tabs">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                className={`pulse-tab ${category === tab.id ? "is-on" : ""}`}
                onClick={() => {
                  setCategory(tab.id);
                  const first = assetsByCategory(tab.id)[0];
                  if (first) setSelectedId(first.id);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <label className="tf-search">
            <Search size={14} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find BTC, AAPL, EUR…"
              aria-label="Find a symbol"
            />
          </label>
        </div>

        <div className="tf-grid">
          <aside className="tf-panel tf-watch-panel">
            <h2>Watchlist</h2>
            <div className="pulse-watch">
              {list.length === 0 && <p className="pulse-empty">No symbols match that search.</p>}
              {list.map((asset) => {
                const row = quotes[asset.id];
                return (
                  <button
                    key={asset.id}
                    className={`pulse-row ${selected.id === asset.id ? "is-on" : ""} ${
                      row?.flash === "up" ? "is-flash-up" : row?.flash === "down" ? "is-flash-down" : ""
                    }`}
                    onClick={() => selectAsset(asset)}
                  >
                    <div>
                      <span className="pulse-sym">{asset.display}</span>
                      <span className="pulse-name">{asset.name}</span>
                    </div>
                    <div>
                      <div className="pulse-px">{row ? formatPrice(row.price, asset.category) : "—"}</div>
                      <div className={`pulse-chg ${tone(row?.changePercent ?? 0)}`}>
                        {row ? `${formatChange(row.changePercent)}%` : "—"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="tf-panel tf-hero">
            <div className="pulse-hero-head">
              <div>
                <div className="pulse-hero-name">{selected.name}</div>
                <div className="pulse-hero-sub">
                  {selected.display}
                  {selected.source === "binance" ? " · USDT" : " · live quote"}
                  {quote?.marketState ? ` · ${quote.marketState.toLowerCase()}` : ""}
                </div>
              </div>
              <div className="pulse-gauge" aria-label="Market pulse">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(212,160,23,0.18)" strokeWidth="6" />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke={pulse >= 0 ? "#0ecb81" : "#f6465d"}
                    strokeWidth="6"
                    strokeDasharray={`${Math.max(8, gauge)} 188`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="pulse-gauge-label">
                  {formatChange(pulse)}%
                  <br />
                  pulse
                </div>
              </div>
            </div>

            <div
              className={`pulse-last ${quote?.flash === "up" ? "is-flash-up" : ""} ${quote?.flash === "down" ? "is-flash-down" : ""}`}
              aria-live="polite"
            >
              {quote ? formatPrice(quote.price, selected.category) : "—"}
            </div>
            <div className={`pulse-chg ${tone(quote?.changePercent ?? 0)}`} style={{ fontSize: "0.95rem" }}>
              {quote
                ? `${formatChange(quote.change)}  (${formatChange(quote.changePercent)}%)`
                : "Connecting to the floor…"}
            </div>

            <div className="pulse-chart">
              <Sparkline points={points} up={up} />
            </div>

            <div className="pulse-stats">
              <div className="pulse-stat">
                <span>High</span>
                <b>{quote ? formatPrice(quote.high, selected.category) : "—"}</b>
              </div>
              <div className="pulse-stat">
                <span>Low</span>
                <b>{quote ? formatPrice(quote.low, selected.category) : "—"}</b>
              </div>
              <div className="pulse-stat">
                <span>Volume</span>
                <b>{quote ? formatCompact(quote.volume) : "—"}</b>
              </div>
              <div className="pulse-stat">
                <span>Session</span>
                <b>{selected.category === "crypto" ? "24H" : quote?.marketState || "—"}</b>
              </div>
            </div>
          </div>

          <CurrencyConverter />
        </div>

        <ExchangeBoard pair={venuePair} />

        <div className="tf-lower">
          <aside className="tf-panel">
            <h2>Heat mosaic</h2>
            <div className="pulse-heat">
              {heatAssets.map((asset) => {
                const row = quotes[asset.id];
                const pct = row?.changePercent ?? 0;
                return (
                  <button
                    key={asset.id}
                    className="pulse-tile"
                    style={{ background: heatColor(pct), color: pct >= 0 ? "#06221c" : "#2a0b10" }}
                    onClick={() => selectAsset(asset)}
                  >
                    <b>{asset.display}</b>
                    <span>{formatChange(pct)}%</span>
                  </button>
                );
              })}
            </div>
            {selected.source === "binance" ? (
              <>
                <h2>Ladder</h2>
                <div className="pulse-book">
                  <div>
                    {bids.map((level) => (
                      <div key={`b-${level.price}`} className="pulse-lvl is-up">
                        <i style={{ width: `${(level.qty / maxBid) * 100}%`, background: "#0ecb81" }} />
                        <span>{formatPrice(level.price, "crypto")}</span>
                        <span>{formatCompact(level.qty)}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {asks.map((level) => (
                      <div key={`a-${level.price}`} className="pulse-lvl is-down">
                        <i style={{ width: `${(level.qty / maxAsk) * 100}%`, background: "#f6465d" }} />
                        <span>{formatPrice(level.price, "crypto")}</span>
                        <span>{formatCompact(level.qty)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="pulse-empty">Open a crypto pair for the live ladder.</p>
            )}
          </aside>
          <aside className="tf-panel">
            <h2>Trade prints</h2>
            {selected.source === "binance" ? (
              <div className="pulse-trades">
                {trades.length === 0 && <p className="pulse-empty">Waiting for prints…</p>}
                {trades.map((trade) => (
                  <div key={trade.id} className={`pulse-trade ${trade.isSell ? "is-down" : "is-up"}`}>
                    <span>{formatPrice(trade.price, "crypto")}</span>
                    <span>{formatCompact(trade.qty)}</span>
                    <span>
                      {new Date(trade.time).toLocaleTimeString("en-GB", {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="pulse-empty">
                Equity and forex quotes refresh every few seconds. Crypto pairs stream live prints.
              </p>
            )}
          </aside>
        </div>

        <p className="pulse-note">
          TradingFEST is a market viewer, not a broker. Crypto ticks stream from public exchange
          APIs. USDT venue prices refresh from Binance, OKX, Bitget, Bybit, KuCoin, Gate.io, MEXC,
          HTX, Kraken, Coinbase, Crypto.com, BingX, Bitfinex, WhiteBIT, Bitstamp, CoinEx, BitMart
          and Poloniex. Fiat FX uses public USD rates. Figures can be delayed and are not financial
          advice.
        </p>
      </div>

      <nav className="tf-dock" aria-label="TradingFEST sections">
        <button type="button" className={view === "desk" ? "is-on" : ""} onClick={() => setView("desk")}>
          <ChartCandlestick size={16} /> Markets
        </button>
        <button type="button" className={view === "fx" ? "is-on" : ""} onClick={() => setView("fx")}>
          <Wallet size={16} /> Convert
        </button>
        <button type="button" className={view === "venues" ? "is-on" : ""} onClick={() => setView("venues")}>
          <RefreshCw size={16} /> USDT rates
        </button>
      </nav>
    </section>
  );
}
