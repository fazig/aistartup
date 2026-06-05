import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to WebP Converter - StartupAI Tools",
  description: "Convert JPG/JPEG images to modern, highly compressed WebP files. Custom quality settings and lossless compression options are available.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
