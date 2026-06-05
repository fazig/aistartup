import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI SEO Meta Title Generator - StartupAI Tools",
  description: "Instantly generate highly clickable, SEO-optimized title tags engineered to maximize your Google Click-Through Rate (CTR).",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI SEO Meta Title Generator",
    "description": "Instantly generate highly clickable, SEO-optimized title tags engineered to maximize your Google Click-Through Rate (CTR).",
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
