"use client";

import { useEffect, useRef, useState } from "react";

export function SalarySection() {
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
      id="salary"
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
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <div className="sec-lbl">Salary Defensibility Score</div>
            <h2 className="sec-title">
              Is your compensation<br />still justified?
            </h2>
            <p className="sec-body">
              The Salary Defensibility Score measures whether your current compensation is anchored to tasks AI cannot
              replicate — or to outputs the market is already repricing.
              <br /><br />
              It's not about whether you deserve what you earn. It's about whether the market will continue to pay it.
            </p>

            {/* Formula box */}
            <div
              style={{
                background: "#0a0a0a",
                border: "1px solid var(--border)",
                padding: "24px",
                marginTop: "28px",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.54rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold-dim)",
                  marginBottom: "14px",
                }}
              >
                The Calculation
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.15rem",
                  fontStyle: "italic",
                  color: "var(--white)",
                  lineHeight: 1.6,
                }}
              >
                SDS = (% Green Zone Work) × (Decision Density) × (Economic Anchoring Factor)
              </div>
            </div>
          </div>

          {/* Right - Score ranges */}
          <div
            style={{
              background: "#0a0a0a",
              border: "1px solid var(--border)",
              padding: "36px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "24px",
              }}
            >
              Score Interpretation
            </div>

            {[
              { range: "80–100", label: "Strong", desc: "Compensation tied to irreducible human work.", color: "var(--green)" },
              { range: "60–79", label: "Moderate", desc: "Some structural risk. Repositioning advisable.", color: "var(--gold)" },
              { range: "40–59", label: "Vulnerable", desc: "Significant AI exposure. Active repositioning required.", color: "var(--amber)" },
              { range: "0–39", label: "Critical", desc: "Compensation is under immediate structural pressure.", color: "var(--red)" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 100px 1fr",
                  gap: "16px",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: item.color,
                  }}
                >
                  {item.range}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--white)",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "var(--white-dim)",
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .reveal > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
