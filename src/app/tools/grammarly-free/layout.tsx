import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grammarly Free - StartupAI Tools",
  description: "Analyze your texts, correct spelling mistakes, optimize syntax structure, and improve readability with our professional grammar analyzer.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Grammarly Free",
    "description": "Analyze your texts, correct spelling mistakes, optimize syntax structure, and improve readability with our professional grammar analyzer.",
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
