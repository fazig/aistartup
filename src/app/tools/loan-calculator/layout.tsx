import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan & EMI Calculator - StartupAI Tools",
  description: "Calculate your monthly EMI payments, total interest, and see a visual breakdown of your loan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Loan & EMI Calculator",
    "description": "Calculate your monthly EMI payments, total interest, and see a visual breakdown of your loan.",
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
