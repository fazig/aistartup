import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binary to Decimal Converter - StartupAI Tools",
  description: "Convert binary numbers (Base 2) to decimal numbers (Base 10) with detailed mathematical explanations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
