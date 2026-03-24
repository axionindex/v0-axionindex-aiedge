"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function AxionHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        background: "var(--ink)",
        position: "relative",
        paddingTop: "72px",
        overflow: "hidden",
      }}
    >
      {/* Radial glows */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "800px",
          height: "800px",
          background: "radial-gradient(ellipse, rgba(196,154,60,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(140,59,40,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "6rem 3rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "5rem",
          alignItems: "center",
          minHeight: "calc(100vh - 72px)",
        }}
      >
        {/* Left Column */}
        <div>
          {/* Eyebrow */}
          <div
            className="hero-anim"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
              animationDelay: "0.2s",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <span style={{ width: "2.5rem", height: "1px", background: "var(--gold)" }} />
            <span
              style={{
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.64rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Operating Intelligence · Bengaluru · 2026
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-anim"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
              fontWeight: 700,
              lineHeight: 0.93,
              letterSpacing: "-0.025em",
              color: "var(--parchment)",
              marginBottom: "1.5rem",
              animationDelay: "0.36s",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.6s ease 0.16s",
            }}
          >
            What holds
            <br />
            organisations
            <br />
            together is
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>invisible.</em>
          </h1>

          {/* Subheadline */}
          <p
            className="hero-anim"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1.4rem",
              color: "var(--mist)",
              marginBottom: "2rem",
              animationDelay: "0.5s",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.6s ease 0.3s",
            }}
          >
            We make it designable.
          </p>

          {/* Deck paragraph */}
          <div
            className="hero-anim"
            style={{
              borderLeft: "2px solid var(--gold)",
              paddingLeft: "1.4rem",
              marginBottom: "2.5rem",
              maxWidth: "540px",
              animationDelay: "0.64s",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.6s ease 0.44s",
            }}
          >
            <p style={{ color: "var(--dim)", lineHeight: 1.85 }}>
              Most organisations don't fail because of strategy.
              They fail because <strong style={{ color: "var(--parchment)" }}>the system underneath cannot carry the strategy.</strong>{" "}
              Axion Index helps organisations diagnose, design, and control the forces that determine whether they scale — or break.
            </p>
          </div>

          {/* Buttons */}
          <div
            className="hero-anim"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              animationDelay: "0.8s",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.6s ease 0.6s",
            }}
          >
            <a href="#what-we-do" className="btn-gold">
              Explore Our Work
            </a>
            <a href="#framework" className="btn-dim">
              Explore the Framework
            </a>
            <Link
              href="https://www.axionindex.org/quick-mirror"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-steel"
            >
              Quick Mirror — Free ↗
            </Link>
          </div>
        </div>

        {/* Right Column - AI Edge Lab Panel */}
        <div
          className="hero-anim hide-mobile"
          style={{
            background: "rgba(10,14,24,0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--srule)",
            animationDelay: "0.5s",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          {/* Panel Header */}
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid var(--srule)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                className="live-dot"
                style={{
                  width: "6px",
                  height: "6px",
                  background: "var(--green)",
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--steel-lt)",
                }}
              >
                The AI Edge Lab
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--dim)",
              }}
            >
              Live Instruments
            </span>
          </div>

          {/* Instrument Rows */}
          {[
            { name: "Quick Mirror", desc: "5 min · AI exposure check · Free · Instant", status: "live", href: "/quick-mirror" },
            { name: "Full Diagnostic — Coming Soon", desc: "30 min · Edge Score · PDF report · Paid", status: "soon", href: "#" },
            { name: "3i Labour Code Readiness Index™", desc: "Classify · Cost · Comply", status: "live", href: "#aiedge" },
            { name: "Workforce Architecture Diagnostics™", desc: "Structure · Control · Risk", status: "building", href: "#aiedge" },
            { name: "AI Exposure & Work Compression", desc: "Roles · Automation · Redesign", status: "building", href: "#aiedge" },
            { name: "Decision Ownership Models™", desc: "Authority · Accountability · Speed", status: "soon", href: "#aiedge" },
            { name: "Payroll Operating Control", desc: "Compliance · Controls · Architecture", status: "soon", href: "#aiedge" },
          ].map((item, i) => {
            const isClickable = item.status === "live" && (item.href === "/quick-mirror" || item.href === "/full-diagnostic");
            const content = (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "20px 1fr auto",
                  gap: "12px",
                  alignItems: "center",
                  padding: "10px 1.5rem",
                  background: "rgba(74,107,138,0.03)",
                  borderBottom: i < 6 ? "1px solid rgba(74,107,138,0.1)" : "none",
                  transition: "background 0.15s",
                  cursor: isClickable ? "pointer" : "default",
                }}
              >
                <span style={{ color: "var(--steel-lt)", fontSize: "0.85rem" }}>→</span>
                <div>
                  <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "var(--parchment)", marginBottom: "2px" }}>
                    {item.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", color: "var(--dim)", letterSpacing: "0.05em" }}>
                    {item.desc}
                  </div>
                </div>
                <StatusBadge status={item.status as "live" | "building" | "soon"} />
              </div>
            );

            if (isClickable) {
              return (
                <Link
                  key={i}
                  href={`https://www.axionindex.org${item.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  {content}
                </Link>
              );
            }
            return <div key={i}>{content}</div>;
          })}

          {/* Panel Footer */}
          <div
            style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid var(--srule)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.1em",
                color: "var(--dim)",
              }}
            >
              axionindex.org · AI Edge Lab
            </span>
            <Link
              href="https://www.axionindex.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.56rem",
                letterSpacing: "0.1em",
                color: "var(--steel-lt)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Open Lab →
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style jsx>{`
        @media (max-width: 1100px) {
          section > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function StatusBadge({ status }: { status: "live" | "building" | "soon" }) {
  const styles: Record<string, { bg: string; color: string; dot: string; label: string }> = {
    live: { bg: "var(--green-dim)", color: "var(--green)", dot: "●", label: "Live" },
    building: { bg: "var(--gold-dim)", color: "var(--gold)", dot: "◐", label: "Building" },
    soon: { bg: "rgba(107,99,88,0.2)", color: "var(--dim)", dot: "○", label: "Soon" },
  };
  const s = styles[status];

  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
        fontSize: "0.48rem",
        letterSpacing: "0.06em",
        padding: "3px 6px",
        background: s.bg,
        color: s.color,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: "0.5rem" }}>{s.dot}</span>
      {s.label}
    </span>
  );
}
