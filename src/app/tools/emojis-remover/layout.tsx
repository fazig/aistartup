import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emojis Remover Tool - StartupAI Tools",
  description: "Instantly strip all emojis from any block of text to clean it up for professional use.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
