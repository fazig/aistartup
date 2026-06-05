import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Storage Converter - StartupAI Tools",
  description: "Convert between bits, bytes, KB, MB, GB, TB, and PB. Compare Decimal (1000) vs Binary (1024) formats instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Digital Storage Converter",
    "description": "Convert between bits, bytes, KB, MB, GB, TB, and PB. Compare Decimal (1000) vs Binary (1024) formats instantly.",
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
