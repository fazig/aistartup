import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Placeholder Generator - StartupAI Tools",
  description: "Instantly generate dummy images with custom dimensions, colors, and text for your web design mockups.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Placeholder Generator",
    "description": "Instantly generate dummy images with custom dimensions, colors, and text for your web design mockups.",
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
