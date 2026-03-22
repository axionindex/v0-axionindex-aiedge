"use client";

import { useEffect, useRef, useState } from "react";

const engagements = [
  {
    phase: "Phase 01",
    name: "Initial Diagnostic",
    body: "We begin with a 3-week diagnostic. No consulting theater. No sixty-slide decks. A sharp, evidence-based assessment of where your operating system is breaking — and why.",
    output: "Output: Diagnostic Brief + Risk Architecture",
  },
  {
    phase: "Phase 02",
    name: "Design Sprint",
    body: "Three-week intensive. We redesign the specific system that's breaking — workforce structure, decision rights, compliance architecture, AI-readiness.",
    output: "Output: Architecture + Implementation Playbook",
  },
  {
    phase: "Phase 03",
    name: "Embedded Advisory",
    body: "Optional ongoing partnership. We sit alongside leadership as the operating system is built — ensuring design intent survives implementation.",
    output: "Output: Monthly architecture review + crisis response",
  },
];

export function AxionHowWeWork() {
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
      id="how-we-work"
      ref={sectionRef}
      style={{
        background: "var(--parchment)",
        color: "var(--ink)",
        padding: "6rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        {/* Section header */}
        <div className={`rv ${visible ? "in" : ""}`} style={{ marginBottom: "3rem", maxWidth: "720px" }}>
          <div className="sec-lbl-rust">How We Work</div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "var(--ink)",
              marginBottom: "1.25rem",
            }}
          >
            Three phases. <em style={{ fontStyle: "italic", color: "var(--rust)" }}>One architecture.</em>
          </h2>
        </div>

        {/* 3-column engagement grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {engagements.map((e, i) => (
            <div
              key={i}
              className={`rv ${visible ? "in" : ""}`}
              style={{
                background: "var(--warm)",
                borderTop: "3px solid var(--rust)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                transitionDelay: `${i * 0.1}s`,
                position: "relative",
              }}
            >
              {/* Arrow between cards */}
              {i < 2 && (
                <div
                  className="hide-mobile"
                  style={{
                    position: "absolute",
                    right: "-1.5rem",
                    top: "50%",
                    transform: "translate(50%, -50%)",
                    color: "var(--rust)",
                    fontSize: "1.5rem",
                    zIndex: 1,
                    background: "var(--parchment)",
                    padding: "0 8px",
                  }}
                >
                  →
                </div>
              )}

              {/* Phase label */}
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.54rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--rust)",
                  marginBottom: "1rem",
                }}
              >
                {e.phase}
              </span>

              {/* Name */}
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: "1rem",
                }}
              >
                {e.name}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.75,
                  color: "var(--dim)",
                  flex: 1,
                }}
              >
                {e.body}
              </p>

              {/* Output line */}
              <div
                style={{
                  borderTop: "1px solid rgba(140,59,40,0.15)",
                  paddingTop: "1rem",
                  marginTop: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.06em",
                    color: "var(--rust)",
                  }}
                >
                  {e.output}
                </span>
              </div>
            </div>
          ))}
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
