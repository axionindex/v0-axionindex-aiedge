"use client";

import { useEffect, useRef, useState } from "react";

const zones = [
  {
    color: "var(--red)",
    colorLight: "rgba(220,80,80,0.12)",
    label: "AI Dominant Zone",
    tag: "Red Zone",
    desc: "Tasks where AI performs at or above human level, at near-zero marginal cost.",
    items: [
      "Research & data synthesis",
      "First-draft writing",
      "Structured analysis",
      "Pattern recognition",
      "Process execution",
    ],
    compression: "85%",
  },
  {
    color: "var(--amber)",
    colorLight: "rgba(245,180,60,0.12)",
    label: "AI Assisted Zone",
    tag: "Amber Zone",
    desc: "Human-AI collaboration. Judgment remains with the human, but AI handles production.",
    items: [
      "Strategic analysis",
      "Recommendation building",
      "Scenario modelling",
      "Creative direction",
      "Quality control",
    ],
    compression: "55%",
  },
  {
    color: "var(--green)",
    colorLight: "rgba(100,200,130,0.12)",
    label: "AI Proof Zone",
    tag: "Green Zone",
    desc: "Irreducibly human. Value comes from judgment, consequence-bearing, trust, and accountability.",
    items: [
      "Final decisions",
      "Stakeholder trust",
      "Ethical navigation",
      "Crisis judgment",
      "Accountability ownership",
    ],
    compression: "25%",
  },
];

export function WorkStructureSection() {
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
      id="workstructure"
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
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 72px",
          }}
        >
          <div className="sec-lbl" style={{ textAlign: "center" }}>
            Types of Work — How Your Role Is Structured
          </div>
          <h2 className="sec-title" style={{ textAlign: "center" }}>
            Every role is a blend of three zones.
          </h2>
          <p className="sec-body" style={{ textAlign: "center" }}>
            The zone where you spend most of your time determines your structural position in the AI economy.
            Most professionals overestimate how much time they spend in the Green Zone.
          </p>
        </div>

        {/* Zones Grid */}
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            background: "var(--border)",
          }}
        >
          {zones.map((zone, idx) => (
            <div
              key={idx}
              className="zone-card"
              style={{
                background: "var(--near-black)",
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.3s",
                display: "flex",
                flexDirection: "column",
                minHeight: "480px",
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: zone.color,
                }}
              />

              {/* Tag */}
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  background: zone.colorLight,
                  marginBottom: "16px",
                  alignSelf: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: zone.color,
                    fontWeight: 500,
                  }}
                >
                  {zone.tag}
                </span>
              </div>

              {/* Label */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: "12px",
                }}
              >
                {zone.label}
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--white-dim)",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                  minHeight: "60px",
                }}
              >
                {zone.desc}
              </p>

              {/* Items - flex grow to push compression bar to bottom */}
              <ul style={{ listStyle: "none", flex: "1" }}>
                {zone.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.67rem",
                      color: "var(--white-dim)",
                      padding: "7px 0",
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                    }}
                  >
                    <span style={{ color: zone.color, fontSize: "0.55rem" }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* AI Compression bar - always at bottom */}
              <div
                style={{
                  marginTop: "auto",
                  background: "#0a0a0a",
                  padding: "12px 14px",
                  borderTop: `1px solid ${zone.color}22`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.56rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--white-faint)",
                    }}
                  >
                    AI Compression
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.62rem",
                      fontWeight: 600,
                      color: zone.color,
                    }}
                  >
                    {zone.compression}
                  </span>
                </div>
                <div
                  style={{
                    height: "5px",
                    background: "#222",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: isVisible ? zone.compression : "0%",
                      background: zone.color,
                      transition: "width 1.2s ease-out 0.3s",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .zone-card:hover {
          background: var(--surface) !important;
        }
        @media (max-width: 900px) {
          .reveal > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
