"use client";

import { useEffect, useState } from "react";

export function AxionHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "120px 32px 80px",
        position: "relative",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.8s ease 0.2s",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold)",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ width: "24px", height: "1px", background: "var(--gold)", opacity: 0.5 }} />
          Est. 2024
          <span style={{ width: "24px", height: "1px", background: "var(--gold)", opacity: 0.5 }} />
        </span>
      </div>

      {/* Main Headline */}
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
          fontWeight: 500,
          lineHeight: 1.05,
          color: "var(--parchment)",
          maxWidth: "900px",
          marginTop: "32px",
          marginBottom: "28px",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          transition: "all 0.8s ease 0.4s",
        }}
      >
        Instruments for the{" "}
        <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Structural</em>{" "}
        Economy
      </h1>

      {/* Subhead */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
          fontWeight: 300,
          lineHeight: 1.7,
          color: "rgba(245,242,236,0.55)",
          maxWidth: "580px",
          marginBottom: "48px",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          transition: "all 0.8s ease 0.6s",
        }}
      >
        Research-grade diagnostic instruments and strategic frameworks for individuals
        and institutions navigating structural economic shifts.
      </p>

      {/* CTA */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          transition: "all 0.8s ease 0.8s",
        }}
      >
        <a href="#instruments" className="btn-p">
          Explore Instruments
        </a>
        <a href="#thesis" className="btn-g">
          Read the Thesis
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: visible ? 0.4 : 0,
          transition: "opacity 0.8s ease 1.2s",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--parchment)",
          }}
        >
          Scroll
        </span>
        <svg width="12" height="24" viewBox="0 0 12 24" fill="none" stroke="var(--parchment)" strokeWidth="1">
          <path d="M6 0v20M1 15l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
