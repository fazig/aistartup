import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Background Remover",
  description: "Remove image backgrounds instantly in your browser. 100% free, fully private edge-AI — download as transparent PNG or add vibrant solid colors.",
  alternates: { canonical: "/remove-background" },
  openGraph: {
    title: "Free AI Background Remover",
    description: "Remove image backgrounds instantly in your browser. 100% free and fully private.",
    url: "/remove-background",
  },
  twitter: {
    title: "Free AI Background Remover",
    description: "Remove image backgrounds instantly in your browser. 100% free and fully private.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free AI Background Remover",
    description: "Remove image backgrounds instantly in your browser. 100% free, fully private edge-AI.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
