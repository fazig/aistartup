import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Status Checker",
  description: "Instantly check if a website is online or offline, and analyze its HTTP response codes.",
  alternates: { canonical: "/tools/server-status-checker" },
  openGraph: {
    title: "Server Status Checker",
    description: "Instantly check if a website is online or offline, and analyze its HTTP response codes.",
    url: "/tools/server-status-checker",
  },
  twitter: {
    title: "Server Status Checker",
    description: "Instantly check if a website is online or offline, and analyze its HTTP response codes.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Server Status Checker",
    "description": "Instantly check if a website is online or offline, and analyze its HTTP response codes.",
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
