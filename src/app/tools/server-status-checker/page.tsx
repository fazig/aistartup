"use client";

import { useState } from "react";
import { Server, Activity, CheckCircle, AlertTriangle } from "lucide-react";
import { checkServerStatus } from "./actions";

export default function ServerStatusChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    
    try {
      const data = await checkServerStatus(url);
      setResult(data);
    } catch (e) {
      setResult({ error: "An unexpected network error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Server color="var(--primary)" /> Server Status Checker
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly check if a website is online or offline, and analyze its HTTP response codes.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            className="input-field"
            placeholder="e.g. google.com or https://yoursite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            style={{ flexGrow: 1 }}
          />
          <button className="btn btn-primary" onClick={handleCheck} disabled={!url || loading}>
            {loading ? "Pinging..." : "Check Status"}
          </button>
        </div>

        {result && result.error && (
          <div style={{ padding: '1.5rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AlertTriangle size={24} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Website Offline or Unreachable</strong>
              <span>{result.error} Target: {result.url}</span>
            </div>
          </div>
        )}

        {result && result.success && (
          <div>
            <div style={{ padding: '1.5rem', background: result.status >= 200 && result.status < 400 ? '#f0fdf4' : '#fef2f2', border: \`1px solid \${result.status >= 200 && result.status < 400 ? '#86efac' : '#fca5a5'}\`, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              {result.status >= 200 && result.status < 400 ? (
                <CheckCircle color="#16a34a" size={32} style={{ flexShrink: 0 }} />
              ) : (
                <AlertTriangle color="#dc2626" size={32} style={{ flexShrink: 0 }} />
              )}
              
              <div>
                <strong style={{ display: 'block', fontSize: '1.25rem', color: result.status >= 200 && result.status < 400 ? '#166534' : '#991b1b' }}>
                  HTTP {result.status} {result.statusText}
                </strong>
                <span style={{ color: result.status >= 200 && result.status < 400 ? '#15803d' : '#b91c1c' }}>Target: {result.url}</span>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, width: '40%' }}>Response Time (Latency)</td>
                  <td style={{ padding: '1rem', color: result.responseTime > 1000 ? '#dc2626' : 'inherit' }}>
                    <Activity size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--primary)' }} />
                    {result.responseTime} ms
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>Web Server Software</td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{result.server}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {!loading && !result && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 2rem' }}>
            <Server size={48} style={{ opacity: 0.3, marginBottom: '1rem', margin: '0 auto' }} />
            <p>Enter a website URL to ping the server and check its HTTP response code.</p>
          </div>
        )}
      </div>

      <div className="prose">
        <h2>What does this tool do?</h2>
        <p>If you type a web address into your browser and the page fails to load, you are left wondering: <em>"Is the website completely down for everyone, or is my home WiFi just acting up?"</em></p>
        <p>Our Server Status Checker answers this question instantly. It acts as an independent third-party server. When you click the check button, our backend servers reach out directly to the target website, completely bypassing your local WiFi and ISP. If we can reach the website, you know the problem is on your end. If we can't reach it, you know the website is officially offline for everyone.</p>

        <h2>Understanding HTTP Status Codes</h2>
        <p>When you check a website, the server returns a mathematical "HTTP Status Code". Here is what the most common numbers mean:</p>
        <ul>
          <li><strong>200 OK:</strong> The Holy Grail. The server is perfectly healthy, online, and responding normally.</li>
          <li><strong>301 / 302 Redirect:</strong> The server is healthy, but the page you requested has been moved to a new URL.</li>
          <li><strong>403 Forbidden:</strong> The server is online, but it is actively blocking our scanner. The website owner likely has a strict firewall (like Cloudflare) blocking automated bots from checking their status.</li>
          <li><strong>404 Not Found:</strong> The server is online, but the specific URL you typed does not exist in their database.</li>
          <li><strong>500 Internal Server Error:</strong> The website's code has crashed. Their database might be down, or a PHP script is throwing a fatal error. The webmaster needs to fix this immediately.</li>
          <li><strong>503 Service Unavailable:</strong> The server is online, but it is severely overloaded with traffic and cannot handle any more requests right now.</li>
        </ul>

        <h2>What is Response Time (Latency)?</h2>
        <p>This metric measures exactly how many milliseconds (ms) it took for our scanner to reach the server and get an answer back. A highly optimized, fast server should respond in under 300ms. If the response time is over 1,500ms (1.5 seconds), the server is heavily sluggish and likely providing a poor user experience for visitors.</p>
      </div>
    </div>
  );
}
