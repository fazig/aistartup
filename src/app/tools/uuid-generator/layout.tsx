import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - StartupAI Tools",
  description: "Generate random UUID v4 identifiers instantly. Bulk create up to 100 at once.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
