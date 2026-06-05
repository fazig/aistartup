import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader - StartupAI Tools",
  description: "Extract and download the high-resolution thumbnail from any YouTube video instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube Thumbnail Downloader",
    "description": "Extract and download the high-resolution thumbnail from any YouTube video instantly.",
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
