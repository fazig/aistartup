import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hours Calculator - StartupAI Tools",
  description: "Calculate elapsed time between hours, or compute weekly timesheets and wages instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hours Calculator",
    "description": "Calculate elapsed time between hours, or compute weekly timesheets and wages instantly.",
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
