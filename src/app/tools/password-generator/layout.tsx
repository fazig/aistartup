import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Password Generator - StartupAI Tools",
  description: "Generate unbreakable, highly-secure passwords locally in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Secure Password Generator",
    "description": "Generate unbreakable, highly-secure passwords locally in your browser.",
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
