import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS, BLOG_METADATA } from "@/data/posts";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export async function generateStaticParams() {
  return BLOG_METADATA.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_METADATA.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | StartupAI Tools Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image || "/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | StartupAI Tools Blog`,
      description: post.description,
      images: [post.image || "/og-image.jpg"],
    },
  };
}

function getRelatedTool(post: { slug: string; category?: string; title?: string }) {
  const combined = `${post.slug} ${post.category || ''} ${post.title || ''}`.toLowerCase();
  
  if (combined.includes("adsense") || combined.includes("monetiz") || combined.includes("approval")) {
    return {
      title: "Scan Your Website for AdSense Approval",
      desc: "Run our free 2026 AdSense Eligibility Checker to diagnose content depth, policy pages, HTTPS, and crawlability before applying.",
      link: "/tools/adsense-eligibility-checker",
      btnText: "Run Free AdSense Audit →",
      badge: "Flagship Utility"
    };
  }
  if (combined.includes("resume") || combined.includes("cv") || combined.includes("job") || combined.includes("career") || combined.includes("vibe code") || combined.includes("codex")) {
    return {
      title: "Build an ATS-Friendly Resume in 5 Minutes",
      desc: "Use ResumeCraft AI Studio with 10 designer archetypes, live ATS score analyzer, and instant vector PDF export with zero watermarks.",
      link: "/resume-builder",
      btnText: "Launch Resume Studio →",
      badge: "Free SaaS App"
    };
  }
  if (combined.includes("qr") || combined.includes("barcode")) {
    return {
      title: "Generate Custom High-Resolution QR Codes",
      desc: "Create free, scannable QR codes for websites, WiFi networks, and plain text with instant PNG/SVG download.",
      link: "/tools/qr-generator",
      btnText: "Generate QR Code →",
      badge: "Fast & Free"
    };
  }
  if (combined.includes("image") || combined.includes("photo") || combined.includes("remini") || combined.includes("face")) {
    return {
      title: "Upscale & Enhance Photos to Full HD",
      desc: "Restore blurry pictures, enhance resolution, or remove backgrounds safely in your browser with zero upload to external servers.",
      link: "/tools/image-enhancer",
      btnText: "Try Image Enhancer HD →",
      badge: "Edge AI Tool"
    };
  }
  if (combined.includes("grammar") || combined.includes("write") || combined.includes("word") || combined.includes("article") || combined.includes("show notes")) {
    return {
      title: "Analyze Text & Polish Readability",
      desc: "Check syntax, fix spelling mistakes, compute word counts, and optimize readability in seconds.",
      link: "/tools/grammar-checker",
      btnText: "Check Grammar Free →",
      badge: "Writer Toolkit"
    };
  }
  return {
    title: "Access 100+ Free Browser Web Utilities",
    desc: "From JSON formatters and URL shorteners to live currency markets, enjoy fast developer tools with zero registration.",
    link: "/tools",
    btnText: "Explore 100+ Tools →",
    badge: "StartupAI Tools"
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedTool = getRelatedTool(post);

  return (
    <div className="container" style={{ padding: "3rem 1.25rem", maxWidth: "860px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            image: post.image ? `https://www.aitoolspro.tech${post.image}` : "https://www.aitoolspro.tech/og-image.jpg",
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: post.author || "Faizan Arif"
            },
            publisher: {
              "@type": "Organization",
              name: "StartupAI Tools",
              logo: {
                "@type": "ImageObject",
                url: "https://www.aitoolspro.tech/og-image.jpg"
              }
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.aitoolspro.tech/blog/${post.slug}`
            }
          })
        }}
      />
      {/* Back Button */}
      <Link
        href="/blog"
        className="btn btn-outline"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
          fontSize: "0.85rem",
          padding: "0.5rem 1.25rem",
        }}
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      {/* Post Metadata Header */}
      <div style={{ marginBottom: "2rem" }}>
        <span style={{ 
          fontSize: "0.8rem", 
          fontWeight: 700, 
          color: "var(--primary)", 
          background: "#eff6ff", 
          padding: "0.3rem 0.85rem", 
          borderRadius: "100px",
          textTransform: "uppercase",
          display: "inline-block",
          marginBottom: "1rem"
        }}>
          {post.category}
        </span>
        
        <h1 style={{ 
          fontSize: "clamp(2rem, 4.5vw, 2.75rem)", 
          fontWeight: 900, 
          letterSpacing: "-0.03em", 
          lineHeight: 1.2, 
          marginBottom: "1.25rem" 
        }}>
          {post.title}
        </h1>

        <div style={{ 
          display: "flex", 
          gap: "1.5rem", 
          alignItems: "center", 
          flexWrap: "wrap", 
          color: "var(--text-muted)", 
          fontSize: "0.9rem",
          borderBottom: "1px solid var(--border-light)",
          paddingBottom: "1.5rem"
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <User size={16} /> By {post.author}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <Calendar size={16} /> {post.date}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <Clock size={16} /> {post.readTime}
          </span>
        </div>
      </div>

      {/* Post Cover Image */}
      <div style={{ 
        borderRadius: "16px", 
        overflow: "hidden", 
        marginBottom: "2.5rem", 
        border: "1px solid var(--border-light)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.03)"
      }}>
        <Image 
          src={post.image} 
          alt={post.title} 
          width={800}
          height={450}
          sizes="(max-width: 860px) 100vw, 860px"
          style={{ width: "100%", height: "auto", display: "block", maxHeight: "450px", objectFit: "cover" }} 
          priority
        />
      </div>

      {/* Post Content */}
      <div className="blog-content-body">
        {parseMarkdownToJSX(post.content)}
      </div>

      {/* Dynamic Context-Aware Tool Recommendation CTA */}
      <div style={{ 
        marginTop: "3.5rem", 
        padding: "2.25rem", 
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", 
        border: "1px solid #334155", 
        borderRadius: "18px",
        color: "#ffffff",
        boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.2)"
      }}>
        <div style={{ display: "inline-block", background: "rgba(37, 99, 235, 0.2)", border: "1px solid rgba(37, 99, 235, 0.4)", padding: "0.25rem 0.75rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700, color: "#60a5fa", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          {relatedTool.badge}
        </div>
        <h3 style={{ fontSize: "1.45rem", marginBottom: "0.65rem", color: "#ffffff", fontWeight: 800 }}>
          {relatedTool.title}
        </h3>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem", maxWidth: "680px" }}>
          {relatedTool.desc}
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link 
            href={relatedTool.link} 
            className="btn btn-primary"
            style={{ padding: "0.75rem 1.5rem", fontSize: "0.95rem", fontWeight: 700 }}
          >
            {relatedTool.btnText}
          </Link>
          <Link 
            href="/tools" 
            style={{ color: "#94a3b8", fontSize: "0.9rem", textDecoration: "underline", marginLeft: "0.5rem" }}
          >
            Or browse all 100+ free tools →
          </Link>
        </div>
      </div>
    </div>
  );
}

// Lightweight custom Markdown-to-JSX compiler
function parseMarkdownToJSX(content: string) {
  const lines = content.split("\n");
  const jsxElements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLang = "";
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Code block check
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        jsxElements.push(
          <pre key={`code-${i}`} style={{ 
            background: '#0f172a', 
            color: '#f8fafc',
            padding: '1.25rem', 
            borderRadius: '10px', 
            border: '1px solid #334155', 
            overflowX: 'auto', 
            fontFamily: 'monospace', 
            fontSize: '0.9rem', 
            marginBottom: '1.5rem',
            lineHeight: 1.5
          }}>
            <code className={codeLang}>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
      } else {
        inCodeBlock = true;
        codeLang = line.replace("```", "").trim();
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // List item check
    if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
      inList = true;
      listItems.push(line.trim().substring(2));
      continue;
    } else if (inList && (line.trim() === "" || i === lines.length - 1)) {
      inList = false;
      jsxElements.push(
        <ul key={`list-${i}`} style={{ 
          marginLeft: '1.75rem', 
          marginBottom: '1.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.6rem', 
          color: '#334155',
          fontSize: '1.05rem',
          lineHeight: 1.7
        }}>
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item) }} />
          ))}
        </ul>
      );
      listItems = [];
      if (line.trim() === "") continue;
    }

    // Image check: e.g. ![Alt Text](/path/to/image.webp)
    if (line.trim().startsWith("![")) {
      const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const alt = match[1];
        const src = match[2];
        jsxElements.push(
          <div key={`img-${i}`} style={{ 
            borderRadius: '12px', 
            overflow: 'hidden', 
            margin: '2.5rem auto', 
            border: '1px solid var(--border-light)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            maxWidth: '100%'
          }}>
            <Image src={src} alt={alt} width={800} height={450} style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '420px', objectFit: 'cover' }} />
            <div style={{ padding: '0.6rem 1rem', background: '#f8fafc', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', textAlign: 'center', fontWeight: 500 }}>
              {alt}
            </div>
          </div>
        );
        continue;
      }
    }

    // Headers
    if (line.startsWith("### ")) {
      jsxElements.push(<h4 key={`h4-${i}`} style={{ fontSize: '1.4rem', marginTop: '1.75rem', marginBottom: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(line.substring(4)) }} />);
      continue;
    }
    if (line.startsWith("## ")) {
      jsxElements.push(<h3 key={`h3-${i}`} style={{ fontSize: '1.85rem', marginTop: '2.5rem', marginBottom: '1.25rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(line.substring(3)) }} />);
      continue;
    }
    if (line.startsWith("# ")) {
      jsxElements.push(<h2 key={`h2-${i}`} style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(line.substring(2)) }} />);
      continue;
    }
    
    // Table parser
    if (line.startsWith("|")) {
      const tableRows: string[][] = [];
      let nextLine = lines[i];
      while (nextLine && nextLine.startsWith("|")) {
        if (!nextLine.includes("---")) {
          const cells = nextLine.split("|").map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
          tableRows.push(cells);
        }
        i++;
        nextLine = lines[i];
      }
      i--; 

      if (tableRows.length > 0) {
        const headers = tableRows[0];
        const dataRows = tableRows.slice(1);
        jsxElements.push(
          <div key={`table-${i}`} style={{ overflowX: 'auto', marginBottom: '2rem', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.925rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-light)' }}>
                  {headers.map((h, idx) => (
                    <th key={idx} style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 700, borderBottom: '1px solid var(--border-light)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: rIdx < dataRows.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '0.85rem 1rem', color: '#334155' }} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(cell) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      jsxElements.push(<hr key={`hr-${i}`} style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '2.5rem 0' }} />);
      continue;
    }

    // Paragraph
    if (line.trim() !== "") {
      jsxElements.push(<p key={`p-${i}`} style={{ marginBottom: '1.5rem', color: '#334155', lineHeight: 1.75, fontSize: '1.075rem' }} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(line) }} />);
    }
  }

  return jsxElements;
}

// Inline formatting parser
function parseInlineMarkdown(text: string): string {
  let html = text;
  
  // HTML escaping
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
  // Inline code `code`
  html = html.replace(/`(.*?)`/g, "<code style='background: #f1f5f9; padding: 0.15rem 0.35rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; color: #0f172a; border: 1px solid var(--border-light);'>$1</code>");
  
  // Links [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' target='_blank' rel='noopener noreferrer' style='color: var(--primary); font-weight: 700; text-decoration: underline;'>$1</a>");
  
  return html;
}
