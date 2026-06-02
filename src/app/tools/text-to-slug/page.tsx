"use client";

import { useState } from "react";
import { Link2, Copy, Check } from "lucide-react";

export default function TextToSlug() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const generateSlug = (input: string) => {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars (except spaces and dashes)
      .replace(/[\s_-]+/g, '-') // Swap spaces and underscores with a single dash
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
  };

  const slug = generateSlug(text);

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Link2 color="var(--primary)" /> Text to Slug Converter
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly transform messy titles and strings into clean, SEO-friendly URL slugs.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Enter your Title or String</h3>
          <input 
            type="text" 
            className="input-field"
            placeholder="e.g. The Ultimate Guide to Next.js in 2024!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid var(--border-strong)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0, color: 'var(--text-muted)' }}>Generated URL Slug</h4>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!slug}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Slug'}
            </button>
          </div>
          
          <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', color: 'var(--primary)', wordBreak: 'break-all', minHeight: '2rem' }}>
            {slug || <span style={{ color: '#cbd5e1' }}>the-ultimate-guide-to-nextjs-in-2024</span>}
          </div>
        </div>
      </div>

      <div className="prose">
        <h2>What is a URL Slug?</h2>
        <p>If you look at the address bar of your browser right now, you'll see a website domain followed by a slash, and then a few words connected by dashes. The part after the slash is called the <strong>URL Slug</strong>.</p>
        <p>For example, in the URL <code>https://startupai.tech/tools/text-to-slug</code>, the exact string "text-to-slug" is the slug. It is the human-readable part of the web address that identifies the specific page on the website.</p>

        <h2>Why do you need to convert text to a slug?</h2>
        <p>You cannot use spaces or special punctuation marks in a web address. If you try to create a webpage with the URL <code>/my awesome post!</code>, web browsers will violently reject it or try to encode the space into an ugly <code>%20</code> character, resulting in a horrible URL like <code>/my%20awesome%20post!</code>.</p>
        <p>To fix this, web developers have to "slugify" their article titles before saving them to the database. This involves stripping out all the commas, exclamation points, and apostrophes, converting all the uppercase letters to lowercase, and replacing every single space with a clean hyphen (-).</p>

        <h2>SEO Benefits of Clean Slugs</h2>
        <p>Google has explicitly stated that they use the words inside your URL as a ranking factor. If a user is searching for "healthy dog food", and your URL slug is <code>/healthy-dog-food</code>, you have a significantly higher chance of ranking than a competitor whose URL is a messy ID like <code>/post?id=827364</code>.</p>
        <p>Using our Text to Slug converter ensures that your URLs are mathematically perfectly formatted to satisfy Google's web crawlers while remaining incredibly easy for a human being to read and share on social media.</p>
      </div>
    </div>
  );
}
