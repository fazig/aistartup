import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Typing Speed Test Online - StartupAI Tools",
  description: "Test your typing speed and accuracy with our free online typing test. Improve your words per minute (WPM) today.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
