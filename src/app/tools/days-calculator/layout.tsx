import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Days & Date Calculator - StartupAI Tools",
  description: "Calculate the number of days between two dates, or add/subtract days to find a future or past date.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
