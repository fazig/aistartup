import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Decimal Converter - StartupAI Tools",
  description: "Convert plain text characters to their Unicode decimal code point values, with detailed tables and copy options.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
