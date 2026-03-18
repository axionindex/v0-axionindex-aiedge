"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
  {
    label: "Doctrine",
    groups: [
      {
        label: "Philosophy",
        items: [
          { num: "00", title: "Full Philosophy", sub: "The structural economics of work in the AI era", href: "#hero" },
        ],
      },
      {
        label: "The Three Structural Shifts",
        items: [
          { num: "01", title: "Intelligence is Becoming Abundant", sub: "The supply shock — cognitive tasks now done by machines", href: "#shifts" },
          { num: "02", title: "Judgment Becomes the New Scarcity", sub: "The new premium — consequence-bearing decisions", href: "#shifts" },
          { num: "03", title: "Organisations Must Redesign Work", sub: "The operating challenge — before the market forces it", href: "#shifts" },
        ],
      },
      {
        label: "Structural Truths",
        items: [
          { num: "→", title: "Eight Structural Truths", sub: "Realities already visible — not predictions", href: "#truths" },
        ],
      },
      {
        label: "What Must Change",
        items: [
          { num: "05", title: "For the Individual", sub: "Career strategy rewrite", href: "#changes" },
          { num: "06", title: "For the Leader", sub: "Structural question, not a tech question", href: "#changes" },
          { num: "07", title: "For the Organisation", sub: "Workforce strategy means redesigning work itself", href: "#changes" },
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
        label: "Ownership Ladders",
        items: [
          { num: "→", title: "Judgment Ownership Ladder", sub: "I own → I lead → I contribute → I execute", href: "#ownership" },
          { num: "→", title: "Thinking Ownership Ladder", sub: "Original → Adaptive → Synthesis → Application", href: "#ownership" },
        ],
      },
      {
        label: "Diagrams",
        items: [
          { num: "∿", title: "The Brainpower Density Curve™", sub: "Where your value sits — and where it's migrating", href: "#bpdcurve" },
          { num: "05", title: "The Intellectual Stack", sub: "Five instruments — one framework", href: "#stack" },
        ],
      },
    ],
    width: "380px",
  },
  {
    label: "Assessment",
    groups: [
      {
        label: "The AI Edge Framework",
        items: [
          { num: "◈", title: "Types of Work — How Your Role Is Structured", sub: "The three-zone map every professional needs", href: "#workstructure" },
          { num: "◆", title: "AI Dominant", sub: "Value compressing rapidly", href: "#workstructure", color: "red" },
          { num: "◆", title: "AI Assisted", sub: "Human-AI collaboration — active transition zone", href: "#workstructure", color: "amber" },
          { num: "◆", title: "AI Proof", sub: "Irreducibly human — consequence-bearing work", href: "#workstructure", color: "green" },
          { num: "∿", title: "Brainpower Density Curve™", sub: "Where your economic value is migrating", href: "#bpdcurve" },
          { num: "→", title: "Salary Defensibility Score", sub: "Is your compensation justified?", href: "#salary" },
        ],
      },
      {
        label: "Choose Your Instrument",
        items: [
          { num: "◇", title: "Quick Mirror — Free", sub: "5 min · Instant results on page", href: "#quickmirror" },
          { num: "◆", title: "Full Diagnostic — Paid", sub: "30 min · PDF report via email", href: "#fulldiagnostic" },
        ],
      },
      {
        label: "",
        items: [
          { num: "↗", title: "View Sample Report", sub: "See exactly what a Full Diagnostic delivers", href: "#", highlight: true, gold: true },
        ],
      },
    ],
    width: "390px",
    alignRight: 60,
  },
  {
    label: "Insights",
    groups: [
      {
        label: "Articles & Essays — Coming Soon",
        items: [
          { num: "01", title: "When Intelligence Gets Cheap", sub: "The structural argument for why AI changes work permanently", href: "#", disabled: true },
          { num: "02", title: "Is Your Salary Still Defensible?", sub: "How to assess whether your compensation survives", href: "#", disabled: true },
          { num: "03", title: "From Intelligence Worker to Judgment Worker", sub: "The career rebalancing imperative", href: "#", disabled: true },
          { num: "04", title: "The Leadership Question No One Is Asking", sub: "Why most AI strategies miss the operating problem", href: "#", disabled: true },
        ],
      },
      {
        label: "Publications",
        items: [
          { num: "↓", title: "The Doctrine — PDF", sub: "Full manifesto · Laws · Principles · 2026 Edition", href: "#", highlight: true, gold: true },
          { num: "↓", title: "Sample Diagnostic Report — PDF", sub: "See what the Full Diagnostic produces", href: "#", highlight: true, gold: true },
        ],
      },
    ],
    width: "370px",
    alignRight: 60,
  },
  {
    label: "Connect",
    groups: [
      {
        label: "Nitin Nahata",
        items: [
          { num: "↗", title: "LinkedIn", sub: "Weekly AI Edge insights & commentary", href: "https://linkedin.com/in/nitin-nahata", external: true },
          { num: "↗", title: "Personal Page", sub: "HROS · Intelligent Payroll · About Nitin", href: "#" },
        ],
      },
      {
        label: "Stay Connected",
        items: [
          { num: "→", title: "Newsletter & Waitlist", sub: "AI Edge updates · HROS early access", href: "#cta" },
        ],
      },
    ],
    width: "300px",
    alignRight: 0,
  },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
      <Link href="#hero" style={{ display: "flex", alignItems: "center", gap: 0, textDecoration: "none" }}>
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
                    <Link
                      key={mi}
                      href={menuItem.href}
                      target={menuItem.external ? "_blank" : undefined}
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
                        opacity: menuItem.disabled ? 0.5 : 1,
                        pointerEvents: menuItem.disabled ? "none" : "auto",
                        background: menuItem.highlight ? "rgba(201,168,76,0.04)" : "transparent",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.58rem",
                          paddingTop: "2px",
                          letterSpacing: "0.04em",
                          color: menuItem.gold ? "var(--gold)" : menuItem.color === "red" ? "var(--red)" : menuItem.color === "amber" ? "var(--amber)" : menuItem.color === "green" ? "var(--green)" : "var(--white-faint)",
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
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
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
  );
}
