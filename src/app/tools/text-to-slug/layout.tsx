import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Slug Converter - StartupAI Tools",
  description: "Instantly transform messy titles and strings into clean, SEO-friendly URL slugs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text to Slug Converter",
    "description": "Instantly transform messy titles and strings into clean, SEO-friendly URL slugs.",
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
