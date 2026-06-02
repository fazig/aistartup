"use client";

import { useState } from "react";
import { Link2, AlertTriangle, CheckCircle, RefreshCcw, XCircle } from "lucide-react";
import { checkWwwRedirect } from "./actions";

export default function WwwRedirectChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    
    try {
      const data = await checkWwwRedirect(url);
      setResult(data);
    } catch (e) {
      setResult({ error: "An unexpected network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: number, is301: boolean) => {
    if (status === 200) return <CheckCircle size={20} color="#16a34a" />;
    if (is301) return <RefreshCcw size={20} color="#2563eb" />;
    return <AlertTriangle size={20} color="#ea580c" />;
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Link2 color="var(--primary)" /> WWW Redirect Checker
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Analyze your domain's server headers to ensure canonical WWW & Non-WWW redirects are properly configured for SEO.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="input-field"
            placeholder="e.g. google.com or startupai.tech"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            style={{ flexGrow: 1 }}
          />
          <button className="btn btn-primary" onClick={handleCheck} disabled={!url || loading}>
            {loading ? "Analyzing..." : "Check Redirects"}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
              Redirect Analysis for: <strong>{result.domain}</strong>
            </h3>
            
            <div className="grid-2" style={{ gap: '1rem' }}>
              {/* Non-WWW Panel */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-strong)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '1.1rem' }}>Non-WWW Version</strong>
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {getStatusIcon(result.nonWww.status, result.nonWww.is301)}
                    <span style={{ fontWeight: 600 }}>HTTP {result.nonWww.status}</span>
                  </div>
                  {result.nonWww.redirectsTo && (
                    <div style={{ fontSize: '0.85rem', color: '#2563eb', wordBreak: 'break-all' }}>
                      &rarr; Redirects to: {result.nonWww.redirectsTo}
                    </div>
                  )}
                  {!result.nonWww.is301 && result.nonWww.status !== 200 && (
                     <span style={{ fontSize: '0.8rem', color: '#ea580c' }}>Warning: Not a permanent 301 redirect.</span>
                  )}
                </div>
              </div>

              {/* WWW Panel */}
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-strong)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '1.1rem' }}>WWW Version</strong>
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {getStatusIcon(result.www.status, result.www.is301)}
                    <span style={{ fontWeight: 600 }}>HTTP {result.www.status}</span>
                  </div>
                  {result.www.redirectsTo && (
                    <div style={{ fontSize: '0.85rem', color: '#2563eb', wordBreak: 'break-all' }}>
                      &rarr; Redirects to: {result.www.redirectsTo}
                    </div>
                  )}
                  {!result.www.is301 && result.www.status !== 200 && (
                     <span style={{ fontSize: '0.8rem', color: '#ea580c' }}>Warning: Not a permanent 301 redirect.</span>
                  )}
                </div>
              </div>
            </div>

            {/* SEO Verdict */}
            <div style={{ padding: '1rem', borderRadius: '8px', background: (result.nonWww.is301 || result.www.is301) && (result.nonWww.status === 200 || result.www.status === 200) ? '#f0fdf4' : '#fef2f2', border: `1px solid ${(result.nonWww.is301 || result.www.is301) && (result.nonWww.status === 200 || result.www.status === 200) ? '#86efac' : '#fca5a5'}` }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>SEO Verdict</strong>
              {(result.nonWww.status === 200 && result.www.status === 200) ? (
                <span style={{ color: '#dc2626' }}><strong>Warning! Duplicate Content Detected.</strong> Both the WWW and Non-WWW versions of your site are returning a 200 OK status. This splits your SEO power in half. You must configure your .htaccess file to redirect one to the other!</span>
              ) : (result.nonWww.is301 || result.www.is301) ? (
                <span style={{ color: '#166534' }}><strong>Excellent!</strong> One version of your site properly forces a 301 Permanent Redirect to the canonical version. Your SEO rankings are safe and consolidated.</span>
              ) : (
                <span style={{ color: '#ea580c' }}><strong>Suboptimal Configuration.</strong> Neither version of your site is utilizing a proper 301 Permanent Redirect. This could confuse search engines.</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="prose">
        <h2>The WWW vs. Non-WWW SEO Trap</h2>
        <p>When you buy a domain name (like <code>startupai.tech</code>), you actually own two distinct variations of that domain: the "naked" domain (<code>http://startupai.tech</code>) and the subdomain variation (<code>http://www.startupai.tech</code>).</p>
        <p>Most beginners assume that these two addresses are the exact same thing. However, to Google's web crawlers, they are viewed as two completely different, separate websites. If both of these links load your homepage successfully, Google will assume that you have cloned your own website. This triggers a "Duplicate Content" penalty in their algorithm, which will destroy your search engine rankings.</p>

        <h2>How to fix Duplicate Content issues</h2>
        <p>To avoid this devastating SEO penalty, you must choose <strong>one</strong> version of your website to be the "Canonical" (master) version. It doesn't matter if you prefer the WWW version or the naked version, as long as you pick one.</p>
        <p>Once you make your choice, you must configure your web server (usually via an <code>.htaccess</code> file on Apache servers) to force a <strong>301 Permanent Redirect</strong> from the rejected version to the master version.</p>
        
        <h3>How to read our tool's report</h3>
        <p>When you run our WWW Redirect Checker, our independent servers fetch the HTTP headers for both versions of your domain.</p>
        <ul>
          <li><strong>If both return HTTP 200 OK:</strong> You have a massive SEO problem. Neither is redirecting. You are leaking SEO juice.</li>
          <li><strong>If one returns HTTP 301 and the other returns HTTP 200:</strong> Your website is perfectly optimized! The 301 is successfully forwarding all traffic and SEO ranking power to the 200 (master) domain.</li>
          <li><strong>If you see HTTP 302:</strong> You are using a temporary redirect. Change it to a 301 immediately, as 302 redirects do not pass SEO authority to the new domain.</li>
        </ul>
      </div>
    </div>
  );
}
