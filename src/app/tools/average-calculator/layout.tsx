import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Average & Statistics Calculator - StartupAI Tools",
  description: "Find the mean, median, mode, standard deviation, and variance for any list of numbers instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
