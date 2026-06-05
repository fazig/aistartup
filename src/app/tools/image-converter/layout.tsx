import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Converter - StartupAI Tools",
  description: "Convert images between WebP, PNG, JPEG, and BMP formats instantly inside your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Converter",
    "description": "Convert images between WebP, PNG, JPEG, and BMP formats instantly inside your browser.",
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
