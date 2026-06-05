import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code to Text Ratio Checker - StartupAI Tools",
  description: "Calculate the percentage of actual human-readable text compared to the raw HTML code on any webpage.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
