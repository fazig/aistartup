import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Decimal Converter - StartupAI Tools",
  description: "Convert plain text characters to their Unicode decimal code point values, with detailed tables and copy options.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text to Decimal Converter",
    "description": "Convert plain text characters to their Unicode decimal code point values, with detailed tables and copy options.",
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
