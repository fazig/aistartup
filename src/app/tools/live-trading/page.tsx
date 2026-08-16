import Link from "next/link";
import LiveTradingDesk from "./LiveTradingDesk";

export default function LiveTradingPage() {
  return (
    <>
      <LiveTradingDesk />
      <section className="container" style={{ padding: "3.25rem 1.5rem 4.5rem" }}>
        <h2 style={{ fontSize: "1.7rem", marginBottom: "0.75rem" }}>
          What TradingFEST includes
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "46rem", marginBottom: "1.25rem" }}>
          TradingFEST is a free professional market board. Crypto pairs stream live, stocks and
          forex refresh from public quote feeds, and you can convert between 30+ fiats plus USDT,
          BTC, ETH and other coins. The USDT venue board compares last prices on Binance, OKX,
          Bitget, Bybit, KuCoin, Gate.io, MEXC, HTX, Kraken, Coinbase, Crypto.com, BingX,
          Bitfinex, WhiteBIT, Bitstamp, CoinEx, BitMart and Poloniex.
        </p>
        <ul style={{ color: "var(--text-muted)", paddingLeft: "1.2rem", lineHeight: 1.8 }}>
          <li>Markets desk for crypto, stocks, forex, and metals with a live sparkline.</li>
          <li>Currency converter for 30+ fiats and major coins, with a live USDT rate strip.</li>
          <li>USDT venue board across 18 exchanges, with the cheapest print highlighted.</li>
        </ul>
        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/tools">Browse all free tools →</Link>
        </p>
      </section>
    </>
  );
}
