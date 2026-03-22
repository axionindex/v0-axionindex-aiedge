"use client";

import { useEffect, useRef, useState } from "react";

const domains = [
  {
    num: "Domain 01",
    name: "Operating Architecture for Startups & Scaleups",
    body: "Designing people operating systems for founder-led organisations before structure hardens. From Seed through Series B to IPO — each stage has distinct operating physics that generic HR frameworks cannot address.",
    proof: "Active across 6 founder-led organisations · Seed to Series C",
  },
  {
    num: "Domain 02",
    name: "Labour Code Readiness as Organisational Design",
    body: "India's new Labour Codes are not primarily regulatory. They are mirrors exposing institutional design debt. We translate legislative complexity into founder-facing architecture — compliance as a people system, not a legal checkbox.",
    proof: "3i Labour Code Readiness Index™ — live diagnostic tool",
  },
  {
    num: "Domain 03",
    name: "AI & Work Redesign",
    body: "Understanding which layers of work are compressing, which are defensible, and how to redesign roles, decision rights, and compensation before AI-led role collapse becomes a workforce event.",
    proof: "AI Edge Lab diagnostics — Quick Mirror & Full Diagnostic live",
  },
  {
    num: "Domain 04",
    name: "Family Business HR",
    body: "Loyalty vs. merit tensions, patriarch authority structures, multi-generational belief systems — we build operating logic for organisations where blood and business intersect.",
    proof: "Frameworks deployed across 4 family business transitions",
  },
  {
    num: "Domain 05",
    name: "Governance & Decision Ownership",
    body: "Who owns what decision — and where the accountability gap is silently creating execution risk. We design decision rights, consequence structures, and governance logic that holds under pressure without becoming bureaucracy.",
    proof: "Led HR risk architecture across Tata, Udaan, Gameskraft",
  },
  {
    num: "Domain 06",
    name: "HR as Risk Architecture & Crisis Response",
    body: "People systems as predictive infrastructure. And when crisis arrives — regulatory shock, existential threat, restructuring — leading through it while protecting dignity and trust is a distinct discipline.",
    proof: "Gameskraft regulatory crisis, 2024 — led response end to end",
  },
];

export function AxionDomains() {
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
      id="domains"
      ref={sectionRef}
      style={{
        background: "var(--ink2)",
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
        <div className={`rv ${visible ? "in" : ""}`} style={{ marginBottom: "3.5rem" }}>
          <div className="sec-lbl">Domains of Work</div>
          <h2 className="sec-title">
            Where we <em>go deep.</em>
          </h2>
        </div>

        {/* 3x2 Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {domains.map((d, i) => (
            <div
              key={i}
              className={`rv card-hover ${visible ? "in" : ""}`}
              style={{
                background: "transparent",
                border: "1px solid var(--rule)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              {/* Top bar animation */}
              <div className="top-bar top-bar-gold" style={{ height: "2px" }} />

              {/* Domain number */}
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.54rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                {d.num}
              </span>

              {/* Name */}
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: "var(--parchment)",
                  marginBottom: "1rem",
                }}
              >
                {d.name}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  color: "var(--mist)",
                  flex: 1,
                }}
              >
                {d.body}
              </p>

              {/* Proof line */}
              <div
                style={{
                  borderTop: "1px solid var(--rule2)",
                  paddingTop: "1rem",
                  marginTop: "1.25rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.04em",
                    color: "var(--gold)",
                  }}
                >
                  {d.proof}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 1000px) {
          section > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 650px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
