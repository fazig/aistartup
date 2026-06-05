"use client";
import Link from "next/link";

import { useState } from "react";
import { FileCode, Download, Copy, Check, ArrowLeft } from "lucide-react";

export default function RobotsTxtGenerator() {
  const [defaultRule, setDefaultRule] = useState("Allow");
  const [crawlDelay, setCrawlDelay] = useState("Default");
  const [sitemap, setSitemap] = useState("");
  const [directories, setDirectories] = useState([
    { path: "/cgi-bin/", rule: "Disallow" },
    { path: "/admin/", rule: "Disallow" }
  ]);
  const [copied, setCopied] = useState(false);

  const handleAddDirectory = () => {
    setDirectories([...directories, { path: "/", rule: "Disallow" }]);
  };

  const updateDirectory = (index: number, field: "path" | "rule", value: string) => {
    const newDirs = [...directories];
    newDirs[index][field] = value;
    setDirectories(newDirs);
  };

  const removeDirectory = (index: number) => {
    setDirectories(directories.filter((_, i) => i !== index));
  };

  const generateRobotsTxt = () => {
    let txt = `User-agent: *n`;
    
    if (defaultRule === "Disallow") {
      txt += `Disallow: /n`;
    }

    if (crawlDelay !== "Default") {
      txt += `Crawl-delay: ${crawlDelay}n`;
    }

    directories.forEach(dir => {
      if (dir.path) {
        txt += `${dir.rule}: ${dir.path}n`;
      }
    });

    if (sitemap) {
      txt += `nSitemap: ${sitemap}n`;
    }

    return txt;
  };

  const result = generateRobotsTxt();

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
          <FileCode color="var(--primary)" /> Robots.txt Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Generate a perfectly formatted robots.txt file to control how search engines crawl your website.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Configuration</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Default Access for all Crawlers</label>
            <select className="input-field" value={defaultRule} onChange={(e) => setDefaultRule(e.target.value)}>
              <option value="Allow">Allow (Recommended)</option>
              <option value="Disallow">Disallow (Block entirely)</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Crawl Delay</label>
            <select className="input-field" value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)}>
              <option value="Default">Default (No delay)</option>
              <option value="5">5 Seconds</option>
              <option value="10">10 Seconds</option>
              <option value="20">20 Seconds</option>
              <option value="60">60 Seconds</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>XML Sitemap URL (Optional)</label>
            <input type="text" className="input-field" placeholder="https://yoursite.com/sitemap.xml" value={sitemap} onChange={(e) => setSitemap(e.target.value)} />
          </div>

          <h4 style={{ marginBottom: '0.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>Custom Directory Rules</h4>
          
          {directories.map((dir, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <select className="input-field" style={{ width: '120px' }} value={dir.rule} onChange={(e) => updateDirectory(i, 'rule', e.target.value)}>
                <option value="Allow">Allow</option>
                <option value="Disallow">Disallow</option>
              </select>
              <input type="text" className="input-field" style={{ flexGrow: 1 }} value={dir.path} onChange={(e) => updateDirectory(i, 'path', e.target.value)} placeholder="e.g. /private/" />
              <button className="btn btn-outline" style={{ padding: '0 0.75rem', borderColor: '#fca5a5', color: '#dc2626' }} onClick={() => removeDirectory(i)}>X</button>
            </div>
          ))}
          
          <button className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={handleAddDirectory}>
            + Add Directory Rule
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Generated robots.txt</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
              </button>
              <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleDownload}>
                <Download size={14} /> Download
              </button>
            </div>
          </div>
          
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '300px', resize: 'none', fontFamily: 'monospace', background: '#1e293b', color: '#f8fafc' }}
            readOnly
            value={result}
          />
        </div>
      </div>

      <div className="prose">
        <h2>What is a Robots.txt file?</h2>
        <p>A <code>robots.txt</code> file is a simple text file that sits at the very root of your website (e.g., <code>yoursite.com/robots.txt</code>). It acts as the "front door bouncer" for search engine crawlers like Googlebot, Bingbot, and Yahoo.</p>
        <p>When Google visits your website to index it, the very first thing it does is look for this file. The file tells the crawlers exactly which pages they are allowed to look at, and which pages they are strictly forbidden from scanning.</p>

        <h2>Why do you need one?</h2>
        <p>If you don't have a robots.txt file, Google will assume it has permission to crawl everything. This might sound good, but it is actually terrible for SEO! Your website likely has admin dashboards, login pages, shopping cart checkout pages, and duplicate category pages.</p>
        <p>If Google crawls these useless pages, you waste your "Crawl Budget." By explicitly blocking useless directories (like <code>/wp-admin/</code> or <code>/checkout/</code>) using our generator, you force Google to focus entirely on your high-quality blog posts and product pages.</p>

        <h3>What is Crawl Delay?</h3>
        <p>If you run a website on a very cheap shared hosting server, you might notice your website slowing down or crashing randomly. This is often caused by aggressive bots (like Ahrefs or Baidu) trying to download hundreds of your pages at the exact same time.</p>
        <p>By adding a <strong>Crawl Delay</strong> of 10 seconds, you politely tell these automated bots to wait 10 seconds between each page download, ensuring your server stays fast and healthy for real human visitors!</p>
      </div>
    </div>
  );
}
