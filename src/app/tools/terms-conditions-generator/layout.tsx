import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions Generator - StartupAI Tools",
  description: "Instantly create a standard legal agreement for your website to protect your intellectual property and limit your liability.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
