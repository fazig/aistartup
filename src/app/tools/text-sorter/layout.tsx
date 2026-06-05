import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Sorter - StartupAI Tools",
  description: "Sort, shuffle, reverse, and deduplicate lines of text instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
