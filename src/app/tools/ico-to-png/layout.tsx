import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICO to PNG Converter - StartupAI Tools",
  description: "Extract and convert individual frames from an .ico file into transparent PNG images completely in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ICO to PNG Converter",
    "description": "Extract and convert individual frames from an .ico file into transparent PNG images completely in your browser.",
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
