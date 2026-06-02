"use client";

import { useState } from "react";
import { FileDigit, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { checkPageSize } from "./actions";

export default function PageSizeChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    
    try {
      const data = await checkPageSize(url);
      setResult(data);
    } catch (e) {
      setResult({ error: "An unexpected network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (kb: number) => {
    if (kb < 100) return '#16a34a'; // Excellent
    if (kb < 500) return '#ca8a04'; // Good
    if (kb < 1500) return '#ea580c'; // Heavy
    return '#dc2626'; // Terrible
  };

  const getStatusText = (kb: number) => {
    if (kb < 100) return 'Excellent (Lightning Fast)';
    if (kb < 500) return 'Good (Standard Size)';
    if (kb < 1500) return 'Heavy (Needs Optimization)';
    return 'Terrible (Extremely Slow)';
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <FileDigit color="var(--primary)" /> Website Page Size Checker
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Analyze the total HTML byte size of any webpage to optimize load times and improve SEO rankings.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="input-field"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            style={{ flexGrow: 1 }}
          />
          <button className="btn btn-primary" onClick={handleCheck} disabled={!url || loading}>
            {loading ? "Analyzing..." : "Calculate Size"}
          </button>
        </div>

        {result && result.error && (
          <div style={{ padding: '1.5rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <XCircle size={24} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Analysis Failed</strong>
              <span>{result.error}</span>
            </div>
          </div>
        )}

        {result && result.success && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              Size Report for: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{result.url}</span>
            </h3>
            
            <div className="grid-2" style={{ gap: '1.5rem' }}>
              <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Raw Size (Bytes)</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                  {result.bytes.toLocaleString()} B
                </span>
              </div>
              
              <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Size (Kilobytes)</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: getStatusColor(result.bytes / 1024), fontFamily: 'monospace' }}>
                  {(result.bytes / 1024).toFixed(2)} KB
                </span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem', background: result.bytes / 1024 < 500 ? '#f0fdf4' : '#fffbeb', border: `1px solid ${result.bytes / 1024 < 500 ? '#86efac' : '#fde68a'}` }}>
              {result.bytes / 1024 < 500 ? <CheckCircle size={32} color="#16a34a" /> : <AlertTriangle size={32} color="#ca8a04" />}
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                  Performance Verdict: {getStatusText(result.bytes / 1024)}
                </strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  The global average HTML document size is around 100 KB to 500 KB. If your document is larger than 1.5 MB, you are likely embedding unoptimized base64 images directly into your HTML, which will destroy your loading speeds.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="prose">
        <h2>Why does Page Size Matter for SEO?</h2>
        <p>In modern web development, speed is everything. Google's algorithm uses "Page Load Time" as a critical ranking factor. If your website takes longer than 3 seconds to load, over 50% of mobile users will hit the back button and visit your competitor instead.</p>
        <p>The total byte size of your raw HTML document is the foundation of your loading speed. Before a browser can download your CSS stylesheets, javascript files, or beautiful background images, it must first download the entire HTML file to figure out where those assets are located.</p>

        <h2>How big is too big?</h2>
        <ul>
          <li><strong>Under 100 KB:</strong> Incredible. Your website is highly optimized and will load instantly even on terrible 3G mobile networks.</li>
          <li><strong>100 KB - 500 KB:</strong> Normal. This is the industry standard for a modern webpage with average complexity.</li>
          <li><strong>500 KB - 1.5 MB:</strong> Heavy. Your HTML is getting bloated. You might be using too many nested <code>div</code> tags, or generating massive inline CSS/JS blocks instead of linking to external files.</li>
          <li><strong>Over 1.5 MB:</strong> Critical Error. If your raw HTML is this large, it's usually because a developer accidentally embedded a raw Base64 photograph directly into the source code, bypassing the browser's image caching mechanisms.</li>
        </ul>

        <h2>How to reduce your Page Size</h2>
        <p>To fix a bloated HTML file, you should minify your code. Minification is a process that strips out all the useless white space, tabs, and line breaks that humans use to read code, leaving a mathematically compressed single line of text for the browser to read.</p>
      </div>
    </div>
  );
}
