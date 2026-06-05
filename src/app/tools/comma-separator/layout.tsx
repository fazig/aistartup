import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comma Separator Tool - StartupAI Tools",
  description: "Convert a list of items into a comma-separated string or split them back out — with tons of separator and formatting options.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Comma Separator Tool",
    "description": "Convert a list of items into a comma-separated string or split them back out — with tons of separator and formatting options.",
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
