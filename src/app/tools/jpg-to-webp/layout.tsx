import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to WebP Converter - StartupAI Tools",
  description: "Convert JPG/JPEG images to modern, highly compressed WebP files. Custom quality settings and lossless compression options are available.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JPG to WebP Converter",
    "description": "Convert JPG/JPEG images to modern, highly compressed WebP files. Custom quality settings and lossless compression options are available.",
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
