import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voltage Converter - StartupAI Tools",
  description: "Convert between Volts, Millivolts, Microvolts, Kilovolts, Megavolts, Statvolts, and Abvolts.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Voltage Converter",
    "description": "Convert between Volts, Millivolts, Microvolts, Kilovolts, Megavolts, Statvolts, and Abvolts.",
    "applicationCategory": "FinanceApplication",
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
