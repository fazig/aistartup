import type { Metadata } from "next";
import ClientResumeBuilder from "./ClientResumeBuilder";
import { CheckCircle, ShieldCheck, Zap, Sparkles, FileText, Download, Award, HelpCircle } from "lucide-react";

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
              "text": "Absolutely. You can switch between 10 hand-curated color palettes or input any custom hex code. You can also pick from 4 typography pairings (Modern Sans, Executive Serif, Clean Tech, and Editorial Prestige) and choose between standard International A4 and US Letter sizes.",
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

      {/* Main Interactive Studio Canvas */}
      <ClientResumeBuilder />

      {/* Comprehensive SEO & Guide Section */}
      <section className="bg-slate-950 border-t border-slate-800 text-slate-300 py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
              <h3 className="text-base font-bold text-white">10 Canva-Style Archetypes</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                From Silicon Valley minimalists and Wall Street executives to creative portfolios, choose from 10 distinct, recruiter-approved visual designs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <Download size={20} />
              </div>
              <h3 className="text-base font-bold text-white">Razor-Sharp Vector PDF</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Unlike tools that export blurry canvas screenshots, our engine utilizes native browser print vector drivers for flawless printing and ATS text parsing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-white">100% Client-Side Privacy</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your personal details, contact info, and salary history never touch an external server. Everything auto-saves right in your browser cache.
              </p>
            </div>
          </div>

          {/* Guide Article: How to Write an ATS-Friendly Resume */}
          <article className="prose prose-invert max-w-none space-y-8 bg-slate-900/50 p-8 rounded-2xl border border-slate-800/80">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                The Definitive 2026 Guide to ATS-Friendly Resumes
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                Over 98% of Fortune 500 enterprises and 70% of high-growth tech startups filter incoming candidates using Applicant Tracking Systems (ATS) such as Greenhouse, Lever, Workday, and Taleo before a human recruiter ever sees an application. Building a resume that sails through these algorithmic gates requires understanding how automated parsers dissect your credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle size={18} /> What ATS Scanners Love
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Standard Section Headers:</strong> Use predictable headers like &quot;Experience&quot;, &quot;Education&quot;, and &quot;Skills&quot; so parsers categorize your profile without errors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Selectable Vector Text:</strong> Always export as clean text PDFs rather than flattened images or raster canvases.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Quantified Metrics:</strong> Use the Google XYZ formula: <em>&quot;Accomplished [X], as measured by [Y], by doing [Z]&quot;</em>. Numbers anchor algorithmic authority.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Keyword Relevance:</strong> Incorporate natural terminology matching the target job description across your skills and experience bullets.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                  <Award size={18} /> Why Our Templates Rank Higher
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Zero Unparseable Tables:</strong> We avoid legacy nested HTML tables that cause multi-column parsers to read across lines incorrectly.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Customizable Spacing Density:</strong> Need to fit 10 years of experience onto a single page? Switch between Compact, Comfortable, and Spacious in one click.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>A4 &amp; US Letter Dimensions:</strong> Ensure exact border margins whether submitting to North American recruiters or international teams.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>JSON Backup &amp; Portability:</strong> Never lose your data. Download a lightweight JSON backup and restore it anytime across devices.</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>

          {/* FAQ Accordion Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <HelpCircle className="text-emerald-400" size={22} />
              <h2 className="text-xl sm:text-2xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              <details className="group bg-slate-900 border border-slate-800 rounded-xl p-4 transition [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-white text-sm">
                  <span>How do I export my resume as a PDF without margins or web headers?</span>
                  <span className="text-emerald-400 transition group-open:rotate-180">↓</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  When you click <strong>&quot;Download PDF&quot;</strong>, your browser&apos;s native print dialog will open. Under <em>More Settings</em>, ensure <strong>Headers and Footers</strong> is unchecked and <strong>Background Graphics</strong> is checked. Our built-in print style automatically removes website navigation, isolates your resume sheet, and formats it to exact millimeter dimensions.
                </p>
              </details>

              <details className="group bg-slate-900 border border-slate-800 rounded-xl p-4 transition [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-white text-sm">
                  <span>Is there any limit to how many resumes I can build or download?</span>
                  <span className="text-emerald-400 transition group-open:rotate-180">↓</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Zero limits. You can generate unlimited resumes, customize infinite color combinations, test different archetypes for different job applications, and download vector PDFs completely free forever.
                </p>
              </details>

              <details className="group bg-slate-900 border border-slate-800 rounded-xl p-4 transition [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-white text-sm">
                  <span>Can I add my own avatar or profile photo?</span>
                  <span className="text-emerald-400 transition group-open:rotate-180">↓</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Yes. Under the <em>Personal &amp; Contact</em> tab, simply click <em>Choose Image</em>. The image is instantly converted to a local Base64 string directly inside your browser so it displays crisply in templates like Nordic, Creative, and Executive.
                </p>
              </details>

              <details className="group bg-slate-900 border border-slate-800 rounded-xl p-4 transition [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-white text-sm">
                  <span>Which template is best for software engineers vs marketing vs corporate executives?</span>
                  <span className="text-emerald-400 transition group-open:rotate-180">↓</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
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
