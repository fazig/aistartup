"use client";

import { useState } from "react";
import { Type, Copy, Check } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const charCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphCount = text.split(/\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(wordCount / 200); // Avg 200 words per min

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Type color="var(--primary)" /> Free Word & Character Counter
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly count words, characters, sentences, and estimate reading time.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{wordCount}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Words</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{charCount}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Characters</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{sentenceCount}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sentences</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{readingTime}m</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reading Time</div>
        </div>
      </div>

      {/* Input Area */}
      <div className="card" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem' }}>Your Text</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!text}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
            </button>
            <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleClear} disabled={!text}>
              Clear
            </button>
          </div>
        </div>
        <textarea 
          className="input-field"
          style={{ minHeight: '300px', background: '#f8fafc', fontSize: '1rem', lineHeight: '1.6' }}
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {paragraphCount} paragraphs
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>Why use a word counter?</h2>
        <p>Let's be real for a second—nobody likes guessing if they've hit their word limit. Whether you're a high school student trying to write a 1,000-word essay, a freelancer writing a blog post with strict guidelines, or a social media manager trying to squeeze a thought into a 280-character tweet, you need to know exactly how long your text is.</p>
        <p>I built this tool to make that process effortless. Instead of opening up heavy word processors just to check a quick paragraph, you can just paste your text right here. It updates instantly as you type.</p>

        <h2>How are words and characters actually counted?</h2>
        <p>It's pretty simple! The tool looks at your text and splits it up every time you use a space. That's how we get the word count. For the character count, it literally counts every single letter, number, punctuation mark, and even the spaces in between. This is super important because platforms like Twitter and Instagram count spaces as characters.</p>
        <p>We also threw in a sentence counter (which looks for periods, exclamation points, and question marks) and an estimated reading time. The reading time is based on the average adult reading speed, which is right around 200 words per minute. If your blog post takes 10 minutes to read, you're looking at roughly a 2,000-word piece.</p>

        <h2>Is it safe to paste private documents here?</h2>
        <p>100%. I know how sketchy it feels pasting an unpublished book chapter or a private work email into a random website. That's exactly why I built this tool using only front-end code. Your text never leaves your browser, it never touches a database, and nobody (including me) can see what you paste. If you disconnect from your Wi-Fi, the tool will still work perfectly.</p>

        <h2>What's the difference between word count and character count?</h2>
        <p>Think of word count as the number of full ideas or blocks you've written, like "Hello World" being two words. Character count is the raw nuts and bolts: "Hello World" is 11 characters (10 letters plus one space). Depending on where you are publishing, you'll need one or the other. Meta descriptions on Google care about character limits, while most writing gigs care about word counts.</p>
      </div>
    </div>
  );
}
