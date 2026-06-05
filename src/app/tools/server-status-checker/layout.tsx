import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Status Checker - StartupAI Tools",
  description: "Instantly check if a website is online or offline, and analyze its HTTP response codes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
