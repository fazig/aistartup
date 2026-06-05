import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICO to PNG Converter - StartupAI Tools",
  description: "Extract and convert individual frames from an .ico file into transparent PNG images completely in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
