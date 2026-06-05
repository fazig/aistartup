import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Keywords Extractor - StartupAI Tools",
  description: "Spy on your competitors by extracting the hidden SEO tags and keywords from any YouTube video.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube Keywords Extractor",
    "description": "Spy on your competitors by extracting the hidden SEO tags and keywords from any YouTube video.",
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
