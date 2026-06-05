import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - StartupAI Tools",
  description: "Generate placeholder text for your designs, mockups, and layouts instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
