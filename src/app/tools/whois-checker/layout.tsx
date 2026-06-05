import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WHOIS Domain Lookup - StartupAI Tools",
  description: "Instantly discover who owns a domain, when it was registered, and when it expires.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
