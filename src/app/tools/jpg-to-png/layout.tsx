import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PNG Converter - StartupAI Tools",
  description: "Convert JPG images into high-quality, transparent PNG files in your browser. Includes custom background-color removal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JPG to PNG Converter",
    "description": "Convert JPG images into high-quality, transparent PNG files in your browser. Includes custom background-color removal.",
    "applicationCategory": "DesignApplication",
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
