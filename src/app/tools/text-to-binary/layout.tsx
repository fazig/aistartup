import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Binary Converter - StartupAI Tools",
  description: "Convert plain text into binary code (zeros and ones) instantly in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
