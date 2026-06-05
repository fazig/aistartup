import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG to JPG Converter - StartupAI Tools",
  description: "Convert transparent PNG files into high-quality JPEG images. Select a custom background color to fill the alpha transparency.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
