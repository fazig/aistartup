import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WHOIS Domain Lookup - StartupAI Tools",
  description: "Instantly discover who owns a domain, when it was registered, and when it expires.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WHOIS Domain Lookup",
    "description": "Instantly discover who owns a domain, when it was registered, and when it expires.",
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
