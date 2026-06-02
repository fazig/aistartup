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
        { name: "Article Rewriter", path: "#", status: "planned" },
        { name: "Plagiarism Checker", path: "#", status: "planned" },
        { name: "Word Counter", path: "/tools/word-counter", status: "live" },
        { name: "Keyword Density Checker", path: "#", status: "planned" },
        { name: "Emojis Remover", path: "/tools/emojis-remover", status: "live" },
      ]
    },
    {
      title: "SEO & Keyword Tools",
      icon: <Search size={20} color="var(--primary)" />,
      tools: [
        { name: "Meta Tag Generator", path: "#", status: "planned" },
        { name: "Meta Tags Analyzer", path: "#", status: "planned" },
        { name: "Keyword Position Checker", path: "#", status: "planned" },
        { name: "Keyword CPC Calculator", path: "#", status: "planned" },
        { name: "Keywords Suggestion Tool", path: "#", status: "planned" },
        { name: "AI SEO Meta Title Generator", path: "#", status: "planned" },
        { name: "AI SEO Meta Description Generator", path: "#", status: "planned" },
        { name: "AI Keyword Cluster Ideas", path: "#", status: "planned" },
      ]
    },
    {
      title: "Link & Domain Tools",
      icon: <LinkIcon size={20} color="var(--primary)" />,
      tools: [
        { name: "Backlink Maker", path: "#", status: "planned" },
        { name: "Backlink Checker", path: "#", status: "planned" },
        { name: "Link Analyzer", path: "#", status: "planned" },
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
        { name: "Robots.txt Generator", path: "#", status: "planned" },
        { name: "XML Sitemap Generator", path: "#", status: "planned" },
        { name: "Google Pagespeed Insights", path: "#", status: "planned" },
        { name: "Page Speed Checker", path: "#", status: "planned" },
        { name: "Google Malware Checker", path: "#", status: "planned" },
        { name: "Whois Checker", path: "#", status: "planned" },
        { name: "Domain into IP", path: "#", status: "planned" },
        { name: "Class C Ip Checker", path: "#", status: "planned" },
        { name: "Find DNS records", path: "#", status: "planned" },
        { name: "Htaccess Redirect Generator", path: "#", status: "planned" },
        { name: "Server Status Checker", path: "#", status: "planned" },
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
        { name: "My IP Address", path: "#", status: "planned" },
        { name: "URL Rewriting Tool", path: "#", status: "planned" },
        { name: "www Redirect Checker", path: "#", status: "planned" },
        { name: "URL Encoder / Decoder", path: "/tools/url-encoder", status: "live" },
        { name: "Bulk GEO IP Locator", path: "#", status: "planned" },
        { name: "Color Picker Tool", path: "/tools/color-picker", status: "live" },
        { name: "RGB to Hex", path: "/tools/rgb-to-hex", status: "live" },
        { name: "HEX to RGB", path: "#", status: "planned" },
        { name: "Online Md5 Generator", path: "/tools/md5-generator", status: "live" },
        { name: "Code to Text Ratio Checker", path: "#", status: "planned" },
        { name: "What is my Browser", path: "#", status: "planned" },
        { name: "Email Privacy", path: "#", status: "planned" },
        { name: "Open All URLs", path: "#", status: "planned" },
      ]
    },
    {
      title: "Generators & Media Tools",
      icon: <ImageIcon size={20} color="var(--primary)" />,
      tools: [
        { name: "QR Code Generator", path: "/tools/qr-generator", status: "live" },
        { name: "Privacy Policy Generator", path: "#", status: "planned" },
        { name: "Terms & Conditions Generator", path: "#", status: "planned" },
        { name: "QR Code Decoder", path: "#", status: "planned" },
        { name: "Image Placeholder Generator", path: "#", status: "planned" },
        { name: "YouTube Keywords Extractor", path: "#", status: "planned" },
        { name: "YouTube Thumbnail Downloader", path: "#", status: "planned" },
        { name: "EXIF Data Viewer", path: "#", status: "planned" },
        { name: "EXIF Data Remover", path: "#", status: "planned" },
        { name: "Bank to IFSC Code", path: "#", status: "planned" },
        { name: "IFSC Code to Bank Details", path: "#", status: "planned" },
        { name: "UPI QR Code Generator", path: "#", status: "planned" },
        { name: "Webpage Screen Resolution Simulator", path: "#", status: "planned" },
        { name: "Page Size Checker", path: "#", status: "planned" },
        { name: "Website Screenshot Generator", path: "#", status: "planned" },
        { name: "Get Source Code of Webpage", path: "#", status: "planned" },
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
