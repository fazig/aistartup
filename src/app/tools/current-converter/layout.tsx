import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Current Converter - StartupAI Tools",
  description: "Convert electric current values between Amperes, Milliamperes, Microamperes, Kiliamperes, Biots, Abamperes, and Statamperes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
