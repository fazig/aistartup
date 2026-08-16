import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const YAHOO_HOSTS = [
  "https://query1.finance.yahoo.com",
  "https://query2.finance.yahoo.com",
];

const YAHOO_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept: "application/json",
};

function isSafeSymbol(symbol: string) {
  return /^[A-Za-z0-9^=.\-]{1,24}$/.test(symbol);
}

async function yahooFetch(path: string) {
  let lastError: unknown;
  for (const host of YAHOO_HOSTS) {
    try {
      const res = await fetch(`${host}${path}`, {
        headers: YAHOO_HEADERS,
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      if (res.ok) return res.json();
      lastError = new Error(`Yahoo ${res.status}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error("Yahoo feed unavailable");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chartSymbol = searchParams.get("chart");
  const symbolsParam = searchParams.get("symbols");

  try {
    if (chartSymbol) {
      if (!isSafeSymbol(chartSymbol)) {
        return NextResponse.json({ error: "Invalid symbol" }, { status: 400 });
      }
      const interval = ["1m", "5m", "15m", "1h", "1d"].includes(
        searchParams.get("interval") || ""
      )
        ? searchParams.get("interval")
        : "5m";
      const range = ["1d", "5d", "1mo"].includes(searchParams.get("range") || "")
        ? searchParams.get("range")
        : "1d";

      const data = await yahooFetch(
        `/v8/finance/chart/${encodeURIComponent(chartSymbol)}?interval=${interval}&range=${range}`
      );
      const result = data?.chart?.result?.[0];
      const closes: Array<number | null> =
        result?.indicators?.quote?.[0]?.close ?? [];
      const points = closes.filter((n): n is number => typeof n === "number" && Number.isFinite(n));
      const meta = result?.meta ?? {};

      return NextResponse.json(
        {
          symbol: chartSymbol,
          price: meta.regularMarketPrice ?? points.at(-1) ?? null,
          currency: meta.currency ?? "USD",
          points,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=8, stale-while-revalidate=20",
          },
        }
      );
    }

    const symbols = (symbolsParam || "")
      .split(",")
      .map((s) => s.trim())
      .filter(isSafeSymbol)
      .slice(0, 40);

    if (symbols.length === 0) {
      return NextResponse.json({ error: "No symbols provided" }, { status: 400 });
    }

    const data = await yahooFetch(
      `/v7/finance/quote?symbols=${encodeURIComponent(symbols.join(","))}`
    );
    const rows = data?.quoteResponse?.result ?? [];

    const quotes = rows.map((row: Record<string, unknown>) => ({
      symbol: String(row.symbol ?? ""),
      name: String(row.shortName || row.longName || row.symbol || ""),
      price: Number(row.regularMarketPrice ?? 0),
      change: Number(row.regularMarketChange ?? 0),
      changePercent: Number(row.regularMarketChangePercent ?? 0),
      previousClose: Number(row.regularMarketPreviousClose ?? 0),
      high: Number(row.regularMarketDayHigh ?? 0),
      low: Number(row.regularMarketDayLow ?? 0),
      volume: Number(row.regularMarketVolume ?? 0),
      currency: String(row.currency ?? "USD"),
      marketState: String(row.marketState ?? "UNKNOWN"),
    }));

    return NextResponse.json(
      { quotes },
      {
        headers: {
          "Cache-Control": "public, s-maxage=5, stale-while-revalidate=15",
        },
      }
    );
  } catch (error) {
    console.error("market-quotes failed", error);
    return NextResponse.json({ error: "Market feed unavailable" }, { status: 502 });
  }
}
