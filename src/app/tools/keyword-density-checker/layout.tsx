import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyword Density Checker - StartupAI Tools",
  description: "Analyze your text to prevent keyword stuffing and optimize your SEO content strategy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
