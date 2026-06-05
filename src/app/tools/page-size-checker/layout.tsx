import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Page Size Checker - StartupAI Tools",
  description: "Analyze the total HTML byte size of any webpage to optimize load times and improve SEO rankings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
