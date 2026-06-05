import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Probability Calculator - StartupAI Tools",
  description: "Calculate the probability of single and multiple independent events occurring.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
