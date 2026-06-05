"use client";
import Link from "next/link";

import { useState } from "react";
import { Link as LinkIcon, Copy, Check, ArrowRightLeft, ArrowLeft } from "lucide-react";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processUrl = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
      setError(null);
    } catch (e) {
      setError("Invalid URL format for decoding.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
    setError(null);
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
          <LinkIcon color="var(--primary)" /> URL Encoder / Decoder
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Safely encode URL parameters or decode messy web addresses back to plain text.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Input area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem' }}>String to {mode === "encode" ? "Encode" : "Decode"}</h3>
            <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={toggleMode}>
              <ArrowRightLeft size={14} /> Switch to {mode === "encode" ? "Decode" : "Encode"}
            </button>
          </div>
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '200px', resize: 'none' }}
            placeholder={mode === "encode" ? "e.g., https://example.com/search?q=hello world" : "e.g., https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={processUrl} disabled={!input}>
            {mode === "encode" ? "Encode URL" : "Decode URL"}
          </button>
        </div>

        {/* Output area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Result</h3>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!output}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          
          {error ? (
            <div style={{ flexGrow: 1, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '1rem', color: '#dc2626' }}>
              <strong>Error:</strong> {error}
            </div>
          ) : (
            <textarea 
              className="input-field"
              style={{ flexGrow: 1, minHeight: '200px', resize: 'none', background: '#f8fafc' }}
              readOnly
              value={output}
              placeholder="Your processed string will appear here..."
            />
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What does URL Encoding actually do?</h2>
        <p>If you've ever looked at a web address and noticed a bunch of weird characters like <code>%20</code> or <code>%3F</code> packed into the link, you were looking at a URL-encoded string. It looks like absolute gibberish, but it's actually a very strict internet standard.</p>
        <p>You see, URLs (web addresses) can only be sent over the internet using a specific, limited set of standard ASCII characters. You can't put a raw space, a question mark, an ampersand (&amp;), or any special symbols (like emojis) directly into a URL. If you try, web browsers and servers will get incredibly confused and usually break the link.</p>
        <p>URL encoding solves this by translating those "unsafe" characters into a format that the internet understands. It does this by replacing the unsafe character with a "%" followed by two hexadecimal digits. The most famous example is the humble space bar, which gets translated into <code>%20</code>.</p>

        <h2>Why do developers need a decoder?</h2>
        <p>While browsers read those percentage signs just fine, humans certainly don't. Have you ever tried to copy a link from a Google search or an Amazon product page to text to a friend, only to find the link is 300 characters long and looks like an alien wrote it?</p>
        <p>That's where a URL Decoder comes in handy. If you paste that massive, messy string into our decoder, it will instantly translate all those <code>%20</code> symbols back into normal spaces, and <code>%2F</code> back into forward slashes. This lets you see the actual text, read the parameters of an API call, or clean up a link before sharing it.</p>

        <h2>How to use this tool</h2>
        <p>I designed this to be a simple, two-way street.</p>
        <ul>
          <li><strong>To Encode:</strong> Make sure the tool is set to "Encode". Paste your normal, human-readable text or full URL into the left box, and hit the button. It will spit out a web-safe, browser-ready string on the right.</li>
          <li><strong>To Decode:</strong> Click the "Switch to Decode" button. Paste the messy, percentage-filled URL into the left box. Hit the button, and it will strip away the encoding, giving you the clean text back.</li>
        </ul>
        <p>Because this tool runs entirely on JavaScript right in your browser window, it's incredibly fast and completely secure. We never log the URLs you are encoding or decoding.</p>
      </div>
    </div>
  );
}
