import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Beautifier - StartupAI Tools",
  description: "Transform compact or ugly CSS rules into perfectly formatted, beautifully indented stylesheets instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
