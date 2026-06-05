import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium URL Shortener - StartupAI Tools",
  description: "Instantly transform long, messy URLs into neat, trackable, and brand-friendly short links.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Premium URL Shortener",
    "description": "Instantly transform long, messy URLs into neat, trackable, and brand-friendly short links.",
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
