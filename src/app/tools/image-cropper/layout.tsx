import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Cropper - StartupAI Tools",
  description: "Crop images using custom coordinate dimensions or standard ratios locally in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
