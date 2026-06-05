import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - StartupAI Tools",
  description: "Three calculation modes to solve any percentage problem — results update instantly as you type.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
