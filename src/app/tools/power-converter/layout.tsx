import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Power Converter - StartupAI Tools",
  description: "Convert horsepower, kilowatts, megawatts, BTU/hr, and more. Compare real-world power scales dynamically.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Power Converter",
    "description": "Convert horsepower, kilowatts, megawatts, BTU/hr, and more. Compare real-world power scales dynamically.",
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
