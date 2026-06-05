import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Source Code of Webpage - StartupAI Tools",
  description: "Instantly extract and view the raw HTML source code of any URL on the internet.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Get Source Code of Webpage",
    "description": "Instantly extract and view the raw HTML source code of any URL on the internet.",
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
