import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter - StartupAI Tools",
  description: "Convert text between uppercase, lowercase, camelCase, snake_case, and more in one click.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
