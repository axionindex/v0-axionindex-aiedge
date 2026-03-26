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
        style={{ background: "#000000" }}
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
          {/* Kicker */}
          <div className="flex items-center justify-center gap-4 mb-6" style={{ opacity: 0, animation: "heroRise 0.7s var(--ease) 0.1s forwards" }}>
            <div className="h-px w-7" style={{ background: "linear-gradient(90deg, transparent, #C4972F)" }} />
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#C4972F" }}>
              Axion Index · Bengaluru · 2026
            </span>
            <div className="h-px w-7" style={{ background: "linear-gradient(90deg, #C4972F, transparent)" }} />
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "clamp(3.2rem, 8.5vw, 8.5rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.85)",
              opacity: 0,
              animation: "heroLock 1.15s cubic-bezier(0.16,1,0.3,1) 0.38s forwards",
            }}
          >
            Rewriting the<br />
            <em style={{ fontStyle: "italic", color: "#C4972F" }}>Operating Logic</em><br />
            of Work
          </h1>

          {/* Tagline */}
          <p
            className="max-w-[38ch] mx-auto mt-8"
            style={{
              fontFamily: "var(--font-lora), 'Lora', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 1.5vw, 1.12rem)",
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.7,
              opacity: 0,
              animation: "heroRise 0.85s var(--ease) 0.82s forwards",
            }}
          >
            Most organisations don't fail because of strategy.<br />
            <strong style={{ color: "rgba(255,255,255,0.75)" }}>They fail because the system underneath cannot carry it.</strong>
          </p>

          {/* CTA pair */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            style={{
              opacity: 0,
              animation: "heroRise 0.8s var(--ease) 1.22s forwards",
            }}
          >
            <Link
              href="/ai-edge-lab"
              className="no-underline transition-all duration-[180ms]"
              style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", background: "#C4972F", color: "#000000", padding: "0.85rem 1.8rem", borderRadius: "4px", boxShadow: "0 4px 16px rgba(196,151,47,0.12)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#D9AE52"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(196,151,47,0.40), 0 3px 10px rgba(196,151,47,0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#C4972F"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(196,151,47,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Try Quick Mirror — Free
            </Link>
            <span
              className="cursor-not-allowed opacity-50"
              style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.12)", padding: "0.85rem 1.8rem", borderRadius: "4px" }}
            >
              Full Diagnostic — Coming Soon
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: Math.max(0, 1 - heroProgress * 2) }}
        >
          <div className="w-px h-6" style={{ background: "#C4972F", animation: "breathe 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,151,47,0.5)" }}>Scroll</span>
        </div>
      </section>

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

      {/* ═══ S03 — WHAT AXION INDEX IS ═══ */}
      <section style={{ background: "#FFFFFF", padding: "8rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1060px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A07820", marginBottom: "2rem" }}>
            What Axion Index Is
          </div>
          <h2 className="reveal reveal-d1 max-w-[24ch]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)", fontWeight: 700, color: "#141412", lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Axion Index diagnoses, quantifies, and redesigns the <em style={{ fontStyle: "italic", color: "#C4972F" }}>operating architecture</em> of work.
          </h2>
          <p className="reveal reveal-d2 max-w-[52ch]" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.95rem", color: "#3A3935", lineHeight: 1.8, marginBottom: "4rem" }}>
            Most organisations don't fail because of strategy. They fail because the system underneath cannot carry the strategy. Axion Index exists to solve that gap.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
            {[
              { verb: "Diagnose", body: "Surface structural, compliance, and workforce risk before it becomes visible as strategy failure." },
              { verb: "Quantify", body: "Turn invisible organisational forces into decision-grade signals." },
              { verb: "Redesign", body: "Rebuild the operating architecture so scale does not produce silent fracture." },
            ].map((item, i) => (
              <div
                key={item.verb}
                className={`reveal reveal-d${i + 1} transition-all duration-[280ms]`}
                style={{ padding: "2.5rem 2rem", borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#F7F6F3"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08), inset 0 0 60px rgba(196,151,47,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.9rem", fontWeight: 700, color: "#C4972F", marginBottom: "0.8rem" }}>
                  {item.verb}
                </div>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.83rem", color: "#3A3935", lineHeight: 1.7 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S04 — IN PRACTICE ═══ */}
      <section style={{ background: "#F7F6F3", padding: "7rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#878580", marginBottom: "2rem" }}>
              In Practice
            </div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: "#141412", lineHeight: 1.2, marginBottom: "1rem" }}>
              Three instruments. <em style={{ fontStyle: "italic", color: "#C4972F" }}>One system.</em>
            </h2>
            <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.9rem", color: "#3A3935", lineHeight: 1.8 }}>
              Every engagement follows the same sequenced logic — regardless of entry point.
            </p>
          </div>
          <div className="flex flex-col gap-0">
            {[
              { letter: "I", title: "Indices", body: "Frameworks that codify structural realities conventional HR instruments cannot measure." },
              { letter: "D", title: "Diagnostics", body: "Live tools that turn abstract operating risk into immediate signal." },
              { letter: "A", title: "Operating Frameworks", body: "The design layer that converts diagnosis into repeatable organisational rhythm." },
            ].map((row, i) => (
              <div
                key={row.letter}
                className={`reveal reveal-d${i + 1} group grid transition-all duration-[180ms]`}
                style={{ 
                  gridTemplateColumns: "3.5rem 1fr", 
                  gap: "1.6rem", 
                  alignItems: "center", 
                  padding: "1.8rem 0", 
                  borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  width: "100%",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.background = "rgba(0,0,0,0.02)"; 
                  e.currentTarget.style.transform = "translateX(3px)"; 
                  const letter = e.currentTarget.querySelector(".row-letter") as HTMLElement;
                  if (letter) letter.style.color = "#C4972F";
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.background = "transparent"; 
                  e.currentTarget.style.transform = "translateX(0)"; 
                  const letter = e.currentTarget.querySelector(".row-letter") as HTMLElement;
                  if (letter) letter.style.color = "rgba(0,0,0,0.12)";
                }}
              >
                <div className="row-letter transition-colors duration-[180ms]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 300, color: "rgba(0,0,0,0.12)", lineHeight: 1 }}>
                  {row.letter}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#141412", marginBottom: "0.3rem" }}>{row.title}</div>
                  <p style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.82rem", color: "#878580", lineHeight: 1.7, wordWrap: "break-word", overflowWrap: "break-word" }}>{row.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S04.5 — COMPRESSION-JUDGMENT FIELD ═══ */}
      <section ref={fieldRef} style={{ background: "#000000", padding: "6rem 1.5rem 8rem" }} className="sm:px-16 md:px-24 lg:px-32">
        <div className="max-w-[1060px] mx-auto text-center">
          {/* Section tag */}
          <p className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4972F", opacity: 0.6, marginBottom: "1.5rem" }}>
            The Axion Field
          </p>
          {/* Headline */}
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "rgba(255,255,255,0.92)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Where work is <em style={{ fontStyle: "italic", color: "#C4972F" }}>moving.</em>
          </h2>
          {/* Supporting paragraph */}
          <p className="reveal reveal-d2 max-w-[520px] mx-auto" style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: "4rem" }}>
            Work does not disappear. It moves — into compression or into judgment. The real question is where your work sits.
          </p>

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

          {/* Caption */}
          <p className="mt-8 max-w-[48ch] mx-auto" style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.88rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>
            The future does not reward more work. It rewards work that sits <em style={{ color: "#C4972F" }}>above the compression line.</em>
          </p>
          <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.16)", marginTop: "0.8rem" }}>
            Role positions are illustrative.
          </div>

          {/* Archetype Legend — 3-column grid */}
          <div style={{ maxWidth: "560px", margin: "2.5rem auto 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "5rem 1fr 1fr", gap: "1rem", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "0.2rem" }}>
              {["Score", "Archetype", "What it means"].map((h) => (
                <span key={h} style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.42rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
                  {h}
                </span>
              ))}
            </div>
            {/* Tier rows */}
            {[
              { range: "80–100", label: "Structural Architect", desc: "AI amplifies your leverage. You direct; others produce.", highlight: false },
              { range: "70–79", label: "Strategic Leverager", desc: "Judgment-dominant. Your 6-month target.", highlight: false },
              { range: "60–69", label: "Boundary Builder", desc: "Edge established. Deliberate compounding needed.", highlight: true },
              { range: "50–59", label: "Output Manager", desc: "Judgment and output balanced. Active management required.", highlight: false },
              { range: "<50", label: "Execution Operator", desc: "Output-primary. Immediate composition shift required.", highlight: false },
            ].map((tier, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "5rem 1fr 1fr",
                  gap: "1rem",
                  padding: "0.7rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  background: tier.highlight ? "rgba(196,151,47,0.04)" : "transparent",
                  transition: "background 200ms ease",
                }}
              >
                {/* Score range */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  {tier.highlight && <span style={{ color: "#C4972F", fontSize: "0.5rem" }}>◀</span>}
                  <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", color: tier.highlight ? "#C4972F" : "rgba(255,255,255,0.22)" }}>
                    {tier.range}
                  </span>
                </div>
                {/* Archetype name */}
                <span style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.78rem", fontWeight: tier.highlight ? 500 : 400, color: tier.highlight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }}>
                  {tier.label}
                </span>
                {/* Description */}
                <span style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.7rem", color: tier.highlight ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)", lineHeight: 1.45 }}>
                  {tier.desc}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/ai-edge-lab"
            className="inline-flex items-center gap-3 mt-8 no-underline transition-all duration-[180ms]"
            style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4972F", border: "1px solid rgba(196,151,47,0.25)", padding: "0.9rem 1.6rem", borderRadius: "4px" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,151,47,0.08)"; e.currentTarget.style.borderColor = "#C4972F"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(196,151,47,0.28), 0 4px 16px rgba(196,151,47,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(196,151,47,0.25)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Locate your role — Try Quick Mirror
          </Link>
        </div>
      </section>

      {/* Section break between Axion Field and Framework */}
      <div style={{ background: "#000000", padding: "0 1.5rem" }} className="sm:px-14">
        <div className="max-w-[400px] mx-auto flex items-center gap-6">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(196,151,47,0.3))" }} />
          <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(196,151,47,0.4)" }}>◆</div>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(196,151,47,0.3))" }} />
        </div>
      </div>

      {/* ═══ S05 — FRAMEWORK ═══ */}
      <section id="framework" ref={frameworkRef} style={{ background: "#000000", padding: "9rem 1.5rem 10rem" }} className="sm:px-14">
        <div className="max-w-[1060px] mx-auto text-center" style={{ background: "transparent" }}>
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,151,47,0.6)", marginBottom: "1.5rem", background: "transparent" }}>
            The Signature Framework
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: "1rem", background: "transparent" }}>
            Belief → Conviction → <em style={{ fontStyle: "italic", color: "#C4972F" }}>Rhythm</em>
          </h2>
          <p className="reveal reveal-d2 max-w-[44ch] mx-auto" style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.92rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.8, marginBottom: "4rem", background: "transparent" }}>
            Every organisation fails at the same inflection point. This sequence makes the failure visible — before it becomes irreversible.
          </p>

          {/* 3-node sequence */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { stage: "01", word: "Belief", desc: "Founder-led. Powerful — but unscalable if it lives in one person's head." },
              { stage: "02", word: "Conviction", desc: "Shared, tested, internalised. Survives disagreement. Moves without the founder in the room." },
              { stage: "03", word: "Rhythm", desc: "Repeatable behaviour. Consistent decisions. Governance that holds under pressure." },
            ].map((node, i) => (
              <div
                key={node.stage}
                className="relative transition-all duration-300 cursor-default"
                style={{
                  padding: "3rem 2rem",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  opacity: frameworkStep > i ? 1 : 0.1,
                }}
                onMouseEnter={(e) => { if (frameworkStep > i) e.currentTarget.style.boxShadow = "inset 0 0 80px rgba(196,151,47,0.10), 0 2px 16px rgba(0,0,0,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: frameworkStep > i ? "#C4972F" : "rgba(255,255,255,0.2)", marginBottom: "1rem" }}>
                  Stage {node.stage}
                </div>
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 700, color: frameworkStep > i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.1)", marginBottom: "0.8rem" }}>
                  {node.word}
                </div>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: frameworkStep > i ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.1)", lineHeight: 1.7 }}>
                  {node.desc}
                </p>
                {/* Connector arrow */}
                {i < 2 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 transition-opacity duration-300"
                    style={{ opacity: frameworkStep > i + 1 ? 1 : 0, color: "#C4972F", fontSize: "1.2rem" }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Failure band */}
          <div
            className="mt-8 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 text-left transition-opacity duration-500"
            style={{
              opacity: frameworkStep >= 6 ? 1 : 0,
              background: "rgba(140,59,40,0.04)",
              border: "1px solid rgba(140,59,40,0.3)",
              padding: "2rem 2.5rem",
            }}
          >
            <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 700, color: "#8C3B28" }}>
              Fragility
            </div>
            <p style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.88rem", color: "#8C3B28", lineHeight: 1.8 }}>
              Belief without conviction becomes fragility. Conviction without rhythm becomes bureaucracy. Every engagement begins with one question: <strong>where in this sequence has your organisation broken down?</strong>
            </p>
          </div>
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

      {/* ═══ S07 — HOW IT WORKS ═══ */}
      <section style={{ background: "#F7F6F3", padding: "7rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[780px] mx-auto text-center">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#878580", marginBottom: "2rem" }}>
            How It Works
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: "#141412", marginBottom: "3rem" }}>
            Three steps. <em style={{ fontStyle: "italic", color: "#C4972F" }}>No ambiguity.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
            {[
              { num: "1", title: "Diagnose", body: "Start with signal." },
              { num: "2", title: "Identify structural gaps", body: "Surface where the operating architecture is breaking." },
              { num: "3", title: "Redesign", body: "Rebuild the system before scale hardens the fracture." },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`reveal reveal-d${i + 1} group relative transition-all duration-[280ms]`}
                style={{ padding: "2.5rem 2rem", borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="transition-colors duration-[180ms] group-hover:text-[#C4972F]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 300, color: "rgba(0,0,0,0.08)", lineHeight: 1, marginBottom: "1rem" }}>
                  {step.num}
                </div>
                <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#141412", marginBottom: "0.5rem" }}>{step.title}</div>
                <p style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.82rem", color: "#878580", lineHeight: 1.7 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S08 — WHAT WE ARE NOT ═══ */}
      <section style={{ background: "#000000", padding: "8rem 1.5rem" }} className="sm:px-14">
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,151,47,0.5)", marginBottom: "2rem" }}>
              Positioning
            </div>
            <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: "rgba(255,255,255,0.85)", lineHeight: 1.2, marginBottom: "1rem" }}>
              We are not what you <em style={{ fontStyle: "italic", color: "#C4972F" }}>think</em> we are.
            </h2>
            <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.88rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.8 }}>
              The distinction matters. Most of what is sold as HR transformation is not architecture. It is maintenance — of a system that was already the wrong design.
            </p>
          </div>
          <div className="flex flex-col gap-0">
            {[
              { title: "We do not run HR programs.", body: "We redesign the system beneath them." },
              { title: "We do not implement systems.", body: "Implementation without architecture is just installing the wrong infrastructure faster." },
              { title: "We do not sell software.", body: "The framework came first. The software is the proof, not the premise." },
            ].map((row, i) => (
              <div
                key={row.title}
                className={`reveal reveal-d${i + 1} group flex items-start gap-4 transition-all duration-[180ms]`}
                style={{ padding: "1.5rem 0 1.5rem 1rem", borderLeft: "2px solid rgba(196,151,47,0.15)", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#111111"; e.currentTarget.style.transform = "translateX(3px)"; e.currentTarget.style.borderLeftColor = "#C4972F"; e.currentTarget.style.boxShadow = "inset 0 0 60px rgba(196,151,47,0.10), -2px 0 16px rgba(196,151,47,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderLeftColor = "rgba(196,151,47,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="transition-all duration-[180ms] group-hover:text-[#C4972F] group-hover:scale-[1.15]" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.9rem", color: "rgba(255,255,255,0.3)" }}>
                  ×
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "0.3rem" }}>{row.title}</div>
                  <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>{row.body}</p>
                </div>
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
