import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decimal to Binary Converter - StartupAI Tools",
  description: "Convert base-10 decimal integers to binary numbers (Base 2) with a step-by-step division trace.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Decimal to Binary Converter",
    "description": "Convert base-10 decimal integers to binary numbers (Base 2) with a step-by-step division trace.",
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
