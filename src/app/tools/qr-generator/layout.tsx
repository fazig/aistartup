import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator & Micro QR Maker - High Quality Barcodes",
  description: "Free online QR code generator and Micro QR maker. Create standard and small-size QR codes for URLs, contact cards, text, and WiFi. Free instant high-res PNG download.",
  alternates: {
    canonical: "/tools/qr-generator",
  },
  openGraph: {
    title: "Free QR Code Generator & Micro QR Maker | StartupAI Tools",
    description: "Generate standard and micro QR codes for URLs, WiFi, and contact info.",
    url: "/tools/qr-generator",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free QR Code Generator",
    "description": "Instantly generate high-quality QR codes for URLs, text, or contact info.",
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
