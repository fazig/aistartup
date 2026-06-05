import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Octal to Binary Converter - StartupAI Tools",
  description: "Convert octal values (Base 8) to binary numbers (Base 2) with a live visual digit-by-digit mapping representation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
