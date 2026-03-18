"use client";

import { useEffect, useRef, useState } from "react";

const truthsData = [
  { num: "01", text: "Cognitive output is already being repriced." },
  { num: "02", text: "AI tools are not productivity aids — they are substitutes." },
  { num: "03", text: "Organisations will collapse roles faster than new ones emerge." },
  { num: "04", text: "Judgment is the only human output that cannot be automated." },
  { num: "05", text: "Compensation will follow decision authority — not intelligence output." },
  { num: "06", text: "Job security now requires structural immunity — not tenure or performance." },
  { num: "07", text: "Most professionals are dramatically over-exposed — but don't know yet." },
  { num: "08", text: "The window for repositioning is narrower than most assume." },
];

export function TruthsSection() {
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
      id="truths"
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
          style={{
            display: "grid",
            gridTemplateColumns: "360px 1fr",
            gap: "64px",
          }}
        >
          {/* Left header */}
          <div className={`reveal ${isVisible ? "vis" : ""}`}>
            <div className="sec-lbl">Eight Structural Truths</div>
            <h2 className="sec-title">What we already<br />know to be true.</h2>
            <p className="sec-body">
              These are not predictions. They are observations that are already visible in the data, the market, and the
              operating decisions of forward-looking organisations.
            </p>
          </div>

          {/* Right - truth list */}
          <ul className={`reveal ${isVisible ? "vis" : ""}`} style={{ listStyle: "none" }}>
            {truthsData.map((truth, idx) => (
              <li
                key={idx}
                className="truth-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: "20px",
                  padding: "18px 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "baseline",
                  cursor: "default",
                  transition: "background 0.2s",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.72rem",
                    color: "var(--gold-dim)",
                  }}
                >
                  {truth.num}
                </span>
                <span
                  className="truth-text"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.02rem",
                    color: "var(--white-dim)",
                    lineHeight: 1.65,
                    transition: "color 0.2s",
                  }}
                >
                  {truth.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .truth-row:hover .truth-text {
          color: var(--white) !important;
        }
        @media (max-width: 900px) {
          div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
