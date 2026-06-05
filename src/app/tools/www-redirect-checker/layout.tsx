import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WWW Redirect Checker - StartupAI Tools",
  description: "Analyze your domain's server headers to ensure canonical WWW & Non-WWW redirects are properly configured for SEO.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WWW Redirect Checker",
    "description": "Analyze your domain",
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
