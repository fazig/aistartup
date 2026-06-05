import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Rewriting Tool - StartupAI Tools",
  description: "Convert long, ugly dynamic URLs with query parameters into clean, SEO-friendly static URLs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "URL Rewriting Tool",
    "description": "Convert long, ugly dynamic URLs with query parameters into clean, SEO-friendly static URLs.",
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
