import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class C IP Checker - StartupAI Tools",
  description: "Analyze a bulk list of IP addresses to discover which ones share the exact same Class C server subnet.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
