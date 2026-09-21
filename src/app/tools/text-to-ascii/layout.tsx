import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to ASCII Converter",
  description: "Convert plain text characters into their corresponding decimal ASCII numerical codes instantly.",
  alternates: { canonical: "/tools/text-to-ascii" },
  openGraph: {
    title: "Text to ASCII Converter",
    description: "Convert plain text characters into their corresponding decimal ASCII numerical codes instantly.",
    url: "/tools/text-to-ascii",
  },
  twitter: {
    title: "Text to ASCII Converter",
    description: "Convert plain text characters into their corresponding decimal ASCII numerical codes instantly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text to ASCII Converter",
    "description": "Convert plain text characters into their corresponding decimal ASCII numerical codes instantly.",
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
