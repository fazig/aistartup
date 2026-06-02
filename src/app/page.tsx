import Link from "next/link";
import { Code, FileJson, Hash, QrCode, Settings, Type, Zap, Search, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            The Ultimate Web <span style={{ color: 'var(--primary)' }}>Utility Toolkit</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
            100% free, lightning-fast tools for developers, content creators, and SEO professionals. No registration required. All processing happens safely in your browser.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="#tools" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Explore All Tools
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

            {/* Upcoming Tools Placeholders */}
            <div className="card" style={{ opacity: 0.7 }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#f8fafc', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Type size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Word Counter</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Count words, characters, and check keyword density. (Coming Soon)
              </p>
              <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Coming Soon</div>
            </div>
            
            <div className="card" style={{ opacity: 0.7 }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#f8fafc', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Code size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Base64 Encoder</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Encode or decode strings to Base64 format safely in your browser. (Coming Soon)
              </p>
              <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Coming Soon</div>
            </div>

            <div className="card" style={{ opacity: 0.7 }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#f8fafc', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Hash size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>MD5 Hash Generator</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Generate MD5, SHA1, and SHA256 hashes instantly. (Coming Soon)
              </p>
              <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Coming Soon</div>
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
    </div>
  );
}
