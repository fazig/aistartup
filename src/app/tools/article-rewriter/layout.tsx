import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article Rewriter (Spinbot) - StartupAI Tools",
  description: "Instantly paraphrase and rewrite articles by automatically swapping words with their synonyms.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Article Rewriter (Spinbot)",
    "description": "Instantly paraphrase and rewrite articles by automatically swapping words with their synonyms.",
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
