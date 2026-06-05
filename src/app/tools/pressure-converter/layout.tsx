import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pressure Converter - StartupAI Tools",
  description: "Convert values between Pascal, Kilopascal, PSI, Bar, Atmosphere, Torr, and more. Visualise equivalents in real time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
