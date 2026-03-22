"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navSections = [
  {
    label: "Doctrine",
    items: [
      { title: "The Three Shifts", href: "#shifts" },
      { title: "Eight Truths", href: "#truths" },
      { title: "What Must Change", href: "#changes" },
    ],
  },
  {
    label: "Framework",
    items: [
      { title: "E.D.G.E. Dimensions", href: "#edge" },
      { title: "Brainpower Density", href: "#bpdcurve" },
      { title: "Ownership Ladders", href: "#ownership" },
    ],
  },
  {
    label: "Assessment",
    items: [
      { title: "Quick Mirror — Free", href: "https://www.axionindex.org/quick-mirror", external: true, live: true },
      { title: "Full Diagnostic", href: "https://www.axionindex.org/full-diagnostic", external: true, live: true },
      { title: "Salary Defensibility", href: "#salary" },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "The Doctrine PDF", href: "https://www.axionindex.org/AI-Edge-Doctrine-2026.pdf", external: true },
      { title: "Sample Report", href: "https://www.axionindex.org/sample-report", external: true },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "LinkedIn", href: "https://www.linkedin.com/in/nahatanitin/", external: true },
      { title: "Waitlist", href: "#cta" },
    ],
  },
];

export function AIEdgeSidebar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) return;
    
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className="hidden lg:flex"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "240px",
        height: "100vh",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        background: "#0A0A0A",
        flexDirection: "column",
        overflowY: "auto",
        zIndex: 100,
      }}
    >
      {/* Brand */}
      <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "#C6A86E",
              marginBottom: "8px",
            }}
          >
            AI EDGE LAB
          </div>
        </Link>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "12px",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.4,
          }}
        >
          The structural economics of work in the AI era.
        </div>
      </div>

      {/* Nav sections */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {navSections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(198,168,110,0.4)",
                padding: "0 20px",
                marginBottom: "8px",
              }}
            >
              {section.label}
            </div>
            {section.items.map((item, itemIdx) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={itemIdx}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={(e) => handleClick(e, item.href, item.external)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "6px 20px",
                    paddingLeft: isActive ? "18px" : "20px",
                    borderLeft: isActive ? "2px solid #C6A86E" : "2px solid transparent",
                    color: isActive ? "#C6A86E" : "rgba(255,255,255,0.4)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  <span>{item.title}</span>
                  {item.live && (
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "8px",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        background: "rgba(91,173,122,0.15)",
                        color: "#5BAD7A",
                        border: "1px solid rgba(91,173,122,0.3)",
                      }}
                    >
                      Live
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Attribution */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontFamily: "'DM Mono', monospace",
          fontSize: "10px",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        Nitin Nahata · Founder, Axion Index
      </div>
    </aside>
  );
}
