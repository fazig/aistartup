import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pressure Converter - StartupAI Tools",
  description: "Convert values between Pascal, Kilopascal, PSI, Bar, Atmosphere, Torr, and more. Visualise equivalents in real time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pressure Converter",
    "description": "Convert values between Pascal, Kilopascal, PSI, Bar, Atmosphere, Torr, and more. Visualise equivalents in real time.",
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
