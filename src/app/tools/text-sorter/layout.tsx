import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Text Sorter & Line Organizer - StartupAI Tools",
  description: "Sort, shuffle, reverse, and deduplicate lines of text instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
