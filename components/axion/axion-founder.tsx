"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function AxionFounder() {
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
      id="founder"
      style={{
        padding: "100px 32px 120px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
          alignItems: "start",
        }}
      >
        {/* Content */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <span className="sec-lbl">Founder</span>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 600,
              color: "var(--parchment)",
              marginBottom: "8px",
            }}
          >
            Nitin Nahata
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "var(--gold)",
              marginBottom: "28px",
            }}
          >
            Structural Economist · Framework Designer
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "36px",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.98rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(245,242,236,0.65)",
              }}
            >
              Former strategy executive turned structural economist. Two decades building 
              strategic frameworks for institutions navigating transformation—from digital 
              disruption to organisational redesign.
            </p>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.98rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(245,242,236,0.65)",
              }}
            >
              Now focused on the structural economics of the AI transition: how intelligence 
              abundance reorganises work, capital, and governance. Building diagnostic instruments 
              that measure what traditional metrics miss.
            </p>

            <blockquote
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.15rem",
                fontStyle: "italic",
                color: "var(--parchment)",
                paddingLeft: "20px",
                borderLeft: "2px solid var(--gold)",
                marginTop: "8px",
              }}
            >
              &ldquo;The question isn&apos;t whether AI changes work. The question is whether 
              you see the structural shift before it sees you.&rdquo;
            </blockquote>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="https://www.linkedin.com/in/nahatanitin/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(245,242,236,0.6)",
                textDecoration: "none",
                padding: "12px 20px",
                border: "1px solid var(--border)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "rgba(245,242,236,0.6)";
              }}
            >
              LinkedIn
              <span style={{ fontSize: "0.8em" }}>↗</span>
            </Link>

            <Link
              href="https://www.perplexity.ai/computer/a/the-making-of-the-operating-ar-mXeHIIQeSJWFEvWxSQaKtw"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(245,242,236,0.6)",
                textDecoration: "none",
                padding: "12px 20px",
                border: "1px solid var(--border)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "rgba(245,242,236,0.6)";
              }}
            >
              Full Bio
              <span style={{ fontSize: "0.8em" }}>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
