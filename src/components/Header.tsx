"use client";

import { useState } from "react";
import Link from "next/link";
import { Wrench, Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link href="/free-sumo-tools" className="nav-link nav-link-highlight">
            FreeSumoTools
          </Link>
          <Link href="/tools" className="nav-link">
            All Tools
          </Link>
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          <Link href="/tools/adsense-eligibility-checker" className="nav-link">
            AdSense Checker
          </Link>
          <Link href="/tools/url-shortener" className="nav-link">
            URL Shortener
          </Link>
        </nav>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      <div className={`header-mobile-drawer ${isOpen ? "is-open" : ""}`}>
        <nav className="header-mobile-menu">
          <Link href="/free-sumo-tools" className="mobile-nav-link nav-link-highlight" onClick={closeMenu}>
            FreeSumoTools
          </Link>
          <Link href="/tools" className="mobile-nav-link" onClick={closeMenu}>
            All Tools
          </Link>
          <Link href="/blog" className="mobile-nav-link" onClick={closeMenu}>
            Blog
          </Link>
          <Link href="/tools/adsense-eligibility-checker" className="mobile-nav-link" onClick={closeMenu}>
            AdSense Checker
          </Link>
          <Link href="/tools/url-shortener" className="mobile-nav-link" onClick={closeMenu}>
            URL Shortener
          </Link>
        </nav>
      </div>
    </header>
  );
}
