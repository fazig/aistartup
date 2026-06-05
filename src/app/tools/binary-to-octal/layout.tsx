import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binary to Octal Converter - StartupAI Tools",
  description: "Convert binary numbers (Base 2) to octal string values (Base 8) with a detailed triplet grouping visualizer.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
