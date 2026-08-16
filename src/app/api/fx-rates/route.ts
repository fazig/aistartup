import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CRYPTO = [
  "BTC",
  "ETH",
  "SOL",
  "BNB",
  "XRP",
  "DOGE",
  "ADA",
  "AVAX",
  "LINK",
  "DOT",
  "LTC",
  "TRX",
  "TON",
  "NEAR",
  "SUI",
  "SHIB",
  "PEPE",
  "UNI",
  "AAVE",
  "USDC",
] as const;

export async function GET() {
  try {
    const symbols = [...CRYPTO.map((c) => `${c}USDT`), "EURUSDT", "GBPUSDT", "USDTTRY", "USDTBRL", "FDUSDUSDT"];
    const [fxRes, cryptoRes] = await Promise.all([
      fetch("https://open.er-api.com/v6/latest/USD", {
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      }),
      fetch(
        `https://api.binance.com/api/v3/ticker/price?symbols=${encodeURIComponent(JSON.stringify(symbols))}`,
        { cache: "no-store", signal: AbortSignal.timeout(8000) }
      ),
    ]);

    if (!fxRes.ok) throw new Error("fx failed");
    const fx = await fxRes.json();
    const usdRates: Record<string, number> = fx.rates ?? {};
    usdRates.USD = 1;

    const cryptoUsdt: Record<string, number> = { USDT: 1 };
    if (cryptoRes.ok) {
      const rows = await cryptoRes.json();
      if (Array.isArray(rows)) {
        for (const row of rows) {
          const symbol = String(row.symbol || "");
          const price = Number(row.price);
          if (!Number.isFinite(price)) continue;
          if (symbol.endsWith("USDT") && !symbol.startsWith("USDT")) {
            cryptoUsdt[symbol.replace("USDT", "")] = price;
          }
        }
      }
    }

    const usdc = cryptoUsdt.USDC || 1;
    const usdtUsd = usdc > 0 ? 1 / usdc : 1;

    return NextResponse.json(
      {
        usdRates,
        cryptoUsdt,
        usdtUsd,
        updatedAt: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30" } }
    );
  } catch (error) {
    console.error("fx-rates failed", error);
    return NextResponse.json({ error: "FX feed unavailable" }, { status: 502 });
  }
}
