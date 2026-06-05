import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ".htaccess Redirect Generator - StartupAI Tools",
  description: "Instantly generate Apache server redirect rules to safely move your web pages without losing SEO rankings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": ".htaccess Redirect Generator",
    "description": "Instantly generate Apache server redirect rules to safely move your web pages without losing SEO rankings.",
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
