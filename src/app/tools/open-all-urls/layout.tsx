import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open All URLs - StartupAI Tools",
  description: "Paste a massive list of website links and instantly open all of them simultaneously in new browser tabs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Open All URLs",
    "description": "Paste a massive list of website links and instantly open all of them simultaneously in new browser tabs.",
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
