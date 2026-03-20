"use client";

import Link from "next/link";

const navSections = [
  {
    title: "Doctrine",
    links: [
      { label: "The Three Shifts", href: "#shifts" },
      { label: "Eight Truths", href: "#truths" },
      { label: "What Must Change", href: "#changes" },
    ],
  },
  {
    title: "Framework",
    links: [
      { label: "E.D.G.E. Dimensions", href: "#edge" },
      { label: "Brainpower Density", href: "#bpdcurve" },
      { label: "Ownership Ladders", href: "#ownership" },
    ],
  },
  {
    title: "Assessment",
    links: [
      { label: "Quick Mirror — Free", href: "/quick-mirror" },
      { label: "Full Diagnostic", href: "#fulldiagnostic" },
      { label: "Salary Defensibility", href: "#salary" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/nitin-nahata", external: true },
      { label: "Waitlist", href: "#cta" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--black)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "72px 52px 40px",
        }}
      >
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "80px",
            marginBottom: "56px",
          }}
        >
          {/* Left - Brand */}
          <div>
            <Link
              href="#hero"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--white)",
                textDecoration: "none",
              }}
            >
              AI <span style={{ color: "var(--gold)" }}>EDGE</span> LAB
            </Link>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: "var(--white-dim)",
                lineHeight: 1.7,
                marginTop: "20px",
                marginBottom: "24px",
              }}
            >
              The structural economics of work in the AI era. A framework for understanding how roles, careers, and
              organisations must evolve.
            </p>

            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                color: "var(--white-faint)",
              }}
            >
              <span style={{ color: "var(--gold)" }}>Nitin Nahata</span> · CHRO, Gameskraft
            </div>
          </div>

          {/* Right - Nav sections */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "40px",
            }}
          >
            {navSections.map((section, idx) => (
              <div key={idx}>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "20px",
                  }}
                >
                  {section.title}
                </div>
                <ul style={{ listStyle: "none" }}>
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} style={{ marginBottom: "12px" }}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        className="ftr-link"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.82rem",
                          color: "var(--white-dim)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--border)",
            marginBottom: "28px",
          }}
        />

        {/* Bottom section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--white-faint)",
            }}
          >
            AI Edge Lab · Doctrine 2026 · Axionindex
          </div>

          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.1em",
              color: "var(--white-faint)",
            }}
          >
            Framework v1.0 · Updated March 2026
          </div>
        </div>
      </div>

      <style jsx>{`
        .ftr-link:hover {
          color: var(--gold) !important;
        }
        @media (max-width: 900px) {
          div > div:first-child {
            grid-template-columns: 1fr !important;
          }
          div > div:first-child > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
