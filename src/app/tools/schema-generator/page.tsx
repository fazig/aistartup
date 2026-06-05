"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useState, useEffect } from "react";
import { 
  Code, Copy, Check, Download, Info, HelpCircle, 
  FileText, Store, ShoppingBag, FolderSync, Trash2, Plus 
} from "lucide-react";

type SchemaType = "faq" | "article" | "local_business" | "product" | "breadcrumbs";

export default function SchemaGenerator() {
  const [activeTab, setActiveTab] = useState<SchemaType>("faq");
  const [copied, setCopied] = useState(false);
  const [jsonOutput, setJsonOutput] = useState("");

  // --- STATE FOR SCHEMA TYPES ---
  
  // 1. FAQ Schema State
  const [faqItems, setFaqItems] = useState([
    { question: "What is your return policy?", answer: "We offer a 30-day money-back guarantee on all products." },
    { question: "Do you ship internationally?", answer: "Yes, we ship to over 100 countries worldwide. Shipping fees apply." }
  ]);

  // 2. Article Schema State
  const [articleData, setArticleData] = useState({
    title: "How to Bootstrap a Software Startup in 2026",
    description: "A complete step-by-step guide to building and launching a software startup without outside funding.",
    url: "https://www.aitoolspro.tech/blog/bootstrap-software-startup",
    imageUrl: "https://www.aitoolspro.tech/images/bootstrap-startup.jpg",
    authorName: "John Doe",
    authorType: "Person", // "Person" | "Organization"
    publisherName: "StartupAI Tools",
    publisherLogo: "https://www.aitoolspro.tech/logo.png",
    datePublished: new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString().split("T")[0]
  });

  // 3. Local Business Schema State
  const [businessData, setBusinessData] = useState({
    name: "Downtown Coffee Hub",
    description: "A cozy community coffee shop serving organic, fair-trade coffee and fresh pastries.",
    url: "https://www.downtowncoffeehub.com",
    imageUrl: "https://www.downtowncoffeehub.com/hero.jpg",
    telephone: "+1-555-0199",
    priceRange: "$$",
    streetAddress: "123 Main Street",
    addressLocality: "Boston",
    addressRegion: "MA",
    postalCode: "02110",
    addressCountry: "US",
    latitude: "42.3601",
    longitude: "-71.0589",
    openingHours: "Mo-Fr 07:00-19:00, Sa 08:00-16:00"
  });

  // 4. Product Schema State
  const [productData, setProductData] = useState({
    name: "Premium Ergonomic Office Chair",
    description: "Adjustable lumber support office chair designed for long hours of comfortable sitting.",
    brand: "ErgoComfort",
    sku: "EC-CHAIR-001",
    mpn: "EC98765",
    url: "https://www.example.com/products/ergonomic-chair",
    imageUrl: "https://www.example.com/images/chair.jpg",
    price: "249.99",
    currency: "USD",
    availability: "https://schema.org/InStock", // InStock, OutOfStock
    ratingValue: "4.8",
    reviewCount: "142"
  });

  // 5. Breadcrumb Schema State
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { name: "Home", url: "https://www.aitoolspro.tech" },
    { name: "Tools", url: "https://www.aitoolspro.tech/tools" },
    { name: "Schema Generator", url: "https://www.aitoolspro.tech/tools/schema-generator" }
  ]);

  // --- DYNAMIC FAQ LOGIC ---
  const handleAddFaq = () => {
    setFaqItems([...faqItems, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index: number) => {
    const updated = faqItems.filter((_, idx) => idx !== index);
    setFaqItems(updated);
  };

  const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
    const updated = faqItems.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setFaqItems(updated);
  };

  // --- DYNAMIC BREADCRUMB LOGIC ---
  const handleAddBreadcrumb = () => {
    setBreadcrumbItems([...breadcrumbItems, { name: "", url: "" }]);
  };

  const handleRemoveBreadcrumb = (index: number) => {
    const updated = breadcrumbItems.filter((_, idx) => idx !== index);
    setBreadcrumbItems(updated);
  };

  const handleBreadcrumbChange = (index: number, field: "name" | "url", value: string) => {
    const updated = breadcrumbItems.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setBreadcrumbItems(updated);
  };

  // --- GENERATE JSON-LD STRING ---
  useEffect(() => {
    let schemaObj: any = {};

    if (activeTab === "faq") {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems
          .filter(item => item.question.trim() !== "")
          .map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
      };
    } else if (activeTab === "article") {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.title,
        "description": articleData.description,
        "image": articleData.imageUrl,
        "author": {
          "@type": articleData.authorType,
          "name": articleData.authorName,
          "url": articleData.authorType === "Person" ? undefined : articleData.url
        },
        "publisher": {
          "@type": "Organization",
          "name": articleData.publisherName,
          "logo": articleData.publisherLogo ? {
            "@type": "ImageObject",
            "url": articleData.publisherLogo
          } : undefined
        },
        "datePublished": articleData.datePublished,
        "dateModified": articleData.dateModified,
        "mainEntityOfPage": articleData.url
      };
    } else if (activeTab === "local_business") {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": businessData.name,
        "description": businessData.description,
        "url": businessData.url,
        "image": businessData.imageUrl,
        "telephone": businessData.telephone,
        "priceRange": businessData.priceRange,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": businessData.streetAddress,
          "addressLocality": businessData.addressLocality,
          "addressRegion": businessData.addressRegion,
          "postalCode": businessData.postalCode,
          "addressCountry": businessData.addressCountry
        },
        "geo": (businessData.latitude && businessData.longitude) ? {
          "@type": "GeoCoordinates",
          "latitude": businessData.latitude,
          "longitude": businessData.longitude
        } : undefined,
        "openingHoursSpecification": businessData.openingHours ? businessData.openingHours.split(",").map(spec => {
          const parts = spec.trim().split(" ");
          const days = parts[0];
          const hours = parts[1] || "";
          const hourParts = hours.split("-");
          return {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": days.split("-").map(d => {
              if (d === "Mo") return "Monday";
              if (d === "Tu") return "Tuesday";
              if (d === "We") return "Wednesday";
              if (d === "Th") return "Thursday";
              if (d === "Fr") return "Friday";
              if (d === "Sa") return "Saturday";
              if (d === "Su") return "Sunday";
              return d;
            }),
            "opens": hourParts[0] || "09:00",
            "closes": hourParts[1] || "17:00"
          };
        }) : undefined
      };
    } else if (activeTab === "product") {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productData.name,
        "description": productData.description,
        "image": productData.imageUrl,
        "brand": {
          "@type": "Brand",
          "name": productData.brand
        },
        "sku": productData.sku,
        "mpn": productData.mpn,
        "offers": {
          "@type": "Offer",
          "url": productData.url,
          "price": productData.price,
          "priceCurrency": productData.currency,
          "availability": productData.availability,
          "priceValidUntil": new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split("T")[0]
        },
        "aggregateRating": (productData.ratingValue && productData.reviewCount) ? {
          "@type": "AggregateRating",
          "ratingValue": productData.ratingValue,
          "reviewCount": productData.reviewCount,
          "bestRating": "5",
          "worstRating": "1"
        } : undefined
      };
    } else if (activeTab === "breadcrumbs") {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
          .filter(item => item.name.trim() !== "")
          .map((item, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": item.name,
            "item": item.url || undefined
          }))
      };
    }

    setJsonOutput(JSON.stringify(schemaObj, null, 2));
  }, [
    activeTab, faqItems, articleData, businessData, 
    productData, breadcrumbItems
  ]);

  const handleCopy = () => {
    const wrappedCode = `<script type="application/ld+json">\n${jsonOutput}\n</script>`;
    navigator.clipboard.writeText(wrappedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const wrappedCode = `<script type="application/ld+json">\n${jsonOutput}\n</script>`;
    const blob = new Blob([wrappedCode], { type: "application/ld+json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `schema_${activeTab}.jsonld`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Stars for previews
  const renderStars = (rating: string) => {
    const num = Math.round(parseFloat(rating) || 5);
    return Array.from({ length: 5 }).map((_, idx) => (
      <span key={idx} style={{ color: idx < num ? "#f59e0b" : "#cbd5e1", marginRight: "2px" }}>★</span>
    ));
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <Link
        href="/tools"
        className="btn btn-outline"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          padding: "0.5rem 1rem",
        }}
      >
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      {/* Title Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <Code color="var(--primary)" size={32} /> Schema Markup Generator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
          Build fully compliant JSON-LD structured data. Select a schema type below, fill in the fields, and watch the snippet update in real time.
        </p>
      </div>

      {/* Tabs Selector */}
      <div style={{ 
        display: "flex", 
        gap: "0.5rem", 
        marginBottom: "2rem", 
        overflowX: "auto", 
        paddingBottom: "0.5rem",
        borderBottom: "2px solid var(--border-light)"
      }}>
        {[
          { id: "faq", label: "FAQ Page", icon: <HelpCircle size={16} /> },
          { id: "article", label: "Article / Blog", icon: <FileText size={16} /> },
          { id: "local_business", label: "Local Business", icon: <Store size={16} /> },
          { id: "product", label: "Product", icon: <ShoppingBag size={16} /> },
          { id: "breadcrumbs", label: "Breadcrumbs", icon: <FolderSync size={16} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as SchemaType)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.25rem",
              borderRadius: "8px",
              border: "none",
              background: activeTab === tab.id ? "var(--primary)" : "transparent",
              color: activeTab === tab.id ? "white" : "var(--text-muted)",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.95rem",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease"
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Generator Layout Grid */}
      <div className="grid-2" style={{ gap: "2rem", alignItems: "start", marginBottom: "3rem" }}>
        
        {/* Left Hand: Form Controls */}
        <div className="card" style={{ padding: "2rem" }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.75rem" }}>
            Configure Schema Fields
          </h2>

          {/* Form fields based on Active Schema Tab */}
          
          {/* FAQ SCHEMA FORM */}
          {activeTab === "faq" && (
            <div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Add questions and answers that frequently appear on your page. Google may display these directly as collapsible accordion panels in search results.
              </p>
              {faqItems.map((item, idx) => (
                <div key={idx} style={{ 
                  background: "#f8fafc", 
                  padding: "1rem", 
                  borderRadius: "8px", 
                  marginBottom: "1.25rem",
                  border: "1px solid var(--border-light)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--primary)" }}>Question #{idx + 1}</span>
                    {faqItems.length > 1 && (
                      <button 
                        onClick={() => handleRemoveFaq(idx)} 
                        style={{ border: "none", background: "transparent", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem" }}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    )}
                  </div>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>Question</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="e.g. Do you support returns?"
                      value={item.question}
                      onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>Answer</label>
                    <textarea 
                      className="input-field" 
                      rows={3} 
                      placeholder="e.g. Yes, we provide full refunds within 30 days."
                      value={item.answer}
                      onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <button 
                className="btn" 
                onClick={handleAddFaq}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem", 
                  background: "transparent", 
                  border: "1px dashed var(--primary)", 
                  color: "var(--primary)", 
                  width: "100%", 
                  justifyContent: "center",
                  padding: "0.75rem"
                }}
              >
                <Plus size={16} /> Add Question
              </button>
            </div>
          )}

          {/* ARTICLE SCHEMA FORM */}
          {activeTab === "article" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Article Title</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={articleData.title}
                  onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Short Description</label>
                <textarea 
                  className="input-field" 
                  rows={3}
                  value={articleData.description}
                  onChange={(e) => setArticleData({ ...articleData, description: e.target.value })}
                />
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Article URL</label>
                  <input 
                    type="url" 
                    className="input-field" 
                    value={articleData.url}
                    onChange={(e) => setArticleData({ ...articleData, url: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Image URL</label>
                  <input 
                    type="url" 
                    className="input-field" 
                    value={articleData.imageUrl}
                    onChange={(e) => setArticleData({ ...articleData, imageUrl: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Author Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={articleData.authorName}
                    onChange={(e) => setArticleData({ ...articleData, authorName: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Author Type</label>
                  <select 
                    className="input-field"
                    value={articleData.authorType}
                    onChange={(e) => setArticleData({ ...articleData, authorType: e.target.value })}
                    style={{ background: "white" }}
                  >
                    <option value="Person">Person</option>
                    <option value="Organization">Organization</option>
                  </select>
                </div>
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Publisher Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={articleData.publisherName}
                    onChange={(e) => setArticleData({ ...articleData, publisherName: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Publisher Logo URL</label>
                  <input 
                    type="url" 
                    className="input-field" 
                    value={articleData.publisherLogo}
                    onChange={(e) => setArticleData({ ...articleData, publisherLogo: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Date Published</label>
                  <input 
                    type="date" 
                    className="input-field" 
                    value={articleData.datePublished}
                    onChange={(e) => setArticleData({ ...articleData, datePublished: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Date Modified</label>
                  <input 
                    type="date" 
                    className="input-field" 
                    value={articleData.dateModified}
                    onChange={(e) => setArticleData({ ...articleData, dateModified: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* LOCAL BUSINESS SCHEMA FORM */}
          {activeTab === "local_business" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Business Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={businessData.name}
                    onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Telephone</label>
                  <input 
                    type="tel" 
                    className="input-field" 
                    value={businessData.telephone}
                    onChange={(e) => setBusinessData({ ...businessData, telephone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Description</label>
                <textarea 
                  className="input-field" 
                  rows={2}
                  value={businessData.description}
                  onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
                />
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Website URL</label>
                  <input 
                    type="url" 
                    className="input-field" 
                    value={businessData.url}
                    onChange={(e) => setBusinessData({ ...businessData, url: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Image URL</label>
                  <input 
                    type="url" 
                    className="input-field" 
                    value={businessData.imageUrl}
                    onChange={(e) => setBusinessData({ ...businessData, imageUrl: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ padding: "0.75rem", background: "#f1f5f9", borderRadius: "6px" }}>
                <span style={{ fontWeight: 700, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem", color: "var(--text-main)" }}>Address Details</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>Street Address</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={businessData.streetAddress}
                      onChange={(e) => setBusinessData({ ...businessData, streetAddress: e.target.value })}
                    />
                  </div>
                  <div className="grid-3" style={{ gap: "0.5rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>City</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={businessData.addressLocality}
                        onChange={(e) => setBusinessData({ ...businessData, addressLocality: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>State / Region</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={businessData.addressRegion}
                        onChange={(e) => setBusinessData({ ...businessData, addressRegion: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>Zip Code</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={businessData.postalCode}
                        onChange={(e) => setBusinessData({ ...businessData, postalCode: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>Country Code (e.g. US, GB)</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={businessData.addressCountry}
                      onChange={(e) => setBusinessData({ ...businessData, addressCountry: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="grid-3" style={{ gap: "0.5rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Latitude</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={businessData.latitude}
                    placeholder="e.g. 42.3601"
                    onChange={(e) => setBusinessData({ ...businessData, latitude: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Longitude</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={businessData.longitude}
                    placeholder="e.g. -71.0589"
                    onChange={(e) => setBusinessData({ ...businessData, longitude: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Price Range</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={businessData.priceRange}
                    placeholder="e.g. $$, $$$"
                    onChange={(e) => setBusinessData({ ...businessData, priceRange: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Opening Hours Specification</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={businessData.openingHours}
                  placeholder="e.g. Mo-Fr 07:00-19:00, Sa 08:00-16:00"
                  onChange={(e) => setBusinessData({ ...businessData, openingHours: e.target.value })}
                />
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Format: Days HH:MM-HH:MM comma-separated. Ex: Mo-Fr 09:00-17:00</span>
              </div>
            </div>
          )}

          {/* PRODUCT SCHEMA FORM */}
          {activeTab === "product" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Product Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Brand Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={productData.brand}
                    onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Product Description</label>
                <textarea 
                  className="input-field" 
                  rows={2}
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                />
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>SKU (Stock Keeping Unit)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={productData.sku}
                    onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>MPN (Manufacturer Part Num)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={productData.mpn}
                    onChange={(e) => setProductData({ ...productData, mpn: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Product URL</label>
                  <input 
                    type="url" 
                    className="input-field" 
                    value={productData.url}
                    onChange={(e) => setProductData({ ...productData, url: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Image URL</label>
                  <input 
                    type="url" 
                    className="input-field" 
                    value={productData.imageUrl}
                    onChange={(e) => setProductData({ ...productData, imageUrl: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid-3" style={{ gap: "0.5rem", background: "#f8fafc", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-light)" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>Price</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="input-field" 
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>Currency</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={productData.currency}
                    placeholder="e.g. USD"
                    onChange={(e) => setProductData({ ...productData, currency: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>Availability</label>
                  <select 
                    className="input-field"
                    value={productData.availability}
                    onChange={(e) => setProductData({ ...productData, availability: e.target.value })}
                    style={{ background: "white" }}
                  >
                    <option value="https://schema.org/InStock">In Stock</option>
                    <option value="https://schema.org/OutOfStock">Out of Stock</option>
                    <option value="https://schema.org/PreOrder">Pre Order</option>
                  </select>
                </div>
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Rating (out of 5)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="1" 
                    max="5"
                    className="input-field" 
                    value={productData.ratingValue}
                    onChange={(e) => setProductData({ ...productData, ratingValue: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>Review Count</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    value={productData.reviewCount}
                    onChange={(e) => setProductData({ ...productData, reviewCount: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* BREADCRUMBS SCHEMA FORM */}
          {activeTab === "breadcrumbs" && (
            <div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                Define the steps in your website's hierarchy. This changes the plain URL in search results into a clean, easy-to-read breadcrumb path.
              </p>
              {breadcrumbItems.map((item, idx) => (
                <div key={idx} style={{ 
                  background: "#f8fafc", 
                  padding: "1rem", 
                  borderRadius: "8px", 
                  marginBottom: "1.25rem",
                  border: "1px solid var(--border-light)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--primary)" }}>Level {idx + 1}</span>
                    {breadcrumbItems.length > 1 && (
                      <button 
                        onClick={() => handleRemoveBreadcrumb(idx)} 
                        style={{ border: "none", background: "transparent", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem" }}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    )}
                  </div>
                  <div className="grid-2" style={{ gap: "0.75rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>Label</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="e.g. Tools"
                        value={item.name}
                        onChange={(e) => handleBreadcrumbChange(idx, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>URL</label>
                      <input 
                        type="url" 
                        className="input-field" 
                        placeholder="e.g. https://site.com/tools"
                        value={item.url}
                        onChange={(e) => handleBreadcrumbChange(idx, "url", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                className="btn" 
                onClick={handleAddBreadcrumb}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem", 
                  background: "transparent", 
                  border: "1px dashed var(--primary)", 
                  color: "var(--primary)", 
                  width: "100%", 
                  justifyContent: "center",
                  padding: "0.75rem"
                }}
              >
                <Plus size={16} /> Add Breadcrumb Level
              </button>
            </div>
          )}

        </div>

        {/* Right Hand: Code Output & Visual Search Snippet Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* JSON-LD Code block */}
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: "1.25rem", margin: 0 }}>Generated JSON-LD Code</h2>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button 
                  className="btn" 
                  style={{ 
                    padding: "0.4rem 0.8rem", 
                    fontSize: "0.8rem", 
                    background: "var(--border-light)", 
                    color: "var(--text-main)", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "0.4rem" 
                  }} 
                  onClick={handleDownload}
                >
                  <Download size={14} /> Download
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ 
                    padding: "0.4rem 0.8rem", 
                    fontSize: "0.8rem", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "0.4rem" 
                  }} 
                  onClick={handleCopy}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy Code"}
                </button>
              </div>
            </div>

            <div style={{ 
              background: "#1e293b", 
              color: "#e2e8f0", 
              borderRadius: "8px", 
              padding: "1.5rem", 
              fontFamily: "monospace", 
              fontSize: "0.85rem", 
              lineHeight: 1.5, 
              overflowX: "auto",
              maxHeight: "350px",
              border: "1px solid #334155"
            }}>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {`/* Paste this in your <head> */\n<script type="application/ld+json">\n${jsonOutput}\n</script>`}
              </pre>
            </div>
          </div>

          {/* Visual Rich Snippet Google Search Result Mockup */}
          <div className="card" style={{ padding: "2rem", background: "#ffffff", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.25rem", color: "#1e293b", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Info size={18} color="var(--primary)" /> Google Search Result Preview
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>
              This simulates how search engines might format and display your page results using the structured data generated above.
            </p>

            {/* Google Result Box */}
            <div style={{ 
              border: "1px solid #dadce0", 
              borderRadius: "8px", 
              padding: "1.25rem", 
              fontFamily: "arial, sans-serif", 
              maxWidth: "600px",
              boxShadow: "0 1px 6px rgba(32,33,36,.28)"
            }}>
              {/* Site URL / Breadcrumbs */}
              <div style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "#202124", marginBottom: "4px" }}>
                <span style={{ 
                  display: "inline-block", 
                  width: "26px", 
                  height: "26px", 
                  borderRadius: "50%", 
                  background: "#f1f3f4", 
                  textAlign: "center", 
                  lineHeight: "26px", 
                  marginRight: "10px", 
                  fontWeight: "bold",
                  color: "var(--primary)",
                  fontSize: "12px"
                }}>
                  S
                </span>
                <div>
                  <div style={{ fontSize: "12px", color: "#202124", lineHeight: "1.2" }}>
                    {activeTab === "article" ? articleData.publisherName : "StartupAI Tools"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#5f6368", lineHeight: "1.2" }}>
                    {activeTab === "breadcrumbs" ? (
                      breadcrumbItems.filter(item => item.name).map(item => item.name).join(" › ")
                    ) : (
                      activeTab === "article" ? articleData.url : "https://www.aitoolspro.tech"
                    )}
                  </div>
                </div>
              </div>

              {/* Title Link */}
              <h4 style={{ 
                margin: "4px 0 6px 0", 
                fontSize: "20px", 
                color: "#1a0dab", 
                fontWeight: "normal", 
                fontFamily: "arial, sans-serif",
                cursor: "pointer"
              }}>
                {activeTab === "faq" && "Frequently Asked Questions - Custom Page"}
                {activeTab === "article" && (articleData.title || "Untitled Article")}
                {activeTab === "local_business" && (businessData.name || "Downtown Business")}
                {activeTab === "product" && (productData.name || "Special Offer Product")}
                {activeTab === "breadcrumbs" && "Dynamic Navigation Layout Directory"}
              </h4>

              {/* Snippet Description */}
              <p style={{ 
                margin: "0 0 10px 0", 
                fontSize: "14px", 
                color: "#4d5156", 
                lineHeight: "1.58",
                wordBreak: "break-word"
              }}>
                {activeTab === "faq" && "Find all the popular queries answered right here on our site. Check out our FAQ questions below on refund policies, shipping, and order processing details."}
                {activeTab === "article" && (articleData.description || "Learn how to write optimized articles using JSON-LD tags dynamically created with this developer utility tool.")}
                {activeTab === "local_business" && (businessData.description || "Visit us for exceptional service. Located in the city center. Find phone numbers, map directions, and opening timings.")}
                {activeTab === "product" && (productData.description || "Buy the best rating items directly online. Read user reviews, track current stocks availability, and order with easy shipping.")}
                {activeTab === "breadcrumbs" && "Browse our complete hierarchy of pages, sections, categorizations, and subfolders. Navigate directly to any subpage using our verified list index."}
              </p>

              {/* DYNAMIC SCHEMA EXTENSIONS MOCK */}
              
              {/* FAQ Accordions */}
              {activeTab === "faq" && (
                <div style={{ borderTop: "1px solid #ebebeb", paddingTop: "8px", fontSize: "14px", color: "#202124" }}>
                  {faqItems.filter(item => item.question).slice(0, 3).map((item, idx) => (
                    <div key={idx} style={{ 
                      padding: "8px 0", 
                      borderBottom: idx === faqItems.filter(i => i.question).length - 1 ? "none" : "1px solid #ebebeb",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <span style={{ color: "#1a0dab", fontWeight: "normal" }}>{item.question}</span>
                      <span style={{ fontSize: "10px", color: "#70757a" }}>▼</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Product Star ratings, price, availability */}
              {activeTab === "product" && (
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "13px", 
                  color: "#70757a", 
                  borderTop: "1px solid #ebebeb", 
                  paddingTop: "8px" 
                }}>
                  <div style={{ display: "flex", alignItems: "center", marginRight: "12px" }}>
                    <span style={{ display: "flex", marginRight: "5px" }}>
                      {renderStars(productData.ratingValue)}
                    </span>
                    <span style={{ color: "#4d5156", fontWeight: "bold" }}>{productData.ratingValue || "5.0"}</span>
                    <span style={{ marginLeft: "4px" }}>({productData.reviewCount || "0"})</span>
                  </div>
                  <span style={{ margin: "0 8px" }}>•</span>
                  <span style={{ color: "#4d5156", fontWeight: "bold" }}>
                    {productData.price ? `${productData.price} ${productData.currency}` : "$0.00"}
                  </span>
                  <span style={{ margin: "0 8px" }}>•</span>
                  <span style={{ color: productData.availability.includes("InStock") ? "#137333" : "#d93025" }}>
                    {productData.availability.includes("InStock") ? "In stock" : "Out of stock"}
                  </span>
                </div>
              )}

              {/* Local Business Review, hours, location */}
              {activeTab === "local_business" && (
                <div style={{ 
                  fontSize: "13px", 
                  color: "#4d5156", 
                  borderTop: "1px solid #ebebeb", 
                  paddingTop: "8px",
                  lineHeight: "1.6"
                }}>
                  {businessData.telephone && <div><strong>Phone:</strong> {businessData.telephone}</div>}
                  {businessData.streetAddress && (
                    <div><strong>Address:</strong> {businessData.streetAddress}, {businessData.addressLocality}, {businessData.addressRegion} {businessData.postalCode}</div>
                  )}
                  {businessData.openingHours && <div><strong>Hours:</strong> {businessData.openingHours}</div>}
                  {businessData.priceRange && <div><strong>Price Range:</strong> {businessData.priceRange}</div>}
                </div>
              )}

              {/* Article metadata preview (Author, Date) */}
              {activeTab === "article" && (
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "12px", 
                  color: "#70757a", 
                  borderTop: "1px solid #ebebeb", 
                  paddingTop: "8px",
                  justifyContent: "space-between"
                }}>
                  <div>
                    By <strong style={{ color: "#4d5156" }}>{articleData.authorName || "Anonymous"}</strong>
                  </div>
                  <div>
                    Published: <strong>{articleData.datePublished}</strong>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Structured / Natural Human SEO Guide */}
      <div className="prose" style={{ marginTop: "4rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1.25rem" }}>What the Heck is Schema Markup (Structured Data)?</h2>
        <p style={{ lineHeight: "1.7", marginBottom: "1.25rem" }}>
          Think of search engine spiders as automated machines reading your site's text. While they are smart, they sometimes struggle with nuance. If you list a product price of "$49.99" next to a phone number and some reviews, Google can guess what is what, but it isn't 100% sure. 
        </p>
        <p style={{ lineHeight: "1.7", marginBottom: "1.25rem" }}>
          <strong>Schema markup</strong> is a universal dictionary of tags you add to your HTML. It explicitly tells Google: <em>"Hey, this specific string of text is a product price, this image is the product cover, and these ratings are from actual buyers."</em> By translating your content into structured code (specifically using the JSON-LD format recommended by Google), you remove all guesswork.
        </p>

        <h2 style={{ fontSize: "1.75rem", marginTop: "2.5rem", marginBottom: "1.25rem" }}>Why You Should Care About Schema</h2>
        <p style={{ lineHeight: "1.7", marginBottom: "1.25rem" }}>
          Adding schema doesn't magically bump your page to rank #1 instantly. However, it gives you something else incredibly valuable: <strong>Rich Snippets</strong>. 
        </p>
        <p style={{ lineHeight: "1.7", marginBottom: "1.25rem" }}>
          Standard search results are just a blue link and two lines of grey text. If your competitor has that, but your listing displays gold rating stars, a product price, and expandable FAQ dropdowns, searchers are far more likely to click on your link. This increase in **Click-Through Rate (CTR)** tells Google that searchers prefer your site, which eventually *does* help you rank higher.
        </p>

        <h2 style={{ fontSize: "1.75rem", marginTop: "2.5rem", marginBottom: "1.25rem" }}>How to Implement This on Your Site</h2>
        <ol style={{ paddingLeft: "1.5rem", lineHeight: "1.8", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <li>
            <strong>Generate the Code:</strong> Fill in the config card on this page to create your specific schema.
          </li>
          <li>
            <strong>Copy the JSON-LD Script:</strong> Click the "Copy Code" button. It copies the script tags and the nested JSON object.
          </li>
          <li>
            <strong>Paste Into Your HTML:</strong> Paste this exact block of code inside the <code>&lt;head&gt;</code> or <code>&lt;body&gt;</code> tag of your target webpage. If you use WordPress, you can use header/footer injection plugins or custom fields. In React/Next.js, you can embed it safely inside a <code>&lt;script type="application/ld+json"&gt;</code> block.
          </li>
          <li>
            <strong>Test It:</strong> Never guess if your code works. Go to Google's official <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", fontWeight: "bold" }}>Rich Results Test</a> tool, paste your URL or code, and make sure Google reports no warnings or errors.
          </li>
        </ol>
      </div>

    </div>
  );
}
