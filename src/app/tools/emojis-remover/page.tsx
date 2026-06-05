"use client";
import Link from "next/link";

import { useState } from "react";
import { Smile, Copy, Check, Trash2, ArrowLeft } from "lucide-react";

export default function EmojisRemover() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [removedCount, setRemovedCount] = useState(0);

  const processText = () => {
    if (!input) return;

    // Regex to match emojis (supports modern unicode ranges including modifiers)
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E6}-\u{1F1FF}]|[\u{1F018}-\u{1F270}]|[\u{238C}-\u{2454}]|[\u{20D0}-\u{20FF}]/gu;
    
    const count = (input.match(emojiRegex) || []).length;
    const cleanText = input.replace(emojiRegex, "");
    
    setOutput(cleanText);
    setRemovedCount(count);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setRemovedCount(0);
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
          <Smile color="var(--primary)" /> Emojis Remover Tool
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly strip all emojis from any block of text to clean it up for professional use.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Input area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Text with Emojis</h3>
            <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleClear} disabled={!input}>
              <Trash2 size={14} /> Clear
            </button>
          </div>
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '200px', resize: 'none' }}
            placeholder="Paste your text here... e.g. Hello world! 👋🌍 Let's get to work 💼🚀"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // auto-process if they paste something
              if (output) setOutput("");
            }}
          />
          <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={processText} disabled={!input}>
            Remove Emojis
          </button>
        </div>

        {/* Output area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Clean Text</h3>
              {removedCount > 0 && (
                <span style={{ fontSize: '0.75rem', background: '#fef2f2', color: '#dc2626', padding: '0.2rem 0.5rem', borderRadius: '12px', fontWeight: 600 }}>
                  Removed {removedCount} emojis
                </span>
              )}
            </div>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!output}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '200px', resize: 'none', background: '#f8fafc' }}
            readOnly
            value={output}
            placeholder="Your clean, professional text will appear here..."
          />
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>Why would you want to remove emojis?</h2>
        <p>Emojis are fantastic for texting your friends or posting on Instagram, but there are plenty of situations where you absolutely do not want them cluttering up your text. I built this tool because I kept running into the same exact problem when managing data and content.</p>
        
        <h3>1. Cleaning up customer data</h3>
        <p>If you're a developer or a data analyst, you know the pain of downloading a CSV file of customer reviews, survey responses, or usernames, only to find that the database crashed because someone put a 🚀 or a 🌮 in their name. Emojis use special unicode characters that can break older database systems or mess up text formatting in Excel. Running that data through this tool strips out those risky characters instantly.</p>

        <h3>2. Professionalizing casual content</h3>
        <p>Maybe you're a social media manager turning a casual Twitter thread into a formal LinkedIn post or a professional blog article. Manually reading through a thousand words to delete every single crying-laughing face and thumbs-up takes way too much time. This tool acts like a vacuum, sucking out all the emojis in a fraction of a second so you can get back to writing.</p>

        <h3>3. Text-to-Speech (TTS) formatting</h3>
        <p>If you create YouTube videos using AI voiceovers, you've probably noticed that text-to-speech robots do not handle emojis well. Instead of pausing, they often literally read the emoji's code name out loud. There is nothing worse than a dramatic voiceover abruptly shouting "grinning face with sweat!" in the middle of a sentence. Stripping them out beforehand is a must.</p>

        <h2>How does this tool actually find them?</h2>
        <p>Under the hood, this tool uses a complex Regular Expression (Regex) that scans the unicode ranges specifically assigned to emojis by the Unicode Consortium. It looks for everything from the standard yellow smiley faces (starting around <code>U+1F600</code>) to the newer symbols, flags, and transport icons. When you click the button, it just finds those specific character ranges and deletes them, leaving all your normal letters, numbers, and standard punctuation completely untouched.</p>

        <h2>Is it safe?</h2>
        <p>Yes. Just like our other text manipulation tools, the Emojis Remover runs 100% locally in your web browser using JavaScript. If you are cleaning up private customer feedback or proprietary emails, you can rest easy knowing that your text is never uploaded to any server or saved anywhere. It's totally private.</p>
      </div>
    </div>
  );
}
