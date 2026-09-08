import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Background Remover",
  description: "Use our free AI Background Remover to easily make image backgrounds transparent. Add custom colors and download instantly. Fast, private, and 100% free.",
  alternates: {
    canonical: "/remove-background",
  },
  openGraph: {
    title: "Free AI Background Remover",
    description: "Use our free AI Background Remover to easily make image backgrounds transparent. Add custom colors and download instantly. Fast, private, and 100% free.",
    url: "/remove-background",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Background Remover",
    description: "Use our free AI Background Remover to easily make image backgrounds transparent. Add custom colors and download instantly. Fast, private, and 100% free.",
  },
};

export default function RemoveBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
