import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdSense Approval Probability Checker - StartupAI Tools",
  description: "Run an instant, multi-point diagnostic check to evaluate content depth, security parameters, legal policy pages, and technical crawlability.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AdSense Approval Probability Checker",
    "description": "Run an instant, multi-point diagnostic check to evaluate content depth, security parameters, legal policy pages, and technical crawlability.",
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
