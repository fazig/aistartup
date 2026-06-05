import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hours Calculator - StartupAI Tools",
  description: "Calculate elapsed time between hours, or compute weekly timesheets and wages instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
