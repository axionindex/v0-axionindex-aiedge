"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const tickerItems = [
  { text: "AI Replaceability Index", gold: true },
  { text: "The Three Shifts", gold: false },
  { text: "Quick Mirror", gold: true },
  { text: "Full Diagnostic", gold: false },
  { text: "Salary Defensibility Score", gold: true },
  { text: "Brainpower Density", gold: false },
  { text: "Judgment Economics", gold: false },
  { text: "Decision Architecture", gold: false },
  { text: "AI Edge Diagnostic", gold: true },
  { text: "ORG AI DARS", gold: false },
];

const tensionLines = [
  "Intelligence is becoming abundant. Your job is next.",
  "When intelligence is cheap, judgment becomes the only premium left.",
  "Organisations that don't redesign work will be redesigned by the market.",
  "The question is not whether AI replaces you. It is whether you move first.",
];

export function AIEdgeHero() {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % tensionLines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "120px 24px 60px",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "radial-gradient(ellipse 55% 45% at top center, rgba(198,168,110,0.09), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "9999px",
          padding: "6px 16px",
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.6)",
          marginBottom: "32px",
        }}
      >
        ◆ A Management Doctrine for the AI Era
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(3rem, 6vw, 6.5rem)",
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        The structural economics
        <br />
        of work in the AI era.
      </h1>

      {/* Subheadline */}
      <p
        style={{
          fontSize: "1.25rem",
          color: "rgba(255,255,255,0.6)",
          maxWidth: "672px",
          textAlign: "center",
          lineHeight: 1.6,
          marginBottom: "40px",
        }}
      >
        When intelligence becomes abundant, <strong style={{ color: "#F5F2EC" }}>judgment becomes the scarce resource.</strong>
        <br />
        The AI Edge Lab studies that shift — and builds frameworks to redesign roles, decisions, and organisations.
      </p>

      {/* CTAs */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "64px" }}>
        <a
          href="https://www.axionindex.org/quick-mirror"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "#C6A86E",
            color: "#0A0A0A",
            padding: "14px 28px",
            borderRadius: "9999px",
            textDecoration: "none",
            fontWeight: 500,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#DFC090")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#C6A86E")}
        >
          Take the Quick Mirror
        </a>
        <a
          href="#shifts"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("shifts")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "transparent",
            color: "rgba(255,255,255,0.7)",
            padding: "14px 28px",
            borderRadius: "9999px",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#C6A86E";
            e.currentTarget.style.color = "#C6A86E";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
          }}
        >
          Read the Doctrine →
        </a>
      </div>

      {/* Ticker */}
      <div
        style={{
          width: "100%",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: "20px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            animation: "marquee 40s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: item.gold ? "#C6A86E" : "rgba(255,255,255,0.3)",
                padding: "0 24px",
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Cycling tension line */}
      <div
        style={{
          marginTop: "32px",
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          key={currentLine}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.5rem",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            maxWidth: "672px",
            animation: "fadeInOut 3.5s ease-in-out",
          }}
        >
          {tensionLines[currentLine]}
        </p>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
