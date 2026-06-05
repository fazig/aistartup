import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Beautifier - StartupAI Tools",
  description: "Transform compact or ugly CSS rules into perfectly formatted, beautifully indented stylesheets instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSS Beautifier",
    "description": "Transform compact or ugly CSS rules into perfectly formatted, beautifully indented stylesheets instantly.",
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
