"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Glow A */}
        <div
          style={{
            position: "absolute",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.055) 0%, transparent 70%)",
            top: "-200px",
            right: "-150px",
          }}
        />
        {/* Glow B */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.035) 0%, transparent 70%)",
            bottom: "-100px",
            left: "-80px",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "140px 52px 100px",
          maxWidth: "900px",
        }}
      >
        {/* Eyebrow */}
        <div
          className="hero-eyebrow"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "28px",
            opacity: 0,
            animation: "fadeUp 0.8s ease 0.2s forwards",
          }}
        >
          <span style={{ fontSize: "0.45rem", verticalAlign: "middle" }}>◆{"  "}</span>
          A Management Doctrine for the AI Era
        </div>

        {/* Headline */}
        <h1
          className="hero-hl"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
            fontWeight: 900,
            lineHeight: 0.97,
            letterSpacing: "-0.015em",
            marginBottom: "36px",
            opacity: 0,
            animation: "fadeUp 0.9s ease 0.4s forwards",
          }}
        >
          The <em style={{ fontStyle: "italic", color: "var(--gold)" }}>structural<br />economics</em><br />of work in<br />the AI era.
        </h1>

        {/* Rule */}
        <div
          style={{
            width: "56px",
            height: "1px",
            background: "var(--gold)",
            marginBottom: "28px",
            opacity: 0,
            animation: "fadeUp 0.8s ease 0.55s forwards",
          }}
        />

        {/* Thesis */}
        <p
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.22rem)",
            color: "var(--white-dim)",
            maxWidth: "560px",
            lineHeight: 1.85,
            marginBottom: "52px",
            opacity: 0,
            animation: "fadeUp 0.9s ease 0.65s forwards",
          }}
        >
          When intelligence becomes abundant,<br />
          <strong style={{ color: "var(--white)", fontWeight: 500 }}>judgment becomes the scarce resource.</strong><br />
          The AI Edge Lab studies that shift — and builds frameworks to redesign roles, decisions, and organisations for an AI-native economy.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            opacity: 0,
            animation: "fadeUp 0.9s ease 0.82s forwards",
          }}
        >
          <Link href="#assessment" className="btn-p">
            Take the Replaceability Index
          </Link>
          <Link href="#shifts" className="btn-g">
            Read the Doctrine
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "36px",
          left: "52px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          opacity: 0,
          animation: "fadeUp 0.8s ease 1.4s forwards",
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "var(--gold-dim)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "var(--gold)",
              animation: "lineSlide 2s ease-in-out 2s infinite",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--white-faint)",
          }}
        >
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
