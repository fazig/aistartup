import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class C IP Checker - StartupAI Tools",
  description: "Analyze a bulk list of IP addresses to discover which ones share the exact same Class C server subnet.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Class C IP Checker",
    "description": "Analyze a bulk list of IP addresses to discover which ones share the exact same Class C server subnet.",
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
