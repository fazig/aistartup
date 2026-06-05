import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Word & Character Counter - StartupAI Tools",
  description: "Instantly count words, characters, sentences, and estimate reading time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
