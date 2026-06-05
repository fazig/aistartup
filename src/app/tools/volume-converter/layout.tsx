import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volume Converter - StartupAI Tools",
  description: "Convert between liters, gallons, cups, fluid ounces, milliliters, and cubic dimensions instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Volume Converter",
    "description": "Convert between liters, gallons, cups, fluid ounces, milliliters, and cubic dimensions instantly.",
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
