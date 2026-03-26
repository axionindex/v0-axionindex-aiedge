"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const [fieldActivated, setFieldActivated] = useState(false);
  const [frameworkStep, setFrameworkStep] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const frameworkRef = useRef<HTMLDivElement>(null);

  // Scroll handler for nav + hero parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      if (heroRef.current) {
        const progress = Math.min(window.scrollY / heroRef.current.offsetHeight, 1);
        setHeroProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Field activation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fieldActivated) {
          setFieldActivated(true);
        }
      },
      { threshold: 0.25 }
    );
    if (fieldRef.current) observer.observe(fieldRef.current);
    return () => observer.disconnect();
  }, [fieldActivated]);

  // Framework sequence observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && frameworkStep === 0) {
          let step = 1;
          const interval = setInterval(() => {
            setFrameworkStep(step);
            step++;
            if (step > 6) clearInterval(interval);
          }, 260);
        }
      },
      { threshold: 0.25 }
    );
    if (frameworkRef.current) observer.observe(frameworkRef.current);
    return () => observer.disconnect();
  }, [frameworkStep]);

  // Archetype definitions for the tier system
  const ARCHETYPES = {
    STRUCTURAL: { label: "Structural Architect", desc: "AI amplifies your leverage. You direct; others produce.", color: "#C4972F", scoreRange: "80–100" },
    LEVERAGER: { label: "Strategic Leverager", desc: "Judgment-dominant. Your 6-month target.", color: "#C4972F", scoreRange: "70–79" },
    BUILDER: { label: "Boundary Builder", desc: "Edge established. Deliberate compounding needed.", color: "#C4972F", scoreRange: "60–69" },
    MANAGER: { label: "Output Manager", desc: "Judgment and output balanced. Active management required.", color: "#C4972F", scoreRange: "50–59" },
    OPERATOR: { label: "Execution Operator", desc: "Output-primary. Immediate composition shift required.", color: "#C4972F", scoreRange: "<50" },
  };

  // Role dots data with archetype assigned to each role
  const dots = [
    { role: "Operating Architect", score: 96, direction: "Expanding", left: 55, top: 10, isGold: true, archetype: ARCHETYPES.STRUCTURAL },
    { role: "Founder / CEO", score: 91, direction: "Holding", left: 78, top: 15, isGold: true, archetype: ARCHETYPES.STRUCTURAL },
    { role: "Board Member", score: 88, direction: "Holding", left: 28, top: 12, isGold: false, archetype: ARCHETYPES.STRUCTURAL },
    { role: "CHRO", score: 74, direction: "Rising", left: 38, top: 22, isGold: false, archetype: ARCHETYPES.LEVERAGER },
    { role: "CFO", score: 68, direction: "Rising", left: 58, top: 28, isGold: false, archetype: ARCHETYPES.BUILDER },
    { role: "Engineer", score: 45, direction: "Under pressure", left: 72, top: 52, isGold: false, archetype: ARCHETYPES.OPERATOR },
    { role: "Data Analyst", score: 38, direction: "Compressing", left: 75, top: 65, isGold: false, archetype: ARCHETYPES.OPERATOR },
    { role: "Payroll Exec", score: 18, direction: "High risk", left: 85, top: 82, isGold: false, archetype: ARCHETYPES.OPERATOR },
  ];

  // Tooltip positioning logic - flips when dot is near edges
  const getTooltipPosition = (leftPct: number, topPct: number) => {
    const flipH = leftPct > 60;
    const flipV = topPct < 20;
    return { flipH, flipV };
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes heroRise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroLock { 0% { opacity: 0; transform: translateY(16px); } 70% { transform: translateY(-2px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes breathe { 0%, 100% { opacity: 0.4; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.15); } }
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(3.8); opacity: 0; } }
        @keyframes tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-track { will-change: transform; }
        .reveal { opacity: 0; transform: translateY(8px); transition: opacity 0.6s var(--ease), transform 0.6s var(--ease); }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[54px] flex items-center justify-between px-6 md:px-10 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(0,0,0,0.96)" : "rgba(0,0,0,0.88)",
          backdropFilter: "blur(24px) saturate(160%)",
        }}
      >
        <a 
          href="#" 
          className="flex-shrink-0 no-underline transition-all duration-[180ms]" 
          style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#C4972F"; e.currentTarget.style.textShadow = "0 0 20px rgba(196,151,47,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.textShadow = "none"; }}
        >
          Axion Index
        </a>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Framework", href: "#framework" },
            { label: "Org Design", href: "#organisation-design" },
            { label: "AI Edge Lab", href: "#diagnostics" },
            { label: "Founder", href: "#founder" },
          ].map((link) => (
            <a key={link.label} href={link.href} className="no-underline transition-colors duration-[180ms] hover:text-[#C4972F]" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
              {link.label}
            </a>
          ))}
        </div>
        <Link
          href="/ai-edge-lab"
          className="flex-shrink-0 whitespace-nowrap no-underline transition-all duration-[180ms]"
          style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "#C4972F", color: "#000000", padding: "0.5rem 1rem", borderRadius: "999px", boxShadow: "0 2px 8px rgba(196,151,47,0.15)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#D9AE52"; e.currentTarget.style.boxShadow = "0 0 20px rgba(196,151,47,0.45), 0 0 8px rgba(196,151,47,0.30)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#C4972F"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(196,151,47,0.15)"; }}
        >
          Quick Mirror — Free
        </Link>
      </nav>

      {/* ═══ S01 — HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-8"
        style={{ background: "#0C0B09" }}
      >
        {/* Glow layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 65% 50% at 50% 38%, rgba(196,151,47,0.09), transparent)",
            opacity: 1 - heroProgress * 0.55,
            transform: `translateY(${-heroProgress * 40}px)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10" style={{ transform: `translateY(${-heroProgress * 18}px)` }}>
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6" style={{ opacity: 0, animation: "heroRise 0.7s var(--ease) 0.2s forwards" }}>
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, rgba(196,151,47,0.5))" }} />
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4972F" }}>
              Operating Intelligence · 2026
            </span>
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, rgba(196,151,47,0.5), transparent)" }} />
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 9vw, 9rem)",
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              color: "rgba(244,239,230,0.92)",
              opacity: 0,
              animation: "heroLock 1.15s cubic-bezier(0.16,1,0.3,1) 0.38s forwards",
            }}
          >
            Rewriting the<br />
            <em style={{ fontStyle: "italic", color: "#C4972F" }}>Operating Logic</em><br />
            of Work
          </h1>

          {/* Subheadline */}
          <p
            className="max-w-[44ch] mx-auto mt-8"
            style={{
              fontFamily: "var(--font-lora), 'Lora', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
              color: "rgba(176,168,152,0.8)",
              lineHeight: 1.72,
              opacity: 0,
              animation: "heroRise 0.85s var(--ease) 0.55s forwards",
            }}
          >
            Most organisations don&apos;t fail because of strategy. They fail because the <strong style={{ color: "rgba(244,239,230,0.85)", fontWeight: 500 }}>system underneath cannot carry it.</strong>
          </p>

          {/* CTA pair */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            style={{
              opacity: 0,
              animation: "heroRise 0.8s var(--ease) 0.72s forwards",
            }}
          >
            <Link
              href="/ai-edge-lab"
              className="no-underline transition-all duration-[180ms]"
              style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, background: "#C4972F", color: "#0C0B09", padding: "14px 32px" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E8D5A3"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#C4972F"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Enter the AI Edge Lab
            </Link>
            <Link
              href="/engage"
              className="no-underline transition-all duration-[180ms]"
              style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(176,168,152,0.7)", border: "1px solid rgba(196,154,60,0.18)", padding: "14px 32px" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C4972F"; e.currentTarget.style.background = "rgba(196,154,60,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,154,60,0.18)"; e.currentTarget.style.background = "transparent"; }}
            >
              Start an Engagement
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div style={{ background: "#141210", padding: "14px 0", borderTop: "1px solid rgba(196,154,60,0.09)", borderBottom: "1px solid rgba(196,154,60,0.09)", overflow: "hidden" }}>
        <div 
          className="ticker-track flex items-center whitespace-nowrap"
          style={{ 
            animation: "tick 140s linear infinite",
            width: "fit-content",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running"; }}
        >
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center">
              {[
                "AI Replaceability Index",
                "Brainpower Density Index",
                "AI Aligned Index",
                "Organisation Decision Architecture",
                "Labour Code Design",
                "Family Business HR",
                "Operating Rhythm Diagnostics",
              ].map((item, i) => (
                <span key={`${setIdx}-${i}`} className="flex items-center" style={{ marginRight: "3rem" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(176,168,152,0.45)" }}>
                    {item}
                  </span>
                  <span style={{ marginLeft: "3rem", color: "rgba(196,154,60,0.3)", fontSize: "0.5rem" }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ S02 — PROBLEM ═══ */}
      <section style={{ background: "#0A0A0A", padding: "9rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1060px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,151,47,0.45)", marginBottom: "2rem" }}>
            The Problem
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", fontWeight: 700, color: "rgba(255,255,255,0.85)", lineHeight: 1.1, marginBottom: "4rem" }}>
            Work is being reshaped by three <em style={{ fontStyle: "italic", color: "#C4972F" }}>irreversible forces.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
            {[
              { num: "01", title: "AI compression", body: "Layers of work are disappearing faster than organisations can redesign for them." },
              { num: "02", title: "Regulatory reset", body: "India's Labour Codes have reset the compliance architecture. Most organisations are treating a design problem as a legal one." },
              { num: "03", title: "Founder dependency", body: "The belief that built the company has not yet become conviction that can survive the founder's absence. That gap is structural — and silent." },
            ].map((signal, i) => (
              <div
                key={signal.num}
                className={`reveal reveal-d${i + 1} group relative transition-all duration-[280ms]`}
                style={{ padding: "2.8rem 2.4rem", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "#111111"; e.currentTarget.style.boxShadow = "inset 0 0 60px rgba(196,151,47,0.10), 0 4px 24px rgba(0,0,0,0.30)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#C4972F", marginBottom: "0.8rem" }}>
                  Signal {signal.num}
                </div>
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: "0.8rem" }}>
                  {signal.title}
                </div>
                <p style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.85rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>
                  {signal.body}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C4972F] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S03 — THE INDEXES ═══ */}
      <section style={{ background: "#141210", padding: "6rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1240px] mx-auto">
          {/* Section label */}
          <div className="reveal flex items-center gap-4 mb-8">
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4972F" }}>
              The Indexes
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,60,0.2)" }} />
          </div>
          
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "rgba(244,239,230,0.92)", lineHeight: 1.08, marginBottom: "1rem" }}>
            Four proprietary instruments for measuring <em style={{ fontStyle: "italic", color: "#C4972F" }}>structural readiness.</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "1rem", color: "rgba(176,168,152,0.8)", lineHeight: 1.85, marginBottom: "3rem", maxWidth: "640px" }}>
            Each index produces a decision-grade signal. Together, they form a complete diagnostic architecture for the AI economy.
          </p>

          {/* 2x2 Grid of Index Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: "1px solid rgba(196,154,60,0.18)" }}>
            {[
              { 
                num: "01", 
                title: "AI Replaceability Index", 
                tag: "Individual",
                body: "Measures how much of your current work AI can perform — and what that means for your professional defensibility. Quick Mirror is the free 5-minute version. The full diagnostic maps role-level risk across an entire organisation.",
                link: "/replaceability",
                live: true
              },
              { 
                num: "02", 
                title: "Brainpower Density Index", 
                tag: "Leadership",
                body: "What percentage of a leader&apos;s time is genuinely consequential work? This index measures the gap between organisational altitude and operational drag — and produces a redesign target.",
                link: "/brainpower",
                live: false
              },
              { 
                num: "03", 
                title: "AI Aligned Index", 
                tag: "Strategic Readiness",
                body: "Measures whether leadership teams are aligned on AI&apos;s role in the organisation. Surfaces hidden disagreements about urgency, adoption, and structural change before they become operational failure.",
                link: "/ai-aligned",
                live: false
              },
              { 
                num: "04", 
                title: "Organisation Decision Architecture", 
                tag: "Organisation",
                body: "Maps structural AI exposure across the entire organisation. Identifies where decision authority is misaligned with AI reality. Produces a redesign roadmap with hard 12-month targets. Delivered as a full engagement.",
                link: "/org-design",
                live: false
              },
            ].map((idx, i) => (
              <div
                key={idx.num}
                className={`reveal reveal-d${i + 1} relative group transition-all duration-[250ms]`}
                style={{ 
                  padding: "2.2rem 2rem", 
                  borderRight: i % 2 === 0 ? "1px solid rgba(196,154,60,0.18)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(196,154,60,0.18)" : "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,154,60,0.04)"; e.currentTarget.style.boxShadow = "inset 0 0 40px rgba(196,154,60,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Top bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#C4972F] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                
                {/* Header row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4972F" }}>
                      Index {idx.num}
                    </span>
                    <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(176,168,152,0.5)", padding: "2px 6px", border: "1px solid rgba(196,154,60,0.18)" }}>
                      {idx.tag}
                    </span>
                  </div>
                  {idx.live && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5BAD7A] live-dot" />
                      <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5BAD7A" }}>Live</span>
                    </span>
                  )}
                </div>
                
                {/* Title */}
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 700, color: "rgba(244,239,230,0.92)", marginBottom: "0.8rem", lineHeight: 1.2 }}>
                  {idx.title}
                </h3>
                
                {/* Body */}
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.85rem", color: "rgba(176,168,152,0.7)", lineHeight: 1.75, marginBottom: "1.2rem" }}>
                  {idx.body}
                </p>
                
                {/* Link */}
                <Link 
                  href={idx.link}
                  className="no-underline transition-colors duration-[180ms] hover:text-[#E8D5A3]"
                  style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4972F" }}
                >
                  {idx.live ? "Try Quick Mirror →" : "Learn More →"}
                </Link>
              </div>
            ))}
          </div>

          {/* Primary CTA below grid */}
          <div className="reveal mt-8">
            <Link
              href="/ai-edge-lab"
              className="inline-block no-underline transition-all duration-[180ms]"
              style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, background: "#C4972F", color: "#0C0B09", padding: "14px 32px" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E8D5A3"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#C4972F"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Enter the AI Edge Lab →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ S04 — SYSTEM FLOW ═══ */}
      <section style={{ background: "#141210", padding: "6rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1240px] mx-auto">
          {/* Section label */}
          <div className="reveal flex items-center gap-4 mb-8">
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4972F" }}>
              The Compound Logic
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,60,0.2)" }} />
          </div>
          
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "rgba(244,239,230,0.92)", lineHeight: 1.08, marginBottom: "1rem" }}>
            Individual scores build into <em style={{ fontStyle: "italic", color: "#C4972F" }}>organisational intelligence.</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "1rem", color: "rgba(176,168,152,0.8)", lineHeight: 1.85, marginBottom: "3rem", maxWidth: "640px" }}>
            The four indexes are not independent assessments. They are a layered system — each level feeding into the next.
          </p>

          {/* System Flow Container */}
          <div 
            className="reveal reveal-d3"
            style={{ 
              border: "1px solid rgba(196,154,60,0.18)", 
              padding: "2.5rem", 
              background: "rgba(196,154,60,0.03)",
            }}
          >
            {/* Header label */}
            <div className="text-center mb-6" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(176,168,152,0.5)" }}>
              How the indexes compound
            </div>

            {/* 4 Nodes in a row with → separators */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
              {[
                { tier: "Index 01", title: "Individual Score", metric: "Edge Score 0–100" },
                { tier: "Index 02", title: "Leadership Score", metric: "Density % + Altitude" },
                { tier: "Index 04", title: "Org Architecture", metric: "Exposure Map + Roadmap" },
                { tier: "Output", title: "Redesign Logic", metric: "12-Month Targets" },
              ].map((node, i, arr) => (
                <div key={node.tier} className="flex items-center">
                  {/* Node */}
                  <div 
                    className="text-center transition-all duration-[250ms]"
                    style={{ 
                      padding: "1.5rem 2rem", 
                      border: "1px solid rgba(196,154,60,0.18)", 
                      minWidth: "180px",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "inset 0 0 60px rgba(196,154,60,0.03)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(176,168,152,0.5)", marginBottom: "0.5rem" }}>
                      {node.tier}
                    </div>
                    <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: "rgba(244,239,230,0.85)", marginBottom: "0.3rem" }}>
                      {node.title}
                    </div>
                    <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#C4972F" }}>
                      {node.metric}
                    </div>
                  </div>
                  
                  {/* Arrow separator (not on last) */}
                  {i < arr.length - 1 && (
                    <span className="hidden md:block px-4" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "1.2rem", color: "rgba(196,154,60,0.4)" }}>→</span>
                  )}
                  {i < arr.length - 1 && (
                    <span className="block md:hidden py-2" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "1.2rem", color: "rgba(196,154,60,0.4)" }}>↓</span>
                  )}
                </div>
              ))}
            </div>

            {/* Caption */}
            <p className="text-center mt-6" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.95rem", color: "rgba(176,168,152,0.6)" }}>
              The system builds on itself — <strong style={{ color: "#C4972F", fontStyle: "normal", fontWeight: 700 }}>individual clarity becomes organisational intelligence.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ═══ S05 — COMPRESSION-JUDGMENT FIELD ═══ */}
      <section ref={fieldRef} style={{ background: "#2C2824", padding: "6rem 1.5rem 8rem" }} className="sm:px-14">
        <div className="max-w-[1240px] mx-auto">
          {/* Section label */}
          <div className="reveal flex items-center gap-4 mb-8">
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4972F" }}>
              The Compression-Judgment Field
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,60,0.2)" }} />
          </div>
          
          {/* Headline */}
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "rgba(244,239,230,0.92)", lineHeight: 1.08, marginBottom: "1rem" }}>
            Every role has an <em style={{ fontStyle: "italic", color: "#C4972F" }}>address.</em>
          </h2>
          {/* Sub */}
          <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "1rem", color: "rgba(176,168,152,0.8)", lineHeight: 1.85, marginBottom: "3rem", maxWidth: "640px" }}>
            The CJF is Axion Index&apos;s signature diagnostic map — plotting the two forces that determine every role&apos;s future: how much of the work AI can compress, and how much judgment it demands.
          </p>
          
          {/* 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">

          {/* The Field - with wrapper for axis labels */}
          <div className="relative max-w-[680px] mx-auto pl-14">
            {/* Y-axis label - OUTSIDE field, far left, rotated, golden, arrow on right */}
            <div
              className="absolute transition-opacity duration-500"
              style={{ 
                left: "-2rem", 
                top: "50%", 
                transform: "translateY(-50%) rotate(-90deg)", 
                transformOrigin: "center center",
                opacity: fieldActivated ? 1 : 0, 
                transitionDelay: "400ms", 
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                fontSize: "0.6rem", 
                fontWeight: 500,
                letterSpacing: "0.16em", 
                textTransform: "uppercase", 
                color: "#C4972F", 
                whiteSpace: "nowrap" 
              }}
            >
              Judgment Ownership ↑
            </div>

            {/* Field container */}
            <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
              {/* Grid - with bolder, thicker lines */}
              <div
                className="absolute inset-0 transition-opacity duration-[600ms]"
                style={{
                  border: "2px solid rgba(255,255,255,0.35)",
                  opacity: fieldActivated ? 1 : 0,
                }}
              >
                <div className="absolute top-1/2 left-0 right-0" style={{ height: "2px", background: "rgba(255,255,255,0.25)", transform: "translateY(-50%)" }} />
                <div className="absolute left-1/2 top-0 bottom-0" style={{ width: "2px", background: "rgba(255,255,255,0.25)", transform: "translateX(-50%)" }} />
              </div>

            {/* Diagonal */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="diagGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(196,151,47,0.2)" />
                  <stop offset="100%" stopColor="rgba(196,151,47,0.6)" />
                </linearGradient>
              </defs>
              <line
                x1="5" y1="95" x2="95" y2="5"
                stroke="url(#diagGrad)"
                strokeWidth="0.3"
                strokeDasharray="150"
                strokeDashoffset={fieldActivated ? 0 : 150}
                style={{ transition: "stroke-dashoffset 900ms ease-out 800ms" }}
              />
            </svg>

              {/* Quadrant labels - all four visible, bold and slightly bigger */}
              {/* Top-left: Insight Work */}
              <div
                className="absolute transition-opacity duration-500"
                style={{ top: "1rem", left: "1rem", opacity: fieldActivated ? 1 : 0, transitionDelay: "1700ms", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}
              >
                Insight Work
              </div>
              {/* Top-right: Judgment Work */}
              <div
                className="absolute transition-opacity duration-500"
                style={{ top: "1rem", right: "1rem", opacity: fieldActivated ? 1 : 0, transitionDelay: "1700ms", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", textAlign: "right" }}
              >
                Judgment Work
              </div>
              {/* Bottom-left: Automated Work */}
              <div
                className="absolute transition-opacity duration-500"
                style={{ bottom: "1rem", left: "1rem", opacity: fieldActivated ? 1 : 0, transitionDelay: "1700ms", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}
              >
                Automated Work
              </div>
              {/* Bottom-right: Execution Work */}
              <div
                className="absolute transition-opacity duration-500"
                style={{ bottom: "1rem", right: "1rem", opacity: fieldActivated ? 1 : 0, transitionDelay: "1700ms", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", textAlign: "right" }}
              >
                Execution Work
              </div>

              {/* Zone labels - positioned along the diagonal */}
            <div
              className="absolute transition-opacity duration-500"
              style={{ top: "28%", left: "12%", opacity: fieldActivated ? 1 : 0, transitionDelay: "1400ms", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", color: "#C4972F", textTransform: "uppercase", fontWeight: 500 }}
            >
              Defensible
            </div>
            <div
              className="absolute transition-opacity duration-500"
              style={{ bottom: "12%", right: "12%", opacity: fieldActivated ? 1 : 0, transitionDelay: "1400ms", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", color: "#C4972F", textTransform: "uppercase", fontWeight: 500 }}
            >
              Compressible
            </div>

            {/* Role dots */}
            {dots.map((dot, i) => {
              const { flipH, flipV } = getTooltipPosition(dot.left, dot.top);
              const getDotColor = () => {
                if (dot.isGold) return "#C4972F";
                if (dot.score >= 80) return "rgba(255,255,255,0.55)";
                if (dot.score >= 60) return "rgba(255,255,255,0.45)";
                if (dot.score >= 50) return "rgba(255,255,255,0.35)";
                return "rgba(255,255,255,0.25)";
              };
              return (
                <div
                  key={dot.role}
                  className="group absolute cursor-pointer"
                  style={{
                    left: `${dot.left}%`,
                    top: `${dot.top}%`,
                    transform: "translate(-50%, -50%)",
                    opacity: fieldActivated ? 1 : 0,
                    transition: `opacity 350ms ease-out ${2100 + i * 75}ms`,
                  }}
                  onMouseEnter={(e) => {
                    const inner = e.currentTarget.querySelector(".dot-inner") as HTMLElement;
                    if (inner) { inner.style.transform = "scale(2.6)"; inner.style.background = "#C4972F"; inner.style.boxShadow = "0 0 16px rgba(196,151,47,0.65), 0 0 32px rgba(196,151,47,0.35)"; }
                  }}
                  onMouseLeave={(e) => {
                    const inner = e.currentTarget.querySelector(".dot-inner") as HTMLElement;
                    if (inner) { inner.style.transform = "scale(1)"; inner.style.background = getDotColor(); inner.style.boxShadow = dot.isGold ? "0 0 12px rgba(196,151,47,0.4)" : "none"; }
                  }}
                >
                  <div
                    className="dot-inner w-3 h-3 rounded-full transition-all duration-200"
                    style={{
                      background: getDotColor(),
                      boxShadow: dot.isGold ? "0 0 12px rgba(196,151,47,0.4)" : "none",
                    }}
                  />
                  {dot.isGold && fieldActivated && (
                    <div
                      className="absolute inset-0 w-3 h-3 rounded-full pointer-events-none"
                      style={{ background: "#C4972F", animation: "pulse 2.6s infinite", animationDelay: `${2900 + i * 200}ms` }}
                    />
                  )}
                  {/* Role + Archetype badge floating above hovered dot */}
                  <div
                    className="absolute opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 z-30"
                    style={{
                      bottom: "calc(100% + 10px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      whiteSpace: "nowrap",
                      background: "rgba(0,0,0,0.95)",
                      border: "1px solid rgba(196,151,47,0.4)",
                      padding: "6px 12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: "2px" }}>
                      {dot.role}
                    </div>
                    <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4972F" }}>
                      {dot.archetype.label}
                    </div>
                  </div>
                  {/* Enhanced Tooltip with Archetype System */}
                  <div
                    className={`absolute opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 z-20 ${flipH ? 'right-full mr-3' : 'left-full ml-3'} ${flipV ? 'top-0' : 'bottom-0'}`}
                    style={{ minWidth: "210px", maxWidth: "250px" }}
                  >
                    <div style={{ background: "rgba(10,10,10,0.97)", border: "1px solid rgba(196,151,47,0.2)", borderLeft: "2px solid #C4972F", padding: "1.1rem 1.3rem", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}>
                      {/* Role name */}
                      <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "0.6rem", lineHeight: 1.2 }}>
                        {dot.role}
                      </div>
                      {/* Divider */}
                      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "0.6rem" }} />
                      {/* Score row */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.7rem" }}>
                        <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.42rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(196,151,47,0.6)" }}>Edge Score</span>
                        <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700, color: "#C4972F", lineHeight: 1 }}>{dot.score}</span>
                        <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.42rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginLeft: "auto" }}>{dot.direction}</span>
                      </div>
                      {/* Archetype badge */}
                      <div style={{ background: "rgba(196,151,47,0.08)", border: "1px solid rgba(196,151,47,0.2)", padding: "0.5rem 0.7rem", marginBottom: "0.5rem" }}>
                        <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#C4972F", marginBottom: "0.25rem" }}>
                          {dot.archetype.scoreRange} · {dot.archetype.label}
                        </div>
                        <div style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                          {dot.archetype.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>

            {/* X-axis label - OUTSIDE field, below, right-aligned, golden */}
            <div
              className="transition-opacity duration-500"
              style={{ 
                textAlign: "right", 
                marginTop: "0.75rem",
                opacity: fieldActivated ? 1 : 0, 
                transitionDelay: "400ms", 
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                fontSize: "0.6rem", 
                fontWeight: 500,
                letterSpacing: "0.16em", 
                textTransform: "uppercase", 
                color: "#C4972F" 
              }}
            >
              AI Compression →
            </div>
          </div>

            {/* Right Column: Explanation + Legend */}
            <div>
              {/* Two paragraphs */}
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "rgba(176,168,152,0.8)", lineHeight: 1.8, marginBottom: "1.2rem" }}>
                The Compression-Judgment Field maps two axes that determine every role&apos;s future. The vertical axis measures how much genuine human judgment the role requires. The horizontal axis measures how much of the work AI can already compress.
              </p>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "rgba(176,168,152,0.8)", lineHeight: 1.8, marginBottom: "2rem" }}>
                Your position on the field is your Edge Score. The higher and further left, the more defensible your role. The lower and further right, the more at risk from compression.
              </p>

              {/* Archetype Legend Table */}
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(196,154,60,0.18)" }}>
                    <th style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(176,168,152,0.5)", padding: "0.5rem 0.8rem", textAlign: "left" }}>Archetype</th>
                    <th style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(176,168,152,0.5)", padding: "0.5rem 0.8rem", textAlign: "left" }}>Characteristic</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { archetype: "Structural Architect", char: "Designs systems. AI cannot replace systemic judgment." },
                    { archetype: "Strategic Leverager", char: "Uses AI to amplify judgment. Stays above compression." },
                    { archetype: "Boundary Builder", char: "Manages AI-human interface. Role evolving rapidly." },
                    { archetype: "Output Manager", char: "Manages AI outputs. Partial compression exposure." },
                    { archetype: "Execution Operator", char: "High compression risk. Redesign required now." },
                  ].map((row, i, arr) => (
                    <tr key={row.archetype} style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(196,154,60,0.09)" : "none" }}>
                      <td style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", color: "#C4972F", padding: "0.55rem 0.8rem" }}>{row.archetype}</td>
                      <td style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.78rem", color: "rgba(176,168,152,0.6)", padding: "0.55rem 0.8rem" }}>{row.char}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* CTA */}
              <a
                href="https://www.axionindex.org/ai-edge-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 no-underline transition-all duration-[180ms]"
                style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(176,168,152,0.7)", border: "1px solid rgba(196,154,60,0.18)", padding: "0.8rem 1.4rem" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C4972F"; e.currentTarget.style.background = "rgba(196,154,60,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,154,60,0.18)"; e.currentTarget.style.background = "transparent"; }}
              >
                Locate your role — Try Quick Mirror →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ S06 — BRAINPOWER DENSITY ═══ */}
      <section style={{ background: "#141210", padding: "6rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1240px] mx-auto">
          {/* Section label */}
          <div className="reveal flex items-center gap-4 mb-8">
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4972F" }}>
              Brainpower Density Index
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,60,0.2)" }} />
          </div>
          
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "rgba(244,239,230,0.92)", lineHeight: 1.08, marginBottom: "3rem" }}>
            What percentage of your week is <em style={{ fontStyle: "italic", color: "#C4972F" }}>genuinely consequential?</em>
          </h2>

          {/* 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Intro + Tabs */}
            <div>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "rgba(176,168,152,0.8)", lineHeight: 1.85, marginBottom: "1.2rem" }}>
                Most leaders believe they work in high-impact, judgment-led work most of the time. The data says otherwise. The Brainpower Density Index measures the gap — and gives leaders the language and architecture to close it.
              </p>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "rgba(176,168,152,0.8)", lineHeight: 1.85, marginBottom: "2rem" }}>
                Select your density profile to see what a typical week looks like — and what it should look like.
              </p>

              {/* 3-tab selector */}
              <div className="flex" style={{ border: "1px solid rgba(196,154,60,0.18)" }}>
                {["Low Density", "Mid Density", "High Density"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => {
                      const insight = document.getElementById("density-insight");
                      const bars = document.querySelectorAll(".density-bar");
                      const values = [
                        [15, 10, 35, 25, 15],
                        [35, 20, 25, 12, 8],
                        [60, 22, 10, 5, 3],
                      ];
                      const insights = [
                        "<strong>Low Density Leader</strong> — Less than 25% of working hours are in genuinely judgment-led work. The rest is execution, coordination, and reporting that should sit below the leader's altitude. Decision latency is high. Strategic output is compressed.",
                        "<strong>Mid Density Leader</strong> — Around 55% in judgment and strategic work. Better than average, but coordination and execution still consume a significant fraction. Redesign opportunity exists at the margins — where 10% reallocation produces disproportionate output gain.",
                        "<strong>High Density Leader</strong> — Over 80% in judgment-led and strategic work. The operating architecture is working. Decision latency is low. This leader is functioning at the altitude the role demands — and the organisation benefits proportionally.",
                      ];
                      if (insight) insight.innerHTML = insights[i];
                      bars.forEach((bar, bi) => {
                        (bar as HTMLElement).style.width = values[i][bi] + "%";
                      });
                      document.querySelectorAll(".density-tab").forEach((t, ti) => {
                        (t as HTMLElement).style.background = ti === i ? "rgba(196,154,60,0.1)" : "transparent";
                        (t as HTMLElement).style.color = ti === i ? "#C4972F" : "rgba(176,168,152,0.5)";
                      });
                    }}
                    className="density-tab flex-1 text-center cursor-pointer transition-all duration-[180ms]"
                    style={{ 
                      fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                      fontSize: "0.58rem", 
                      letterSpacing: "0.08em", 
                      textTransform: "uppercase", 
                      padding: "0.6rem 1.2rem",
                      background: i === 0 ? "rgba(196,154,60,0.1)" : "transparent",
                      color: i === 0 ? "#C4972F" : "rgba(176,168,152,0.5)",
                      border: "none",
                      borderRight: i < 2 ? "1px solid rgba(196,154,60,0.18)" : "none",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Insight box */}
              <div id="density-insight" style={{ padding: "1rem 1.3rem", border: "1px solid rgba(196,154,60,0.18)", borderTop: "none", background: "rgba(196,154,60,0.04)", fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "rgba(176,168,152,0.8)", lineHeight: 1.7 }}>
                <strong style={{ color: "#C4972F" }}>Low Density Leader</strong> — Less than 25% of working hours are in genuinely judgment-led work. The rest is execution, coordination, and reporting that should sit below the leader&apos;s altitude. Decision latency is high. Strategic output is compressed.
              </div>
            </div>

            {/* Right: Bar Chart */}
            <div style={{ border: "1px solid rgba(196,154,60,0.18)", padding: "1.5rem", background: "rgba(196,154,60,0.02)" }}>
              {[
                { label: "Judgment work", value: 15, type: "hi" },
                { label: "Strategic input", value: 10, type: "hi" },
                { label: "Coordination", value: 35, type: "lo" },
                { label: "Execution", value: 25, type: "lo" },
                { label: "Reporting / admin", value: 15, type: "lo" },
              ].map((bar, i) => (
                <div key={bar.label} className="flex items-center gap-3 mb-3">
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", color: "rgba(176,168,152,0.5)", minWidth: "120px", textAlign: "right" }}>
                    {bar.label}
                  </div>
                  <div className="flex-1" style={{ height: "8px", background: "rgba(196,154,60,0.1)" }}>
                    <div 
                      className="density-bar h-full transition-all duration-500"
                      style={{ 
                        width: bar.value + "%", 
                        background: bar.type === "hi" ? "#C4972F" : "#8C3B28",
                      }}
                    />
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", color: "rgba(176,168,152,0.5)", minWidth: "2.5rem" }}>
                    {bar.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ S07 — FRAMEWORK ═══ */}
      <section id="framework" ref={frameworkRef} style={{ background: "#1A2030", padding: "6rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1240px] mx-auto">
          {/* Section label */}
          <div className="reveal flex items-center gap-4 mb-8">
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4972F" }}>
              The Core Framework
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,60,0.2)" }} />
          </div>
          
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "rgba(244,239,230,0.92)", lineHeight: 1.08, marginBottom: "1rem" }}>
            Belief → Conviction → <em style={{ fontStyle: "italic", color: "#C4972F" }}>Rhythm</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "1rem", color: "rgba(176,168,152,0.8)", lineHeight: 1.85, marginBottom: "3rem", maxWidth: "640px" }}>
            Every Axion Index engagement diagnoses where an organisation is stuck in this sequence. This is not a leadership philosophy. It is an operating sequence — and its failure at any stage is detectable before it becomes catastrophic.
          </p>

          {/* 4-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-4" style={{ border: "1px solid rgba(196,154,60,0.18)" }}>
            {[
              { stage: "Stage 01", word: "Belief", desc: "The founder's private conviction. Felt before it can be articulated. Fragile if it lives in one person's head.", isFailure: false },
              { stage: "Stage 02", word: "Conviction", desc: "Belief that has been shared, tested, and internalised. It can now survive disagreement without the founder in the room.", isFailure: false },
              { stage: "Stage 03", word: "Rhythm", desc: "Conviction that has become repeatable behaviour — consistent decisions, predictable culture, governance that holds under pressure.", isFailure: false },
              { stage: "Failure Mode", word: "Fragility", desc: "Belief without conviction becomes fragility. Conviction without rhythm becomes bureaucracy. This is where most organisations lose the plot.", isFailure: true },
            ].map((node, i) => (
              <div
                key={node.stage}
                className="relative transition-all duration-300"
                style={{
                  padding: "2.2rem 1.5rem",
                  borderRight: i < 3 ? "1px solid rgba(196,154,60,0.18)" : "none",
                  background: node.isFailure ? "rgba(140,59,40,0.06)" : "transparent",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = node.isFailure ? "rgba(140,59,40,0.1)" : "rgba(196,154,60,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = node.isFailure ? "rgba(140,59,40,0.06)" : "transparent"; }}
              >
                {/* Arrow connector (not on last) */}
                {i < 3 && (
                  <div 
                    className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 items-center justify-center z-10"
                    style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.9rem", color: "#C4972F", background: "#1A2030", border: "1px solid rgba(196,154,60,0.18)", padding: "2px 4px" }}
                  >
                    →
                  </div>
                )}
                
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: node.isFailure ? "#8C3B28" : "#C4972F", marginBottom: "1rem" }}>
                  {node.stage}
                </div>
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 700, color: node.isFailure ? "#8C3B28" : "rgba(244,239,230,0.85)", marginBottom: "0.8rem" }}>
                  {node.word}
                </div>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.8rem", color: "rgba(176,168,152,0.6)", lineHeight: 1.75 }}>
                  {node.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Caption */}
          <p className="reveal text-center mt-6" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(176,168,152,0.6)" }}>
            Every engagement begins with one question: <strong style={{ color: "#C4972F", fontStyle: "normal", fontWeight: 700 }}>where in this sequence has your organisation broken down?</strong>
          </p>
        </div>
      </section>

      {/* ═══ S06 — DIAGNOSTICS ═══ */}
      <section id="diagnostics" style={{ background: "#FFFFFF", padding: "8rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1060px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A07820", marginBottom: "2rem" }}>
            The AI Edge Lab
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#141412", lineHeight: 1.15, marginBottom: "1rem" }}>
            The live instrument layer. <em style={{ fontStyle: "italic", color: "#C4972F" }}>Start with signal.</em>
          </h2>
          <p className="reveal reveal-d2 max-w-[44ch]" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#878580", lineHeight: 1.8, marginBottom: "3rem" }}>
            Two entry points. Both built on the Belief → Conviction → Rhythm framework. Start free. Go deeper when ready.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.6rem]">
            {[
              { name: "Quick Mirror", sub: "5-minute organisational health snapshot", badge: "Free", href: "/ai-edge-lab" },
              { name: "Full Diagnostic — PDF Report", sub: "Comprehensive people system audit", badge: "Coming Soon", href: "#", disabled: true },
            ].map((card, i) => (
              <Link
                key={card.name}
                href={card.href}
                className={`reveal reveal-d${i + 1} group block no-underline transition-all duration-[180ms]`}
                style={{ background: "rgba(196,151,47,0.04)", border: "1px solid rgba(196,151,47,0.18)", borderRadius: "4px", padding: "1.7rem 2rem" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(5px) translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(196,151,47,0.18), 0 0 24px rgba(196,151,47,0.12)"; e.currentTarget.style.background = "rgba(196,151,47,0.08)"; e.currentTarget.style.borderColor = "rgba(196,151,47,0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0) translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(196,151,47,0.04)"; e.currentTarget.style.borderColor = "rgba(196,151,47,0.18)"; }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#A07820", marginBottom: "0.3rem" }}>{card.name}</div>
                    <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", color: "#878580" }}>{card.sub}</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", color: "#C4972F", border: "1px solid rgba(196,151,47,0.3)", padding: "0.25rem 0.6rem", borderRadius: "2px" }}>
                    {card.badge}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="reveal mt-6" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#878580" }}>
            More instruments inside the Lab ��� 3i Labour Code Index™, Workforce Architecture Diagnostics™, and more building.
          </p>
        </div>
      </section>

      {/* ═══ S08 — DOMAINS ═══ */}
      <section style={{ background: "#F4EFE6", padding: "6rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1240px] mx-auto">
          {/* Section label */}
          <div className="reveal flex items-center gap-4 mb-8">
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8C3B28" }}>
              Areas of Practice
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(140,59,40,0.2)" }} />
          </div>
          
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#0C0B09", lineHeight: 1.08, marginBottom: "3rem" }}>
            Deep expertise in the domains <em style={{ fontStyle: "italic", color: "#C4972F" }}>conventional HR has left most exposed.</em>
          </h2>

          {/* 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "Labour Codes as Organisational Design",
                body: "India's new Labour Codes are not primarily a compliance question. They are a design problem — exposing the institutional debt organisations built while scaling past human infrastructure. Axion Index translates legislative complexity into operating architecture: compliance as a people system, not a legal checkbox.",
                link: "/labour-codes"
              },
              { 
                title: "Family Business HR",
                body: "The largest employer class in India has almost no frameworks designed for it. Loyalty vs merit, patriarch authority, multi-generational belief systems — Axion Index builds operating logic for organisations where blood and business intersect. This is not conventional HR. It is a distinct operating discipline.",
                link: "/family-business"
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`reveal reveal-d${i + 1} group relative transition-all duration-[250ms]`}
                style={{ padding: "2.2rem", border: "1px solid rgba(140,59,40,0.15)", background: "#FAF8F4" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8C3B28"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "inset 0 0 50px rgba(196,154,60,0.07)"; const bar = e.currentTarget.querySelector(".top-bar") as HTMLElement; if (bar) bar.style.transform = "scaleX(1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(140,59,40,0.15)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; const bar = e.currentTarget.querySelector(".top-bar") as HTMLElement; if (bar) bar.style.transform = "scaleX(0)"; }}
              >
                {/* Top bar */}
                <div className="top-bar absolute top-0 left-0 right-0 h-[3px] bg-[#8C3B28] origin-left transition-transform duration-300" style={{ transform: "scaleX(0)" }} />
                
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C3B28", marginBottom: "1rem" }}>
                  Domain Practice
                </div>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#0C0B09", marginBottom: "0.8rem" }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.85rem", color: "#4A433C", lineHeight: 1.75, marginBottom: "1.2rem" }}>
                  {card.body}
                </p>
                <Link
                  href={card.link}
                  className="no-underline transition-colors duration-[180ms]"
                  style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C3B28" }}
                >
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S09 — PROOF NUMBERS ═══ */}
      <section style={{ background: "#141210", padding: "6rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1240px] mx-auto">
          {/* Section label */}
          <div className="reveal flex items-center gap-4 mb-8">
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4972F" }}>
              The Evidence
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,60,0.2)" }} />
          </div>
          
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "rgba(244,239,230,0.92)", lineHeight: 1.08, marginBottom: "3rem" }}>
            The numbers that make <em style={{ fontStyle: "italic", color: "#C4972F" }}>the argument.</em>
          </h2>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(196,154,60,0.18)" }}>
            {[
              { 
                number: "60%",
                label: "of work tasks are AI-compressible",
                body: "In the average knowledge-work role, more than half of daily task volume can be partially or fully performed by AI — without loss of output quality."
              },
              { 
                number: "<40%",
                label: "of leadership time is genuinely consequential",
                body: "In most organisations, senior leaders spend less than 40% of their working week in the judgment-led work their role was designed for. The rest is execution drag."
              },
              { 
                number: "1.3–1.5×",
                label: "productivity uplift from architectural redesign",
                body: "Organisations that realign role design with the Compression-Judgment framework consistently see measurable output gains — not from harder work, but from better architecture."
              },
            ].map((stat, i) => (
              <div
                key={stat.number}
                className={`reveal reveal-d${i + 1} text-center transition-all duration-[250ms]`}
                style={{ padding: "3rem 2.5rem", borderRight: i < 2 ? "1px solid rgba(196,154,60,0.18)" : "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,154,60,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 7vw, 6rem)", fontWeight: 700, color: "#C4972F", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "0.8rem" }}>
                  {stat.number}
                </div>
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(176,168,152,0.7)", marginBottom: "1rem" }}>
                  {stat.label}
                </div>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "rgba(176,168,152,0.6)", lineHeight: 1.75 }}>
                  {stat.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S09 — WHY NOW ═══ */}
      <section style={{ background: "#0A0A0A", padding: "9rem 1.5rem 10rem" }} className="sm:px-14">
        <div className="max-w-[1060px] mx-auto text-center">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,151,47,0.45)", marginBottom: "2rem" }}>
            Why Now
          </div>
          <h2 className="reveal reveal-d1 max-w-[18ch] mx-auto" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "rgba(255,255,255,0.85)", lineHeight: 1.15, marginBottom: "4rem" }}>
            The window to design before the break is <em style={{ fontStyle: "italic", color: "#C4972F" }}>closing.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
            {[
              { num: "01", title: "AI is not a future event", body: "It is already compressing work. Most organisations will measure it only after the redesign is overdue." },
              { num: "02", title: "Labour Code compliance is already accruing", body: "The cost of compliance drift is being built into workforce structure right now — every month it is deferred." },
              { num: "03", title: "The later the redesign, the higher the cost", body: "Operating architecture designed under pressure always costs more — in time, trust, and capital — than architecture designed in advance." },
            ].map((item, i) => (
              <div
                key={item.num}
                className={`reveal reveal-d${i + 1} group transition-all duration-[280ms]`}
                style={{ padding: "3rem 2.4rem", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "#111111"; e.currentTarget.style.boxShadow = "inset 0 0 80px rgba(196,151,47,0.10), 0 4px 20px rgba(0,0,0,0.20)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="transition-colors duration-[180ms] group-hover:text-[rgba(196,151,47,0.2)]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 300, color: "rgba(255,255,255,0.06)", lineHeight: 1, marginBottom: "1.5rem" }}>
                  {item.num}
                </div>
                <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "0.8rem" }}>{item.title}</div>
                <p style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S09.5 — ORGANISATION DECISION ARCHITECTURE ═══ */}
      <section id="organisation-design" className="s-oda" style={{ background: "#000000", padding: "9rem 1.5rem 10rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1060px] mx-auto">
          {/* BLOCK 1 — HEADER */}
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,151,47,0.6)", marginBottom: "1.5rem" }}>
            The Engagement
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.85)", marginBottom: "1.8rem", maxWidth: "18ch" }}>
            Organisation<br />
            <em style={{ fontStyle: "italic", color: "#C4972F" }}>Decision</em><br />
            Architecture
          </h2>
          <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "1.05rem", color: "rgba(255,255,255,0.38)", maxWidth: "44ch", lineHeight: 1.72, borderLeft: "2px solid rgba(196,151,47,0.3)", paddingLeft: "1.3rem", marginBottom: "0.8rem" }}>
            You are overpaying for work AI already does.
          </p>
          <p className="reveal reveal-d3" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.25)", maxWidth: "52ch", lineHeight: 1.82, marginBottom: "4rem" }}>
            Most organisations deploy AI and expect productivity gains. What they get instead is faster output with the same broken structure underneath.
          </p>

          {/* BLOCK 2 — THREE LAYERS */}
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(196,151,47,0.45)", marginBottom: "1.5rem" }}>
            Every role has three layers. Most organisations have never mapped them.
          </div>
          <div className="reveal reveal-d1 grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(255,255,255,0.07)", marginBottom: "3rem" }}>
            {/* Column 1 — COMPRESSIBLE */}
            <div 
              className="relative group transition-all duration-[180ms]"
              style={{ padding: "2rem 1.8rem", borderRight: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#111111"; e.currentTarget.style.boxShadow = "inset 0 0 60px rgba(196,151,47,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "#8C3B28" }} />
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C3B28", marginBottom: "1rem" }}>AI Dominated</div>
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: "1rem" }}>Compressible</div>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, marginBottom: "1.5rem" }}>Research · Reports · Scheduling · Data gathering</p>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", paddingTop: "1.2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,0.28)" }}>60%</div>
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: "0.3rem" }}>Today</div>
                </div>
                <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.85rem" }}>→</span>
                <div>
                  <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 700, lineHeight: 1, color: "#8C3B28" }}>30%</div>
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(140,59,40,0.6)", marginTop: "0.3rem" }}>Target</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8C3B28", marginTop: "1.2rem" }}>Automate it.</div>
            </div>

            {/* Column 2 — AUGMENTED */}
            <div 
              className="relative group transition-all duration-[180ms]"
              style={{ padding: "2rem 1.8rem", borderRight: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#111111"; e.currentTarget.style.boxShadow = "inset 0 0 60px rgba(196,151,47,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "rgba(196,151,47,0.4)" }} />
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(196,151,47,0.6)", marginBottom: "1rem" }}>AI Assisted</div>
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: "1rem" }}>Augmented</div>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, marginBottom: "1.5rem" }}>Analysis · Planning · Problem-solving · Synthesis</p>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", paddingTop: "1.2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,0.28)" }}>25%</div>
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: "0.3rem" }}>Today</div>
                </div>
                <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.85rem" }}>→</span>
                <div>
                  <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 700, lineHeight: 1, color: "#C4972F" }}>35%</div>
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(196,151,47,0.6)", marginTop: "0.3rem" }}>Target</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4972F", marginTop: "1.2rem" }}>Augment it.</div>
            </div>

            {/* Column 3 — CONSEQUENTIAL */}
            <div 
              className="relative group transition-all duration-[180ms]"
              style={{ padding: "2rem 1.8rem", background: "rgba(196,151,47,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,151,47,0.07)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(196,151,47,0.03)"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "#C4972F" }} />
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4972F", marginBottom: "1rem" }}>AI Proof</div>
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: "1rem" }}>Consequential</div>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, marginBottom: "1.5rem" }}>Judgment · Decisions · Accountability · Relationships</p>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", paddingTop: "1.2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 700, lineHeight: 1, color: "rgba(255,255,255,0.28)" }}>15%</div>
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: "0.3rem" }}>Today</div>
                </div>
                <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.85rem" }}>→</span>
                <div>
                  <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 700, lineHeight: 1, color: "#C4972F" }}>35%</div>
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(196,151,47,0.6)", marginTop: "0.3rem" }}>Target</div>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4972F", marginTop: "1.2rem" }}>Protect it.</div>
            </div>
          </div>

          {/* BLOCK 3 — IMPACT INDEX */}
          <div className="reveal grid grid-cols-1 md:grid-cols-2" style={{ border: "1px solid rgba(255,255,255,0.07)", marginBottom: "5rem" }}>
            <div style={{ padding: "2rem 2.4rem", borderRight: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.5rem" }}>Today</div>
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2.6rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", lineHeight: 1, marginBottom: "0.3rem" }}>1.0</div>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "0.6rem" }}>Impact Index</div>
              <div style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.78rem", color: "rgba(255,255,255,0.18)" }}>Revenue / Manpower Cost</div>
            </div>
            <div style={{ padding: "2rem 2.4rem", background: "rgba(196,151,47,0.04)" }}>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(196,151,47,0.6)", marginBottom: "0.5rem" }}>Organisation Decision Architecture Target</div>
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2.6rem", fontWeight: 700, color: "#C4972F", lineHeight: 1, marginBottom: "0.3rem" }}>1.3–1.5×</div>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(196,151,47,0.6)", marginBottom: "0.6rem" }}>Impact Index</div>
              <div style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>Same cost. Higher-value output.</div>
            </div>
          </div>

          {/* BLOCK 4 — THE FIVE-STEP ENGAGEMENT */}
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(196,151,47,0.45)", marginBottom: "1rem" }}>The Engagement</div>
          <h3 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "rgba(255,255,255,0.85)", lineHeight: 1.1, marginBottom: "2.5rem" }}>
            Five steps. Hard targets.<br />
            <em style={{ fontStyle: "italic", color: "#C4972F" }}>Numbers only.</em>
          </h3>
          <div style={{ marginBottom: "4rem" }}>
            {[
              { num: "01", label: "Diagnostic", desc: "Each person completes a 20-minute assessment of their actual work — not their job description." },
              { num: "02", label: "Structural Map", desc: "Which roles are above the AI line, at it, or below it. Where is payroll structurally exposed?" },
              { num: "03", label: "Redesign", desc: "Role by role. AI handles compressible. Humans own consequential. Depth non-negotiable." },
              { num: "04", label: "Baseline + Targets", desc: "Hard numbers agreed before work begins. Brainpower Density Index set. 12-month targets locked." },
              { num: "05", label: "Quarterly Review", desc: "Progress tracked against agreed metrics. Numbers only. The organisation gets stronger each cycle." },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`reveal reveal-d${i + 1} transition-all duration-[180ms]`}
                style={{ display: "grid", gridTemplateColumns: "3.5rem 1fr", gap: "1.8rem", padding: "1.6rem 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,151,47,0.03)"; e.currentTarget.style.paddingLeft = "0.5rem"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "0"; }}
              >
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(196,151,47,0.45)" }}>{step.num}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: "rgba(255,255,255,0.82)", marginBottom: "0.4rem" }}>{step.label}</div>
                  <p style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.85rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.72 }}>{step.desc}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>

          {/* BLOCK 5 — MEASUREMENT METRICS */}
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "1.5rem" }}>Five signals. Agreed before work begins.</div>
          <div className="reveal reveal-d1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: "1px solid rgba(255,255,255,0.07)", marginBottom: "3.5rem" }}>
            {[
              { name: "Brainpower Density Index™", desc: "% of total hours in consequential work — the headline measure" },
              { name: "Compressible Work Load", desc: "Hours lost weekly to work AI can fully replace" },
              { name: "Decision Layer Integrity", desc: "Are decision-makers working at the right altitude?" },
              { name: "Payroll Value Density", desc: "Value of current work distribution vs. redesigned model" },
            ].map((metric, i) => (
              <div
                key={metric.name}
                className="transition-all duration-[180ms]"
                style={{ padding: "1.6rem 1.4rem", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#111111"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem" }}>{metric.name}</div>
                <p style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.65 }}>{metric.desc}</p>
              </div>
            ))}
          </div>

          {/* BLOCK 6 — CLOSING QUOTE + CTA */}
          <blockquote className="reveal" style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(255,255,255,0.32)", lineHeight: 1.72, borderLeft: "3px solid rgba(196,151,47,0.4)", paddingLeft: "1.5rem", maxWidth: "52ch", marginBottom: "3.5rem" }}>
            "If AI can do 30% of your team&apos;s work, why hasn&apos;t your org structure changed by 30%?"
          </blockquote>
          <div className="reveal reveal-d1 flex flex-wrap items-center gap-4">
            <a
              href="mailto:nitin@axionindex.org"
              className="no-underline transition-all duration-[180ms]"
              style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", background: "#C4972F", color: "#000000", padding: "0.9rem 2rem", display: "inline-block" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#D9AE52"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(196,151,47,0.40)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#C4972F"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Begin the engagement
            </a>
            <a
              href="https://www.axionindex.org/ai-edge-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-all duration-[180ms]"
              style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(196,151,47,0.55)", borderBottom: "1px solid rgba(196,151,47,0.22)", paddingBottom: "1px" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#C4972F"; e.currentTarget.style.borderColor = "#C4972F"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(196,151,47,0.55)"; e.currentTarget.style.borderColor = "rgba(196,151,47,0.22)"; }}
            >
              Start with Quick Mirror — Free →
            </a>
          </div>
        </div>
      </section>

      {/* ═══ S10 — AI EDGE LAB ═══ */}
      <section style={{ background: "#FFFFFF", padding: "8rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A07820", marginBottom: "2rem" }}>
              The AI Edge Lab
            </div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: "#141412", lineHeight: 1.2, marginBottom: "2rem" }}>
              The live instrument layer of <em style={{ fontStyle: "italic", color: "#C4972F" }}>Axion Index.</em>
            </h2>

            {/* Doctrine block */}
            <blockquote
              className="reveal reveal-d2"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.1rem", color: "#3A3935", borderLeft: "3px solid #C4972F", background: "#F7F6F3", padding: "1.2rem 1.5rem", lineHeight: 1.7, margin: 0 }}
            >
              "When intelligence becomes cheap, the scarce resource is not information — it is the judgment to act on it. The AI Edge Lab is where that judgment becomes measurable."
            </blockquote>
          </div>
          <div>
            <p className="reveal" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#3A3935", lineHeight: 1.85, marginBottom: "1.5rem" }}>
              The application layer of the Axion Index doctrine. Every tool is built on the same framework — Belief, Conviction, Rhythm — made operational as a measurement system.
            </p>
            <p className="reveal reveal-d1" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#3A3935", lineHeight: 1.85, marginBottom: "2rem" }}>
              Where the Axion Index framework becomes measurable.
            </p>

            <div className="reveal reveal-d2 flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/ai-edge-lab"
                className="no-underline transition-all duration-[180ms] hover:bg-[#1a1a1a]"
                style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "#141412", color: "#FFFFFF", padding: "0.85rem 1.6rem", borderRadius: "4px" }}
              >
                Enter the Lab
              </Link>
              <Link
                href="/ai-edge-lab"
                className="no-underline transition-colors duration-[180ms] hover:text-[#C4972F]"
                style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#878580", padding: "0.85rem 0" }}
              >
                Quick Mirror — Free, 5 min →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ S11 — FOUNDER ═══ */}
      <section id="founder" style={{ background: "#F7F6F3", padding: "8rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-[5.5rem] items-start">
          {/* Badge card */}
          <div className="reveal lg:sticky lg:top-[70px] overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "4px" }}>
            {/* Photo block */}
            <div className="w-full overflow-hidden group" style={{ aspectRatio: "3/4", background: "#EEECEA" }}>
              <img 
                src="/founder-photo.jpg" 
                alt="Nitin Nahata, Founder of Axion Index"
                className="w-full h-full object-cover transition-all duration-[600ms] ease-out group-hover:scale-[1.025] group-hover:grayscale-0"
                style={{ objectPosition: "center 18%", filter: "grayscale(8%)" }}
              />
            </div>
            
            {/* Name + role */}
            <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 700, color: "#141412", margin: "1.1rem 1.4rem 0.2rem" }}>Nitin Nahata</div>
            <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4972F", margin: "0 1.4rem 0.9rem" }}>Founder, Axion Index</div>
            
            {/* Brand institution strip */}
            <div className="flex flex-wrap items-center" style={{ gap: "0.25rem 0.35rem", padding: "0.75rem 1.4rem", borderTop: "1px solid rgba(0,0,0,0.08)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              {["Tata", "Standard Chartered", "HSBC", "Udaan", "Gameskraft", "Marico", "Lodha", "Wipro e-Peripherals"].map((brand, i, arr) => (
                <span key={brand} className="flex items-center gap-[0.35rem]">
                  <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#141412", fontWeight: 500 }}>{brand}</span>
                  {i < arr.length - 1 && <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.48rem", color: "#878580" }}>·</span>}
                </span>
              ))}
            </div>
            
            {/* Years line */}
            <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#878580", padding: "0.7rem 1.4rem" }}>
              22 Years · Operating Architect
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A07820", marginBottom: "2rem" }}>
              The Founder
            </div>

            {/* Quote */}
            <blockquote className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.55rem", fontStyle: "italic", color: "#141412", borderLeft: "3px solid #C4972F", paddingLeft: "1.4rem", lineHeight: 1.5, margin: "0 0 1.5rem 0" }}>
              "Most startup failures are not strategy failures. They are people system failures — happening silently, long before anyone notices."
            </blockquote>

            {/* Bio */}
            <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.9rem", color: "#3A3935", lineHeight: 1.88, marginBottom: "2rem" }}>
              22 years across Tata Group, Standard Chartered, Udaan, and Gameskraft — designing people systems under hypergrowth, regulatory shock, and institutional stress. Creator of the Operating Architect framework. Author of <em>Baptism by Chaos.</em>
            </p>

            {/* Origin case block */}
            <div className="reveal reveal-d3" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderLeft: "3px solid #8C3B28", padding: "1.5rem" }}>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8C3B28", opacity: 0.8, marginBottom: "0.6rem" }}>
                The Origin · Gameskraft · 4AM · 2022
              </div>
              <p style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.85rem", color: "#3A3935", lineHeight: 1.78, margin: 0 }}>
                A regulatory notification threatened to erase an entire industry overnight. Leading the response — protecting organisational dignity under existential pressure, maintaining operating rhythm, rebuilding the architecture from inside — is the founding experience of everything Axion Index stands for.
              </p>
            </div>

            {/* Perplexity read link */}
            <a 
              href="https://www.perplexity.ai/computer/a/the-making-of-the-operating-ar-mXeHIIQeSJWFEvWxSQaKtw"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal flex items-center gap-4 no-underline transition-all duration-[180ms] group"
              style={{ marginTop: "0.8rem", padding: "1.1rem 1.5rem", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderLeft: "3px solid #C4972F" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,151,47,0.05)"; e.currentTarget.style.borderLeftColor = "#C4972F"; e.currentTarget.style.transform = "translateX(3px)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(196,151,47,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderLeftColor = "#C4972F"; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div className="flex-shrink-0">
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#C4972F" }}>Read</div>
              </div>
              <div className="flex-1" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.88rem", fontWeight: 500, color: "#141412" }}>
                The Making of the Operating Architect
              </div>
              <div className="flex-shrink-0 transition-all duration-[180ms] group-hover:text-[#C4972F] group-hover:translate-x-[3px]" style={{ fontSize: "0.9rem", color: "#878580" }}>
                →
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ STATEMENT BAND ═══ */}
      <section style={{ background: "#0A0A0A", padding: "7rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[780px] mx-auto text-center">
          {/* Ornament */}
          <div className="reveal flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(196,151,47,0.4))" }} />
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(196,151,47,0.4)" }}>
              The Founding Statement
            </span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, rgba(196,151,47,0.4), transparent)" }} />
          </div>

          <p className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(1.35rem, 2.2vw, 1.9rem)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 0 2rem 0" }}>
            HR's role is not to manage people or protect culture — but to architect the operating system that aligns human energy with organisational rhythm.
          </p>

          <div className="reveal reveal-d2" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
            Nitin Nahata · Founder · Axion Index
          </div>
        </div>
      </section>

      {/* ═══ S12 — FINAL CTA ═══ */}
      <section style={{ background: "#000000", padding: "12rem 1.5rem", position: "relative" }} className="sm:px-14">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 55% at 50% 52%, rgba(196,151,47,0.11), transparent)" }} />

        <div className="relative z-10 max-w-[780px] mx-auto text-center">
          <h2 className="reveal max-w-[18ch] mx-auto" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 6vw, 6rem)", fontWeight: 700, color: "rgba(255,255,255,0.85)", lineHeight: 1, marginBottom: "1.5rem" }}>
            Is your organisation structurally built for <em style={{ fontStyle: "italic", color: "#C4972F" }}>what comes next?</em>
          </h2>
          <p className="reveal reveal-d1 max-w-[38ch] mx-auto" style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Five minutes. One signal. A clearer next move.
          </p>
          <Link
            href="/ai-edge-lab"
            className="reveal reveal-d2 inline-block no-underline transition-all duration-[180ms]"
            style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "#C4972F", color: "#000000", padding: "1rem 2.8rem", borderRadius: "4px", boxShadow: "0 4px 20px rgba(196,151,47,0.15)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#D9AE52"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 48px rgba(196,151,47,0.40), 0 6px 16px rgba(196,151,47,0.25), 0 0 80px rgba(196,151,47,0.10)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#C4972F"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(196,151,47,0.15)"; }}
          >
            Try Quick Mirror — Free
          </Link>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "#000000", padding: "2.5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.04)" }} className="sm:px-14">
        <div className="max-w-[1060px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
            Axion Index
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: "Framework", href: "#framework" },
              { label: "AI Edge Lab", href: "/ai-edge-lab" },
              { label: "Founder", href: "#founder" },
              { label: "Contact", href: "mailto:nitin@axionindex.org" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="no-underline transition-colors duration-[180ms] hover:text-[#C4972F]"
                style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", color: "rgba(255,255,255,0.18)", textAlign: "center" }}>
            © 2026 Axion Index · axionindex.org · Bengaluru, India · Codified energy for the unfinished
          </div>
        </div>
      </footer>
    </>
  );
}
