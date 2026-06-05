import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Repeater - StartupAI Tools",
  description: "Repeat any text as many times as you want with custom separators and numbering.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
