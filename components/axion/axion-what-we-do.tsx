"use client";

import { useEffect, useRef, useState } from "react";

const failurePoints = [
  {
    badge: "Diagnose Risk",
    title: "Workforce, compliance, and structural exposure — made visible",
    body: "Most operating risk is invisible until it becomes a crisis. We surface it first — workforce classification, decision latency, labour code exposure, founder dependency — and give you the architecture to respond before the market forces it.",
  },
  {
    badge: "Redesign Work",
    title: "Roles, accountability, and decision rights — rebuilt for what's coming",
    body: "Most organisations still run on role structures designed for a world where intelligence was scarce. We redesign the architecture — who owns what decision, how work is allocated, and where judgment lives — for an AI-native operating environment.",
  },
  {
    badge: "Translate Regulation",
    title: "Labour codes converted into cost, control, and design decisions",
    body: "India's new Labour Codes are not primarily regulatory events. They are structural mirrors — exposing what your organisation has deferred. We translate legislative complexity into decisions your CFO and board can act on.",
  },
  {
    badge: "Prepare for AI",
    title: "Which layers of work are compressing — and what remains defensible",
    body: "Intelligence is becoming abundant. Judgment is becoming the scarce resource. We map exactly where AI is compressing your organisation's operating model — and redesign the architecture before role collapse becomes a board conversation.",
  },
];

export function AxionWhatWeDo() {
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
      id="what-we-do"
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
        <div
          className={`rv ${visible ? "in" : ""}`}
          style={{ marginBottom: "3.5rem", maxWidth: "720px" }}
        >
          <div className="sec-lbl-rust">What We Do</div>
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
            The system underneath work has <em style={{ fontStyle: "italic", color: "var(--rust)" }}>four failure points.</em>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--dim)",
              maxWidth: "640px",
            }}
          >
            We go deep on each — diagnosing, redesigning, and controlling the architecture before it becomes the reason growth stalls or trust breaks.
          </p>
        </div>

        {/* 2x2 Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
        >
          {failurePoints.map((item, i) => (
            <div
              key={i}
              className={`rv card-hover ${visible ? "in" : ""}`}
              style={{
                background: "var(--warm)",
                borderLeft: "3px solid var(--rust)",
                padding: "2rem",
                position: "relative",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Top bar animation */}
              <div className="top-bar" style={{ background: "var(--rust)" }} />

              {/* Outcome badge */}
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.52rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--rust)",
                  display: "inline-block",
                  marginBottom: "1rem",
                }}
              >
                {item.badge}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: "var(--ink)",
                  marginBottom: "1rem",
                }}
              >
                {item.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.75,
                  color: "var(--dim)",
                }}
              >
                {item.body}
              </p>
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
