import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binary to Octal Converter - StartupAI Tools",
  description: "Convert binary numbers (Base 2) to octal string values (Base 8) with a detailed triplet grouping visualizer.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Binary to Octal Converter",
    "description": "Convert binary numbers (Base 2) to octal string values (Base 8) with a detailed triplet grouping visualizer.",
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
