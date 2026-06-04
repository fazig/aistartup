"use client";

import { useState } from "react";
import { ArrowDownAZ, ArrowUpZA, Shuffle, Copy, Check, Trash2, ListFilter, CornerDownLeft } from "lucide-react";

export default function TextSorter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const getLines = (): string[] => input.split(/\r\n|\r|\n/);

  const sortAZ = () => {
    const lines = getLines().filter((l) => l.trim().length > 0);
    lines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    setOutput(lines.join("\n"));
  };

  const sortZA = () => {
    const lines = getLines().filter((l) => l.trim().length > 0);
    lines.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: "base" }));
    setOutput(lines.join("\n"));
  };

  const reverseOrder = () => {
    const lines = getLines().filter((l) => l.trim().length > 0);
    lines.reverse();
    setOutput(lines.join("\n"));
  };

  const randomShuffle = () => {
    const lines = getLines().filter((l) => l.trim().length > 0);
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setOutput(lines.join("\n"));
  };

  const removeDuplicates = () => {
    const lines = getLines().filter((l) => l.trim().length > 0);
    const unique = [...new Set(lines.map((l) => l.trim()))];
    setOutput(unique.join("\n"));
  };

  const removeEmptyLines = () => {
    const lines = getLines().filter((l) => l.trim().length > 0);
    setOutput(lines.join("\n"));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputLines = getLines().filter((l) => l.trim().length > 0);
  const outputLines = output ? output.split("\n").filter((l) => l.trim().length > 0) : [];
  const uniqueInputCount = new Set(inputLines.map((l) => l.trim())).size;

  const actions = [
    { label: "Sort A → Z", icon: <ArrowDownAZ size={15} />, fn: sortAZ },
    { label: "Sort Z → A", icon: <ArrowUpZA size={15} />, fn: sortZA },
    { label: "Reverse Order", icon: <CornerDownLeft size={15} />, fn: reverseOrder },
    { label: "Random Shuffle", icon: <Shuffle size={15} />, fn: randomShuffle },
    { label: "Remove Duplicates", icon: <ListFilter size={15} />, fn: removeDuplicates },
    { label: "Remove Empty Lines", icon: <Trash2 size={15} />, fn: removeEmptyLines },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ArrowDownAZ color="var(--primary)" /> Text Sorter
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Sort, shuffle, reverse, and deduplicate lines of text instantly.</p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{inputLines.length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Input Lines</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{uniqueInputCount}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Unique</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{inputLines.length - uniqueInputCount}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duplicates</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{outputLines.length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Output Lines</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Actions</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {actions.map((action) => (
            <button
              key={action.label}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={action.fn}
              disabled={!input.trim()}
            >
              {action.icon} {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input / Output */}
      <div className="grid-2" style={{ marginBottom: '3rem', alignItems: 'start' }}>
        {/* Input */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Input (one item per line)</h3>
            <button
              className="btn btn-outline"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              onClick={() => { setInput(""); setOutput(""); }}
              disabled={!input}
            >
              <Trash2 size={14} /> Clear
            </button>
          </div>
          <textarea
            className="input-field"
            style={{ minHeight: '350px', background: '#f8fafc', fontSize: '0.95rem', lineHeight: '1.6' }}
            placeholder={"Enter items, one per line:\nApple\nBanana\nCherry\n..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Output</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-primary"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                onClick={handleCopy}
                disabled={!output}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                onClick={() => setOutput("")}
                disabled={!output}
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            className="input-field"
            style={{ minHeight: '350px', background: '#f8fafc', fontSize: '0.95rem', lineHeight: '1.6' }}
            value={output}
            readOnly
            placeholder="Sorted or processed text will appear here..."
          />
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>Sort and clean up lists of text in seconds</h2>
        <p>We&apos;ve all been there — you have a big list of names, URLs, keywords, or data entries and they&apos;re in completely random order. You could open a spreadsheet, paste it into a column, hit sort, and export it back. Or you could just paste it here and click one button. This tool sorts text alphabetically (A-Z or Z-A), reverses the order, shuffles it randomly, removes duplicate lines, and strips out empty lines. No sign-ups, no fuss.</p>

        <h2>How does the sorting actually work?</h2>
        <p>The alphabetical sort uses locale-aware comparison, which means it handles special characters and international text properly. It&apos;s not just comparing raw character codes — &ldquo;café&rdquo; will sort correctly next to &ldquo;cat&rdquo; instead of being thrown to the end. The reverse function simply flips the current order of lines, which is useful when you want the last item first. The random shuffle uses the Fisher-Yates algorithm, which gives you a truly random result every time you click it.</p>

        <h2>Removing duplicates — how does it know?</h2>
        <p>The duplicate removal trims whitespace from the beginning and end of each line, then compares them as exact strings. So &ldquo;Apple&rdquo; and &ldquo;apple&rdquo; would both stay because they differ in capitalization. If you want case-insensitive deduplication, convert everything to lowercase first (use our Case Converter tool), then remove duplicates here. The stats cards at the top show you exactly how many duplicates exist before you even click anything.</p>

        <h2>Common use cases</h2>
        <p>SEO pros use this to sort keyword lists and remove duplicates from scraped data. Developers use it to sort configuration values, clean up log entries, or randomize test data. Teachers use it to shuffle quiz questions or student names. Event organizers use it to alphabetize attendee lists. If you have any list that needs ordering or cleaning, this tool will save you a bunch of time compared to doing it manually or firing up Excel for a 10-second job.</p>
      </div>
    </div>
  );
}
