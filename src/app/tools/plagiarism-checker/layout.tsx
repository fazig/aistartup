import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plagiarism Checker - StartupAI Tools",
  description: "Break down your article into exact-match Google Search queries to easily find stolen or duplicate content across the web.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Plagiarism Checker",
    "description": "Break down your article into exact-match Google Search queries to easily find stolen or duplicate content across the web.",
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
