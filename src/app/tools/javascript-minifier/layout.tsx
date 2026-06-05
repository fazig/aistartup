import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Minifier - StartupAI Tools",
  description: "Compress your scripts in real time. Remove comments, spaces, and line breaks to minimize asset files and load pages instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JavaScript Minifier",
    "description": "Compress your scripts in real time. Remove comments, spaces, and line breaks to minimize asset files and load pages instantly.",
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
