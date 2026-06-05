import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robots.txt Generator - StartupAI Tools",
  description: "Generate a perfectly formatted robots.txt file to control how search engines crawl your website.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Robots.txt Generator",
    "description": "Generate a perfectly formatted robots.txt file to control how search engines crawl your website.",
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
