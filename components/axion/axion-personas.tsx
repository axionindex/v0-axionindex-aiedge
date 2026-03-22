"use client";

import { useEffect, useRef, useState } from "react";

const personas = [
  {
    role: "Founder / CEO",
    title: "You feel something is breaking before you can name it",
    body: "Most founder-led companies don't fail on strategy. They fail because the belief that built the company never became conviction that could survive the founder's absence.",
    outcome: "→ Reduce founder dependency risk before it becomes a board conversation",
  },
  {
    role: "CFO",
    title: "Workforce is your largest cost — and your least understood system",
    body: "Labour codes, workforce classification, payroll controls, and operating structure are not HR problems. They are cost, risk, and liability problems. Axion Index translates these into the language of financial exposure — before they become balance-sheet events.",
    outcome: "→ Expose hidden compliance cost before the regulator does",
  },
  {
    role: "CHRO",
    title: "You are solving problems that are not \"HR problems\"",
    body: "Engagement surveys, culture decks, and L&D calendars are not people systems. A people system is infrastructure — designed for load, tested for failure, built before the crisis demands it.",
    outcome: "→ Improve decision clarity across leadership before structure hardens",
  },
  {
    role: "Board",
    title: "You see outcomes — not the system producing them",
    body: "Decision latency, founder dependency curves, regretted attrition, cultural contract integrity — these are the real signals. Boards that wait for these to appear in P&L data are always acting too late.",
    outcome: "→ Design systems that scale without breaking under growth pressure",
  },
];

export function AxionPersonas() {
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
      id="personas"
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
        <div className={`rv ${visible ? "in" : ""}`} style={{ marginBottom: "3.5rem", maxWidth: "720px" }}>
          <div className="sec-lbl-rust">What This Means for You</div>
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
            Different leaders. <em style={{ fontStyle: "italic", color: "var(--rust)" }}>Same underlying problem.</em>
          </h2>
        </div>

        {/* 2x2 Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
        >
          {personas.map((p, i) => (
            <div
              key={i}
              className={`rv card-hover ${visible ? "in" : ""}`}
              style={{
                background: "var(--warm)",
                borderLeft: "3px solid var(--rust)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Role label */}
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
                {p.role}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: "var(--ink)",
                  marginBottom: "1rem",
                }}
              >
                {p.title}
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
                {p.body}
              </p>

              {/* Outcome line */}
              <div
                style={{
                  borderTop: "1px solid rgba(140,59,40,0.15)",
                  paddingTop: "1rem",
                  marginTop: "1.25rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                    color: "var(--rust)",
                  }}
                >
                  {p.outcome}
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
