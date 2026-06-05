"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import { Monitor, Smartphone, Globe, Info, ArrowLeft } from "lucide-react";

export default function WhatIsMyBrowser() {
  const [browserInfo, setBrowserInfo] = useState<any>(null);

  useEffect(() => {
    // Basic parser for demonstration (in production, a library like bowser is better, but we are keeping it 0 dependencies)
    const ua = navigator.userAgent;
    let browserName = "Unknown Browser";
    let osName = "Unknown OS";
    let deviceType = "Desktop";

    // Detect Browser
    if (ua.indexOf("Firefox") > -1) browserName = "Mozilla Firefox";
    else if (ua.indexOf("SamsungBrowser") > -1) browserName = "Samsung Internet";
    else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browserName = "Opera";
    else if (ua.indexOf("Trident") > -1) browserName = "Internet Explorer";
    else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) browserName = "Microsoft Edge";
    else if (ua.indexOf("Chrome") > -1) browserName = "Google Chrome";
    else if (ua.indexOf("Safari") > -1) browserName = "Apple Safari";

    // Detect OS
    if (ua.indexOf("Win") > -1) osName = "Windows";
    else if (ua.indexOf("Mac") > -1) osName = "MacOS";
    else if (ua.indexOf("X11") > -1) osName = "UNIX";
    else if (ua.indexOf("Linux") > -1) osName = "Linux";
    
    // Mobile specific overrides
    if (/Android/.test(ua)) {
      osName = "Android";
      deviceType = "Mobile / Tablet";
    }
    if (/iPhone|iPad|iPod/.test(ua)) {
      osName = "iOS";
      deviceType = "Mobile / Tablet";
    }

    setBrowserInfo({
      browser: browserName,
      os: osName,
      device: deviceType,
      userAgent: ua,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled ? "Yes" : "No",
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    });
  }, []);

  if (!browserInfo) return <div style={{ padding: '3rem', textAlign: 'center' }}>Analyzing your system...</div>;

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
          <Globe color="var(--primary)" /> What is my Browser?
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Instantly detect your browser, operating system, and screen specifications.</p>
      </div>

      {/* Main Banner */}
      <div className="card" style={{ marginBottom: '3rem', textAlign: 'center', padding: '3rem 1rem', background: 'linear-gradient(135deg, var(--primary) 0%, #1e3a8a 100%)', color: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>You are using {browserInfo.browser}</h2>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>on {browserInfo.os} ({browserInfo.device})</p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Monitor size={20} /> System Details
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '1rem' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, width: '40%' }}>Browser Name</td>
                <td style={{ padding: '1rem' }}>{browserInfo.browser}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>Operating System</td>
                <td style={{ padding: '1rem' }}>{browserInfo.os}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>Device Type</td>
                <td style={{ padding: '1rem' }}>{browserInfo.device}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>Screen Resolution</td>
                <td style={{ padding: '1rem' }}>{browserInfo.screenWidth} x {browserInfo.screenHeight} pixels</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>Browser Language</td>
                <td style={{ padding: '1rem' }}>{browserInfo.language}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>Cookies Enabled?</td>
                <td style={{ padding: '1rem' }}>{browserInfo.cookiesEnabled}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={20} /> Raw User-Agent String
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            This is the exact string of data your web browser secretly sends to every website you visit:
          </p>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-strong)', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6, wordBreak: 'break-all' }}>
            {browserInfo.userAgent}
          </div>
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', borderRadius: '8px', fontSize: '0.85rem' }}>
            <strong>Tech Support Tip:</strong> If you are talking to an IT technician or customer support agent, take a screenshot of this page and send it to them. It gives them all the diagnostic info they need!
          </div>
        </div>
      </div>

      <div className="prose">
        <h2>What is a User-Agent?</h2>
        <p>Every time you click a link or type a web address, your browser sends a request to a remote server. Attached to that request is a small header called the <strong>User-Agent String</strong>. This string tells the server exactly what browser you are using, what operating system you are on, and what type of device you have.</p>
        <p>Historically, web developers used this string to send different versions of a website to different users. If the User-Agent said "iPhone," the server would send the mobile version of the site. If it said "Internet Explorer 6," the server might send a warning that the browser is too old.</p>
      </div>
    </div>
  );
}
