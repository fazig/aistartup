import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/posts";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | StartupAI Tools Blog`,
    description: post.description,
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

  return (
    <div className="container" style={{ padding: "3rem 1.25rem", maxWidth: "860px" }}>
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
          style={{ width: "100%", height: "auto", display: "block", maxHeight: "450px", objectFit: "cover" }} 
          priority
        />
      </div>

      {/* Post Content */}
      <div className="blog-content-body">
        {parseMarkdownToJSX(post.content)}
      </div>

      {/* Bottom Footer Section */}
      <div style={{ 
        marginTop: "4rem", 
        padding: "2rem", 
        background: "var(--bg-card)", 
        border: "1px solid var(--border-light)", 
        borderRadius: "16px",
        textAlign: "center"
      }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Need web utility tools?</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem", maxWidth: "500px", margin: "0 auto 1.5rem auto" }}>
          Check out our collection of 100% free web utilities including URL shorteners, JSON formatters, QR code decoders, and SEO calculators.
        </p>
        <Link href="/tools" className="btn btn-primary">
          Explore All Tools
        </Link>
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
      jsxElements.push(<h3 key={`h3-${i}`} style={{ fontSize: '1.4rem', marginTop: '1.75rem', marginBottom: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(line.substring(4)) }} />);
      continue;
    }
    if (line.startsWith("## ")) {
      jsxElements.push(<h2 key={`h2-${i}`} style={{ fontSize: '1.85rem', marginTop: '2.5rem', marginBottom: '1.25rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(line.substring(3)) }} />);
      continue;
    }
    if (line.startsWith("# ")) {
      jsxElements.push(<h1 key={`h1-${i}`} style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(line.substring(2)) }} />);
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
