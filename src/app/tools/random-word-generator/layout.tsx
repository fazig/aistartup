import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Word Generator - StartupAI Tools",
  description: "Generate random English words for brainstorming, writing exercises, games, or just for fun.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Random Word Generator",
    "description": "Generate random English words for brainstorming, writing exercises, games, or just for fun.",
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
