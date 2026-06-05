import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Line Breaks - StartupAI Tools",
  description: "Strip or replace line breaks from your text. Perfect for cleaning up copied content.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Remove Line Breaks",
    "description": "Strip or replace line breaks from your text. Perfect for cleaning up copied content.",
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
