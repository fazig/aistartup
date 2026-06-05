import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Converter - StartupAI Tools",
  description: "Convert between seconds, minutes, hours, days, weeks, months, years, and centuries instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
