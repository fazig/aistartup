import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is My IP Address? - StartupAI Tools",
  description: "Instantly discover your public IPv4/IPv6 address, location, and ISP details.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
