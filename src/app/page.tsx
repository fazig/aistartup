import { ArrowRight, FileText, LineChart, MessageSquare, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.05em' }}>
            Startup<span style={{ color: 'var(--text-secondary)' }}>AI</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '0.875rem', fontWeight: 500 }} className="text-muted">
            <a href="#solutions" style={{ color: 'inherit', textDecoration: 'none' }}>Solutions</a>
            <a href="#enterprise" style={{ color: 'inherit', textDecoration: 'none' }}>Enterprise</a>
            <Link href="/dashboard/documind" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Sign In</Link>
            <Link href="/dashboard/documind" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Get Started</Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="section" style={{ textAlign: 'center', paddingTop: '10rem', paddingBottom: '10rem' }}>
          <div className="container">
            <div className="badge" style={{ marginBottom: '2rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-primary)', marginRight: 8 }}></span>
              StartupAI Platform 2.0
            </div>
            <h1 style={{ fontSize: '5rem', lineHeight: 1.1, marginBottom: '2rem', maxWidth: '900px', margin: '0 auto 2rem' }}>
              The Unified AI Operating <br/><span className="text-muted glow-text">System for Business.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
              Automate data extraction, scale your content strategy, and analyze customer sentiment at an enterprise level. One secure platform.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/dashboard/documind" className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>
                Start Building <ArrowRight size={16} />
              </Link>
              <a href="#solutions" className="btn btn-secondary" style={{ padding: '0.875rem 2rem' }}>
                Explore Platform
              </a>
            </div>
          </div>
        </section>

        <section id="solutions" className="section" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Enterprise Solutions</h2>
            <p className="text-muted" style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '1.1rem' }}>Three powerful modules designed to eliminate operational bottlenecks.</p>
            
            <div className="grid-3">
              <div className="card">
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <FileText size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>DocuMind AI</h3>
                <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  Instantly extract structured JSON data from unstructured invoices, contracts, and receipts. Eliminate manual data entry entirely.
                </p>
                <Link href="/dashboard/documind" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Try DocuMind <ArrowRight size={14} />
                </Link>
              </div>

              <div className="card">
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Zap size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>MarketScale</h3>
                <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  Scale your marketing efforts programmatically. Generate high-quality, SEO-optimized blog posts and ad copy from a single keyword.
                </p>
                <Link href="/dashboard/marketscale" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Try MarketScale <ArrowRight size={14} />
                </Link>
              </div>

              <div className="card">
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <MessageSquare size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Sentiment Engine</h3>
                <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  Paste thousands of customer reviews and let our AI categorize them by sentiment, extracting key feature requests instantly.
                </p>
                <Link href="/dashboard/sentiment" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Try Sentiment Engine <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="enterprise" className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <Shield size={24} color="var(--text-secondary)" />
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Enterprise-Grade Security</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
              We do not train our models on your data. StartupAI uses zero-retention policies via secure API connections to our LLM partners to ensure your proprietary business data remains yours.
            </p>
            <Link href="/contact" className="btn btn-secondary">Contact Sales</Link>
          </div>
        </section>
      </main>

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-base)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ fontWeight: 700 }}>StartupAI</div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }} className="text-muted">
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
            <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</Link>
          </div>
          <div style={{ fontSize: '0.75rem' }} className="text-muted">
            &copy; {new Date().getFullYear()} StartupAI Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
