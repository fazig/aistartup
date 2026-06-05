import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beautify HTML! - StartupAI Tools",
  description: "Transform messy, nested, or compressed HTML code into clean, well-spaced, and perfectly indented code instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Beautify HTML!",
    "description": "Transform messy, nested, or compressed HTML code into clean, well-spaced, and perfectly indented code instantly.",
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
