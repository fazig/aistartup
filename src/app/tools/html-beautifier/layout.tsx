import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beautify HTML! - StartupAI Tools",
  description: "Transform messy, nested, or compressed HTML code into clean, well-spaced, and perfectly indented code instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
