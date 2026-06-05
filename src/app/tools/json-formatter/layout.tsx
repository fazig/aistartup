import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - StartupAI Tools",
  description: "Format, beautify, and validate your JSON data instantly in the browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON Formatter & Validator",
    "description": "Format, beautify, and validate your JSON data instantly in the browser.",
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
