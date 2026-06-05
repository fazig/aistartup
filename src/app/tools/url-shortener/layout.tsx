import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium URL Shortener - StartupAI Tools",
  description: "Instantly transform long, messy URLs into neat, trackable, and brand-friendly short links.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
