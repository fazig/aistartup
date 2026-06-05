import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domain into IP - StartupAI Tools",
  description: "Instantly resolve any website domain name to discover the underlying IP address of its hosting server.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
