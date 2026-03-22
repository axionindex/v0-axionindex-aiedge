"use client";

import { useEffect, useRef, useState } from "react";

const notColumns = [
  {
    label: "Not a consulting firm",
    desc: "We don't sell time by the hour or pad deliverables. We sell outcomes — and instruments that make those outcomes measurable.",
  },
  {
    label: "Not an HR vendor",
    desc: "We don't implement systems. We design the logic that systems should encode — and build what doesn't exist.",
  },
  {
    label: "Not a tech company",
    desc: "Technology is a byproduct of thinking, not a substitute for it. HROS exists because the architecture came first.",
  },
];

const isColumns = [
  {
    label: "Operating Intelligence Advisory",
    desc: "We diagnose, design, and build the invisible architecture that determines whether organisations scale — or break.",
  },
  {
    label: "Instrument Builders",
    desc: "Where the market lacks tools, we build them. Not as products first, but as codifications of frameworks that work.",
  },
  {
    label: "System Architects",
    desc: "We think in structure, not programs. Infrastructure, not initiatives. Systems that compound, not projects that expire.",
  },
];

export function AxionPositioning() {
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
      id="positioning"
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
        <div className={`rv ${visible ? "in" : ""}`} style={{ marginBottom: "3rem" }}>
          <div className="sec-lbl">What We Are</div>
          <h2 className="sec-title">
            Clear positioning. <em>No category confusion.</em>
          </h2>
        </div>

        {/* 2-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          {/* Left - NOT column */}
          <div
            className={`rv ${visible ? "in" : ""}`}
            style={{
              border: "1px solid var(--rule)",
              transitionDelay: "0.15s",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "2px solid var(--rust)",
                background: "rgba(140,59,40,0.06)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--rust)",
                }}
              >
                What we are not
              </span>
            </div>

            {/* Items */}
            {notColumns.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: i < notColumns.length - 1 ? "1px solid var(--rule2)" : "none",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "var(--parchment)",
                    marginBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ color: "var(--rust)" }}>✗</span>
                  {item.label}
                </h4>
                <p
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                    color: "var(--mist)",
                    paddingLeft: "1.25rem",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right - IS column */}
          <div
            className={`rv ${visible ? "in" : ""}`}
            style={{
              border: "1px solid var(--gold)",
              transitionDelay: "0.25s",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "2px solid var(--gold)",
                background: "var(--gold-dim)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                What we are
              </span>
            </div>

            {/* Items */}
            {isColumns.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: i < isColumns.length - 1 ? "1px solid var(--rule2)" : "none",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "var(--parchment)",
                    marginBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ color: "var(--gold)" }}>→</span>
                  {item.label}
                </h4>
                <p
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                    color: "var(--mist)",
                    paddingLeft: "1.25rem",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 800px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
