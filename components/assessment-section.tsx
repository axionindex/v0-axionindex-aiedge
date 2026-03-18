"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function AssessmentSection() {
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
      id="assessment"
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
        <div className={`reveal ${isVisible ? "vis" : ""}`} style={{ marginBottom: "64px" }}>
          <div className="sec-lbl">Instruments — Choose Your Assessment</div>
          <h2 className="sec-title">
            Two instruments.<br />One question.
          </h2>
          <p className="sec-body" style={{ maxWidth: "620px" }}>
            How structurally exposed are you to AI compression? The AI Edge Lab offers two instruments to answer that
            question — a quick directional mirror, and a full diagnostic with personalised scoring.
          </p>
        </div>

        {/* Two instrument cards */}
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            background: "var(--border)",
          }}
        >
          {/* Quick Mirror */}
          <div
            id="quickmirror"
            className="instr-card"
            style={{
              background: "#0a0a0a",
              padding: "44px 40px",
              position: "relative",
              overflow: "hidden",
              transition: "background 0.3s",
            }}
          >
            {/* Free tag */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.54rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--green)",
                background: "rgba(100,200,130,0.1)",
                padding: "4px 10px",
              }}
            >
              Free
            </div>

            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold-dim)",
                marginBottom: "12px",
              }}
            >
              Quick Mirror
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.45rem",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "12px",
              }}
            >
              5-minute directional scan
            </h3>

            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--white-dim)",
                lineHeight: 1.75,
                marginBottom: "28px",
              }}
            >
              A fast, directional assessment to reveal which zone you're operating in today. Instant results on page — no
              email required. Designed to give you a quick read before deciding whether to go deeper.
            </p>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                background: "var(--border)",
                marginBottom: "28px",
              }}
            >
              {[
                { num: "9", label: "Questions" },
                { num: "5", label: "Minutes" },
                { num: "Instant", label: "Results" },
              ].map((stat, idx) => (
                <div key={idx} style={{ background: "#0a0a0a", padding: "16px 14px", textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.7rem",
                      fontWeight: 700,
                      color: "var(--gold)",
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.52rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--white-faint)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link href="#quickmirror-start" className="btn-p" style={{ display: "inline-block" }}>
              Start Quick Mirror
            </Link>
          </div>

          {/* Full Diagnostic */}
          <div
            id="fulldiagnostic"
            className="instr-card"
            style={{
              background: "#0a0a0a",
              padding: "44px 40px",
              position: "relative",
              overflow: "hidden",
              borderLeft: "2px solid var(--gold)",
              transition: "background 0.3s",
            }}
          >
            {/* Paid tag */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.54rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
                background: "rgba(201,168,76,0.12)",
                padding: "4px 10px",
              }}
            >
              Paid
            </div>

            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "12px",
              }}
            >
              Full Diagnostic
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.45rem",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "12px",
              }}
            >
              30-minute deep assessment
            </h3>

            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--white-dim)",
                lineHeight: 1.75,
                marginBottom: "28px",
              }}
            >
              A comprehensive structural diagnostic that produces your personal Edge Score (0–100), Salary Defensibility
              Score, and a PDF report delivered via email. Includes Brainpower Density mapping, zone breakdown, and
              personalised repositioning recommendations.
            </p>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                background: "var(--border)",
                marginBottom: "28px",
              }}
            >
              {[
                { num: "30", label: "Questions" },
                { num: "12", label: "Minutes" },
                { num: "PDF", label: "Report" },
              ].map((stat, idx) => (
                <div key={idx} style={{ background: "#0a0a0a", padding: "16px 14px", textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.7rem",
                      fontWeight: 700,
                      color: "var(--gold)",
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.52rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--white-faint)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link href="#fulldiagnostic-start" className="btn-p" style={{ display: "inline-block" }}>
              Start Full Diagnostic
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .instr-card:hover {
          background: #0f0f0f !important;
        }
        @media (max-width: 900px) {
          .reveal > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
