import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter - StartupAI Tools",
  description: "Convert text between uppercase, lowercase, camelCase, snake_case, and more in one click.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Case Converter",
    "description": "Convert text between uppercase, lowercase, camelCase, snake_case, and more in one click.",
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
