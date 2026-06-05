import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Length Converter - StartupAI Tools",
  description: "Convert between metric and imperial length units instantly. Check conversions for all units in a single click.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Length Converter",
    "description": "Convert between metric and imperial length units instantly. Check conversions for all units in a single click.",
    "applicationCategory": "UtilitiesApplication",
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
