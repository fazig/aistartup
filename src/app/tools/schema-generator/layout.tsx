import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schema Markup Generator - StartupAI Tools",
  description: "Build fully compliant JSON-LD structured data. Select a schema type below, fill in the fields, and watch the snippet update in real time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
