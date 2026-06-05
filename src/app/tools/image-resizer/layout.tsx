import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer - StartupAI Tools",
  description: "Resize images to custom width/height dimensions or percentage scales without uploading files to any server.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
