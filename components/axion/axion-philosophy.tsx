"use client";

import { useEffect, useRef, useState } from "react";

const principles = [
  {
    num: "01",
    title: "Measure Structure, Not Surface",
    description:
      "Traditional metrics measure outputs and activities. Our instruments measure structural position—the underlying architecture that determines long-term value creation.",
  },
  {
    num: "02",
    title: "Judgment Is the Scarce Resource",
    description:
      "When intelligence becomes abundant and cheap, judgment becomes the constraint. We build instruments that measure judgment density, decision authority, and accountability scope.",
  },
  {
    num: "03",
    title: "Diagnosis Before Prescription",
    description:
      "You cannot navigate a structural shift you haven't measured. Our instruments provide precise diagnosis before recommending action.",
  },
  {
    num: "04",
    title: "Honest About Uncertainty",
    description:
      "Structural transitions are inherently uncertain. Our frameworks acknowledge what we don't know while providing clarity on what we can measure.",
  },
];

export function AxionPhilosophy() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section
      ref={sectionRef}
      id="philosophy"
      style={{
        padding: "100px 32px 120px",
        background: "rgba(20,20,20,0.4)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            marginBottom: "64px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <span className="sec-lbl">Philosophy</span>
          <h2 className="sec-title">
            How we <em>think</em>
          </h2>
          <p className="sec-body">
            The principles that guide our instrument design and diagnostic frameworks.
          </p>
        </div>

        {/* Principles Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "var(--border)",
          }}
        >
          {principles.map((principle, index) => (
            <div
              key={principle.num}
              style={{
                background: "var(--ink)",
                padding: "40px 32px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translateY(20px)",
                transition: `all 0.7s ease ${0.1 + index * 0.08}s`,
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "var(--gold)",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                {principle.num}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--parchment)",
                  marginBottom: "14px",
                  lineHeight: 1.3,
                }}
              >
                {principle.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(245,242,236,0.55)",
                }}
              >
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
