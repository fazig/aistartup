"use client";

import { useState } from "react";
import { Monitor, Smartphone, Tablet, MonitorPlay, ExternalLink } from "lucide-react";

export default function ScreenResolutionSimulator() {
  const [url, setUrl] = useState("");
  const [activeUrl, setActiveUrl] = useState("");
  const [resolution, setResolution] = useState({ width: 1920, height: 1080, name: "Desktop (1080p)" });

  const presets = [
    { name: "iPhone SE", width: 375, height: 667, icon: <Smartphone size={16} /> },
    { name: "iPhone 14 Pro Max", width: 430, height: 932, icon: <Smartphone size={16} /> },
    { name: "iPad Mini", width: 768, height: 1024, icon: <Tablet size={16} /> },
    { name: "iPad Pro", width: 1024, height: 1366, icon: <Tablet size={16} /> },
    { name: "MacBook Air", width: 1280, height: 832, icon: <Monitor size={16} /> },
    { name: "Standard Desktop", width: 1366, height: 768, icon: <Monitor size={16} /> },
    { name: "Desktop (1080p)", width: 1920, height: 1080, icon: <MonitorPlay size={16} /> },
  ];

  const handleSimulate = () => {
    if (!url) return;
    let target = url.trim();
    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      target = "https://" + target;
    }
    setActiveUrl(target);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1400px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Monitor color="var(--primary)" /> Webpage Screen Resolution Simulator
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly test how any website looks across different devices, smartphones, and desktop monitors.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '1rem', flexGrow: 1, maxWidth: '600px' }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="https://yoursite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSimulate()}
            style={{ flexGrow: 1 }}
          />
          <button className="btn btn-primary" onClick={handleSimulate} disabled={!url}>
            Simulate
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {presets.map((preset, i) => (
            <button 
              key={i}
              className={`btn ${resolution.name === preset.name ? 'btn-secondary' : 'btn-outline'}`}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}
              onClick={() => setResolution(preset)}
            >
              {preset.icon}
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {activeUrl ? (
        <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '600px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: `${resolution.width}px`, color: 'white', marginBottom: '1rem', fontSize: '0.9rem' }}>
            <span>{resolution.name}</span>
            <span>{resolution.width} x {resolution.height}</span>
          </div>
          
          <div style={{ 
            width: `${resolution.width}px`, 
            height: `${resolution.height}px`, 
            background: 'white',
            border: '8px solid #334155',
            borderRadius: resolution.width < 768 ? '30px' : '8px',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)',
            transition: 'all 0.3s ease'
          }}>
            <iframe 
              src={activeUrl}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Simulator"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
          
          <div style={{ marginTop: '2rem', color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ExternalLink size={14} /> Note: Some websites block iframe embedding for security reasons. If the screen is white, they have X-Frame-Options set to DENY.
          </div>
        </div>
      ) : (
        <div style={{ background: '#f8fafc', padding: '4rem 2rem', borderRadius: '12px', border: '1px dashed var(--border-strong)', textAlign: 'center', color: 'var(--text-muted)' }}>
          <MonitorPlay size={64} style={{ opacity: 0.2, marginBottom: '1rem', margin: '0 auto' }} />
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--foreground)' }}>Ready to Simulate</h3>
          <p>Enter a URL above and click simulate to test its responsiveness.</p>
        </div>
      )}

      <div className="prose" style={{ marginTop: '3rem' }}>
        <h2>Why is Screen Resolution Testing Important?</h2>
        <p>In the early days of the internet, everyone browsed the web on bulky desktop monitors with the exact same 800x600 resolution. Today, your visitors are using thousands of different devices—from massive 4K widescreen TVs to tiny budget smartphones.</p>
        <p>If your website looks gorgeous on your laptop, but the buttons are too small to tap on an iPhone, you will lose a massive percentage of your customers. In fact, over 60% of all global web traffic now comes from mobile devices.</p>

        <h2>Google's Mobile-First Indexing</h2>
        <p>Google has officially switched to a "Mobile-First" algorithm. This means Google's crawling bots evaluate your website <em>exactly as it appears on a smartphone</em>. If your mobile layout is broken, your text is too small, or your images bleed off the edge of the screen, Google will heavily penalize your SEO rankings—even if your desktop site is perfect.</p>

        <h3>How to use our Simulator</h3>
        <p>Our tool uses an <code>iframe</code> to force your website to render inside a strictly bounded pixel box. By clicking the preset buttons above (like "iPhone 14 Pro Max" or "iPad Mini"), you instantly force the browser to recalculate its CSS Media Queries and adjust the layout.</p>
        <p>If you notice that your navigation menu isn't collapsing into a "Hamburger" icon on the mobile view, or if your images are stretching horribly, you need to contact your web developer to implement Responsive Web Design (CSS Flexbox, Grid, and Media Queries).</p>
      </div>
    </div>
  );
}
