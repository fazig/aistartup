import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UTM Link Builder - StartupAI Tools",
  description: "Build campaign-tracked URLs with UTM parameters. See your link update in real time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
