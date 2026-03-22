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
          background: "radial-gradient(ellipse, rgba(196,154,60,0.06) 0%, transparent 60%)",
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
          background: "radial-gradient(ellipse, rgba(140,59,40,0.04) 0%, transparent 60%)",
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
              fontSize: "clamp(4rem, 8.5vw, 8rem)",
              fontWeight: 700,
              lineHeight: 0.91,
              letterSpacing: "-0.025em",
              color: "var(--parchment)",
              marginBottom: "2.5rem",
              animationDelay: "0.38s",
              opacity: loaded ? 1 : 0,
            }}
          >
            Codified
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Energy</em>
            <br />
            for the
            <br />
            Unfinished
          </h1>

          {/* Subheadline */}
          <p
            className="hero-anim"
            style={{
              fontSize: "1.08rem",
              color: "var(--mist)",
              maxWidth: "46ch",
              lineHeight: 1.7,
              borderLeft: "2px solid var(--gold)",
              paddingLeft: "1.4rem",
              marginBottom: "1.5rem",
              animationDelay: "0.55s",
              opacity: loaded ? 1 : 0,
            }}
          >
            Most organisations are not underprepared because they lack strategy.
            They are underprepared because <strong style={{ color: "var(--parchment)" }}>the system underneath work is fragmented.</strong>
          </p>

          {/* Mission line */}
          <p
            className="hero-anim"
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.66rem",
              letterSpacing: "0.08em",
              color: "var(--dim)",
              maxWidth: "50ch",
              marginBottom: "2.5rem",
              animationDelay: "0.68s",
              opacity: loaded ? 1 : 0,
            }}
          >
            <strong style={{ color: "var(--mist)" }}>In plain terms —</strong> We help you diagnose, redesign, and control that system before it breaks.
          </p>

          {/* Buttons */}
          <div
            className="hero-anim"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              animationDelay: "0.82s",
              opacity: loaded ? 1 : 0,
            }}
          >
            <a href="#what-we-do" className="btn-gold">
              Explore Our Work
            </a>
            <Link
              href="https://www.axionindex.org/quick-mirror"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-steel"
            >
              Quick Mirror — Free ↗
            </Link>
            <a href="#cta" className="btn-dim">
              Start a Conversation
            </a>
          </div>
        </div>

        {/* Right Column - Live Instruments Panel */}
        <div
          className="hero-anim hide-mobile"
          style={{
            background: "linear-gradient(160deg, rgba(74,107,138,0.08), rgba(42,74,104,0.12))",
            border: "1px solid var(--srule)",
            padding: "0",
            animationDelay: "0.55s",
            opacity: loaded ? 1 : 0,
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
            <div>
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.56rem",
                  letterSpacing: "0.18em",
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
            { icon: "→", name: "Quick Mirror", desc: "5 min · AI exposure · Free", status: "Live", live: true },
            { icon: "→", name: "Full Diagnostic", desc: "30 min · Edge Score · PDF", status: "Live", live: true },
            { icon: "→", name: "3i Labour Code Index™", desc: "Classify · Cost · Comply", status: "Live", live: true },
            { icon: "→", name: "Workforce Architecture", desc: "Structure · Control · Risk", status: "Building", building: true },
            { icon: "→", name: "Decision Ownership™", desc: "Authority · Accountability", status: "Soon", soon: true },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "24px 1fr auto",
                gap: "12px",
                alignItems: "center",
                padding: "1rem 1.5rem",
                borderBottom: i < 4 ? "1px solid var(--srule)" : "none",
              }}
            >
              <span style={{ color: "var(--steel-lt)", fontSize: "0.9rem" }}>{item.icon}</span>
              <div>
                <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "var(--parchment)", marginBottom: "2px" }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", color: "var(--dim)", letterSpacing: "0.06em" }}>
                  {item.desc}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: item.live ? "var(--green)" : item.building ? "var(--gold)" : "var(--dim)",
                  }}
                  className={item.live ? "live-dot" : ""}
                />
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.52rem",
                    letterSpacing: "0.08em",
                    color: item.live ? "var(--green)" : item.building ? "var(--gold)" : "var(--dim)",
                  }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}

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
