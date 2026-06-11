import type { Metadata } from "next";
import Link from "next/link";
import { 
  FileText, Search, Link as LinkIcon, Settings, Code, Image as ImageIcon,
  Calculator, Sparkles, ArrowLeftRight, Binary, Keyboard
} from "lucide-react";

export const metadata: Metadata = {
  title: "Web Utilities Directory - All Free Tools | StartupAI Tools",
  description: "Browse our complete list of free developer utilities, SEO calculators, unit converters, and text editing tools. All processed safely in-browser.",
};

export default function ToolsDirectory() {
  const categories = [
    {
      title: "Games & Speed Tests",
      icon: <Keyboard size={20} color="var(--primary)" />,
      tools: [
        { name: "Professional Typing Test", path: "/tools/typing-test", status: "live" },
      ]
    },
    {
      title: "AI & Agent Tools",
      icon: <Sparkles size={20} color="var(--primary)" />,
      tools: [
        { name: "ZenNote AI (Daily Organizer)", path: "/tools/ai-copilot", status: "live" },
        { name: "AI SEO Meta Title Generator", path: "/tools/meta-title-generator", status: "live" },
        { name: "AI SEO Meta Description Generator", path: "/tools/meta-description-generator", status: "live" },
      ]
    },
    {
      title: "Text & Content Tools",
      icon: <FileText size={20} color="var(--primary)" />,
      tools: [
        { name: "Grammarly Free", path: "/tools/grammarly-free", status: "live" },
        { name: "Article Rewriter", path: "/tools/article-rewriter", status: "live" },
        { name: "Plagiarism Checker", path: "/tools/plagiarism-checker", status: "live" },
        { name: "Word Counter", path: "/tools/word-counter", status: "live" },
        { name: "Emojis Remover", path: "/tools/emojis-remover", status: "live" },
        { name: "Lorem Ipsum Generator", path: "/tools/lorem-ipsum-generator", status: "live" },
        { name: "Case Converter", path: "/tools/case-converter", status: "live" },
        { name: "Remove Line Breaks", path: "/tools/remove-line-breaks", status: "live" },
        { name: "Text Repeater", path: "/tools/text-repeater", status: "live" },
        { name: "Text Sorter", path: "/tools/text-sorter", status: "live" },
        { name: "Comma Separator", path: "/tools/comma-separator", status: "live" },
        { name: "Random Word Generator", path: "/tools/random-word-generator", status: "live" },
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
      title: "Calculators & Finance Tools",
      icon: <Calculator size={20} color="var(--primary)" />,
      tools: [
        { name: "Age Calculator", path: "/tools/age-calculator", status: "live" },
        { name: "Percentage Calculator", path: "/tools/percentage-calculator", status: "live" },
        { name: "Discount Calculator", path: "/tools/discount-calculator", status: "live" },
        { name: "Sales Tax Calculator", path: "/tools/sales-tax-calculator", status: "live" },
        { name: "Loan Calculator", path: "/tools/loan-calculator", status: "live" },
        { name: "PayPal Fee Calculator", path: "/tools/paypal-fee-calculator", status: "live" },
        { name: "Average Calculator", path: "/tools/average-calculator", status: "live" },
        { name: "Confidence Interval Calculator", path: "/tools/confidence-interval-calculator", status: "live" },
        { name: "Margin Calculator", path: "/tools/margin-calculator", status: "live" },
        { name: "GST Calculator", path: "/tools/gst-calculator", status: "live" },
        { name: "CPM Calculator", path: "/tools/cpm-calculator", status: "live" },
        { name: "Probability Calculator", path: "/tools/probability-calculator", status: "live" },
        { name: "Days Calculator", path: "/tools/days-calculator", status: "live" },
        { name: "Hours Calculator", path: "/tools/hours-calculator", status: "live" },
        { name: "Stripe Fee Calculator", path: "/tools/stripe-fee-calculator", status: "live" },
        { name: "Calorie Calculator", path: "/tools/calorie-calculator", status: "live" },
        { name: "TDEE Calculator", path: "/tools/tdee-calculator", status: "live" },
      ]
    },
    {
      title: "Unit Converter Tools",
      icon: <ArrowLeftRight size={20} color="var(--primary)" />,
      tools: [
        { name: "Length Converter", path: "/tools/length-converter", status: "live" },
        { name: "Weight Converter", path: "/tools/weight-converter", status: "live" },
        { name: "Temperature Converter", path: "/tools/temperature-converter", status: "live" },
        { name: "Time Converter", path: "/tools/time-converter", status: "live" },
        { name: "Speed Converter", path: "/tools/speed-converter", status: "live" },
        { name: "Digital Storage Converter", path: "/tools/digital-storage-converter", status: "live" },
        { name: "Area Converter", path: "/tools/area-converter", status: "live" },
        { name: "Volume Converter", path: "/tools/volume-converter", status: "live" },
        { name: "Pressure Converter", path: "/tools/pressure-converter", status: "live" },
        { name: "Power Converter", path: "/tools/power-converter", status: "live" },
        { name: "Voltage Converter", path: "/tools/voltage-converter", status: "live" },
        { name: "Current Converter", path: "/tools/current-converter", status: "live" },
        { name: "Pace Converter", path: "/tools/pace-converter", status: "live" },
      ]
    },
    {
      title: "Binary & Number Converters",
      icon: <Binary size={20} color="var(--primary)" />,
      tools: [
        { name: "Text to Binary", path: "/tools/text-to-binary", status: "live" },
        { name: "Binary to Text", path: "/tools/binary-to-text", status: "live" },
        { name: "Decimal to Binary", path: "/tools/decimal-to-binary", status: "live" },
        { name: "Binary to Decimal", path: "/tools/binary-to-decimal", status: "live" },
        { name: "Text to ASCII", path: "/tools/text-to-ascii", status: "live" },
        { name: "ASCII to Text", path: "/tools/ascii-to-text", status: "live" },
        { name: "Text to HEX", path: "/tools/text-to-hex", status: "live" },
        { name: "HEX to Text", path: "/tools/hex-to-text", status: "live" },
        { name: "HEX to Decimal", path: "/tools/hex-to-decimal", status: "live" },
        { name: "Decimal to HEX", path: "/tools/decimal-to-hex", status: "live" },
        { name: "Octal to Binary", path: "/tools/octal-to-binary", status: "live" },
        { name: "Binary to Octal", path: "/tools/binary-to-octal", status: "live" },
        { name: "Text to Decimal", path: "/tools/text-to-decimal", status: "live" },
        { name: "Decimal to Text", path: "/tools/decimal-to-text", status: "live" },
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
        { name: "UTM Builder", path: "/tools/utm-builder", status: "live" },
        { name: "HTML Minifier", path: "/tools/html-minifier", status: "live" },
        { name: "HTML Beautifier", path: "/tools/html-beautifier", status: "live" },
        { name: "CSS Beautifier", path: "/tools/css-beautifier", status: "live" },
        { name: "CSS Minifier", path: "/tools/css-minifier", status: "live" },
        { name: "JavaScript Beautifier", path: "/tools/javascript-beautifier", status: "live" },
        { name: "JavaScript Minifier", path: "/tools/javascript-minifier", status: "live" },
        { name: "URL Parser", path: "/tools/url-parser", status: "live" },
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
        { name: "UUID Generator", path: "/tools/uuid-generator", status: "live" },
      ]
    },
    {
      title: "Generators & Media Tools",
      icon: <ImageIcon size={20} color="var(--primary)" />,
      tools: [
        { name: "QR Code Generator", path: "/tools/qr-generator", status: "live" },
        { name: "Privacy Policy Generator", path: "/tools/privacy-policy-generator", status: "live" },
        { name: "Terms & Conditions Generator", path: "/tools/terms-conditions-generator", status: "live" },
        { name: "Disclaimer Generator", path: "/tools/disclaimer-generator", status: "live" },
        { name: "QR Code Decoder", path: "/tools/qr-decoder", status: "live" },
        { name: "Image Placeholder Generator", path: "/tools/image-placeholder-generator", status: "live" },
        { name: "YouTube Keywords Extractor", path: "/tools/youtube-keywords-extractor", status: "live" },
        { name: "YouTube Thumbnail Downloader", status: "live", path: "/tools/youtube-thumbnail" },
        { name: "EXIF Data Viewer", path: "/tools/exif-data-viewer", status: "live" },
        { name: "EXIF Data Remover", path: "#", status: "planned" },
        { name: "Bank to IFSC Code", path: "#", status: "planned" },
        { name: "IFSC Code to Bank Details", path: "#", status: "planned" },
        { name: "UPI QR Code Generator", path: "#", status: "planned" },
        { name: "Webpage Screen Resolution Simulator", path: "/tools/screen-resolution-simulator", status: "live" },
        { name: "Page Size Checker", path: "/tools/page-size-checker", status: "live" },
        { name: "Website Screenshot Generator", path: "#", status: "planned" },
        { name: "Get Source Code of Webpage", path: "/tools/get-source-code", status: "live" },
        { name: "Flip Image", path: "/tools/flip-image", status: "live" },
        { name: "Rotate Image", path: "/tools/rotate-image", status: "live" },
        { name: "Image Resizer", path: "/tools/image-resizer", status: "live" },
        { name: "Image Cropper", path: "/tools/image-cropper", status: "live" },
        { name: "Image Converter", path: "/tools/image-converter", status: "live" },
        { name: "ICO to PNG", path: "/tools/ico-to-png", status: "live" },
        { name: "ICO Converter", path: "/tools/ico-converter", status: "live" },
        { name: "Image Enlarger", path: "/tools/image-enlarger", status: "live" },
        { name: "JPG to PNG", path: "/tools/jpg-to-png", status: "live" },
        { name: "PNG to JPG", path: "/tools/png-to-jpg", status: "live" },
        { name: "WebP to JPG", path: "/tools/webp-to-jpg", status: "live" },
        { name: "PNG to WebP", path: "/tools/png-to-webp", status: "live" },
        { name: "JPG to WebP", path: "/tools/jpg-to-webp", status: "live" },
      ]
    }
  ];

  const totalLive = categories.reduce((acc, cat) => acc + cat.tools.filter(t => t.status === "live").length, 0);

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "var(--bg-card)",
          padding: "0.5rem 1.25rem", borderRadius: "100px", fontSize: "0.9rem",
          marginBottom: "1.5rem", border: "1px solid var(--border-light)",
          color: "var(--primary)", fontWeight: 600
        }}>
          <Sparkles size={16} /> {totalLive} Free Web Tools Available
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          All Web Tools Directory
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Browse our complete collection of free utility tools for developers, SEO professionals, and content creators.
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
