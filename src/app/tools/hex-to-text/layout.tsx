import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hex to Text Converter - StartupAI Tools",
  description: "Decode hexadecimal character strings back into readable plain text instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hex to Text Converter",
    "description": "Decode hexadecimal character strings back into readable plain text instantly.",
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
