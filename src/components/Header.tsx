"use client";

import { useState } from "react";
import Link from "next/link";
import { Wrench, Menu, X, ChevronDown } from "lucide-react";

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
    <header className="header-nav">
      <div className="container header-container">
        {/* Brand Logo & Name */}
        <Link href="/" className="header-brand" onClick={closeMenu}>
          <div className="header-logo-icon">
            <Wrench size={20} />
          </div>
          <span className="header-title">StartupAI Tools</span>
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
        <nav className="header-desktop-menu">
          <Link href="/tools" className="nav-link">
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
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem 0',
                color: dropdownOpen ? 'var(--primary)' : 'var(--text-muted)'
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
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  padding: '0.75rem',
                  minWidth: '225px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  marginTop: '0.5rem'
                }}
              >
                <Link 
                  href="/tools/grammarly-free" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--text-main)',
                    fontWeight: 500,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Grammarly Free</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Check grammar & spelling</span>
                </Link>
                
                <Link 
                  href="/tools/adsense-eligibility-checker" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--text-main)',
                    fontWeight: 500,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>AdSense Checker</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scan site eligibility</span>
                </Link>

                <Link 
                  href="/free-sumo-tools" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--primary)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Free Sumo Tools</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Premium SEO utilities</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          <Link href="/tools/url-shortener" className="nav-link">
            URL Shortener
          </Link>
        </nav>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      <div className={`header-mobile-drawer ${isOpen ? "is-open" : ""}`}>
        <nav className="header-mobile-menu">
          <Link href="/tools" className="mobile-nav-link" onClick={closeMenu}>
            All Tools
          </Link>
          <Link href="/blog" className="mobile-nav-link" onClick={closeMenu}>
            Blog
          </Link>
          <Link href="/tools/url-shortener" className="mobile-nav-link" onClick={closeMenu}>
            URL Shortener
          </Link>
          
          <div style={{ padding: "0.25rem 0", fontWeight: 700, fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.5rem" }}>
            Popular Tools
          </div>
          <Link href="/tools/grammarly-free" className="mobile-nav-link" style={{ paddingLeft: "1rem" }} onClick={closeMenu}>
            Grammarly Free
          </Link>
          <Link href="/tools/adsense-eligibility-checker" className="mobile-nav-link" style={{ paddingLeft: "1rem" }} onClick={closeMenu}>
            AdSense Checker
          </Link>
          <Link href="/free-sumo-tools" className="mobile-nav-link nav-link-highlight" style={{ paddingLeft: "1rem" }} onClick={closeMenu}>
            Free Sumo Tools
          </Link>
        </nav>
      </div>
    </header>
  );
}
