import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Typing Speed Test Online",
  description: "Test your typing speed and accuracy with our free online typing test. Improve your words per minute (WPM) today.",
  alternates: { canonical: "/tools/typing-test" },
  openGraph: {
    title: "Free Typing Speed Test Online",
    description: "Test your typing speed and accuracy with our free online typing test. Improve your words per minute (WPM) today.",
    url: "/tools/typing-test",
  },
  twitter: {
    title: "Free Typing Speed Test Online",
    description: "Test your typing speed and accuracy with our free online typing test. Improve your words per minute (WPM) today.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
