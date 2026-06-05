import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Current Converter - StartupAI Tools",
  description: "Convert electric current values between Amperes, Milliamperes, Microamperes, Kiliamperes, Biots, Abamperes, and Statamperes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Current Converter",
    "description": "Convert electric current values between Amperes, Milliamperes, Microamperes, Kiliamperes, Biots, Abamperes, and Statamperes.",
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
