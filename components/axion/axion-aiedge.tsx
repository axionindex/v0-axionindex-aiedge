"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const tools = [
  {
    name: "Quick Mirror",
    desc: "5-minute AI exposure assessment. Instant results. No cost.",
    status: "Free · Live",
    live: true,
    href: "/quick-mirror",
    borderColor: "var(--green)",
  },
  {
    name: "Full Diagnostic",
    desc: "30-minute deep analysis. Edge Score. Detailed PDF report.",
    status: "Paid · Live",
    live: true,
    href: "/full-diagnostic",
    borderColor: "var(--gold)",
  },
  {
    name: "Workforce Architecture Diagnostics™",
    desc: "Structural risk mapping for people systems.",
    status: "◐ Building",
    building: true,
    href: "https://www.axionindex.org/",
    borderColor: "var(--gold)",
  },
  {
    name: "Decision Ownership Models™",
    desc: "Authority and accountability architecture.",
    status: "○ Coming Soon",
    soon: true,
    href: "https://www.axionindex.org/",
    borderColor: "var(--dim)",
  },
];

export function AxionAIEdge() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="aiedge"
      ref={sectionRef}
      style={{
        background: "linear-gradient(160deg, #080d16, #0c1220, #080d16)",
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "3rem",
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontSize: "8rem",
          fontWeight: 700,
          color: "rgba(74,107,138,0.05)",
          lineHeight: 1,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        AI EDGE LAB
      </div>

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 3rem",
          position: "relative",
        }}
      >
        {/* Breadcrumb */}
        <div
          className={`rv ${visible ? "in" : ""}`}
          style={{ marginBottom: "2rem" }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.12em",
              color: "var(--steel-lt)",
              padding: "6px 12px",
              background: "rgba(74,107,138,0.12)",
            }}
          >
            axionindex.org / The AI Edge Lab
          </span>
        </div>

        {/* Section header */}
        <div className={`rv ${visible ? "in" : ""}`} style={{ marginBottom: "3rem", maxWidth: "720px" }}>
          <div
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--steel-lt)",
              marginBottom: "1rem",
            }}
          >
            The AI Edge Lab — Diagnostic Engine
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "var(--parchment)",
              marginBottom: "1.25rem",
            }}
          >
            Operating intelligence, <em style={{ fontStyle: "italic", color: "var(--steel-lt)" }}>made measurable.</em>
          </h2>
        </div>

        {/* 2-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "2rem",
          }}
        >
          {/* Left - Featured live card */}
          <div
            className={`rv ${visible ? "in" : ""}`}
            style={{
              border: "1px solid var(--green)",
              background: "rgba(91,173,122,0.05)",
              padding: "2rem",
              transitionDelay: "0.15s",
            }}
          >
            {/* Live badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
              <span className="live-dot" style={{ width: "8px", height: "8px", background: "var(--green)", borderRadius: "50%" }} />
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.56rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--green)",
                }}
              >
                Live Now
              </span>
            </div>

            {/* Label */}
            <div
              style={{
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.64rem",
                letterSpacing: "0.12em",
                color: "var(--green)",
                marginBottom: "0.75rem",
              }}
            >
              3i Labour Code Readiness Index™
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "var(--parchment)",
                marginBottom: "1rem",
              }}
            >
              Classify. Cost. Comply.
            </h3>

            {/* Body */}
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "var(--mist)",
                marginBottom: "1.5rem",
              }}
            >
              India&apos;s new Labour Codes require a fundamental shift in how organisations classify workers, calculate cost, and demonstrate compliance. This diagnostic maps your exposure across all three dimensions — and translates it into decisions your CFO and board can act on immediately.
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.75rem" }}>
              {["Classify", "Cost", "Comply"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.54rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    border: "1px solid var(--srule)",
                    color: "var(--steel-lt)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/quick-mirror" className="btn-gold" style={{ padding: "12px 24px" }}>
                Quick Mirror — Free →
              </Link>
              <Link
                href="https://www.axionindex.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-steel"
                style={{ padding: "12px 24px" }}
              >
                Full AI Edge Lab ↗
              </Link>
            </div>
          </div>

          {/* Right - 2x2 tools grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
          >
            {tools.map((t, i) => (
              <Link
                key={i}
                href={t.href}
                target={t.href.startsWith("http") ? "_blank" : undefined}
                rel={t.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`rv ${visible ? "in" : ""}`}
                style={{
                  border: `1px solid ${t.borderColor}`,
                  background: t.live ? `${t.borderColor}10` : "transparent",
                  padding: "1.5rem",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  transitionDelay: `${0.2 + i * 0.08}s`,
                  transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  if (!t.soon) e.currentTarget.style.borderColor = t.live ? "var(--green)" : "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = t.borderColor;
                }}
              >
                {/* Status badge */}
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.5rem",
                    letterSpacing: "0.1em",
                    color: t.live ? "var(--green)" : t.building ? "var(--gold)" : "var(--dim)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {t.status}
                </span>

                {/* Name */}
                <h4
                  style={{
                    fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "var(--parchment)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t.name}
                </h4>

                {/* Desc */}
                <p
                  style={{
                    fontSize: "0.78rem",
                    lineHeight: 1.6,
                    color: "var(--dim)",
                    flex: 1,
                  }}
                >
                  {t.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 900px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
