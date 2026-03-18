"use client";

import { useEffect, useRef, useState } from "react";

const shifts = [
  {
    num: "01",
    tag: "The Supply Shock",
    title: "Intelligence is becoming abundant",
    body: "AI now performs the cognitive tasks that defined professional value for decades. The supply of structured intelligence has collapsed in price.",
    items: [
      "Data analysis & synthesis",
      "Structured reasoning & logic",
      "Research & summarisation",
      "Pattern recognition at scale",
      "First-draft everything",
    ],
  },
  {
    num: "02",
    tag: "The New Premium",
    title: "Judgment becomes the new scarcity",
    body: "As intelligence becomes cheap, humans retain economic advantage in one domain: bearing the consequences of decisions.",
    items: [
      "Consequence-bearing decisions",
      "Contextual interpretation",
      "Accountability for outcomes",
      "Trust & relationship capital",
      "Ethical navigation",
    ],
  },
  {
    num: "03",
    tag: "The Operating Challenge",
    title: "Organisations must redesign work",
    body: "Every organisation built around intelligence output must now restructure around judgment. The question is whether leaders do it deliberately — or let the market force it.",
    items: [
      "Redesign role structures",
      "Redefine decision rights",
      "Reallocate value creation",
      "Rethink compensation logic",
      "Rebuild operating architecture",
    ],
  },
];

export function ShiftsSection() {
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
      id="shifts"
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
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "end",
            marginBottom: "56px",
          }}
        >
          <div>
            <div className="sec-lbl">The Three Structural Shifts</div>
            <h2 className="sec-title" style={{ marginBottom: 0 }}>
              The economy of work<br />is being rewritten.
            </h2>
          </div>
          <p className="sec-body">
            AI Edge begins with one irreversible observation: the cognitive tasks that once made knowledge workers indispensable are now performed at scale, at speed, by machines. This is a structural renegotiation of what human work is worth.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            background: "var(--border)",
          }}
        >
          {shifts.map((shift, idx) => (
            <div
              key={idx}
              className="sc3"
              style={{
                background: "var(--near-black)",
                padding: "40px 32px",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.3s",
              }}
            >
              {/* Gold top border on hover */}
              <div
                className="sc3-border"
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

              {/* Number */}
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "5rem",
                  fontWeight: 900,
                  color: "rgba(201,168,76,0.06)",
                  lineHeight: 1,
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
              >
                {shift.num}
              </div>

              {/* Tag */}
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "10px",
                }}
              >
                {shift.tag}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "var(--white)",
                  marginBottom: "12px",
                }}
              >
                {shift.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--white-dim)",
                  lineHeight: 1.75,
                  marginBottom: "20px",
                }}
              >
                {shift.body}
              </p>

              {/* List */}
              <ul style={{ listStyle: "none" }}>
                {shift.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.67rem",
                      color: "var(--white-dim)",
                      padding: "6px 0",
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                    }}
                  >
                    <span style={{ color: "var(--gold)", fontSize: "0.67rem" }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sc3:hover {
          background: var(--surface) !important;
        }
        .sc3:hover .sc3-border {
          transform: scaleX(1) !important;
        }
        @media (max-width: 900px) {
          .reveal > div:first-child {
            grid-template-columns: 1fr !important;
          }
          .reveal > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
