"use client";

import { useState } from "react";
import { Copy, FileJson, Check, TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <FileJson color="var(--primary)" /> JSON Formatter & Validator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Format, beautify, and validate your JSON data instantly in the browser.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Input area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Input</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={formatJSON}>Format / Beautify</button>
              <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={minifyJSON}>Minify</button>
            </div>
          </div>
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '300px', resize: 'none' }}
            placeholder="Paste your JSON here..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
            }}
          />
        </div>

        {/* Output area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Output</h3>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!output}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          
          {error ? (
            <div style={{ flexGrow: 1, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '1rem', color: '#dc2626', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <TriangleAlert size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>Invalid JSON Error:</strong>
                <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>{error}</p>
              </div>
            </div>
          ) : (
            <textarea 
              className="input-field"
              style={{ flexGrow: 1, minHeight: '300px', resize: 'none', background: '#f8fafc' }}
              readOnly
              value={output}
              placeholder="Result will appear here..."
            />
          )}
        </div>
      </div>

      {/* SEO Content Section for AdSense */}
      <div className="prose">
        <h2>What is JSON?</h2>
        <p>JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.</p>
        
        <h2>Why use a JSON Formatter?</h2>
        <p>Often, JSON data is transmitted and stored in a minified format. This means all whitespace, newlines, and indentation are removed to reduce the file size and improve transmission speed across the network. While this is great for computers, it makes the data nearly impossible for a human developer to read, debug, or understand.</p>
        <p>Our completely free <strong>JSON Formatter and Validator tool</strong> solves this problem instantly. By pasting your minified or messy JSON code into the input box and clicking "Format / Beautify", our tool parses the data and reconstructs it with proper indentation, line breaks, and spacing. This makes the data structure immediately visible, highlighting parent-child relationships within objects and arrays.</p>
        
        <h2>JSON Validation and Syntax Checking</h2>
        <p>Writing JSON manually can be prone to errors. A missing comma, an unescaped quote, or a trailing bracket can invalidate an entire JSON payload, causing API requests to fail or applications to crash. Our JSON Validator runs a strict parsing algorithm to check your data in real-time. If there is a syntax error, the tool will instantly flag it, displaying the exact error message so you can pinpoint the issue and fix it immediately.</p>

        <h2>How to Minify JSON</h2>
        <p>Conversely, if you have written a well-formatted JSON document and need to prepare it for production or transmission, you can use our "Minify" feature. This strips out all unnecessary whitespace, compressing the payload to its absolute smallest size without altering the data itself.</p>

        <h2>Is my data secure?</h2>
        <p>Yes. 100% of the formatting, minification, and validation processing happens entirely within your web browser using client-side JavaScript. Your JSON data is never sent to our servers, stored in any database, or logged anywhere. This makes our tool completely safe for formatting sensitive API responses, private configuration files, and proprietary data structures.</p>
      </div>
    </div>
  );
}
