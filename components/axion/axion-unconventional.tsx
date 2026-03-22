"use client";

import { useEffect, useRef, useState } from "react";

const contrasts = [
  {
    conventional: "HR manages people",
    axion: ["HR architects systems.", " People manage themselves when the system gives them the conditions to do so."],
  },
  {
    conventional: "Culture is owned by HR",
    axion: ["Culture is owned by the operating logic.", " HR's job is to design that logic — not curate the mythology."],
  },
  {
    conventional: "Compliance is legal, not strategic",
    axion: ["Labour codes are a philosophical mirror.", " They expose what the organisation deferred. Compliance failure is philosophy failure."],
  },
  {
    conventional: "HR frameworks are universal",
    axion: ["Context is everything.", " Frameworks built for finished institutions destroy unfinished ones."],
  },
  {
    conventional: "Technology is the solution",
    axion: ["Technology is the codification of thinking.", " HROS exists because the framework came first."],
  },
  {
    conventional: "Engagement scores measure health",
    axion: ["Decision latency, founder dependency curves, and regretted attrition", " are the real signals."],
  },
];

export function AxionUnconventional() {
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
      id="unconventional"
      ref={sectionRef}
      style={{
        background: "var(--ink2)",
        padding: "6rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        {/* Section header */}
        <div className={`rv ${visible ? "in" : ""}`} style={{ marginBottom: "3rem" }}>
          <div className="sec-lbl">Why We Operate Differently</div>
          <h2 className="sec-title">
            Structurally different — <em>not tonally.</em>
          </h2>
        </div>

        {/* Contrast table */}
        <div
          className={`rv ${visible ? "in" : ""}`}
          style={{
            border: "1px solid var(--rule)",
            transitionDelay: "0.15s",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderBottom: "2px solid var(--gold)",
              background: "var(--gold-dim)",
            }}
          >
            <div
              style={{
                padding: "1rem 1.5rem",
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--dim)",
              }}
            >
              Conventional
            </div>
            <div
              style={{
                padding: "1rem 1.5rem",
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--gold)",
                borderLeft: "1px solid var(--rule)",
              }}
            >
              Axion Index
            </div>
          </div>

          {/* Data rows */}
          {contrasts.map((c, i) => (
            <div
              key={i}
              className="contrast-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderBottom: i < contrasts.length - 1 ? "1px solid var(--rule2)" : "none",
              }}
            >
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  fontSize: "0.92rem",
                  color: "var(--mist)",
                  lineHeight: 1.7,
                }}
              >
                {c.conventional}
              </div>
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  fontSize: "0.92rem",
                  color: "var(--parchment)",
                  lineHeight: 1.7,
                  borderLeft: "1px solid var(--rule2)",
                  position: "relative",
                }}
              >
                <strong style={{ color: "var(--gold)", fontWeight: 600 }}>{c.axion[0]}</strong>
                {c.axion[1]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 700px) {
          section > div > div:last-child > div {
            grid-template-columns: 1fr !important;
          }
          section > div > div:last-child > div > div:last-child {
            border-left: none !important;
            border-top: 1px solid var(--rule2) !important;
          }
        }
      `}</style>
    </section>
  );
}
