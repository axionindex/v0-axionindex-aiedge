"use client";

import Link from "next/link";

const footerNav = [
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
      { title: "E.D.G.E.", href: "#edge" },
      { title: "Brainpower Density", href: "#bpdcurve" },
      { title: "Ownership Ladders", href: "#ownership" },
    ],
  },
  {
    label: "Assessment",
    items: [
      { title: "Quick Mirror", href: "/quick-mirror" },
      { title: "Full Diagnostic", href: "/full-diagnostic" },
      { title: "Salary Score", href: "#salary" },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "LinkedIn", href: "https://www.linkedin.com/in/nahatanitin/", external: true },
      { title: "Waitlist", href: "#cta" },
      { title: "Email", href: "mailto:nitin@axionindex.org" },
    ],
  },
];

export function AIEdgeFooter() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external || href.startsWith("mailto:")) return;
    
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "40px",
        }}
        className="lg:grid-cols-[auto_1fr_auto]"
      >
        {/* Left - Brand */}
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#C6A86E",
              marginBottom: "8px",
            }}
          >
            AI EDGE LAB
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "14px",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "4px",
            }}
          >
            The structural economics of work in the AI era.
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            A framework for understanding how roles, careers, and organisations must evolve.
          </div>
        </div>

        {/* Center - Nav */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
          className="hidden lg:grid"
        >
          {footerNav.map((section, idx) => (
            <div key={idx}>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "12px",
                }}
              >
                {section.label}
              </div>
              {section.items.map((item, itemIdx) => (
                <a
                  key={itemIdx}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={(e) => handleClick(e, item.href, item.external)}
                  style={{
                    display: "block",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    padding: "4px 0",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C6A86E")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {item.title}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Right - Attribution */}
        <div style={{ textAlign: "right" }} className="hidden lg:block">
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "4px",
            }}
          >
            Nitin Nahata · Founder, Axion Index
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.25)",
              marginBottom: "4px",
            }}
          >
            AI Edge Lab · Doctrine 2026 · Axionindex
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            Framework v1.0 · Updated March 2026
          </div>
        </div>
      </div>

      {/* Mobile attribution */}
      <div
        className="lg:hidden"
        style={{
          marginTop: "24px",
          textAlign: "center",
          fontFamily: "'DM Mono', monospace",
          fontSize: "10px",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        Nitin Nahata · Founder, Axion Index · 2026
      </div>
    </footer>
  );
}
