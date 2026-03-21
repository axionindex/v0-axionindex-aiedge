"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

// Custom event for tab switching
export const CHANGE_TAB_EVENT = "ai-edge-change-tab";

const navItems = [
  {
    label: "Doctrine",
    groups: [
      {
        label: "The Three Structural Shifts",
        items: [
          { num: "01", title: "Intelligence is Becoming Abundant", sub: "The supply shock — cognitive tasks now done by machines", href: "#shifts" },
          { num: "02", title: "Judgment Becomes the New Scarcity", sub: "The new premium — consequence-bearing decisions", href: "#shifts" },
          { num: "03", title: "Organisations Must Redesign Work", sub: "The operating challenge — before the market forces it", href: "#shifts" },
        ],
      },
      {
        label: "What Must Change",
        items: [
          { num: "→", title: "For the Individual", sub: "Career strategy rewrite", href: "#changes", tabIndex: 0 },
          { num: "→", title: "For the Leader", sub: "Structural question, not a tech question", href: "#changes", tabIndex: 1 },
          { num: "→", title: "For the Organisation", sub: "Workforce strategy means redesigning work itself", href: "#changes", tabIndex: 2 },
        ],
      },
    ],
    width: "370px",
  },
  {
    label: "Framework",
    groups: [
      {
        label: "E.D.G.E. — Four Dimensions",
        items: [
          { num: "E", title: "Exposure", sub: "Proportion of work that is AI-compressible", href: "#edge", gold: true },
          { num: "D", title: "Decision Density", sub: "Consequence-bearing judgment you own", href: "#edge", gold: true },
          { num: "G", title: "Growth of Boundary", sub: "Decision authority — expanding or contracting", href: "#edge", gold: true },
          { num: "E", title: "Economic Anchoring", sub: "Compensation tied to real scarcity above the line", href: "#edge", gold: true },
        ],
      },
      {
        label: "Instruments",
        items: [
          { num: "→", title: "Ownership Ladders — Judgment & Thinking", sub: "I own → I lead → I contribute → I execute", href: "#ownership" },
          { num: "∿", title: "The Brainpower Density Curve™", sub: "Where your value sits — and where it's migrating", href: "#bpdcurve" },
        ],
      },
    ],
    width: "380px",
  },
  {
    label: "Assessment",
    groups: [
      {
        label: "Choose Your Instrument",
        items: [
          { num: "◇", title: "Quick Mirror — Free", sub: "5 min · Instant results on page", href: "/quick-mirror", isPage: true },
          { num: "◆", title: "Full Diagnostic — Paid", sub: "30 min · PDF report via email", href: "/full-diagnostic", isPage: true },
        ],
      },
    ],
    width: "350px",
    alignRight: 60,
  },
  {
    label: "Resources",
    groups: [
      {
        label: "Publications",
        items: [
          { num: "↓", title: "The Doctrine — PDF", sub: "Full manifesto · Laws · Principles · 2026 Edition", href: "/AI-Edge-Doctrine-2026.pdf", isDownload: true, highlight: true, gold: true },
          { num: "↗", title: "Sample Diagnostic Report", sub: "See what the Full Diagnostic produces", href: "/sample-report", isPage: true, highlight: true, gold: true },
        ],
      },
    ],
    width: "340px",
    alignRight: 60,
  },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((href: string, offset: number = 80) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { href: string; tabIndex?: number; isPdf?: boolean; isModal?: boolean; isPage?: boolean; isDownload?: boolean }
  ) => {
    // Handle page navigation (don't prevent default)
    if (item.isPage) {
      return; // Let the browser handle the navigation normally
    }

    // Handle PDF downloads - open in new tab
    if (item.isDownload) {
      window.open(item.href, "_blank");
      return;
    }

    e.preventDefault();

    // Handle PDF placeholder links
    if (item.isPdf) {
      toast({
        title: "Coming soon",
        description: "Join the waitlist to get notified when this PDF is available.",
      });
      scrollToSection("#cta");
      return;
    }

    // Handle sample report modal
    if (item.isModal) {
      setShowModal(true);
      return;
    }

    // Handle tab switching for "What Must Change" section
    if (item.tabIndex !== undefined) {
      // Dispatch custom event to change tab
      window.dispatchEvent(
        new CustomEvent(CHANGE_TAB_EVENT, { detail: { tabIndex: item.tabIndex } })
      );
    }

    // Smooth scroll to section
    scrollToSection(item.href);
  };

  return (
    <>
      <nav
        id="nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          height: "60px",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "1px solid transparent",
          transition: "border-color 0.4s, background 0.4s",
          background: scrolled ? "rgba(8,8,8,0.98)" : "rgba(8,8,8,0.92)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo + tag */}
        <Link
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#hero", 0);
          }}
          style={{ display: "flex", alignItems: "center", gap: 0, textDecoration: "none" }}
        >
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--white)" }}>
            AI <span style={{ color: "var(--gold)" }}>EDGE</span> LAB
          </span>
          <span style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.1)", margin: "0 20px" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--white-faint)" }}>
            Doctrine · 2026
          </span>
        </Link>

        {/* Nav right */}
        <div className="nav-right" style={{ display: "flex", alignItems: "center", height: "100%", gap: 0 }}>
          {navItems.map((item, idx) => (
            <div key={idx} className="nav-item" style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
              <button
                className="nav-trigger"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "0 14px",
                  height: "100%",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(245,242,236,0.45)",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  border: "none",
                  background: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
                <svg width="7" height="7" viewBox="0 0 10 6" fill="none" style={{ transition: "transform 0.22s", opacity: 0.35 }}>
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Dropdown */}
              <div
                className="nav-dd"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: item.alignRight !== undefined ? "auto" : 0,
                  right: item.alignRight !== undefined ? `${item.alignRight}px` : "auto",
                  minWidth: item.width,
                  background: "rgba(6,6,6,0.99)",
                  border: "1px solid rgba(201,168,76,0.18)",
                  borderTop: "2px solid var(--gold)",
                  padding: "6px 0",
                  opacity: 0,
                  visibility: "hidden",
                  transform: "translateY(6px)",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(20px)",
                }}
              >
                {item.groups.map((group, gi) => (
                  <div key={gi}>
                    {group.label && (
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold-dim)", padding: "9px 18px 3px", marginTop: "2px" }}>
                        {group.label}
                      </div>
                    )}
                    {!group.label && gi > 0 && (
                      <div style={{ height: "1px", background: "var(--border)", margin: "5px 0" }} />
                    )}
                    {group.items.map((menuItem, mi) => (
                      <a
                        key={mi}
                        href={menuItem.href}
                        onClick={(e) => handleNavClick(e, menuItem)}
                        className="dd-item"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "24px 1fr",
                          alignItems: "baseline",
                          gap: "10px",
                          padding: "8px 18px",
                          borderLeft: menuItem.highlight ? "2px solid var(--gold)" : "2px solid transparent",
                          transition: "background 0.15s, border-color 0.15s",
                          textDecoration: "none",
                          background: menuItem.highlight ? "rgba(201,168,76,0.04)" : "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "0.58rem",
                            paddingTop: "2px",
                            letterSpacing: "0.04em",
                            color: menuItem.gold ? "var(--gold)" : "var(--white-faint)",
                          }}
                        >
                          {menuItem.num}
                        </span>
                        <span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: menuItem.gold ? "var(--gold)" : "var(--white)", display: "block" }}>
                            {menuItem.title}
                          </span>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", color: "var(--white-dim)", letterSpacing: "0.06em", display: "block", marginTop: "1px" }}>
                            {menuItem.sub}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Connect Dropdown */}
          <div className="nav-item" style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
            <button
              className="nav-trigger"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "0 14px",
                height: "100%",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(245,242,236,0.45)",
                cursor: "pointer",
                transition: "color 0.2s",
                border: "none",
                background: "none",
                whiteSpace: "nowrap",
              }}
            >
              Connect
              <svg width="7" height="7" viewBox="0 0 10 6" fill="none" style={{ transition: "transform 0.22s", opacity: 0.35 }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className="nav-dd"
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                minWidth: "280px",
                background: "rgba(6,6,6,0.99)",
                border: "1px solid rgba(201,168,76,0.18)",
                borderTop: "2px solid var(--gold)",
                padding: "6px 0",
                opacity: 0,
                visibility: "hidden",
                transform: "translateY(6px)",
                transition: "all 0.2s ease",
                backdropFilter: "blur(20px)",
              }}
            >
              <a
                href="https://www.linkedin.com/in/nahatanitin/"
                target="_blank"
                rel="noopener noreferrer"
                className="dd-item"
                style={{
                  display: "grid",
                  gridTemplateColumns: "24px 1fr",
                  alignItems: "baseline",
                  gap: "10px",
                  padding: "8px 18px",
                  borderLeft: "2px solid transparent",
                  transition: "background 0.15s, border-color 0.15s",
                  textDecoration: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", paddingTop: "2px", letterSpacing: "0.04em", color: "var(--white-faint)" }}>
                  ↗
                </span>
                <span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: "var(--white)", display: "block" }}>
                    LinkedIn
                  </span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", color: "var(--white-dim)", letterSpacing: "0.06em", display: "block", marginTop: "1px" }}>
                    Connect with Nitin Nahata
                  </span>
                </span>
              </a>
              <a
                href="https://www.perplexity.ai/computer/a/the-making-of-the-operating-ar-mXeHIIQeSJWFEvWxSQaKtw"
                target="_blank"
                rel="noopener noreferrer"
                className="dd-item"
                style={{
                  display: "grid",
                  gridTemplateColumns: "24px 1fr",
                  alignItems: "baseline",
                  gap: "10px",
                  padding: "8px 18px",
                  borderLeft: "2px solid transparent",
                  transition: "background 0.15s, border-color 0.15s",
                  textDecoration: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", paddingTop: "2px", letterSpacing: "0.04em", color: "var(--white-faint)" }}>
                  ↗
                </span>
                <span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: "var(--white)", display: "block" }}>
                    About Nitin Nahata
                  </span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", color: "var(--white-dim)", letterSpacing: "0.06em", display: "block", marginTop: "1px" }}>
                    The making of the operating architecture
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
          .nav-right {
            display: flex;
          }
          @media (max-width: 900px) {
            .nav-right {
              display: none !important;
            }
          }
          .nav-trigger:hover,
          .nav-item:hover .nav-trigger {
            color: var(--gold) !important;
          }
          .nav-item:hover .nav-trigger svg {
            transform: rotate(180deg);
            opacity: 0.8;
          }
          .nav-item:hover .nav-dd {
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0) !important;
          }
          .dd-item:hover {
            background: rgba(201,168,76,0.05) !important;
            border-left-color: var(--gold) !important;
          }
        `}</style>
      </nav>

      {/* Sample Report Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "var(--near-black)",
              border: "1px solid var(--border)",
              borderTop: "2px solid var(--gold)",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "var(--white-dim)",
                cursor: "pointer",
                fontSize: "1.5rem",
                lineHeight: 1,
                padding: "8px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white-dim)")}
            >
              ×
            </button>

            {/* Modal content */}
            <div style={{ padding: "48px" }}>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "12px",
                }}
              >
                Sample Report Preview
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: "24px",
                }}
              >
                Full Diagnostic Report
              </h3>

              {/* Placeholder PDF preview */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  padding: "60px 40px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "3rem",
                    color: "var(--gold-dim)",
                    marginBottom: "20px",
                  }}
                >
                  ◆
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    color: "var(--white-dim)",
                    marginBottom: "8px",
                  }}
                >
                  Sample PDF Report Preview
                </p>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.75rem",
                    color: "var(--white-faint)",
                  }}
                >
                  Full sample report coming soon
                </p>
              </div>

              {/* CTA */}
              <div style={{ marginTop: "32px", textAlign: "center" }}>
                <a
                  href="#fulldiagnostic"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(false);
                    scrollToSection("#fulldiagnostic");
                  }}
                  style={{
                    display: "inline-block",
                    padding: "14px 32px",
                    background: "var(--gold)",
                    color: "var(--black)",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "background 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--gold-light)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--gold)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Take the Full Diagnostic
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
