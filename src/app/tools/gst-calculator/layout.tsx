import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GST Calculator - StartupAI Tools",
  description: "Calculate Goods and Services Tax (GST) easily by adding or removing tax values for invoices.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GST Calculator",
    "description": "Calculate Goods and Services Tax (GST) easily by adding or removing tax values for invoices.",
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
