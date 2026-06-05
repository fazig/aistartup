import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decimal to Text Converter - StartupAI Tools",
  description: "Translate a sequence of Unicode decimal values back into readable text characters with immediate safety validations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Decimal to Text Converter",
    "description": "Translate a sequence of Unicode decimal values back into readable text characters with immediate safety validations.",
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
