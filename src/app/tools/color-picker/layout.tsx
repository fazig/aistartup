import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Color Picker Tool - StartupAI Tools",
  description: "Visually select any color and instantly get the HTML, CSS HEX, and RGB codes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HTML Color Picker Tool",
    "description": "Visually select any color and instantly get the HTML, CSS HEX, and RGB codes.",
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
