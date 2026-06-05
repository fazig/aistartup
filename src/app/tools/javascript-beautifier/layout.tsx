import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Beautifier - StartupAI Tools",
  description: "Clean up messy, minified, or compressed JavaScript files. Format braces, indent loops, and space out operators for clean code.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JavaScript Beautifier",
    "description": "Clean up messy, minified, or compressed JavaScript files. Format braces, indent loops, and space out operators for clean code.",
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
