"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIAlignedIndexPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#0C0B09", 
      fontFamily: "var(--font-instrument), 'Instrument Sans', system-ui, sans-serif" 
    }}>
      {/* Header */}
      <header style={{ 
        padding: "1rem 2rem", 
        borderBottom: "1px solid rgba(196,154,60,.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Link 
          href="/" 
          className="no-underline"
          style={{ 
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#F4EFE6",
            letterSpacing: "0.02em"
          }}
        >
          Axion Index
        </Link>
        <div style={{
          fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
          fontSize: "0.52rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#C49A3C",
          background: "rgba(196,154,60,.1)",
          border: "1px solid rgba(196,154,60,.25)",
          padding: "4px 10px"
        }}>
          BUILDING
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        maxWidth: "720px", 
        margin: "0 auto", 
        padding: "6rem 2rem",
        textAlign: "center"
      }}>
        {/* Eyebrow */}
        <div style={{
          fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
          fontSize: "0.54rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(196,154,60,.6)",
          marginBottom: "1.5rem"
        }}>
          AI Edge Lab · Index 01
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "#F4EFE6",
          lineHeight: 1.1,
          marginBottom: "1rem"
        }}>
          AI Aligned Index<span style={{ color: "#C49A3C" }}>™</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontSize: "1.3rem",
          fontStyle: "italic",
          color: "#C49A3C",
          marginBottom: "2.5rem"
        }}>
          Belief · Architecture · Readiness
        </p>

        {/* Description */}
        <div style={{
          maxWidth: "560px",
          margin: "0 auto 3rem",
          textAlign: "left"
        }}>
          <p style={{
            fontSize: "0.95rem",
            color: "#B0A898",
            lineHeight: 1.8,
            marginBottom: "1.5rem"
          }}>
            The AI Aligned Index measures how ready your organisation&apos;s belief system, architecture, and operating model are for AI integration.
          </p>
          
          <p style={{
            fontSize: "0.95rem",
            color: "#B0A898",
            lineHeight: 1.8,
            marginBottom: "1.5rem"
          }}>
            Most organisations have an AI strategy. Almost none have examined whether their foundational operating assumptions are structurally compatible with AI integration.
          </p>

          <div style={{
            padding: "1.2rem 1.5rem",
            background: "rgba(196,154,60,.06)",
            border: "1px solid rgba(196,154,60,.15)",
            marginBottom: "2rem"
          }}>
            <div style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.52rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#C49A3C",
              marginBottom: "0.8rem"
            }}>
              What This Index Measures
            </div>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0
            }}>
              {[
                "Belief alignment — Does leadership genuinely believe AI will reshape work?",
                "Architecture readiness — Is your operating model structurally compatible?",
                "Decision ownership clarity — Who owns AI integration decisions?",
                "Consequence visibility — Is accountability clear as roles compress?"
              ].map((item, i) => (
                <li key={i} style={{
                  fontSize: "0.85rem",
                  color: "#B0A898",
                  lineHeight: 1.7,
                  paddingLeft: "1rem",
                  position: "relative",
                  marginBottom: "0.5rem"
                }}>
                  <span style={{
                    position: "absolute",
                    left: 0,
                    color: "#C49A3C"
                  }}>·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Waitlist Form */}
        {!submitted ? (
          <div style={{
            maxWidth: "440px",
            margin: "0 auto"
          }}>
            <div style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6B6358",
              marginBottom: "1rem"
            }}>
              Join the waitlist for early access
            </div>
            <form onSubmit={handleSubmit} style={{
              display: "flex",
              gap: "0.5rem"
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1,
                  padding: "14px 16px",
                  fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                  fontSize: "0.9rem",
                  background: "rgba(244,239,230,.04)",
                  border: "1px solid rgba(196,154,60,.2)",
                  color: "#F4EFE6",
                  outline: "none"
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "14px 24px",
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "#C49A3C",
                  color: "#0C0B09",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#D9AE52"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#C49A3C"; }}
              >
                Join →
              </button>
            </form>
          </div>
        ) : (
          <div style={{
            padding: "2rem",
            background: "rgba(91,173,122,.08)",
            border: "1px solid rgba(91,173,122,.2)"
          }}>
            <div style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#5BAD7A",
              marginBottom: "0.5rem"
            }}>
              You&apos;re on the list
            </div>
            <p style={{
              fontSize: "0.9rem",
              color: "#B0A898",
              lineHeight: 1.6
            }}>
              We&apos;ll notify you when the AI Aligned Index is ready for early access.
            </p>
          </div>
        )}

        {/* Back Link */}
        <div style={{ marginTop: "4rem" }}>
          <Link
            href="/"
            className="no-underline"
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6B6358",
              transition: "color 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#C49A3C"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6B6358"; }}
          >
            ← Back to Axion Index
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: "2rem",
        borderTop: "1px solid rgba(196,154,60,.08)",
        textAlign: "center"
      }}>
        <div style={{
          fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
          fontSize: "0.52rem",
          letterSpacing: "0.1em",
          color: "#4A433C"
        }}>
          Axion Index · Nitin Nahata · 2026
        </div>
      </footer>
    </div>
  );
}
