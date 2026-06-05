import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Password Generator - StartupAI Tools",
  description: "Generate unbreakable, highly-secure passwords locally in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
