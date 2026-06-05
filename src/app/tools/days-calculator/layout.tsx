import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Days & Date Calculator - StartupAI Tools",
  description: "Calculate the number of days between two dates, or add/subtract days to find a future or past date.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Days & Date Calculator",
    "description": "Calculate the number of days between two dates, or add/subtract days to find a future or past date.",
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
