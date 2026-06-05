"use client";
import Link from "next/link";

import { useState, useCallback } from "react";
import { ListOrdered, Copy, Check, Trash2, ArrowDownUp, ArrowLeft } from "lucide-react";

export default function CommaSeparator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [separator, setSeparator] = useState("comma");
  const [customSep, setCustomSep] = useState("");
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [wrapQuotes, setWrapQuotes] = useState(false);
  const [reverseMode, setReverseMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const getSeparatorChar = useCallback(() => {
    switch (separator) {
      case "comma": return ", ";
      case "semicolon": return "; ";
      case "pipe": return " | ";
      case "tab": return "\t";
      case "dash": return " - ";
      case "custom": return customSep || ", ";
      default: return ", ";
    }
  }, [separator, customSep]);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    const sep = getSeparatorChar();

    if (reverseMode) {
      // Separated → one per line
      const rawSep = sep.trim() || sep;
      const items = input.split(rawSep);
      const processed = items
        .map((item) => {
          let val = trimWhitespace ? item.trim() : item;
          // Remove wrapping quotes if present
          val = val.replace(/^["']|["']$/g, "");
          return val;
        })
        .filter((item) => (removeEmpty ? item.length > 0 : true));
      setOutput(processed.join("\n"));
    } else {
      // One per line → separated
      const lines = input.split("\n");
      const processed = lines
        .map((line) => (trimWhitespace ? line.trim() : line))
        .filter((line) => (removeEmpty ? line.length > 0 : true))
        .map((line) => (wrapQuotes ? `"${line}"` : line));
      setOutput(processed.join(sep));
    }
  }, [input, getSeparatorChar, reverseMode, trimWhitespace, removeEmpty, wrapQuotes]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleSwap = () => {
    setReverseMode(!reverseMode);
    setInput(output);
    setOutput("");
  };

  const separatorOptions = [
    { value: "comma", label: "Comma (,)" },
    { value: "semicolon", label: "Semicolon (;)" },
    { value: "pipe", label: "Pipe (|)" },
    { value: "tab", label: "Tab" },
    { value: "dash", label: "Dash (-)" },
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
          <ListOrdered color="var(--primary)" /> Comma Separator Tool
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Convert a list of items into a comma-separated string or split them back out — with tons of separator and formatting options.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1rem' }}>
        <span style={{ fontWeight: 600, color: !reverseMode ? 'var(--primary)' : 'var(--text-muted)' }}>
          Lines → Separated
        </span>
        <button
          onClick={handleSwap}
          className="btn"
          style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Swap mode"
        >
          <ArrowDownUp size={20} />
        </button>
        <span style={{ fontWeight: 600, color: reverseMode ? 'var(--primary)' : 'var(--text-muted)' }}>
          Separated → Lines
        </span>
      </div>

      {/* Options */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Options</h3>
        <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label className="input-label">Separator</label>
            <select
              className="input-field"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
            >
              {separatorOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {separator === "custom" && (
            <div>
              <label className="input-label">Custom Separator</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. ::"
                value={customSep}
                onChange={(e) => setCustomSep(e.target.value)}
              />
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={trimWhitespace} onChange={(e) => setTrimWhitespace(e.target.checked)} style={{ width: '1.1rem', height: '1.1rem' }} />
            Trim whitespace
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} style={{ width: '1.1rem', height: '1.1rem' }} />
            Remove empty items
          </label>
          {!reverseMode && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={wrapQuotes} onChange={(e) => setWrapQuotes(e.target.checked)} style={{ width: '1.1rem', height: '1.1rem' }} />
              Wrap each item in quotes
            </label>
          )}
        </div>
      </div>

      {/* Input / Output */}
      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
            {reverseMode ? "Separated Input" : "Input (one item per line)"}
          </h3>
          <textarea
            className="input-field"
            style={{ minHeight: '220px', fontSize: '0.95rem', lineHeight: '1.6' }}
            placeholder={reverseMode ? "Paste your separated list here..." : "Enter one item per line..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Output</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!output}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <textarea
            className="input-field"
            style={{ minHeight: '220px', fontSize: '0.95rem', lineHeight: '1.6', background: '#f8fafc' }}
            value={output}
            readOnly
            placeholder="Your result will appear here..."
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
        <button className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} onClick={handleConvert}>
          <ListOrdered size={18} /> Convert
        </button>
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handleClear}>
          <Trash2 size={16} /> Clear All
        </button>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is a comma separator tool?</h2>
        <p>Okay so picture this — you've got a list of items in a spreadsheet column or a text file, each on its own line. Maybe it's email addresses, product names, city names, whatever. And now you need to smash them all into a single comma-separated line to use in a SQL query, a CSV file, or some config setting. That's literally what this tool does in one click.</p>
        <p>Instead of manually going through hundreds of items and adding commas between them (and inevitably messing up one of them), you just paste your list in and let the tool handle the formatting. It supports commas, semicolons, pipes, tabs, dashes, or literally any custom string you want as the separator. You can even wrap each item in double quotes, which is super handy when you're building SQL IN clauses or dealing with CSV data that might have special characters.</p>

        <h2>How does the reverse mode work?</h2>
        <p>The reverse mode is the opposite direction. Say you grabbed a comma-separated list from somewhere — maybe from a JSON file, an API response, or a database export — and now you want to see each item on its own line so you can actually read through them. Just flip the mode toggle, paste your separated string, and bam — clean, one-per-line output. It even strips off quotes automatically if your items were wrapped in them.</p>
        <p>This is one of those things you don't think you need until you're staring at a 200-item comma-separated string and trying to find the one entry that's wrong. Being able to fan them out into individual lines makes debugging and reviewing so much easier.</p>

        <h2>When would I actually use this?</h2>
        <p>Developers use this tool all the time when writing database queries. If you've got a list of user IDs and need to create a WHERE IN clause, you'll need them comma-separated and possibly quoted. Data analysts working with CSVs use it to reformat columns. Project managers who collect lists in spreadsheets and need to drop them into email or Slack use it too. Honestly, once you start using it, you'll wonder how you ever lived without it. The trim and empty-line removal options alone save a ton of time cleaning up messy copy-pasted data.</p>

        <h2>Is my data safe?</h2>
        <p>Absolutely. This tool runs entirely inside your browser. Your text never gets sent to any server, it's never logged, and no one can see what you paste. You could turn off your internet right now and it'd still work just fine. I built it that way on purpose because I know people paste sensitive data like emails, internal IDs, and confidential lists into tools like this.</p>
      </div>
    </div>
  );
}
