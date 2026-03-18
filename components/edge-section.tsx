"use client";

import { useEffect, useRef, useState } from "react";

const edgeDimensions = [
  {
    letter: "E",
    title: "Exposure",
    sub: "How much of your role can AI already do?",
    desc: "The proportion of your current work output that AI tools can produce at comparable quality, speed, and cost. High exposure = high structural risk.",
    color: "var(--gold)",
  },
  {
    letter: "D",
    title: "Decision Density",
    sub: "How much consequence do you own?",
    desc: "The volume and weight of consequential decisions you make — where you alone bear the responsibility for outcomes. This is the core of human economic value.",
    color: "var(--gold)",
  },
  {
    letter: "G",
    title: "Growth of Boundary",
    sub: "Is your authority expanding or contracting?",
    desc: "The trajectory of your decision-making authority over time. Are you being given more consequential work — or is it flowing elsewhere (to AI or others)?",
    color: "var(--gold)",
  },
  {
    letter: "E",
    title: "Economic Anchoring",
    sub: "Is your compensation tied to real scarcity?",
    desc: "Whether your salary is anchored to tasks AI cannot replicate — or to outputs that are already being repriced by the market.",
    color: "var(--gold)",
  },
];

export function EdgeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
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
    <div
      id="edge"
      ref={sectionRef}
      style={{
        background: "var(--black)",
        borderBottom: "1px solid #181818",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 52px",
        }}
      >
        {/* Header */}
        <div className={`reveal ${isVisible ? "vis" : ""}`} style={{ marginBottom: "64px" }}>
          <div className="sec-lbl">The AI Edge Diagnostic™ Framework</div>
          <h2 className="sec-title">
            E.D.G.E. — Four dimensions<br />of structural position.
          </h2>
          <p className="sec-body" style={{ maxWidth: "680px" }}>
            Every professional has a structural position in the AI economy. The E.D.G.E. framework measures that position
            across four interconnected dimensions — revealing your exposure, your leverage, and your trajectory.
          </p>
        </div>

        {/* EDGE Grid */}
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "var(--border)",
          }}
        >
          {edgeDimensions.map((dim, idx) => (
            <div
              key={idx}
              className="edge-card"
              style={{
                background: "var(--near-black)",
                padding: "36px 26px",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.3s",
              }}
            >
              {/* Top border */}
              <div
                className="edge-border"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "var(--gold)",
                  transform: "scaleX(0)",
                  transition: "transform 0.4s",
                  transformOrigin: "left",
                }}
              />

              {/* Large letter */}
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "5.5rem",
                  fontWeight: 900,
                  color: "rgba(201,168,76,0.08)",
                  lineHeight: 1,
                  position: "absolute",
                  top: "10px",
                  right: "16px",
                }}
              >
                {dim.letter}
              </div>

              {/* Small letter */}
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.4rem",
                  fontWeight: 900,
                  color: dim.color,
                  marginBottom: "8px",
                }}
              >
                {dim.letter}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: "4px",
                }}
              >
                {dim.title}
              </h3>

              {/* Sub */}
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  color: "var(--gold-dim)",
                  letterSpacing: "0.05em",
                  marginBottom: "14px",
                }}
              >
                {dim.sub}
              </div>

              {/* Desc */}
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--white-dim)",
                  lineHeight: 1.7,
                }}
              >
                {dim.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .edge-card:hover {
          background: var(--surface) !important;
        }
        .edge-card:hover .edge-border {
          transform: scaleX(1) !important;
        }
        @media (max-width: 900px) {
          .reveal > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .reveal > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
