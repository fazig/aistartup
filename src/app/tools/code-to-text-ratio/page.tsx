"use client";
import Link from "next/link";

import { useState } from "react";
import { FileCode2, AlertTriangle, PieChart, ArrowLeft } from "lucide-react";
import { checkCodeToTextRatio } from "./actions";

export default function CodeToTextRatio() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFetch = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    
    try {
      const data = await checkCodeToTextRatio(url);
      setResult(data);
    } catch (e) {
      setResult({ error: "An unexpected network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (ratio: number) => {
    if (ratio >= 25) return '#16a34a'; // Excellent
    if (ratio >= 15) return '#ca8a04'; // Good/Average
    return '#dc2626'; // Poor
  };

  const getStatusText = (ratio: number) => {
    if (ratio >= 25) return 'Excellent SEO Content Ratio';
    if (ratio >= 15) return 'Average (Acceptable)';
    return 'Poor (Too much bloat code, not enough content)';
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
          <FileCode2 color="var(--primary)" /> Code to Text Ratio Checker
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Calculate the percentage of actual human-readable text compared to the raw HTML code on any webpage.</p>
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
            {loading ? "Analyzing..." : "Calculate Ratio"}
          </button>
        </div>

        {result && result.error && (
          <div style={{ padding: '1.5rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AlertTriangle size={24} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Analysis Failed</strong>
              <span>{result.error}</span>
            </div>
          </div>
        )}

        {result && result.success && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem', alignItems: 'center', justifyContent: 'center' }}>
              
              <div style={{ position: 'relative', width: '200px', height: '200px', borderRadius: '50%', background: `conic-gradient(${getStatusColor(result.ratio)} ${result.ratio}%, #e2e8f0 ${result.ratio}% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
                <div style={{ width: '150px', height: '150px', background: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: getStatusColor(result.ratio) }}>
                    {result.ratio}%
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TEXT RATIO</span>
                </div>
              </div>

              <div style={{ flexGrow: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1.25rem', background: '#f8fafc', border: '1px solid var(--border-light)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Total HTML Size:</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{(result.totalHtmlSize / 1024).toFixed(2)} KB</span>
                </div>
                <div style={{ padding: '1.25rem', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: '#166534' }}>Text Content Size:</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: '#15803d' }}>{(result.textOnlySize / 1024).toFixed(2)} KB</span>
                </div>
                <div style={{ padding: '1.25rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: '#991b1b' }}>Code Bloat Size:</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: '#b91c1c' }}>{(result.codeOnlySize / 1024).toFixed(2)} KB</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', borderRadius: '8px', textAlign: 'center', background: result.ratio >= 15 ? '#f0fdf4' : '#fef2f2', border: `1px solid ${result.ratio >= 15 ? '#86efac' : '#fca5a5'}` }}>
              <strong style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.5rem', color: result.ratio >= 15 ? '#166534' : '#991b1b' }}>
                {getStatusText(result.ratio)}
              </strong>
              <p style={{ color: result.ratio >= 15 ? '#15803d' : '#b91c1c', margin: 0 }}>
                {result.ratio >= 15 
                  ? "Great job! Search engines love pages that are highly focused on delivering actual written content rather than massive blocks of code styling."
                  : "Warning! Your webpage is extremely bloated with CSS, Javascript, and nested HTML tags. You need to write more actual paragraph text, or compress your code immediately."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="prose">
        <h2>What is the Code to Text Ratio?</h2>
        <p>A web page is made up of two things: the hidden <strong>Code</strong> that tells the browser how to style the page (HTML, CSS, JS), and the readable <strong>Text</strong> that the user actually sees.</p>
        <p>The Code to Text Ratio is a mathematical percentage that represents how much of your web page is actual, readable content versus structural code.</p>

        <h2>Why does this matter for SEO?</h2>
        <p>Google's crawling bots are not human. When they scan your website, they have to dig through thousands of lines of raw HTML code just to find the actual sentences and paragraphs you wrote. If your website has 500,000 bytes of code, but only 500 bytes of actual text, Google will assume your page is "Thin Content" and refuse to rank it.</p>
        <p>Search engines heavily favor websites that have a high concentration of rich, valuable text. The higher your Text Ratio, the easier it is for search engines to understand your topic and rank you on page one.</p>

        <h3>What is a good ratio?</h3>
        <ul>
          <li><strong>Under 10%:</strong> Very poor. You have way too much code bloat, or simply haven't written enough paragraphs on the page.</li>
          <li><strong>15% to 25%:</strong> Good. This is the industry standard for most highly-ranking WordPress blogs.</li>
          <li><strong>Over 25%:</strong> Excellent. Your page is a powerhouse of text-heavy, high-value information that search engines will absolutely love.</li>
        </ul>
      </div>
    </div>
  );
}
