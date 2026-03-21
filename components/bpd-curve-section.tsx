"use client";

import { useEffect, useRef, useState } from "react";

const stagesData = [
  {
    stage: "1",
    label: "Execution",
    desc: "Doing what you are told, with skill and speed.",
    color: "var(--red)",
  },
  {
    stage: "2",
    label: "Intelligence",
    desc: "Generating outputs: research, analysis, synthesis.",
    color: "var(--amber)",
  },
  {
    stage: "3",
    label: "Interpretation",
    desc: "Making sense of ambiguous inputs, situational framing.",
    color: "var(--gold-dim)",
  },
  {
    stage: "4",
    label: "Judgment",
    desc: "Bearing the weight of decisions with incomplete information.",
    color: "var(--green)",
  },
];

export function BPDCurveSection() {
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
      id="bpdcurve"
      ref={sectionRef}
      style={{
        background: "var(--near-black)",
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
            gridTemplateColumns: "380px 1fr",
            gap: "64px",
            marginBottom: "64px",
          }}
        >
          <div>
            <div className="sec-lbl">The Brainpower Density Curve™</div>
            <h2 className="sec-title">
              Where your<br />value lives.
            </h2>
          </div>
          <p className="sec-body" style={{ marginTop: "30px" }}>
            Every role sits somewhere along the Brainpower Density Curve — from pure execution (Stage 1) to consequence-bearing
            judgment (Stage 4). AI compresses the left side of the curve. Economic value is migrating to the right.
          </p>
        </div>

        {/* Visual Curve */}
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            background: "#0a0a0a",
            border: "1px solid var(--border)",
            padding: "48px",
          }}
        >
          <div style={{ position: "relative", height: "200px", marginBottom: "40px" }}>
            {/* Y axis */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 30,
                width: "1px",
                background: "var(--border)",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "6px",
                top: 0,
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.5rem",
                color: "var(--white-faint)",
                transform: "rotate(-90deg)",
                transformOrigin: "0 0",
                letterSpacing: "0.2em",
              }}
            >
              ECONOMIC VALUE
            </span>

            {/* X axis */}
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                left: 0,
                right: 0,
                height: "1px",
                background: "var(--border)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "6px",
                right: 0,
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.5rem",
                color: "var(--white-faint)",
                letterSpacing: "0.2em",
              }}
            >
              BRAINPOWER DENSITY →
            </span>

            {/* SVG Curve */}
            <svg
              viewBox="0 0 500 140"
              preserveAspectRatio="none"
              style={{ width: "100%", height: "130px", marginLeft: "36px" }}
            >
              {/* Gradient definition */}
              <defs>
                <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "var(--red)", stopOpacity: 1 }} />
                  <stop offset="35%" style={{ stopColor: "var(--amber)", stopOpacity: 1 }} />
                  <stop offset="70%" style={{ stopColor: "var(--gold)", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "var(--green)", stopOpacity: 1 }} />
                </linearGradient>
              </defs>

              {/* Filled area */}
              <path
                d="M0,130 C100,125 200,100 350,40 L500,0 L500,130 Z"
                fill="url(#curveGrad)"
                opacity="0.15"
              />

              {/* Curve line */}
              <path
                d="M0,130 C100,125 200,100 350,40 L500,0"
                fill="none"
                stroke="url(#curveGrad)"
                strokeWidth="2.5"
              />

              {/* Stage markers */}
              {[
                { x: 60, y: 126, label: "1" },
                { x: 180, y: 110, label: "2" },
                { x: 300, y: 70, label: "3" },
                { x: 440, y: 18, label: "4" },
              ].map((marker, idx) => (
                <g key={idx}>
                  <circle cx={marker.x} cy={marker.y} r="14" fill="#0a0a0a" stroke="var(--gold)" strokeWidth="1" />
                  <text
                    x={marker.x}
                    y={marker.y + 4}
                    textAnchor="middle"
                    fill="var(--gold)"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
                  >
                    {marker.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* AI Compression zone */}
            <div
              style={{
                position: "absolute",
                left: "36px",
                bottom: "34px",
                width: "42%",
                height: "calc(100% - 64px)",
                background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(220,80,80,0.07) 4px, rgba(220,80,80,0.07) 8px)",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "50px",
                top: "40px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.52rem",
                color: "var(--red)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              AI Compression Zone
            </span>
          </div>

          {/* Stage key */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "var(--border)",
              marginTop: "24px",
            }}
          >
            {stagesData.map((stage, idx) => (
              <div
                key={idx}
                className="stage-key"
                style={{
                  background: "#0a0a0a",
                  padding: "18px 16px",
                  borderTop: `2px solid ${stage.color}`,
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    color: stage.color,
                    marginBottom: "4px",
                  }}
                >
                  Stage {stage.stage}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "var(--white)",
                    marginBottom: "4px",
                  }}
                >
                  {stage.label}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "var(--white-dim)",
                    lineHeight: 1.55,
                  }}
                >
                  {stage.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .stage-key:hover {
          background: #111 !important;
        }
        @media (max-width: 900px) {
          .reveal > div:first-child {
            grid-template-columns: 1fr !important;
          }
          .reveal > div:last-child > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
