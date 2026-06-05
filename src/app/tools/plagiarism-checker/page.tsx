"use client";
import Link from "next/link";

import { useState } from "react";
import { Search, ExternalLink, ArrowLeft } from "lucide-react";

export default function PlagiarismChecker() {
  const [text, setText] = useState("");
  const [sentences, setSentences] = useState<string[]>([]);

  const analyzeText = () => {
    if (!text.trim()) return;

    // Split text into sentences using basic regex (period, exclamation, question mark followed by space)
    const rawSentences = text.split(/(?<=[.!?])\s+/);
    
    // Filter out tiny fragments and clean up whitespace
    const validSentences = rawSentences
      .map(s => s.trim())
      .filter(s => s.length > 20); // only check sentences longer than 20 chars

    setSentences(validSentences);
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
          <Search color="var(--primary)" /> Plagiarism Checker
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Break down your article into exact-match Google Search queries to easily find stolen or duplicate content across the web.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Paste Your Content</h3>
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '200px', resize: 'vertical' }}
            placeholder="Paste your essay, article, or blog post here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={analyzeText} disabled={!text}>
            Scan for Plagiarism
          </button>
        </div>

        {sentences.length > 0 && (
          <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Plagiarism Scan Links</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              We have broken your text down into key sentences. Click the search buttons below to run an <strong>exact-match</strong> Google search (using quotes). If Google finds results for the exact sentence, the content may be plagiarized!
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sentences.map((sentence, idx) => (
                <div key={idx} style={{ padding: '1rem', background: '#f8fafc', border: '1px solid var(--border-strong)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                    "{sentence}"
                  </div>
                  <a 
                    href={`https://www.google.com/search?q="${encodeURIComponent(sentence)}"`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ flexShrink: 0, display: 'inline-flex', gap: '0.5rem' }}
                  >
                    Check Google <ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="prose">
        <h2>How does this Plagiarism Checker work?</h2>
        <p>If you have ever hired a freelance writer or bought a pre-written article online, your biggest fear is probably receiving stolen, copy-pasted content. If you publish heavily plagiarized content on your website, Google will flag your site for "Duplicate Content" and completely strip your pages from the search rankings.</p>
        <p>Most premium plagiarism checkers charge expensive monthly fees to scan your documents. They work by scraping the internet behind the scenes. However, you can achieve the exact same result for free using a clever Google Search operator.</p>

        <h3>The "Exact Match" Secret</h3>
        <p>If you type a normal sentence into Google, it will find pages that contain those words in any random order. But, if you wrap your sentence in double quotation marks (like <code>"this is an exact match query"</code>), you force Google to only return websites that feature that exact sentence, word-for-word, in that exact order.</p>
        <p>Our free tool automates this process for you. You paste your massive article into the box, and our algorithm splits it into logical sentences. It then generates one-click "Exact Match" Google Search links for every sentence. If you click a link and Google says "No results found for...", congratulations! Your sentence is 100% unique. If Google returns a blog post from 2018, you know your writer copy-pasted their work.</p>

        <h2>Why check manually instead of automatically?</h2>
        <p>Web browsers have strict security rules (called CORS) that physically prevent a website from secretly running Google searches in the background without your permission. To keep this tool 100% free and lightning fast without bouncing you through paid proxy servers, we generate the direct links for you to check the most suspicious sentences yourself.</p>
        
        <h2>Can it detect AI-generated content?</h2>
        <p>Plagiarism and AI generation are two different things. Plagiarism is taking a human being's published work and claiming it as your own. AI generation (like ChatGPT) creates entirely new, mathematically unique sentences every time you prompt it. Therefore, an AI-generated article will usually pass a plagiarism checker perfectly because the exact sentence has never been published on the internet before. To detect AI, you need a specialized stylistic analysis tool, not an exact-match web scraper!</p>
      </div>
    </div>
  );
}
