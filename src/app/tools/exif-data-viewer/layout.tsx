import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EXIF Data Viewer - StartupAI Tools",
  description: "Extract and read the hidden metadata (camera settings, date, GPS location) secretly embedded inside your photos.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EXIF Data Viewer",
    "description": "Extract and read the hidden metadata (camera settings, date, GPS location) secretly embedded inside your photos.",
    "applicationCategory": "DesignApplication",
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
