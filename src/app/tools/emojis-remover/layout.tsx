import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emojis Remover Tool - StartupAI Tools",
  description: "Instantly strip all emojis from any block of text to clean it up for professional use.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Emojis Remover Tool",
    "description": "Instantly strip all emojis from any block of text to clean it up for professional use.",
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
