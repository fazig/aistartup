import type { Metadata } from "next";
import Link from "next/link";
import { 
  FileText, Search, Link as LinkIcon, Settings, Code, Image as ImageIcon,
  Calculator, Sparkles, ArrowLeftRight, Binary, Keyboard, Activity
} from "lucide-react";
import ToolsDirectoryClient, { ToolCategory } from "./ToolsDirectoryClient";

export const metadata: Metadata = {
  title: "Web Utilities Directory - All Free Tools",
  description: "Browse our complete list of free developer utilities, SEO calculators, unit converters, and text editing tools. All processed safely in-browser.",
};

export default function ToolsDirectory() {
  const categories = [
    {
      title: "Live Markets",
      icon: <Activity size={20} color="var(--primary)" />,
      tools: [
        { name: "TradingFEST", path: "/tools/live-trading", status: "new" },
      ]
    },
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
        { name: "Canva-Style Resume Builder", path: "/tools/resume-builder", status: "new" },
        { name: "llms.txt & AI Bot Generator", path: "/tools/llms-txt-generator", status: "new" },
        { name: "ZenNote AI (Daily Organizer)", path: "/tools/ai-copilot", status: "live" },
        { name: "AI SEO Meta Title Generator", path: "/tools/meta-title-generator", status: "live" },
        { name: "AI SEO Meta Description Generator", path: "/tools/meta-description-generator", status: "live" },
      ]
    },
    {
      title: "Text & Content Tools",
      icon: <FileText size={20} color="var(--primary)" />,
      tools: [
        { name: "Professional Resume Builder", path: "/tools/resume-builder", status: "new" },
        { name: "Free Grammar Checker", path: "/tools/grammar-checker", status: "live" },
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
        { name: "Remove Background", path: "/remove-background", status: "new" },
        { name: "JPG to PNG", path: "/tools/jpg-to-png", status: "live" },
        { name: "PNG to JPG", path: "/tools/png-to-jpg", status: "live" },
        { name: "WebP to JPG", path: "/tools/webp-to-jpg", status: "live" },
        { name: "PNG to WebP", path: "/tools/png-to-webp", status: "live" },
        { name: "JPG to WebP", path: "/tools/jpg-to-webp", status: "live" },
      ]
    }
  ];

  const totalLive = categories.reduce((acc, cat) => acc + cat.tools.filter(t => t.status === "live" || t.status === "new").length, 0);

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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

      <ToolsDirectoryClient categories={categories as ToolCategory[]} totalLive={totalLive} />

      {/* Editorial & SEO Depth Section */}
      <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-light)', paddingTop: '4rem', maxWidth: '900px', marginInline: 'auto' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
          Why Use StartupAI Free Web Utilities?
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          StartupAI Tools provides a curated collection of over 100 browser-native utilities engineered specifically for software developers, SEO professionals, digital marketers, designers, and students. Unlike traditional websites that clutter your screen with intrusive pop-up ads, mandatory account registrations, and weekly subscription paywalls, every single utility in our directory is 100% free forever with no limits on usage.
        </p>

        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2.5rem', marginBottom: '1rem' }}>
          100% Client-Side Processing: Zero Data Retention Guarantee
        </h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1.5rem' }}>
          Your digital privacy is our top engineering priority. More than 90% of our tools—including our <Link href="/tools/json-formatter" style={{ color: 'var(--primary)', fontWeight: 600 }}>JSON Formatter</Link>, <Link href="/tools/image-resizer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Image Resizer</Link>, <Link href="/tools/image-cropper" style={{ color: 'var(--primary)', fontWeight: 600 }}>Image Cropper</Link>, <Link href="/tools/grammar-checker" style={{ color: 'var(--primary)', fontWeight: 600 }}>Free Grammar Checker</Link>, and <Link href="/resume-builder" style={{ color: 'var(--primary)', fontWeight: 600 }}>ResumeCraft AI Studio</Link>—execute 100% locally within your device browser using modern WebAssembly, JavaScript, and HTML5 Canvas APIs. Your sensitive JSON files, personal photos, resumes, and text documents are never transmitted over the internet to remote servers, safeguarding you against data leaks and unauthorized telemetry.
        </p>

        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2.5rem', marginBottom: '1rem' }}>
          Four Essential Tool Pillars
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>🔍 Search Engine & Webmaster</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Audit your web pages before applying for Google AdSense with our <Link href="/tools/adsense-eligibility-checker" style={{ color: 'var(--primary)' }}>AdSense Eligibility Checker</Link>, configure AI crawler manifests with our <Link href="/tools/llms-txt-generator" style={{ color: 'var(--primary)' }}>llms.txt Generator</Link>, and create sitemaps and meta tags effortlessly.
            </p>
          </div>
          <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>🖼️ Image & Vector Graphics</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Crop photos to standard social media aspect ratios, upscale blurry portraits with <Link href="/tools/image-enhancer" style={{ color: 'var(--primary)' }}>Image Enhancer HD</Link>, extract EXIF camera metadata, or convert between JPG, PNG, and WebP for optimal page speed.
            </p>
          </div>
          <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>✍️ Content & Copywriting</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Draft error-free articles with our Grammar Checker, paraphrase complex sentences using the <Link href="/tools/article-rewriter" style={{ color: 'var(--primary)' }}>Article Rewriter</Link>, and build ATS-friendly resumes with instant vector PDF export on <Link href="/resume-builder" style={{ color: 'var(--primary)' }}>ResumeCraft AI Studio</Link>.
            </p>
          </div>
          <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>⚙️ Code & Data Conversion</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Format, beautify, and minify HTML, CSS, and JavaScript. Convert binary, octal, decimal, and hexadecimal notations, and generate cryptographic MD5 or UUID hashes in milliseconds.
            </p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2.5rem', marginBottom: '1rem' }}>
          Frequently Asked Questions (FAQ)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <details style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
            <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-main)' }}>Are all tools on this website really free?</summary>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Yes, unconditionally. There are no paid tiers, hidden subscriptions, or usage quotas. You can use every converter, formatter, scanner, and generator as many times as you need without providing payment details or credit cards.
            </p>
          </details>
          <details style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
            <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-main)' }}>Do I need to create an account or sign up?</summary>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
              No. None of our utility tools require you to create an account, log in, or verify an email address. You can bookmark the pages and access all features immediately upon landing.
            </p>
          </details>
          <details style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
            <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-main)' }}>Can I use these tools on mobile devices and tablets?</summary>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Yes. All StartupAI tools are responsive and mobile-optimized, allowing you to crop photos, format code, shorten URLs, and calculate formulas seamlessly across iPhone, Android, iPad, and desktop viewports.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
