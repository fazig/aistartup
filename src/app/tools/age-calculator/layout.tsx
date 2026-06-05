import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - StartupAI Tools",
  description: "Find out your exact age in years, months, days, hours, and minutes — plus your zodiac sign, birth day, and next birthday countdown.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Age Calculator",
    "description": "Find out your exact age in years, months, days, hours, and minutes — plus your zodiac sign, birth day, and next birthday countdown.",
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
