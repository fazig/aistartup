import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Octal to Binary Converter - StartupAI Tools",
  description: "Convert octal values (Base 8) to binary numbers (Base 2) with a live visual digit-by-digit mapping representation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Octal to Binary Converter",
    "description": "Convert octal values (Base 8) to binary numbers (Base 2) with a live visual digit-by-digit mapping representation.",
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
