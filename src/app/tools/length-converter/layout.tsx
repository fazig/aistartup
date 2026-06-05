import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Length Converter - StartupAI Tools",
  description: "Convert between metric and imperial length units instantly. Check conversions for all units in a single click.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
