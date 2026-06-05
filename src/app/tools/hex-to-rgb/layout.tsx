import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEX to RGB Converter - StartupAI Tools",
  description: "Instantly convert hexadecimal web colors into standard RGB values for CSS and graphic design.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HEX to RGB Converter",
    "description": "Instantly convert hexadecimal web colors into standard RGB values for CSS and graphic design.",
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
