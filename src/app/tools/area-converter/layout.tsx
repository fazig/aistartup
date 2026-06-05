import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area Converter - StartupAI Tools",
  description: "Convert between metric and imperial area units including square meters, feet, acres, and hectares.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Area Converter",
    "description": "Convert between metric and imperial area units including square meters, feet, acres, and hectares.",
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
