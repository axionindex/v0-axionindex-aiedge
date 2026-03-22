"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function AxionFounder() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [statementVisible, setStatementVisible] = useState(false);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatementVisible(true);
      },
      { threshold: 0.3 }
    );
    if (statementRef.current) observer.observe(statementRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="founder"
        ref={sectionRef}
        style={{
          background: "var(--parchment)",
          color: "var(--ink)",
          padding: "6rem 0 4rem",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 3rem",
          }}
        >
          {/* Section label */}
          <div className={`rv ${visible ? "in" : ""}`} style={{ marginBottom: "2rem" }}>
            <div className="sec-lbl-rust">The Founder</div>
          </div>

          {/* Full-width pull quote */}
          <div
            className={`rv ${visible ? "in" : ""}`}
            style={{
              background: "var(--warm)",
              borderLeft: "4px solid var(--rust)",
              padding: "2.5rem 3rem",
              marginBottom: "3.5rem",
              position: "relative",
              transitionDelay: "0.1s",
            }}
          >
            {/* Decorative quote mark */}
            <span
              style={{
                position: "absolute",
                top: "1rem",
                left: "1.5rem",
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "4rem",
                color: "var(--rust)",
                opacity: 0.15,
                lineHeight: 1,
              }}
            >
              &ldquo;
            </span>
            <p
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontStyle: "italic",
                lineHeight: 1.5,
                color: "var(--ink)",
                maxWidth: "900px",
              }}
            >
              &ldquo;I work with founders at moments of inflection — when growth outpaces people systems and belief must be redesigned into rhythm before scale breaks what the company was built on.&rdquo;
            </p>
          </div>

          {/* Two-column layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2.2fr",
              gap: "4rem",
            }}
          >
            {/* Left - Founder card + stats */}
            <div>
              {/* Card */}
              <div
                className={`rv ${visible ? "in" : ""}`}
                style={{
                  background: "var(--warm)",
                  border: "1px solid rgba(140,59,40,0.2)",
                  padding: "2rem",
                  textAlign: "center",
                  marginBottom: "2rem",
                  transitionDelay: "0.15s",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto 1.25rem",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--gold) 0%, var(--rust) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      fontSize: "2rem",
                      fontWeight: 600,
                      color: "var(--parchment)",
                    }}
                  >
                    N
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Nitin Nahata
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    color: "var(--rust)",
                    marginBottom: "1rem",
                  }}
                >
                  Founder, Axion Index
                </p>
                <p
                  style={{
                    fontSize: "0.78rem",
                    lineHeight: 1.6,
                    color: "var(--dim)",
                  }}
                >
                  Tata Group · Standard Chartered · Udaan · Gameskraft · 22 Years · Operating Architect
                </p>

                <Link
                  href="https://www.linkedin.com/in/nahatanitin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "1.25rem",
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--rust)",
                    textDecoration: "none",
                    padding: "8px 16px",
                    border: "1px solid rgba(140,59,40,0.3)",
                    transition: "all 0.2s",
                  }}
                >
                  LinkedIn ↗
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { num: "22", label: "Years in HR Architecture" },
                  { num: "4AM", label: "The Origin Moment" },
                  { num: "1", label: "Founding Conviction" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`rv ${visible ? "in" : ""}`}
                    style={{
                      borderLeft: "3px solid var(--gold)",
                      paddingLeft: "1rem",
                      transitionDelay: `${0.25 + i * 0.08}s`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                        fontSize: "1.8rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                        display: "block",
                        lineHeight: 1.1,
                      }}
                    >
                      {stat.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.08em",
                        color: "var(--dim)",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Bio paragraphs */}
            <div>
              <div className={`rv ${visible ? "in" : ""}`} style={{ transitionDelay: "0.15s" }}>
                <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--dim)", marginBottom: "1.5rem" }}>
                  22 years across large enterprises and high-growth startups. Tata Group. Standard Chartered. Udaan, from Series A through Series D. Gameskraft, through $75M in profitability and a regulatory event that threatened to erase the industry overnight. Each chapter built a different muscle — institutional scale, founder-led intensity, crisis-mode operating, and the discipline to design systems that hold under pressure.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--dim)", marginBottom: "1.5rem" }}>
                  The defining insight came from watching the same pattern repeat: people system failures don&apos;t announce themselves. They accumulate silently — invisible structural debt — until the crisis arrives. By then, the cost of redesign is 10x what proactive architecture would have required. Most organisations never learn this until it&apos;s too late.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--ink)", marginBottom: "1.5rem", fontWeight: 500 }}>
                  <strong>The 4AM moment.</strong> At Gameskraft, a 4AM regulatory notification arrived that threatened to erase an industry overnight. What followed wasn&apos;t just crisis response — it was an accelerated version of everything Axion Index now codifies: diagnosing invisible risk, redesigning systems under pressure, and leading through chaos while protecting dignity and trust. This is the origin of everything Axion Index stands for.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--dim)" }}>
                  Author of <em>Baptism by Chaos</em>. Creator of the Operating Architect framework. Now building the instruments and software to make this thinking scalable — so founders don&apos;t have to learn these lessons the hard way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Statement */}
      <div
        ref={statementRef}
        style={{
          background: "var(--parchment)",
          padding: "4rem 0 6rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 3rem",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--rust)",
              marginBottom: "2rem",
            }}
          >
            The Founding Statement
          </div>

          {/* Part 1 */}
          <p
            className={`founding-part ${statementVisible ? "in" : ""}`}
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--ink)",
              opacity: 0.5,
              marginBottom: "1rem",
              transitionDelay: "0ms",
            }}
          >
            &ldquo;HR&apos;s role is not to manage people or protect culture —&rdquo;
          </p>

          {/* Part 2 - Main */}
          <p
            className={`founding-part ${statementVisible ? "in" : ""}`}
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "1.6rem",
              fontStyle: "italic",
              color: "var(--ink)",
              lineHeight: 1.4,
              padding: "1.5rem 0",
              borderTop: "1px solid rgba(140,59,40,0.2)",
              borderBottom: "1px solid rgba(140,59,40,0.2)",
              margin: "0 auto 1rem",
              maxWidth: "800px",
              transitionDelay: "320ms",
            }}
          >
            &ldquo;but to architect the operating system that aligns human energy with organisational rhythm,&rdquo;
          </p>

          {/* Part 3 */}
          <p
            className={`founding-part ${statementVisible ? "in" : ""}`}
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--ink)",
              opacity: 0.5,
              marginBottom: "2rem",
              transitionDelay: "640ms",
            }}
          >
            &ldquo;so belief becomes conviction, conviction becomes repeatable behaviour, and chaos evolves into sustainable performance.&rdquo;
          </p>

          {/* Attribution */}
          <div style={{ borderTop: "1px solid rgba(140,59,40,0.15)", paddingTop: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                color: "var(--dim)",
              }}
            >
              Nitin Nahata, Founder · Axion Index
            </span>
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
    </>
  );
}
