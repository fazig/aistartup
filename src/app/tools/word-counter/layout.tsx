import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Word & Character Counter - StartupAI Tools",
  description: "Instantly count words, characters, sentences, and estimate reading time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Word & Character Counter",
    "description": "Instantly count words, characters, sentences, and estimate reading time.",
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
