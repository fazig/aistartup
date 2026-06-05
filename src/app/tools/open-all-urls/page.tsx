"use client";
import Link from "next/link";

import { useState } from "react";
import { ExternalLink, Trash2, AlertTriangle, ArrowLeft } from "lucide-react";

export default function OpenAllUrls() {
  const [text, setText] = useState("");
  const [warning, setWarning] = useState<string | null>(null);

  const handleOpenUrls = () => {
    setWarning(null);
    
    if (!text.trim()) return;

    // Use regex to extract all URLs from the text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex) || [];

    if (urls.length === 0) {
      setWarning("No valid URLs (starting with http:// or https://) were found in the text.");
      return;
    }

    if (urls.length > 30) {
      const confirmOpen = window.confirm(`You are about to open ${urls.length} tabs at once. This might crash your browser or be blocked by your popup blocker. Continue?`);
      if (!confirmOpen) return;
    }

    // Attempt to open all URLs
    let blocked = false;
    urls.forEach((url) => {
      const newWin = window.open(url, '_blank');
      // If browser blocked the popup, newWin will be null
      if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
        blocked = true;
      }
    });

    if (blocked) {
      setWarning("Your browser's Popup Blocker prevented some tabs from opening. Please disable your popup blocker for this site and try again.");
    }
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
          <ExternalLink color="var(--primary)" /> Open All URLs
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Paste a massive list of website links and instantly open all of them simultaneously in new browser tabs.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Paste URLs Below</h3>
          <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => setText("")} disabled={!text}>
            <Trash2 size={14} /> Clear
          </button>
        </div>
        
        <textarea 
          className="input-field"
          style={{ flexGrow: 1, minHeight: '300px', resize: 'vertical', marginBottom: '1.5rem' }}
          placeholder="https://google.com&#10;https://startupai.tech&#10;https://github.com&#10;&#10;(You can also just paste a raw block of text, and we will automatically extract the links for you!)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {warning && (
          <div style={{ padding: '1rem', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <AlertTriangle size={20} style={{ flexShrink: 0 }} /> {warning}
          </div>
        )}

        <button className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} onClick={handleOpenUrls} disabled={!text}>
          Open All Links in New Tabs
        </button>
      </div>

      <div className="prose">
        <h2>Why use a Bulk URL Opener?</h2>
        <p>If you work in digital marketing, SEO, data entry, or web research, you deal with massive spreadsheets of web addresses every single day. If you need to manually review a list of 25 competitor websites, copying and pasting each link into a new tab one-by-one is mind-numbing and incredibly inefficient.</p>
        <p>Our "Open All URLs" tool automates this tedious process. Simply paste your entire column of URLs from Excel, Google Sheets, or your email inbox into the box above, and click the button. Our Javascript engine will instantly map through the list and open every single link simultaneously in a new tab.</p>

        <h2>Automatic Text Extraction</h2>
        <p>You don't even need to format your list perfectly! If you receive a messy email with links scattered throughout paragraphs of text, you can copy-paste the entire email directly into our tool. The tool uses a Regex (Regular Expression) algorithm to scan the text, identify any string that starts with <code>http://</code> or <code>https://</code>, extract them, and open them while completely ignoring the normal words.</p>

        <h2>Dealing with Popup Blockers</h2>
        <p>Because malicious websites in the early 2000s used to aggressively open spam windows, all modern browsers (like Google Chrome, Firefox, and Safari) have built-in Popup Blockers. Because our tool attempts to open multiple tabs at the exact same time, your browser will likely block it the first time you click the button.</p>
        <p>To fix this, look at the right side of your browser's URL address bar. You will see a small icon with a red "X" indicating a popup was blocked. Click that icon, select <strong>"Always allow pop-ups and redirects from this site"</strong>, and click Done. When you click our button again, all your tabs will open beautifully!</p>
      </div>
    </div>
  );
}
