"use client";

import { useEffect, useRef, useState } from "react";

const judgmentLevels = [
  { level: "I own", desc: "You bear the consequence of the decision. It is yours to make.", color: "var(--green)" },
  { level: "I lead", desc: "You frame the options and recommend — but final call is elsewhere.", color: "var(--gold)" },
  { level: "I contribute", desc: "You provide inputs into someone else's decision process.", color: "var(--amber)" },
  { level: "I execute", desc: "You implement decisions made above you.", color: "var(--red)" },
];

const thinkingLevels = [
  { level: "Original", desc: "You create new frameworks, insights, or intellectual capital.", color: "var(--green)" },
  { level: "Adaptive", desc: "You modify existing thinking to fit new contexts.", color: "var(--gold)" },
  { level: "Synthesis", desc: "You combine existing information into new structures.", color: "var(--amber)" },
  { level: "Application", desc: "You apply received knowledge without modification.", color: "var(--red)" },
];

export function OwnershipSection() {
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
      id="ownership"
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
          <div className="sec-lbl">The Ownership Ladders</div>
          <h2 className="sec-title">
            Where do you sit<br />on the ladder?
          </h2>
          <p className="sec-body" style={{ maxWidth: "650px" }}>
            Every task you perform sits somewhere on two ladders: judgment ownership and thinking ownership. The higher you
            sit on both, the more structurally protected your work becomes. AI compresses the bottom — not the top.
          </p>
        </div>

        {/* Two ladders */}
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            background: "var(--border)",
          }}
        >
          {/* Judgment Ownership Ladder */}
          <div style={{ background: "var(--near-black)", padding: "36px" }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "16px",
              }}
            >
              Judgment Ownership Ladder
            </div>

            {judgmentLevels.map((item, idx) => (
              <div
                key={idx}
                className="ladder-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "20px",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "center",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: item.color,
                  }}
                >
                  {item.level}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--white-dim)",
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}

            {/* Arrow indicator */}
            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.52rem",
                  color: "var(--white-faint)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                AI Compression Risk
              </span>
              <div
                style={{
                  flex: 1,
                  height: "4px",
                  background: "linear-gradient(90deg, var(--green), var(--red))",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.52rem",
                  color: "var(--red)",
                  letterSpacing: "0.15em",
                }}
              >
                HIGH
              </span>
            </div>
          </div>

          {/* Thinking Ownership Ladder */}
          <div style={{ background: "var(--near-black)", padding: "36px" }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "16px",
              }}
            >
              Thinking Ownership Ladder
            </div>

            {thinkingLevels.map((item, idx) => (
              <div
                key={idx}
                className="ladder-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "20px",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "center",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: item.color,
                  }}
                >
                  {item.level}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--white-dim)",
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}

            {/* Arrow indicator */}
            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.52rem",
                  color: "var(--white-faint)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                AI Compression Risk
              </span>
              <div
                style={{
                  flex: 1,
                  height: "4px",
                  background: "linear-gradient(90deg, var(--green), var(--red))",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.52rem",
                  color: "var(--red)",
                  letterSpacing: "0.15em",
                }}
              >
                HIGH
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ladder-row:hover {
          background: rgba(201,168,76,0.03);
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
