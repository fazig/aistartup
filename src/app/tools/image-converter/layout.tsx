import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Converter - StartupAI Tools",
  description: "Convert images between WebP, PNG, JPEG, and BMP formats instantly inside your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
