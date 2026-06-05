import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG to WebP Converter - StartupAI Tools",
  description: "Convert PNG images to optimized, modern WebP files while preserving transparency. Includes quality sliders and lossless compilation toggles.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
