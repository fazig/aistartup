"use client";

import { useEffect, useMemo, useState } from "react";
import { formatChange, formatCompact, formatPrice } from "./markets";

export type VenueQuote = {
  venue: string;
  price: number | null;
  changePercent: number | null;
  bid: number | null;
  ask: number | null;
  volume: number | null;
  status: "ok" | "error";
};

const PAIRS = ["BTC", "ETH", "SOL", "BNB", "XRP", "DOGE", "ADA", "USDT"] as const;

type BoardPayload = {
  pair: string;
  quote: string;
  liveVenues: number;
  best: number | null;
  worst: number | null;
  mid: number | null;
  quotes: VenueQuote[];
  updatedAt: string;
};

function tone(value: number | null) {
  if (value == null) return "";
  if (value > 0) return "is-up";
  if (value < 0) return "is-down";
  return "";
}

export default function ExchangeBoard({ pair }: { pair: string }) {
  const selected = PAIRS.includes(pair as (typeof PAIRS)[number]) ? pair : "BTC";
  const [active, setActive] = useState(selected);
  const [board, setBoard] = useState<BoardPayload | null>(null);

  useEffect(() => {
    if (PAIRS.includes(pair as (typeof PAIRS)[number])) setActive(pair);
  }, [pair]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`/api/exchange-board?pair=${encodeURIComponent(active)}`);
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setBoard(json);
      } catch {
        // keep last board
      }
    };
    load();
    const id = setInterval(load, 3500);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [active]);

  const rows = useMemo(() => {
    const list = [...(board?.quotes ?? [])];
    list.sort((a, b) => {
      if (a.price == null) return 1;
      if (b.price == null) return -1;
      return a.price - b.price;
    });
    return list;
  }, [board]);

  const quoteAsset = board?.quote || (active === "USDT" ? "USD" : "USDT");
  const cat = active === "USDT" ? "forex" : "crypto";

  return (
    <section className="tf-venues">
      <div className="tf-panel-head">
        <div>
          <h2>USDT venue board</h2>
          <p>
            {board
              ? `${board.liveVenues} exchanges live · ${active}/${quoteAsset} · cheapest print highlighted`
              : "Connecting Binance, OKX, Bitget and 15 more venues…"}
          </p>
        </div>
        <div className="tf-pair-tabs" role="tablist" aria-label="USDT pair">
          {PAIRS.map((p) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={active === p}
              className={active === p ? "is-on" : ""}
              onClick={() => setActive(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="tf-venue-cards">
        {rows.map((row) => {
          const vsMid =
            row.price != null && board?.mid ? ((row.price - board.mid) / board.mid) * 100 : null;
          const isBest = row.price != null && row.price === board?.best;
          return (
            <article key={`card-${row.venue}`} className={`tf-venue-card ${isBest ? "is-best" : ""}`}>
              <header>
                <b>{row.venue}</b>
                <span className={row.status === "ok" ? "tf-live" : "tf-live is-off"}>
                  {row.status === "ok" ? "LIVE" : "OFF"}
                </span>
              </header>
              <strong className="tf-mono">
                {row.price != null ? formatPrice(row.price, cat) : "—"}
              </strong>
              <p className={`tf-mono ${tone(vsMid)}`}>
                vs mid {vsMid != null ? `${formatChange(vsMid, 3)}%` : "—"}
              </p>
              <footer>
                <span>24h {row.changePercent != null ? `${formatChange(row.changePercent)}%` : "—"}</span>
                <span>Vol {row.volume != null ? formatCompact(row.volume) : "—"}</span>
              </footer>
            </article>
          );
        })}
      </div>

      <div className="tf-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Exchange</th>
              <th>Last</th>
              <th>vs mid</th>
              <th>24h</th>
              <th>Bid</th>
              <th>Ask</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="pulse-empty">Loading venue tape…</td>
              </tr>
            )}
            {rows.map((row) => {
              const vsMid =
                row.price != null && board?.mid
                  ? ((row.price - board.mid) / board.mid) * 100
                  : null;
              const isBest = row.price != null && row.price === board?.best;
              const isWorst = row.price != null && row.price === board?.worst && (board?.liveVenues || 0) > 1;
              return (
                <tr key={row.venue} className={`${isBest ? "is-best" : ""} ${isWorst ? "is-worst" : ""}`}>
                  <td>
                    <b>{row.venue}</b>
                    {row.status === "error" && <span className="tf-muted"> offline</span>}
                    {isBest && <span className="tf-tag">best</span>}
                  </td>
                  <td className="tf-mono">
                    {row.price != null ? formatPrice(row.price, cat) : "—"}
                  </td>
                  <td className={`tf-mono ${tone(vsMid)}`}>
                    {vsMid != null ? `${formatChange(vsMid, 3)}%` : "—"}
                  </td>
                  <td className={`tf-mono ${tone(row.changePercent)}`}>
                    {row.changePercent != null ? `${formatChange(row.changePercent)}%` : "—"}
                  </td>
                  <td className="tf-mono">
                    {row.bid != null ? formatPrice(row.bid, cat) : "—"}
                  </td>
                  <td className="tf-mono">
                    {row.ask != null ? formatPrice(row.ask, cat) : "—"}
                  </td>
                  <td className="tf-mono">{row.volume != null ? formatCompact(row.volume) : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
