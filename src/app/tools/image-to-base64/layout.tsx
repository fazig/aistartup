import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to Base64 Converter - StartupAI Tools",
  description: "Instantly convert any JPG, PNG, WEBP, or SVG image file into a Base64 string for direct HTML/CSS embedding.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
