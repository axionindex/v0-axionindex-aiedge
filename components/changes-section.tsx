"use client";

import { useEffect, useRef, useState } from "react";

const changesData = [
  {
    tag: "For The Individual",
    title: "Career strategy rewrite",
    items: [
      { text: "Audit your weekly outputs — how much is AI-compressible?", type: "question" },
      { text: "Seek decision ownership, not just task excellence.", type: "action" },
      { text: "Build consequence capital — not credential capital.", type: "action" },
      { text: "Position above the compression line — or accept repricing.", type: "warning" },
    ],
  },
  {
    tag: "For The Leader",
    title: "Structural question, not a tech question",
    items: [
      { text: "What are you paying for — intelligence output or judgment?", type: "question" },
      { text: "How much of your org is doing work AI already performs?", type: "question" },
      { text: "Map your roles to the Brainpower Density Curve.", type: "action" },
      { text: "Redesign before the market forces the question.", type: "warning" },
    ],
  },
  {
    tag: "For The Organisation",
    title: "Workforce strategy = work redesign",
    items: [
      { text: "Role architecture must change — not just headcount.", type: "action" },
      { text: "Decision rights must be reallocated — not just automated.", type: "action" },
      { text: "Compensation must anchor to scarcity — not tenure.", type: "warning" },
      { text: "The org that moves first gains structural advantage.", type: "insight" },
    ],
  },
];

export function ChangesSection() {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "question":
        return { symbol: "?", color: "var(--gold)" };
      case "action":
        return { symbol: "→", color: "var(--green)" };
      case "warning":
        return { symbol: "!", color: "var(--amber)" };
      case "insight":
        return { symbol: "◆", color: "var(--gold)" };
      default:
        return { symbol: "→", color: "var(--white-dim)" };
    }
  };

  return (
    <div
      id="changes"
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
          <div className="sec-lbl">What Must Change</div>
          <h2 className="sec-title">
            Three audiences.<br />One structural shift.
          </h2>
          <p className="sec-body" style={{ maxWidth: "650px" }}>
            AI Edge has implications at every level: for the individual professional navigating career risk, for the leader
            reshaping org design, and for the organisation redesigning work itself.
          </p>
        </div>

        {/* Three columns */}
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            background: "var(--border)",
          }}
        >
          {changesData.map((section, idx) => (
            <div
              key={idx}
              className="change-card"
              style={{
                background: "var(--near-black)",
                padding: "36px 28px",
                position: "relative",
                transition: "background 0.3s",
              }}
            >
              {/* Top accent */}
              <div
                className="change-border"
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

              {/* Tag */}
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "10px",
                }}
              >
                {section.tag}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: "20px",
                }}
              >
                {section.title}
              </h3>

              {/* Items */}
              <ul style={{ listStyle: "none" }}>
                {section.items.map((item, itemIdx) => {
                  const typeInfo = getTypeIcon(item.type);
                  return (
                    <li
                      key={itemIdx}
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "12px 0",
                        borderTop: "1px solid var(--border)",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.7rem",
                          color: typeInfo.color,
                          width: "16px",
                          flexShrink: 0,
                          textAlign: "center",
                          marginTop: "2px",
                        }}
                      >
                        {typeInfo.symbol}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.85rem",
                          color: "var(--white-dim)",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .change-card:hover {
          background: var(--surface) !important;
        }
        .change-card:hover .change-border {
          transform: scaleX(1) !important;
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
