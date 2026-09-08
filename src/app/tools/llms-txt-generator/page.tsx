import type { Metadata } from 'next';
import ClientLlmsTxtGenerator from './ClientLlmsTxtGenerator';

export const metadata: Metadata = {
  title: "Free llms.txt Generator",
  description: "Generate standardized llms.txt and llms-full.txt files to optimize your website for ChatGPT, Perplexity, and AI Overviews. Configure AI search crawler permissions in seconds.",
  keywords: [
    "llms.txt generator",
    "create llms.txt online",
    "generative engine optimization",
    "geo tools 2026",
    "ai robots.txt generator",
    "gptbot allow",
    "perplexitybot allow",
    "optimize website for chatgpt search"
  ],
  alternates: { canonical: "/tools/llms-txt-generator" },
  openGraph: {
    title: "Free llms.txt Generator & AI Bot Configurator",
    description: "Generate standardized llms.txt and llms-full.txt files to optimize your website for ChatGPT, Perplexity, and AI Overviews.",
    url: "/tools/llms-txt-generator",
    type: "website"
  }
};

export default function LlmsTxtGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "llms.txt & AI Bot Generator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free web utility to generate standardized llms.txt files and configure AI web crawlers for Generative Engine Optimization (GEO)."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientLlmsTxtGenerator />
    </>
  );
}
