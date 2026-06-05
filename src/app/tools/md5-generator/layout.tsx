import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online MD5 Hash Generator - StartupAI Tools",
  description: "Generate a secure, 32-character MD5 hash of any string instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Online MD5 Hash Generator",
    "description": "Generate a secure, 32-character MD5 hash of any string instantly.",
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
