import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Word Generator - StartupAI Tools",
  description: "Generate random English words for brainstorming, writing exercises, games, or just for fun.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
