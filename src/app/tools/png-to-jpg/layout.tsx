import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG to JPG Converter - StartupAI Tools",
  description: "Convert transparent PNG files into high-quality JPEG images. Select a custom background color to fill the alpha transparency.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PNG to JPG Converter",
    "description": "Convert transparent PNG files into high-quality JPEG images. Select a custom background color to fill the alpha transparency.",
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
