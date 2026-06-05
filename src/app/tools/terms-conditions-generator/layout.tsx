import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions Generator - StartupAI Tools",
  description: "Instantly create a standard legal agreement for your website to protect your intellectual property and limit your liability.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Terms & Conditions Generator",
    "description": "Instantly create a standard legal agreement for your website to protect your intellectual property and limit your liability.",
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
