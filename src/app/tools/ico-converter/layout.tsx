import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICO Converter - StartupAI Tools",
  description: "Convert PNG, JPG, or WebP images into real single or multi-resolution Windows ICO files instantly in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
