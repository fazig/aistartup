import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript Minifier - StartupAI Tools",
  description: "Compress your scripts in real time. Remove comments, spaces, and line breaks to minimize asset files and load pages instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
