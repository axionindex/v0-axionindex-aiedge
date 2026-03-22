"use client";

import { useEffect, useRef, useState } from "react";

const layers = [
  {
    layer: "Layer One",
    sublabel: "Source of Thinking",
    name: "Nitin Nahata",
    role: "The Practitioner-Philosopher",
    barColor: "var(--gold)",
    arrow: "↳ The intellectual source",
    body: "22 years across Tata, Udaan, and Gameskraft. Author of Baptism by Chaos and the Operating Architect framework.",
  },
  {
    layer: "Layer Two",
    sublabel: "Platform of Ideas",
    name: "Axion Index",
    role: "The Organisation & Intellectual Platform",
    barColor: "var(--rust)",
    arrow: "↳ Where frameworks become reference systems",
    body: "Publishing, research, and diagnostic body. Think tank, content platform, toolkit — for founders, CHROs, boards, and the next generation of operating architects.",
  },
  {
    layer: "Layer Three",
    sublabel: "System of Execution",
    name: "HROS",
    role: "The Technology Product",
    barColor: "var(--steel)",
    arrow: "↳ The framework as software · Coming soon",
    body: "Intelligent payroll as the wedge. A people operating system as the destination. Belief → Conviction → Rhythm as software.",
  },
];

export function AxionArchitecture() {
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
      id="architecture"
      ref={sectionRef}
      style={{
        background: "var(--slate)",
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
          <div className="sec-lbl">The Architecture</div>
          <h2 className="sec-title">
            Three layers. <em>One system.</em>
          </h2>
        </div>

        {/* 3-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {layers.map((l, i) => (
            <div
              key={i}
              className={`rv ${visible ? "in" : ""}`}
              style={{
                background: "rgba(12,11,9,0.4)",
                borderTop: `3px solid ${l.barColor}`,
                padding: "2rem",
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              {/* Layer label */}
              <div style={{ marginBottom: "1.25rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.54rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: l.barColor,
                  }}
                >
                  {l.layer}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.54rem",
                    letterSpacing: "0.08em",
                    color: "var(--dim)",
                    marginLeft: "8px",
                  }}
                >
                  · {l.sublabel}
                </span>
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 600,
                  color: "var(--parchment)",
                  marginBottom: "0.5rem",
                }}
              >
                {l.name}
              </h3>

              {/* Role */}
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--mist)",
                  marginBottom: "1.25rem",
                }}
              >
                {l.role}
              </p>

              {/* Arrow sublabel */}
              <div
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.06em",
                  color: l.barColor,
                  marginBottom: "1rem",
                  opacity: 0.8,
                }}
              >
                {l.arrow}
              </div>

              {/* Body */}
              <p
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.75,
                  color: "var(--mist)",
                }}
              >
                {l.body}
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
