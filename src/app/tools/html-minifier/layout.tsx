import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to the Sumo Page - StartupAI Tools",
  description: "Compress and optimize your HTML source code in real time. Strip comments, collapse whitespace, and track byte savings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Welcome to the Sumo Page",
    "description": "Compress and optimize your HTML source code in real time. Strip comments, collapse whitespace, and track byte savings.",
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
