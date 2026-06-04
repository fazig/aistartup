"use client";

import { useState, useCallback } from "react";
import { Fingerprint, Copy, Check, Download, RefreshCw } from "lucide-react";

function generateUUIDv4(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Manual fallback
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 1
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function UUIDGenerator() {
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [braces, setBraces] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [totalGenerated, setTotalGenerated] = useState(0);

  const formatUUID = useCallback(
    (raw: string) => {
      let result = raw;
      if (!hyphens) result = result.replace(/-/g, "");
      if (uppercase) result = result.toUpperCase();
      if (braces) result = `{${result}}`;
      return result;
    },
    [uppercase, hyphens, braces]
  );

  const handleGenerate = () => {
    const num = Math.max(1, Math.min(100, count));
    const generated: string[] = [];
    for (let i = 0; i < num; i++) {
      generated.push(formatUUID(generateUUIDv4()));
    }
    setUuids(generated);
    setTotalGenerated((prev) => prev + num);
  };

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    }
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([uuids.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Fingerprint color="var(--primary)" /> UUID Generator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Generate random UUID v4 identifiers instantly. Bulk create up to 100 at once.
        </p>
      </div>

      <div className="card" style={{ marginBottom: "2rem", maxWidth: "750px", margin: "0 auto 2rem" }}>
        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
              Number of UUIDs (1–100)
            </label>
            <input
              type="number"
              className="input-field"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              style={{ maxWidth: "200px", fontFamily: "inherit" }}
            />
          </div>

          <div className="grid-3" style={{ gap: "1rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                style={{ width: "1.2rem", height: "1.2rem" }}
              />
              Uppercase
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                style={{ width: "1.2rem", height: "1.2rem" }}
              />
              Hyphens
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={braces}
                onChange={(e) => setBraces(e.target.checked)}
                style={{ width: "1.2rem", height: "1.2rem" }}
              />
              Braces {`{ }`}
            </label>
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
          onClick={handleGenerate}
        >
          <RefreshCw size={18} /> Generate UUIDs
        </button>

        {totalGenerated > 0 && (
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.75rem" }}>
            Total generated this session: <strong>{totalGenerated}</strong>
          </p>
        )}
      </div>

      {/* Results */}
      {uuids.length > 0 && (
        <div className="card" style={{ maxWidth: "750px", margin: "0 auto 3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <h3 style={{ margin: 0 }}>Generated UUIDs ({uuids.length})</h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }} onClick={handleCopyAll}>
                {copiedAll ? <Check size={16} /> : <Copy size={16} />}
                {copiedAll ? "Copied!" : "Copy All"}
              </button>
              <button className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }} onClick={handleDownload}>
                <Download size={16} /> Download .txt
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {uuids.map((uuid, i) => (
              <div
                key={i}
                onClick={() => copyToClipboard(uuid, i)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.6rem 1rem",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: "1px solid var(--border-light)",
                  transition: "background 0.15s",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  wordBreak: "break-all",
                }}
                title="Click to copy"
              >
                <span>{uuid}</span>
                <span style={{ flexShrink: 0, marginLeft: "0.75rem", color: copiedIndex === i ? "#16a34a" : "var(--text-muted)" }}>
                  {copiedIndex === i ? <Check size={16} /> : <Copy size={16} />}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div className="prose">
        <h2>What is a UUID and why would you need one?</h2>
        <p>
          A UUID (Universally Unique Identifier) is a 128-bit label that&apos;s practically guaranteed to be unique across
          every computer, database, and system on the planet—without needing a central authority handing them out.
          They look like this: <code>550e8400-e29b-41d4-a716-446655440000</code>. The &quot;v4&quot; version you get from
          this tool is generated using random numbers, which means there are roughly 5.3 × 10^36 possible values.
          You could generate a billion UUIDs per second for 85 years and still have a less than 50% chance of a single duplicate.
        </p>
        <p>
          Developers use UUIDs everywhere—database primary keys, API request identifiers, session tokens, file naming,
          microservice communication, and distributed systems. They&apos;re the go-to choice whenever you need an ID that
          won&apos;t collide with anyone else&apos;s, even if two completely separate systems are generating IDs at the same time
          with zero communication between them.
        </p>

        <h2>How this generator works under the hood</h2>
        <p>
          This tool uses your browser&apos;s built-in <code>crypto.randomUUID()</code> method when available, which
          provides cryptographically secure randomness. On older browsers, it falls back to <code>crypto.getRandomValues()</code>
          to fill a 16-byte array, then applies the RFC 4122 version 4 bit masks (setting the version nibble to 4 and the
          variant bits to 10). Everything runs 100% in your browser—no server calls, no data leaving your machine.
        </p>
        <p>
          The formatting options are pure convenience. Removing hyphens gives you a compact 32-character hex string that&apos;s
          great for filenames or URL slugs. Uppercase is handy when you&apos;re working with systems like Windows GUIDs or
          certain SQL databases that store them in uppercase. Braces wrap the UUID in curly brackets, matching the format
          used by Microsoft&apos;s COM/OLE ecosystem and some legacy enterprise APIs.
        </p>

        <h2>Bulk generation and practical tips</h2>
        <p>
          Need to seed a test database with 100 unique records? Just bump the count to 100 and hit generate. You can copy
          the entire batch to your clipboard or download them as a plain text file. Each UUID lands on its own line, making
          it trivial to paste into a SQL insert statement, a JSON array, or a CSV file. Click any individual UUID in the list
          to copy just that one—handy when you only need to grab a specific entry.
        </p>
        <p>
          One thing to keep in mind: UUIDs are great for uniqueness, but they&apos;re not great for sorting by creation time
          (unlike something like a ULID or Snowflake ID). If you need time-sortable unique IDs, a UUID v7 or ULID might be
          a better fit. But for the vast majority of use cases—API keys, database records, file identifiers, test fixtures—a
          standard v4 UUID from this tool is exactly what you need.
        </p>
      </div>
    </div>
  );
}
