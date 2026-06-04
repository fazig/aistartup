"use client";

import { useState } from "react";
import { Scale, Copy, Check, Download, Sparkles } from "lucide-react";

type FormatMode = "text" | "html" | "markdown";

export default function DisclaimerGenerator() {
  const [company, setCompany] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  
  const [hasAds, setHasAds] = useState(false);
  const [hasAffiliates, setHasAffiliates] = useState(false);
  const [hasProfessional, setHasProfessional] = useState(false);
  const [profType, setProfType] = useState("general"); // medical, legal, financial, general

  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<FormatMode>("text");
  const [copied, setCopied] = useState(false);

  const cleanUrl = url.trim().replace(/\/$/, ""); // strip trailing slash

  const generateDisclaimerText = () => {
    const compName = company.trim() || websiteName.trim() || "Our Company";
    const webName = websiteName.trim() || "Our Website";
    const siteUrl = cleanUrl || "https://example.com";
    const contactEmail = email.trim() || "support@example.com";

    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let disclaimer = `DISCLAIMER

Last updated: ${dateStr}

INTRODUCTION

The information provided by ${compName} ("we", "us", or "our") on ${siteUrl} (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.

UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.

EXTERNAL LINKS DISCLAIMER

The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.

WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.`;

    if (hasProfessional) {
      let adviceSection = "";
      if (profType === "medical") {
        adviceSection = `\n\nPROFESSIONAL DISCLAIMER (MEDICAL)

The Site cannot and does not contain medical/health advice. The medical/health information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of medical/health advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.`;
      } else if (profType === "legal") {
        adviceSection = `\n\nPROFESSIONAL DISCLAIMER (LEGAL)

The Site cannot and does not contain legal advice. The legal information is provided for general informational and educational purposes only and is not a substitute for professional legal advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of legal advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.`;
      } else if (profType === "financial") {
        adviceSection = `\n\nPROFESSIONAL DISCLAIMER (FINANCIAL)

The Site cannot and does not contain financial advice. The financial information is provided for general informational and educational purposes only and is not a substitute for professional financial/investment advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of financial/investment advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.`;
      } else {
        adviceSection = `\n\nPROFESSIONAL DISCLAIMER

The Site cannot and does not contain professional advice. The professional information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.`;
      }
      disclaimer += adviceSection;
    }

    if (hasAffiliates) {
      disclaimer += `\n\nAFFILIATES DISCLAIMER

The Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include but are not limited to Amazon Services LLC Associates Program and others.`;
    }

    if (hasAds) {
      disclaimer += `\n\nTESTIMONIALS & ADVERTISING DISCLAIMER

The Site may contain advertising, sponsored content, or display banners. These advertisements are paid for by third-party advertising networks. The Site may also contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services.`;
    }

    disclaimer += `\n\nCONTACT US

If you have any questions or concerns regarding this disclaimer, please contact us at:
Email: ${contactEmail}`;

    return disclaimer;
  };

  const getHtmlFormat = (text: string) => {
    return text
      .split("\n\n")
      .map((paragraph) => {
        if (paragraph.startsWith("DISCLAIMER") || paragraph.startsWith("INTRODUCTION") || paragraph.includes("DISCLAIMER") || paragraph.startsWith("CONTACT US")) {
          return `<h2>${paragraph.replace(/\n/g, "<br>")}</h2>`;
        }
        return `<p>${paragraph.replace(/\n/g, "<br>")}</p>`;
      })
      .join("\n");
  };

  const getMarkdownFormat = (text: string) => {
    return text
      .split("\n\n")
      .map((paragraph) => {
        if (paragraph.startsWith("DISCLAIMER") || paragraph.startsWith("INTRODUCTION") || paragraph.includes("DISCLAIMER") || paragraph.startsWith("CONTACT US")) {
          return `## ${paragraph}`;
        }
        return paragraph;
      })
      .join("\n\n");
  };

  const handleGenerate = () => {
    const text = generateDisclaimerText();
    if (format === "html") {
      setOutput(getHtmlFormat(text));
    } else if (format === "markdown") {
      setOutput(getMarkdownFormat(text));
    } else {
      setOutput(text);
    }
  };

  const handleFormatChange = (newFormat: FormatMode) => {
    setFormat(newFormat);
    if (output) {
      const text = generateDisclaimerText();
      if (newFormat === "html") {
        setOutput(getHtmlFormat(text));
      } else if (newFormat === "markdown") {
        setOutput(getMarkdownFormat(text));
      } else {
        setOutput(text);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const ext = format === "html" ? "html" : format === "markdown" ? "md" : "txt";
    const mime = format === "html" ? "text/html" : "text/plain";
    const blob = new Blob([output], { type: mime });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `disclaimer.${ext}`;
    a.click();
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Scale color="var(--primary)" /> Disclaimer Generator
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Create a customized, professional disclaimer statement for your blog, application, or website instantly.
        </p>
      </div>

      <div className="grid-2" style={{ gap: "1.5rem", marginBottom: "2rem", alignItems: "start" }}>
        {/* Form panel */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Website Details</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Company Name</label>
              <input
                type="text"
                className="input-field"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Corporation"
              />
            </div>

            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Website / App Name</label>
              <input
                type="text"
                className="input-field"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                placeholder="e.g. Acme Blog"
              />
            </div>

            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Website URL</label>
              <input
                type="url"
                className="input-field"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. https://acme.com"
              />
            </div>

            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>Contact Email</label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. privacy@acme.com"
              />
            </div>

            {/* Custom disclaimers */}
            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>Additional Sections</h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
                  <input
                    type="checkbox"
                    checked={hasAds}
                    onChange={(e) => setHasAds(e.target.checked)}
                    style={{ accentColor: "var(--primary)" }}
                  />
                  Website displays Ads or Testimonials
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
                  <input
                    type="checkbox"
                    checked={hasAffiliates}
                    onChange={(e) => setHasAffiliates(e.target.checked)}
                    style={{ accentColor: "var(--primary)" }}
                  />
                  Website uses Affiliate Links (Amazon, etc.)
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
                  <input
                    type="checkbox"
                    checked={hasProfessional}
                    onChange={(e) => setHasProfessional(e.target.checked)}
                    style={{ accentColor: "var(--primary)" }}
                  />
                  Website provides Professional Advice
                </label>

                {hasProfessional && (
                  <div style={{ paddingLeft: "1.75rem" }}>
                    <label style={{ fontSize: "0.8rem", display: "block", marginBottom: "0.25rem", color: "var(--text-muted)" }}>
                      Type of professional advice:
                    </label>
                    <select
                      className="input-field"
                      value={profType}
                      onChange={(e) => setProfType(e.target.value)}
                      style={{ cursor: "pointer", fontFamily: "inherit" }}
                    >
                      <option value="medical">Medical & Health</option>
                      <option value="legal">Legal & Attorney</option>
                      <option value="financial">Financial & Investment</option>
                      <option value="general">General / Other Professional</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleGenerate} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
              <Sparkles size={16} /> Generate Disclaimer
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="card" style={{ display: "flex", flexDirection: "column", alignSelf: "stretch" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div style={{ display: "flex", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border-light)" }}>
              {(["text", "html", "markdown"] as FormatMode[]).map((f) => (
                <button
                  key={f}
                  onClick={() => handleFormatChange(f)}
                  style={{
                    padding: "0.4rem 0.75rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    background: format === f ? "var(--primary)" : "transparent",
                    color: format === f ? "white" : "var(--text-muted)",
                    transition: "all 0.2s",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-outline" style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }} onClick={handleCopy} disabled={!output}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy"}
              </button>
              <button className="btn btn-outline" style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }} onClick={handleDownload} disabled={!output}>
                <Download size={14} /> Download
              </button>
            </div>
          </div>

          <textarea
            className="input-field"
            value={output}
            readOnly
            placeholder="Click &quot;Generate Disclaimer&quot; to review the legal document..."
            style={{ flex: 1, minHeight: "410px", fontSize: "0.9rem", lineHeight: "1.6", background: "#f8fafc", fontFamily: format !== "text" ? "monospace" : "inherit" }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose">
        <h2>What is a website disclaimer and why do you need one?</h2>
        <p>
          A disclaimer is a legally binding statement designed to limit your liability for the content, external links, ads,
          and suggestions published on your website. Without a disclaimer, visitors could hold you responsible for errors,
          financial losses, or health problems resulting from using or trusting your content.
        </p>
        <p>
          Disclaimers protect your business in several key areas:
        </p>
        <ul>
          <li>
            <strong>Information Accuracy</strong>: Informs visitors that while you write in good faith, you do not warrant
            that the blog posts, tutorials, or guides are error-free or fully up-to-date.
          </li>
          <li>
            <strong>External Links liability</strong>: Clarifies that you are not responsible for the content, safety, or trade terms
            of websites you link to.
          </li>
          <li>
            <strong>Professional Advice limits</strong>: If you blog about exercises, financial charts, or legal rights, this section
            warns users that your articles do not replace consulting a licensed doctor, attorney, or certified financial advisor.
          </li>
          <li>
            <strong>Affiliate disclosures</strong>: Required by agencies like the FTC to disclose that you earn commissions when users buy
            products through your affiliate links.
          </li>
        </ul>

        <h2>Where should you link your disclaimer page?</h2>
        <p>
          Just like your Privacy Policy and Terms and Conditions pages, your disclaimer page should be easily accessible from anywhere
          on your site. The standard place to add it is inside your site&apos;s global footer, alongside other legal policies.
          Additionally, if you publish financial tips, health tips, or product reviews, it is recommended to add a short, visible
          disclaimer banner at the top of those specific posts.
        </p>
      </div>
    </div>
  );
}
