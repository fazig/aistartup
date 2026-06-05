import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - StartupAI Tools",
  description: "Format, beautify, and validate your JSON data instantly in the browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
