import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyword Density Checker - StartupAI Tools",
  description: "Analyze your text to prevent keyword stuffing and optimize your SEO content strategy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Keyword Density Checker",
    "description": "Analyze your text to prevent keyword stuffing and optimize your SEO content strategy.",
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
