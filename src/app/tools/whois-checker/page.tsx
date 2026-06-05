"use client";
import Link from "next/link";

import { useState } from "react";
import { Search, Info, Loader2, ShieldAlert, ArrowLeft } from "lucide-react";

export default function WhoisChecker() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const lookupWhois = async () => {
    if (!domain.trim()) return;
    
    // Clean domain
    let cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
    
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`https://networkcalc.com/api/dns/whois/${cleanDomain}`);
      const json = await res.json();
      
      if (json.status !== "OK" || !json.whois || !json.whois.domain_name) {
        throw new Error("Could not retrieve WHOIS records for this domain. It may be unregistered or protected.");
      }
      
      setData(json.whois);
    } catch (err: any) {
      setError(err.message || "Failed to fetch WHOIS records.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Unknown";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
          <Info color="var(--primary)" /> WHOIS Domain Lookup
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly discover who owns a domain, when it was registered, and when it expires.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <input 
            type="text" 
            className="input-field" 
            style={{ flexGrow: 1 }}
            placeholder="Enter a domain name (e.g. google.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && lookupWhois()}
          />
          <button className="btn btn-primary" onClick={lookupWhois} disabled={!domain.trim() || loading}>
            {loading ? <Loader2 className="animate-pulse" size={20} /> : <Search size={20} />} 
          </button>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {data && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              {data.domain_name}
            </h3>

            <div className="grid-2" style={{ gap: '2rem' }}>
              <div>
                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Important Dates</h4>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 600 }}>Registered On:</span> <br/>{formatDate(data.creation_date)}
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 600 }}>Expires On:</span> <br/>{formatDate(data.expiration_date)}
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 600 }}>Last Updated:</span> <br/>{formatDate(data.updated_date)}
                </div>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Registrar Info</h4>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 600 }}>Registrar:</span> <br/>{data.registrar || "Unknown"}
                </div>
                {data.nameservers && data.nameservers.length > 0 && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600 }}>Nameservers:</span> <br/>
                    <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                      {data.nameservers.map((ns: string, i: number) => <li key={i}>{ns}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <ShieldAlert color="#d97706" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#92400e' }}>Privacy Protection Notice</strong>
                <p style={{ fontSize: '0.875rem', color: '#b45309', margin: '0.25rem 0 0 0' }}>
                  Due to GDPR and modern domain privacy services (like Domains By Proxy), the actual name and email of the domain owner are usually redacted. You will typically only see the name of the Registrar company.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What exactly is WHOIS?</h2>
        <p>If you've ever thought of a brilliant name for a startup, rushed to buy the domain, and realized it was already taken, your first question was probably: "Who owns this?!"</p>
        <p><strong>WHOIS</strong> (pronounced "who is") is a public, internet-wide database that stores the registered details of every single domain name in existence. Whenever you buy a domain name from a registrar (like GoDaddy or Namecheap), the governing body of the internet (ICANN) requires that your contact information, registration dates, and server details be entered into this massive public ledger.</p>

        <h2>Why use a WHOIS Lookup Tool?</h2>
        <p>There are several professional reasons you might need to query the WHOIS database:</p>
        <ul>
          <li><strong>Buying a parked domain:</strong> If you see a great domain name that just says "Coming Soon", you can use WHOIS to try and find the owner's contact email to negotiate a purchase.</li>
          <li><strong>Checking expiration dates:</strong> If a competitor or a squatter owns a domain you desperately want, you can use this tool to see exactly what day their registration expires. If they forget to renew it, you can swoop in and buy it.</li>
          <li><strong>Technical troubleshooting:</strong> If you are a web developer trying to fix a client's broken website, you can use WHOIS to look up their "Nameservers". This tells you exactly which web hosting company their domain is currently pointed to.</li>
          <li><strong>Investigating scams:</strong> If you receive a sketchy email from a weird domain, you can look it up here. If the domain was registered 3 days ago in a foreign country, it's almost certainly a phishing scam.</li>
        </ul>

        <h2>Why can't I see the owner's name anymore?</h2>
        <p>If you used WHOIS back in 2010, you would see the actual home address, phone number, and personal email address of the person who bought the domain. It was a privacy nightmare.</p>
        <p>Today, things are completely different. Due to the European Union's GDPR laws, as well as the rise of "Domain Privacy Protection" services offered by registrars, the actual identity of the domain owner is almost always redacted and replaced with something like "REDACTED FOR PRIVACY". </p>
        <p>However, the technical details—like the creation date, the expiration date, the registrar company, and the nameservers—are always 100% public and visible in our tool.</p>
      </div>
    </div>
  );
}
