import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to the Sumo Page - StartupAI Tools",
  description: "Compress and optimize your HTML source code in real time. Strip comments, collapse whitespace, and track byte savings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
