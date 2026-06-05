import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate Image Tool - StartupAI Tools",
  description: "Rotate your images 90°, 180°, or 270° instantly using local browser processing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Rotate Image Tool",
    "description": "Rotate your images 90°, 180°, or 270° instantly using local browser processing.",
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
