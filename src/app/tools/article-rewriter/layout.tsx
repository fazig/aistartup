import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article Rewriter (Spinbot) - StartupAI Tools",
  description: "Instantly paraphrase and rewrite articles by automatically swapping words with their synonyms.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
