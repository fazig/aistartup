import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domain into IP - StartupAI Tools",
  description: "Instantly resolve any website domain name to discover the underlying IP address of its hosting server.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Domain into IP",
    "description": "Instantly resolve any website domain name to discover the underlying IP address of its hosting server.",
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
