import Link from "next/link";
import LiveTradingDesk from "./LiveTradingDesk";

export default function LiveTradingPage() {
  return (
    <>
      <LiveTradingDesk />
      <section className="container" style={{ padding: "3.25rem 1.5rem 4.5rem" }}>
        <h2 style={{ fontSize: "1.7rem", marginBottom: "0.75rem" }}>
          How the live trading desk works
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "46rem", marginBottom: "1.25rem" }}>
          Pulse Desk is a free market viewer built for this site. Crypto pairs stream over
          public Binance websockets so bitcoin, ethereum, solana, and the rest of the board
          tick as trades hit the tape. Stocks, forex, and metals refresh from a server-side
          quote proxy so you can watch NVDA, EUR/USD, and gold without leaving the page.
        </p>
        <ul style={{ color: "var(--text-muted)", paddingLeft: "1.2rem", lineHeight: 1.8 }}>
          <li>Switch Crypto, Stocks, Forex, or Metals and search any listed symbol.</li>
          <li>The hero sparkline updates from the live last price on every tick.</li>
          <li>Heat mosaic colors the board by 24h or session change.</li>
          <li>Crypto also shows a bid/ask ladder and rolling trade prints.</li>
        </ul>
        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/tools">Browse all free tools →</Link>
        </p>
      </section>
    </>
  );
}
