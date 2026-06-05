import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grammarly Free - StartupAI Tools",
  description: "Analyze your texts, correct spelling mistakes, optimize syntax structure, and improve readability with our professional grammar analyzer.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
