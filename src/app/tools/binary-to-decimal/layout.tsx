import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binary to Decimal Converter - StartupAI Tools",
  description: "Convert binary numbers (Base 2) to decimal numbers (Base 10) with detailed mathematical explanations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Binary to Decimal Converter",
    "description": "Convert binary numbers (Base 2) to decimal numbers (Base 10) with detailed mathematical explanations.",
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
