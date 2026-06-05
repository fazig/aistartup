import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Enlarger - StartupAI Tools",
  description: "Upscale your images by 2x, 4x, or 8x with custom interpolation methods to keep details sharp or smooth out pixels.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Enlarger",
    "description": "Upscale your images by 2x, 4x, or 8x with custom interpolation methods to keep details sharp or smooth out pixels.",
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
