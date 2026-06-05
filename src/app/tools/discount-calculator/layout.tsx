import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discount Calculator - StartupAI Tools",
  description: "Quickly figure out how much you save with any discount — enter a percentage or fixed amount and see the final price instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Discount Calculator",
    "description": "Quickly figure out how much you save with any discount — enter a percentage or fixed amount and see the final price instantly.",
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
