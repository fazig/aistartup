import type { Metadata } from "next";
import Link from "next/link";
import { 
  Code, FileJson, Sparkles, QrCode, Settings, Type, Zap, Search, 
  ShieldCheck, Calculator, ArrowLeftRight, Binary, FileText, 
  Link as LinkIcon, Image as ImageIcon, Landmark, FileCode, CheckCircle,
  Keyboard, Timer, Activity, Wrench, ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "StartupAI Tools | Free AI Image Enhancer & Web Utilities",
  description: "Access over 100+ free, lightning-fast web tools including a free HD AI Image Enhancer (Remini alternative), JSON formatters, and SEO utilities. No registration required.",
  keywords: "free AI image enhancer, Remini alternative free, web tools, developer utilities, upscale image to HD",
};

export default function Home() {
  return (
    <>
      {/* Hero Section - HackerRank Inspired Display Typography */}
      <section className="section" style={{ 
        background: 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.06) 0%, rgba(248, 250, 252, 0) 70%), var(--bg-main)', 
        borderBottom: '1px solid #e2e8f0', 
        padding: 'clamp(4rem, 10vw, 7.5rem) 0 5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient Backdrop Accents */}
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }}></div>

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '1000px' }}>
          
          {/* Top Pill Announcement */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
            100+ Browser-Based Free Tools
          </div>

          {/* High-Impact Headline with Inline Emblem Badges */}
          <h1 className="hero-title-hk">
            The ultimate web{' '}
            <span className="hero-badge-inline hero-badge-blue">
              <Wrench size={20} /> utility
            </span>{' '}
            toolkit is{' '}
            <span className="hero-badge-inline hero-badge-emerald">
              ⚡ fast
            </span>{' '}
            +{' '}
            <span className="hero-badge-inline hero-badge-purple">
              <Sparkles size={20} /> AI
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{ 
            fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', 
            color: '#475569', 
            maxWidth: '740px', 
            margin: '0 auto 3rem auto', 
            lineHeight: '1.6',
            fontWeight: 450
          }}>
            100% free, lightning-fast tools for developers, content creators, and SEO professionals. No registration required. All processing happens safely in your browser.
          </p>

          {/* Action CTAs with Glowing Ambient Backdrop */}
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="#tools" className="btn-glow">
              Explore Web Tools &rarr;
            </Link>
            <Link href="/tools/ai-copilot" className="btn-glow btn-glow-emerald">
              <Sparkles size={18} style={{ marginRight: '0.35rem' }} /> Try ZenNote AI
            </Link>
          </div>
        </div>
      </section>

      {/* Typing Game Banner Section */}
      <section className="section" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ 
            background: '#ffffff', 
            borderRadius: '24px', 
            padding: 'clamp(2rem, 5vw, 3.5rem)', 
            boxShadow: '0 20px 40px -15px rgba(147, 51, 234, 0.07)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            border: '1px solid #e2e8f0', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
            <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.08, borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '200px', height: '200px', background: '#ec4899', filter: 'blur(100px)', opacity: 0.08, borderRadius: '50%' }}></div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fdf4ff', color: '#db2777', padding: '0.45rem 1.15rem', borderRadius: '100px', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1.25rem', border: '1px solid rgba(219, 39, 119, 0.2)' }}>
              <Activity size={16} /> NEW FEATURE
            </div>
            
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem', letterSpacing: '-0.03em', color: '#0f172a', fontWeight: 800 }}>
              Test Your Typing Speed
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '620px', marginBottom: '2.25rem', lineHeight: 1.6 }}>
              Challenge yourself with our new professional-grade typing game. Check your WPM, accuracy, and improve your productivity with interactive text puzzles and sounds.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontWeight: 600, fontSize: '0.95rem' }}><Keyboard size={18} color="var(--primary)" /> Real-time WPM</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontWeight: 600, fontSize: '0.95rem' }}><CheckCircle size={18} color="#10b981" /> Keystroke Accuracy</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontWeight: 600, fontSize: '0.95rem' }}><Timer size={18} color="#f59e0b" /> Time Attack Modes</div>
            </div>

            <Link href="/tools/typing-test" className="btn-glow" style={{ background: '#0f172a', padding: '0.85rem 2.25rem' }}>
              <Keyboard size={18} style={{ marginRight: '0.4rem' }} /> Play Typing Game Now
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section id="tools" className="section" style={{ background: '#ffffff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem', letterSpacing: '-0.03em', color: '#0f172a', fontWeight: 800 }}>Most Popular Tools</h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem' }}>Choose a tool below to get started.</p>
          </div>

          <div className="grid-3">
            <Link href="/tools/ai-copilot" className="card-hk" style={{ display: 'block', color: 'inherit', textDecoration: 'none', border: '1.5px solid rgba(147, 51, 234, 0.25)', background: 'linear-gradient(to bottom, #ffffff, rgba(147, 51, 234, 0.02))' }}>
              <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(147, 51, 234, 0.1)', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                ZenNote AI <span style={{ fontSize: '0.65rem', background: '#9333ea', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>FLAGSHIP</span>
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Converts unstructured brain-dumps, daily tasks, and notes into organized action plans and email drafts instantly.
              </p>
              <div style={{ fontWeight: 700, color: '#9333ea', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Open ZenNote &rarr;</div>
            </Link>

            <Link href="/tools/image-enhancer" className="card-hk" style={{ display: 'block', color: 'inherit', textDecoration: 'none', border: '1.5px solid rgba(236, 72, 153, 0.25)', background: 'linear-gradient(to bottom, #ffffff, rgba(236, 72, 153, 0.02))' }}>
              <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <ImageIcon size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                Image Enhancer HD <span style={{ fontSize: '0.65rem', background: '#ec4899', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>HOT</span>
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Upscale and enhance your photos to full HD instantly for free. The ultimate free Remini alternative.
              </p>
              <div style={{ fontWeight: 700, color: '#ec4899', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Enhance Image &rarr;</div>
            </Link>

            <Link href="/tools/json-formatter" className="card-hk" style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
              <div style={{ width: 48, height: 48, borderRadius: '14px', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <FileJson size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>JSON Formatter</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Instantly format, validate, and beautify your raw JSON data. Spot syntax errors immediately.
              </p>
              <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Use Tool &rarr;</div>
            </Link>

            <Link href="/tools/qr-generator" className="card-hk" style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
              <div style={{ width: 48, height: 48, borderRadius: '14px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <QrCode size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>QR Code Generator</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Generate high-resolution, downloadable QR codes from any URL or text instantly.
              </p>
              <div style={{ fontWeight: 700, color: '#059669', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Use Tool &rarr;</div>
            </Link>

            <Link href="/tools/word-counter" className="card-hk" style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
              <div style={{ width: 48, height: 48, borderRadius: '14px', background: '#f8fafc', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Type size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>Word Counter</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Count words, characters, sentences, and check keyword density instantly.
              </p>
              <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Use Tool &rarr;</div>
            </Link>
            
            <Link href="/tools/whois-checker" className="card-hk" style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
              <div style={{ width: 48, height: 48, borderRadius: '14px', background: '#f8fafc', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Search size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>WHOIS Checker</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Discover exactly who owns a domain, when it expires, and its nameservers.
              </p>
              <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Use Tool &rarr;</div>
            </Link>

            <Link href="/tools/grammar-checker" className="card-hk" style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
              <div style={{ width: 48, height: 48, borderRadius: '14px', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>Free Grammar Checker</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Analyze texts, correct spelling mistakes, optimize syntax, and improve readability instantly.
              </p>
              <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Use Tool &rarr;</div>
            </Link>

            <Link href="/tools/my-ip" className="card-hk" style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
              <div style={{ width: 48, height: 48, borderRadius: '14px', background: '#f8fafc', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>What is My IP?</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Instantly detect your public IP address, ISP, and geographic location.
              </p>
              <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Use Tool &rarr;</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Directory / What the Site Has Section */}
      <section className="section" style={{ 
        background: '#f8fafc', 
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        padding: '5.5rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.03em', color: '#0f172a', fontWeight: 800 }}>What Our Site Has</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.5' }}>
              Explore our comprehensive, professional utility ecosystem. Access over 100 free tools in one unified directory.
            </p>
          </div>

          <div className="grid-3">
            {/* Category 1: Text & Content Tools */}
            <div className="card-hk" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(37, 99, 235, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Text & Content</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Analyze, rewrite, and optimize copy for readability and search visibility.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <li>
                  <Link href="/tools/grammar-checker" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(37, 99, 235, 0.06)', color: 'var(--primary)' }}>
                      <Sparkles size={12} />
                    </span>
                    <span>Free Grammar Checker</span>
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
              <Link href="/tools" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                Explore category &rarr;
              </Link>
            </div>

            {/* Category 2: SEO & Webmasters */}
            <div className="card-hk" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(22, 163, 74, 0.08)', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Search size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>SEO & Webmasters</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
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
              <Link href="/tools" style={{ fontWeight: 700, color: '#16a34a', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                Explore category &rarr;
              </Link>
            </div>

            {/* Category 3: Developer Utilities */}
            <div className="card-hk" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(147, 51, 234, 0.08)', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Code size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Developer Utilities</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
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
              <Link href="/tools" style={{ fontWeight: 700, color: '#9333ea', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                Explore category &rarr;
              </Link>
            </div>

            {/* Category 4: Calculators & Finance */}
            <div className="card-hk" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(234, 88, 12, 0.08)', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calculator size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Calculators & Finance</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
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
              <Link href="/tools" style={{ fontWeight: 700, color: '#ea580c', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                Explore category &rarr;
              </Link>
            </div>

            {/* Category 5: Generators & Media */}
            <div className="card-hk" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(219, 39, 119, 0.08)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ImageIcon size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Generators & Media</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Create high-resolution QR codes, convert image formats, and download assets.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <li>
                  <Link href="/tools/image-enhancer" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                      <Sparkles size={12} />
                    </span>
                    <span style={{ fontWeight: 600 }}>Image Enhancer HD</span>
                  </Link>
                </li>
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
                  <Link href="/tools/image-cropper" className="category-item-link">
                    <span className="category-badge" style={{ background: 'rgba(219, 39, 119, 0.06)', color: '#db2777' }}>
                      <ImageIcon size={12} />
                    </span>
                    <span>Image Cropper</span>
                  </Link>
                </li>
              </ul>
              <Link href="/tools" style={{ fontWeight: 700, color: '#db2777', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                Explore category &rarr;
              </Link>
            </div>

            {/* Category 6: Binary & Numbers */}
            <div className="card-hk" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(87, 83, 78, 0.08)', color: '#57534e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Binary size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Binary & Numbers</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
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
              <Link href="/tools" style={{ fontWeight: 700, color: '#57534e', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                Explore category &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem', letterSpacing: '-0.03em', color: '#0f172a', fontWeight: 800 }}>Why use StartupAI Tools?</h2>
          </div>
          <div className="grid-3">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ display: 'inline-flex', padding: '1.25rem', background: '#eff6ff', borderRadius: '20px', color: 'var(--primary)', marginBottom: '1.5rem', boxShadow: '0 8px 16px rgba(37, 99, 235, 0.1)' }}>
                <Zap size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem', fontWeight: 700, color: '#0f172a' }}>Lightning Fast</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>All our tools are optimized to load instantly. Most processing happens directly in your browser, meaning zero wait time.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ display: 'inline-flex', padding: '1.25rem', background: '#ecfdf5', borderRadius: '20px', color: '#059669', marginBottom: '1.5rem', boxShadow: '0 8px 16px rgba(5, 150, 105, 0.1)' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem', fontWeight: 700, color: '#0f172a' }}>100% Secure</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>We don't store your data. Tools like the JSON formatter and Base64 encoder run completely client-side. Your data never leaves your device.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ display: 'inline-flex', padding: '1.25rem', background: '#fdf4ff', borderRadius: '20px', color: '#9333ea', marginBottom: '1.5rem', boxShadow: '0 8px 16px rgba(147, 51, 234, 0.1)' }}>
                <Search size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem', fontWeight: 700, color: '#0f172a' }}>SEO Optimized</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>Built with modern web standards to ensure you find exactly what you need, right when you need it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="section" style={{ background: '#f8fafc', padding: '4.5rem 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container prose" style={{ maxWidth: '820px', margin: '0 auto', color: '#64748b' }}>
          <h2 style={{ color: '#0f172a', fontSize: '2rem', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>The Ultimate Free Tools Directory for Developers and Marketers</h2>
          <p style={{ lineHeight: '1.7' }}>Welcome to StartupAI Tools, the internet's premier destination for 100% free online utilities. Whether you are a web developer looking to format JSON, a digital marketer needing a meta tag generator, or a student tracking word counts, our comprehensive suite of over 100 mini-tools has you covered.</p>
          
          <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.25rem', marginBottom: '1rem', fontWeight: 700 }}>Why We Built This Platform</h3>
          <p style={{ lineHeight: '1.7' }}>We believe that essential internet utilities should be completely free, lightning fast, and privacy-focused. Many other tool websites bombard you with popup ads or force you to sign up for an account just to compress an image or convert a color code. StartupAI Tools is different. Our tools run locally in your browser whenever possible, ensuring your data never touches our servers. This means instant results and total privacy.</p>
          
          <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.25rem', marginBottom: '1rem', fontWeight: 700 }}>Popular Categories</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Developer Tools:</strong> Formatters, validators, and converters for JSON, XML, HTML, and CSS.</li>
            <li><strong>SEO Utilities:</strong> Meta tag generators, keyword extractors, and SERP preview tools.</li>
            <li><strong>Text & Content:</strong> Word counters, case converters, and Lorem Ipsum generators.</li>
            <li><strong>Image Optimization:</strong> WebP converters, resizers, and quality optimizers for faster page loads.</li>
          </ul>
          <p style={{ lineHeight: '1.7' }}>Bookmark this site and never pay for a basic utility app again. We are constantly adding new tools based on community feedback, so check back often to see what is new!</p>
        </div>
      </section>
    </>
  );
}
