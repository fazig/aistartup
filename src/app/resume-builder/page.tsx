import type { Metadata } from "next";
import Link from "next/link";
import SaasProductWorkspace from "./components/SaasProductWorkspace";
import {
  Sparkles,
  FileText,
  ShieldCheck,
  Download,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Award,
  Layers,
  BarChart3,
  Cpu
} from "lucide-react";
import "./resume-saas.css";

export const metadata: Metadata = {
  title: "ResumeCraft AI Studio | 100% Free Canva-Style ATS Resume Builder",
  description:
    "The intelligent, free SaaS resume builder. 10 recruiter-approved archetypes, live ATS score analyzer, power verbs assistant, 1-click career presets, and vector PDF exports with zero watermarks.",
  keywords:
    "free resume builder, canva resume template, ats resume checker, online cv maker, professional resume generator, resume saas, vector pdf resume, tech resume template",
  alternates: {
    canonical: "/resume-builder",
  },
  openGraph: {
    title: "ResumeCraft AI Studio | 100% Free Canva-Style ATS Resume Builder",
    description:
      "Design interview-winning resumes with 10 designer archetypes, live ATS score checking, and instant vector PDF export. 100% free with zero watermarks.",
    url: "/resume-builder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeCraft AI Studio | Free Canva-Style ATS Resume Builder",
    description:
      "Craft ATS-friendly, professional resumes with 10 designer archetypes. 100% free vector PDF export with zero watermarks.",
  },
};

export default function StandaloneResumeBuilderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ResumeCraft AI Studio by StartupAI",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All modern web browsers",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description":
          "A free standalone SaaS resume builder featuring 10 designer templates, live ATS scoring, power verb suggestions, customizable palettes, and instant vector PDF export without watermarks or registration.",
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is ResumeCraft AI Studio 100% free with no watermark?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ResumeCraft AI Studio is a flagship utility built directly into StartupAI. There are no locked templates, no forced subscription paywalls, no trial limits, and no watermarks on your exported PDF resumes.",
            },
          },
          {
            "@type": "Question",
            "name": "How does the real-time ATS Score Meter work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our client-side ATS analysis engine scans your resume against the algorithms used by Greenhouse, Lever, Workday, and Taleo. It checks contact completeness, summary length, quantified metrics ($ / % / numbers), action verb density, and skill categorization.",
            },
          },
          {
            "@type": "Question",
            "name": "Is my confidential career history stored on any servers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Never. All resume data is stored exclusively in your browser's local cache (localStorage). You can also download a lightweight JSON backup and restore it whenever you switch computers.",
            },
          },
          {
            "@type": "Question",
            "name": "How do I get the cleanest vector PDF without browser margins?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When you click 'Download Vector PDF', your browser's print dialog opens. Ensure 'Headers and Footers' is unchecked and 'Background Graphics' is checked. Our CSS print engine isolates the sheet to exact millimetric A4 or US Letter dimensions.",
            },
          },
        ],
      },
    ],
  };

  const templatesList = [
    { id: "modern", name: "Modern Pillar", category: "Universal", desc: "Single-column format with vibrant headers, colored section dividers, and pill badges. The #1 universal recruiter choice." },
    { id: "executive", name: "Executive Split", category: "Leadership", desc: "Corporate 2-column layout with dark sidebar for skills and credentials, paired with an executive impact timeline." },
    { id: "minimalist", name: "Minimalist ATS", category: "ATS Safe", desc: "Monochrome, high-contrast typography engineered for 100% parsing accuracy across Greenhouse, Lever, and Workday." },
    { id: "tech", name: "Developer Grid", category: "Engineering", desc: "Crafted specifically for software engineers, showcasing GitHub links, terminal prompts, and categorized tech stacks." },
    { id: "creative", name: "Creative Accent", category: "Design & Product", desc: "Vibrant top banner with sophisticated typography pairing, tailored for product designers and brand marketers." },
    { id: "academic", name: "Harvard Classic", category: "Academic & Legal", desc: "Traditional academic serif layout with horizontal separator rules, centered header, and publication-ready elegance." },
    { id: "nordic", name: "Nordic Clean", category: "Minimalist", desc: "Scandinavian aesthetic with airy margins, subtle date metadata, and optional circular photo avatar." },
    { id: "split", name: "Sidebar Studio", category: "Multi-Role", desc: "Balanced 35/65 asymmetric split ideal for consultants, product managers, and hybrid multidisciplinary roles." },
    { id: "compact", name: "Compact One-Page", category: "1-Page Fit", desc: "Engineered with optimized spacing density to fit 10+ years of dense career milestones onto a single page." },
    { id: "timeline", name: "Career Timeline", category: "Milestones", desc: "Visual chronological career track with connecting vertical markers along your experience path." }
  ];

  return (
    <div className="saas-body-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. DEDICATED SAAS NAVBAR */}
      <header className="saas-nav">
        <div className="saas-nav-container">
          {/* Logo / Brand */}
          <Link href="/resume-builder" className="saas-nav-brand">
            <div className="saas-nav-logo">
              <FileText size={20} />
            </div>
            <div>
              <div className="saas-nav-title">
                ResumeCraft <span style={{ color: "var(--saas-primary)" }}>AI</span>
                <span className="saas-nav-badge">Free SaaS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="saas-nav-links">
            <a href="#templates" className="saas-nav-link">Templates</a>
            <a href="#studio" className="saas-nav-link">SaaS Workspace</a>
            <a href="#ats-engine" className="saas-nav-link">ATS Checker</a>
            <a href="#how-it-works" className="saas-nav-link">How It Works</a>
            <a href="#faq" className="saas-nav-link">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="saas-nav-actions">
            <Link
              href="/tools"
              className="saas-btn saas-btn-ghost"
              style={{ fontSize: "0.8rem" }}
            >
              ← All Tools
            </Link>
            <a
              href="#studio"
              className="saas-btn saas-btn-primary"
            >
              <Sparkles size={14} /> Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* 2. SAAS HERO SECTION */}
      <section className="saas-hero">
        <div className="saas-hero-container">
          <div className="saas-hero-eyebrow">
            <Sparkles size={14} /> 100% Free Standalone SaaS Resume Studio • Zero Watermarks
          </div>

          <h1 className="saas-hero-title">
            The Intelligent Resume Studio That <em>Gets You Hired</em>.
          </h1>

          <p className="saas-hero-desc">
            Build ATS-compliant, recruiter-approved resumes in minutes. Choose from 10 designer archetypes, monitor your live ATS readiness score, craft bullets with power verbs, and export razor-sharp vector PDFs with zero sign-up.
          </p>

          <div className="saas-hero-ctas">
            <a href="#studio" className="saas-btn saas-btn-primary" style={{ padding: "0.75rem 1.75rem", fontSize: "0.95rem" }}>
              <Zap size={16} /> Build My Resume Free
            </a>
            <a href="#templates" className="saas-btn saas-btn-secondary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.95rem" }}>
              Explore 10 Archetypes <ArrowRight size={15} />
            </a>
          </div>

          {/* Trust Metrics Strip */}
          <div className="saas-hero-stats">
            <div className="saas-stat-item">
              <span className="saas-stat-val">10</span>
              <span className="saas-stat-lbl">Designer Archetypes</span>
            </div>
            <div className="saas-stat-item">
              <span className="saas-stat-val">100%</span>
              <span className="saas-stat-lbl">Vector PDF Quality</span>
            </div>
            <div className="saas-stat-item">
              <span className="saas-stat-val">$0</span>
              <span className="saas-stat-lbl">Free Forever</span>
            </div>
            <div className="saas-stat-item">
              <span className="saas-stat-val">0</span>
              <span className="saas-stat-lbl">Watermarks or Ads</span>
            </div>
            <div className="saas-stat-item">
              <span className="saas-stat-val">Local</span>
              <span className="saas-stat-lbl">100% Client-Side Privacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 10-TEMPLATE SHOWCASE */}
      <section id="templates" className="saas-section">
        <div className="saas-section-head">
          <div style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--saas-primary)", fontWeight: 700 }}>
            Curated Visual Gallery
          </div>
          <h2 className="saas-section-title">10 Recruiter-Approved Resume Archetypes</h2>
          <p className="saas-section-desc">
            Whether you are applying to Fortune 500 enterprises, high-growth AI startups, or creative studios, each archetype is engineered for maximum readability and ATS compliance.
          </p>
        </div>

        <div className="saas-templates-grid">
          {templatesList.map(t => (
            <div key={t.id} className="saas-tcard">
              <div>
                <div className="saas-tcard-top">
                  <span className="saas-tcard-name">{t.name}</span>
                  <span className="saas-nav-badge">{t.category}</span>
                </div>
                <p className="saas-tcard-desc">{t.desc}</p>
              </div>

              <div className="saas-tcard-foot">
                <span style={{ fontSize: "0.72rem", color: "var(--saas-text-subtle)" }}>Vector PDF Ready</span>
                <a
                  href="#studio"
                  className="saas-btn saas-btn-secondary"
                  style={{ padding: "0.3rem 0.75rem", fontSize: "0.72rem" }}
                >
                  Use Template →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FULL-FLEDGED SAAS WORKSPACE (STUDIO, DASHBOARD, JOB MATCHER, COVER LETTER) */}
      <section id="studio" style={{ padding: "0", margin: "0" }}>
        <SaasProductWorkspace />
      </section>

      {/* 5. ATS SCORING ENGINE DEEP DIVE */}
      <section id="ats-engine" className="saas-section">
        <div className="saas-section-head">
          <div style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--saas-accent)", fontWeight: 700 }}>
            Algorithmic Advantage
          </div>
          <h2 className="saas-section-title">Built-In Real-Time ATS Score Engine</h2>
          <p className="saas-section-desc">
            Over 98% of Fortune 500 companies use Applicant Tracking Systems (ATS) like Greenhouse, Lever, and Workday. Our live score meter grades your resume across 6 critical evaluation pillars before you apply.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.5rem" }}>
          <div className="saas-card" style={{ padding: "1.5rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(16, 185, 129, 0.12)", color: "var(--saas-primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
              <Target size={20} />
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.5rem 0" }}>Google XYZ Formula Scoring</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--saas-text-muted)", lineHeight: 1.5, margin: 0 }}>
              The engine automatically detects quantified metrics ($ revenue, % efficiency, or # scale) in your accomplishment bullets. Resumes with numbers pass human review 4x more often.
            </p>
          </div>

          <div className="saas-card" style={{ padding: "1.5rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(59, 130, 246, 0.12)", color: "var(--saas-accent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
              <Zap size={20} />
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.5rem 0" }}>Power Action Verbs Analysis</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--saas-text-muted)", lineHeight: 1.5, margin: 0 }}>
              Passive phrases like &quot;responsible for&quot; kill candidate interest. Our live assistant flags weak verbs and offers 1-click power action replacements like &quot;Spearheaded&quot;, &quot;Architected&quot;, and &quot;Accelerated&quot;.
            </p>
          </div>

          <div className="saas-card" style={{ padding: "1.5rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(139, 92, 246, 0.12)", color: "var(--saas-purple)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
              <ShieldCheck size={20} />
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.5rem 0" }}>Zero Unparseable Tables</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--saas-text-muted)", lineHeight: 1.5, margin: 0 }}>
              Many Canva templates break because ATS scanners cannot parse complex multi-layer graphic boxes. All 10 of our archetypes follow semantic HTML hierarchy for flawless algorithmic parsing.
            </p>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section id="how-it-works" className="saas-section" style={{ borderTop: "1px solid var(--saas-border)" }}>
        <div className="saas-section-head">
          <div style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--saas-primary)", fontWeight: 700 }}>
            Workflow
          </div>
          <h2 className="saas-section-title">How It Works in 3 Easy Steps</h2>
          <p className="saas-section-desc">
            No signup forms. No credit card traps. Build your dream resume in less than 5 minutes.
          </p>
        </div>

        <div className="saas-steps-grid">
          <div className="saas-step-card">
            <div className="saas-step-num">1</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>Select an Archetype or Preset</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--saas-text-muted)", lineHeight: 1.6, margin: 0 }}>
              Pick from 10 recruiter-tested templates. Optionally click a 1-click career preset (Senior Engineer, Product Manager, or Growth Marketer) to see a complete benchmark profile instantly.
            </p>
          </div>

          <div className="saas-step-card">
            <div className="saas-step-num">2</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>Customize Content & Boost ATS Score</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--saas-text-muted)", lineHeight: 1.6, margin: 0 }}>
              Fill in your experience with dynamic bullets, inject power action verbs, adjust color palettes and typography pairings, and watch your ATS score climb past 85+.
            </p>
          </div>

          <div className="saas-step-card">
            <div className="saas-step-num">3</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>Export Razor-Sharp Vector PDF</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--saas-text-muted)", lineHeight: 1.6, margin: 0 }}>
              Click Download PDF for instantaneous vector output without watermarks or pixelated canvas blur. Save a JSON backup to restore your resume on any device at any time.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="saas-section" style={{ borderTop: "1px solid var(--saas-border)" }}>
        <div className="saas-section-head">
          <div style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--saas-accent)", fontWeight: 700 }}>
            Got Questions?
          </div>
          <h2 className="saas-section-title">Frequently Asked Questions</h2>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <details className="saas-card" style={{ cursor: "pointer" }}>
            <summary style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
              <span>Is ResumeCraft AI Studio truly 100% free with no watermarks?</span>
              <span style={{ color: "var(--saas-primary)" }}>↓</span>
            </summary>
            <p style={{ fontSize: "0.82rem", color: "var(--saas-text-muted)", lineHeight: 1.6, marginTop: "0.75rem", margin: "0.75rem 0 0 0" }}>
              Yes! ResumeCraft AI Studio is a free flagship SaaS utility built by StartupAI. When you click Download PDF, your resume exports as a crisp, razor-sharp vector document with zero watermarks, zero locked features, and no credit card or account required.
            </p>
          </details>

          <details className="saas-card" style={{ cursor: "pointer" }}>
            <summary style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
              <span>How do I export my resume as a PDF without margins or website headers?</span>
              <span style={{ color: "var(--saas-primary)" }}>↓</span>
            </summary>
            <p style={{ fontSize: "0.82rem", color: "var(--saas-text-muted)", lineHeight: 1.6, marginTop: "0.75rem", margin: "0.75rem 0 0 0" }}>
              When you click &quot;Download Vector PDF&quot;, your browser&apos;s native print dialog will open. Under <em>More Settings</em>, ensure <strong>Headers and Footers</strong> is unchecked and <strong>Background Graphics</strong> is checked. Our built-in print engine isolates your resume sheet to exact millimetric A4 or US Letter dimensions.
            </p>
          </details>

          <details className="saas-card" style={{ cursor: "pointer" }}>
            <summary style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
              <span>Is my confidential career history stored on any servers?</span>
              <span style={{ color: "var(--saas-primary)" }}>↓</span>
            </summary>
            <p style={{ fontSize: "0.82rem", color: "var(--saas-text-muted)", lineHeight: 1.6, marginTop: "0.75rem", margin: "0.75rem 0 0 0" }}>
              Never. All resume content and style preferences are saved directly to your local browser storage (localStorage). You can also export and import your resume as a JSON backup file at any time.
            </p>
          </details>

          <details className="saas-card" style={{ cursor: "pointer" }}>
            <summary style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
              <span>Can I customize the colors, typography, and paper formats?</span>
              <span style={{ color: "var(--saas-primary)" }}>↓</span>
            </summary>
            <p style={{ fontSize: "0.82rem", color: "var(--saas-text-muted)", lineHeight: 1.6, marginTop: "0.75rem", margin: "0.75rem 0 0 0" }}>
              Yes. You can choose between 10 hand-curated color presets or input any custom hex code. You can also pick from 4 typography pairings (Modern Sans, Executive Serif, Clean Tech, and Editorial Prestige) and choose between standard International A4 and US Letter sizes.
            </p>
          </details>
        </div>
      </section>

      {/* 8. DEDICATED SAAS FOOTER */}
      <footer className="saas-footer">
        <div className="saas-footer-container">
          <div className="saas-footer-top">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div className="saas-nav-logo" style={{ width: 32, height: 32 }}>
                <FileText size={16} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#ffffff" }}>
                ResumeCraft AI Studio
              </span>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.82rem" }}>
              <a href="#templates" style={{ color: "var(--saas-text-muted)", textDecoration: "none" }}>Templates</a>
              <a href="#studio" style={{ color: "var(--saas-text-muted)", textDecoration: "none" }}>Studio</a>
              <a href="#ats-engine" style={{ color: "var(--saas-text-muted)", textDecoration: "none" }}>ATS Checker</a>
              <Link href="/tools" style={{ color: "var(--saas-text-muted)", textDecoration: "none" }}>All StartupAI Tools</Link>
              <Link href="/privacy" style={{ color: "var(--saas-text-muted)", textDecoration: "none" }}>Privacy Policy</Link>
            </div>
          </div>

          <div className="saas-footer-bottom">
            <span>© {new Date().getFullYear()} ResumeCraft AI Studio. Powered by StartupAI. 100% Free & Privacy-First.</span>
            <span>Local Browser Execution • Zero Server Tracking</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
