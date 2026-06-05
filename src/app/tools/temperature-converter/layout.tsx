import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temperature Converter - StartupAI Tools",
  description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin with step-by-step mathematical formulas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
