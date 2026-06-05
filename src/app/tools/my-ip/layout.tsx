import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is My IP Address? - StartupAI Tools",
  description: "Instantly discover your public IPv4/IPv6 address, location, and ISP details.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "What is My IP Address?",
    "description": "Instantly discover your public IPv4/IPv6 address, location, and ISP details.",
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
