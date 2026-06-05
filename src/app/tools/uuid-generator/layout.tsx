import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - StartupAI Tools",
  description: "Generate random UUID v4 identifiers instantly. Bulk create up to 100 at once.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "UUID Generator",
    "description": "Generate random UUID v4 identifiers instantly. Bulk create up to 100 at once.",
    "applicationCategory": "DeveloperApplication",
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
