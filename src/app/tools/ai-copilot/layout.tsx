import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Copilot Online - StartupAI Tools",
  description: "Use our free online AI Copilot to generate text, fix grammar, and brainstorm ideas instantly. No signup required.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
