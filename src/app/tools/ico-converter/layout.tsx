import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICO Converter - StartupAI Tools",
  description: "Convert PNG, JPG, or WebP images into real single or multi-resolution Windows ICO files instantly in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ICO Converter",
    "description": "Convert PNG, JPG, or WebP images into real single or multi-resolution Windows ICO files instantly in your browser.",
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
