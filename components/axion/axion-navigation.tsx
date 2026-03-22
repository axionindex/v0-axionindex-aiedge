"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function AxionNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 72;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "72px",
          background: scrolled ? "rgba(12,11,9,0.99)" : "rgba(12,11,9,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--rule)",
          zIndex: 1000,
          transition: "background 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 3rem",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "1.08rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
            }}
          >
            Axion Index
          </Link>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            {/* Dropdown 1: Axion Index */}
            <NavDropdown
              label="Axion Index"
              borderColor="var(--gold)"
              items={[
                { type: "label", text: "The Organisation" },
                { label: "Why This Matters", href: "#tension" },
                { label: "What We Do", href: "#what-we-do" },
                { label: "Belief → Conviction → Rhythm", href: "#framework" },
                { label: "The Axion Idea", href: "#axion-idea" },
                { label: "Why We're Different", href: "#unconventional" },
                { label: "Our Position", href: "#positioning" },
                { type: "divider" },
                { type: "label", text: "Domains" },
                { label: "Operating Architecture", href: "#domains" },
                { label: "Labour Code Readiness", href: "#domains" },
                { label: "AI & Work Redesign", href: "#domains" },
                { label: "Family Business HR", href: "#domains" },
                { label: "Governance & Decision Ownership", href: "#domains" },
                { label: "HR as Risk Architecture", href: "#domains" },
                { type: "divider" },
                { label: "Founder — Nitin Nahata", href: "#founder" },
                { label: "Three-Layer Architecture", href: "#architecture" },
              ]}
              scrollTo={scrollToSection}
            />

            {/* AI Edge Lab - Distinct styling */}
            <AIEdgeLabDropdown scrollTo={scrollToSection} />

            {/* How We Work */}
            <NavLink label="How We Work" href="#how-we-work" scrollTo={scrollToSection} />

            {/* Founder */}
            <NavLink label="Founder" href="#founder" scrollTo={scrollToSection} />

            {/* CTA */}
            <Link
              href="#cta"
              onClick={(e) => { e.preventDefault(); scrollToSection("#cta"); }}
              className="btn-gold"
              style={{ marginLeft: "1rem", padding: "10px 24px", fontSize: "0.62rem" }}
            >
              Start a Conversation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              color: "var(--parchment)",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "8px",
              display: "none",
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--ink)",
            zIndex: 999,
            paddingTop: "72px",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "2rem 3rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <MobileNavLink label="Why This Matters" href="#tension" scrollTo={scrollToSection} />
            <MobileNavLink label="What We Do" href="#what-we-do" scrollTo={scrollToSection} />
            <MobileNavLink label="Framework" href="#framework" scrollTo={scrollToSection} />
            <MobileNavLink label="Domains" href="#domains" scrollTo={scrollToSection} />
            <MobileNavLink label="AI Edge Lab" href="#aiedge" scrollTo={scrollToSection} isSteel />
            <MobileNavLink label="How We Work" href="#how-we-work" scrollTo={scrollToSection} />
            <MobileNavLink label="Architecture" href="#architecture" scrollTo={scrollToSection} />
            <MobileNavLink label="Founder" href="#founder" scrollTo={scrollToSection} />
            <Link
              href="#cta"
              onClick={(e) => { e.preventDefault(); scrollToSection("#cta"); }}
              className="btn-gold"
              style={{ marginTop: "1rem", textAlign: "center" }}
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-item {
          position: relative;
        }
        .nav-item:hover .nav-dd {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .nav-trigger:hover {
          color: var(--gold) !important;
        }
        .dd-item:hover {
          background: rgba(196,154,60,0.06) !important;
          border-left-color: var(--gold) !important;
        }
        .steel-trigger:hover {
          border-color: var(--steel-lt) !important;
          background: rgba(74,107,138,0.08) !important;
        }
        .steel-dd-item:hover {
          background: rgba(74,107,138,0.08) !important;
          border-left-color: var(--steel-lt) !important;
        }
        @media (max-width: 900px) {
          .show-mobile {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

function NavDropdown({ label, items, scrollTo, borderColor }: { label: string; items: any[]; scrollTo: (id: string) => void; borderColor?: string }) {
  return (
    <div className="nav-item" style={{ position: "relative", height: "72px", display: "flex", alignItems: "center" }}>
      <button
        className="nav-trigger"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "0 14px",
          height: "100%",
          fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
          fontSize: "0.62rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--dim)",
          cursor: "pointer",
          transition: "color 0.2s",
          border: "none",
          background: "none",
        }}
      >
        {label}
        <svg width="8" height="8" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.5 }}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className="nav-dd"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          minWidth: "320px",
          background: "rgba(12,11,9,0.99)",
          border: "1px solid var(--rule)",
          borderTop: `2px solid ${borderColor || "var(--gold)"}`,
          padding: "8px 0",
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(8px)",
          transition: "all 0.2s ease",
          backdropFilter: "blur(20px)",
        }}
      >
        {items.map((item, i) => {
          if (item.type === "label") {
            return (
              <div
                key={i}
                style={{
                  padding: "10px 20px 6px",
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.54rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--dim)",
                }}
              >
                {item.text}
              </div>
            );
          }
          if (item.type === "divider") {
            return <div key={i} style={{ height: "1px", background: "var(--rule)", margin: "8px 20px" }} />;
          }
          return (
            <a
              key={i}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              className="dd-item"
              style={{
                display: "block",
                padding: "10px 20px",
                fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                fontSize: "0.85rem",
                color: "var(--parchment)",
                textDecoration: "none",
                borderLeft: "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function AIEdgeLabDropdown({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <div className="nav-item" style={{ position: "relative", height: "72px", display: "flex", alignItems: "center" }}>
      <a
        href="https://www.axionindex.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="steel-trigger"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 14px",
          height: "34px",
          margin: "0 0.3rem",
          fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
          fontSize: "0.62rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--steel-lt)",
          cursor: "pointer",
          transition: "all 0.2s",
          border: "1px solid rgba(74,107,138,0.32)",
          background: "none",
          textDecoration: "none",
        }}
      >
        <span className="live-dot" style={{ width: "6px", height: "6px", background: "var(--green)", borderRadius: "50%" }} />
        The AI Edge Lab
      </a>

      <div
        className="nav-dd"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          minWidth: "360px",
          background: "rgba(12,11,9,0.99)",
          border: "1px solid var(--srule)",
          borderTop: "2px solid var(--steel)",
          padding: "8px 0",
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(8px)",
          transition: "all 0.2s ease",
          backdropFilter: "blur(20px)",
        }}
      >
        <div style={{ padding: "10px 20px 6px", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(74,107,138,0.5)" }}>
          Live Assessments
        </div>
        <DropdownItem label="Quick Mirror — Free" badge="LIVE" href="https://www.axionindex.org/quick-mirror" external green />
        <DropdownItem label="Full Diagnostic" badge="LIVE" href="https://www.axionindex.org/full-diagnostic" external green />
        <DropdownItem label="3i Labour Code Readiness Index™" badge="LIVE" href="#aiedge" scrollTo={scrollTo} green />

        <div style={{ height: "1px", background: "var(--srule)", margin: "8px 20px" }} />
        <div style={{ padding: "10px 20px 6px", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(74,107,138,0.5)" }}>
          Doctrine & Framework
        </div>
        <DropdownItem label="The Three Structural Shifts" href="https://www.axionindex.org/#shifts" external />
        <DropdownItem label="E.D.G.E. Framework" href="https://www.axionindex.org/#edge" external />
        <DropdownItem label="Brainpower Density Curve™" href="https://www.axionindex.org/#bpdcurve" external />
        <DropdownItem label="Ownership Ladders" href="https://www.axionindex.org/#ownership" external />
        <DropdownItem label="Salary Defensibility Score" href="https://www.axionindex.org/#salary" external />

        <div style={{ height: "1px", background: "var(--srule)", margin: "8px 20px" }} />
        <div style={{ padding: "10px 20px 6px", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(74,107,138,0.5)" }}>
          Building
        </div>
        <DropdownItem label="Workforce Architecture Diagnostics™" badge="BUILDING" href="#aiedge" scrollTo={scrollTo} />
        <DropdownItem label="AI Exposure & Work Compression" badge="BUILDING" href="#aiedge" scrollTo={scrollTo} />
        <DropdownItem label="Decision Ownership Models™" badge="SOON" href="#aiedge" scrollTo={scrollTo} />
        <DropdownItem label="Payroll Operating Control" badge="SOON" href="#aiedge" scrollTo={scrollTo} />

        <div style={{ height: "1px", background: "var(--srule)", margin: "8px 20px" }} />
        <DropdownItem label="The Doctrine — PDF ↓" href="https://www.axionindex.org/AI-Edge-Doctrine-2026.pdf" external />
        <DropdownItem label="Sample Diagnostic Report ↗" href="https://www.axionindex.org/sample-report" external />
      </div>
    </div>
  );
}

function DropdownItem({ label, badge, href, external, scrollTo, green }: { label: string; badge?: string; href: string; external?: boolean; scrollTo?: (id: string) => void; green?: boolean }) {
  const handleClick = (e: React.MouseEvent) => {
    if (!external && scrollTo) {
      e.preventDefault();
      scrollTo(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="steel-dd-item"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
        fontSize: "0.85rem",
        color: "var(--parchment)",
        textDecoration: "none",
        borderLeft: "2px solid transparent",
        transition: "all 0.15s",
      }}
    >
      <span>{label}</span>
      {badge && (
        <span
          style={{
            fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.1em",
            padding: "3px 8px",
            background: green ? "var(--green-dim)" : badge === "BUILDING" ? "var(--gold-dim)" : "rgba(107,99,88,0.2)",
            color: green ? "var(--green)" : badge === "BUILDING" ? "var(--gold)" : "var(--dim)",
          }}
        >
          {badge}
        </span>
      )}
    </a>
  );
}

function NavLink({ label, href, scrollTo }: { label: string; href: string; scrollTo: (id: string) => void }) {
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); scrollTo(href); }}
      className="nav-trigger"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        height: "72px",
        fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
        fontSize: "0.62rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--dim)",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
    >
      {label}
    </a>
  );
}

function MobileNavLink({ label, href, scrollTo, isSteel }: { label: string; href: string; scrollTo: (id: string) => void; isSteel?: boolean }) {
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); scrollTo(href); }}
      style={{
        fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
        fontSize: "0.75rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: isSteel ? "var(--steel-lt)" : "var(--parchment)",
        textDecoration: "none",
        padding: "0.5rem 0",
        borderBottom: "1px solid var(--rule2)",
      }}
    >
      {label}
    </a>
  );
}
