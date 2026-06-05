import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webpage Screen Resolution Simulator - StartupAI Tools",
  description: "Instantly test how any website looks across different devices, smartphones, and desktop monitors.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
