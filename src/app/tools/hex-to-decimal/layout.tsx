import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEX to Decimal Converter - StartupAI Tools",
  description: "Convert hexadecimal numbers (Base 16) to decimal values (Base 10) with an interactive step-by-step guide.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HEX to Decimal Converter",
    "description": "Convert hexadecimal numbers (Base 16) to decimal values (Base 10) with an interactive step-by-step guide.",
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
