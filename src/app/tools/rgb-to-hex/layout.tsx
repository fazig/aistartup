import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RGB to Hex Converter - StartupAI Tools",
  description: "Instantly convert RGB color codes into HEX format, or vice-versa.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "RGB to Hex Converter",
    "description": "Instantly convert RGB color codes into HEX format, or vice-versa.",
    "applicationCategory": "DeveloperApplication",
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
