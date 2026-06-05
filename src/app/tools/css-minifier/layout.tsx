import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Minifier - StartupAI Tools",
  description: "Compress and optimize your CSS stylesheet files in real time. Strip comments, spaces, and duplicate rules to speed up page loads.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSS Minifier",
    "description": "Compress and optimize your CSS stylesheet files in real time. Strip comments, spaces, and duplicate rules to speed up page loads.",
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
