import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Binary Converter - StartupAI Tools",
  description: "Convert plain text into binary code (zeros and ones) instantly in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text to Binary Converter",
    "description": "Convert plain text into binary code (zeros and ones) instantly in your browser.",
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
