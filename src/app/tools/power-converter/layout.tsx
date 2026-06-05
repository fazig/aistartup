import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Power Converter - StartupAI Tools",
  description: "Convert horsepower, kilowatts, megawatts, BTU/hr, and more. Compare real-world power scales dynamically.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
