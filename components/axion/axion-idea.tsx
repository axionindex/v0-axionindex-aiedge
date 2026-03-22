"use client";

import { useEffect, useRef, useState } from "react";

const forces = [
  {
    code: "Ax · 01",
    name: "Belief Systems",
    body: "The founding conviction. Felt before it can be articulated. Fragile if it lives in one person's head. Everything traces back to this.",
  },
  {
    code: "Ax · 02",
    name: "Operating Rhythm",
    body: "Conviction made repeatable. Consistent decisions, predictable culture, governance that holds under pressure. This is what scales.",
  },
  {
    code: "Ax · 03",
    name: "Decision Architecture",
    body: "Who owns what. Where authority lives. How consequence is distributed. The invisible structure underneath every outcome.",
  },
  {
    code: "Ax · 04",
    name: "Human Energy",
    body: "Not human capital — people as depreciating assets. Human energy: dynamic, non-finite, the true source of organisational velocity.",
  },
];

export function AxionIdea() {
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
      id="axion-idea"
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
          <div className="sec-lbl">The Axion Idea</div>
          <h2 className="sec-title">
            What holds organisations together <em>is invisible.</em>
          </h2>
        </div>

        {/* 2-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
          }}
        >
          {/* Left - Prose + closing box */}
          <div>
            <div className={`rv ${visible ? "in" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <p style={{ fontSize: "1rem", color: "var(--mist)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                In physics, an axion is a theoretical particle that explains the invisible forces holding matter together. It accounts for what the standard model cannot. It is felt, inferred, essential — but never directly observed.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--mist)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                Organisations have the same invisible architecture. Belief systems, operating rhythms, decision structures, and human energy — these are the forces that determine whether growth sustains or collapses. They are rarely designed. They are almost never measured. But they are always present.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--parchment)", lineHeight: 1.85, marginBottom: "2rem", fontWeight: 500 }}>
                Axion Index makes these forces visible. And designable.
              </p>
            </div>

            {/* Closing box */}
            <div
              className={`rv ${visible ? "in" : ""}`}
              style={{
                border: "1px solid var(--rule)",
                padding: "1.75rem",
                transitionDelay: "0.25s",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.15rem",
                  fontStyle: "italic",
                  lineHeight: 1.55,
                  color: "var(--parchment)",
                }}
              >
                &quot;An index is not a ranking. It is a <strong style={{ fontWeight: 600 }}>reference system</strong> — a way of naming, ordering, and making legible what was previously felt but never articulated.&quot;
              </p>
            </div>
          </div>

          {/* Right - 2x2 forces grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
          >
            {forces.map((f, i) => (
              <div
                key={i}
                className={`rv ${visible ? "in" : ""}`}
                style={{
                  border: "1px solid var(--rule)",
                  padding: "1.5rem",
                  transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                  transitionDelay: `${0.15 + i * 0.08}s`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.background = "var(--gold-dim)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--rule)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Code */}
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.56rem",
                    letterSpacing: "0.12em",
                    color: "var(--gold)",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {f.code}
                </span>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "var(--parchment)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {f.name}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.7,
                    color: "var(--mist)",
                  }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 900px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
