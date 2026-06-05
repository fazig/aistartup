import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Calculator - StartupAI Tools",
  description: "Accurately calculate your daily caloric needs using the Mifflin-St Jeor equation and instantly map out your macro breakdowns for muscle gain, fat loss, or maintenance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Calorie Calculator",
    "description": "Accurately calculate your daily caloric needs using the Mifflin-St Jeor equation and instantly map out your macro breakdowns for muscle gain, fat loss, or maintenance.",
    "applicationCategory": "FinanceApplication",
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
