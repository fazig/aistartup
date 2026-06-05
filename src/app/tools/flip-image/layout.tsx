import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flip Image Tool - StartupAI Tools",
  description: "Mirror your images vertically or horizontally instantly right in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
