import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Calculator - StartupAI Tools",
  description: "Accurately calculate your daily caloric needs using the Mifflin-St Jeor equation and instantly map out your macro breakdowns for muscle gain, fat loss, or maintenance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
