import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/posts";
import { Calendar, User, Clock, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Blog | Web Publishing & SEO Blueprint - StartupAI Tools",
  description: "Read expert articles on SEO, AdSense approvals, technical web performance, and developer utility tools to scale your online audience.",
};

export default function BlogIndex() {
  return (
    <div className="container" style={{ padding: "4rem 1.5rem" }}>
      {/* Blog Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--bg-card)",
          padding: "0.5rem 1.25rem",
          borderRadius: "100px",
          fontSize: "0.9rem",
          marginBottom: "1.5rem",
          border: "1px solid var(--border-light)",
          color: "var(--primary)",
          fontWeight: 600
        }}>
          <BookOpen size={16} /> Publisher Insights & Guides
        </div>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
          StartupAI Tools Blog
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Detailed tutorials, SEO deep-dives, and technical blueprints to help web developers and publishers build high-performance websites.
        </p>
      </div>

      {/* Articles Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2.5rem",
        maxWidth: "1100px",
        margin: "0 auto 4rem auto"
      }}>
        {BLOG_POSTS.map((post) => (
          <article 
            key={post.slug} 
            className="card" 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              padding: 0, 
              overflow: "hidden",
              border: "1px solid var(--border-light)",
              borderRadius: "16px",
              height: "100%"
            }}
          >
            {/* Post Cover Image */}
            <Image 
              src={post.image} 
              alt={post.title} 
              width={400}
              height={200}
              style={{ 
                width: "100%", 
                height: "200px", 
                objectFit: "cover",
                borderBottom: "1px solid var(--border-light)"
              }} 
            />

            {/* Post Details */}
            <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              {/* Category & Read Time */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ 
                  fontSize: "0.75rem", 
                  fontWeight: 700, 
                  color: "var(--primary)", 
                  background: "#eff6ff", 
                  padding: "0.25rem 0.75rem", 
                  borderRadius: "100px",
                  textTransform: "uppercase"
                }}>
                  {post.category}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Clock size={14} /> {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: "1.35rem", marginBottom: "0.75rem", lineHeight: 1.3, fontWeight: 800 }}>
                <Link href={`/blog/${post.slug}`} style={{ color: "var(--text-main)", textDecoration: "none" }}>
                  {post.title}
                </Link>
              </h2>

              {/* Description */}
              <p style={{ color: "var(--text-muted)", fontSize: "0.925rem", marginBottom: "1.5rem", lineBreak: "auto", lineHeight: 1.5 }}>
                {post.description}
              </p>

              {/* Footer Meta */}
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginTop: "auto", 
                paddingTop: "1.25rem", 
                borderTop: "1px solid var(--border-light)" 
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.825rem", color: "var(--text-muted)" }}>
                  <User size={13} />
                  <span>By {post.author}</span>
                </div>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="btn btn-primary" 
                  style={{ 
                    padding: "0.45rem 1rem", 
                    fontSize: "0.825rem", 
                    borderRadius: "8px", 
                    fontWeight: 600,
                    gap: "0.25rem" 
                  }}
                >
                  Read Post <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
