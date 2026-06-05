import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UTM Link Builder - StartupAI Tools",
  description: "Build campaign-tracked URLs with UTM parameters. See your link update in real time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "UTM Link Builder",
    "description": "Build campaign-tracked URLs with UTM parameters. See your link update in real time.",
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
