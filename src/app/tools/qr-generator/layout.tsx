import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator - StartupAI Tools",
  description: "Instantly generate high-quality QR codes for URLs, text, or contact info.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free QR Code Generator",
    "description": "Instantly generate high-quality QR codes for URLs, text, or contact info.",
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
