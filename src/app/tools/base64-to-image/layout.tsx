import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 to Image Decoder - StartupAI Tools",
  description: "Paste a raw Base64 string to instantly decode it, preview the hidden image, and download the file.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
