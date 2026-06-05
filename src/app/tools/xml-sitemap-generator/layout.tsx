import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XML Sitemap Generator - StartupAI Tools",
  description: "Instantly generate a valid XML sitemap to submit to Google Search Console for faster indexing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
