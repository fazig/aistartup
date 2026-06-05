import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schema Markup Generator - StartupAI Tools",
  description: "Build fully compliant JSON-LD structured data. Select a schema type below, fill in the fields, and watch the snippet update in real time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Schema Markup Generator",
    "description": "Build fully compliant JSON-LD structured data. Select a schema type below, fill in the fields, and watch the snippet update in real time.",
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
