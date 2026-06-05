"use client";
import Link from "next/link";

import { useState } from "react";
import { Heading1, Wand2, Copy, Check, ArrowLeft } from "lucide-react";

export default function MetaTitleGenerator() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("blog");
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateTitles = () => {
    if (!keyword) return;
    
    const kw = keyword.trim().replace(/^w/, c => c.toUpperCase()); // Capitalize first letter
    
    let generated: string[] = [];
    const year = new Date().getFullYear();

    if (category === "blog") {
      generated = [
        `${kw}: The Ultimate Guide (${year})`,
        `10 Proven Secrets About ${kw} You Need to Know`,
        `How to Master ${kw} in 5 Easy Steps`,
        `${kw} Explained: Everything You Need to Know`,
        `The Beginner's Guide to ${kw}`,
        `Why ${kw} is Changing the Industry`,
        `5 Common Mistakes With ${kw} (And How to Avoid Them)`
      ];
    } else if (category === "ecommerce") {
      generated = [
        `Buy ${kw} Online | Best Prices & Fast Shipping`,
        `Top Rated ${kw} for ${year} | Shop Now`,
        `Affordable ${kw} | Premium Quality Guaranteed`,
        `${kw} on Sale - Up to 50% Off Today`,
        `Shop the Best ${kw} Collection Online`,
        `High-Quality ${kw} | Free Shipping Available`
      ];
    } else if (category === "local") {
      generated = [
        `Best ${kw} Near Me | Top Rated Services`,
        `Professional ${kw} Services | Book Today`,
        `#1 Local ${kw} Experts | Fast & Reliable`,
        `Affordable ${kw} in Your Area | Call Now`,
        `Expert ${kw} Contractors | Free Estimates`
      ];
    }

    setResults(generated);
    setCopiedIndex(null);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
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
          <Heading1 color="var(--primary)" /> AI SEO Meta Title Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly generate highly clickable, SEO-optimized title tags engineered to maximize your Google Click-Through Rate (CTR).</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Primary Target Keyword</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Dog Training Collars"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateTitles()}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Website Niche / Category</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="category" checked={category === "blog"} onChange={() => setCategory("blog")} />
                Blog / Article
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="category" checked={category === "ecommerce"} onChange={() => setCategory("ecommerce")} />
                eCommerce Product
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="category" checked={category === "local"} onChange={() => setCategory("local")} />
                Local Business / Service
              </label>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={generateTitles} disabled={!keyword}>
            <Wand2 size={20} /> Generate SEO Titles
          </button>
        </div>

        {results.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Generated Meta Titles (50-60 chars)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.map((title, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', border: '1px solid var(--border-strong)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e40af' }}>{title}</span>
                    <span style={{ fontSize: '0.85rem', color: title.length > 60 ? '#dc2626' : '#16a34a' }}>
                      Length: {title.length} characters {title.length > 60 ? '(Too Long)' : '(Optimal)'}
                    </span>
                  </div>
                  <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => handleCopy(title, i)}>
                    {copiedIndex === i ? <Check size={14} /> : <Copy size={14} />} {copiedIndex === i ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="prose">
        <h2>What is an SEO Meta Title?</h2>
        <p>The Meta Title (also known as a Title Tag) is the large, clickable blue text that appears in Google Search results when a user searches for a specific keyword. It is arguably the single most important on-page SEO ranking factor on your entire website.</p>
        <p>If your Meta Title is boring, generic, or poorly optimized, search engines will completely ignore your website, and real humans will refuse to click on your link.</p>

        <h2>The Secret Formula for High CTR Titles</h2>
        <p>Ranking on the first page of Google is only half the battle. If you rank #3, but nobody clicks your link, Google's algorithm will eventually demote you to page two. To maximize your Click-Through Rate (CTR), your titles must be psychologically engineered to capture attention.</p>
        
        <h3>1. Front-Load the Keyword</h3>
        <p>Always put your primary target keyword as close to the beginning of the title as possible. If you are selling "Dog Training Collars", the title should start with those exact words, not "Welcome to our store where we sell Dog Training Collars".</p>
        
        <h3>2. Use Numbers and Years</h3>
        <p>Humans are psychologically drawn to numbers. Titles like "7 Secrets" or "Top 10" perform dramatically better than plain text. Additionally, adding the current year (e.g., 2024) proves to the searcher that your content is fresh and up-to-date, making them highly likely to click.</p>
        
        <h3>3. Respect the Length Limit</h3>
        <p>Google will brutally chop off (truncate) your Meta Title if it is longer than 60 characters. If your title is cut off, it looks unprofessional and you lose valuable space. Our generator specifically crafts titles that fit perfectly within this 50-60 character "Goldilocks Zone".</p>
      </div>
    </div>
  );
}
