import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | StartupAI Tools",
  description: "Learn about StartupAI Tools, our mission to build free web developer utilities, and our privacy-first philosophy.",
};

export default function AboutPage() {
  return (
    <div className="container section" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '2rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
        About <span className="text-gradient">StartupAI Tools</span>
      </h1>
      
      <div className="glass-panel" style={{ padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-card)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>Who We Are</h2>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
          Welcome to StartupAI Tools, your premium everyday toolkit for web development, content creation, mathematical calculation, and search engine optimization. We build lightning-fast web utilities designed to solve common, daily bottlenecks for developers, designers, writers, and digital creators.
        </p>
        <p style={{ marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
          Our platform was conceptualized by a small team of software engineers and startup founders who grew tired of "free" utility websites that are bloated with intrusive pop-up ads, redirect loops, and hidden paywalls. We decided to create a clean, modern, and genuinely free alternative that works instantly in your browser.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700, marginTop: '2rem' }}>Our Mission & Values</h2>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
          Our core mission is to democratize access to high-performance, developer-grade tools. We believe that basic operations—such as formatting a JSON file, converting an image to WebP, checking text agreement, or generating a sitemap—should be accessible to anyone without requiring an account, credit card, or software installation.
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
          <li>
            <strong>Privacy-First Processing:</strong> We build tools that process data directly in your browser. Whenever possible, your text, images, and configuration values never leave your computer.
          </li>
          <li>
            <strong>Zero Friction:</strong> No signups, no newsletter requests, and no usage limits. You open the tool, get your result, and copy it.
          </li>
          <li>
            <strong>Speed & Simplicity:</strong> Built on modern Next.js and styled with light, fast CSS, our pages load instantly and respond in milliseconds.
          </li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700, marginTop: '2rem' }}>How We Keep It Free</h2>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
          Maintaining servers, domain names, and APIs requires resources. To keep all 100+ utilities on StartupAI Tools 100% free for everyone, we rely on non-intrusive advertisements (like Google AdSense) and occasional affiliate partner links.
        </p>
        <p style={{ marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
          We hold our advertising placement to strict quality guidelines to ensure that ads never block your workflow, cover interactive buttons, or install cookies without your consent.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700, marginTop: '2rem' }}>Get in Touch</h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
          We are constantly refining our existing tools and building new ones. If you have any suggestions, feedback, bug reports, or partnership proposals, please reach out to us. We read every email and aim to reply within 24–48 hours:
        </p>
        <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
          Email Support: <strong style={{ color: 'var(--primary)' }}>contact@startupai.tech</strong>
        </p>
      </div>
    </div>
  );
}
