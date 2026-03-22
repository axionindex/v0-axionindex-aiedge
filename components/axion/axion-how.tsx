"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    label: "Diagnose",
    title: "Name what is actually breaking",
    body: "We use the AI Edge Lab's diagnostic instruments — alongside direct sessions with founders and leadership — to identify where in the Belief → Conviction → Rhythm sequence the organisation has broken down. We name it precisely before we touch anything.",
  },
  {
    num: "02",
    label: "Design",
    title: "Architect the system that holds",
    body: "We design the people operating system — decision rights, consequence structures, governance logic, cultural contracts — that the organisation actually needs at its current stage. Not imported from a larger institution.",
  },
  {
    num: "03",
    label: "Deploy",
    title: "Make it operational — or run it as software",
    body: "Design without deployment is theory. Frameworks run inside the organisation through leadership workshops and governance tools — or through HROS, the people operating system built for startups and scaleups.",
  },
];

export function AxionHow() {
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
          <div className="sec-lbl">How We Work</div>
          <h2 className="sec-title">
            From diagnosis <em>to redesign.</em>
          </h2>
        </div>

        {/* 3-column step grid */}
        <div
          className={`rv ${visible ? "in" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            border: "1px solid var(--rule)",
            marginBottom: "2rem",
            transitionDelay: "0.15s",
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                borderRight: i < 2 ? "1px solid var(--rule)" : "none",
                padding: "2.5rem 2rem",
                position: "relative",
              }}
            >
              {/* Arrow connector */}
              {i < 2 && (
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

              {/* Number */}
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "2rem",
                  fontWeight: 500,
                  color: "var(--gold)",
                  opacity: 0.3,
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {s.num}
              </span>

              {/* Label */}
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                {s.label}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: "var(--parchment)",
                  marginBottom: "1rem",
                }}
              >
                {s.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  color: "var(--mist)",
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          className={`rv ${visible ? "in" : ""}`}
          style={{
            borderLeft: "2px solid var(--rust)",
            paddingLeft: "1.25rem",
            transitionDelay: "0.3s",
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
            We do not optimise processes. <strong style={{ color: "var(--parchment)" }}>We redesign systems.</strong>
          </p>
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 900px) {
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
