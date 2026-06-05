import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Beautifier - StartupAI Tools",
  description: "Clean up messy, minified, or compressed JavaScript files. Format braces, indent loops, and space out operators for clean code.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
