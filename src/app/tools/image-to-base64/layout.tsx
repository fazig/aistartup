import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to Base64 Converter - StartupAI Tools",
  description: "Instantly convert any JPG, PNG, WEBP, or SVG image file into a Base64 string for direct HTML/CSS embedding.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image to Base64 Converter",
    "description": "Instantly convert any JPG, PNG, WEBP, or SVG image file into a Base64 string for direct HTML/CSS embedding.",
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
