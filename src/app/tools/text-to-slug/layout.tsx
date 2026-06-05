import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Slug Converter - StartupAI Tools",
  description: "Instantly transform messy titles and strings into clean, SEO-friendly URL slugs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
