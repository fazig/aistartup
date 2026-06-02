"use client";

import { useState } from "react";
import { Network, Search, AlertTriangle, CheckCircle } from "lucide-react";

export default function ClassCIpChecker() {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const analyzeIps = () => {
    if (!inputText.trim()) return;

    // Extract all IPv4 addresses using regex
    const ipv4Regex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;
    const matches = inputText.match(ipv4Regex) || [];
    
    // Deduplicate
    const uniqueIps = Array.from(new Set(matches));

    if (uniqueIps.length === 0) {
      setResults([{ error: "No valid IPv4 addresses found in the text." }]);
      return;
    }

    const classCMap: Record<string, string[]> = {};

    uniqueIps.forEach(ip => {
      // Split IP into blocks: A.B.C.D
      const blocks = ip.split('.');
      // The Class C subnet is the first 3 blocks: A.B.C.*
      const classC = \`\${blocks[0]}.\${blocks[1]}.\${blocks[2]}.\*\`;
      
      if (!classCMap[classC]) classCMap[classC] = [];
      classCMap[classC].push(ip);
    });

    const formattedResults = Object.keys(classCMap).map(classC => ({
      classC,
      ips: classCMap[classC],
      count: classCMap[classC].length
    }));

    // Sort so subnets with the most IPs show up first
    formattedResults.sort((a, b) => b.count - a.count);
    
    setResults(formattedResults);
  };

  const handleClear = () => {
    setInputText("");
    setResults([]);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Network color="var(--primary)" /> Class C IP Checker
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Analyze a bulk list of IP addresses to discover which ones share the exact same Class C server subnet.</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Paste IP Addresses</h3>
            <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleClear} disabled={!inputText}>
              Clear
            </button>
          </div>
          
          <textarea 
            className="input-field"
            style={{ flexGrow: 1, minHeight: '300px', resize: 'vertical' }}
            placeholder="Paste up to 100 IP addresses here (each on a new line)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={analyzeIps} disabled={!inputText}>
            Analyze Class C Subnets
          </button>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Subnet Results</h3>
          
          {results.length === 0 ? (
             <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 2rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border-strong)' }}>
               <Search size={48} style={{ opacity: 0.3, marginBottom: '1rem', margin: '0 auto' }} />
               <p>Paste a list of IPs and click analyze to group them by subnet.</p>
             </div>
          ) : results[0].error ? (
             <div style={{ padding: '1rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <AlertTriangle size={20} /> {results[0].error}
             </div>
          ) : (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '500px' }}>
                {results.map((subnet, idx) => (
                  <div key={idx} style={{ border: \`1px solid \${subnet.count > 1 ? '#fca5a5' : 'var(--border-light)'}\`, borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ padding: '0.75rem 1rem', background: subnet.count > 1 ? '#fef2f2' : '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: \`1px solid \${subnet.count > 1 ? '#fca5a5' : 'var(--border-light)'}\` }}>
                      <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: subnet.count > 1 ? '#dc2626' : 'var(--foreground)' }}>
                        {subnet.count > 1 ? <AlertTriangle size={16} /> : <CheckCircle size={16} color="#16a34a" />}
                        Class C: {subnet.classC}
                      </strong>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, background: subnet.count > 1 ? '#dc2626' : '#94a3b8', color: 'white', padding: '0.1rem 0.5rem', borderRadius: '12px' }}>
                        {subnet.count} IPs
                      </span>
                    </div>
                    <div style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.8, background: 'white' }}>
                      {subnet.ips.map((ip: string, i: number) => (
                        <div key={i}>{ip}</div>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          )}
        </div>
      </div>

      <div className="prose">
        <h2>What is a Class C IP Address?</h2>
        <p>An IPv4 address is made up of four blocks of numbers separated by periods (e.g., <code>192.168.1.55</code>). These blocks are referred to as classes:</p>
        <ul>
          <li><strong>Class A:</strong> The first block (<code>192</code>)</li>
          <li><strong>Class B:</strong> The second block (<code>168</code>)</li>
          <li><strong>Class C:</strong> The third block (<code>1</code>)</li>
          <li><strong>Class D:</strong> The final block (<code>55</code>)</li>
        </ul>
        <p>If two different websites are hosted on the exact same physical server, their IP addresses will usually be identical across all four blocks. However, if a web hosting company owns a giant warehouse full of servers, they usually assign IPs from the same <strong>Class C Subnet</strong>. This means the first three blocks (A, B, and C) are identical, and only the final block (D) changes.</p>

        <h2>Why is this critically important for SEO?</h2>
        <p>If you are trying to build backlinks to your website to rank higher on Google, the holy grail of SEO is getting links from diverse, authoritative, and totally independent websites.</p>
        <p>Many black-hat SEOs attempt to trick Google by building a "Private Blog Network" (PBN). They buy 50 different domain names, host them all themselves, and link them all to their main website. Because these sites are all owned by the same person, they are almost always hosted in the same data center and share the exact same <strong>Class C IP Subnet</strong>.</p>

        <h3>The Google Penalty</h3>
        <p>Google's algorithm is extremely smart. If it notices that 50 backlinks are pointing to your website, and all 50 backlinks come from the exact same Class C subnet, Google knows you are faking the links. They will flag your site for manipulation, penalize your domain, and wipe out your search traffic.</p>
        <p>Before you buy backlinks or start an outreach campaign, use our Class C IP Checker to ensure your link partners are hosted on diverse, independent server networks! If the tool highlights multiple IPs in red, they share the same subnet and provide zero SEO value.</p>
      </div>
    </div>
  );
}
