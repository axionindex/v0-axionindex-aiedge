"use client";

import { useEffect, useRef, useState } from "react";

export function AxionThesis() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="thesis"
      style={{
        padding: "120px 32px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Section Label */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "none" : "translateY(20px)",
          transition: "all 0.7s ease",
        }}
      >
        <span className="sec-lbl">The Thesis</span>
      </div>

      {/* Pull Quote */}
      <blockquote
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1.4,
          color: "var(--parchment)",
          marginBottom: "48px",
          paddingLeft: "24px",
          borderLeft: "2px solid var(--gold)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.1s",
        }}
      >
        &ldquo;We are not in a technology shift. We are in a{" "}
        <span style={{ color: "var(--gold)" }}>structural reorganisation</span> of how
        value is created, captured, and distributed.&rdquo;
      </blockquote>

      {/* Body paragraphs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.2s",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.02rem",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "rgba(245,242,236,0.7)",
          }}
        >
          The instruments that measured the last economy—credentials, job titles, 
          time-in-role—are breaking. They were designed for a world where human labour 
          was the primary input. That world is ending.
        </p>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.02rem",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "rgba(245,242,236,0.7)",
          }}
        >
          <strong style={{ fontWeight: 500, color: "var(--parchment)" }}>Axion Index</strong>{" "}
          builds diagnostic instruments for the structural economy—tools that measure 
          what actually creates defensible value: judgment density, decision authority, 
          ownership scope, and strategic positioning.
        </p>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.02rem",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "rgba(245,242,236,0.7)",
          }}
        >
          Our instruments help individuals understand their true economic position, 
          leaders redesign roles for AI-native operations, and institutions prepare 
          for structural shifts before they arrive.
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "var(--border)",
          marginTop: "80px",
        }}
      />
    </section>
  );
}
