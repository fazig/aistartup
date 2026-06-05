import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Margin & Markup Calculator - StartupAI Tools",
  description: "Solve for profit margins, markups, and calculate selling prices to hit target profit goals.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Margin & Markup Calculator",
    "description": "Solve for profit margins, markups, and calculate selling prices to hit target profit goals.",
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
