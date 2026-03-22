"use client";

import Link from "next/link";

export function AxionFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "64px 32px 48px",
        borderTop: "1px solid var(--border)",
        background: "rgba(10,10,10,0.6)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
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
            gap: "48px",
            marginBottom: "56px",
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
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "var(--parchment)",
                }}
              >
                Axion
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Index
              </span>
            </Link>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 300,
                color: "rgba(245,242,236,0.45)",
                lineHeight: 1.6,
              }}
            >
              Instruments for the Structural Economy
            </p>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              gap: "64px",
              flexWrap: "wrap",
            }}
          >
            {/* Instruments */}
            <div>
              <h4
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "16px",
                }}
              >
                Instruments
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li>
                  <Link
                    href="/ai-edge-lab"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(245,242,236,0.6)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,242,236,0.6)")}
                  >
                    AI Edge Lab
                  </Link>
                </li>
                <li>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(245,242,236,0.3)",
                    }}
                  >
                    Capital Alignment Index
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(245,242,236,0.3)",
                    }}
                  >
                    Governance Futures
                  </span>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "16px",
                }}
              >
                Connect
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/nahatanitin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(245,242,236,0.6)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,242,236,0.6)")}
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.perplexity.ai/computer/a/the-making-of-the-operating-ar-mXeHIIQeSJWFEvWxSQaKtw"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(245,242,236,0.6)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,242,236,0.6)")}
                  >
                    About Nitin Nahata
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              color: "rgba(245,242,236,0.3)",
            }}
          >
            © {currentYear} Axion Index. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              color: "rgba(245,242,236,0.3)",
            }}
          >
            Built by Nitin Nahata
          </p>
        </div>
      </div>
    </footer>
  );
}
