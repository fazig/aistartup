"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MARKET_ASSETS,
  type MarketAsset,
  type MarketCategory,
} from "./markets";

export type LiveQuote = {
  id: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  flash: "up" | "down" | null;
  marketState?: string;
};

export type TapeTrade = {
  id: string;
  price: number;
  qty: number;
  time: number;
  isSell: boolean;
};

export type DepthLevel = { price: number; qty: number };

const CRYPTO_ASSETS = MARKET_ASSETS.filter((a) => a.source === "binance");
const BINANCE_SYMBOLS = CRYPTO_ASSETS.map((a) => a.binance!);

function toQuoteFromBinance(row: {
  s?: string;
  symbol?: string;
  c?: string;
  lastPrice?: string;
  p?: string;
  priceChange?: string;
  P?: string;
  priceChangePercent?: string;
  h?: string;
  highPrice?: string;
  l?: string;
  lowPrice?: string;
  v?: string;
  volume?: string;
}): LiveQuote | null {
  const id = row.s || row.symbol;
  const price = Number(row.c ?? row.lastPrice);
  if (!id || !Number.isFinite(price)) return null;
  return {
    id,
    price,
    change: Number(row.p ?? row.priceChange ?? 0),
    changePercent: Number(row.P ?? row.priceChangePercent ?? 0),
    high: Number(row.h ?? row.highPrice ?? 0),
    low: Number(row.l ?? row.lowPrice ?? 0),
    volume: Number(row.v ?? row.volume ?? 0),
    flash: null,
  };
}

export function useMarketFeeds(selected: MarketAsset, category: MarketCategory) {
  const [quotes, setQuotes] = useState<Record<string, LiveQuote>>({});
  const [status, setStatus] = useState<"live" | "polling" | "offline">("polling");
  const [points, setPoints] = useState<number[]>([]);
  const [trades, setTrades] = useState<TapeTrade[]>([]);
  const [bids, setBids] = useState<DepthLevel[]>([]);
  const [asks, setAsks] = useState<DepthLevel[]>([]);

  const applyQuote = useCallback((next: LiveQuote) => {
    setQuotes((prev) => {
      const prevRow = prev[next.id];
      let flash: LiveQuote["flash"] = null;
      if (prevRow && next.price !== prevRow.price) {
        flash = next.price > prevRow.price ? "up" : "down";
      }
      return { ...prev, [next.id]: { ...next, flash } };
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuotes((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const id of Object.keys(next)) {
          if (next[id].flash) {
            next[id] = { ...next[id], flash: null };
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 420);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadSnapshot = async () => {
      try {
        const symbols = encodeURIComponent(JSON.stringify(BINANCE_SYMBOLS));
        const res = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols}`
        );
        if (!res.ok) throw new Error("binance snapshot failed");
        const rows = await res.json();
        if (cancelled || !Array.isArray(rows)) return;
        setQuotes((prev) => {
          const next = { ...prev };
          for (const row of rows) {
            const quote = toQuoteFromBinance(row);
            if (quote) next[quote.id] = quote;
          }
          return next;
        });
      } catch {
        if (!cancelled) setStatus((s) => (s === "live" ? s : "offline"));
      }
    };
    loadSnapshot();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let poll: ReturnType<typeof setInterval> | undefined;
    let retry = 0;
    let stopped = false;

    const pollRest = async () => {
      try {
        const symbols = encodeURIComponent(JSON.stringify(BINANCE_SYMBOLS));
        const res = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols}`
        );
        if (!res.ok) return;
        const rows = await res.json();
        if (!Array.isArray(rows)) return;
        for (const row of rows) {
          const quote = toQuoteFromBinance(row);
          if (quote) applyQuote(quote);
        }
        setStatus("polling");
      } catch {
        setStatus("offline");
      }
    };

    const connect = () => {
      if (stopped) return;
      const streams = BINANCE_SYMBOLS.map((s) => `${s.toLowerCase()}@ticker`).join("/");
      ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
      ws.onopen = () => {
        retry = 0;
        setStatus("live");
      };
      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          const quote = toQuoteFromBinance(payload.data ?? payload);
          if (quote) applyQuote(quote);
        } catch {
          // ignore malformed ticks
        }
      };
      ws.onclose = () => {
        if (stopped) return;
        setStatus("polling");
        retry += 1;
        window.setTimeout(connect, Math.min(8000, 700 * retry));
      };
      ws.onerror = () => {
        ws?.close();
      };
    };

    connect();
    poll = setInterval(() => {
      if (!ws || ws.readyState !== WebSocket.OPEN) pollRest();
    }, 4000);

    return () => {
      stopped = true;
      if (poll) clearInterval(poll);
      ws?.close();
    };
  }, [applyQuote]);

  useEffect(() => {
    if (category === "crypto") return;
    const yahooAssets = MARKET_ASSETS.filter((a) => a.category === category && a.yahoo);
    const symbols = yahooAssets.map((a) => a.yahoo!).join(",");
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(`/api/market-quotes?symbols=${encodeURIComponent(symbols)}`);
        if (!res.ok) throw new Error("yahoo failed");
        const data = await res.json();
        if (cancelled || !Array.isArray(data.quotes)) return;
        for (const row of data.quotes) {
          applyQuote({
            id: row.symbol,
            price: row.price,
            change: row.change,
            changePercent: row.changePercent,
            high: row.high,
            low: row.low,
            volume: row.volume,
            flash: null,
            marketState: row.marketState,
          });
        }
        setStatus((s) => (s === "live" ? s : "polling"));
      } catch {
        if (!cancelled) setStatus((s) => (s === "live" ? s : "offline"));
      }
    };

    load();
    const timer = setInterval(load, 8000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [category, applyQuote]);

  useEffect(() => {
    let cancelled = false;
    setPoints([]);

    const load = async () => {
      try {
        if (selected.source === "binance" && selected.binance) {
          const res = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${selected.binance}&interval=1m&limit=120`
          );
          if (!res.ok) throw new Error("klines failed");
          const rows = await res.json();
          if (cancelled || !Array.isArray(rows)) return;
          setPoints(rows.map((row: unknown[]) => Number(row[4])).filter(Number.isFinite));
          return;
        }
        if (selected.yahoo) {
          const res = await fetch(
            `/api/market-quotes?chart=${encodeURIComponent(selected.yahoo)}&interval=5m&range=1d`
          );
          if (!res.ok) throw new Error("chart failed");
          const data = await res.json();
          if (!cancelled && Array.isArray(data.points)) setPoints(data.points);
        }
      } catch {
        if (!cancelled) setPoints([]);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [selected.id, selected.source, selected.binance, selected.yahoo]);

  const livePrice = quotes[selected.id]?.price;
  useEffect(() => {
    if (!livePrice) return;
    setPoints((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice();
      next[next.length - 1] = livePrice;
      return next;
    });
  }, [livePrice]);

  useEffect(() => {
    if (selected.source !== "binance" || !selected.binance) {
      setTrades([]);
      setBids([]);
      setAsks([]);
      return;
    }

    let ws: WebSocket | null = null;
    let depthTimer: ReturnType<typeof setInterval> | undefined;
    let stopped = false;
    const symbol = selected.binance.toLowerCase();

    const loadDepth = async () => {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/depth?symbol=${selected.binance}&limit=8`
        );
        if (!res.ok) return;
        const data = await res.json();
        setBids(
          (data.bids || []).map((row: [string, string]) => ({
            price: Number(row[0]),
            qty: Number(row[1]),
          }))
        );
        setAsks(
          (data.asks || []).map((row: [string, string]) => ({
            price: Number(row[0]),
            qty: Number(row[1]),
          }))
        );
      } catch {
        // keep last book
      }
    };

    const connect = () => {
      if (stopped) return;
      ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
      ws.onmessage = (event) => {
        try {
          const t = JSON.parse(event.data);
          const trade: TapeTrade = {
            id: String(t.t),
            price: Number(t.p),
            qty: Number(t.q),
            time: Number(t.T),
            isSell: Boolean(t.m),
          };
          setTrades((prev) => [trade, ...prev].slice(0, 18));
        } catch {
          // ignore
        }
      };
      ws.onclose = () => {
        if (!stopped) window.setTimeout(connect, 1500);
      };
    };

    setTrades([]);
    connect();
    loadDepth();
    depthTimer = setInterval(loadDepth, 2000);

    return () => {
      stopped = true;
      if (depthTimer) clearInterval(depthTimer);
      ws?.close();
    };
  }, [selected.id, selected.source, selected.binance]);

  const pulse = useMemo(() => {
    const rows = MARKET_ASSETS.filter((a) => a.category === category)
      .map((a) => quotes[a.id]?.changePercent)
      .filter((n): n is number => Number.isFinite(n));
    if (rows.length === 0) return 0;
    return rows.reduce((sum, n) => sum + n, 0) / rows.length;
  }, [quotes, category]);

  return { quotes, status, points, trades, bids, asks, pulse };
}
