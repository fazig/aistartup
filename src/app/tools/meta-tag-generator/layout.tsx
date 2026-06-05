import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Tag Generator - StartupAI Tools",
  description: "Create perfectly optimized SEO meta tags for your HTML documents to rank higher on Google.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Meta Tag Generator",
    "description": "Create perfectly optimized SEO meta tags for your HTML documents to rank higher on Google.",
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
