import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebP to JPG Converter - StartupAI Tools",
  description: "Convert WebP images into high-quality JPEG files. Features a customizable background color picker to replace alpha transparency channels.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WebP to JPG Converter",
    "description": "Convert WebP images into high-quality JPEG files. Features a customizable background color picker to replace alpha transparency channels.",
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
