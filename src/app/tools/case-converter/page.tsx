"use client";
import Link from "next/link";

import { useState } from "react";
import { CaseSensitive, Copy, Check, Trash2, ArrowLeft } from "lucide-react";

type CaseType = "upper" | "lower" | "title" | "sentence" | "toggle" | "camel" | "pascal" | "snake" | "kebab" | "dot";

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);
  const [copied, setCopied] = useState(false);

  const toTitleCase = (str: string): string =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

  const toSentenceCase = (str: string): string =>
    str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  const toToggleCase = (str: string): string =>
    str.split("").map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join("");

  const splitWords = (str: string): string[] =>
    str
      .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase split
      .replace(/[_\-.\s]+/g, " ")           // separators to spaces
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);

  const toCamelCase = (str: string): string => {
    const words = splitWords(str);
    return words
      .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
      .join("");
  };

  const toPascalCase = (str: string): string => {
    const words = splitWords(str);
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  };

  const toSnakeCase = (str: string): string =>
    splitWords(str).map((w) => w.toLowerCase()).join("_");

  const toKebabCase = (str: string): string =>
    splitWords(str).map((w) => w.toLowerCase()).join("-");

  const toDotCase = (str: string): string =>
    splitWords(str).map((w) => w.toLowerCase()).join(".");

  const convert = (type: CaseType) => {
    setActiveCase(type);
    let result = "";
    switch (type) {
      case "upper": result = input.toUpperCase(); break;
      case "lower": result = input.toLowerCase(); break;
      case "title": result = toTitleCase(input); break;
      case "sentence": result = toSentenceCase(input); break;
      case "toggle": result = toToggleCase(input); break;
      case "camel": result = toCamelCase(input); break;
      case "pascal": result = toPascalCase(input); break;
      case "snake": result = toSnakeCase(input); break;
      case "kebab": result = toKebabCase(input); break;
      case "dot": result = toDotCase(input); break;
    }
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const caseButtons: { type: CaseType; label: string }[] = [
    { type: "upper", label: "UPPERCASE" },
    { type: "lower", label: "lowercase" },
    { type: "title", label: "Title Case" },
    { type: "sentence", label: "Sentence case" },
    { type: "toggle", label: "tOGGLE cASE" },
    { type: "camel", label: "camelCase" },
    { type: "pascal", label: "PascalCase" },
    { type: "snake", label: "snake_case" },
    { type: "kebab", label: "kebab-case" },
    { type: "dot", label: "dot.case" },
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
          <CaseSensitive color="var(--primary)" /> Case Converter
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Convert text between uppercase, lowercase, camelCase, snake_case, and more in one click.</p>
      </div>

      {/* Input */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem' }}>Your Text</h3>
          <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => { setInput(""); setOutput(""); setActiveCase(null); }} disabled={!input}>
            <Trash2 size={14} /> Clear
          </button>
        </div>
        <textarea
          className="input-field"
          style={{ minHeight: '160px', background: '#f8fafc', fontSize: '1rem', lineHeight: '1.6' }}
          placeholder="Type or paste your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {input.length} characters
        </div>
      </div>

      {/* Case Buttons */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Choose Conversion</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {caseButtons.map((btn) => (
            <button
              key={btn.type}
              className={activeCase === btn.type ? "btn btn-primary" : "btn btn-outline"}
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={() => convert(btn.type)}
              disabled={!input}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className="card" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Converted Text</h3>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>
                {output.length} characters
              </span>
              <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <textarea
            className="input-field"
            style={{ minHeight: '160px', background: '#f8fafc', fontSize: '1rem', lineHeight: '1.6' }}
            value={output}
            readOnly
          />
        </div>
      )}

      {/* SEO Content */}
      <div className="prose">
        <h2>Why would you need a case converter?</h2>
        <p>You know that moment when you accidentally write an entire paragraph with Caps Lock on? Or when you copy text from a PDF and it&apos;s all in uppercase? Instead of retyping everything from scratch, just paste it here and click the case you want. It&apos;s one of those tiny tools you don&apos;t think about until you desperately need it — and then you&apos;re really glad it exists.</p>

        <h2>All the case styles, explained</h2>
        <p>UPPERCASE and lowercase are pretty self-explanatory. Title Case capitalizes the first letter of every word — perfect for headings and article titles. Sentence case only capitalizes the first letter after a period, which is how normal writing looks. Toggle case flips whatever case each letter currently is, which is mostly just fun to mess with. The developer-friendly options — camelCase, PascalCase, snake_case, kebab-case, and dot.case — are essential when you&apos;re naming variables, writing CSS classes, or working with APIs that expect a specific naming convention.</p>

        <h2>How does the conversion actually work?</h2>
        <p>Each conversion runs entirely in your browser. There&apos;s no server involved, nothing is sent anywhere. For the simple cases like upper and lower, it&apos;s just the built-in JavaScript methods. For developer cases like camelCase and snake_case, the tool first splits your text into individual words (handling existing separators like spaces, hyphens, underscores, and even existing camelCase boundaries), then reassembles them with the correct casing and separator. It handles edge cases like multiple spaces and mixed separators pretty gracefully.</p>

        <h2>When is this most useful?</h2>
        <p>Developers probably use this daily — converting between snake_case API responses and camelCase JavaScript variables, or generating kebab-case CSS class names from a design spec. Writers and editors use Title Case and Sentence case to fix formatting issues in imported text. Students use it to fix those annoying all-caps paragraphs from older academic papers. It&apos;s genuinely one of those tools that saves you more time than you&apos;d expect.</p>
      </div>
    </div>
  );
}
