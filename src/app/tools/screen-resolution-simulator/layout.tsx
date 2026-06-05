import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webpage Screen Resolution Simulator - StartupAI Tools",
  description: "Instantly test how any website looks across different devices, smartphones, and desktop monitors.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Webpage Screen Resolution Simulator",
    "description": "Instantly test how any website looks across different devices, smartphones, and desktop monitors.",
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
