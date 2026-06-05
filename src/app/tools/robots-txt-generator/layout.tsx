import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robots.txt Generator - StartupAI Tools",
  description: "Generate a perfectly formatted robots.txt file to control how search engines crawl your website.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
