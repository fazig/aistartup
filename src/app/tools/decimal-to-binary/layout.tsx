import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decimal to Binary Converter - StartupAI Tools",
  description: "Convert base-10 decimal integers to binary numbers (Base 2) with a step-by-step division trace.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
