"use client";
import Link from "next/link";

import { useState } from "react";
import { Server, Search, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";

export default function DomainIntoIp() {
  const [domain, setDomain] = useState("");
  const [ipData, setIpData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveDomain = async () => {
    if (!domain.trim()) return;
    
    // Clean input (remove http:// and paths)
    let cleanDomain = domain.toLowerCase().trim();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, '');
    cleanDomain = cleanDomain.split('/')[0];

    setLoading(true);
    setError(null);
    setIpData([]);

    try {
      // Use Cloudflare DNS over HTTPS (DoH) API to resolve the domain client-side
      const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${cleanDomain}&type=A`, {
        headers: {
          'Accept': 'application/dns-json'
        }
      });
      
      const data = await response.json();
      
      if (data.Status !== 0 || !data.Answer) {
        setError("Could not resolve this domain. It may not exist or doesn't have an A record.");
      } else {
        // Filter for A records (type 1)
        const ips = data.Answer.filter((ans: any) => ans.type === 1);
        if (ips.length === 0) {
           setError("Domain exists, but no IPv4 (A) records were found.");
        } else {
           setIpData(ips);
        }
      }
    } catch (err) {
      setError("Network error occurred while querying the DNS server.");
    } finally {
      setLoading(false);
    }
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
          <Server color="var(--primary)" /> Domain into IP
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly resolve any website domain name to discover the underlying IP address of its hosting server.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="input-field"
            placeholder="e.g. google.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && resolveDomain()}
            style={{ flexGrow: 1 }}
          />
          <button className="btn btn-primary" onClick={resolveDomain} disabled={!domain || loading}>
            {loading ? "Resolving..." : "Convert to IP"}
          </button>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertTriangle size={20} /> {error}
          </div>
        )}

        {ipData.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle color="#16a34a" size={20} /> Resolution Successful
            </h3>
            
            <div style={{ background: '#f8fafc', border: '1px solid var(--border-light)', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid var(--border-light)' }}>
                    <th style={{ padding: '1rem' }}>Domain</th>
                    <th style={{ padding: '1rem' }}>TTL (Seconds)</th>
                    <th style={{ padding: '1rem' }}>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {ipData.map((record, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{record.name}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{record.TTL}</td>
                      <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--primary)' }}>{record.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Queries are performed securely using Cloudflare's DNS-over-HTTPS (DoH) API.
            </p>
          </div>
        )}

        {!loading && !error && ipData.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            <Search size={48} style={{ opacity: 0.3, marginBottom: '1rem', margin: '0 auto' }} />
            <p>Enter a domain name to reveal its server IP.</p>
          </div>
        )}
      </div>

      <div className="prose">
        <h2>How does the Domain to IP tool work?</h2>
        <p>The internet does not actually run on domain names like <code>google.com</code> or <code>startupai.tech</code>. The entire internet runs on <strong>IP Addresses</strong>—unique strings of numbers separated by periods (like <code>142.250.190.46</code>) that identify the exact physical server rack where a website lives.</p>
        <p>Because human beings are terrible at memorizing random strings of numbers, we invented the <strong>DNS (Domain Name System)</strong>. Think of DNS as the phonebook of the internet. When you type <code>google.com</code> into your browser, your computer instantly checks the DNS phonebook to find the IP address assigned to that name, and then connects you to the server.</p>

        <h2>Why would I need to find a website's IP?</h2>
        <p>Web developers, cybersecurity analysts, and IT professionals use Domain-to-IP lookup tools every single day for several reasons:</p>
        <ul>
          <li><strong>Bypassing Firewalls:</strong> Sometimes corporate networks block access to specific domain names, but forget to block the direct IP address.</li>
          <li><strong>Checking Server Migrations:</strong> If you recently moved your website to a new web host (like moving from GoDaddy to AWS), it takes 24-48 hours for the global DNS phonebook to update. You can use this tool to check if the domain is pointing to your old server IP or your new server IP!</li>
          <li><strong>Identifying Scammers:</strong> If you receive an email from a highly suspicious, spammy-looking domain, you can convert the domain to an IP, and then run a WHOIS check on the IP to find out exactly what hosting company the scammer is using so you can report them.</li>
        </ul>
      </div>
    </div>
  );
}
