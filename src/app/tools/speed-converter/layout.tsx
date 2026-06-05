import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speed Converter - StartupAI Tools",
  description: "Convert velocity values between metric, imperial, maritime, and acoustic units instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Speed Converter",
    "description": "Convert velocity values between metric, imperial, maritime, and acoustic units instantly.",
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
