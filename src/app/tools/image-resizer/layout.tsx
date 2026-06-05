import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer - StartupAI Tools",
  description: "Resize images to custom width/height dimensions or percentage scales without uploading files to any server.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Resizer",
    "description": "Resize images to custom width/height dimensions or percentage scales without uploading files to any server.",
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
