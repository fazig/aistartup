import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Tax Calculator - StartupAI Tools",
  description: "Quickly calculate sales tax or reverse-calculate the pre-tax price. Includes common tax rate presets.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sales Tax Calculator",
    "description": "Quickly calculate sales tax or reverse-calculate the pre-tax price. Includes common tax rate presets.",
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
