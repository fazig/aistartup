import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Page Size Checker - StartupAI Tools",
  description: "Analyze the total HTML byte size of any webpage to optimize load times and improve SEO rankings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Website Page Size Checker",
    "description": "Analyze the total HTML byte size of any webpage to optimize load times and improve SEO rankings.",
    "applicationCategory": "FinanceApplication",
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
