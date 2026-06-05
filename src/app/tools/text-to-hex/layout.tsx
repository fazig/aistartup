import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Hex Converter - StartupAI Tools",
  description: "Convert plain text strings into hexadecimal codes. Perfect for developers working with raw buffers and encodings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text to Hex Converter",
    "description": "Convert plain text strings into hexadecimal codes. Perfect for developers working with raw buffers and encodings.",
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
