import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | StartupAI Tools on aitoolspro.tech",
  description:
    "StartupAI Tools is built by Faizan Arif. Learn about our privacy-first free web utilities on aitoolspro.tech.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | StartupAI Tools on aitoolspro.tech",
    description:
      "StartupAI Tools is built by Faizan Arif. Learn about our privacy-first free web utilities on aitoolspro.tech.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | StartupAI Tools on aitoolspro.tech",
    description:
      "StartupAI Tools is built by Faizan Arif. Learn about our privacy-first free web utilities on aitoolspro.tech.",
  },
};

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Faizan Arif",
    url: "https://www.aitoolspro.tech/about",
    sameAs: ["https://github.com/fazig"],
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: "StartupAI Tools",
      url: "https://www.aitoolspro.tech",
    },
  };

  return (
    <div className="container section" style={{ maxWidth: "800px", padding: "4rem 1.5rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <h1
        style={{
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          marginBottom: "2rem",
          fontWeight: 900,
          letterSpacing: "-0.03em",
        }}
      >
        About <span className="text-gradient">StartupAI Tools</span>
      </h1>

      <div
        className="glass-panel"
        style={{
          padding: "3rem",
          borderRadius: "16px",
          border: "1px solid var(--border-light)",
          background: "var(--bg-card)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: 700 }}>Who We Are</h2>
        <p
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.05rem",
            lineHeight: "1.7",
            color: "var(--text-muted)",
          }}
        >
          StartupAI Tools lives at{" "}
          <strong>aitoolspro.tech</strong>. I am Faizan Arif, the founder and
          developer. I build browser-based utilities for developers, writers,
          and marketers — JSON formatters, image converters, QR generators, SEO
          helpers, and a few AI-assisted tools such as ZenNote and the image
          enhancer.
        </p>
        <p
          style={{
            marginBottom: "2rem",
            fontSize: "1.05rem",
            lineHeight: "1.7",
            color: "var(--text-muted)",
          }}
        >
          I started this site because most “free tool” directories were slow,
          full of pop-ups, or forced a signup before you could format a JSON
          file. The goal here is simpler: open a tool, get a result, leave. Most
          processing stays in your browser so your data never hits our servers.
        </p>

        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "1rem",
            fontWeight: 700,
            marginTop: "2rem",
          }}
        >
          How the site is built
        </h2>
        <p
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.05rem",
            lineHeight: "1.7",
            color: "var(--text-muted)",
          }}
        >
          The codebase is Next.js, hosted on Vercel, with source on{" "}
          <a href="https://github.com/fazig/aistartup" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          . I also publish build logs and tutorials from real projects, including
          FaizanKiShop (a desktop shop manager generated with AI) and
          FaizanKiAwaz (a Python voice enhancer).
        </p>
        <ul
          style={{
            paddingLeft: "1.5rem",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            fontSize: "1.05rem",
            lineHeight: "1.6",
            color: "var(--text-muted)",
          }}
        >
          <li>
            <strong>Privacy-first:</strong> converters, formatters, and counters
            run locally in the browser whenever possible.
          </li>
          <li>
            <strong>No account required:</strong> no newsletter wall and no daily
            usage caps on the core utilities.
          </li>
          <li>
            <strong>Documented tools:</strong> popular pages include how-to copy
            and FAQs so you know what the tool does before you paste anything.
          </li>
        </ul>

        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "1rem",
            fontWeight: 700,
            marginTop: "2rem",
          }}
        >
          How we keep it free
        </h2>
        <p
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.05rem",
            lineHeight: "1.7",
            color: "var(--text-muted)",
          }}
        >
          Domain, hosting, and a few third-party APIs (for example LanguageTool
          on the grammar checker) cost money. After Google AdSense approval, ads
          may appear in non-intrusive placements. Ads will not cover buttons or
          block the tool itself. Cookie consent is required before advertising
          cookies are set.
        </p>

        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "1rem",
            fontWeight: 700,
            marginTop: "2rem",
          }}
        >
          Get in touch
        </h2>
        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: "1.7",
            color: "var(--text-muted)",
          }}
        >
          Bug reports, tool ideas, and partnership notes are welcome. I read
          every message and usually reply within 24–48 hours.
        </p>
        <p style={{ fontSize: "1.1rem", marginTop: "1rem" }}>
          Email:{" "}
          <a href="mailto:contact@aitoolspro.tech" style={{ color: "var(--primary)", fontWeight: 700 }}>
            contact@aitoolspro.tech
          </a>
        </p>
        <p style={{ fontSize: "1.05rem", marginTop: "0.75rem" }}>
          <Link href="/contact" style={{ color: "var(--primary)", fontWeight: 600 }}>
            Contact form
          </Link>
        </p>
      </div>
    </div>
  );
}
