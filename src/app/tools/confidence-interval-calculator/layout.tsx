import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidence Interval Calculator - StartupAI Tools",
  description: "Calculate the confidence interval for your sample mean using T-distribution or Z-distribution. See standard error, critical values, and step-by-step mathematical breakdowns.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Confidence Interval Calculator",
    "description": "Calculate the confidence interval for your sample mean using T-distribution or Z-distribution. See standard error, critical values, and step-by-step mathematical breakdowns.",
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
