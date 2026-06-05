import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Link Analyzer - StartupAI Tools",
  description: "Scan any webpage to instantly calculate the exact ratio of Internal vs. External outbound links for SEO auditing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Website Link Analyzer",
    "description": "Scan any webpage to instantly calculate the exact ratio of Internal vs. External outbound links for SEO auditing.",
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
