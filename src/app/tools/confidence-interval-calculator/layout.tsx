import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidence Interval Calculator - StartupAI Tools",
  description: "Calculate the confidence interval for your sample mean using T-distribution or Z-distribution. See standard error, critical values, and step-by-step mathematical breakdowns.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
