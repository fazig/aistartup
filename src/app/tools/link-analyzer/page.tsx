"use client";
import Link from "next/link";

import { useState } from "react";
import { Link as LinkIcon, AlertTriangle, ExternalLink, ShieldCheck, ArrowLeft } from "lucide-react";
import { analyzeLinks } from "./actions";

export default function LinkAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFetch = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    
    try {
      const data = await analyzeLinks(url);
      setResult(data);
    } catch (e) {
      setResult({ error: "An unexpected network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1000px' }}>
      <Link
        href="/tools"
        className="btn btn-outline"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          padding: "0.5rem 1rem",
        }}
      >
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <LinkIcon color="var(--primary)" /> Website Link Analyzer
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Scan any webpage to instantly calculate the exact ratio of Internal vs. External outbound links for SEO auditing.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="input-field"
            placeholder="https://example.com/blog-post"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
            style={{ flexGrow: 1 }}
          />
          <button className="btn btn-primary" onClick={handleFetch} disabled={!url || loading}>
            {loading ? "Scanning..." : "Analyze Links"}
          </button>
        </div>

        {result && result.error && (
          <div style={{ padding: '1.5rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AlertTriangle size={24} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Scan Failed</strong>
              <span>{result.error}</span>
            </div>
          </div>
        )}

        {result && result.success && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div className="grid-3" style={{ gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-strong)', textAlign: 'center' }}>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>Total Links</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0f172a' }}>{result.total}</span>
              </div>
              <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #86efac', textAlign: 'center' }}>
                <span style={{ display: 'block', color: '#166534', fontWeight: 600, marginBottom: '0.5rem' }}>Internal Links</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: '#15803d' }}>{result.internal}</span>
              </div>
              <div style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #93c5fd', textAlign: 'center' }}>
                <span style={{ display: 'block', color: '#1e40af', fontWeight: 600, marginBottom: '0.5rem' }}>External Links</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1d4ed8' }}>{result.external}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              Sample of Found Links (up to 100)
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '500px', overflowY: 'auto', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '0.5rem' }}>
              {result.links.map((link: any, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: i % 2 === 0 ? '#f8fafc' : 'white', borderRadius: '4px' }}>
                  {link.type === 'Internal' ? (
                     <span style={{ padding: '0.2rem 0.5rem', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: 600, borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ShieldCheck size={12} /> Internal</span>
                  ) : (
                     <span style={{ padding: '0.2rem 0.5rem', background: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: 600, borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ExternalLink size={12} /> External</span>
                  )}
                  <span style={{ fontSize: '0.9rem', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{link.url}</span>
                </div>
              ))}
              {result.total === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No links were found on this page.</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="prose">
        <h2>What is a Link Analyzer?</h2>
        <p>Our Link Analyzer acts as an algorithmic crawler that scans the raw HTML of any webpage and extracts every single clickable hyperlink embedded in the code. It then categorizes those links into two distinct groups:</p>
        <ul>
          <li><strong>Internal Links:</strong> Links that point to other pages on your exact same domain (e.g., your "About Us" or "Contact" page).</li>
          <li><strong>External Links:</strong> Links that point away from your website to a third-party domain (e.g., a Wikipedia reference or an affiliate link).</li>
        </ul>

        <h2>Why is Link Ratio important for SEO?</h2>
        <p>In the world of Search Engine Optimization, every single webpage you create has a certain amount of algorithmic "Link Juice" or authority. When you link to another page, you are actively passing a small portion of your authority to that target URL.</p>
        
        <h3>The Dangers of Too Many External Links</h3>
        <p>If you write a blog post and include 50 external outbound links to other websites, you are effectively bleeding your SEO authority dry. You are telling Google to leave your website and go read the 50 other websites instead. If you have too many external links, Google may flag your page as a "spam directory" and penalize your rankings.</p>
        
        <h3>The Power of Internal Linking</h3>
        <p>Conversely, a strong Internal Linking structure acts like a spiderweb that traps Google's bots inside your website. By interlinking your own blog posts to one another, you recycle your SEO authority and pass it to your own pages, boosting your overall domain authority and ensuring everything ranks higher on Google Search.</p>
      </div>
    </div>
  );
}
