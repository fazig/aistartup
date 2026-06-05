import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PNG Converter - StartupAI Tools",
  description: "Convert JPG images into high-quality, transparent PNG files in your browser. Includes custom background-color removal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
