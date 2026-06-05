"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Link2, Copy, Check, Plus, Trash2, ArrowLeft, RotateCcw, AlertCircle, HelpCircle
} from "lucide-react";

export default function URLParser() {
  const [rawInput, setRawInput] = useState("https://example.com:8080/search?q=startup+ai&category=developer#results");
  const [protocol, setProtocol] = useState("https:");
  const [hostname, setHostname] = useState("example.com");
  const [port, setPort] = useState("8080");
  const [pathname, setPathname] = useState("/search");
  const [queryParams, setQueryParams] = useState<Array<{ id: string; key: string; value: string }>>([
    { id: "1", key: "q", value: "startup ai" },
    { id: "2", key: "category", value: "developer" }
  ]);
  const [hash, setHash] = useState("#results");
  const [isValid, setIsValid] = useState(true);
  const [copied, setCopied] = useState(false);

  // Parse initial or loaded raw URL on mount
  useEffect(() => {
    handleRawInputChange(rawInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reconstruct = (
    proto: string,
    host: string,
    p: string,
    path: string,
    params: Array<{ key: string; value: string }>,
    h: string
  ) => {
    try {
      let urlProto = proto.trim();
      if (urlProto && !urlProto.endsWith(":")) {
        urlProto += ":";
      }
      if (!urlProto) {
        urlProto = "https:";
      }

      let authority = host.trim() || "example.com";
      const cleanedPort = p.trim();
      if (cleanedPort) {
        authority += ":" + cleanedPort;
      }

      let pathPart = path.trim();
      if (pathPart && !pathPart.startsWith("/")) {
        pathPart = "/" + pathPart;
      }

      let urlString = `${urlProto}//${authority}${pathPart}`;

      // Search params
      const searchParams = new URLSearchParams();
      params.forEach(param => {
        if (param.key.trim()) {
          searchParams.append(param.key.trim(), param.value);
        }
      });

      const searchString = searchParams.toString();
      if (searchString) {
        urlString += "?" + searchString;
      }

      let hashPart = h.trim();
      if (hashPart) {
        if (!hashPart.startsWith("#")) {
          hashPart = "#" + hashPart;
        }
        urlString += hashPart;
      }

      return urlString;
    } catch (err) {
      console.error(err);
      return "";
    }
  };

  const handleRawInputChange = (val: string) => {
    setRawInput(val);
    if (!val.trim()) {
      setIsValid(false);
      return;
    }

    try {
      let parseTarget = val.trim();
      // Prepend protocol if missing for URL parser compatibility
      if (!/^https?:\/\//i.test(parseTarget) && !/^mailto:/i.test(parseTarget) && !/^ftp:/i.test(parseTarget)) {
        parseTarget = "https://" + parseTarget;
      }

      const urlObj = new URL(parseTarget);
      setProtocol(urlObj.protocol);
      setHostname(urlObj.hostname);
      setPort(urlObj.port);
      setPathname(urlObj.pathname);
      setHash(urlObj.hash);

      const params: Array<{ id: string; key: string; value: string }> = [];
      urlObj.searchParams.forEach((value, key) => {
        params.push({
          id: Math.random().toString(36).substring(2, 9),
          key,
          value
        });
      });
      setQueryParams(params);
      setIsValid(true);
    } catch (err) {
      setIsValid(false);
    }
  };

  // Component updaters that sync to reconstructed raw input
  const updateProtocol = (val: string) => {
    setProtocol(val);
    const newUrl = reconstruct(val, hostname, port, pathname, queryParams, hash);
    setRawInput(newUrl);
    setIsValid(true);
  };

  const updateHostname = (val: string) => {
    setHostname(val);
    const newUrl = reconstruct(protocol, val, port, pathname, queryParams, hash);
    setRawInput(newUrl);
    setIsValid(true);
  };

  const updatePort = (val: string) => {
    setPort(val);
    const newUrl = reconstruct(protocol, hostname, val, pathname, queryParams, hash);
    setRawInput(newUrl);
    setIsValid(true);
  };

  const updatePathname = (val: string) => {
    setPathname(val);
    const newUrl = reconstruct(protocol, hostname, port, val, queryParams, hash);
    setRawInput(newUrl);
    setIsValid(true);
  };

  const updateHash = (val: string) => {
    setHash(val);
    const newUrl = reconstruct(protocol, hostname, port, pathname, queryParams, val);
    setRawInput(newUrl);
    setIsValid(true);
  };

  const addQueryParam = () => {
    const newParam = { id: Math.random().toString(36).substring(2, 9), key: "", value: "" };
    const updated = [...queryParams, newParam];
    setQueryParams(updated);
    const newUrl = reconstruct(protocol, hostname, port, pathname, updated, hash);
    setRawInput(newUrl);
    setIsValid(true);
  };

  const deleteQueryParam = (id: string) => {
    const updated = queryParams.filter(p => p.id !== id);
    setQueryParams(updated);
    const newUrl = reconstruct(protocol, hostname, port, pathname, updated, hash);
    setRawInput(newUrl);
    setIsValid(true);
  };

  const updateQueryParamField = (id: string, field: "key" | "value", val: string) => {
    const updated = queryParams.map(p => {
      if (p.id === id) {
        return { ...p, [field]: val };
      }
      return p;
    });
    setQueryParams(updated);
    const newUrl = reconstruct(protocol, hostname, port, pathname, updated, hash);
    setRawInput(newUrl);
    setIsValid(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rawInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    const defaultUrl = "https://example.com:8080/search?q=startup+ai&category=developer#results";
    setRawInput(defaultUrl);
    handleRawInputChange(defaultUrl);
  };

  const loadExample = (url: string) => {
    setRawInput(url);
    handleRawInputChange(url);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      {/* Back Button */}
      <div style={{ marginBottom: "1.5rem" }}>
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
      </div>

      {/* Hero Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", fontSize: "2rem" }}>
          <Link2 size={36} color="var(--primary)" /> URL Parser & Builder
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: "800px" }}>
          Break down any complex URL into its constituent parts instantly. Edit search queries, hostname, port, or path values, and watch the reconstructed URL update live.
        </p>
      </div>

      {/* Workspace Wrapper */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "4rem" }}>
        
        {/* Top Card: Raw URL Input & Reconstruction */}
        <div className="card" style={{ padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-main)" }}>Enter / Reconstructed URL</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }} onClick={handleReset}>
                <RotateCcw size={14} /> Reset
              </button>
              <button 
                className="btn btn-primary" 
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }} 
                onClick={handleCopy}
                disabled={!rawInput}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy URL"}
              </button>
            </div>
          </div>

          <textarea
            className="input-field"
            style={{
              width: "100%",
              minHeight: "80px",
              fontFamily: "monospace",
              fontSize: "1rem",
              padding: "1rem",
              background: isValid ? "#f8fafc" : "#fff1f2",
              borderColor: isValid ? "var(--border-strong)" : "#f43f5e",
              color: "var(--text-main)",
              marginBottom: "1rem",
              resize: "vertical"
            }}
            placeholder="Paste your URL here (e.g. https://domain.com/path?query=val)"
            value={rawInput}
            onChange={(e) => handleRawInputChange(e.target.value)}
          />

          {!isValid && (
            <div style={{
              padding: "0.75rem 1rem",
              background: "#fff1f2",
              color: "#e11d48",
              borderRadius: "8px",
              fontSize: "0.875rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem"
            }}>
              <AlertCircle size={16} />
              <span>Wait, that doesn't look like a fully valid URL. We're showing the best guess.</span>
            </div>
          )}

          {/* Quick Preset Examples */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Load Example:</span>
            <button className="btn btn-outline" style={{ padding: "0.25rem 0.6rem", fontSize: "0.8rem", height: "auto" }} onClick={() => loadExample("https://www.google.com/search?q=nextjs+development&hl=en&gl=us#top")}>
              Google Search
            </button>
            <button className="btn btn-outline" style={{ padding: "0.25rem 0.6rem", fontSize: "0.8rem", height: "auto" }} onClick={() => loadExample("https://api.github.com:443/repos/vercel/next.js/issues?state=open&per_page=10")}>
              GitHub API endpoint
            </button>
            <button className="btn btn-outline" style={{ padding: "0.25rem 0.6rem", fontSize: "0.8rem", height: "auto" }} onClick={() => loadExample("https://www.amazon.com/dp/B08N5WRWNW?tag=myassociates-20&ref_=nav_em_hd_re_0_1_1_3")}>
              Amazon Product Link
            </button>
          </div>
        </div>

        {/* Bottom Card: URL Component Editor */}
        <div className="card" style={{ padding: "2rem" }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.75rem" }}>
            URL Components
          </h3>

          {/* Grid for standard URL fields */}
          <div className="grid-3" style={{ marginBottom: "2rem", gap: "1.5rem" }}>
            <div>
              <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Protocol
              </label>
              <select 
                className="input-field" 
                value={protocol} 
                onChange={(e) => updateProtocol(e.target.value)}
                style={{ height: "42px" }}
              >
                <option value="https:">https://</option>
                <option value="http:">http://</option>
                <option value="ftp:">ftp://</option>
                <option value="mailto:">mailto:</option>
              </select>
            </div>

            <div>
              <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Hostname
              </label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. domain.com"
                value={hostname} 
                onChange={(e) => updateHostname(e.target.value)}
                style={{ height: "42px" }}
              />
            </div>

            <div>
              <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Port
              </label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. 8080 (optional)"
                value={port} 
                onChange={(e) => updatePort(e.target.value)}
                style={{ height: "42px" }}
              />
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: "2.5rem", gap: "1.5rem" }}>
            <div>
              <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Pathname
              </label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. /category/products"
                value={pathname} 
                onChange={(e) => updatePathname(e.target.value)}
                style={{ height: "42px" }}
              />
            </div>

            <div>
              <label className="input-label" style={{ fontWeight: 600, display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Hash / Anchor
              </label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. #details"
                value={hash} 
                onChange={(e) => updateHash(e.target.value)}
                style={{ height: "42px" }}
              />
            </div>
          </div>

          {/* Section: Query Parameters */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h4 style={{ fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Query Parameters ({queryParams.length})
              </h4>
              <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem", gap: "0.3rem" }} onClick={addQueryParam}>
                <Plus size={14} /> Add Parameter
              </button>
            </div>

            {queryParams.length === 0 ? (
              <div style={{
                background: "#f8fafc",
                borderRadius: "8px",
                border: "1px dashed var(--border-strong)",
                padding: "2rem 1rem",
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: "0.9rem"
              }}>
                No search parameters found in this URL. Click the button above to add one.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {queryParams.map((param) => (
                  <div key={param.id} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Parameter Key (e.g. ref)" 
                        value={param.key} 
                        onChange={(e) => updateQueryParamField(param.id, "key", e.target.value)}
                        style={{ height: "42px" }}
                      />
                    </div>
                    <div style={{ flex: 2 }}>
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Parameter Value" 
                        value={param.value} 
                        onChange={(e) => updateQueryParamField(param.id, "value", e.target.value)}
                        style={{ height: "42px" }}
                      />
                    </div>
                    <button 
                      className="btn" 
                      onClick={() => deleteQueryParam(param.id)}
                      style={{
                        padding: "0.5rem",
                        color: "#ef4444",
                        background: "transparent",
                        border: "1px solid #fecaca",
                        borderRadius: "8px",
                        cursor: "pointer",
                        height: "42px",
                        width: "42px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      title="Delete Parameter"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* SEO / Educational Content */}
      <div className="prose" style={{ marginTop: "4rem" }}>
        <h2>Understanding the Structure of a URL</h2>
        <p>
          URLs (Uniform Resource Locators) are the addresses we use to find websites, files, and APIs across the web. While a URL looks like a single string of text, your browser has to parse it into distinct segments to know exactly where to direct your request. These segments consist of the **protocol** (usually HTTP or HTTPS, which details how data is sent), the **hostname** or domain name (identifying the target server), the **port** (a specific channel on the host, defaulting to 80 for HTTP or 443 for HTTPS if not declared), the **pathname** (the relative folder path to the resource), and any optional queries or anchors.
        </p>

        <h2>What are Query Parameters and How Do They Work?</h2>
        <p>
          Query parameters are the key-value pairs that follow the question mark (<code>?</code>) in a URL. They are separated from one another by ampersands (<code>&amp;</code>). Web programmers use these parameters to pass information to the server—like search queries, filtering specifications, user tracking IDs (UTM parameters), or pagination details. For example, in <code>?q=hello&amp;page=2</code>, the key `q` has the value `hello`, and the key `page` has the value `2`. This URL Parser lists these pairs in a clean editable grid, automatically URL-encoding any special characters behind the scenes to make sure the final string stays compliant with RFC guidelines.
        </p>

        <h2>The Difference Between Hostname, Domain, and Port</h2>
        <p>
          It is easy to mix up terminology when dissecting web addresses. The **hostname** is the exact computer name that hosts the service (e.g., <code>api.github.com</code> or <code>www.amazon.com</code>). The **domain name** is the registered base name (like <code>github.com</code> or <code>amazon.com</code>). The **port** is a numeric identifier that tells the operating system which service should handle the incoming traffic. Most of the time, browsers hide the port because they default to the secure port 443. However, if you are a developer testing local servers, you will frequently see hostnames like <code>localhost:3000</code> or <code>127.0.0.1:8080</code>.
        </p>

        <h2>What is the Hash or Anchor Tag?</h2>
        <p>
          The **hash** (or anchor, starting with <code>#</code>) is an interesting piece of the URL because the browser never actually sends it to the web server. It is kept purely on the client-side. Historically, developers used hashes to tell the browser to jump directly to a specific heading or section ID on the page. In modern frontend frameworks like React or Next.js, hashes are also frequently utilized for client-side routing, tab states, or storing data that should remain local without triggering page refreshes.
        </p>
      </div>
    </div>
  );
}
