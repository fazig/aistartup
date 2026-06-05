"use client";
import Link from "next/link";

import { useState } from "react";
import { Hash, Copy, Check, ArrowLeft } from "lucide-react";
import MD5 from "crypto-js/md5";

export default function Md5Generator() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const hash = input ? MD5(input).toString() : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
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
          <Hash color="var(--primary)" /> Online MD5 Hash Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Generate a secure, 32-character MD5 hash of any string instantly.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>String to Hash</label>
          <textarea 
            className="input-field"
            style={{ minHeight: '150px', resize: 'vertical' }}
            placeholder="Type or paste the text you want to hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>MD5 Hash Output</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className="input-field" 
              style={{ fontWeight: 'bold', fontFamily: 'monospace', background: '#f8fafc', color: hash ? 'var(--text-main)' : 'var(--text-muted)' }}
              readOnly
              value={hash || "Hash will appear here..."}
            />
            <button className="btn btn-primary" onClick={handleCopy} disabled={!hash}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What is an MD5 Hash?</h2>
        <p>If you're getting into programming, database management, or cybersecurity, you've probably heard people throw around the term "hashing." MD5 (which stands for Message Digest algorithm 5) is one of the oldest and most famous cryptographic hash functions out there. </p>
        <p>Basically, a hash function is a mathematical algorithm that takes a string of text of any length—it could be a single letter, a password, or the entire text of a Harry Potter book—and crunches it down into a fixed-length string of characters. For MD5, the output is always a 32-character string composed of letters and numbers, regardless of how long the input was.</p>
        
        <h2>How does it work?</h2>
        <p>The magic of hashing algorithms like MD5 is that they are highly sensitive but completely consistent. If you type the word "apple", it will always generate the exact same 32-character string every single time. But if you capitalize it to "Apple", the resulting hash will be completely, radically different. </p>
        <p>Even more importantly, a hash is a one-way street. Unlike the URL Decoder tool we have on this site, you cannot take an MD5 hash and "decode" it back into the original text. It is a one-way mathematical scramble.</p>

        <h2>What are MD5 hashes used for today?</h2>
        <p>Historically, MD5 was used everywhere to encrypt passwords. When you made an account on a website, they wouldn't save your password "hunter2" to their database. They would hash it, and save the hash. Then, when you logged in, they would hash your password again and check if the two hashes matched. That way, if the database was hacked, the hackers wouldn't see the actual passwords.</p>
        <p><strong>Note:</strong> Today, MD5 is actually considered too weak for password encryption because computers have gotten so incredibly fast that they can "brute-force" guess MD5 hashes. Modern developers use much stronger algorithms like bcrypt or Argon2 for passwords.</p>
        <p>However, MD5 is still incredibly useful and widely used for <strong>checksums and data verification</strong>. If you download a massive software file from the internet, the developer will often provide the MD5 hash of that file. When you finish downloading it, you can run the file through an MD5 generator. If the hash matches the developer's hash exactly, you know with 100% certainty that the file downloaded perfectly and wasn't corrupted or tampered with by a hacker mid-download.</p>

        <h2>Privacy Notice</h2>
        <p>Because hashing passwords or sensitive API keys is a common use case, I made absolutely sure that this tool runs entirely on your own device. The hashing math is done by a javascript library inside your web browser. Nothing you type here is ever sent to our servers.</p>
      </div>
    </div>
  );
}
