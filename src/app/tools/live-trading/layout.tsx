import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Outfit } from "next/font/google";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-pulse-serif",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
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
  title: "Live Trading Desk — Real-Time Market Pulse",
  description:
    "Free realtime trading desk with live crypto prices, stock quotes, forex, metals, sparklines, a heat mosaic, and an order ladder. No signup.",
  keywords:
    "live trading, realtime stock prices, live crypto prices, forex quotes, market pulse, free trading desk",
  alternates: { canonical: "/tools/live-trading" },
  openGraph: {
    title: "Live Trading Desk — Real-Time Market Pulse",
    description:
      "Watch crypto, stocks, forex, and metals on a unique nocturne trading floor with live ticks and heat maps.",
    url: "/tools/live-trading",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Live Trading Desk",
    description:
      "Free realtime trading desk with live crypto prices, stock quotes, forex, metals, and market heat maps.",
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
