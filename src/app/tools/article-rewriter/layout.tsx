import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Article Rewriter & Spinbot Alternative (100% Free Paraphrasing Tool)",
  description: "Free online article rewriter and Spinbot alternative. Instantly paraphrase essays, rewrite articles, and rephrase text with intelligent synonym matching. No limits, 100% free.",
  alternates: {
    canonical: "/tools/article-rewriter",
  },
  openGraph: {
    title: "Free Article Rewriter & Spinbot Alternative",
    description: "Instantly paraphrase essays, rewrite articles, and rephrase text for free.",
    url: "/tools/article-rewriter",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Article Rewriter (Spinbot)",
    "description": "Instantly paraphrase and rewrite articles by automatically swapping words with their synonyms.",
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
