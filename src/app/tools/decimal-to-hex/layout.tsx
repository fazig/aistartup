import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decimal to HEX Converter - StartupAI Tools",
  description: "Convert decimal numbers (Base 10) to hexadecimal representation (Base 16) with successive division step tracking.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
