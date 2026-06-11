import type { Metadata } from "next";
import Link from "next/link";
import { 
  Code, FileJson, Sparkles, QrCode, Settings, Type, Zap, Search, 
  ShieldCheck, Calculator, ArrowLeftRight, Binary, FileText, 
  Link as LinkIcon, Image as ImageIcon, Landmark, FileCode, CheckCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "StartupAI Tools | Free Developer, Content & Web Utilities",
  description: "Access a comprehensive collection of 100% free, lightning-fast web tools including JSON formatters, QR code generators, and text utilities. No registration required.",
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)', padding: 'clamp(3rem, 8vw, 6rem) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            The Ultimate Web <span style={{ color: 'var(--primary)' }}>Utility Toolkit</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem auto', lineHeight: 1.5 }}>
            100% free, lightning-fast tools for developers, content creators, and SEO professionals. No registration required. All processing happens safely in your browser.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tools/ai-copilot" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1.05rem', background: 'linear-gradient(to right, var(--primary), #9333ea)', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}>
              <Sparkles size={16} style={{ marginRight: '0.25rem' }} /> Try AI Copilot
            </Link>
            <Link href="#tools" className="btn btn-outline" style={{ padding: '0.85rem 1.75rem', fontSize: '1.05rem' }}>
              Explore Web Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section id="tools" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Most Popular Tools</h2>
            <p style={{ color: 'var(--text-muted)' }}>Choose a tool below to get started.</p>
          </div>

          <div className="grid-3">
            <Link href="/tools/ai-copilot" className="card" style={{ display: 'block', color: 'inherit', border: '1.5px solid rgba(147, 51, 234, 0.3)', background: 'linear-gradient(to bottom, #ffffff, rgba(147, 51, 234, 0.02))' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(147, 51, 234, 0.08)', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                AI Copilot Dashboard <span style={{ fontSize: '0.65rem', background: '#9333ea', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>FLAGSHIP</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Pitch decks, SEO content copywriters, validation stress-testing, and React code generation powered by OpenRouter.
              </p>
              <div style={{ fontWeight: 600, color: '#9333ea', fontSize: '0.875rem' }}>Open Copilot &rarr;</div>
            </Link>

            <Link href="/tools/json-formatter" className="card" style={{ display: 'block', color: 'inherit' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <FileJson size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>JSON Formatter</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Instantly format, validate, and beautify your raw JSON data. Spot syntax errors immediately.
              </p>
              <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.875rem' }}>Use Tool &rarr;</div>
            </Link>

            <Link href="/tools/qr-generator" className="card" style={{ display: 'block', color: 'inherit' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <QrCode size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>QR Code Generator</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Generate high-resolution, downloadable QR codes from any URL or text instantly.
              </p>
              <div style={{ fontWeight: 600, color: '#16a34a', fontSize: '0.875rem' }}>Use Tool &rarr;</div>
            </Link>

            <Link href="/tools/word-counter" className="card" style={{ display: 'block', color: 'inherit' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#f8fafc', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Type size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Word Counter</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Count words, characters, sentences, and check keyword density instantly.
              </p>
              <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.875rem' }}>Use Tool &rarr;</div>
            </Link>
            
            <Link href="/tools/whois-checker" className="card" style={{ display: 'block', color: 'inherit' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#f8fafc', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Search size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>WHOIS Checker</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Discover exactly who owns a domain, when it expires, and its nameservers.
              </p>
              <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.875rem' }}>Use Tool &rarr;</div>
            </Link>

            <Link href="/tools/grammarly-free" className="card" style={{ display: 'block', color: 'inherit' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Grammarly Free</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Analyze texts, correct spelling mistakes, optimize syntax, and improve readability instantly.
              </p>
              <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.875rem' }}>Use Tool &rarr;</div>
            </Link>

            <Link href="/tools/my-ip" className="card" style={{ display: 'block', color: 'inherit' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#f8fafc', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>What is My IP?</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Instantly detect your public IP address, ISP, and geographic location.
              </p>
              <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.875rem' }}>Use Tool &rarr;</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Directory / What the Site Has Section */}
      <section className="section" style={{ 
        background: 'linear-gradient(to bottom, var(--bg-main), #f1f5f9)', 
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        padding: '5rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>What Our Site Has</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.5' }}>
              Explore our comprehensive, professional utility ecosystem. Access over 100 free tools in one unified directory.
            </p>
          </div>

          <div className="grid-3">
            {/* Category 1: Text & Content Tools */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '10px', background: 'rgba(37, 99, 235, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>Text & Content</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Analyze, rewrite, and optimize copy for readability and search visibility.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <li>
                  <Link href="/tools/grammarly-free" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(37, 99, 235, 0.06)', color: 'var(--primary)' }}>
                      <Sparkles size={12} />
                    </span>
                    <span>Grammarly Free</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/article-rewriter" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(37, 99, 235, 0.06)', color: 'var(--primary)' }}>
                      <FileText size={12} />
                    </span>
                    <span>Article Rewriter</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/word-counter" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(37, 99, 235, 0.06)', color: 'var(--primary)' }}>
                      <Type size={12} />
                    </span>
                    <span>Word Counter</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/plagiarism-checker" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(37, 99, 235, 0.06)', color: 'var(--primary)' }}>
                      <CheckCircle size={12} />
                    </span>
                    <span>Plagiarism Checker</span>
                  </Link>
                </li>
              </ul>
              <Link href="/tools" style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Explore category &rarr;
              </Link>
            </div>

            {/* Category 2: SEO & Webmasters */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '10px', background: 'rgba(22, 163, 74, 0.08)', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Search size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>SEO & Webmasters</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Boost rankings with automated schema, tag generators, and index verification.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <li>
                  <Link href="/tools/adsense-eligibility-checker" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(22, 163, 74, 0.06)', color: '#16a34a' }}>
                      <ShieldCheck size={12} />
                    </span>
                    <span>AdSense Checker</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/schema-generator" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(22, 163, 74, 0.06)', color: '#16a34a' }}>
                      <FileCode size={12} />
                    </span>
                    <span>Schema Generator</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/robots-txt-generator" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(22, 163, 74, 0.06)', color: '#16a34a' }}>
                      <Search size={12} />
                    </span>
                    <span>Robots.txt Generator</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/xml-sitemap-generator" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(22, 163, 74, 0.06)', color: '#16a34a' }}>
                      <LinkIcon size={12} />
                    </span>
                    <span>Sitemap Generator</span>
                  </Link>
                </li>
              </ul>
              <Link href="/tools" style={{ fontWeight: 600, color: '#16a34a', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Explore category &rarr;
              </Link>
            </div>

            {/* Category 3: Developer Utilities */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '10px', background: 'rgba(147, 51, 234, 0.08)', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Code size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>Developer Utilities</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Beautify code, manage text, generate unique hashes, and encode data in-browser.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <li>
                  <Link href="/tools/json-formatter" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(147, 51, 234, 0.06)', color: '#9333ea' }}>
                      <FileJson size={12} />
                    </span>
                    <span>JSON Formatter</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/url-shortener" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(147, 51, 234, 0.06)', color: '#9333ea' }}>
                      <LinkIcon size={12} />
                    </span>
                    <span>URL Shortener</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/password-generator" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(147, 51, 234, 0.06)', color: '#9333ea' }}>
                      <Settings size={12} />
                    </span>
                    <span>Password Generator</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/uuid-generator" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(147, 51, 234, 0.06)', color: '#9333ea' }}>
                      <Zap size={12} />
                    </span>
                    <span>UUID Generator</span>
                  </Link>
                </li>
              </ul>
              <Link href="/tools" style={{ fontWeight: 600, color: '#9333ea', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Explore category &rarr;
              </Link>
            </div>

            {/* Category 4: Calculators & Finance */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '10px', background: 'rgba(234, 88, 12, 0.08)', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calculator size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>Calculators & Finance</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Estimate loans, analyze fee margins, and check dynamic percentages in seconds.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <li>
                  <Link href="/tools/loan-calculator" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(234, 88, 12, 0.06)', color: '#ea580c' }}>
                      <Landmark size={12} />
                    </span>
                    <span>Loan Calculator</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/paypal-fee-calculator" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(234, 88, 12, 0.06)', color: '#ea580c' }}>
                      <Calculator size={12} />
                    </span>
                    <span>PayPal Fee Calculator</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/age-calculator" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(234, 88, 12, 0.06)', color: '#ea580c' }}>
                      <Calculator size={12} />
                    </span>
                    <span>Age Calculator</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/gst-calculator" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(234, 88, 12, 0.06)', color: '#ea580c' }}>
                      <Calculator size={12} />
                    </span>
                    <span>GST Calculator</span>
                  </Link>
                </li>
              </ul>
              <Link href="/tools" style={{ fontWeight: 600, color: '#ea580c', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Explore category &rarr;
              </Link>
            </div>

            {/* Category 5: Generators & Media */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '10px', background: 'rgba(219, 39, 119, 0.08)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ImageIcon size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>Generators & Media</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Create high-resolution QR codes, convert image formats, and download assets.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <li>
                  <Link href="/tools/qr-generator" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(219, 39, 119, 0.06)', color: '#db2777' }}>
                      <QrCode size={12} />
                    </span>
                    <span>QR Code Generator</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/image-converter" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(219, 39, 119, 0.06)', color: '#db2777' }}>
                      <ImageIcon size={12} />
                    </span>
                    <span>Image Converter</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/image-resizer" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(219, 39, 119, 0.06)', color: '#db2777' }}>
                      <ImageIcon size={12} />
                    </span>
                    <span>Image Resizer</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/youtube-thumbnail" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(219, 39, 119, 0.06)', color: '#db2777' }}>
                      <ImageIcon size={12} />
                    </span>
                    <span>Thumbnail Downloader</span>
                  </Link>
                </li>
              </ul>
              <Link href="/tools" style={{ fontWeight: 600, color: '#db2777', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Explore category &rarr;
              </Link>
            </div>

            {/* Category 6: Binary & Numbers */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '10px', background: 'rgba(87, 83, 78, 0.08)', color: '#57534e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Binary size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>Binary & Numbers</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Encode texts to binary, decode ASCII values, and translate number bases.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <li>
                  <Link href="/tools/text-to-binary" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(87, 83, 78, 0.06)', color: '#57534e' }}>
                      <Binary size={12} />
                    </span>
                    <span>Text to Binary</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/binary-to-text" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(87, 83, 78, 0.06)', color: '#57534e' }}>
                      <Binary size={12} />
                    </span>
                    <span>Binary to Text</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/hex-to-rgb" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(87, 83, 78, 0.06)', color: '#57534e' }}>
                      <Code size={12} />
                    </span>
                    <span>HEX to RGB Converter</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/text-to-ascii" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(87, 83, 78, 0.06)', color: '#57534e' }}>
                      <Code size={12} />
                    </span>
                    <span>Text to ASCII Converter</span>
                  </Link>
                </li>
              </ul>
              <Link href="/tools" style={{ fontWeight: 600, color: '#57534e', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Explore category &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Why use StartupAI Tools?</h2>
          </div>
          <div className="grid-3">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', background: '#eff6ff', borderRadius: '50%', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Zap size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Lightning Fast</h3>
              <p style={{ color: 'var(--text-muted)' }}>All our tools are optimized to load instantly. Most processing happens directly in your browser, meaning zero wait time.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', background: '#eff6ff', borderRadius: '50%', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>100% Secure</h3>
              <p style={{ color: 'var(--text-muted)' }}>We don't store your data. Tools like the JSON formatter and Base64 encoder run completely client-side. Your data never leaves your device.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', background: '#eff6ff', borderRadius: '50%', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Search size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>SEO Optimized</h3>
              <p style={{ color: 'var(--text-muted)' }}>Built with modern web standards to ensure you find exactly what you need, right when you need it.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
