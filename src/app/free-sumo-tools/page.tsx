import Link from "next/link";
import { 
  FileText, Image as ImageIcon, Calculator, ArrowLeftRight, Binary, Globe, Code,
  Sparkles
} from "lucide-react";

export const metadata = {
  title: "Free Sumo Tools | 100+ Free Online Web Tools - StartupAI",
  description: "Access 100+ free online tools for text editing, image conversion, calculators, unit converters, and developer utilities. No signup required, works right in your browser.",
};

export default function FreeSumoToolsPage() {
  const categories = [
    {
      id: "text-content",
      title: "Text & Content Tools",
      description: "Everything you need to edit, format, generate, and clean up text — all inside your browser.",
      icon: <FileText size={22} />,
      color: "#10b981",
      bg: "#ecfdf5",
      tools: [
        { name: "Text to Slug", path: "/tools/text-to-slug", live: true },
        { name: "Lorem Ipsum Generator", path: "/tools/lorem-ipsum-generator", live: true },
        { name: "Case Converter", path: "/tools/case-converter", live: true },
        { name: "Word Counter", path: "/tools/word-counter", live: true },
        { name: "Remove Line Breaks", path: "/tools/remove-line-breaks", live: true },
        { name: "Random Word Generator", path: "/tools/random-word-generator", live: true },
        { name: "Privacy Policy Generator", path: "/tools/privacy-policy-generator", live: true },
        { name: "Terms & Conditions Generator", path: "/tools/terms-conditions-generator", live: true },
        { name: "Disclaimer Generator", path: "/tools/disclaimer-generator", live: true },
        { name: "Text Repeater", path: "/tools/text-repeater", live: true },
        { name: "Text Sorter", path: "/tools/text-sorter", live: true },
        { name: "Comma Separator", path: "/tools/comma-separator", live: true },
        { name: "Article Rewriter", path: "/tools/article-rewriter", live: true },
        { name: "Emojis Remover", path: "/tools/emojis-remover", live: true },
      ]
    },
    {
      id: "image-editing",
      title: "Image Editing Tools",
      description: "Convert formats, resize images, encode to Base64, and handle favicons — no Photoshop needed.",
      icon: <ImageIcon size={22} />,
      color: "#8b5cf6",
      bg: "#f5f3ff",
      tools: [
        { name: "Image to Base64", path: "/tools/image-to-base64", live: true },
        { name: "Base64 to Image", path: "/tools/base64-to-image", live: true },
        { name: "EXIF Data Viewer", path: "/tools/exif-data-viewer", live: true },
        { name: "Image Placeholder Generator", path: "/tools/image-placeholder-generator", live: true },
        { name: "ICO to PNG", path: "/tools/ico-to-png", live: true },
        { name: "ICO Converter", path: "/tools/ico-converter", live: true },
        { name: "Flip Image", path: "/tools/flip-image", live: true },
        { name: "Rotate Image", path: "/tools/rotate-image", live: true },
        { name: "Image Enlarger", path: "/tools/image-enlarger", live: true },
        { name: "Image Cropper", path: "/tools/image-cropper", live: true },
        { name: "Image Resizer", path: "/tools/image-resizer", live: true },
        { name: "Image Converter", path: "/tools/image-converter", live: true },
        { name: "JPG to PNG", path: "/tools/jpg-to-png", live: true },
        { name: "PNG to JPG", path: "/tools/png-to-jpg", live: true },
        { name: "WebP to JPG", path: "/tools/webp-to-jpg", live: true },
        { name: "PNG to WebP", path: "/tools/png-to-webp", live: true },
        { name: "JPG to WebP", path: "/tools/jpg-to-webp", live: true },
      ]
    },
    {
      id: "calculators",
      title: "Online Calculators",
      description: "Quick math, finance, fitness, and business calculators that give you answers in seconds.",
      icon: <Calculator size={22} />,
      color: "#f59e0b",
      bg: "#fffbeb",
      tools: [
        { name: "Age Calculator", path: "/tools/age-calculator", live: true },
        { name: "Percentage Calculator", path: "/tools/percentage-calculator", live: true },
        { name: "Discount Calculator", path: "/tools/discount-calculator", live: true },
        { name: "Sales Tax Calculator", path: "/tools/sales-tax-calculator", live: true },
        { name: "Loan Calculator", path: "/tools/loan-calculator", live: true },
        { name: "PayPal Fee Calculator", path: "/tools/paypal-fee-calculator", live: true },
        { name: "Average Calculator", path: "/tools/average-calculator", live: true },
        { name: "Confidence Interval Calculator", path: "/tools/confidence-interval-calculator", live: true },
        { name: "Margin Calculator", path: "/tools/margin-calculator", live: true },
        { name: "Probability Calculator", path: "/tools/probability-calculator", live: true },
        { name: "CPM Calculator", path: "/tools/cpm-calculator", live: true },
        { name: "GST Calculator", path: "/tools/gst-calculator", live: true },
        { name: "Days Calculator", path: "/tools/days-calculator", live: true },
        { name: "Hours Calculator", path: "/tools/hours-calculator", live: true },
        { name: "Stripe Fee Calculator", path: "/tools/stripe-fee-calculator", live: true },
        { name: "Calorie Calculator", path: "/tools/calorie-calculator", live: true },
        { name: "TDEE Calculator", path: "/tools/tdee-calculator", live: true },
      ]
    },
    {
      id: "unit-converters",
      title: "Unit Converter Tools",
      description: "Instantly convert between length, weight, temperature, speed, volume, and more.",
      icon: <ArrowLeftRight size={22} />,
      color: "#06b6d4",
      bg: "#ecfeff",
      tools: [
        { name: "Length Converter", path: "/tools/length-converter", live: true },
        { name: "Area Converter", path: "/tools/area-converter", live: true },
        { name: "Weight Converter", path: "/tools/weight-converter", live: true },
        { name: "Volume Converter", path: "/tools/volume-converter", live: true },
        { name: "Temperature Converter", path: "/tools/temperature-converter", live: true },
        { name: "Time Converter", path: "/tools/time-converter", live: true },
        { name: "Speed Converter", path: "/tools/speed-converter", live: true },
        { name: "Digital Storage Converter", path: "/tools/digital-storage-converter", live: true },
        { name: "Pressure Converter", path: "/tools/pressure-converter", live: true },
        { name: "Power Converter", path: "/tools/power-converter", live: true },
        { name: "Voltage Converter", path: "/tools/voltage-converter", live: true },
        { name: "Current Converter", path: "/tools/current-converter", live: true },
        { name: "Pace Converter", path: "/tools/pace-converter", live: true },
      ]
    },
    {
      id: "binary-converters",
      title: "Binary & Number Converters",
      description: "Convert between binary, decimal, hex, octal, ASCII, and text in every direction you need.",
      icon: <Binary size={22} />,
      color: "#ec4899",
      bg: "#fdf2f8",
      tools: [
        { name: "Text to Binary", path: "/tools/text-to-binary", live: true },
        { name: "Binary to Text", path: "/tools/binary-to-text", live: true },
        { name: "Decimal to Binary", path: "/tools/decimal-to-binary", live: true },
        { name: "Binary to Decimal", path: "/tools/binary-to-decimal", live: true },
        { name: "Text to ASCII", path: "/tools/text-to-ascii", live: true },
        { name: "ASCII to Text", path: "/tools/ascii-to-text", live: true },
        { name: "HEX to Decimal", path: "/tools/hex-to-decimal", live: true },
        { name: "Decimal to HEX", path: "/tools/decimal-to-hex", live: true },
        { name: "Octal to Binary", path: "/tools/octal-to-binary", live: true },
        { name: "Binary to Octal", path: "/tools/binary-to-octal", live: true },
        { name: "Text to HEX", path: "/tools/text-to-hex", live: true },
        { name: "HEX to Text", path: "/tools/hex-to-text", live: true },
        { name: "Text to Decimal", path: "/tools/text-to-decimal", live: true },
        { name: "Decimal to Text", path: "/tools/decimal-to-text", live: true },
      ]
    },
    {
      id: "website-management",
      title: "Website Management Tools",
      description: "Encode, decode, beautify, minify, and manage everything web — from URLs to QR codes to HTML.",
      icon: <Globe size={22} />,
      color: "#3b82f6",
      bg: "#eff6ff",
      tools: [
        { name: "URL Encoder / Decoder", path: "/tools/url-encoder", live: true },
        { name: "QR Code Generator", path: "/tools/qr-generator", live: true },
        { name: "URL Shortener", path: "/tools/url-shortener", live: true },
        { name: "Robots.txt Generator", path: "/tools/robots-txt-generator", live: true },
        { name: "XML Sitemap Generator", path: "/tools/xml-sitemap-generator", live: true },
        { name: "Htaccess Redirect Generator", path: "/tools/htaccess-generator", live: true },
        { name: "UUID Generator", path: "/tools/uuid-generator", live: true },
        { name: "UTM Builder", path: "/tools/utm-builder", live: true },
        { name: "Schema Markup Generator", path: "/tools/schema-generator", live: true },
        { name: "Meta Tag Generator", path: "/tools/meta-tag-generator", live: true },
        { name: "Meta Title Generator", path: "/tools/meta-title-generator", live: true },
        { name: "Meta Description Generator", path: "/tools/meta-description-generator", live: true },
        { name: "HTML Beautifier", path: "#", live: false },
        { name: "HTML Minifier", path: "/tools/html-minifier", live: true },
        { name: "CSS Beautifier", path: "#", live: false },
        { name: "CSS Minifier", path: "#", live: false },
        { name: "JavaScript Beautifier", path: "#", live: false },
        { name: "JavaScript Minifier", path: "#", live: false },
        { name: "QR Code Decoder", path: "/tools/qr-decoder", live: true },
        { name: "URL Parser", path: "/tools/url-parser", live: true },
      ]
    },
    {
      id: "developer-tools",
      title: "Developer & Utility Tools",
      description: "JSON tools, hash generators, IP lookups, color pickers, and everything a developer reaches for daily.",
      icon: <Code size={22} />,
      color: "#ef4444",
      bg: "#fef2f2",
      tools: [
        { name: "JSON Formatter & Validator", path: "/tools/json-formatter", live: true },
        { name: "MD5 Hash Generator", path: "/tools/md5-generator", live: true },
        { name: "Password Generator", path: "/tools/password-generator", live: true },
        { name: "Color Picker", path: "/tools/color-picker", live: true },
        { name: "RGB to HEX", path: "/tools/rgb-to-hex", live: true },
        { name: "HEX to RGB", path: "/tools/hex-to-rgb", live: true },
        { name: "My IP Address", path: "/tools/my-ip", live: true },
        { name: "What is My Browser", path: "/tools/what-is-my-browser", live: true },
        { name: "Code to Text Ratio", path: "/tools/code-to-text-ratio", live: true },
        { name: "Open All URLs", path: "/tools/open-all-urls", live: true },
        { name: "WHOIS Checker", path: "/tools/whois-checker", live: true },
        { name: "DNS Records Lookup", path: "/tools/dns-records", live: true },
        { name: "Server Status Checker", path: "/tools/server-status-checker", live: true },
        { name: "Get Source Code", path: "/tools/get-source-code", live: true },
        { name: "Link Analyzer", path: "/tools/link-analyzer", live: true },
        { name: "Domain into IP", path: "/tools/domain-into-ip", live: true },
        { name: "YouTube Thumbnail Downloader", path: "/tools/youtube-thumbnail", live: true },
        { name: "YouTube Keywords Extractor", path: "/tools/youtube-keywords-extractor", live: true },
      ]
    }
  ];

  const totalLive = categories.reduce((acc, cat) => acc + cat.tools.filter(t => t.live).length, 0);
  const totalTools = categories.reduce((acc, cat) => acc + cat.tools.length, 0);

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "5rem 0 4rem 0",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)",
          pointerEvents: "none"
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
            padding: "0.5rem 1.25rem", borderRadius: "100px", fontSize: "0.9rem",
            marginBottom: "1.5rem", border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <Sparkles size={16} /> {totalLive} Tools Live &bull; {totalTools} Total
          </div>
          <h1 style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "1.25rem",
            lineHeight: 1.1
          }}>
            Free Sumo Tools
          </h1>
          <p style={{
            fontSize: "1.2rem",
            maxWidth: "650px",
            margin: "0 auto 2.5rem auto",
            opacity: 0.9,
            lineHeight: 1.6
          }}>
            A collection of {totalTools}+ free online utilities for developers, content creators, SEO pros, and everyday internet users. No accounts, no limits, no nonsense.
          </p>

          {/* Quick Jump Nav */}
          <div style={{
            display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center"
          }}>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                style={{
                  padding: "0.5rem 1rem",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                {cat.icon}
                {cat.title.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" style={{ padding: "3rem 0 5rem 0" }}>
        <div className="container">
          {categories.map((cat, catIdx) => {
            const liveCount = cat.tools.filter(t => t.live).length;
            return (
              <div key={cat.id} id={cat.id} style={{ marginBottom: catIdx < categories.length - 1 ? "3.5rem" : 0 }}>
                {/* Category Header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                  flexWrap: "wrap"
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "12px",
                    background: cat.bg, color: cat.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {cat.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: "1.5rem", margin: 0, letterSpacing: "-0.02em" }}>
                      {cat.title}
                    </h2>
                  </div>
                  <span style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    padding: "0.3rem 0.75rem",
                    borderRadius: "100px",
                    background: cat.bg,
                    color: cat.color
                  }}>
                    {liveCount} / {cat.tools.length} live
                  </span>
                </div>
                <p style={{
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                  marginBottom: "1.5rem",
                  paddingLeft: "3.5rem"
                }}>
                  {cat.description}
                </p>

                {/* Tools Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "0.75rem"
                }}>
                  {cat.tools.map((tool, toolIdx) => (
                    tool.live ? (
                      <Link
                        key={toolIdx}
                        href={tool.path}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.85rem 1rem",
                          borderRadius: "10px",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-light)",
                          textDecoration: "none",
                          color: "var(--text-main)",
                          transition: "all 0.2s ease",
                          fontWeight: 500,
                          fontSize: "0.9rem"
                        }}
                      >
                        <span>{tool.name}</span>
                        <span style={{
                          fontSize: "0.7rem",
                          padding: "0.15rem 0.5rem",
                          background: cat.color,
                          color: "white",
                          borderRadius: "100px",
                          fontWeight: 700,
                          letterSpacing: "0.03em",
                          flexShrink: 0
                        }}>
                          LIVE
                        </span>
                      </Link>
                    ) : (
                      <div
                        key={toolIdx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.85rem 1rem",
                          borderRadius: "10px",
                          background: "var(--bg-main)",
                          border: "1px dashed var(--border-light)",
                          color: "var(--text-muted)",
                          fontSize: "0.9rem",
                          opacity: 0.7
                        }}
                      >
                        <span>{tool.name}</span>
                        <span style={{
                          fontSize: "0.65rem",
                          color: "#94a3b8",
                          fontWeight: 600
                        }}>
                          SOON
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEO Content */}
      <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border-light)", padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="prose">
            <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Why We Built Free Sumo Tools</h2>
            <p style={{ lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Here is the thing — most "free" online tool websites are basically ad farms with a search bar duct-taped on. You click on a tool, wait through three pop-ups, and then find out it only works if you sign up for a $19/month subscription. We have all been there, and honestly, it is annoying.
            </p>
            <p style={{ lineHeight: 1.7, marginBottom: "1.25rem" }}>
              We built this page as a single hub where you can find every tool you would ever need for web development, content creation, number crunching, and general internet stuff. No accounts to create, no hidden limits, no "upgrade to pro" bait-and-switch. You open the tool, use it, and move on with your day.
            </p>

            <h2 style={{ fontSize: "1.75rem", marginTop: "2.5rem", marginBottom: "1.25rem" }}>What Kind of Tools Are Here?</h2>
            <p style={{ lineHeight: 1.7, marginBottom: "1.25rem" }}>
              We have organized everything into clear categories so you can quickly jump to what you need. If you are a <strong>content writer</strong>, the Text & Content section has word counters, case converters, lorem ipsum generators, and text cleaners. If you are a <strong>developer</strong>, you will find JSON formatters, hash generators, code beautifiers, and encoding tools. And if you are an <strong>SEO professional</strong>, we have meta tag generators, schema markup builders, keyword density checkers, and more.
            </p>
            <p style={{ lineHeight: 1.7, marginBottom: "1.25rem" }}>
              The calculators section covers everything from simple percentages and discounts to loan EMI calculations, PayPal fee breakdowns, and sales tax computations. The unit converters handle length, weight, temperature, speed, digital storage, and pretty much any measurement you need to translate.
            </p>

            <h2 style={{ fontSize: "1.75rem", marginTop: "2.5rem", marginBottom: "1.25rem" }}>How the Tools Work</h2>
            <p style={{ lineHeight: 1.7 }}>
              Almost every tool on this page runs entirely inside your web browser. Your data never leaves your device — we do not upload it, store it, or send it to any server. This matters because a lot of competing sites actually process your files on their backend, which means your private text or images pass through someone else's server. That is not the case here. The few tools that do require network access (like WHOIS lookups or DNS checks) use secure, privacy-respecting API calls, and we do not log any of it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
