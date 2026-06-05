import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Parser & Builder - StartupAI Tools",
  description: "Break down any complex URL into its constituent parts instantly. Edit search queries, hostname, port, or path values, and watch the reconstructed URL update live.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
