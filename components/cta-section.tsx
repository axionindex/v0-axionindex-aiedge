"use client";

import { useEffect, useRef, useState } from "react";

export function CTASection() {
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
      id="cta"
      ref={sectionRef}
      style={{
        background: "var(--near-black)",
        borderBottom: "1px solid #181818",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "100px 52px",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className={`reveal ${isVisible ? "vis" : ""}`}>
          <div className="sec-lbl" style={{ textAlign: "center" }}>
            Stay Connected
          </div>

          <h2
            className="sec-title"
            style={{
              textAlign: "center",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Join the AI Edge community.
          </h2>

          <p
            className="sec-body"
            style={{
              textAlign: "center",
              maxWidth: "540px",
              margin: "0 auto 40px",
            }}
          >
            Get updates on new frameworks, diagnostic tools, and structural insights. Be first to access HROS — our
            forthcoming Intelligent Payroll platform.
          </p>

          {/* Form */}
          <form
            style={{
              display: "flex",
              gap: "12px",
              maxWidth: "480px",
              margin: "0 auto",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: "1 1 250px",
                minWidth: "250px",
                padding: "16px 20px",
                background: "#0a0a0a",
                border: "1px solid var(--border)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                color: "var(--white)",
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
            <button
              type="submit"
              className="btn-p"
              style={{
                whiteSpace: "nowrap",
                padding: "16px 32px",
              }}
            >
              Join Waitlist
            </button>
          </form>

          {/* Trust line */}
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--white-faint)",
              marginTop: "24px",
            }}
          >
            No spam. Unsubscribe anytime. Framework updates only.
          </p>
        </div>
      </div>
    </div>
  );
}
