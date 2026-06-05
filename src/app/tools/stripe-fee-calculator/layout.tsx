import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stripe Fee Calculator - StartupAI Tools",
  description: "Calculate Stripe processing fees and know exactly how much to invoice to receive your target amount.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Stripe Fee Calculator",
    "description": "Calculate Stripe processing fees and know exactly how much to invoice to receive your target amount.",
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
