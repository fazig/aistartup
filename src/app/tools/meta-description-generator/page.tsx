"use client";

import { useState } from "react";
import { AlignLeft, Wand2, Copy, Check } from "lucide-react";

export default function MetaDescriptionGenerator() {
  const [keyword, setKeyword] = useState("");
  const [secondary, setSecondary] = useState("");
  const [category, setCategory] = useState("blog");
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateDescriptions = () => {
    if (!keyword) return;
    
    const kw = keyword.trim().replace(/^w/, c => c.toUpperCase());
    const secKw = secondary ? secondary.trim().toLowerCase() : 'exclusive insights';
    
    let generated: string[] = [];

    if (category === "blog") {
      generated = [
        `Discover the ultimate guide to ${kw}. We break down everything you need to know about ${secKw} to help you succeed faster.`,
        `Struggling with ${kw}? Learn the top secrets, proven strategies, and ${secKw} that the experts use to dominate the industry.`,
        `Read our comprehensive review of ${kw}. Find out the pros, cons, and ${secKw} before you make any decisions today.`
      ];
    } else if (category === "ecommerce") {
      generated = [
        `Looking for the best ${kw}? Shop our premium collection featuring ${secKw}. Enjoy fast shipping and a 100% money-back guarantee.`,
        `Buy high-quality ${kw} at unbeatable prices. Browse our latest inventory for ${secKw} and upgrade your lifestyle today!`,
        `Shop top-rated ${kw} on sale now. We offer the best deals on ${secKw}. Click here to claim your exclusive discount before it expires.`
      ];
    } else if (category === "local") {
      generated = [
        `Need reliable ${kw} in your area? Our licensed experts provide top-notch ${secKw}. Call us today for a free, no-obligation estimate!`,
        `We are your trusted local specialists for ${kw}. Delivering fast, affordable, and professional ${secKw}. Book your appointment now.`,
        `Searching for the best ${kw}? We offer award-winning service and ${secKw} to our local community. Contact us today to learn more.`
      ];
    }

    setResults(generated);
    setCopiedIndex(null);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <AlignLeft color="var(--primary)" /> AI SEO Meta Description Generator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Generate compelling, click-worthy Meta Descriptions perfectly tailored to Google's 160-character limit.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Primary Target Keyword</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Organic Coffee Beans"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Secondary Keyword or Benefit (Optional)</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. free overnight shipping"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateDescriptions()}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Website Niche / Category</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="category" checked={category === "blog"} onChange={() => setCategory("blog")} />
                Blog / Article
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="category" checked={category === "ecommerce"} onChange={() => setCategory("ecommerce")} />
                eCommerce Product
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="category" checked={category === "local"} onChange={() => setCategory("local")} />
                Local Business / Service
              </label>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={generateDescriptions} disabled={!keyword}>
            <Wand2 size={20} /> Generate Meta Descriptions
          </button>
        </div>

        {results.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Generated Descriptions (150-160 chars)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.map((desc, i) => (
                <div key={i} style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid var(--border-strong)', borderRadius: '8px' }}>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', lineHeight: 1.6 }}>{desc}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border-light)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: desc.length > 160 ? '#dc2626' : '#16a34a' }}>
                      Length: {desc.length} chars {desc.length > 160 ? '(Warning: Google may truncate this)' : '(Perfect)'}
                    </span>
                    <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={() => handleCopy(desc, i)}>
                      {copiedIndex === i ? <Check size={14} /> : <Copy size={14} />} {copiedIndex === i ? 'Copied' : 'Copy HTML Tag'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="prose">
        <h2>What is an SEO Meta Description?</h2>
        <p>A Meta Description is the short paragraph of gray text that appears directly beneath your blue Meta Title in Google's search results. While Google has stated that the Meta Description does not directly impact your ranking algorithmically, it acts as your website's "sales pitch" on the search engine results page (SERP).</p>

        <h2>Why it matters for SEO</h2>
        <p>Even though the description isn't a direct ranking factor, <strong>Click-Through Rate (CTR)</strong> absolutely is! If your Meta Description is incredibly persuasive, more humans will click on your link instead of your competitors. Google's AI will notice that users prefer your website, and they will rapidly bump you up to the #1 spot.</p>

        <h3>Best Practices for Meta Descriptions</h3>
        <ul>
          <li><strong>Include the Target Keyword:</strong> Google actively bolds the searcher's keyword inside your description, making your result pop off the page visually.</li>
          <li><strong>Keep it under 160 characters:</strong> Just like titles, Google will brutally truncate your description with an ellipsis (...) if it goes over the character limit. You want your full sales pitch to be visible.</li>
          <li><strong>Include a Call To Action (CTA):</strong> Always tell the user exactly what to do next. Phrases like "Click here to read more", "Shop the collection", or "Call us today" are proven psychological triggers that boost click rates.</li>
        </ul>
      </div>
    </div>
  );
}
