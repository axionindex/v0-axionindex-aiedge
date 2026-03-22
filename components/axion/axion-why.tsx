"use client";

import { useEffect, useRef, useState } from "react";

const tensions = [
  "Workforce models are fragmented — designed for a scale the organisation has already left behind",
  "Compliance is reactive — organisations discover structural debt when the regulator arrives, not before",
  "Decision ownership is unclear — authority is implied, not designed, and breaks under pressure",
  "AI is compressing entire layers of work — and most organisations have no map for what remains defensible",
  "People systems fail before strategy does — but the damage happens silently, long before it is visible",
];

export function AxionWhy() {
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
      id="why"
      ref={sectionRef}
      style={{
        background: "var(--ink2)",
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
        <div className={`rv ${visible ? "in" : ""}`} style={{ marginBottom: "3.5rem" }}>
          <div className="sec-lbl">Why This Matters</div>
          <h2 className="sec-title">
            The system underneath work <em>is breaking.</em>
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
          {/* Left - Tension list + verdict */}
          <div>
            {/* Tension items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {tensions.map((t, i) => (
                <div
                  key={i}
                  className={`rv ${visible ? "in" : ""}`}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingLeft: "1rem",
                    borderLeft: "2px solid var(--gold)",
                    transition: "border-color 0.2s, background 0.2s",
                    transitionDelay: `${i * 0.08}s`,
                    padding: "0.75rem 1rem",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderLeftColor = "var(--gold-pale)";
                    e.currentTarget.style.background = "rgba(196,154,60,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeftColor = "var(--gold)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ color: "var(--dim)", fontSize: "1rem" }}>—</span>
                  <p style={{ fontSize: "0.95rem", color: "var(--mist)", lineHeight: 1.7 }}>
                    {t}
                  </p>
                </div>
              ))}
            </div>

            {/* Verdict card */}
            <div
              className={`rv ${visible ? "in" : ""}`}
              style={{
                borderLeft: "3px solid var(--gold)",
                background: "var(--gold-dim)",
                padding: "1.5rem",
                transitionDelay: "0.5s",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.56rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                The result
              </span>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.15rem",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "var(--parchment)",
                }}
              >
                The result is not inefficiency. It is <strong style={{ fontWeight: 600, color: "var(--gold)" }}>invisible fragility</strong> — organisations that look healthy until the moment they don&apos;t.
              </p>
            </div>
          </div>

          {/* Right - Prose + position box */}
          <div>
            <div className={`rv ${visible ? "in" : ""}`} style={{ transitionDelay: "0.2s" }}>
              <p style={{ fontSize: "1rem", color: "var(--mist)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                Strategy fails less often than people systems do. Growth stalls not because the market changed, but because the operating system underneath could not hold. Most organisations learn this too late — when the regulator arrives, when the founder tries to step back, when AI compresses an entire layer of work overnight.
              </p>
              <p style={{ fontSize: "1rem", color: "var(--mist)", lineHeight: 1.85, marginBottom: "2rem" }}>
                The cost of reactive redesign is exponentially higher than the cost of proactive architecture. The first demands crisis management. The second demands only discipline — and the willingness to see clearly.
              </p>
            </div>

            {/* Position box */}
            <div
              className={`rv ${visible ? "in" : ""}`}
              style={{
                border: "1px solid var(--rule)",
                padding: "1.75rem",
                transitionDelay: "0.4s",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.25rem",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "var(--parchment)",
                }}
              >
                &quot;Every hour spent designing the system before the crisis is worth ten hours managing it during.&quot;
              </p>
            </div>
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
