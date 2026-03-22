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
      id="tension"
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

        {/* Tension items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2.5rem", maxWidth: "800px" }}>
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
              <span style={{ color: "var(--gold)", fontSize: "1rem", flexShrink: 0 }}>—</span>
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
            background: "rgba(196,154,60,0.06)",
            padding: "1.5rem",
            maxWidth: "720px",
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
            What looks like inefficiency is not inefficiency. It is <strong style={{ fontWeight: 600, color: "var(--gold)" }}>structural fragility</strong> — organisations that look healthy until the moment they don&apos;t.
          </p>
        </div>
      </div>
    </section>
  );
}
