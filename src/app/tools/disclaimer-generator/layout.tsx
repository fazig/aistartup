import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer Generator - StartupAI Tools",
  description: "Create a customized, professional disclaimer statement for your blog, application, or website instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Disclaimer Generator",
    "description": "Create a customized, professional disclaimer statement for your blog, application, or website instantly.",
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
