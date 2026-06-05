import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Minifier - StartupAI Tools",
  description: "Compress and optimize your CSS stylesheet files in real time. Strip comments, spaces, and duplicate rules to speed up page loads.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
