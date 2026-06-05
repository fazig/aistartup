import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Color Picker Tool - StartupAI Tools",
  description: "Visually select any color and instantly get the HTML, CSS HEX, and RGB codes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
