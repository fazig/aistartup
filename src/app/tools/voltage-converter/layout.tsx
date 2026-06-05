import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voltage Converter - StartupAI Tools",
  description: "Convert between Volts, Millivolts, Microvolts, Kilovolts, Megavolts, Statvolts, and Abvolts.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
