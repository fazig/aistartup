"use client";

import { useState } from "react";
import { RemoveFormatting, Copy, Check, Trash2, Zap } from "lucide-react";

type ReplaceMode = "remove" | "space" | "comma" | "custom";

export default function RemoveLineBreaks() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<ReplaceMode>("space");
  const [customSeparator, setCustomSeparator] = useState("; ");
  const [copied, setCopied] = useState(false);

  const processText = () => {
    let result = "";
    switch (mode) {
      case "remove":
        result = input.replace(/(\r\n|\r|\n)/g, "");
        break;
      case "space":
        result = input.replace(/(\r\n|\r|\n)+/g, " ").replace(/\s{2,}/g, " ").trim();
        break;
      case "comma":
        result = input
          .split(/\r\n|\r|\n/)
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .join(", ");
        break;
      case "custom":
        result = input
          .split(/\r\n|\r|\n/)
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .join(customSeparator);
        break;
    }
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modeOptions: { value: ReplaceMode; label: string; desc: string }[] = [
    { value: "remove", label: "Remove all", desc: "Strips all line breaks completely" },
    { value: "space", label: "Replace with space", desc: "Each line break becomes a single space" },
    { value: "comma", label: "Replace with comma", desc: "Joins lines with commas" },
    { value: "custom", label: "Custom string", desc: "Use your own separator" },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <RemoveFormatting color="var(--primary)" /> Remove Line Breaks
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Strip or replace line breaks from your text. Perfect for cleaning up copied content.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem', alignItems: 'start' }}>
        {/* Input */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Input Text</h3>
          <textarea
            className="input-field"
            style={{ minHeight: '300px', background: '#f8fafc', fontSize: '0.95rem', lineHeight: '1.6' }}
            placeholder="Paste text with line breaks here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {input.split(/\r\n|\r|\n/).length} lines &bull; {input.length} chars
          </div>
        </div>

        {/* Output */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Output</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!output}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <textarea
            className="input-field"
            style={{ minHeight: '300px', background: '#f8fafc', fontSize: '0.95rem', lineHeight: '1.6' }}
            value={output}
            readOnly
            placeholder="Cleaned text will appear here..."
          />
          <div style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {output.length} chars
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="card" style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Options</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {modeOptions.map((opt) => (
            <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="mode"
                checked={mode === opt.value}
                onChange={() => setMode(opt.value)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <div>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{opt.label}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>— {opt.desc}</span>
              </div>
            </label>
          ))}
        </div>

        {mode === "custom" && (
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              Custom separator string
            </label>
            <input
              type="text"
              className="input-field"
              style={{ maxWidth: '300px' }}
              value={customSeparator}
              onChange={(e) => setCustomSeparator(e.target.value)}
              placeholder="e.g. | or ; or --> "
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-primary" onClick={processText} disabled={!input}>
            <Zap size={16} /> Process Text
          </button>
          <button className="btn btn-outline" onClick={() => { setInput(""); setOutput(""); }} disabled={!input && !output}>
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>Why do line breaks keep messing up my text?</h2>
        <p>Here&apos;s the deal: when you copy text from a PDF, an email, or pretty much any formatted source, hidden line breaks tag along for the ride. You paste it into a text box and suddenly every sentence is broken across two lines. It looks terrible and it&apos;s annoying to fix manually, especially with long documents. This tool takes care of it in one click.</p>

        <h2>What are the different options for?</h2>
        <p>&ldquo;Remove all&rdquo; completely strips every line break, smashing all lines into one continuous stream. &ldquo;Replace with space&rdquo; is what most people want — it joins lines together naturally with a single space between them, like they were written on one line. &ldquo;Replace with comma&rdquo; is handy when you have a list of items on separate lines and want them as a comma-separated list. And the custom option lets you use literally any separator you want: pipes, semicolons, arrows, whatever your use case needs.</p>

        <h2>Some practical use cases</h2>
        <p>Cleaning up text from PDFs is probably the number one reason people use this tool. PDF copy-paste is notoriously messy — you get random line breaks mid-sentence, double spaces, and other formatting garbage. Another big use case: you have a list of emails or names, one per line, and you need them in a comma-separated format for a spreadsheet or database import. Or maybe you&apos;re a developer and you have multi-line output from a log file that you want on a single line for easier grep searching.</p>

        <h2>Does this tool do anything to my data?</h2>
        <p>Nope. Everything happens right in your browser. Your text is never uploaded, stored, or shared with anyone. It&apos;s just JavaScript running on the page manipulating your string — no servers involved at all. Once you close or refresh the tab, everything is gone.</p>
      </div>
    </div>
  );
}
