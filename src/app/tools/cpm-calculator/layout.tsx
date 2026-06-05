import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPM (Cost Per Mille) Calculator - StartupAI Tools",
  description: "Solve for campaign CPM, budget cost, or impressions based on your marketing metrics.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CPM (Cost Per Mille) Calculator",
    "description": "Solve for campaign CPM, budget cost, or impressions based on your marketing metrics.",
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
