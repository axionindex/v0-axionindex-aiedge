"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  {
    stage: "Stage 01",
    word: "Belief",
    attrs: ["Founder-led", "Felt before articulated", "Fragile if implicit", "Unscalable alone"],
    failure: "→ Fragility if it stays here",
  },
  {
    stage: "Stage 02",
    word: "Conviction",
    attrs: ["Shared and tested", "Survives disagreement", "Internalised by team", "Transferable"],
    failure: "→ Bureaucracy if it stops here",
  },
  {
    stage: "Stage 03",
    word: "Rhythm",
    attrs: ["Repeatable behaviour", "System-driven", "Consistent decisions", "Scalable and predictable"],
    failure: "→ Breakdown if misaligned",
  },
  {
    stage: "Failure Mode",
    word: "Fragility",
    attrs: ["Belief without conviction", "Conviction without rhythm", "Visible only at crisis", "Structural, not personal"],
    failure: "→ Where most orgs quietly break",
    isRust: true,
  },
];

export function AxionFramework() {
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
      id="framework"
      ref={sectionRef}
      style={{
        background: "var(--ink)",
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
        <div className={`rv ${visible ? "in" : ""}`} style={{ marginBottom: "2.5rem", maxWidth: "720px" }}>
          <div className="sec-lbl">The Signature Framework</div>
          <h2 className="sec-title">
            Every organisation scales through <em>one sequence.</em>
          </h2>
        </div>

        {/* 4-column flow grid */}
        <div
          className={`rv ${visible ? "in" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            border: "1px solid var(--rule)",
            marginBottom: "2rem",
            transitionDelay: "0.2s",
          }}
        >
          {stages.map((s, i) => (
            <div
              key={i}
              style={{
                borderRight: i < 3 ? "1px solid var(--rule)" : "none",
                background: s.isRust ? "rgba(140,59,40,0.06)" : "transparent",
                padding: "2rem 1.5rem",
                position: "relative",
              }}
            >
              {/* Arrow connector */}
              {i < 3 && (
                <div
                  style={{
                    position: "absolute",
                    right: "-14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--gold)",
                    fontSize: "1.2rem",
                    zIndex: 1,
                    background: "var(--ink)",
                    padding: "0 4px",
                  }}
                >
                  →
                </div>
              )}

              {/* Stage label */}
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.54rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: s.isRust ? "var(--rust)" : "var(--gold)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                {s.stage}
              </span>

              {/* Word */}
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.9rem",
                  fontWeight: 600,
                  color: s.isRust ? "var(--rust)" : "var(--parchment)",
                  marginBottom: "1.25rem",
                }}
              >
                {s.word}
              </h3>

              {/* Attributes */}
              <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
                {s.attrs.map((a, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--mist)",
                      lineHeight: 1.8,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: s.isRust ? "var(--rust)" : "var(--gold)", marginTop: "2px" }}>·</span>
                    {a}
                  </li>
                ))}
              </ul>

              {/* Failure state */}
              <div
                style={{
                  borderTop: "1px solid var(--rule2)",
                  paddingTop: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.56rem",
                    letterSpacing: "0.08em",
                    color: "var(--rust)",
                  }}
                >
                  {s.failure}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Caption */}
        <div
          className={`rv ${visible ? "in" : ""}`}
          style={{
            borderLeft: "2px solid var(--gold)",
            paddingLeft: "1.25rem",
            transitionDelay: "0.4s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--mist)",
            }}
          >
            Every Axion Index engagement begins with one question: <strong style={{ color: "var(--parchment)" }}>where in this sequence has your organisation broken down?</strong>
          </p>
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 1000px) {
          section > div > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          section > div > div:nth-child(2) > div:nth-child(2) {
            border-right: none !important;
          }
          section > div > div:nth-child(2) > div:nth-child(3),
          section > div > div:nth-child(2) > div:nth-child(4) {
            border-top: 1px solid var(--rule) !important;
          }
        }
        @media (max-width: 600px) {
          section > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          section > div > div:nth-child(2) > div {
            border-right: none !important;
            border-bottom: 1px solid var(--rule) !important;
          }
          section > div > div:nth-child(2) > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
