"use client";

import { useState, useEffect } from "react";
import { Globe, Copy, Check, MapPin, Server, Activity } from "lucide-react";

interface IpData {
  ip: string;
  city?: string;
  region?: string;
  country_name?: string;
  org?: string;
  asn?: string;
}

export default function MyIpAddress() {
  const [data, setData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch IP data from a free public API (ipapi.co)
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to basic ipify if full details fail
        fetch("https://api.ipify.org?format=json")
          .then(res => res.json())
          .then(json => {
            setData({ ip: json.ip });
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      });
  }, []);

  const handleCopy = () => {
    if (data?.ip) {
      navigator.clipboard.writeText(data.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Globe color="var(--primary)" /> What is My IP Address?
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly discover your public IPv4/IPv6 address, location, and ISP details.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Activity size={32} color="var(--primary)" className="animate-pulse" />
            <p style={{ color: 'var(--text-muted)' }}>Detecting your network connection...</p>
          </div>
        ) : error || !data ? (
          <div style={{ color: '#dc2626' }}>
            <p>Error detecting IP address. You might be using an aggressive ad-blocker or VPN that blocks API requests.</p>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 500 }}>Your Public IP Address is:</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--primary)' }}>
                {data.ip}
              </div>
              <button className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }} onClick={handleCopy}>
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>

            {/* Extra Location/ISP Details if available */}
            {data.city && (
              <div className="grid-2" style={{ textAlign: 'left', marginTop: '2rem', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', background: '#eff6ff', borderRadius: '8px', color: 'var(--primary)' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Location</div>
                    <div style={{ fontWeight: 600 }}>{data.city}, {data.region}, {data.country_name}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', background: '#eff6ff', borderRadius: '8px', color: 'var(--primary)' }}>
                    <Server size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Internet Service Provider (ISP)</div>
                    <div style={{ fontWeight: 600 }}>{data.org}</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* SEO Content Section */}
      <div className="prose">
        <h2>What actually is an IP Address?</h2>
        <p>Think of the internet like the physical postal system. If you want to send a letter to your friend across the country, you absolutely need their exact home address. Without it, the post office has no idea where to deliver the envelope.</p>
        <p>The internet works the exact same way. When you type "Google.com" into your browser and hit enter, your computer is essentially mailing a request to Google's servers asking them to send back the webpage. But how does Google know where to send the webpage back to? That's where your IP (Internet Protocol) address comes in. It is a unique string of numbers assigned to your router by your Internet Service Provider (like Comcast, AT&T, or Spectrum) that identifies your specific connection on the global web.</p>
        
        <h2>Public vs. Private IP Addresses</h2>
        <p>It's important to understand that you actually have two different IP addresses running at the same time.</p>
        <ul>
          <li><strong>Private (Local) IP:</strong> This is assigned by your home WiFi router to your specific device (like your phone or laptop). It usually looks something like <code>192.168.1.5</code>. This address only exists inside your house. If you look at your phone's Wi-Fi settings, this is the number you will see.</li>
          <li><strong>Public (External) IP:</strong> This is the address assigned to your actual house/router by your internet company. It's the address that the rest of the outside world sees. The tool on this page detects your <strong>Public</strong> IP address, because that is the one exposed to the internet.</li>
        </ul>

        <h2>Why does this tool show my city?</h2>
        <p>IP addresses are distributed in massive blocks to regional Internet Service Providers. Because of this, it is very easy to look up which company owns a specific block of IPs, and roughly what geographic region they serve. When you load this page, our tool queries a public geolocation database to map your IP address to your ISP's closest data center. </p>
        <p>Don't panic, though! It cannot show your exact street address or your name. It usually just shows the city or zip code where your ISP's local hub is located. Sometimes, it might even show a city a few hours away from you, depending on how your ISP routes their traffic.</p>

        <h2>Why would I need to know my IP?</h2>
        <p>Most of the time, you don't. The internet handles it all for you automatically. However, there are a few common scenarios where a tech support agent or software setup will demand it:</p>
        <ol>
          <li><strong>Setting up a server or game:</strong> If you are trying to host a Minecraft server for your friends, they will need your public IP address to connect to your house.</li>
          <li><strong>Bypassing an office firewall:</strong> If you work remotely, your company's IT department might ask for your IP address so they can "whitelist" it, allowing you access to secure company servers.</li>
          <li><strong>Checking your VPN:</strong> If you pay for a VPN (Virtual Private Network) to hide your location, you can use this tool to verify it's actually working. If you turn on your VPN to "Tokyo" and this page still shows you in "New York", you know your VPN is leaking!</li>
        </ol>
      </div>
    </div>
  );
}
