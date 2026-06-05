import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temperature Converter - StartupAI Tools",
  description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin with step-by-step mathematical formulas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Temperature Converter",
    "description": "Convert temperatures between Celsius, Fahrenheit, and Kelvin with step-by-step mathematical formulas.",
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
