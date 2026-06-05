import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 to Image Decoder - StartupAI Tools",
  description: "Paste a raw Base64 string to instantly decode it, preview the hidden image, and download the file.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Base64 to Image Decoder",
    "description": "Paste a raw Base64 string to instantly decode it, preview the hidden image, and download the file.",
    "applicationCategory": "DesignApplication",
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
