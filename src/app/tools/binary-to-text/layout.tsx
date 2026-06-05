import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binary to Text Converter - StartupAI Tools",
  description: "Decode binary code (zeros and ones) back into readable English plain text in real-time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Binary to Text Converter",
    "description": "Decode binary code (zeros and ones) back into readable English plain text in real-time.",
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
