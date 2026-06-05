import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is my Browser? - StartupAI Tools",
  description: "Instantly detect your browser, operating system, and screen specifications.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
