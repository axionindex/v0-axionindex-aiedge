"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function AxionCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        padding: "120px 32px",
        background: "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.03) 100%)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "none" : "translateY(20px)",
          transition: "all 0.7s ease",
        }}
      >
        {/* Label */}
        <span className="sec-lbl">Stay Informed</span>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 500,
            color: "var(--parchment)",
            marginBottom: "20px",
            lineHeight: 1.2,
          }}
        >
          New instruments.{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Structural</em> insights.
        </h2>

        {/* Subhead */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 300,
            color: "rgba(245,242,236,0.55)",
            marginBottom: "40px",
            lineHeight: 1.7,
          }}
        >
          Join the waitlist for new instrument releases and receive occasional 
          essays on structural economics.
        </p>

        {/* Form */}
        {status === "success" ? (
          <div
            style={{
              padding: "20px 32px",
              border: "1px solid var(--gold)",
              background: "rgba(201,168,76,0.06)",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                color: "var(--gold)",
              }}
            >
              You&apos;re on the list. We&apos;ll be in touch.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "12px",
              maxWidth: "480px",
              margin: "0 auto",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: "1 1 260px",
                minWidth: "260px",
                padding: "16px 20px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                background: "rgba(20,20,20,0.8)",
                border: "1px solid var(--border)",
                color: "var(--parchment)",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-p"
              style={{
                opacity: status === "loading" ? 0.7 : 1,
                cursor: status === "loading" ? "wait" : "pointer",
              }}
            >
              {status === "loading" ? "..." : "Join Waitlist"}
            </button>
          </form>
        )}

        {/* Trust */}
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(245,242,236,0.3)",
            marginTop: "24px",
          }}
        >
          No spam. Unsubscribe anytime.
        </p>

        {/* Quick access */}
        <div
          style={{
            marginTop: "56px",
            paddingTop: "40px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(245,242,236,0.45)",
              marginBottom: "20px",
            }}
          >
            Or dive straight in
          </p>
          <Link
            href="/ai-edge-lab"
            className="btn-g"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Enter AI Edge Lab
            <span style={{ fontSize: "1.1em" }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
