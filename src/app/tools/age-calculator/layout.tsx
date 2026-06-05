import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - StartupAI Tools",
  description: "Find out your exact age in years, months, days, hours, and minutes — plus your zodiac sign, birth day, and next birthday countdown.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
