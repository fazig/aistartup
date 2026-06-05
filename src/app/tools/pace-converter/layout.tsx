import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pace Converter & Estimator - StartupAI Tools",
  description: "Convert running paces between minutes/km and minutes/mile. View speed equivalents and estimate race finish times.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pace Converter & Estimator",
    "description": "Convert running paces between minutes/km and minutes/mile. View speed equivalents and estimate race finish times.",
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
