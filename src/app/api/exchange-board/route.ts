import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export type VenueQuote = {
  venue: string;
  price: number | null;
  changePercent: number | null;
  bid: number | null;
  ask: number | null;
  volume: number | null;
  status: "ok" | "error";
};

type PairKey = "BTC" | "ETH" | "SOL" | "BNB" | "XRP" | "DOGE" | "ADA" | "USDT";

const PAIRS: PairKey[] = ["BTC", "ETH", "SOL", "BNB", "XRP", "DOGE", "ADA", "USDT"];

const HEADERS = {
  Accept: "application/json",
  "User-Agent": "TradingFEST/1.0 (market viewer)",
};

function num(value: unknown): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

async function grab(url: string) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: HEADERS,
    signal: AbortSignal.timeout(4500),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function venue(name: string, data: Partial<VenueQuote>, extra?: Partial<VenueQuote>): VenueQuote {
  const price = extra?.price ?? data.price ?? null;
  return {
    venue: name,
    price,
    changePercent: extra?.changePercent ?? data.changePercent ?? null,
    bid: extra?.bid ?? data.bid ?? null,
    ask: extra?.ask ?? data.ask ?? null,
    volume: extra?.volume ?? data.volume ?? null,
    status: price != null ? "ok" : "error",
  };
}

function failed(name: string): VenueQuote {
  return { venue: name, price: null, changePercent: null, bid: null, ask: null, volume: null, status: "error" };
}

function ids(pair: PairKey) {
  if (pair === "USDT") {
    return {
      binance: "USDCUSDT",
      okx: "USDT-USD",
      bitget: "USDTUSDC",
      bybit: "USDTUSDC",
      kucoin: "USDT-USDC",
      gate: "USDT_USD",
      mexc: "USDCUSDT",
      htx: "usdtusdc",
      kraken: "USDTUSD",
      coinbase: "USDT-USD",
      cryptocom: "USDT_USD",
      bingx: "USDT-USDC",
      bitfinex: "tUSTUSD",
      whitebit: "USDT_USD",
      bitstamp: "usdtusd",
      coinex: "USDTUSDC",
      bitmart: "USDT_USD",
      poloniex: "USDT_USDC",
    };
  }
  const u = pair;
  return {
    binance: `${u}USDT`,
    okx: `${u}-USDT`,
    bitget: `${u}USDT`,
    bybit: `${u}USDT`,
    kucoin: `${u}-USDT`,
    gate: `${u}_USDT`,
    mexc: `${u}USDT`,
    htx: `${u.toLowerCase()}usdt`,
    kraken: u === "BTC" ? "XBTUSDT" : `${u}USDT`,
    coinbase: `${u}-USDT`,
    cryptocom: `${u}_USDT`,
    bingx: `${u}-USDT`,
    bitfinex: u === "BTC" ? "tBTCUST" : `t${u}UST`,
    whitebit: `${u}_USDT`,
    bitstamp: `${u.toLowerCase()}usdt`,
    coinex: `${u}USDT`,
    bitmart: `${u}_USDT`,
    poloniex: `${u}_USDT`,
  };
}

async function binance(pair: PairKey): Promise<VenueQuote> {
  const id = ids(pair).binance;
  const row = await grab(`https://api.binance.com/api/v3/ticker/24hr?symbol=${id}`);
  const last = num(row.lastPrice);
  const price = pair === "USDT" && last ? 1 / last : last;
  return venue("Binance", {
    price,
    changePercent: pair === "USDT" ? null : num(row.priceChangePercent),
    bid: pair === "USDT" && num(row.askPrice) ? 1 / Number(row.askPrice) : num(row.bidPrice),
    ask: pair === "USDT" && num(row.bidPrice) ? 1 / Number(row.bidPrice) : num(row.askPrice),
    volume: num(row.volume),
  });
}

async function okx(pair: PairKey): Promise<VenueQuote> {
  const row = (await grab(`https://www.okx.com/api/v5/market/ticker?instId=${ids(pair).okx}`)).data?.[0];
  const last = num(row?.last);
  const open = num(row?.open24h);
  const change = last != null && open ? ((last - open) / open) * 100 : null;
  return venue("OKX", {
    price: last,
    changePercent: change,
    bid: num(row?.bidPx),
    ask: num(row?.askPx),
    volume: num(row?.vol24h),
  });
}

async function bitget(pair: PairKey): Promise<VenueQuote> {
  const row = (await grab(`https://api.bitget.com/api/v2/spot/market/tickers?symbol=${ids(pair).bitget}`)).data?.[0];
  const raw = num(row?.change24h ?? row?.changePercent);
  const changePercent = raw == null ? null : Math.abs(raw) <= 1 ? raw * 100 : raw;
  return venue("Bitget", {
    price: num(row?.lastPr),
    changePercent,
    bid: num(row?.bidPr),
    ask: num(row?.askPr),
    volume: num(row?.baseVolume),
  });
}

async function bybit(pair: PairKey): Promise<VenueQuote> {
  const row = (await grab(`https://api.bybit.com/v5/market/tickers?category=spot&symbol=${ids(pair).bybit}`))
    .result?.list?.[0];
  const pct = num(row?.price24hPcnt);
  return venue("Bybit", {
    price: num(row?.lastPrice),
    changePercent: pct != null ? pct * 100 : null,
    bid: num(row?.bid1Price),
    ask: num(row?.ask1Price),
    volume: num(row?.volume24h),
  });
}

async function kucoin(pair: PairKey): Promise<VenueQuote> {
  const row = (await grab(`https://api.kucoin.com/api/v1/market/stats?symbol=${ids(pair).kucoin}`)).data;
  const pct = num(row?.changeRate);
  return venue("KuCoin", {
    price: num(row?.last),
    changePercent: pct != null ? pct * 100 : null,
    bid: num(row?.buy),
    ask: num(row?.sell),
    volume: num(row?.vol),
  });
}

async function gate(pair: PairKey): Promise<VenueQuote> {
  const row = (await grab(`https://api.gateio.ws/api/v4/spot/tickers?currency_pair=${ids(pair).gate}`))?.[0];
  return venue("Gate.io", {
    price: num(row?.last),
    changePercent: num(row?.change_percentage),
    bid: num(row?.highest_bid),
    ask: num(row?.lowest_ask),
    volume: num(row?.base_volume),
  });
}

async function mexc(pair: PairKey): Promise<VenueQuote> {
  const row = await grab(`https://api.mexc.com/api/v3/ticker/24hr?symbol=${ids(pair).mexc}`);
  return venue("MEXC", {
    price: num(row.lastPrice),
    changePercent: num(row.priceChangePercent),
    bid: num(row.bidPrice),
    ask: num(row.askPrice),
    volume: num(row.volume),
  });
}

async function htx(pair: PairKey): Promise<VenueQuote> {
  const tick = (await grab(`https://api.huobi.pro/market/detail/merged?symbol=${ids(pair).htx}`)).tick;
  const last = num(tick?.close);
  const open = num(tick?.open);
  return venue("HTX", {
    price: last,
    changePercent: last != null && open ? ((last - open) / open) * 100 : null,
    bid: num(tick?.bid?.[0]),
    ask: num(tick?.ask?.[0]),
    volume: num(tick?.amount),
  });
}

async function kraken(pair: PairKey): Promise<VenueQuote> {
  const result = (await grab(`https://api.kraken.com/0/public/Ticker?pair=${ids(pair).kraken}`)).result;
  const row = result ? result[Object.keys(result)[0]] : null;
  const last = num(row?.c?.[0]);
  const open = num(row?.o);
  return venue("Kraken", {
    price: last,
    changePercent: last != null && open ? ((last - open) / open) * 100 : null,
    bid: num(row?.b?.[0]),
    ask: num(row?.a?.[0]),
    volume: num(row?.v?.[1]),
  });
}

async function coinbase(pair: PairKey): Promise<VenueQuote> {
  const id = ids(pair).coinbase;
  const [ticker, stats] = await Promise.all([
    grab(`https://api.exchange.coinbase.com/products/${id}/ticker`),
    grab(`https://api.exchange.coinbase.com/products/${id}/stats`).catch(() => null),
  ]);
  const last = num(ticker?.price);
  const open = num(stats?.open);
  return venue("Coinbase", {
    price: last,
    changePercent: last != null && open ? ((last - open) / open) * 100 : null,
    bid: num(ticker?.bid),
    ask: num(ticker?.ask),
    volume: num(ticker?.volume),
  });
}

async function cryptocom(pair: PairKey): Promise<VenueQuote> {
  const id = ids(pair).cryptocom;
  let row: Record<string, unknown> | undefined;
  try {
    row = (await grab(`https://api.crypto.com/exchange/v1/public/get-tickers?instrument_name=${id}`))
      .result?.data?.[0];
  } catch {
    row = (await grab(`https://api.crypto.com/v2/public/get-ticker?instrument_name=${id}`)).result?.data;
  }
  return venue("Crypto.com", {
    price: num(row?.a ?? row?.k),
    changePercent: num(row?.c),
    bid: num(row?.b),
    ask: num(row?.k),
    volume: num(row?.v),
  });
}

async function bingx(pair: PairKey): Promise<VenueQuote> {
  const row = (await grab(`https://open-api.bingx.com/openApi/spot/v1/ticker/24hr?symbol=${ids(pair).bingx}`))
    .data?.[0];
  return venue("BingX", {
    price: num(row?.lastPrice ?? row?.last),
    changePercent: num(row?.priceChangePercent),
    bid: num(row?.bidPrice),
    ask: num(row?.askPrice),
    volume: num(row?.volume),
  });
}

async function bitfinex(pair: PairKey): Promise<VenueQuote> {
  const row = await grab(`https://api-pub.bitfinex.com/v2/ticker/${ids(pair).bitfinex}`);
  const last = num(row?.[6]);
  const rel = num(row?.[5]);
  return venue("Bitfinex", {
    price: last,
    changePercent: rel != null ? rel * 100 : null,
    bid: num(row?.[0]),
    ask: num(row?.[2]),
    volume: num(row?.[7]),
  });
}

async function whitebit(pair: PairKey): Promise<VenueQuote> {
  const all = await grab("https://whitebit.com/api/v4/public/ticker");
  const row = all?.[ids(pair).whitebit];
  return venue("WhiteBIT", {
    price: num(row?.last_price),
    changePercent: num(row?.change),
    bid: num(row?.bid),
    ask: num(row?.ask),
    volume: num(row?.base_volume),
  });
}

async function bitstamp(pair: PairKey): Promise<VenueQuote> {
  const row = await grab(`https://www.bitstamp.net/api/v2/ticker/${ids(pair).bitstamp}/`);
  return venue("Bitstamp", {
    price: num(row?.last),
    changePercent: num(row?.percent_change_24),
    bid: num(row?.bid),
    ask: num(row?.ask),
    volume: num(row?.volume),
  });
}

async function coinex(pair: PairKey): Promise<VenueQuote> {
  const tick = (await grab(`https://api.coinex.com/v1/market/ticker?market=${ids(pair).coinex}`)).data?.ticker;
  const last = num(tick?.last);
  const change = num(tick?.change);
  return venue("CoinEx", {
    price: last,
    changePercent: pair === "USDT" ? null : change != null ? (Math.abs(change) <= 1 ? change * 100 : change) : null,
    bid: num(tick?.buy),
    ask: num(tick?.sell),
    volume: num(tick?.vol),
  });
}

async function bitmart(pair: PairKey): Promise<VenueQuote> {
  const row = (await grab(`https://api-cloud.bitmart.com/spot/quotation/v3/ticker?symbol=${ids(pair).bitmart}`)).data;
  const last = num(row?.last);
  const fluc = num(row?.fluctuation);
  return venue("BitMart", {
    price: last,
    changePercent: fluc != null ? (Math.abs(fluc) <= 1 ? fluc * 100 : fluc) : null,
    bid: num(row?.bid_px),
    ask: num(row?.ask_px),
    volume: num(row?.base_volume_24h),
  });
}

async function poloniex(pair: PairKey): Promise<VenueQuote> {
  const row = await grab(`https://api.poloniex.com/markets/${ids(pair).poloniex}/ticker24h`);
  const last = num(row?.close);
  const chg = num(row?.dailyChange);
  return venue("Poloniex", {
    price: last,
    changePercent: chg != null ? (Math.abs(chg) <= 1 ? chg * 100 : chg) : null,
    bid: num(row?.bid),
    ask: num(row?.ask),
    volume: num(row?.quantity),
  });
}

const FETCHERS: Array<(pair: PairKey) => Promise<VenueQuote>> = [
  binance,
  okx,
  bitget,
  bybit,
  kucoin,
  gate,
  mexc,
  htx,
  kraken,
  coinbase,
  cryptocom,
  bingx,
  bitfinex,
  whitebit,
  bitstamp,
  coinex,
  bitmart,
  poloniex,
];

const NAMES = [
  "Binance",
  "OKX",
  "Bitget",
  "Bybit",
  "KuCoin",
  "Gate.io",
  "MEXC",
  "HTX",
  "Kraken",
  "Coinbase",
  "Crypto.com",
  "BingX",
  "Bitfinex",
  "WhiteBIT",
  "Bitstamp",
  "CoinEx",
  "BitMart",
  "Poloniex",
];

export async function GET(request: Request) {
  const pair = (new URL(request.url).searchParams.get("pair") || "BTC").toUpperCase() as PairKey;
  if (!PAIRS.includes(pair)) {
    return NextResponse.json({ error: "Unsupported pair" }, { status: 400 });
  }

  const settled = await Promise.allSettled(FETCHERS.map((fn) => fn(pair)));
  const quotes = settled.map((item, i) => (item.status === "fulfilled" ? item.value : failed(NAMES[i])));
  const live = quotes.filter((q) => q.status === "ok" && q.price != null).map((q) => q.price as number);
  const best = live.length ? Math.min(...live) : null;
  const worst = live.length ? Math.max(...live) : null;
  const mid = live.length ? live.reduce((a, b) => a + b, 0) / live.length : null;

  return NextResponse.json(
    {
      pair,
      quote: pair === "USDT" ? "USD" : "USDT",
      updatedAt: new Date().toISOString(),
      liveVenues: live.length,
      best,
      worst,
      mid,
      quotes,
    },
    { headers: { "Cache-Control": "public, s-maxage=3, stale-while-revalidate=8" } }
  );
}
