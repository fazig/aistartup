import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TDEE Calculator - StartupAI Tools",
  description: "Find your Total Daily Energy Expenditure (TDEE) using Mifflin-St Jeor or Katch-McArdle formulas. Check your BMI, estimate ideal body weight, and design a custom macronutrient plan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TDEE Calculator",
    "description": "Find your Total Daily Energy Expenditure (TDEE) using Mifflin-St Jeor or Katch-McArdle formulas. Check your BMI, estimate ideal body weight, and design a custom macronutrient plan.",
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
