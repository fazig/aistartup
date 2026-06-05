import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Converter - StartupAI Tools",
  description: "Convert between seconds, minutes, hours, days, weeks, months, years, and centuries instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Time Converter",
    "description": "Convert between seconds, minutes, hours, days, weeks, months, years, and centuries instantly.",
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
