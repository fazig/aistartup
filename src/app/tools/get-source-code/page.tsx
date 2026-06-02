"use client";

import { useState } from "react";
import { Code2, AlertTriangle, Copy, Check } from "lucide-react";
import { fetchSourceCode } from "./actions";

export default function GetSourceCode() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleFetch = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    setCopied(false);
    
    try {
      const data = await fetchSourceCode(url);
      setResult(data);
    } catch (e) {
      setResult({ error: "An unexpected network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.sourceCode) return;
    navigator.clipboard.writeText(result.sourceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1200px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Code2 color="var(--primary)" /> Get Source Code of Webpage
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly extract and view the raw HTML source code of any URL on the internet.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="input-field"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
            style={{ flexGrow: 1 }}
          />
          <button className="btn btn-primary" onClick={handleFetch} disabled={!url || loading}>
            {loading ? "Fetching..." : "Get Source Code"}
          </button>
        </div>

        {result && result.error && (
          <div style={{ padding: '1.5rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AlertTriangle size={24} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Error</strong>
              <span>{result.error}</span>
            </div>
          </div>
        )}

        {result && result.success && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Raw HTML Code</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Size: {(result.size / 1024).toFixed(2)} KB
                </span>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied to Clipboard' : 'Copy Code'}
                </button>
              </div>
            </div>
            
            <textarea 
              className="input-field"
              style={{ 
                width: '100%', 
                minHeight: '500px', 
                background: '#0f172a', 
                color: '#38bdf8', 
                fontFamily: 'monospace', 
                fontSize: '0.85rem',
                lineHeight: 1.5,
                whiteSpace: 'pre',
                overflowWrap: 'normal',
                overflowX: 'auto',
                resize: 'vertical',
                padding: '1.5rem'
              }}
              readOnly
              value={result.sourceCode}
            />
          </div>
        )}
      </div>

      <div className="prose">
        <h2>What is HTML Source Code?</h2>
        <p>Every single website on the internet is built using a markup language called HTML (HyperText Markup Language). When you look at a beautiful website with images, videos, and styled buttons, you are looking at the graphical rendering of the code. Under the hood, it's just raw text instructing your browser where to place everything.</p>

        <h2>Why view the Source Code?</h2>
        <p>If you are learning web development, or if you are an SEO professional trying to reverse-engineer a competitor's success, analyzing their source code is incredibly powerful.</p>
        <ul>
          <li><strong>Find Hidden SEO Tags:</strong> By searching through the source code, you can find hidden Meta Keywords, Schema.org JSON-LD structured data, and Open Graph tags that aren't visible on the actual screen.</li>
          <li><strong>Steal Design Techniques:</strong> See exactly which CSS classes and Javascript libraries a beautiful website is using to achieve their animations.</li>
          <li><strong>Security Audits:</strong> Find exposed API keys, hidden tracking pixels, or malicious injected scripts.</li>
        </ul>

        <h2>Can't I just use "Right Click -&gt; View Source" in my browser?</h2>
        <p>Yes, but relying on your browser's local view source has a major flaw: Client-Side Rendering (CSR). Many modern websites (built with React or Vue) load a blank HTML page and rely on your browser to execute Javascript to build the page.</p>
        <p>Our tool runs on a remote Node.js server. By fetching the code through our tool, you see the exact, pure HTML that search engine crawlers (like Googlebot) see when they visit the page, without any of your browser's local Javascript execution getting in the way.</p>
      </div>
    </div>
  );
}
