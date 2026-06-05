import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI SEO Meta Description Generator - StartupAI Tools",
  description: "Generate compelling, click-worthy Meta Descriptions perfectly tailored to Google's 160-character limit.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI SEO Meta Description Generator",
    "description": "Generate compelling, click-worthy Meta Descriptions perfectly tailored to Google",
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
