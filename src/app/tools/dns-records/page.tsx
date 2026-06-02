"use client";

import { useState } from "react";
import { Server, Search, Loader2 } from "lucide-react";

interface DnsAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

export default function FindDnsRecords() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DnsAnswer[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dnsTypes: Record<string, string> = {
    "A": "IPv4 Address",
    "AAAA": "IPv6 Address",
    "CNAME": "Canonical Name",
    "MX": "Mail Exchange",
    "TXT": "Text Record",
    "NS": "Name Server"
  };

  const lookupDns = async () => {
    if (!domain.trim()) return;
    
    // Clean up domain (remove http/https and trailing slashes)
    let cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0];
    
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Use Google's Public DNS-over-HTTPS API
      const res = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=${recordType}`);
      const data = await res.json();
      
      if (data.Status !== 0) {
        throw new Error("DNS resolution failed or domain does not exist.");
      }
      
      if (data.Answer) {
        setResults(data.Answer);
      } else {
        setResults([]); // No records of this type found
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch DNS records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Server color="var(--primary)" /> Find DNS Records
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Query Google's Public DNS to instantly check A, CNAME, MX, TXT, and NS records for any domain.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Domain Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. startupai.tech"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && lookupDns()}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Record Type</label>
            <select 
              className="input-field"
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              style={{ cursor: 'pointer', background: 'white' }}
            >
              {Object.entries(dnsTypes).map(([type, label]) => (
                <option key={type} value={type}>{type} - {label}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: '100%' }} onClick={lookupDns} disabled={!domain.trim() || loading}>
          {loading ? <Loader2 className="animate-pulse" size={20} /> : <Search size={20} />} 
          {loading ? " Querying..." : " Lookup DNS Records"}
        </button>

        {/* Results Area */}
        {error && (
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {results !== null && !error && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              Results for {recordType} Records
            </h3>
            
            {results.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No {recordType} records found for this domain.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--border-light)' }}>
                      <th style={{ padding: '0.75rem' }}>Name</th>
                      <th style={{ padding: '0.75rem' }}>TTL</th>
                      <th style={{ padding: '0.75rem' }}>Target Data (Value)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 500 }}>{r.name}</td>
                        <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{r.TTL}s</td>
                        <td style={{ padding: '0.75rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>{r.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What are DNS Records?</h2>
        <p>If you read the article on our "My IP Address" tool, you know that computers use numerical IP addresses to find each other on the internet. But humans are terrible at memorizing numbers. We prefer words, like "Google.com" or "StartupAI.tech".</p>
        <p>The DNS (Domain Name System) is essentially the phonebook of the internet. When you type a domain name into your browser, your computer looks up that domain in the DNS phonebook to find out what IP address it should connect to. The entries in this massive, global phonebook are called <strong>DNS Records</strong>.</p>
        
        <h2>The different types of DNS Records</h2>
        <p>A single domain name can have dozens of different records attached to it, each serving a totally different technical purpose. When you use our tool above, you have to select which "type" of record you are looking for. Here is a quick breakdown of what they mean:</p>
        
        <h3>1. A Records (IPv4)</h3>
        <p>This is the most important record. "A" stands for Address. It simply points a domain name (like example.com) to the IPv4 address of the web server that hosts the website. If you mess up your A Record, your website goes down instantly.</p>
        
        <h3>2. AAAA Records (IPv6)</h3>
        <p>This does the exact same thing as an A record, but instead of pointing to an older IPv4 address, it points to a newer, longer IPv6 address.</p>
        
        <h3>3. CNAME Records (Canonical Name)</h3>
        <p>A CNAME record doesn't point to an IP address; it points to <em>another domain name</em>. For example, if you want "www.example.com" to go to the exact same place as "example.com", you just create a CNAME record pointing "www" to the root domain. It's basically a shortcut or an alias.</p>
        
        <h3>4. MX Records (Mail Exchange)</h3>
        <p>MX records are critical for email. They tell the rest of the internet which mail servers are responsible for accepting email messages on behalf of your domain. If you set up a custom email like "hello@yourstartup.com" using Google Workspace or Microsoft 365, they will force you to add their specific MX records to your domain so that you can actually receive emails.</p>
        
        <h3>5. TXT Records (Text)</h3>
        <p>Originally, TXT records were just meant for leaving human-readable notes on a domain. Today, they are highly weaponized for security. You will primarily use TXT records to prove to Google Search Console that you own a domain, or to set up SPF and DKIM email security protocols to prevent hackers from spoofing your email address.</p>
        
        <h2>Why is this tool useful?</h2>
        <p>When you launch a new website or migrate to a new web host, you have to change your DNS records. Because the internet's phonebook is decentralized, those changes don't happen instantly—they take time to "propagate" across the globe. By using this tool, you are querying Google's incredibly fast Public DNS servers to check if your recent record changes have successfully gone live to the public.</p>
      </div>
    </div>
  );
}
