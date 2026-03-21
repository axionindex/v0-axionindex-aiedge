"use client";

import { useEffect, useRef, useState } from "react";
import { CHANGE_TAB_EVENT } from "./navigation";

const changesData = [
  {
    tag: "For The Individual",
    title: "Career strategy rewrite",
    items: [
      { text: "Audit your weekly outputs — how much is AI-compressible?", type: "question" },
      { text: "Seek decision ownership, not just task excellence.", type: "action" },
      { text: "Build consequence capital — not credential capital.", type: "action" },
      { text: "Position above the compression line — or accept repricing.", type: "warning" },
    ],
  },
  {
    tag: "For The Leader",
    title: "Structural question, not a tech question",
    items: [
      { text: "What are you paying for — intelligence output or judgment?", type: "question" },
      { text: "How much of your org is doing work AI already performs?", type: "question" },
      { text: "Map your roles to the Brainpower Density Curve.", type: "action" },
      { text: "Redesign before the market forces the question.", type: "warning" },
    ],
  },
  {
    tag: "For The Organisation",
    title: "Workforce strategy = work redesign",
    items: [
      { text: "Role architecture must change — not just headcount.", type: "action" },
      { text: "Decision rights must be reallocated — not just automated.", type: "action" },
      { text: "Compensation must anchor to scarcity — not tenure.", type: "warning" },
      { text: "The org that moves first gains structural advantage.", type: "insight" },
    ],
  },
];

export function ChangesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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

  // Listen for tab change events from navigation
  useEffect(() => {
    const handleTabChange = (e: CustomEvent<{ tabIndex: number }>) => {
      setActiveTab(e.detail.tabIndex);
    };

    window.addEventListener(CHANGE_TAB_EVENT as string, handleTabChange as EventListener);
    return () => {
      window.removeEventListener(CHANGE_TAB_EVENT as string, handleTabChange as EventListener);
    };
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "question":
        return { symbol: "?", color: "var(--gold)" };
      case "action":
        return { symbol: "→", color: "var(--green)" };
      case "warning":
        return { symbol: "!", color: "var(--amber)" };
      case "insight":
        return { symbol: "◆", color: "var(--gold)" };
      default:
        return { symbol: "→", color: "var(--white-dim)" };
    }
  };

  return (
    <div
      id="changes"
      ref={sectionRef}
      style={{
        background: "var(--black)",
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
        <div className={`reveal ${isVisible ? "vis" : ""}`} style={{ marginBottom: "48px" }}>
          <div className="sec-lbl">What Must Change</div>
          <h2 className="sec-title">
            Three audiences.<br />One structural shift.
          </h2>
          <p className="sec-body" style={{ maxWidth: "650px" }}>
            AI Edge has implications at every level: for the individual professional navigating career risk, for the leader
            reshaping org design, and for the organisation redesigning work itself.
          </p>
        </div>

        {/* Tab buttons */}
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            display: "flex",
            gap: "2px",
            marginBottom: "2px",
            background: "var(--border)",
          }}
        >
          {changesData.map((section, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className="change-tab"
              style={{
                flex: 1,
                padding: "18px 24px",
                background: activeTab === idx ? "var(--near-black)" : "var(--surface)",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s",
                position: "relative",
                textAlign: "left",
              }}
            >
              {/* Active indicator */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: activeTab === idx ? "var(--gold)" : "transparent",
                  transition: "background 0.3s",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: activeTab === idx ? "var(--gold)" : "var(--white-faint)",
                  transition: "color 0.3s",
                }}
              >
                {section.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className={`reveal ${isVisible ? "vis" : ""}`}
          style={{
            background: "var(--near-black)",
            padding: "40px 36px",
            minHeight: "320px",
          }}
        >
          {changesData.map((section, idx) => (
            <div
              key={idx}
              style={{
                display: activeTab === idx ? "block" : "none",
                animation: activeTab === idx ? "fadeIn 0.4s ease" : "none",
              }}
            >
              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: "28px",
                }}
              >
                {section.title}
              </h3>

              {/* Items */}
              <ul style={{ listStyle: "none" }}>
                {section.items.map((item, itemIdx) => {
                  const typeInfo = getTypeIcon(item.type);
                  return (
                    <li
                      key={itemIdx}
                      style={{
                        display: "flex",
                        gap: "16px",
                        padding: "16px 0",
                        borderTop: itemIdx === 0 ? "none" : "1px solid var(--border)",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.8rem",
                          color: typeInfo.color,
                          width: "20px",
                          flexShrink: 0,
                          textAlign: "center",
                          marginTop: "3px",
                        }}
                      >
                        {typeInfo.symbol}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.95rem",
                          color: "var(--white-dim)",
                          lineHeight: 1.7,
                        }}
                      >
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick nav dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          {changesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: activeTab === idx ? "var(--gold)" : "var(--border)",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s, transform 0.2s",
                transform: activeTab === idx ? "scale(1.2)" : "scale(1)",
              }}
              aria-label={`Go to ${changesData[idx].tag}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .change-tab:hover {
          background: var(--near-black) !important;
        }
        @media (max-width: 768px) {
          .reveal > div:nth-child(2) {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}
