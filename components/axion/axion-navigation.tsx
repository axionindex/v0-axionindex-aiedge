"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function AxionNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Thesis", href: "#thesis" },
    { label: "Instruments", href: "#instruments" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Founder", href: "#founder" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(13,13,13,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 32px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "var(--parchment)",
              letterSpacing: "-0.01em",
            }}
          >
            Axion
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            Index
          </span>
        </Link>

        {/* Desktop Nav */}
        <div
          className="hide-mobile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 400,
                color: "rgba(245,242,236,0.6)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,242,236,0.6)")}
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/ai-edge-lab"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
              padding: "10px 20px",
              border: "1px solid rgba(201,168,76,0.35)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.background = "rgba(201,168,76,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            AI Edge Lab
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-only"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--parchment)",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            right: 0,
            background: "rgba(13,13,13,0.98)",
            borderBottom: "1px solid var(--border)",
            padding: "24px 32px",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                color: "var(--parchment)",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/ai-edge-lab"
            onClick={() => setMobileOpen(false)}
            style={{
              display: "block",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
              padding: "16px 0",
            }}
          >
            AI Edge Lab →
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          .mobile-only {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
