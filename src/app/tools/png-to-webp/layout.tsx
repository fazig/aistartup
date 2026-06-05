import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG to WebP Converter - StartupAI Tools",
  description: "Convert PNG images to optimized, modern WebP files while preserving transparency. Includes quality sliders and lossless compilation toggles.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PNG to WebP Converter",
    "description": "Convert PNG images to optimized, modern WebP files while preserving transparency. Includes quality sliders and lossless compilation toggles.",
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
