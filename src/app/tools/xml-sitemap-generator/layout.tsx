import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XML Sitemap Generator - StartupAI Tools",
  description: "Instantly generate a valid XML sitemap to submit to Google Search Console for faster indexing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "XML Sitemap Generator",
    "description": "Instantly generate a valid XML sitemap to submit to Google Search Console for faster indexing.",
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
