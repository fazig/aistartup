import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decimal to HEX Converter - StartupAI Tools",
  description: "Convert decimal numbers (Base 10) to hexadecimal representation (Base 16) with successive division step tracking.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Decimal to HEX Converter",
    "description": "Convert decimal numbers (Base 10) to hexadecimal representation (Base 16) with successive division step tracking.",
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
