"use client";
import Link from "next/link";

import { useState } from "react";
import { FileCode2, Copy, Check, Info, ArrowLeft } from "lucide-react";

export default function XmlSitemapGenerator() {
  const [urlsInput, setUrlsInput] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [priority, setPriority] = useState("0.8");
  
  const [generatedSitemap, setGeneratedSitemap] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate the XML
  const generateSitemap = () => {
    if (!urlsInput.trim()) return;

    // Split by newlines, clean up whitespace, remove empty lines
    const urls = urlsInput.split('\n').map(u => u.trim()).filter(u => u.length > 0);
    
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    urls.forEach(url => {
      // Ensure it starts with http/https
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      
      xml += `  <url>\n`;
      xml += `    <loc>${formattedUrl}</loc>\n`;
      xml += `    <lastmod>${date}</lastmod>\n`;
      xml += `    <changefreq>${frequency}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    
    setGeneratedSitemap(xml);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSitemap);
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
          <FileCode2 color="var(--primary)" /> XML Sitemap Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly generate a valid XML sitemap to submit to Google Search Console for faster indexing.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Form Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Sitemap Details</h3>
          
          <div style={{ marginBottom: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>List of Page URLs (One per line)</label>
            <textarea 
              className="input-field" 
              style={{ flexGrow: 1, minHeight: '150px', resize: 'vertical' }}
              placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/contact"
              value={urlsInput}
              onChange={(e) => setUrlsInput(e.target.value)}
            />
          </div>

          <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Update Frequency</label>
              <select 
                className="input-field"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                style={{ cursor: 'pointer', background: 'white' }}
              >
                <option value="always">Always</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly (Recommended)</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Priority (0.0 to 1.0)</label>
              <select 
                className="input-field"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ cursor: 'pointer', background: 'white' }}
              >
                <option value="1.0">1.0 (Homepage)</option>
                <option value="0.9">0.9</option>
                <option value="0.8">0.8 (Standard Pages)</option>
                <option value="0.7">0.7</option>
                <option value="0.6">0.6</option>
                <option value="0.5">0.5 (Blog Posts)</option>
                <option value="0.4">0.4</option>
                <option value="0.3">0.3</option>
                <option value="0.2">0.2</option>
                <option value="0.1">0.1</option>
                <option value="0.0">0.0 (Archived)</option>
              </select>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }} 
            onClick={generateSitemap} 
            disabled={!urlsInput.trim()}
          >
            Generate XML
          </button>
        </div>

        {/* Output Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Generated XML Code</h3>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!generatedSitemap}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          
          <div style={{ flexGrow: 1, background: '#1e293b', color: '#f8fafc', borderRadius: '8px', padding: '1.5rem', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {!generatedSitemap ? (
              <span style={{ color: '#64748b' }}>// Your XML markup will appear here...</span>
            ) : (
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {generatedSitemap}
              </pre>
            )}
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <Info color="#b45309" size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#92400e', display: 'block', marginBottom: '0.25rem' }}>What to do next:</strong>
              <p style={{ color: '#b45309', fontSize: '0.875rem', margin: 0 }}>
                Copy this code and save it as a file named <code>sitemap.xml</code>. Upload it to the root folder of your website, then submit the URL to Google Search Console.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What exactly is an XML Sitemap?</h2>
        <p>Imagine going to a massive, multi-story library that has no signs, no librarian, and absolutely no indexing system. You would have to wander blindly through the aisles to find the book you are looking for. That is exactly what the internet looks like to a search engine robot before it finds a sitemap.</p>
        <p>An <strong>XML Sitemap</strong> is a specifically formatted blueprint of your entire website. It provides a direct, hierarchical list of all the URLs on your site that you want Google to find. Instead of forcing Googlebot to blindly guess where your pages are by following random links, a sitemap hands them the exact GPS coordinates to every single article, product, and landing page you've built.</p>

        <h2>Why is this generator so useful?</h2>
        <p>If you use a modern Content Management System like WordPress, Shopify, or Next.js, there are usually plugins that generate sitemaps for you automatically. However, if you are building a custom HTML website, a small landing page, or a static application, you have to build your sitemap by hand.</p>
        <p>Writing XML code by hand is incredibly tedious and highly prone to syntax errors (like missing a closing tag). If your XML is invalid, Google Search Console will reject it entirely. This tool allows you to simply paste a plain text list of your website's URLs, and it will instantly format them into mathematically perfect, valid XML markup.</p>

        <h2>Understanding Sitemap Parameters</h2>
        <p>When you use the generator above, you will notice a few extra options next to your URLs. Here is what they mean:</p>
        
        <h3>Update Frequency (Changefreq)</h3>
        <p>This tells search engines roughly how often the content on that specific page changes. If you are submitting a blog post that will never be edited again, set it to "Yearly". If you are submitting the homepage of a news website that updates constantly, set it to "Hourly" or "Daily". This helps Google decide how frequently they should waste their computing resources re-crawling your page.</p>

        <h3>Priority</h3>
        <p>This is a ranking scale from 0.0 to 1.0 that tells search engines how important a specific page is <em>relative to the rest of your own website</em>. Note: Setting all your pages to 1.0 will not trick Google into ranking you higher! It is simply a hint. Generally, your homepage should be 1.0, your main category pages should be 0.8, and old blog posts should be 0.5.</p>

        <h2>How to submit your Sitemap to Google</h2>
        <p>Once you've generated the code and saved it as a <code>sitemap.xml</code> file in your website's root directory (so it's accessible at <code>yourwebsite.com/sitemap.xml</code>), you aren't done yet. You need to log into your Google Search Console account, click on the "Sitemaps" tab on the left sidebar, and paste your URL into the submission box. Google will process it within a few days!</p>
      </div>
    </div>
  );
}
