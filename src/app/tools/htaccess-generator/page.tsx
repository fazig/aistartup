"use client";

import { useState } from "react";
import { FileCode, Copy, Check } from "lucide-react";

export default function HtaccessGenerator() {
  const [oldUrl, setOldUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [redirectType, setRedirectType] = useState("301");
  const [copied, setCopied] = useState(false);

  const generateHtaccess = () => {
    if (!oldUrl || !newUrl) return "";

    // Extract path from old URL if they pasted a full domain
    let oldPath = oldUrl;
    try {
      if (oldUrl.startsWith('http')) {
        const urlObj = new URL(oldUrl);
        oldPath = urlObj.pathname;
      }
    } catch(e) {
      // Ignore invalid URLs, just use raw string
    }

    if (!oldPath.startsWith('/')) {
      oldPath = '/' + oldPath;
    }

    return `Redirect ${redirectType} ${oldPath} ${newUrl}`;
  };

  const handleCopy = () => {
    const code = generateHtaccess();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const code = generateHtaccess();

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <FileCode color="var(--primary)" /> .htaccess Redirect Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly generate Apache server redirect rules to safely move your web pages without losing SEO rankings.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Form Area */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Redirect Details</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Old Page (Source)</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. /old-blog-post OR https://yoursite.com/old-page"
              value={oldUrl}
              onChange={(e) => setOldUrl(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>New Page (Destination)</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. https://yoursite.com/shiny-new-post"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Redirect Type</label>
            <select 
              className="input-field"
              value={redirectType}
              onChange={(e) => setRedirectType(e.target.value)}
              style={{ cursor: 'pointer', background: 'white' }}
            >
              <option value="301">301 - Permanent Redirect (Best for SEO)</option>
              <option value="302">302 - Temporary Redirect</option>
            </select>
          </div>
        </div>

        {/* Output Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Generated .htaccess Code</h3>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!code}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          
          <div style={{ flexGrow: 1, background: '#1e293b', color: '#f8fafc', borderRadius: '8px', padding: '1.5rem', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {!code ? (
              <span style={{ color: '#64748b' }}>// Your server rewrite rule will appear here...</span>
            ) : (
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {code}
              </pre>
            )}
          </div>
          
          {redirectType === "302" && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fffbeb', color: '#92400e', fontSize: '0.85rem', border: '1px solid #fde68a', borderRadius: '6px' }}>
              <strong>Warning:</strong> You selected a 302 Temporary redirect. Search engines will not pass your SEO ranking juice to the new page. Only use this for maintenance!
            </div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What is an .htaccess file?</h2>
        <p>If your website is hosted on an Apache web server (which is the vast majority of cheap shared hosting providers like Bluehost, HostGator, or GoDaddy), there is a hidden, extremely powerful file sitting in the root folder of your website named <code>.htaccess</code> (Hypertext Access).</p>
        <p>This tiny configuration file essentially acts as the traffic cop for your website. It intercepts every single visitor trying to load a page and gives them directions on where to go before the website actually loads.</p>

        <h2>Why do you need to generate Redirects?</h2>
        <p>Let's say you published a blog post in 2018 with the URL <code>/top-10-laptops-2018</code>. Over the years, that page earned thousands of backlinks from other websites and ranks #1 on Google. In 2024, you want to update the article and change the URL to <code>/best-laptops</code>. </p>
        <p>If you just delete the old page and create a new one, every single person who clicks those old backlinks across the internet will be met with a massive, ugly "404 Page Not Found" error. Worse, Google will notice the 404 error, delete your #1 ranking, and you will lose all of your traffic instantly.</p>
        <p>To prevent this, you have to write a redirect rule in your <code>.htaccess</code> file. It tells the Apache traffic cop: <em>"Hey, if anyone tries to visit the 2018 page, instantly teleport them to the new page instead."</em></p>

        <h2>301 vs 302 Redirects: The SEO Secret</h2>
        <p>Our tool gives you two options for your redirect type. Choosing the wrong one can destroy your business.</p>
        <ul>
          <li><strong>301 Permanent Redirect:</strong> This is the Holy Grail of SEO. It tells Google that the old page is dead forever, and they should immediately transfer 100% of the "Link Juice" (ranking power) from the old URL to the new URL. Always use this when updating content or changing your domain name.</li>
          <li><strong>302 Temporary Redirect:</strong> This tells Google, <em>"Hey, the page is broken right now because I'm doing server maintenance, so send users to this backup page for a few days. But don't transfer my ranking power, because I'm bringing the original page back soon!"</em></li>
        </ul>
      </div>
    </div>
  );
}
