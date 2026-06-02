"use client";

import { useState } from "react";
import { SearchCheck, Trash2 } from "lucide-react";

interface DensityResult {
  word: string;
  count: number;
  percentage: number;
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<DensityResult[]>([]);
  const [twoWordResults, setTwoWordResults] = useState<DensityResult[]>([]);

  const analyzeDensity = () => {
    if (!text.trim()) return;

    // Clean text: lowercase, remove punctuation, split into words
    const cleanText = text.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    const words = cleanText.split(" ").filter(w => w.length > 2); // ignore 1-2 letter words like "a", "it", "to"

    const totalWords = words.length;
    if (totalWords === 0) return;

    // Calculate 1-word density
    const counts: Record<string, number> = {};
    words.forEach(w => {
      counts[w] = (counts[w] || 0) + 1;
    });

    const densityMap: DensityResult[] = Object.keys(counts).map(word => ({
      word,
      count: counts[word],
      percentage: Number(((counts[word] / totalWords) * 100).toFixed(2))
    }));

    densityMap.sort((a, b) => b.count - a.count);
    
    // Filter out common stop words from top results
    const stopWords = ['the', 'and', 'for', 'that', 'this', 'with', 'you', 'not', 'are', 'was', 'but', 'from', 'have', 'they'];
    const filteredDensity = densityMap.filter(d => !stopWords.includes(d.word)).slice(0, 15);
    
    setResults(filteredDensity);

    // Calculate 2-word (bigram) density
    const bigrams: Record<string, number> = {};
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i+1]}`;
      // Basic stop word filter for bigrams to avoid "of the", "in the"
      if (!stopWords.includes(words[i]) || !stopWords.includes(words[i+1])) {
         bigrams[phrase] = (bigrams[phrase] || 0) + 1;
      }
    }

    const totalBigrams = words.length - 1;
    const bigramMap: DensityResult[] = Object.keys(bigrams).map(phrase => ({
      word: phrase,
      count: bigrams[phrase],
      percentage: Number(((bigrams[phrase] / totalBigrams) * 100).toFixed(2))
    }));

    bigramMap.sort((a, b) => b.count - a.count);
    setTwoWordResults(bigramMap.slice(0, 10));
  };

  const handleClear = () => {
    setText("");
    setResults([]);
    setTwoWordResults([]);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <SearchCheck color="var(--primary)" /> Keyword Density Checker
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Analyze your text to prevent keyword stuffing and optimize your SEO content strategy.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Input Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem' }}>Paste Your Article</h3>
            <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleClear} disabled={!text}>
              <Trash2 size={14} /> Clear
            </button>
          </div>
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '300px', resize: 'vertical' }}
            placeholder="Paste your blog post, article, or webpage content here to analyze exactly which keywords are being used the most..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={analyzeDensity} disabled={!text}>
            Analyze Keyword Density
          </button>
        </div>

        {/* Results Area */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Density Analysis</h3>
          
          {results.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', background: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border-strong)' }}>
              Paste your text and click analyze to see your keyword breakdown.
            </div>
          ) : (
            <div>
              <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1rem' }}>Top 1-Word Keywords</h4>
              <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--border-light)' }}>
                      <th style={{ padding: '0.5rem' }}>Keyword</th>
                      <th style={{ padding: '0.5rem' }}>Count</th>
                      <th style={{ padding: '0.5rem' }}>Density</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 600 }}>{r.word}</td>
                        <td style={{ padding: '0.5rem' }}>{r.count}</td>
                        <td style={{ padding: '0.5rem' }}>
                          <span style={{ 
                            padding: '0.1rem 0.4rem', 
                            borderRadius: '4px', 
                            background: r.percentage > 4 ? '#fef2f2' : '#f0fdf4',
                            color: r.percentage > 4 ? '#dc2626' : '#16a34a'
                          }}>
                            {r.percentage}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', fontSize: '1rem' }}>Top 2-Word Phrases</h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--border-light)' }}>
                      <th style={{ padding: '0.5rem' }}>Phrase</th>
                      <th style={{ padding: '0.5rem' }}>Count</th>
                      <th style={{ padding: '0.5rem' }}>Density</th>
                    </tr>
                  </thead>
                  <tbody>
                    {twoWordResults.map((r, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 600 }}>{r.word}</td>
                        <td style={{ padding: '0.5rem' }}>{r.count}</td>
                        <td style={{ padding: '0.5rem' }}>{r.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What is Keyword Density?</h2>
        <p>In the world of Search Engine Optimization (SEO), Keyword Density is a simple mathematical calculation: it is the number of times a specific word appears on your page, divided by the total number of words on the page, multiplied by 100.</p>
        <p>For example, if you write a 1,000-word blog post about "Dog Training", and you use the exact phrase "Dog Training" 20 times, your keyword density for that specific phrase is <strong>2.0%</strong>.</p>
        
        <h2>Why is checking density so important?</h2>
        <p>Search engines like Google rely on the text content of your webpage to understand what the page is actually about. If you never use your target keyword in the article, Google won't rank you for it. However, if you use it <em>too much</em>, Google will actively penalize you.</p>

        <h3>Avoiding "Keyword Stuffing" Penalties</h3>
        <p>Back in 2005, SEO was easy. If you wanted to rank #1 for "Buy cheap laptops", you would just type "Buy cheap laptops" 500 times at the bottom of your page in invisible white text. Google caught on to this very quickly.</p>
        <p>Today, this practice is known as "Keyword Stuffing." It makes your article unreadable for human beings, and Google's algorithms will aggressively demote your website in the search results if they catch you doing it. Our Keyword Density Checker prevents this by analyzing your text before you publish it. If you see a keyword turning red with a density above 4%, you know you need to go back into your article and replace some of those keywords with synonyms to avoid a Google penalty!</p>

        <h2>What is the ideal keyword density?</h2>
        <p>There is no officially confirmed "magic number" from Google, but the general consensus among elite SEO professionals is that your primary target keyword should sit somewhere between <strong>1% and 3%</strong>.</p>
        <p>This shows Google exactly what the article is about without feeling spammy to the reader. Furthermore, you should be utilizing <strong>LSI Keywords</strong> (Latent Semantic Indexing). Instead of repeating "Dog Training" over and over, you should weave in related 2-word phrases like "puppy obedience," "canine behavior," and "teaching tricks." Our tool actively checks your 2-word phrase density to help you ensure you have a healthy, natural spread of vocabulary!</p>
      </div>
    </div>
  );
}
