import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Decoder - StartupAI Tools",
  description: "Instantly decode QR codes from image files or directly through your live device webcam. Everything is processed locally in your browser—no uploads required.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QR Code Decoder",
    "description": "Instantly decode QR codes from image files or directly through your live device webcam. Everything is processed locally in your browser—no uploads required.",
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
