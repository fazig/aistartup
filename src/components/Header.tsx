"use client";

import { useState } from "react";
import Link from "next/link";
import { Wrench, Menu, X, ChevronDown, Sparkles, ArrowRight } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="header-nav" style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container header-container">
        {/* Brand Logo & Name */}
        <Link href="/" className="header-brand" onClick={closeMenu} style={{ gap: '0.65rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#10b981',
            padding: '0.45rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(15, 23, 42, 0.15)'
          }}>
            <Wrench size={18} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em', color: '#0f172a' }}>
            StartupAI<span style={{ color: '#2563eb' }}>.</span>
          </span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button 
          className="header-toggle" 
          onClick={toggleMenu} 
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu Links */}
        <nav className="header-desktop-menu" style={{ gap: '1.75rem' }}>
          <Link href="/tools" className="nav-link" style={{ color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>
            All Tools
          </Link>

          {/* Dropdown for Popular Tools */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            style={{ position: 'relative' }}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="nav-link"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0',
                color: dropdownOpen ? '#2563eb' : '#475569'
              }}
            >
              Popular Tools
              <ChevronDown size={14} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }} />
            </button>
            
            {dropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  boxShadow: '0 20px 30px -10px rgba(15, 23, 42, 0.12)',
                  padding: '0.85rem',
                  minWidth: '240px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  marginTop: '0.5rem'
                }}
              >
                <Link 
                  href="/tools/image-enhancer" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: '#0f172a',
                    fontWeight: 500,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ fontWeight: 700, color: '#ec4899', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Sparkles size={14} /> Image Enhancer HD</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Free AI image upscaling</span>
                </Link>

                <Link 
                  href="/tools/grammar-checker" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: '#0f172a',
                    fontWeight: 500,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Free Grammar Checker</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Check grammar & spelling</span>
                </Link>
                
                <Link 
                  href="/tools/adsense-eligibility-checker" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: '#0f172a',
                    fontWeight: 500,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>AdSense Checker</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Scan site eligibility</span>
                </Link>

                <Link 
                  href="/tools/live-sports" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: '#0f172a',
                    fontWeight: 500,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Live Sports Stats</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Real-time match scores</span>
                </Link>

                <Link 
                  href="/free-sumo-tools" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: '#2563eb',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Free Sumo Tools</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Premium SEO utilities</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" className="nav-link" style={{ color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>
            Blog
          </Link>
          <Link href="/tools/url-shortener" className="nav-link" style={{ color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>
            URL Shortener
          </Link>
        </nav>

        {/* Right CTA Action Buttons (HackerRank Pill Style) */}
        <div className="header-desktop-menu" style={{ gap: '0.75rem' }}>
          <Link 
            href="/tools/ai-copilot" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              background: '#f8fafc',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              padding: '0.5rem 1.15rem',
              borderRadius: '100px',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={14} color="#9333ea" /> ZenNote AI
          </Link>
          
          <Link 
            href="#tools" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              background: '#059669',
              color: '#ffffff',
              padding: '0.5rem 1.25rem',
              borderRadius: '100px',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      <div className={`header-mobile-drawer ${isOpen ? "is-open" : ""}`}>
        <nav className="header-mobile-menu">
          <Link href="/tools/ai-copilot" className="mobile-nav-link nav-link-highlight" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} onClick={closeMenu}>
            <Sparkles size={14} /> ZenNote AI
          </Link>
          <Link href="/tools" className="mobile-nav-link" onClick={closeMenu}>
            All Tools
          </Link>
          <Link href="/blog" className="mobile-nav-link" onClick={closeMenu}>
            Blog
          </Link>
          <Link href="/tools/url-shortener" className="mobile-nav-link" onClick={closeMenu}>
            URL Shortener
          </Link>
          
          <div style={{ padding: "0.25rem 0", fontWeight: 700, fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase", marginTop: "0.5rem" }}>
            Popular Tools
          </div>
          <Link href="/tools/image-enhancer" className="mobile-nav-link" style={{ paddingLeft: "1rem", color: '#ec4899', display: 'flex', alignItems: 'center', gap: '0.25rem' }} onClick={closeMenu}>
            <Sparkles size={14} /> Image Enhancer HD
          </Link>
          <Link href="/tools/grammar-checker" className="mobile-nav-link" style={{ paddingLeft: "1rem" }} onClick={closeMenu}>
            Free Grammar Checker
          </Link>
          <Link href="/tools/adsense-eligibility-checker" className="mobile-nav-link" style={{ paddingLeft: "1rem" }} onClick={closeMenu}>
            AdSense Checker
          </Link>
          <Link href="/tools/live-sports" className="mobile-nav-link" style={{ paddingLeft: "1rem" }} onClick={closeMenu}>
            Live Sports Stats
          </Link>
          <Link href="/free-sumo-tools" className="mobile-nav-link nav-link-highlight" style={{ paddingLeft: "1rem" }} onClick={closeMenu}>
            Free Sumo Tools
          </Link>
        </nav>
      </div>
    </header>
  );
}
