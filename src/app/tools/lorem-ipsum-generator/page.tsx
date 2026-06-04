"use client";

import { useState } from "react";
import { AlignLeft, Copy, Check, Sparkles } from "lucide-react";

const LOREM_SENTENCES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus, nec gravida nisi volutpat sed.",
  "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
  "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
  "Nulla consequat massa quis enim donec pede justo fringilla vel.",
  "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
  "Nullam dictum felis eu pede mollis pretium integer tincidunt.",
  "Cras dapibus vivamus elementum semper nisi aenean vulputate eleifend tellus.",
  "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.",
  "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.",
  "Phasellus viverra nulla ut metus varius laoreet quisque rutrum.",
  "Aenean imperdiet etiam ultricies nisi vel augue curabitur ullamcorper.",
  "Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.",
  "Sit amet adipiscing sem neque sed ipsum nam quam nunc.",
  "Blandit vel, luctus pulvinar, hendrerit id, lorem maecenas nec odio.",
  "Praesent ac massa at ligula laoreet iaculis nulla neque dolor.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
  "Posuere cubilia curae donec velit neque, auctor sit amet, aliquam vel.",
  "Fringilla non, interdum in, ante vestibulum ante ipsum primis.",
  "Curabitur at lacus ac velit ornare lobortis curabitur a felis.",
  "Morbi vestibulum volutpat enim etiam risus sem faucibus at.",
  "Pellentesque ut neque pellentesque habitant morbi tristique senectus.",
  "Et netus et malesuada fames ac turpis egestas proin pharetra.",
  "Vivamus quis mi sit amet mauris erat eleifend auctor in urna.",
  "Nunc nec neque pellentesque massa lobortis ultrices viverra dictum.",
  "Sed magna purus fermentum eu, tincidunt eu, varius ut, felis.",
  "In hac habitasse platea dictumst morbi vestibulum velit id pretium.",
  "Iaculis diam erat fermentum justo nec condimentum neque sapien.",
  "Placerat ante nulla justo laoreet vitae felis vel cursus lacus.",
  "Donec mi odio faucibus at scelerisque quis convallis in nisl.",
  "Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque.",
  "Fermentum dui faucibus in ornare quam viverra orci sagittis eu.",
  "Volutpat odio facilisis mauris sit amet massa vitae tortor condimentum.",
  "Lacinia quis vel eros donec ac odio tempor orci dapibus.",
  "Ultrices in iaculis nunc sed augue lacus viverra vitae congue.",
  "Eu consequat ac felis donec et odio pellentesque diam volutpat.",
  "Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.",
  "Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.",
  "Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales.",
  "Ut eu sem integer vitae justo eget magna fermentum iaculis.",
  "Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat.",
  "Interdum varius sit amet mattis vulputate enim nulla aliquet porttitor.",
  "Lacus vestibulum sed arcu non odio euismod lacinia at quis risus.",
  "Sed vulputate odio ut enim blandit volutpat maecenas pharetra convallis.",
  "Posuere morbi leo urna molestie at elementum eu facilisis sed odio.",
  "Morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl.",
  "Nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin.",
  "Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio.",
  "Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget.",
  "Amet cursus sit amet dictum sit amet justo donec enim diam.",
  "Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.",
];

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et",
  "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis",
  "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex",
  "ea", "commodo", "consequat", "duis", "aute", "irure", "reprehenderit",
  "in", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur",
  "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt",
  "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est",
  "curabitur", "pretium", "tincidunt", "lacus", "nec", "gravida", "volutpat",
  "fusce", "dapibus", "tellus", "ac", "cursus", "tortor", "mauris", "nibh",
  "donec", "quam", "felis", "ultricies", "pellentesque", "eu", "sem",
  "justo", "rhoncus", "imperdiet", "venenatis", "vitae", "nullam", "dictum",
  "pede", "mollis", "integer", "cras", "vivamus", "elementum", "semper",
  "aenean", "vulputate", "eleifend", "leo", "ligula", "porttitor",
];

type GenMode = "paragraphs" | "sentences" | "words";

export default function LoremIpsumGenerator() {
  const [mode, setMode] = useState<GenMode>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const getMaxCount = () => {
    if (mode === "paragraphs") return 20;
    if (mode === "sentences") return 100;
    return 500;
  };

  const generateParagraph = (sentenceCount: number): string => {
    const sentences: string[] = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(LOREM_SENTENCES[Math.floor(Math.random() * LOREM_SENTENCES.length)]);
    }
    return sentences.join(" ");
  };

  const generateWords = (wordCount: number): string => {
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
    }
    // Capitalize first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  };

  const generate = () => {
    let result = "";
    if (mode === "paragraphs") {
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        const sentCount = 4 + Math.floor(Math.random() * 4); // 4-7 sentences per paragraph
        paragraphs.push(generateParagraph(sentCount));
      }
      result = paragraphs.join("\n\n");
    } else if (mode === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(LOREM_SENTENCES[Math.floor(Math.random() * LOREM_SENTENCES.length)]);
      }
      result = sentences.join(" ");
    } else {
      result = generateWords(count);
    }
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;
  const charCount = output.length;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <AlignLeft color="var(--primary)" /> Lorem Ipsum Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Generate placeholder text for your designs, mockups, and layouts instantly.</p>
      </div>

      {/* Controls */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Generation Options</h3>

        {/* Mode selection */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Generate by:</label>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {(["paragraphs", "sentences", "words"] as GenMode[]).map((m) => (
              <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                <input
                  type="radio"
                  name="mode"
                  checked={mode === m}
                  onChange={() => { setMode(m); setCount(m === "paragraphs" ? 3 : m === "sentences" ? 5 : 50); }}
                  style={{ accentColor: 'var(--primary)' }}
                />
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Count */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            Number of {mode} (1–{getMaxCount()})
          </label>
          <input
            type="number"
            className="input-field"
            style={{ maxWidth: '200px' }}
            min={1}
            max={getMaxCount()}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(getMaxCount(), parseInt(e.target.value) || 1)))}
          />
        </div>

        <button className="btn btn-primary" onClick={generate}>
          <Sparkles size={16} /> Generate Lorem Ipsum
        </button>
      </div>

      {/* Output */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1rem' }}>Generated Text</h3>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {output && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>
                {wordCount} words &bull; {charCount} chars
              </span>
            )}
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!output}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
            </button>
            <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => setOutput("")} disabled={!output}>
              Clear
            </button>
          </div>
        </div>
        <textarea
          className="input-field"
          style={{ minHeight: '250px', background: '#f8fafc', fontSize: '0.95rem', lineHeight: '1.7' }}
          value={output}
          readOnly
          placeholder="Click &quot;Generate Lorem Ipsum&quot; to create placeholder text..."
        />
      </div>

      {/* Stats */}
      {output && (
        <div className="grid-3" style={{ marginBottom: '3rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{wordCount}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Words</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{charCount}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Characters</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{output.split('\n\n').filter(p => p.trim()).length}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paragraphs</div>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div className="prose">
        <h2>What is Lorem Ipsum and why do people use it?</h2>
        <p>If you&apos;ve ever looked at a website mockup or a design file, you&apos;ve probably seen that weird Latin-looking text scattered all over the place. That&apos;s Lorem Ipsum — it&apos;s been the standard placeholder text in the design and printing industry since the 1500s. The whole idea is that when you&apos;re laying out a page, you don&apos;t want actual meaningful content to distract from the visual design. Lorem Ipsum fills that gap perfectly because it looks like real text but doesn&apos;t mean anything specific.</p>

        <h2>How this generator works</h2>
        <p>This tool gives you three ways to generate placeholder text. You can generate by paragraphs (great for filling out blog layouts and article templates), by sentences (perfect for testing individual text blocks or card components), or by word count (ideal when you need a specific length of text). Just pick your mode, set how much text you want, and hit generate. Each time you click, you&apos;ll get a slightly different mix of sentences, so it stays fresh and natural-looking.</p>

        <h2>When should you actually use placeholder text?</h2>
        <p>Pretty much anytime you&apos;re building something visual and don&apos;t have the final copy yet. Web designers use it in Figma mockups to show clients how a page will look. Frontend devs use it to test responsive layouts and typography. Print designers use it for brochures and magazines. Even email marketers use it to preview templates before the actual content is ready. The key thing is: once the real content arrives, swap it out. Shipping a live site with Lorem Ipsum is a classic embarrassing mistake — we&apos;ve all seen it happen.</p>

        <h2>Is this tool free and private?</h2>
        <p>Totally free, no sign-ups, no limits. And since the text is generated entirely in your browser using a hardcoded library of sentences, nothing is sent to any server. There&apos;s no tracking, no analytics on what you generate, nothing. Just open the page, generate your text, copy it, and get back to work. It even works offline once the page is loaded.</p>
      </div>
    </div>
  );
}
