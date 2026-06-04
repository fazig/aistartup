"use client";

import { useState } from "react";
import { 
  ShieldCheck, Search, CheckCircle, XCircle, Loader2, AlertCircle, 
  ArrowRight, Globe, Lock, Cpu, FileText, Check, Copy, Printer 
} from "lucide-react";

interface AdSenseResults {
  domain: string;
  isHttps: boolean;
  domainAgeMonths: number;
  domainAgePassed: boolean;
  ttfbMs: number;
  ttfbStatus: "excellent" | "good" | "slow";
  pageSizeKb: number;
  wordCount: number;
  hasSufficientWords: boolean;
  h1Count: number;
  h2Count: number;
  h1Status: "perfect" | "missing" | "multiple";
  imagesCount: number;
  imagesWithAltCount: number;
  altStatus: "perfect" | "needs_work" | "none";
  hasPrivacyPolicy: boolean;
  hasTerms: boolean;
  hasContact: boolean;
  hasAbout: boolean;
  hasRobotsTxt: boolean;
  hasSitemapXml: boolean;
  hasAdsTxt: boolean;
  securityHeaders: {
    csp: boolean;
    hsts: boolean;
    xFrameOptions: boolean;
    xContentTypeOptions: boolean;
  };
  score: number;
  approvalProbability: "High" | "Medium" | "Low";
}

export default function AdSenseChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<AdSenseResults | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "content" | "tech" | "legal" | "crawl">("all");
  const [copied, setCopied] = useState(false);

  const handleCheck = async () => {
    if (!url.trim()) {
      setError("Please enter a valid website URL.");
      return;
    }
    
    setLoading(true);
    setError("");
    setResults(null);

    try {
      const res = await fetch("/api/adsense-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to analyze the site. Please try again.");
      } else {
        setResults(data);
      }
    } catch (err) {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getProbabilityColor = (prob: "High" | "Medium" | "Low") => {
    if (prob === "High") return "#10b981"; // Emerald
    if (prob === "Medium") return "#f59e0b"; // Amber
    return "#ef4444"; // Red
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const AuditItem = ({ title, passed, message, suggestion }: { title: string; passed: boolean; message: string; suggestion: string }) => (
    <div style={{ 
      display: "flex", 
      alignItems: "flex-start", 
      gap: "1rem", 
      padding: "1.25rem", 
      background: "var(--bg-card)", 
      border: "1px solid var(--border-light)", 
      borderRadius: "12px", 
      marginBottom: "1rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
    }}>
      <div style={{ marginTop: "0.2rem" }}>
        {passed ? (
          <CheckCircle color="#10b981" fill="#e6f4ea" size={24} />
        ) : (
          <XCircle color="#ef4444" fill="#fce8e6" size={24} />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
          <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "1.05rem", color: "var(--text-main)", fontWeight: 600 }}>{title}</h4>
          <span style={{ 
            fontSize: "0.75rem", 
            fontWeight: 700, 
            padding: "0.2rem 0.6rem", 
            borderRadius: "20px", 
            background: passed ? "#e6f4ea" : "#fce8e6", 
            color: passed ? "#137333" : "#c5221f" 
          }}>
            {passed ? "PASSED" : "FAILED"}
          </span>
        </div>
        <p style={{ margin: "0 0 0.5rem 0", color: "var(--text-main)", fontSize: "0.925rem" }}>{message}</p>
        {!passed && (
          <div style={{ 
            background: "#fffbeb", 
            border: "1px solid #fef3c7", 
            padding: "0.6rem 0.8rem", 
            borderRadius: "8px", 
            fontSize: "0.85rem", 
            color: "#b45309",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <AlertCircle size={14} style={{ flexShrink: 0 }} />
            <span><strong>Fix:</strong> {suggestion}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container" style={{ padding: "4rem 1.5rem" }}>
      {/* Header section */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "0.5rem", 
          background: "#eff6ff", 
          color: "var(--primary)", 
          padding: "0.5rem 1rem", 
          borderRadius: "9999px", 
          fontSize: "0.875rem", 
          fontWeight: 700,
          marginBottom: "1rem"
        }}>
          <ShieldCheck size={16} />
          <span>Next-Gen AI AdSense Auditor 2026</span>
        </div>
        <h1 style={{ fontSize: "2.75rem", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
          AdSense Approval Probability Checker
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
          Run an instant, multi-point diagnostic check to evaluate content depth, security parameters, legal policy pages, and technical crawlability.
        </p>
      </div>

      {/* Input panel */}
      <div className="card" style={{ maxWidth: "750px", margin: "0 auto 3rem auto", padding: "1.75rem" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <input
            type="text"
            className="input-field"
            placeholder="Type web address (e.g. https://domain.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            style={{ flex: "1", minWidth: "260px", fontSize: "1rem", padding: "0.9rem 1.2rem", borderRadius: "10px" }}
          />
          <button 
            className="btn btn-primary" 
            onClick={handleCheck} 
            disabled={loading}
            style={{ padding: "0.9rem 1.75rem", borderRadius: "10px", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            {loading ? "Analyzing..." : "Analyze Site"}
          </button>
        </div>
        {error && <div style={{ color: "#ef4444", marginTop: "1rem", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}><AlertCircle size={16} />{error}</div>}
      </div>

      {results && (
        <div className="animate-fade-in">
          {/* Dashboard Panel */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr", 
            gap: "2rem", 
            marginBottom: "3rem" 
          }}>
            {/* Scoring and Main Summary card */}
            <div className="card" style={{ 
              display: "flex", 
              flexDirection: "row", 
              alignItems: "center", 
              justifyContent: "space-around", 
              flexWrap: "wrap", 
              gap: "2rem",
              padding: "2.5rem"
            }}>
              {/* Circular Gauge */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ position: "relative", width: "160px", height: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                    <circle 
                      cx="80" 
                      cy="80" 
                      r="70" 
                      fill="transparent" 
                      stroke={getScoreColor(results.score)} 
                      strokeWidth="12" 
                      strokeDasharray="439.8"
                      strokeDashoffset={439.8 - (439.8 * results.score) / 100}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1s ease" }}
                    />
                  </svg>
                  <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1 }}>{results.score}%</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginTop: "4px" }}>Audit Score</span>
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div style={{ flex: "1", minWidth: "280px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Analysis for {results.domain}</span>
                <h2 style={{ fontSize: "2.25rem", margin: "0.25rem 0 0.5rem 0", fontWeight: 800 }}>
                  Approval Probability: <span style={{ color: getProbabilityColor(results.approvalProbability) }}>{results.approvalProbability}</span>
                </h2>
                
                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                  {results.score >= 80 ? (
                    "Excellent alignment! Your site fulfills the core Google AdSense requirements. Ensure your traffic is organic and you are ready to submit."
                  ) : results.score >= 50 ? (
                    "Moderate eligibility status. You have implemented basic layouts, but fixing the warnings below will significantly optimize approval speeds."
                  ) : (
                    "Low eligibility. Critical guidelines have been missed. Apply the recommendations below before submitting your application to avoid rejection."
                  )}
                </p>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", gap: "0.4rem" }} onClick={handlePrint}>
                    <Printer size={15} /> Print Report
                  </button>
                  <button className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", gap: "0.4rem" }} onClick={handleCopyLink}>
                    {copied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                    {copied ? "Link Copied!" : "Share Report"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "1.25rem", 
            marginBottom: "3rem" 
          }}>
            <div className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ background: "#e0f2fe", padding: "0.5rem", borderRadius: "10px" }}><Globe size={22} color="var(--primary)" /></div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Domain Age</span>
                <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{results.domainAgeMonths >= 0 ? `${results.domainAgeMonths} Months` : "Unknown"}</span>
              </div>
            </div>
            <div className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ background: "#dcfce7", padding: "0.5rem", borderRadius: "10px" }}><FileText size={22} color="#15803d" /></div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Word Count</span>
                <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{results.wordCount} Words</span>
              </div>
            </div>
            <div className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ background: "#fee2e2", padding: "0.5rem", borderRadius: "10px" }}><Cpu size={22} color="#b91c1c" /></div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>TTFB Speed</span>
                <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{results.ttfbMs} ms</span>
              </div>
            </div>
            <div className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ background: "#f3e8ff", padding: "0.5rem", borderRadius: "10px" }}><Lock size={22} color="#7e22ce" /></div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>SSL Status</span>
                <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{results.isHttps ? "Secure" : "Insecure"}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ 
            display: "flex", 
            borderBottom: "1px solid var(--border-light)", 
            gap: "0.5rem", 
            marginBottom: "2rem",
            overflowX: "auto",
            paddingBottom: "1px"
          }}>
            {(["all", "content", "tech", "legal", "crawl"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "0.75rem 1.25rem",
                  background: "transparent",
                  border: "none",
                  borderBottom: activeTab === tab ? "2px solid var(--primary)" : "2px solid transparent",
                  color: activeTab === tab ? "var(--primary)" : "var(--text-muted)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s"
                }}
              >
                {tab === "all" && "All Diagnostics"}
                {tab === "content" && "Content & SEO"}
                {tab === "tech" && "Technical & Security"}
                {tab === "legal" && "Required Pages"}
                {tab === "crawl" && "Crawlability"}
              </button>
            ))}
          </div>

          {/* Tab content checklist items */}
          <div style={{ marginBottom: "4rem" }}>
            {/* Category: Content & SEO */}
            {(activeTab === "all" || activeTab === "content") && (
              <div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <FileText size={18} color="var(--primary)" /> Content Depth & Tag Architecture
                </h3>
                <AuditItem 
                  title="Content Word Count Check" 
                  passed={results.hasSufficientWords}
                  message={`Your webpage content stands at ${results.wordCount} words.`}
                  suggestion="Increase the text length on the index page. AdSense prefers high-value content with at least 600 words of authentic copy."
                />
                <AuditItem 
                  title="Heading 1 Tag Check" 
                  passed={results.h1Status === "perfect"}
                  message={`We found ${results.h1Count} <h1> tag(s) on the page.`}
                  suggestion={results.h1Status === "missing" 
                    ? "Add a single, optimized <h1> tag describing your site's core theme." 
                    : "Reduce your <h1> tags to exactly one. Having multiple confuses crawler parsing."}
                />
                <AuditItem 
                  title="Alt Image Attributes" 
                  passed={results.altStatus === "perfect"}
                  message={`Found ${results.imagesCount} images on the page, with ${results.imagesWithAltCount} having alt properties.`}
                  suggestion="Ensure every image tag has an alt='description' property. Search engine crawlers require alt tags for compliance."
                />
              </div>
            )}

            {/* Category: Technical & Security */}
            {(activeTab === "all" || activeTab === "tech") && (
              <div style={{ marginTop: activeTab === "all" ? "2.5rem" : 0 }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Lock size={18} color="#7e22ce" /> Security Protocols & Response Audit
                </h3>
                <AuditItem 
                  title="Secure Socket Layer (SSL)" 
                  passed={results.isHttps}
                  message={results.isHttps ? "The site utilizes a valid HTTPS protocol." : "The site resolves over insecure HTTP."}
                  suggestion="Install an SSL certificate immediately. Google AdSense requires HTTPS connection security for ads verification."
                />
                <AuditItem 
                  title="Time to First Byte (TTFB)" 
                  passed={results.ttfbStatus !== "slow"}
                  message={`Page response measurement returned a TTFB of ${results.ttfbMs} ms.`}
                  suggestion="Improve page speeds by optimizing image payloads, leveraging client/edge caching, and minimizing complex redirect blocks."
                />
                <AuditItem 
                  title="Secure Transport Headers (HSTS)" 
                  passed={results.securityHeaders.hsts}
                  message={results.securityHeaders.hsts ? "Strict-Transport-Security header is present." : "Strict-Transport-Security (HSTS) header is missing."}
                  suggestion="Configure the Strict-Transport-Security header on your server to mandate secure client connections."
                />
                <AuditItem 
                  title="Content Security Policy (CSP)" 
                  passed={results.securityHeaders.csp}
                  message={results.securityHeaders.csp ? "Content Security Policy is configured." : "CSP header configuration was not found."}
                  suggestion="Implement a Content Security Policy header to prevent cross-site scripting (XSS) and injection vulnerabilities."
                />
              </div>
            )}

            {/* Category: Legal & Required Pages */}
            {(activeTab === "all" || activeTab === "legal") && (
              <div style={{ marginTop: activeTab === "all" ? "2.5rem" : 0 }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <ShieldCheck size={18} color="#15803d" /> User Trust & Policy Pages
                </h3>
                <AuditItem 
                  title="Privacy Policy Link" 
                  passed={results.hasPrivacyPolicy}
                  message={results.hasPrivacyPolicy ? "Found a Privacy Policy URL linked in the content." : "Privacy policy page was not detected."}
                  suggestion="Deploy a dedicated Privacy Policy page. AdSense requires publishers to clearly explain cookie usage and user tracking."
                />
                <AuditItem 
                  title="Terms and Conditions Link" 
                  passed={results.hasTerms}
                  message={results.hasTerms ? "Found a Terms page or Terms & Conditions link." : "Terms of Service page link is missing."}
                  suggestion="Create a Terms & Conditions page to define user agreements and policies governing site usage."
                />
                <AuditItem 
                  title="Contact Information Link" 
                  passed={results.hasContact}
                  message={results.hasContact ? "Detected a Contact Page link." : "No explicit link to a contact page was detected."}
                  suggestion="Add a Contact page with an email form or address so users (and AdSense validators) can verify who manages the site."
                />
                <AuditItem 
                  title="About Page Link" 
                  passed={results.hasAbout}
                  message={results.hasAbout ? "Detected an About page or narrative link." : "No About page link was found."}
                  suggestion="Include an About page detailing the author, editorial processes, or company vision to prove the site is legitimate."
                />
              </div>
            )}

            {/* Category: Crawlability */}
            {(activeTab === "all" || activeTab === "crawl") && (
              <div style={{ marginTop: activeTab === "all" ? "2.5rem" : 0 }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Globe size={18} color="#b45309" /> Crawler Accessibility & Map Index
                </h3>
                <AuditItem 
                  title="Domain Authority Age" 
                  passed={results.domainAgePassed}
                  message={results.domainAgeMonths >= 6 
                    ? `Domain registration matches age requirements (${results.domainAgeMonths} months).` 
                    : `Domain age of ${results.domainAgeMonths} month(s) may trigger thin-authority policies.`}
                  suggestion="AdSense requires sites in specific regions (like Asia) to be registered for at least 6 months to curb spam domains."
                />
                <AuditItem 
                  title="Robots.txt Standard" 
                  passed={results.hasRobotsTxt}
                  message={results.hasRobotsTxt ? "A robots.txt file exists on the host domain." : "No robots.txt crawler guideline file found."}
                  suggestion="Generate and upload a robots.txt file to your root domain to instruct search crawlers on what to index."
                />
                <AuditItem 
                  title="XML Sitemap Standard" 
                  passed={results.hasSitemapXml}
                  message={results.hasSitemapXml ? "Found sitemap.xml file." : "No sitemap.xml indexing map detected."}
                  suggestion="Create an XML sitemap listing your URLs to help search engines discover and index your pages faster."
                />
                <AuditItem 
                  title="Ads.txt Authorized Sellers" 
                  passed={results.hasAdsTxt}
                  message={results.hasAdsTxt ? "Verified ads.txt is present." : "No ads.txt file detected."}
                  suggestion="Create an ads.txt file. Although not strictly mandatory for approval, it is required immediately post-approval to route ad revenue."
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEO Prose Text */}
      <div className="prose">
        <h2>What makes a website ready for Google AdSense?</h2>
        <p>
          Google AdSense is the largest display advertising network in the world. However, to keep their advertiser network safe, Google maintains incredibly high standards for publisher approvals. If your site has thin content, lacks legal policy pages, or has technical errors, you are highly likely to receive a rejection email stating &quot;Valuable Inventory: No Content&quot; or &quot;Site Behavior: Navigation&quot;.
        </p>

        <h2>Important parameters for a faster AdSense approval</h2>
        <ul>
          <li><strong>Content is King:</strong> You need high-quality, original articles. Aim for at least 30 articles, with each article containing more than 800 to 1,000 words. Replicated, auto-spun, or thin content is rejected instantly.</li>
          <li><strong>Essential Trust Pages:</strong> Google expects user-centric sites. Your navigation header or footer footer MUST link to Privacy Policy, Terms of Service, Contact Us, and About Us pages.</li>
          <li><strong>Site Architecture:</strong> Clean headings structure (one unique H1, with logical H2 and H3 structures) shows that your pages are user-friendly and easy to parse by Google crawlers.</li>
          <li><strong>Crawlability Guidelines:</strong> The presence of <code>robots.txt</code> and <code>sitemap.xml</code> allows search bots to find and index your content effortlessly.</li>
        </ul>
        
        <h2>How our 54-point diagnostic works</h2>
        <p>
          Our checker simulates how Googlebot evaluates site metrics. It crawls the source domain in real-time, analyzing the document structure, response speeds, security header configurations, trust page footprints, and technical metadata. Use the resulting checklist and custom suggestions to build a site that qualifies for the AdSense program quickly.
        </p>
      </div>
    </div>
  );
}
