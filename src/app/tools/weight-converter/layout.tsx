import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weight Converter - StartupAI Tools",
  description: "Convert weight and mass units instantly. Translate between kilograms, pounds, ounces, grams, and carats.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
