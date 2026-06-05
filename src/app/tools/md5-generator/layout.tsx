import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online MD5 Hash Generator - StartupAI Tools",
  description: "Generate a secure, 32-character MD5 hash of any string instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
