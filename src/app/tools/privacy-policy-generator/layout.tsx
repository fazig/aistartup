import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy Generator - StartupAI Tools",
  description: "Instantly generate a basic privacy policy for your website, blog, or app to comply with AdSense and app store requirements.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Privacy Policy Generator",
    "description": "Instantly generate a basic privacy policy for your website, blog, or app to comply with AdSense and app store requirements.",
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
