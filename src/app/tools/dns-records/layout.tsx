import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find DNS Records - StartupAI Tools",
  description: "Query Google's Public DNS to instantly check A, CNAME, MX, TXT, and NS records for any domain.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Find DNS Records",
    "description": "Query Google",
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
