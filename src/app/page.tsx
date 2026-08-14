import type { Metadata } from "next";
import Link from "next/link";
import {
  Code,
  FileJson,
  Sparkles,
  QrCode,
  Type,
  Zap,
  Search,
  ShieldCheck,
  Calculator,
  Binary,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  Keyboard,
  Timer,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "StartupAI Tools | Free AI Image Enhancer & Web Utilities",
  description:
    "Access over 100+ free, lightning-fast web tools including a free HD AI Image Enhancer (Remini alternative), JSON formatters, and SEO utilities. No registration required.",
  keywords:
    "free AI image enhancer, Remini alternative free, web tools, developer utilities, upscale image to HD",
  alternates: { canonical: "/" },
  openGraph: {
    title: "StartupAI Tools | Free AI Image Enhancer & Web Utilities",
    description:
      "Access over 100+ free, lightning-fast web tools including a free HD AI Image Enhancer (Remini alternative), JSON formatters, and SEO utilities. No registration required.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StartupAI Tools | Free AI Image Enhancer & Web Utilities",
    description:
      "Access over 100+ free, lightning-fast web tools including a free HD AI Image Enhancer (Remini alternative), JSON formatters, and SEO utilities. No registration required.",
  },
};

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div>
            <p className="home-kicker">
              <span className="home-kicker-dot" aria-hidden="true" />
              100+ browser-based free tools
            </p>
            <h1 className="home-hero-title">
              The ultimate web utility toolkit is <em>fast</em> + AI
            </h1>
            <p className="home-lead">
              100% free, lightning-fast tools for developers, content creators, and SEO
              professionals. No registration required. All processing happens safely in
              your browser.
            </p>
            <div className="home-actions">
              <Link href="#tools" className="home-btn home-btn-primary">
                Explore Web Tools <ArrowRight size={16} />
              </Link>
              <Link href="/tools/ai-copilot" className="home-btn home-btn-ghost">
                Try ZenNote AI
              </Link>
            </div>
          </div>

          <aside className="home-panel" aria-label="Start with a popular tool">
            <div className="home-panel-label">Start here</div>
            <Link href="/tools/ai-copilot" className="home-jump">
              <div>
                <strong>ZenNote AI</strong>
                <span>Turn messy notes into action plans</span>
              </div>
              <span className="home-jump-meta">Flagship</span>
            </Link>
            <Link href="/tools/image-enhancer" className="home-jump">
              <div>
                <strong>Image Enhancer HD</strong>
                <span>Free Remini-style upscaler</span>
              </div>
              <span className="home-jump-meta">Hot</span>
            </Link>
            <Link href="/tools/json-formatter" className="home-jump">
              <div>
                <strong>JSON Formatter</strong>
                <span>Validate and beautify in-browser</span>
              </div>
              <span className="home-jump-meta">Dev</span>
            </Link>
            <Link href="/tools/grammar-checker" className="home-jump">
              <div>
                <strong>Free Grammar Checker</strong>
                <span>Spelling, syntax, readability</span>
              </div>
              <span className="home-jump-meta">Write</span>
            </Link>
          </aside>
        </div>
      </section>

      <section id="tools" className="home-section" style={{ contentVisibility: "visible" }}>
        <div className="container">
          <div className="home-section-head">
            <h2>Most Popular Tools</h2>
            <p>Choose a tool below to get started.</p>
          </div>

          <div className="home-tools">
            <Link href="/tools/ai-copilot" className="home-tool">
              <span className="home-tool-ico" aria-hidden="true">
                <Sparkles size={20} />
              </span>
              <div>
                <h3>
                  ZenNote AI <span className="home-chip">Flagship</span>
                </h3>
                <p>
                  Converts unstructured brain-dumps, daily tasks, and notes into organized
                  action plans and email drafts instantly.
                </p>
              </div>
              <span className="home-tool-go">Open ZenNote →</span>
            </Link>

            <Link href="/tools/image-enhancer" className="home-tool">
              <span className="home-tool-ico" aria-hidden="true">
                <ImageIcon size={20} />
              </span>
              <div>
                <h3>
                  Image Enhancer HD <span className="home-chip home-chip-hot">Hot</span>
                </h3>
                <p>
                  Upscale and enhance your photos to full HD instantly for free. The
                  ultimate free Remini alternative.
                </p>
              </div>
              <span className="home-tool-go">Enhance Image →</span>
            </Link>

            <Link href="/tools/json-formatter" className="home-tool">
              <span className="home-tool-ico" aria-hidden="true">
                <FileJson size={20} />
              </span>
              <div>
                <h3>JSON Formatter</h3>
                <p>
                  Instantly format, validate, and beautify your raw JSON data. Spot syntax
                  errors immediately.
                </p>
              </div>
              <span className="home-tool-go">Use Tool →</span>
            </Link>

            <Link href="/tools/qr-generator" className="home-tool">
              <span className="home-tool-ico" aria-hidden="true">
                <QrCode size={20} />
              </span>
              <div>
                <h3>QR Code Generator</h3>
                <p>
                  Generate high-resolution, downloadable QR codes from any URL or text
                  instantly.
                </p>
              </div>
              <span className="home-tool-go">Use Tool →</span>
            </Link>

            <Link href="/tools/word-counter" className="home-tool">
              <span className="home-tool-ico" aria-hidden="true">
                <Type size={20} />
              </span>
              <div>
                <h3>Word Counter</h3>
                <p>
                  Count words, characters, sentences, and check keyword density instantly.
                </p>
              </div>
              <span className="home-tool-go">Use Tool →</span>
            </Link>

            <Link href="/tools/whois-checker" className="home-tool">
              <span className="home-tool-ico" aria-hidden="true">
                <Search size={20} />
              </span>
              <div>
                <h3>WHOIS Checker</h3>
                <p>
                  Discover exactly who owns a domain, when it expires, and its nameservers.
                </p>
              </div>
              <span className="home-tool-go">Use Tool →</span>
            </Link>

            <Link href="/tools/grammar-checker" className="home-tool">
              <span className="home-tool-ico" aria-hidden="true">
                <Sparkles size={20} />
              </span>
              <div>
                <h3>Free Grammar Checker</h3>
                <p>
                  Analyze texts, correct spelling mistakes, optimize syntax, and improve
                  readability instantly.
                </p>
              </div>
              <span className="home-tool-go">Use Tool →</span>
            </Link>

            <Link href="/tools/my-ip" className="home-tool">
              <span className="home-tool-ico" aria-hidden="true">
                <Zap size={20} />
              </span>
              <div>
                <h3>What is My IP?</h3>
                <p>
                  Instantly detect your public IP address, ISP, and geographic location.
                </p>
              </div>
              <span className="home-tool-go">Use Tool →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="home-typing">
            <div>
              <p className="home-kicker" style={{ color: "#e7c4b0", marginBottom: "0.65rem" }}>
                New feature
              </p>
              <h2>Test Your Typing Speed</h2>
              <p>
                Challenge yourself with our new professional-grade typing game. Check your
                WPM, accuracy, and improve your productivity with interactive text puzzles
                and sounds.
              </p>
              <div className="home-typing-meta">
                <span>
                  <Keyboard size={14} /> Real-time WPM
                </span>
                <span>
                  <CheckCircle size={14} /> Keystroke Accuracy
                </span>
                <span>
                  <Timer size={14} /> Time Attack Modes
                </span>
              </div>
            </div>
            <Link href="/tools/typing-test" className="home-btn home-btn-primary">
              Play Typing Game Now
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="home-section-head">
            <h2>What Our Site Has</h2>
            <p>
              Explore our comprehensive, professional utility ecosystem. Access over 100
              free tools in one unified directory.
            </p>
          </div>

          <div className="home-cats">
            <article className="home-cat">
              <div className="home-cat-top">
                <FileText size={18} />
                <h3>Text &amp; Content</h3>
              </div>
              <p>Analyze, rewrite, and optimize copy for readability and search visibility.</p>
              <ul>
                <li>
                  <Link href="/tools/grammar-checker">Free Grammar Checker</Link>
                </li>
                <li>
                  <Link href="/tools/article-rewriter">Article Rewriter</Link>
                </li>
                <li>
                  <Link href="/tools/word-counter">Word Counter</Link>
                </li>
                <li>
                  <Link href="/tools/plagiarism-checker">Plagiarism Checker</Link>
                </li>
              </ul>
              <Link href="/tools" className="home-cat-more">
                Explore category →
              </Link>
            </article>

            <article className="home-cat">
              <div className="home-cat-top">
                <Search size={18} />
                <h3>SEO &amp; Webmasters</h3>
              </div>
              <p>Boost rankings with automated schema, tag generators, and index verification.</p>
              <ul>
                <li>
                  <Link href="/tools/adsense-eligibility-checker">AdSense Checker</Link>
                </li>
                <li>
                  <Link href="/tools/schema-generator">Schema Generator</Link>
                </li>
                <li>
                  <Link href="/tools/robots-txt-generator">Robots.txt Generator</Link>
                </li>
                <li>
                  <Link href="/tools/xml-sitemap-generator">Sitemap Generator</Link>
                </li>
              </ul>
              <Link href="/tools" className="home-cat-more">
                Explore category →
              </Link>
            </article>

            <article className="home-cat">
              <div className="home-cat-top">
                <Code size={18} />
                <h3>Developer Utilities</h3>
              </div>
              <p>Beautify code, manage text, generate unique hashes, and encode data in-browser.</p>
              <ul>
                <li>
                  <Link href="/tools/json-formatter">JSON Formatter</Link>
                </li>
                <li>
                  <Link href="/tools/url-shortener">URL Shortener</Link>
                </li>
                <li>
                  <Link href="/tools/password-generator">Password Generator</Link>
                </li>
                <li>
                  <Link href="/tools/uuid-generator">UUID Generator</Link>
                </li>
              </ul>
              <Link href="/tools" className="home-cat-more">
                Explore category →
              </Link>
            </article>

            <article className="home-cat">
              <div className="home-cat-top">
                <Calculator size={18} />
                <h3>Calculators &amp; Finance</h3>
              </div>
              <p>Estimate loans, analyze fee margins, and check dynamic percentages in seconds.</p>
              <ul>
                <li>
                  <Link href="/tools/loan-calculator">Loan Calculator</Link>
                </li>
                <li>
                  <Link href="/tools/paypal-fee-calculator">PayPal Fee Calculator</Link>
                </li>
                <li>
                  <Link href="/tools/age-calculator">Age Calculator</Link>
                </li>
                <li>
                  <Link href="/tools/gst-calculator">GST Calculator</Link>
                </li>
              </ul>
              <Link href="/tools" className="home-cat-more">
                Explore category →
              </Link>
            </article>

            <article className="home-cat">
              <div className="home-cat-top">
                <ImageIcon size={18} />
                <h3>Generators &amp; Media</h3>
              </div>
              <p>Create high-resolution QR codes, convert image formats, and download assets.</p>
              <ul>
                <li>
                  <Link href="/tools/image-enhancer">Image Enhancer HD</Link>
                </li>
                <li>
                  <Link href="/tools/qr-generator">QR Code Generator</Link>
                </li>
                <li>
                  <Link href="/tools/image-converter">Image Converter</Link>
                </li>
                <li>
                  <Link href="/tools/image-resizer">Image Resizer</Link>
                </li>
                <li>
                  <Link href="/tools/image-cropper">Image Cropper</Link>
                </li>
              </ul>
              <Link href="/tools" className="home-cat-more">
                Explore category →
              </Link>
            </article>

            <article className="home-cat">
              <div className="home-cat-top">
                <Binary size={18} />
                <h3>Binary &amp; Numbers</h3>
              </div>
              <p>Encode texts to binary, decode ASCII values, and translate number bases.</p>
              <ul>
                <li>
                  <Link href="/tools/text-to-binary">Text to Binary</Link>
                </li>
                <li>
                  <Link href="/tools/binary-to-text">Binary to Text</Link>
                </li>
                <li>
                  <Link href="/tools/hex-to-rgb">HEX to RGB Converter</Link>
                </li>
                <li>
                  <Link href="/tools/text-to-ascii">Text to ASCII Converter</Link>
                </li>
              </ul>
              <Link href="/tools" className="home-cat-more">
                Explore category →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="home-section-head">
            <h2>Why use StartupAI Tools?</h2>
          </div>
          <div className="home-why">
            <article>
              <Zap size={22} />
              <h3>Lightning Fast</h3>
              <p>
                All our tools are optimized to load instantly. Most processing happens
                directly in your browser, meaning zero wait time.
              </p>
            </article>
            <article>
              <ShieldCheck size={22} />
              <h3>100% Secure</h3>
              <p>
                We don&apos;t store your data. Tools like the JSON formatter and Base64
                encoder run completely client-side. Your data never leaves your device.
              </p>
            </article>
            <article>
              <Search size={22} />
              <h3>SEO Optimized</h3>
              <p>
                Built with modern web standards to ensure you find exactly what you need,
                right when you need it.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-section" style={{ borderBottom: "none" }}>
        <div className="container">
          <article className="home-essay">
            <h2>The Ultimate Free Tools Directory for Developers and Marketers</h2>
            <p>
              Welcome to StartupAI Tools, the internet&apos;s premier destination for 100%
              free online utilities. Whether you are a web developer looking to format
              JSON, a digital marketer needing a meta tag generator, or a student tracking
              word counts, our comprehensive suite of over 100 mini-tools has you covered.
            </p>
            <h3>Why We Built This Platform</h3>
            <p>
              We believe that essential internet utilities should be completely free,
              lightning fast, and privacy-focused. Many other tool websites bombard you
              with popup ads or force you to sign up for an account just to compress an
              image or convert a color code. StartupAI Tools is different. Our tools run
              locally in your browser whenever possible, ensuring your data never touches
              our servers. This means instant results and total privacy.
            </p>
            <h3>Popular Categories</h3>
            <ul>
              <li>
                <strong>Developer Tools:</strong> Formatters, validators, and converters for
                JSON, XML, HTML, and CSS.
              </li>
              <li>
                <strong>SEO Utilities:</strong> Meta tag generators, keyword extractors, and
                SERP preview tools.
              </li>
              <li>
                <strong>Text &amp; Content:</strong> Word counters, case converters, and
                Lorem Ipsum generators.
              </li>
              <li>
                <strong>Image Optimization:</strong> WebP converters, resizers, and quality
                optimizers for faster page loads.
              </li>
            </ul>
            <p>
              Bookmark this site and never pay for a basic utility app again. We are
              constantly adding new tools based on community feedback, so check back often
              to see what is new!
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
