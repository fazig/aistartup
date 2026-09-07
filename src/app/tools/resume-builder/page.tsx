import type { Metadata } from "next";
import Link from "next/link";
import ClientResumeBuilder from "./ClientResumeBuilder";
import { CheckCircle, ShieldCheck, Sparkles, Download, Award, HelpCircle, ArrowRight } from "lucide-react";
import "./resume-builder.css";

export const metadata: Metadata = {
  title: "Free Online Resume Builder (10 Canva-Style ATS Templates) | StartupAI",
  description:
    "Build and export professional, ATS-friendly resumes in seconds. Choose from 10 customizable designer templates, live vector PDF export, auto-fill sample data, and 100% free with no watermark or sign-up.",
  keywords:
    "free resume builder, canva resume template, ats friendly resume, online cv maker, professional resume generator, modern resume template, free pdf resume, tech resume template",
  alternates: {
    canonical: "/tools/resume-builder",
  },
  openGraph: {
    title: "Free Online Resume Builder (10 Canva-Style ATS Templates) | StartupAI",
    description:
      "Craft high-converting, professional resumes with 10 designer archetypes. 100% free vector PDF export with no sign-up or watermarks.",
    url: "/tools/resume-builder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Resume Builder (10 Canva-Style ATS Templates) | StartupAI",
    description:
      "Design ATS-friendly, professional resumes with 10 designer archetypes. 100% free vector PDF export with zero watermarks.",
  },
};

export default function ResumeBuilderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "StartupAI Free Canva-Style Resume Builder",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All modern web browsers",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description":
          "A free, privacy-first resume builder featuring 10 designer templates, customizable color palettes, typography pairings, and instant vector PDF export without watermarks or registration.",
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this resume builder truly 100% free with no watermarks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! StartupAI Resume Builder is 100% free. When you click Download PDF, your resume exports as a crisp, razor-sharp vector document with zero watermarks, zero locked features, and no credit card or account required.",
            },
          },
          {
            "@type": "Question",
            "name": "Are these resume templates Applicant Tracking System (ATS) friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. All templates follow semantic document hierarchy with standard section titles (Experience, Education, Skills, Projects). The exported PDF maintains selectable vector text that ATS scanners like Greenhouse, Lever, Taleo, and Workday can parse effortlessly.",
            },
          },
          {
            "@type": "Question",
            "name": "Is my personal career data stored on your servers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We believe in total data sovereignty. All resume content and style preferences are saved directly to your local browser storage (localStorage). You can also export and import your resume as a JSON backup file at any time.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I customize the colors, fonts, and paper sizes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. You can switch between 10 hand-curated color palettes or input any custom hex code. You can also pick from 4 typography pairings and choose between standard International A4 and US Letter sizes.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SaaS Flagship Banner */}
      <div style={{
        background: "linear-gradient(90deg, rgba(79, 70, 229, 0.25) 0%, rgba(147, 51, 234, 0.25) 50%, rgba(6, 182, 212, 0.25) 100%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "12px 20px",
        textAlign: "center",
        fontSize: "0.88rem",
        color: "#cbd5e1"
      }}>
        ✨ Looking for the flagship standalone app with real-time ATS scoring & role presets?{" "}
        <Link
          href="/resume-builder"
          style={{
            color: "#38bdf8",
            fontWeight: 700,
            textDecoration: "underline",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginLeft: "6px"
          }}
        >
          Launch ResumeCraft AI Studio <ArrowRight size={14} />
        </Link>
      </div>

      {/* Main Interactive Studio Canvas */}
      <ClientResumeBuilder />

      {/* Comprehensive SEO & Guide Section */}
      <section className="rb-guide-section">
        <div className="rb-guide-container">
          {/* Feature Highlights Grid */}
          <div className="rb-features-grid">
            <div className="rb-feature-card">
              <div className="rb-feature-icon" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10b981" }}>
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>10 Canva-Style Archetypes</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--rb-text-muted)", lineHeight: 1.5, margin: 0 }}>
                From Silicon Valley minimalists and Wall Street executives to creative portfolios, choose from 10 distinct, recruiter-approved visual designs.
              </p>
            </div>

            <div className="rb-feature-card">
              <div className="rb-feature-icon" style={{ background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6" }}>
                <Download size={22} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>Razor-Sharp Vector PDF</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--rb-text-muted)", lineHeight: 1.5, margin: 0 }}>
                Unlike tools that export blurry canvas screenshots, our engine utilizes native browser print vector drivers for flawless printing and ATS text parsing.
              </p>
            </div>

            <div className="rb-feature-card">
              <div className="rb-feature-icon" style={{ background: "rgba(168, 85, 247, 0.12)", color: "#a855f7" }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>100% Client-Side Privacy</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--rb-text-muted)", lineHeight: 1.5, margin: 0 }}>
                Your personal details, contact info, and career history never touch an external server. Everything auto-saves locally in your browser cache.
              </p>
            </div>
          </div>

          {/* Guide Article: How to Write an ATS-Friendly Resume */}
          <article className="rb-article-card">
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                The Definitive 2026 Guide to ATS-Friendly Resumes
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--rb-text-muted)", lineHeight: 1.6, margin: 0 }}>
                Over 98% of Fortune 500 enterprises and 70% of high-growth tech startups filter incoming candidates using Applicant Tracking Systems (ATS) such as Greenhouse, Lever, Workday, and Taleo before a human recruiter ever sees an application. Building a resume that sails through these algorithmic gates requires understanding how automated parsers dissect your credentials.
              </p>
            </div>

            <div className="rb-guide-cols">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#34d399", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
                  <CheckCircle size={18} /> What ATS Scanners Love
                </h3>
                <ul style={{ paddingLeft: "1.2rem", fontSize: "0.82rem", color: "var(--rb-text-muted)", lineHeight: 1.7, margin: 0 }}>
                  <li><strong>Standard Section Headers:</strong> Use predictable headers like &quot;Experience&quot;, &quot;Education&quot;, and &quot;Skills&quot; so parsers categorize your profile without errors.</li>
                  <li><strong>Selectable Vector Text:</strong> Always export as clean text PDFs rather than flattened images or raster canvases.</li>
                  <li><strong>Quantified Metrics:</strong> Use the Google XYZ formula: <em>&quot;Accomplished [X], as measured by [Y], by doing [Z]&quot;</em>. Numbers anchor algorithmic authority.</li>
                  <li><strong>Keyword Relevance:</strong> Incorporate natural terminology matching the target job description across your skills and experience bullets.</li>
                </ul>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f43f5e", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
                  <Award size={18} /> Why Our Templates Rank Higher
                </h3>
                <ul style={{ paddingLeft: "1.2rem", fontSize: "0.82rem", color: "var(--rb-text-muted)", lineHeight: 1.7, margin: 0 }}>
                  <li><strong>Zero Unparseable Tables:</strong> We avoid legacy nested HTML tables that cause multi-column parsers to read across lines incorrectly.</li>
                  <li><strong>Customizable Spacing Density:</strong> Need to fit 10 years of experience onto a single page? Switch between Compact, Comfortable, and Spacious in one click.</li>
                  <li><strong>A4 &amp; US Letter Dimensions:</strong> Ensure exact border margins whether submitting to North American recruiters or international teams.</li>
                  <li><strong>JSON Backup &amp; Portability:</strong> Never lose your data. Download a lightweight JSON backup and restore it anytime across devices.</li>
                </ul>
              </div>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#ffffff" }}>
              <HelpCircle color="#10b981" size={22} />
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>Frequently Asked Questions</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <details className="rb-faq-box">
                <summary className="rb-faq-summary">
                  <span>How do I export my resume as a PDF without margins or web headers?</span>
                  <span style={{ color: "var(--rb-primary)" }}>↓</span>
                </summary>
                <p className="rb-faq-desc">
                  When you click <strong>&quot;Download PDF&quot;</strong>, your browser&apos;s native print dialog will open. Under <em>More Settings</em>, ensure <strong>Headers and Footers</strong> is unchecked and <strong>Background Graphics</strong> is checked. Our built-in print style automatically removes website navigation, isolates your resume sheet, and formats it to exact millimeter dimensions.
                </p>
              </details>

              <details className="rb-faq-box">
                <summary className="rb-faq-summary">
                  <span>Is there any limit to how many resumes I can build or download?</span>
                  <span style={{ color: "var(--rb-primary)" }}>↓</span>
                </summary>
                <p className="rb-faq-desc">
                  Zero limits. You can generate unlimited resumes, customize infinite color combinations, test different archetypes for different job applications, and download vector PDFs completely free forever.
                </p>
              </details>

              <details className="rb-faq-box">
                <summary className="rb-faq-summary">
                  <span>Can I add my own avatar or profile photo?</span>
                  <span style={{ color: "var(--rb-primary)" }}>↓</span>
                </summary>
                <p className="rb-faq-desc">
                  Yes. Under the <em>Personal &amp; Contact</em> tab, simply click <em>Choose Image</em>. The image is instantly converted to a local Base64 string directly inside your browser so it displays crisply in templates like Nordic, Creative, and Executive.
                </p>
              </details>

              <details className="rb-faq-box">
                <summary className="rb-faq-summary">
                  <span>Which template is best for software engineers vs marketing vs corporate executives?</span>
                  <span style={{ color: "var(--rb-primary)" }}>↓</span>
                </summary>
                <p className="rb-faq-desc">
                  For software engineers and data scientists, the <strong>Tech Specialist</strong> or <strong>Modern Clean</strong> templates highlight tech stacks and GitHub repositories with high clarity. For C-suite leaders and finance executives, the <strong>Executive Brief</strong> or <strong>Academic Traditional</strong> formats offer authoritative, serif-driven elegance. For designers and product leaders, try <strong>Creative Edge</strong> or <strong>Nordic Minimalist</strong>.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
