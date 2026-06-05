"use client";
import Link from "next/link";

import { useState } from "react";
import { Link2, Copy, Check, ArrowLeft } from "lucide-react";

export default function UrlRewritingTool() {
  const [dynamicUrl, setDynamicUrl] = useState("");
  const [staticUrl, setStaticUrl] = useState("");
  const [htaccess, setHtaccess] = useState("");
  const [copied, setCopied] = useState(false);

  const generateRewrite = () => {
    try {
      const urlObj = new URL(dynamicUrl);
      const params = new URLSearchParams(urlObj.search);
      const path = urlObj.pathname;
      
      let newStaticPath = path;
      let rewriteRule = "";
      let conditions = "";
      
      const paramKeys = Array.from(params.keys());
      const paramValues = Array.from(params.values());

      if (paramKeys.length === 1) {
        // e.g. test.php?id=123 -> test/123
        const cleanPath = path.replace('.php', '').replace('.html', '');
        newStaticPath = `${cleanPath}/${paramValues[0]}`;
        
        rewriteRule = `RewriteEngine On\\nRewriteRule ^${cleanPath.substring(1)}/([a-zA-Z0-9_-]+)/?$ ${path.substring(1)}?${paramKeys[0]}=$1 [NC,L]`;
      } 
      else if (paramKeys.length === 2) {
        // e.g. test.php?category=books&id=123 -> test/books/123
        const cleanPath = path.replace('.php', '').replace('.html', '');
        newStaticPath = `${cleanPath}/${paramValues[0]}/${paramValues[1]}`;
        
        rewriteRule = `RewriteEngine On\\nRewriteRule ^${cleanPath.substring(1)}/([a-zA-Z0-9_-]+)/([a-zA-Z0-9_-]+)/?$ ${path.substring(1)}?${paramKeys[0]}=$1&${paramKeys[1]}=$2 [NC,L]`;
      }
      else {
         setHtaccess("Error: This basic tool supports generating clean URLs for up to 2 query parameters.");
         return;
      }

      setStaticUrl(`${urlObj.protocol}//${urlObj.host}${newStaticPath}`);
      setHtaccess(rewriteRule);
    } catch (e) {
      setHtaccess("Please enter a valid URL with HTTP/HTTPS (e.g. https://yoursite.com/page.php?id=12)");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htaccess);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <Link2 color="var(--primary)" /> URL Rewriting Tool
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Convert long, ugly dynamic URLs with query parameters into clean, SEO-friendly static URLs.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Enter Dynamic URL</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Ugly Dynamic URL</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="https://mysite.com/item.php?category=shoes&id=105"
              value={dynamicUrl}
              onChange={(e) => setDynamicUrl(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }} onClick={generateRewrite} disabled={!dynamicUrl}>
            Generate SEO Static URL
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Rewritten Output</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>New Clean URL (Example)</label>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)', wordBreak: 'break-all', color: 'var(--primary)', fontWeight: 600 }}>
              {staticUrl || "https://mysite.com/item/shoes/105"}
            </div>
          </div>

          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>.htaccess Rewrite Rule</label>
              <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }} onClick={handleCopy} disabled={!htaccess}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <textarea 
              className="input-field"
              style={{ width: '100%', minHeight: '120px', background: '#1e293b', color: '#f8fafc', fontFamily: 'monospace', fontSize: '0.85rem' }}
              readOnly
              value={htaccess}
              placeholder="RewriteEngine On..."
            />
          </div>
        </div>
      </div>

      <div className="prose">
        <h2>What is URL Rewriting?</h2>
        <p>If you build a website using PHP or another server-side language, you often use "Query Parameters" to fetch data from a database. This creates messy, dynamic URLs that look like this: <code>https://store.com/product.php?cat=shirts&id=5892</code>.</p>
        <p>Search engines like Google absolutely hate dynamic URLs. They are hard to crawl, they don't contain clear keywords, and they look extremely spammy to human users trying to click them on social media.</p>

        <h2>The SEO Solution</h2>
        <p>To fix this, webmasters use Apache <code>mod_rewrite</code> rules in their <code>.htaccess</code> file. This allows you to present a beautiful, clean, static URL to the public (like <code>https://store.com/product/shirts/5892</code>), while the server secretly translates it back into the ugly dynamic URL behind the scenes so your database can still read it!</p>
        <p>Our tool automatically generates the complex Regex (Regular Expression) code required to make this translation happen. Just paste the code into your <code>.htaccess</code> file, and your server will handle the rest.</p>
      </div>
    </div>
  );
}
