"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const instruments = [
  {
    id: "ai-edge-lab",
    label: "Live",
    name: "AI Edge Lab",
    tagline: "The Structural Economics of Work in the AI Era",
    description:
      "Diagnostic instruments measuring how AI restructures professional value. Includes the E.D.G.E. Framework, Quick Mirror assessment, and Full Diagnostic with Salary Defensibility Score.",
    href: "/ai-edge-lab",
    color: "var(--gold)",
    features: ["E.D.G.E. Framework", "Quick Mirror (Free)", "Full Diagnostic", "Salary Defensibility Score"],
  },
  {
    id: "capital-alignment",
    label: "Coming 2025",
    name: "Capital Alignment Index",
    tagline: "Measuring Institutional Positioning for Structural Shifts",
    description:
      "Diagnostic framework for institutional investors and allocators measuring portfolio resilience against structural economic transitions.",
    href: "#",
    color: "var(--slate)",
    features: ["Sector Exposure Mapping", "Transition Risk Scoring", "Structural Hedge Analysis"],
    disabled: true,
  },
  {
    id: "governance-futures",
    label: "Coming 2026",
    name: "Governance Futures",
    tagline: "Decision Architecture for AI-Native Organisations",
    description:
      "Framework for redesigning organisational decision rights, accountability structures, and governance models for hybrid human-AI operations.",
    href: "#",
    color: "var(--rust)",
    features: ["Decision Rights Mapping", "Accountability Redesign", "Hybrid Governance Models"],
    disabled: true,
  },
];

export function AxionInstruments() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instruments"
      style={{
        padding: "100px 32px 120px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Section Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "72px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "none" : "translateY(20px)",
          transition: "all 0.7s ease",
        }}
      >
        <span className="sec-lbl">Instruments</span>
        <h2 className="sec-title" style={{ maxWidth: "700px", margin: "0 auto" }}>
          Diagnostic tools for{" "}
          <em>structural</em> positioning
        </h2>
      </div>

      {/* Instruments Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "24px",
        }}
      >
        {instruments.map((instrument, index) => (
          <div
            key={instrument.id}
            style={{
              background: "rgba(20,20,20,0.6)",
              border: "1px solid var(--border)",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              minHeight: "420px",
              position: "relative",
              overflow: "hidden",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(30px)",
              transition: `all 0.7s ease ${0.1 + index * 0.1}s`,
            }}
          >
            {/* Status Label */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: instrument.disabled ? "rgba(245,242,236,0.35)" : instrument.color,
                padding: "4px 10px",
                border: `1px solid ${instrument.disabled ? "rgba(245,242,236,0.15)" : `${instrument.color}40`}`,
              }}
            >
              {instrument.label}
            </div>

            {/* Accent line */}
            <div
              style={{
                width: "40px",
                height: "3px",
                background: instrument.color,
                marginBottom: "24px",
                opacity: instrument.disabled ? 0.4 : 1,
              }}
            />

            {/* Name */}
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.7rem",
                fontWeight: 600,
                color: instrument.disabled ? "rgba(245,242,236,0.5)" : "var(--parchment)",
                marginBottom: "8px",
              }}
            >
              {instrument.name}
            </h3>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 400,
                color: instrument.disabled ? "rgba(245,242,236,0.3)" : instrument.color,
                marginBottom: "20px",
              }}
            >
              {instrument.tagline}
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 300,
                lineHeight: 1.7,
                color: instrument.disabled ? "rgba(245,242,236,0.3)" : "rgba(245,242,236,0.6)",
                flex: 1,
              }}
            >
              {instrument.description}
            </p>

            {/* Features */}
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "24px",
                marginBottom: "28px",
              }}
            >
              {instrument.features.map((feature) => (
                <li
                  key={feature}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: instrument.disabled ? "rgba(245,242,236,0.25)" : "rgba(245,242,236,0.5)",
                    padding: "5px 10px",
                    background: instrument.disabled ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            {instrument.disabled ? (
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(245,242,236,0.25)",
                  padding: "14px 0",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "not-allowed",
                }}
              >
                Coming Soon
              </span>
            ) : (
              <Link
                href={instrument.href}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: instrument.color,
                  padding: "14px 0",
                  textAlign: "center",
                  border: `1px solid ${instrument.color}50`,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${instrument.color}10`;
                  e.currentTarget.style.borderColor = instrument.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = `${instrument.color}50`;
                }}
              >
                Enter Instrument →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
