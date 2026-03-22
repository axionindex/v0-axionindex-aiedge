"use client";

import Link from "next/link";

export function AxionFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "4rem 3rem 2.5rem",
        borderTop: "1px solid var(--rule)",
        background: "var(--ink)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Logo & tagline */}
          <div style={{ maxWidth: "320px" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                textDecoration: "none",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "var(--parchment)",
                }}
              >
                Axion
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.52rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Index
              </span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 400,
                color: "var(--dim)",
                lineHeight: 1.6,
                marginBottom: "1rem",
              }}
            >
              Operating Intelligence · Bengaluru
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "1rem",
                fontStyle: "italic",
                color: "var(--mist)",
                lineHeight: 1.5,
              }}
            >
              What holds organisations together is invisible. We make it designable.
            </p>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              gap: "4rem",
              flexWrap: "wrap",
            }}
          >
            {/* Instruments */}
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.54rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                AI Edge Lab
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>
                  <Link
                    href="https://www.axionindex.org/quick-mirror"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--mist)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mist)")}
                  >
                    Quick Mirror — Free
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.axionindex.org/full-diagnostic"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--mist)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mist)")}
                  >
                    Full Diagnostic
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.axionindex.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--mist)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mist)")}
                  >
                    All Instruments ↗
                  </Link>
                </li>
              </ul>
            </div>

            {/* Navigate */}
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.54rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                Navigate
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "What We Do", href: "#what-we-do" },
                  { label: "The Framework", href: "#framework" },
                  { label: "Domains", href: "#domains" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                        fontSize: "0.85rem",
                        color: "var(--mist)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mist)")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.54rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                Connect
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/nahatanitin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--mist)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mist)")}
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:nitin@axionindex.org"
                    style={{
                      fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--mist)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mist)")}
                  >
                    nitin@axionindex.org
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--rule2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.52rem",
              letterSpacing: "0.1em",
              color: "var(--dim)",
            }}
          >
            © {currentYear} Axion Index. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.52rem",
              letterSpacing: "0.1em",
              color: "var(--dim)",
            }}
          >
            Built by Nitin Nahata · Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
