"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function AxionContact() {
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
      id="contact"
      ref={sectionRef}
      style={{
        background: "var(--ink)",
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(ellipse, rgba(196,154,60,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0 3rem",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Section header */}
        <div className={`rv ${visible ? "in" : ""}`} style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.5rem",
            }}
          >
            The Architecture Conversation
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "var(--parchment)",
              marginBottom: "1.5rem",
            }}
          >
            If the system underneath your organisation is <em style={{ fontStyle: "italic", color: "var(--gold)" }}>breaking</em> — let&apos;s talk.
          </h2>
        </div>

        {/* Body text */}
        <div
          className={`rv ${visible ? "in" : ""}`}
          style={{ transitionDelay: "0.15s", marginBottom: "2.5rem", maxWidth: "640px", margin: "0 auto" }}
        >
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "var(--mist)",
              marginBottom: "1.5rem",
            }}
          >
            We don&apos;t take every brief. We work best with founders, CFOs, and CHROs who already sense the problem — and want someone who can name it, design around it, and build the architecture that holds.
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "var(--parchment)",
            }}
          >
            The first conversation is always free. The cost is only clarity.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`rv ${visible ? "in" : ""}`}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "3rem",
            transitionDelay: "0.25s",
          }}
        >
          <Link
            href="https://www.axionindex.org/quick-mirror"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ padding: "14px 28px" }}
          >
            Quick Mirror — Free →
          </Link>
          <Link
            href="mailto:nitin@axionindex.org"
            className="btn-dim"
            style={{ padding: "14px 28px" }}
          >
            Request a Conversation
          </Link>
        </div>

        {/* Contact info */}
        <div
          className={`rv ${visible ? "in" : ""}`}
          style={{
            display: "flex",
            gap: "3rem",
            justifyContent: "center",
            flexWrap: "wrap",
            transitionDelay: "0.35s",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--dim)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Email
            </span>
            <Link
              href="mailto:nitin@axionindex.org"
              style={{
                fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                fontSize: "0.9rem",
                color: "var(--parchment)",
                textDecoration: "none",
              }}
            >
              nitin@axionindex.org
            </Link>
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--dim)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              LinkedIn
            </span>
            <Link
              href="https://www.linkedin.com/in/nahatanitin/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                fontSize: "0.9rem",
                color: "var(--parchment)",
                textDecoration: "none",
              }}
            >
              @nahatanitin
            </Link>
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--dim)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Location
            </span>
            <span
              style={{
                fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                fontSize: "0.9rem",
                color: "var(--parchment)",
              }}
            >
              Bengaluru, India
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
