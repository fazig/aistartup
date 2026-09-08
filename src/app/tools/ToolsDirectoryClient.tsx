"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export interface ToolItem {
  name: string;
  path: string;
  status: "live" | "new" | "planned";
}

export interface ToolCategory {
  title: string;
  icon: React.ReactNode;
  tools: ToolItem[];
}

interface ToolsDirectoryClientProps {
  categories: ToolCategory[];
  totalLive: number;
}

function SearchFilter({
  categories,
  totalLive,
}: ToolsDirectoryClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categoryTitles = useMemo(() => {
    return ["All", ...categories.map((c) => c.title)];
  }, [categories]);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();

    return categories
      .map((cat) => {
        // Filter by category pill if selected
        if (selectedCategory !== "All" && cat.title !== selectedCategory) {
          return null;
        }

        // Filter tools inside category
        const matchingTools = cat.tools.filter((t) => {
          if (!q) return true;
          return (
            t.name.toLowerCase().includes(q) ||
            t.path.toLowerCase().includes(q) ||
            cat.title.toLowerCase().includes(q)
          );
        });

        if (matchingTools.length === 0) return null;

        return {
          ...cat,
          tools: matchingTools,
        };
      })
      .filter((cat): cat is NonNullable<typeof cat> => cat !== null);
  }, [categories, query, selectedCategory]);

  const totalMatchingTools = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.tools.length, 0);
  }, [filteredCategories]);

  return (
    <div>
      {/* Search Bar & Stats */}
      <div style={{ maxWidth: "700px", margin: "0 auto 2.5rem auto" }}>
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: "var(--bg-card)",
          border: "1px solid var(--border-strong)",
          borderRadius: "14px",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
          padding: "0.4rem 1rem",
        }}>
          <Search size={20} color="var(--text-muted)" style={{ marginRight: "0.75rem", flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 100+ tools (e.g. JSON, QR code, resume, background, currency...)"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "1rem",
              padding: "0.6rem 0",
              color: "var(--text-main)",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "0.25rem",
                display: "flex",
                alignItems: "center",
              }}
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "1.25rem",
        }}>
          {categoryTitles.map((catTitle) => {
            const isActive = selectedCategory === catTitle;
            return (
              <button
                key={catTitle}
                onClick={() => setSelectedCategory(catTitle)}
                style={{
                  border: isActive ? "1px solid var(--primary)" : "1px solid var(--border-light)",
                  background: isActive ? "var(--primary)" : "var(--bg-card)",
                  color: isActive ? "#ffffff" : "var(--text-muted)",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "100px",
                  fontSize: "0.8rem",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {catTitle}
              </button>
            );
          })}
        </div>

        {/* Live Filter Count */}
        <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          {query || selectedCategory !== "All" ? (
            <span>
              Found <strong>{totalMatchingTools}</strong> matching tools
              {query && <> for &quot;<em>{query}</em>&quot;</>}
              {selectedCategory !== "All" && <> in <strong>{selectedCategory}</strong></>}
              {" · "}
              <button
                onClick={() => { setQuery(""); setSelectedCategory("All"); }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--primary)",
                  cursor: "pointer",
                  fontWeight: 600,
                  textDecoration: "underline",
                  padding: 0,
                }}
              >
                Reset filters
              </button>
            </span>
          ) : (
            <span>Showing all {totalLive} free browser utilities</span>
          )}
        </div>
      </div>

      {/* Grid of Filtered Categories */}
      {filteredCategories.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "4rem 2rem",
          background: "var(--bg-card)",
          border: "1px solid var(--border-light)",
          borderRadius: "16px",
          maxWidth: "600px",
          margin: "0 auto",
        }}>
          <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.5rem" }}>
            No tools found
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
            No utility matched &quot;{query}&quot;. Try searching for &quot;JSON&quot;, &quot;QR&quot;, &quot;IP&quot;, or &quot;converter&quot;.
          </p>
          <button
            onClick={() => { setQuery(""); setSelectedCategory("All"); }}
            className="btn btn-primary"
            style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem" }}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "1.75rem",
        }}>
          {filteredCategories.map((cat, i) => (
            <div key={i} className="card" style={{ display: "flex", flexDirection: "column" }}>
              <h2 style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "1.2rem",
                marginBottom: "1.25rem",
                borderBottom: "1px solid var(--border-light)",
                paddingBottom: "0.85rem",
              }}>
                {cat.icon} {cat.title}
                <span style={{
                  marginLeft: "auto",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  background: "var(--bg-main)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "100px",
                }}>
                  {cat.tools.length}
                </span>
              </h2>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", padding: 0, margin: 0 }}>
                {cat.tools.map((tool, j) => (
                  <li key={j}>
                    {tool.status === "live" || tool.status === "new" ? (
                      <Link
                        href={tool.path}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.55rem 0.75rem",
                          borderRadius: "8px",
                          background: tool.status === "new" ? "#fff7ed" : "#eff6ff",
                          textDecoration: "none",
                          color: "var(--text-main)",
                          transition: "transform 0.15s ease",
                        }}
                      >
                        <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>{tool.name}</span>
                        <span style={{
                          fontSize: "0.7rem",
                          padding: "0.15rem 0.45rem",
                          background: tool.status === "new" ? "#ea580c" : "var(--primary)",
                          color: "white",
                          borderRadius: "10px",
                          fontWeight: 700,
                          flexShrink: 0,
                          marginLeft: "0.5rem",
                        }}>
                          {tool.status === "new" ? "NEW" : "LIVE"}
                        </span>
                      </Link>
                    ) : (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.55rem 0.75rem",
                        borderRadius: "8px",
                        color: "var(--text-muted)",
                        fontSize: "0.9rem",
                      }}>
                        <span>{tool.name}</span>
                        <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Coming Soon</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ToolsDirectoryClient(props: ToolsDirectoryClientProps) {
  return (
    <Suspense fallback={
      <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
        Loading tools directory...
      </div>
    }>
      <SearchFilter {...props} />
    </Suspense>
  );
}
