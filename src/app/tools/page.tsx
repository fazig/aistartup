import Link from "next/link";
import { 
  FileText, Search, Link as LinkIcon, Settings, Code, Image as ImageIcon, Shield, Database 
} from "lucide-react";

export default function ToolsDirectory() {
  const categories = [
    {
      title: "Text & Content Tools",
      icon: <FileText size={20} color="var(--primary)" />,
      tools: [
        { name: "Article Rewriter", path: "/tools/article-rewriter", status: "live" },
        { name: "Plagiarism Checker", path: "/tools/plagiarism-checker", status: "live" },
        { name: "Word Counter", path: "/tools/word-counter", status: "live" },
        { name: "Keyword Density Checker", path: "#", status: "planned" },
        { name: "Emojis Remover", path: "/tools/emojis-remover", status: "live" },
      ]
    },
    {
      title: "SEO & Keyword Tools",
      icon: <Search size={20} color="var(--primary)" />,
      tools: [
        { name: "Meta Tag Generator", path: "/tools/meta-tag-generator", status: "live" },
        { name: "Schema Markup Generator", path: "/tools/schema-generator", status: "live" },
        { name: "Meta Tags Analyzer", path: "#", status: "planned" },
        { name: "Keyword Position Checker", path: "#", status: "planned" },
        { name: "Keyword Density Checker", path: "/tools/keyword-density-checker", status: "live" },
        { name: "Keyword CPC Calculator", path: "#", status: "planned" },
        { name: "Keywords Suggestion Tool", path: "#", status: "planned" },
        { name: "AI SEO Meta Title Generator", path: "/tools/meta-title-generator", status: "live" },
        { name: "AI SEO Meta Description Generator", path: "/tools/meta-description-generator", status: "live" },
        { name: "AI Keyword Cluster Ideas", path: "#", status: "planned" },
      ]
    },
    {
      title: "Link & Domain Tools",
      icon: <LinkIcon size={20} color="var(--primary)" />,
      tools: [
        { name: "Base64 to Image", path: "/tools/base64-to-image", status: "live" },
        { name: "Image to Base64", path: "/tools/image-to-base64", status: "live" },
        { name: "Text to Slug", path: "/tools/text-to-slug", status: "live" },
        { name: "Password Generator", path: "/tools/password-generator", status: "live" },
        { name: "Backlink Maker", path: "#", status: "planned" },
        { name: "Backlink Checker", path: "#", status: "planned" },
        { name: "Link Analyzer", path: "/tools/link-analyzer", status: "live" },
        { name: "Link Price Calculator", path: "#", status: "planned" },
        { name: "Broken Links Finder", path: "#", status: "planned" },
        { name: "Website Links Count Checker", path: "#", status: "planned" },
        { name: "Domain Age Checker", path: "#", status: "planned" },
        { name: "Domain Authority Checker", path: "#", status: "planned" },
        { name: "Page Authority Checker", path: "#", status: "planned" },
        { name: "Suspicious Domain Checker", path: "#", status: "planned" },
        { name: "Domain Hosting Checker", path: "#", status: "planned" },
        { name: "Mozrank Checker", path: "#", status: "planned" },
      ]
    },
    {
      title: "Web Management Tools",
      icon: <Settings size={20} color="var(--primary)" />,
      tools: [
        { name: "AdSense Eligibility Checker", path: "/tools/adsense-eligibility-checker", status: "live" },
        { name: "URL Shortener", path: "/tools/url-shortener", status: "live" },
        { name: "Robots.txt Generator", path: "/tools/robots-txt-generator", status: "live" },
        { name: "XML Sitemap Generator", path: "/tools/xml-sitemap-generator", status: "live" },
        { name: "Google Pagespeed Insights", path: "#", status: "planned" },
        { name: "Page Speed Checker", path: "#", status: "planned" },
        { name: "Google Malware Checker", path: "#", status: "planned" },
        { name: "Whois Checker", path: "/tools/whois-checker", status: "live" },
        { name: "Domain into IP", path: "/tools/domain-into-ip", status: "live" },
        { name: "Class C Ip Checker", path: "/tools/class-c-ip-checker", status: "live" },
        { name: "Find DNS records", path: "/tools/dns-records", status: "live" },
        { name: "Htaccess Redirect Generator", path: "/tools/htaccess-generator", status: "live" },
        { name: "Server Status Checker", path: "/tools/server-status-checker", status: "live" },
        { name: "Online Ping Website Tool", path: "#", status: "planned" },
        { name: "Google Index Checker", path: "#", status: "planned" },
        { name: "Google Cache Checker", path: "#", status: "planned" },
        { name: "Search Engine Spider Simulator", path: "#", status: "planned" },
      ]
    },
    {
      title: "Developer & Utility Tools",
      icon: <Code size={20} color="var(--primary)" />,
      tools: [
        { name: "JSON Formatter & Validator", path: "/tools/json-formatter", status: "live" },
        { name: "My IP Address", path: "/tools/my-ip", status: "live" },
        { name: "URL Rewriting Tool", path: "/tools/url-rewriting-tool", status: "live" },
        { name: "www Redirect Checker", path: "/tools/www-redirect-checker", status: "live" },
        { name: "URL Encoder / Decoder", path: "/tools/url-encoder", status: "live" },
        { name: "Bulk GEO IP Locator", path: "#", status: "planned" },
        { name: "Color Picker Tool", path: "/tools/color-picker", status: "live" },
        { name: "RGB to Hex", path: "/tools/rgb-to-hex", status: "live" },
        { name: "HEX to RGB", path: "/tools/hex-to-rgb", status: "live" },
        { name: "Online Md5 Generator", path: "/tools/md5-generator", status: "live" },
        { name: "Code to Text Ratio Checker", path: "/tools/code-to-text-ratio", status: "live" },
        { name: "What is my Browser", path: "/tools/what-is-my-browser", status: "live" },
        { name: "Email Privacy", path: "#", status: "planned" },
        { name: "Open All URLs", path: "/tools/open-all-urls", status: "live" },
      ]
    },
    {
      title: "Generators & Media Tools",
      icon: <ImageIcon size={20} color="var(--primary)" />,
      tools: [
        { name: "QR Code Generator", path: "/tools/qr-generator", status: "live" },
        { name: "Privacy Policy Generator", path: "/tools/privacy-policy-generator", status: "live" },
        { name: "Terms & Conditions Generator", path: "/tools/terms-conditions-generator", status: "live" },
        { name: "QR Code Decoder", path: "#", status: "planned" },
        { name: "Image Placeholder Generator", path: "/tools/image-placeholder-generator", status: "live" },
        { name: "YouTube Keywords Extractor", path: "/tools/youtube-keywords-extractor", status: "live" },
        { name: "YouTube Thumbnail Downloader", path: "/tools/youtube-thumbnail", status: "live" },
        { name: "EXIF Data Viewer", path: "/tools/exif-data-viewer", status: "live" },
        { name: "EXIF Data Remover", path: "#", status: "planned" },
        { name: "Bank to IFSC Code", path: "#", status: "planned" },
        { name: "IFSC Code to Bank Details", path: "#", status: "planned" },
        { name: "UPI QR Code Generator", path: "#", status: "planned" },
        { name: "Webpage Screen Resolution Simulator", path: "/tools/screen-resolution-simulator", status: "live" },
        { name: "Page Size Checker", path: "/tools/page-size-checker", status: "live" },
        { name: "Website Screenshot Generator", path: "#", status: "planned" },
        { name: "Get Source Code of Webpage", path: "/tools/get-source-code", status: "live" },
      ]
    }
  ];

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          All Web Tools Directory
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Browse our complete collection of 70+ free utility tools for developers, SEO professionals, and content creators.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {categories.map((cat, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
              {cat.icon} {cat.title}
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {cat.tools.map((tool, j) => (
                <li key={j}>
                  {tool.status === "live" ? (
                    <Link href={tool.path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', borderRadius: '6px', background: '#eff6ff' }}>
                      <span style={{ fontWeight: 500 }}>{tool.name}</span>
                      <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'var(--primary)', color: 'white', borderRadius: '12px', fontWeight: 600 }}>LIVE</span>
                    </Link>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', borderRadius: '6px', color: 'var(--text-muted)' }}>
                      <span>{tool.name}</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Coming Soon</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
