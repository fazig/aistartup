import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pace Converter & Estimator - StartupAI Tools",
  description: "Convert running paces between minutes/km and minutes/mile. View speed equivalents and estimate race finish times.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
