import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code to Text Ratio Checker - StartupAI Tools",
  description: "Calculate the percentage of actual human-readable text compared to the raw HTML code on any webpage.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Code to Text Ratio Checker",
    "description": "Calculate the percentage of actual human-readable text compared to the raw HTML code on any webpage.",
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
