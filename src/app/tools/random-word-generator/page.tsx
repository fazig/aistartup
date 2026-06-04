"use client";

import { useState, useMemo } from "react";
import { Shuffle, Copy, Check, Trash2, RefreshCw } from "lucide-react";

const NOUNS = [
  "time","year","people","way","day","man","woman","child","world","life",
  "hand","part","place","case","week","company","system","program","question","work",
  "government","number","night","point","home","water","room","mother","area","money",
  "story","fact","month","lot","right","study","book","eye","job","word",
  "business","issue","side","kind","head","house","service","friend","father","power",
  "hour","game","line","end","member","law","car","city","community","name",
  "president","team","minute","idea","body","information","back","parent","face","others",
  "level","office","door","health","person","art","war","history","party","result",
  "change","morning","reason","research","girl","guy","moment","air","teacher","force",
  "education","dog","cat","bird","tree","river","mountain","ocean","sun","moon",
  "star","rain","wind","fire","stone","flower","garden","road","bridge","island",
  "forest","lake","snow","cloud","storm","light","shadow","dream","music","song"
];

const VERBS = [
  "be","have","do","say","go","get","make","know","think","take",
  "see","come","want","look","use","find","give","tell","work","call",
  "try","ask","need","feel","become","leave","put","mean","keep","let",
  "begin","seem","help","show","hear","play","run","move","live","believe",
  "hold","bring","happen","write","provide","sit","stand","lose","pay","meet",
  "include","continue","set","learn","change","lead","understand","watch","follow","stop",
  "create","speak","read","allow","add","spend","grow","open","walk","win",
  "offer","remember","love","consider","appear","buy","wait","serve","die","send",
  "expect","build","stay","fall","cut","reach","kill","remain","suggest","raise",
  "pass","sell","require","report","decide","pull","develop","thank","carry","break",
  "receive","agree","support","hit","produce","eat","cover","catch","draw","choose"
];

const ADJECTIVES = [
  "good","new","first","last","long","great","little","own","other","old",
  "right","big","high","different","small","large","next","early","young","important",
  "few","public","bad","same","able","free","sure","true","clear","real",
  "full","special","easy","strong","possible","whole","dark","simple","hard","left",
  "late","general","past","deep","fast","wide","final","wild","ready","happy",
  "bright","quiet","soft","warm","cold","dry","wet","rough","smooth","sharp",
  "flat","round","thick","thin","loose","tight","empty","rich","poor","fresh",
  "heavy","loud","gentle","calm","brave","tiny","huge","rare","vast","narrow",
  "broad","brief","sudden","rapid","slow","steady","fierce","mild","bitter","sweet",
  "sour","plain","fancy","modern","ancient","hollow","solid","pale","vivid","bold"
];

export default function RandomWordGenerator() {
  const [count, setCount] = useState(10);
  const [includeNouns, setIncludeNouns] = useState(true);
  const [includeVerbs, setIncludeVerbs] = useState(true);
  const [includeAdj, setIncludeAdj] = useState(true);
  const [separator, setSeparator] = useState("space");
  const [words, setWords] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const wordPool = useMemo(() => {
    const pool: string[] = [];
    if (includeNouns) pool.push(...NOUNS);
    if (includeVerbs) pool.push(...VERBS);
    if (includeAdj) pool.push(...ADJECTIVES);
    return pool.length > 0 ? pool : NOUNS;
  }, [includeNouns, includeVerbs, includeAdj]);

  const generate = () => {
    const num = Math.max(1, Math.min(500, count));
    const result: string[] = [];
    for (let i = 0; i < num; i++) {
      const idx = Math.floor(Math.random() * wordPool.length);
      result.push(wordPool[idx]);
    }
    setWords(result);
  };

  const getSep = () => {
    switch (separator) {
      case "newline": return "\n";
      case "comma": return ", ";
      default: return " ";
    }
  };

  const outputText = words.join(getSep());

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setWords([]);
  };

  const poolSize = wordPool.length;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Shuffle color="var(--primary)" /> Random Word Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Generate random English words for brainstorming, writing exercises, games, or just for fun.
        </p>
      </div>

      {/* Controls */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label className="input-label">Number of Words</label>
            <input
              type="number"
              className="input-field"
              min={1}
              max={500}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))}
            />
          </div>
          <div>
            <label className="input-label">Separator</label>
            <select className="input-field" value={separator} onChange={(e) => setSeparator(e.target.value)}>
              <option value="space">Space</option>
              <option value="newline">New Line</option>
              <option value="comma">Comma</option>
            </select>
          </div>
          <div>
            <label className="input-label">Word Pool Size</label>
            <div style={{ padding: '0.65rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-light)', fontWeight: 600, color: 'var(--primary)', fontSize: '1.1rem' }}>
              {poolSize} words
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={includeNouns} onChange={(e) => setIncludeNouns(e.target.checked)} style={{ width: '1.1rem', height: '1.1rem' }} />
            Nouns ({NOUNS.length})
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={includeVerbs} onChange={(e) => setIncludeVerbs(e.target.checked)} style={{ width: '1.1rem', height: '1.1rem' }} />
            Verbs ({VERBS.length})
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={includeAdj} onChange={(e) => setIncludeAdj(e.target.checked)} style={{ width: '1.1rem', height: '1.1rem' }} />
            Adjectives ({ADJECTIVES.length})
          </label>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} onClick={generate}>
            <RefreshCw size={18} /> Generate Words
          </button>
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handleCopy} disabled={words.length === 0}>
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied!' : 'Copy'}
          </button>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handleClear} disabled={words.length === 0}>
            <Trash2 size={16} /> Clear
          </button>
        </div>
      </div>

      {/* Stats */}
      {words.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem', padding: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>{words.length}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Words</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>{new Set(words).size}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Unique</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>{outputText.length}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Characters</div>
          </div>
        </div>
      )}

      {/* Output */}
      <div className="card" style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Generated Words</h3>
        <textarea
          className="input-field"
          style={{ minHeight: '200px', fontSize: '1rem', lineHeight: '1.8', background: '#f8fafc' }}
          value={outputText}
          readOnly
          placeholder="Click 'Generate Words' to get started..."
        />
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What's a random word generator useful for?</h2>
        <p>You'd be surprised how many situations call for a bunch of random words. Creative writers use them for prompts and warm-up exercises — pick five random words and write a story that connects them all. Game designers use them for naming characters, locations, or items during prototyping. Teachers love them for vocabulary games, spelling bees, and classroom icebreakers. And honestly? Sometimes you just need random placeholder text that isn't boring old "Lorem Ipsum" for the hundredth time.</p>

        <h2>How does this generator work?</h2>
        <p>It's pretty straightforward. I've hand-curated a pool of over 300 common English words, broken into three categories: nouns (things like "mountain", "river", "music"), verbs (action words like "create", "build", "discover"), and adjectives (descriptive words like "bright", "calm", "fierce"). When you hit generate, the tool randomly picks from whichever categories you've turned on and gives you exactly the number of words you asked for.</p>
        <p>You can generate anywhere from 1 to 500 words at a time, which is honestly more than enough for most use cases. The words are pulled using JavaScript's random number generation, so every click gives you a completely fresh set. If you get a word you love, just hit Copy and it's on your clipboard instantly.</p>

        <h2>Can I filter by word type?</h2>
        <p>Yep! That's the whole point of the checkboxes. If you only want nouns — maybe you're brainstorming names for a project or need a list of things — just uncheck verbs and adjectives. If you're writing poetry and want a mix of descriptive and action words, keep verbs and adjectives on but turn off nouns. The tool adapts the word pool in real time, and you can always see how many words are available in the pool size indicator.</p>

        <h2>Is the word list random enough?</h2>
        <p>Each generation is a fresh random draw from the pool. That said, if you're generating close to the total pool size (say 300+ words from a 330-word pool), you'll naturally see repetition — that's just math. For typical use cases of 5-50 words, the variety is excellent. The unique word counter in the stats bar lets you see at a glance how many distinct words you got in each batch.</p>
      </div>
    </div>
  );
}
