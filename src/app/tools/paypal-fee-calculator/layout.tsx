import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PayPal Fee Calculator - StartupAI Tools",
  description: "Figure out exactly how much PayPal will take from your transaction—or how much to invoice so you get the full amount.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PayPal Fee Calculator",
    "description": "Figure out exactly how much PayPal will take from your transaction—or how much to invoice so you get the full amount.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
