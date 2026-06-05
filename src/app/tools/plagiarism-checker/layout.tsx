import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plagiarism Checker - StartupAI Tools",
  description: "Break down your article into exact-match Google Search queries to easily find stolen or duplicate content across the web.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
