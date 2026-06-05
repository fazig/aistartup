import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Line Breaks - StartupAI Tools",
  description: "Strip or replace line breaks from your text. Perfect for cleaning up copied content.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
