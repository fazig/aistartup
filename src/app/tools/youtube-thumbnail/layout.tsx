import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader - StartupAI Tools",
  description: "Extract and download the high-resolution thumbnail from any YouTube video instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
