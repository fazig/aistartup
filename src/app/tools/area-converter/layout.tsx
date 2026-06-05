import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area Converter - StartupAI Tools",
  description: "Convert between metric and imperial area units including square meters, feet, acres, and hectares.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
