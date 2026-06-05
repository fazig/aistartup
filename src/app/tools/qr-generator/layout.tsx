import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator - StartupAI Tools",
  description: "Instantly generate high-quality QR codes for URLs, text, or contact info.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
