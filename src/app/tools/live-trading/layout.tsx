import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-pulse-serif",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pulse-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-pulse-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TradingFEST — Live Trading, USDT Rates & Currency Converter",
  description:
    "TradingFEST is a free professional trading board with live crypto, stocks, forex, a multi-currency converter, and USDT prices from Binance, OKX, Bitget and 15 more exchanges.",
  keywords:
    "TradingFEST, live trading, USDT rates, Binance OKX Bitget, currency converter, live crypto prices, forex converter",
  alternates: { canonical: "/tools/live-trading" },
  openGraph: {
    title: "TradingFEST — Live Trading & Currency Converter",
    description:
      "Watch live markets, convert any currency, and compare USDT prices across 18 exchanges.",
    url: "/tools/live-trading",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TradingFEST",
    description:
      "Free professional trading board with live crypto, stocks, forex, currency conversion, and multi-exchange USDT rates.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
