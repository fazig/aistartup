import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Text Sorter & Line Organizer - StartupAI Tools",
  description: "Sort, shuffle, reverse, and deduplicate lines of text instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Online Text Sorter & Line Organizer",
    "description": "Sort, shuffle, reverse, and deduplicate lines of text instantly.",
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
