import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebP to JPG Converter - StartupAI Tools",
  description: "Convert WebP images into high-quality JPEG files. Features a customizable background color picker to replace alpha transparency channels.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
