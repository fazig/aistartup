"use client";
import Link from "next/link";

import { useState } from "react";
import { PenTool, Copy, Check, RefreshCw, ArrowLeft } from "lucide-react";

export default function ArticleRewriter() {
  const [text, setText] = useState("");
  const [rewritten, setRewritten] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // A basic synonym dictionary for client-side rewriting
  const synonyms: Record<string, string[]> = {
    "important": ["crucial", "essential", "vital", "significant", "key"],
    "good": ["excellent", "great", "positive", "beneficial", "superb"],
    "bad": ["poor", "negative", "harmful", "terrible", "awful"],
    "fast": ["quick", "rapid", "swift", "speedy", "brisk"],
    "slow": ["sluggish", "leisurely", "unhurried", "delayed"],
    "make": ["create", "build", "construct", "produce", "generate"],
    "use": ["utilize", "employ", "apply", "harness", "operate"],
    "help": ["assist", "aid", "support", "guide", "facilitate"],
    "many": ["numerous", "multiple", "various", "several", "abundant"],
    "very": ["highly", "extremely", "incredibly", "exceptionally", "profoundly"],
    "often": ["frequently", "regularly", "repeatedly", "commonly", "habitually"],
    "hard": ["difficult", "challenging", "tough", "demanding", "arduous"],
    "easy": ["simple", "effortless", "straightforward", "uncomplicated", "painless"],
    "start": ["begin", "commence", "initiate", "launch", "embark"],
    "stop": ["cease", "halt", "conclude", "terminate", "finish"],
    "show": ["display", "reveal", "demonstrate", "illustrate", "exhibit"],
    "hide": ["conceal", "obscure", "mask", "camouflage", "cover"],
    "find": ["discover", "locate", "uncover", "identify", "detect"],
    "change": ["modify", "alter", "transform", "adjust", "revise"],
    "new": ["novel", "fresh", "recent", "modern", "innovative"],
    "old": ["ancient", "outdated", "archaic", "obsolete", "aged"],
    "big": ["large", "massive", "huge", "enormous", "substantial"],
    "small": ["tiny", "compact", "miniature", "diminutive", "modest"],
    "always": ["constantly", "perpetually", "continually", "invariably", "consistently"],
    "never": ["rarely", "seldom", "infrequently", "hardly ever", "not ever"]
  };

  const rewriteText = () => {
    if (!text.trim()) return;
    setLoading(true);

    setTimeout(() => {
      // Split into words, preserving punctuation and spaces using a simple regex
      const tokens = text.split(/([\s.,!?;:()]+)/);
      
      const newText = tokens.map(token => {
        const lowerToken = token.toLowerCase();
        if (synonyms[lowerToken]) {
          // Pick a random synonym
          const opts = synonyms[lowerToken];
          const randomSyn = opts[Math.floor(Math.random() * opts.length)];
          
          // Match original capitalization
          if (token[0] === token[0].toUpperCase()) {
            return randomSyn.charAt(0).toUpperCase() + randomSyn.slice(1);
          }
          return randomSyn;
        }
        return token;
      }).join("");

      setRewritten(newText);
      setLoading(false);
    }, 600); // Fake delay for UX
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewritten);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <PenTool color="var(--primary)" /> Article Rewriter (Spinbot)
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly paraphrase and rewrite articles by automatically swapping words with their synonyms.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Original Text</h3>
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '300px', resize: 'vertical' }}
            placeholder="Paste your original article or paragraph here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={rewriteText} disabled={!text || loading}>
            {loading ? <RefreshCw className="animate-spin" size={18} /> : "Rewrite Article"}
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Rewritten Text</h3>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy} disabled={!rewritten}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '300px', resize: 'vertical', background: '#f8fafc' }}
            readOnly
            value={rewritten}
            placeholder="Your freshly spun article will appear here..."
          />
        </div>
      </div>

      <div className="prose">
        <h2>What is an Article Rewriter?</h2>
        <p>An article rewriter (often called an article spinner or paraphrasing tool) is a piece of software designed to take a block of text and automatically change the words to create a "new" version of the exact same content. It does this by scanning the text, identifying common words, and swapping them out for their synonyms.</p>
        <p>For example, if you paste the sentence: <em>"It is very important to use good SEO practices,"</em> the tool might rewrite it to say: <em>"It is highly crucial to utilize excellent SEO practices."</em> The core meaning of the sentence remains exactly the same, but the vocabulary has shifted.</p>

        <h2>Why do people use Article Spinners?</h2>
        <p>Historically, SEO professionals and digital marketers used these tools to scale their content production. If a marketer needed to post 50 articles across 50 different blog directories to build backlinks, writing 50 unique articles would take weeks. Instead, they would write one Master Article, run it through a spinner 50 times, and post the variations. Because the words were different, search engines (at the time) viewed them as "unique" articles rather than duplicate content.</p>
        <p>Today, while mass-spinning for SEO is heavily penalized by Google's advanced algorithms, these tools are still incredibly useful for:</p>
        <ul>
          <li><strong>Overcoming Writer's Block:</strong> If you are stuck staring at a paragraph that just doesn't sound right, running it through a rewriter can give you fresh vocabulary and new ways to phrase your ideas.</li>
          <li><strong>Simplifying Complex Text:</strong> Sometimes academic papers or legal jargon can be incredibly dense. Swapping out massive words for simpler synonyms makes the text much easier for a general audience to digest.</li>
          <li><strong>Social Media Variations:</strong> If you want to tweet the same link three times in one week without sounding like a broken record, a paraphrasing tool can quickly generate three unique captions for you.</li>
        </ul>

        <h2>Does this tool use AI?</h2>
        <p>Unlike massive, slow AI models that require expensive server costs and monthly subscriptions, this specific tool relies on a blazing-fast, client-side synonym dictionary. It runs entirely within your web browser using Javascript. This means your text is completely private, it processes instantly, and there are absolutely no usage limits or paywalls.</p>
      </div>
    </div>
  );
}
