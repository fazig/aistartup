import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate Image Tool - StartupAI Tools",
  description: "Rotate your images 90°, 180°, or 270° instantly using local browser processing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
