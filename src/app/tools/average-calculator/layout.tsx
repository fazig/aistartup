import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Average & Statistics Calculator - StartupAI Tools",
  description: "Find the mean, median, mode, standard deviation, and variance for any list of numbers instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Average & Statistics Calculator",
    "description": "Find the mean, median, mode, standard deviation, and variance for any list of numbers instantly.",
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
