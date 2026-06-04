"use client";

import { useState, useMemo } from "react";
import { Link2, Copy, Check, Zap } from "lucide-react";

interface UTMParams {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

const PRESETS: { name: string; icon: string; params: Partial<UTMParams> }[] = [
  { name: "Google Ads", icon: "🔍", params: { source: "google", medium: "cpc", campaign: "" } },
  { name: "Facebook", icon: "📘", params: { source: "facebook", medium: "social", campaign: "" } },
  { name: "Email", icon: "📧", params: { source: "newsletter", medium: "email", campaign: "" } },
  { name: "Social Media", icon: "📱", params: { source: "instagram", medium: "social", campaign: "" } },
];

export default function UTMBuilder() {
  const [params, setParams] = useState<UTMParams>({
    url: "",
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  });
  const [copied, setCopied] = useState(false);
  const [urlError, setUrlError] = useState("");

  const update = (key: keyof UTMParams, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    if (key === "url") {
      if (value && !value.match(/^https?:\/\//i)) {
        setUrlError("URL must start with http:// or https://");
      } else {
        setUrlError("");
      }
    }
  };

  const generatedURL = useMemo(() => {
    if (!params.url || !params.source || !params.medium || !params.campaign) return "";
    if (!params.url.match(/^https?:\/\//i)) return "";

    const utmParts: string[] = [];
    if (params.source) utmParts.push(`utm_source=${encodeURIComponent(params.source)}`);
    if (params.medium) utmParts.push(`utm_medium=${encodeURIComponent(params.medium)}`);
    if (params.campaign) utmParts.push(`utm_campaign=${encodeURIComponent(params.campaign)}`);
    if (params.term) utmParts.push(`utm_term=${encodeURIComponent(params.term)}`);
    if (params.content) utmParts.push(`utm_content=${encodeURIComponent(params.content)}`);

    const separator = params.url.includes("?") ? "&" : "?";
    return `${params.url}${separator}${utmParts.join("&")}`;
  }, [params]);

  const handleCopy = () => {
    if (!generatedURL) return;
    navigator.clipboard.writeText(generatedURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setParams((prev) => ({
      ...prev,
      source: preset.params.source || "",
      medium: preset.params.medium || "",
      campaign: preset.params.campaign || prev.campaign,
    }));
  };

  const isReady = params.url && params.source && params.medium && params.campaign && !urlError;

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Link2 color="var(--primary)" /> UTM Link Builder
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Build campaign-tracked URLs with UTM parameters. See your link update in real time.
        </p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Presets */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Zap size={18} /> Quick Presets
          </h3>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                className="btn btn-outline"
                style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                onClick={() => applyPreset(preset)}
              >
                {preset.icon} {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Website URL <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                type="url"
                className="input-field"
                placeholder="https://example.com/landing-page"
                value={params.url}
                onChange={(e) => update("url", e.target.value)}
                style={{ fontFamily: "inherit" }}
              />
              {urlError && (
                <p style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.3rem" }}>{urlError}</p>
              )}
            </div>

            <div className="grid-2">
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                  Campaign Source <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  className="input-field"
                  placeholder="e.g. google, newsletter, facebook"
                  value={params.source}
                  onChange={(e) => update("source", e.target.value)}
                  style={{ fontFamily: "inherit" }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                  Campaign Medium <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  className="input-field"
                  placeholder="e.g. cpc, email, social"
                  value={params.medium}
                  onChange={(e) => update("medium", e.target.value)}
                  style={{ fontFamily: "inherit" }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                Campaign Name <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                className="input-field"
                placeholder="e.g. spring_sale, product_launch"
                value={params.campaign}
                onChange={(e) => update("campaign", e.target.value)}
                style={{ fontFamily: "inherit" }}
              />
            </div>

            <div className="grid-2">
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                  Campaign Term <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  className="input-field"
                  placeholder="e.g. running+shoes"
                  value={params.term}
                  onChange={(e) => update("term", e.target.value)}
                  style={{ fontFamily: "inherit" }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
                  Campaign Content <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  className="input-field"
                  placeholder="e.g. header_banner, sidebar_cta"
                  value={params.content}
                  onChange={(e) => update("content", e.target.value)}
                  style={{ fontFamily: "inherit" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="card" style={{ marginBottom: "3rem" }}>
          <h3 style={{ marginBottom: "0.75rem" }}>Generated URL</h3>
          {isReady ? (
            <>
              <div
                style={{
                  padding: "1rem",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  wordBreak: "break-all",
                  marginBottom: "1rem",
                  lineHeight: 1.7,
                }}
              >
                {generatedURL}
              </div>
              <button className="btn btn-primary" onClick={handleCopy} style={{ width: "100%" }}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied to Clipboard!" : "Copy URL"}
              </button>
            </>
          ) : (
            <div
              style={{
                padding: "2rem",
                background: "#f8fafc",
                borderRadius: "8px",
                textAlign: "center",
                color: "var(--text-muted)",
                border: "1px dashed var(--border-light)",
              }}
            >
              Fill in the required fields above to see your UTM link here.
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What are UTM parameters and why should you care?</h2>
        <p>
          If you&apos;ve ever wondered &quot;where are my website visitors actually coming from?&quot;—that&apos;s exactly what
          UTM parameters answer. UTM stands for Urchin Tracking Module (a relic name from the analytics tool Google acquired
          to create Google Analytics). They&apos;re little tags you append to the end of any URL, and when someone clicks that
          tagged link, your analytics platform can tell you the exact source, medium, and campaign that drove the visit.
        </p>
        <p>
          Without UTM parameters, Google Analytics might lump all your traffic into generic buckets like &quot;direct&quot; or
          &quot;referral.&quot; With them, you can see that 342 visitors came from your Tuesday email blast, 89 came from your
          Facebook sidebar ad, and 12 came from that guest blog post you published last week. It turns guesswork into data.
        </p>

        <h2>How to use this UTM builder effectively</h2>
        <p>
          Start by pasting your destination URL—the page you want people to land on. Then fill in the three required fields:
          source (where the traffic is coming from), medium (the marketing channel), and campaign name (what you&apos;re promoting).
          The tool builds your tagged URL in real time as you type. Need to distinguish between two different ad creatives in the
          same campaign? That&apos;s what the optional &quot;content&quot; field is for. Tracking paid keywords? Use the
          &quot;term&quot; field.
        </p>
        <p>
          We&apos;ve included preset templates for the most common scenarios—Google Ads, Facebook, email newsletters, and social
          media—so you can get started with a single click and then customize from there. The generated URL is automatically
          encoded so special characters in your campaign names won&apos;t break anything.
        </p>

        <h2>Best practices for UTM naming conventions</h2>
        <p>
          Consistency is everything. If one person on your team uses &quot;facebook&quot; as a source and another uses &quot;Facebook&quot;
          or &quot;fb,&quot; Google Analytics will treat those as three completely separate sources. Pick a convention—lowercase,
          underscores instead of spaces—and stick with it across your entire organization. Document it in a shared spreadsheet if
          you have to. Your future self analyzing campaign performance three months from now will thank you.
        </p>
        <p>
          Also, never use UTM parameters on internal links within your own website. They override the actual referrer data, so
          clicking a UTM-tagged link from your homepage to your pricing page would make it look like a brand new session from an
          external source. UTM tags are strictly for links that live outside your site—in emails, ads, social posts, partner sites,
          and anywhere else you&apos;re driving traffic from.
        </p>
      </div>
    </div>
  );
}
