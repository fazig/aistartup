import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Placeholder Generator - StartupAI Tools",
  description: "Instantly generate dummy images with custom dimensions, colors, and text for your web design mockups.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
