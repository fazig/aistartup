import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Repeater - StartupAI Tools",
  description: "Repeat any text as many times as you want with custom separators and numbering.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text Repeater",
    "description": "Repeat any text as many times as you want with custom separators and numbering.",
    "applicationCategory": "UtilitiesApplication",
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
