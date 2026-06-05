import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder / Decoder - StartupAI Tools",
  description: "Safely encode URL parameters or decode messy web addresses back to plain text.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "URL Encoder / Decoder",
    "description": "Safely encode URL parameters or decode messy web addresses back to plain text.",
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
