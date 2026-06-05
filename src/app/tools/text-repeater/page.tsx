"use client";
import Link from "next/link";

import { useState } from "react";
import { Repeat, Copy, Check, Trash2, Sparkles, ArrowLeft } from "lucide-react";

type SepType = "newline" | "space" | "comma" | "custom";

export default function TextRepeater() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(5);
  const [sepType, setSepType] = useState<SepType>("newline");
  const [customSep, setCustomSep] = useState(" - ");
  const [addNumbering, setAddNumbering] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const getSeparator = (): string => {
    switch (sepType) {
      case "newline": return "\n";
      case "space": return " ";
      case "comma": return ", ";
      case "custom": return customSep;
    }
  };

  const generate = () => {
    if (!text.trim()) return;
    const sep = getSeparator();
    const lines: string[] = [];
    for (let i = 0; i < count; i++) {
      if (addNumbering) {
        lines.push(`${i + 1}. ${text}`);
      } else {
        lines.push(text);
      }
    }
    setOutput(lines.join(sep));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
    setOutput("");
    setCount(5);
    setAddNumbering(false);
  };

  const sepOptions: { value: SepType; label: string }[] = [
    { value: "newline", label: "New Line" },
    { value: "space", label: "Space" },
    { value: "comma", label: "Comma" },
    { value: "custom", label: "Custom" },
  ];

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
          <Repeat color="var(--primary)" /> Text Repeater
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Repeat any text as many times as you want with custom separators and numbering.</p>
      </div>

      {/* Controls */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Settings</h3>

        {/* Text input */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            Text to repeat
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter the text you want to repeat..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Count */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            Repeat count (1–10,000)
          </label>
          <input
            type="number"
            className="input-field"
            style={{ maxWidth: '200px' }}
            min={1}
            max={10000}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(10000, parseInt(e.target.value) || 1)))}
          />
        </div>

        {/* Separator */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            Separator
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {sepOptions.map((opt) => (
              <button
                key={opt.value}
                className={sepType === opt.value ? "btn btn-primary" : "btn btn-outline"}
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                onClick={() => setSepType(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom separator */}
        {sepType === "custom" && (
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              Custom separator
            </label>
            <input
              type="text"
              className="input-field"
              style={{ maxWidth: '300px' }}
              value={customSep}
              onChange={(e) => setCustomSep(e.target.value)}
              placeholder="e.g. | or --> or ♦"
            />
          </div>
        )}

        {/* Numbering toggle */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={addNumbering}
              onChange={(e) => setAddNumbering(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
            />
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Add numbering</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>(1. text, 2. text, etc.)</span>
          </label>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={generate} disabled={!text.trim()}>
            <Sparkles size={16} /> Generate
          </button>
          <button className="btn btn-outline" onClick={handleClear} disabled={!text && !output}>
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* Output */}
      <div className="card" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1rem' }}>Output</h3>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {output && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>
                {output.length.toLocaleString()} chars
              </span>
            )}
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!output}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <textarea
          className="input-field"
          style={{ minHeight: '250px', background: '#f8fafc', fontSize: '0.95rem', lineHeight: '1.6' }}
          value={output}
          readOnly
          placeholder="Repeated text will appear here..."
        />
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What&apos;s a text repeater and why would you need one?</h2>
        <p>A text repeater does exactly what it sounds like — it takes whatever text you type in and repeats it as many times as you want. Sounds simple, right? But you&apos;d be surprised how often this comes in handy. Need to fill a test database with repeated entries? Need to generate 500 copies of a string for a stress test? Want to spam your friend with &ldquo;I told you so&rdquo; a thousand times? This tool has you covered.</p>

        <h2>How the separator and numbering options work</h2>
        <p>The separator is what goes between each repeated copy of your text. New line puts each copy on its own line — great for lists. Space joins everything on one line with spaces. Comma gives you a CSV-style output, which is super useful for generating test data. And the custom option lets you use literally anything: pipes, dashes, emojis, whatever. The numbering toggle adds &ldquo;1. &rdquo;, &ldquo;2. &rdquo;, etc. before each repetition, which is perfect for creating ordered lists quickly.</p>

        <h2>Real-world use cases</h2>
        <p>Developers use this for generating test data, filling text areas to test overflow behavior, and creating repeated patterns for CSS testing. Content creators use it to quickly mock up how a page looks with lots of content. Teachers sometimes use it to create fill-in-the-blank worksheets. It&apos;s also weirdly popular for social media — people love sending walls of repeated text in group chats or creating dramatic visual effects with repeated emojis.</p>

        <h2>Is there a limit to how many times I can repeat?</h2>
        <p>The tool caps at 10,000 repetitions to keep your browser from choking, but that should be more than enough for any reasonable use case. If you&apos;re repeating a short word 10,000 times, you&apos;re looking at tens of thousands of characters — your clipboard can handle it, but some text editors might lag when you paste it. Everything runs locally in your browser, so there&apos;s no server load to worry about.</p>
      </div>
    </div>
  );
}
