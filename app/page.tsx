"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function AxionIndexHomepage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [frameworkActivated, setFrameworkActivated] = useState(false);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [activeConnectors, setActiveConnectors] = useState<number[]>([]);
  const [showFailure, setShowFailure] = useState(false);

  // Scroll handler for nav and hero parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        const progress = Math.min(window.scrollY / heroHeight, 1);
        setHeroProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Framework sequence activation
  useEffect(() => {
    const frameworkSection = document.getElementById("framework");
    if (!frameworkSection) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !frameworkActivated) {
            setFrameworkActivated(true);
            // Sequenced activation
            setTimeout(() => setActiveNodes([1]), 0);
            setTimeout(() => setActiveConnectors([1]), 260);
            setTimeout(() => setActiveNodes([1, 2]), 360);
            setTimeout(() => setActiveConnectors([1, 2]), 620);
            setTimeout(() => setActiveNodes([1, 2, 3]), 720);
            setTimeout(() => setShowFailure(true), 1060);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(frameworkSection);
    return () => observer.disconnect();
  }, [frameworkActivated]);

  return (
    <div className="min-h-screen antialiased overflow-x-hidden" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif" }}>
      
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ opacity: 0.028, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* NAV - 54px, frosted glass */}
      <nav 
        className="fixed top-0 left-0 right-0 h-[54px] z-[1000] border-b transition-all duration-300"
        style={{ 
          background: scrolled ? "rgba(0,0,0,0.96)" : "rgba(0,0,0,0.88)", 
          backdropFilter: "blur(24px) saturate(160%)",
          borderColor: "rgba(255,255,255,0.07)"
        }}
      >
        <div className="max-w-[1200px] mx-auto h-full px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="no-underline transition-colors hover:text-[#C4972F]" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
            AXION INDEX
          </a>

          {/* Centre links */}
          <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <a href="#framework" className="text-[rgba(255,255,255,0.38)] no-underline transition-colors hover:text-[rgba(255,255,255,0.85)]">Framework</a>
            <Link href="/ai-edge-lab" className="text-[rgba(255,255,255,0.38)] no-underline transition-colors hover:text-[rgba(255,255,255,0.85)]">AI Edge Lab</Link>
            <a href="#founder" className="text-[rgba(255,255,255,0.38)] no-underline transition-colors hover:text-[rgba(255,255,255,0.85)]">Founder</a>
          </div>

          {/* CTA pill */}
          <Link 
            href="/ai-edge-lab"
            className="no-underline transition-all hover:bg-[#D9AE52]"
            style={{ 
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
              fontSize: "0.58rem", 
              letterSpacing: "0.1em", 
              textTransform: "uppercase",
              background: "#C4972F",
              color: "#000",
              padding: "8px 18px",
              borderRadius: "2px"
            }}
          >
            Quick Mirror — Free
          </Link>
        </div>
      </nav>

      {/* S01 — HERO (DARK, #000000) */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative"
        style={{ background: "#000000" }}
      >
        {/* Gold glow layer */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse 65% 50% at 50% 38%, rgba(196,151,47,0.09) 0%, transparent 65%)",
            transform: `translateY(${-heroProgress * 40}px)`,
            opacity: 1 - heroProgress * 0.55,
            transition: "transform 0.1s linear, opacity 0.1s linear"
          }} 
        />

        {/* Content */}
        <div className="relative z-10 text-center px-8 max-w-[900px]">
          {/* Kicker */}
          <div 
            className="flex items-center justify-center gap-6 mb-10 opacity-0 translate-y-4"
            style={{ animation: "fadeRise 0.7s 0.1s var(--ease-out) forwards" }}
          >
            <span className="h-[1px] w-7" style={{ background: "linear-gradient(90deg, transparent, #C4972F)" }} />
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.26em", color: "#C4972F" }}>
              Axion Index · Bengaluru · 2026
            </span>
            <span className="h-[1px] w-7" style={{ background: "linear-gradient(90deg, #C4972F, transparent)" }} />
          </div>

          {/* H1 */}
          <h1 
            className="mb-10 opacity-0"
            style={{ 
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "clamp(3.2rem, 8.5vw, 8.5rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.85)",
              transform: `translateY(${-heroProgress * 18}px)`,
              animation: "heroLock 1.15s 0.38s var(--ease-out) forwards"
            }}
          >
            Rewriting the<br />
            <em style={{ fontStyle: "italic", color: "#C4972F" }}>Operating Logic</em><br />
            of Work
          </h1>

          {/* Tagline */}
          <p 
            className="mb-12 max-w-[540px] mx-auto opacity-0 translate-y-4"
            style={{ 
              fontFamily: "var(--font-lora), 'Lora', serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.38)",
              transform: `translateY(${-heroProgress * 28}px)`,
              opacity: 1 - heroProgress,
              animation: "fadeRise 0.85s 0.82s var(--ease-out) forwards"
            }}
          >
            <strong style={{ color: "rgba(255,255,255,0.75)" }}>Axion Index diagnoses and redesigns the operating architecture of work.</strong>
            <br />For founder-led organisations before the system breaks.
          </p>

          {/* CTA pair */}
          <div 
            className="flex items-center justify-center gap-4 flex-wrap opacity-0 translate-y-4"
            style={{ 
              transform: `translateY(${-heroProgress * 38}px)`,
              opacity: 1 - heroProgress * 1.5,
              animation: "fadeRise 0.8s 1.22s var(--ease-out) forwards" 
            }}
          >
            <Link 
              href="/ai-edge-lab"
              className="no-underline transition-all hover:bg-[#D9AE52] hover:-translate-y-[2px]"
              style={{ 
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                background: "#C4972F",
                color: "#000",
                padding: "1rem 2.8rem",
                borderRadius: "2px"
              }}
            >
              Try Quick Mirror — Free
            </Link>
            <Link 
              href="/full-diagnostic"
              className="no-underline transition-all hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.3)]"
              style={{ 
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                background: "transparent",
                color: "rgba(255,255,255,0.85)",
                padding: "1rem 2.8rem",
                borderRadius: "2px",
                border: "1px solid rgba(255,255,255,0.18)"
              }}
            >
              Open Full Diagnostic
            </Link>
          </div>

          {/* Scroll indicator */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            style={{ opacity: 1 - heroProgress * 3 }}
          >
            <div className="w-[1px] h-8 bg-[#C4972F] animate-pulse" />
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.18)" }}>SCROLL</span>
          </div>
        </div>
      </section>

      {/* S02 — PROBLEM STATEMENT (DARK, #0A0A0A) */}
      <section style={{ background: "#0A0A0A", padding: "9rem 3.5rem" }}>
        <div className="max-w-[1060px] mx-auto">
          {/* Tag */}
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(196,151,47,0.45)", marginBottom: "2rem" }}>
            THE PROBLEM
          </div>

          {/* H2 */}
          <h2 className="reveal mb-16" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.1, color: "rgba(255,255,255,0.85)", maxWidth: "22ch" }}>
            Most organisations don't fail because of <em style={{ fontStyle: "italic", color: "#C4972F" }}>bad strategy.</em>
          </h2>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
            {[
              { num: "01", title: "AI is compressing layers of work", body: "Faster than organisations can redesign for them." },
              { num: "02", title: "India's Labour Codes have reset compliance architecture", body: "Most organisations are still treating it as a legal problem. It is a design problem — and the cost is already accruing." },
              { num: "03", title: "Founders are scaling past their people systems", body: "The belief that built the company has not yet become conviction that can survive the founder's absence. That gap is structural — and silent." }
            ].map((signal, i) => (
              <div 
                key={i} 
                className="reveal group cursor-default transition-all duration-200 hover:-translate-y-[2px] hover:bg-[#111111] relative"
                style={{ 
                  padding: "2.8rem 2.4rem",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  transitionDelay: `${i * 100}ms`
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C4972F] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", color: "rgba(196,151,47,0.6)", marginBottom: "1.4rem" }}>{signal.num}</div>
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "0.9rem" }}>{signal.title}</div>
                <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.8 }}>{signal.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S03 — WHAT AXION INDEX IS (LIGHT, #FFFFFF) */}
      <section style={{ background: "#FFFFFF", padding: "8rem 3.5rem" }}>
        <div className="max-w-[1060px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#A07820", marginBottom: "2rem" }}>
            WHAT AXION INDEX IS
          </div>

          <h2 className="reveal mb-10" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)", fontWeight: 700, lineHeight: 1.1, color: "#141412", maxWidth: "24ch" }}>
            Axion Index diagnoses and redesigns the <em style={{ fontStyle: "italic", color: "#C4972F" }}>operating architecture</em> of work.
          </h2>

          <p className="reveal mb-12" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.95rem", color: "#3A3935", maxWidth: "52ch", lineHeight: 1.85 }}>
            Axion Index is an operating intelligence platform. We diagnose structural risk, quantify invisible forces, and redesign the systems that determine whether scale holds or breaks.
          </p>

          {/* 3-column verb grid */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
            {[
              { verb: "Diagnose", body: "Surface structural, compliance, and workforce risk before it becomes visible as strategy failure." },
              { verb: "Quantify", body: "Turn invisible organisational forces into decision-grade signals." },
              { verb: "Redesign", body: "Rebuild the operating architecture so scale does not produce silent fracture." }
            ].map((item, i) => (
              <div 
                key={i} 
                className="reveal group transition-colors duration-200 hover:bg-[#F7F6F3]"
                style={{ 
                  padding: "2.4rem 2rem",
                  borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  transitionDelay: `${i * 80}ms`
                }}
              >
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.9rem", fontStyle: "italic", fontWeight: 700, color: "#C4972F", marginBottom: "0.8rem" }}>{item.verb}</div>
                <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.83rem", color: "#3A3935", lineHeight: 1.75 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S04 — IN PRACTICE (LIGHT, #F7F6F3) */}
      <section style={{ background: "#F7F6F3", padding: "7rem 3.5rem" }}>
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#A07820", marginBottom: "2rem" }}>
              IN PRACTICE
            </div>
            <h2 className="reveal mb-6" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15, color: "#141412" }}>
              Three instruments.<br /><em style={{ fontStyle: "italic", color: "#C4972F" }}>One system.</em>
            </h2>
            <p className="reveal" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.9rem", color: "#3A3935", lineHeight: 1.8, maxWidth: "40ch" }}>
              Every engagement follows the same sequenced logic — regardless of entry point.
            </p>
          </div>

          {/* Right - rows */}
          <div className="flex flex-col gap-0" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
            {[
              { letter: "I", title: "Indices", desc: "Frameworks that codify structural realities conventional HR instruments cannot measure." },
              { letter: "D", title: "Diagnostics", desc: "Live tools that turn abstract operating risk into immediate signal." },
              { letter: "A", title: "Operating Frameworks", desc: "The design layer that converts diagnosis into repeatable organisational rhythm." }
            ].map((row, i) => (
              <div 
                key={i} 
                className="reveal group flex items-start gap-6 transition-all duration-200 hover:translate-x-[3px]"
                style={{ 
                  padding: "1.8rem 2rem",
                  borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none"
                }}
              >
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 600, color: "#EEECEA", transition: "color 0.2s" }} className="group-hover:text-[#C4972F]">{row.letter}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: "#141412", marginBottom: "0.4rem" }}>{row.title}</div>
                  <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.8rem", color: "#878580", lineHeight: 1.7 }}>{row.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S05 — BELIEF → CONVICTION → RHYTHM (DARK, #000000) */}
      <section id="framework" style={{ background: "#000000", padding: "9rem 3.5rem 10rem" }}>
        <div className="max-w-[1060px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(196,151,47,0.6)", marginBottom: "1.5rem" }}>
              THE SIGNATURE FRAMEWORK
            </div>
            <h2 className="reveal mb-6" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: "rgba(255,255,255,0.85)" }}>
              Belief → Conviction → <em style={{ fontStyle: "italic", color: "#C4972F" }}>Rhythm</em>
            </h2>
            <p className="reveal mx-auto" style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.92rem", color: "rgba(255,255,255,0.38)", maxWidth: "44ch", lineHeight: 1.75 }}>
              Every organisation fails at the same inflection point. This sequence makes the failure visible — before it becomes irreversible.
            </p>
          </div>

          {/* 3-node grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 mb-8" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { stage: "Stage 01", word: "Belief", desc: "Founder-led. Powerful — but unscalable if it lives in one person's head." },
              { stage: "Stage 02", word: "Conviction", desc: "Shared, tested, internalised. Survives disagreement. Moves without the founder in the room." },
              { stage: "Stage 03", word: "Rhythm", desc: "Repeatable behaviour. Consistent decisions. Governance that holds under pressure." }
            ].map((node, i) => (
              <div 
                key={i} 
                className="relative"
                style={{ 
                  padding: "2.8rem 2.4rem",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  opacity: activeNodes.includes(i + 1) ? 1 : 0.1,
                  transition: "opacity 0.4s ease"
                }}
              >
                {/* Connector arrow */}
                {i < 2 && (
                  <div 
                    className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2"
                    style={{ 
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      fontSize: "1.5rem",
                      color: "#C4972F",
                      opacity: activeConnectors.includes(i + 1) ? 1 : 0,
                      transition: "opacity 0.3s ease"
                    }}
                  >
                    →
                  </div>
                )}
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", color: "rgba(196,151,47,0.5)", marginBottom: "1rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{node.stage}</div>
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: "0.8rem" }}>{node.word}</div>
                <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.82 }}>{node.desc}</div>
              </div>
            ))}
          </div>

          {/* Failure band */}
          <div 
            className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center transition-all duration-500"
            style={{ 
              background: "rgba(140,59,40,0.04)",
              border: "1px solid rgba(140,59,40,0.3)",
              padding: "2rem 2.4rem",
              opacity: showFailure ? 1 : 0,
              transform: showFailure ? "translateY(0)" : "translateY(8px)"
            }}
          >
            <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 700, color: "#8C3B28" }}>Fragility</div>
            <div style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.88rem", color: "rgba(140,59,40,0.8)", lineHeight: 1.75 }}>
              Belief without conviction becomes fragility. Conviction without rhythm becomes bureaucracy. Every engagement begins with one question: <span style={{ fontStyle: "normal", fontWeight: 500, color: "#8C3B28" }}>where in this sequence has your organisation broken down?</span>
            </div>
          </div>
        </div>
      </section>

      {/* S06 — DIAGNOSTICS (LIGHT, #FFFFFF) */}
      <section style={{ background: "#FFFFFF", padding: "8rem 3.5rem" }}>
        <div className="max-w-[1060px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#A07820", marginBottom: "2rem" }}>
            THE AI EDGE LAB
          </div>

          <h2 className="reveal mb-4" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, lineHeight: 1.15, color: "#141412" }}>
            The live instrument layer. <em style={{ fontStyle: "italic", color: "#C4972F" }}>Start with signal.</em>
          </h2>

          <p className="reveal mb-10" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#878580", maxWidth: "60ch" }}>
            Two entry points. Both built on the Belief → Conviction → Rhythm framework. Start free. Go deeper when ready.
          </p>

          {/* Cards */}
          <div className="flex flex-col gap-[0.6rem] mb-8">
            {[
              { name: "Quick Mirror", sub: "5-minute organisational health snapshot", badge: "Free · Live", href: "/ai-edge-lab" },
              { name: "Full Diagnostic — PDF Report", sub: "Comprehensive people system audit", badge: "Paid · Live", href: "/full-diagnostic" }
            ].map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className="reveal group flex items-center justify-between no-underline transition-all duration-200 hover:translate-x-[5px] hover:-translate-y-[1px]"
                style={{ 
                  background: "rgba(196,151,47,0.04)",
                  border: "1px solid rgba(196,151,47,0.18)",
                  padding: "1.7rem 2rem",
                  transitionDelay: `${i * 90}ms`
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(196,151,47,0.32)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(196,151,47,0.18)"}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#A07820", marginBottom: "0.2rem" }}>{card.name}</div>
                  <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", color: "#878580", letterSpacing: "0.05em" }}>{card.sub}</div>
                </div>
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.08em", background: "rgba(196,151,47,0.1)", color: "#C4972F", padding: "6px 12px", border: "1px solid rgba(196,151,47,0.2)" }}>
                  {card.badge}
                </div>
              </Link>
            ))}
          </div>

          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#878580" }}>
            More instruments inside the Lab — 3i Labour Code Index™, Workforce Architecture Diagnostics™, and more building.
          </div>
        </div>
      </section>

      {/* S07 — HOW IT WORKS (LIGHT, #F7F6F3) */}
      <section style={{ background: "#F7F6F3", padding: "7rem 3.5rem" }}>
        <div className="max-w-[780px] mx-auto text-center">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#878580", marginBottom: "2rem" }}>
            HOW IT WORKS
          </div>

          <h2 className="reveal mb-12" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15, color: "#141412" }}>
            Three steps. <em style={{ fontStyle: "italic", color: "#C4972F" }}>No ambiguity.</em>
          </h2>

          {/* 3-step grid */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
            {[
              { num: "01", title: "Diagnose", body: "Start with signal." },
              { num: "02", title: "Identify structural gaps", body: "Surface where the operating architecture is breaking." },
              { num: "03", title: "Redesign", body: "Rebuild the system before scale hardens the fracture." }
            ].map((step, i) => (
              <div 
                key={i} 
                className="reveal group relative"
                style={{ 
                  padding: "2.5rem 2rem",
                  borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none"
                }}
              >
                {/* Connector */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-[#EEECEA] text-sm">→</div>
                )}
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 400, color: "#EEECEA", marginBottom: "0.8rem", transition: "color 0.2s" }} className="group-hover:text-[#C4972F]">{step.num}</div>
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: "#141412", marginBottom: "0.4rem" }}>{step.title}</div>
                <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.8rem", color: "#878580", lineHeight: 1.7 }}>{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S08 — WHAT WE ARE NOT (DARK, #000000) */}
      <section style={{ background: "#000000", padding: "8rem 3.5rem" }}>
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(196,151,47,0.5)", marginBottom: "2rem" }}>
              POSITIONING
            </div>
            <h2 className="reveal mb-6" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.1, color: "rgba(255,255,255,0.85)" }}>
              We are not<br />what you <em style={{ fontStyle: "italic", color: "#C4972F" }}>think</em><br />we are.
            </h2>
            <p className="reveal" style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.9rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.8, maxWidth: "40ch" }}>
              The distinction matters. Most of what is sold as HR transformation is not architecture. It is maintenance — of a system that was already the wrong design.
            </p>
          </div>

          {/* Right - items */}
          <div className="flex flex-col gap-0">
            {[
              { title: "We do not run HR programs.", body: "We redesign the system beneath them." },
              { title: "We do not implement systems.", body: "Implementation without architecture is just installing the wrong infrastructure faster." },
              { title: "We do not sell software.", body: "The framework came first. The software is the proof, not the premise." }
            ].map((item, i) => (
              <div 
                key={i} 
                className="reveal group flex items-start gap-4 transition-all duration-200 hover:translate-x-[3px]"
                style={{ 
                  padding: "1.5rem 0 1.5rem 1.5rem",
                  borderLeft: "2px solid rgba(196,151,47,0.15)",
                  transition: "border-color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#C4972F"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(196,151,47,0.15)"}
              >
                <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "1rem", color: "rgba(255,255,255,0.38)", transition: "all 0.2s" }} className="group-hover:text-[#C4972F] group-hover:scale-[1.15]">×</span>
                <div>
                  <span style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{item.title}</span>{" "}
                  <span style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.38)" }}>{item.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S09 — WHY NOW (DARK, #0A0A0A) */}
      <section style={{ background: "#0A0A0A", padding: "9rem 3.5rem 10rem" }}>
        <div className="max-w-[1060px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(196,151,47,0.45)", marginBottom: "2rem" }}>
              WHY NOW
            </div>
            <h2 className="reveal mx-auto" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.1, color: "rgba(255,255,255,0.85)", maxWidth: "18ch" }}>
              The window to design before the break is <em style={{ fontStyle: "italic", color: "#C4972F" }}>closing.</em>
            </h2>
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
            {[
              { num: "01", title: "AI is not a future event", body: "It is already compressing work. Most organisations will measure it only after the redesign is overdue." },
              { num: "02", title: "Labour Code compliance is already accruing", body: "The cost of compliance drift is being built into workforce structure right now — every month it is deferred." },
              { num: "03", title: "The later the redesign, the higher the cost", body: "Operating architecture designed under pressure always costs more — in time, trust, and capital — than architecture designed in advance." }
            ].map((col, i) => (
              <div 
                key={i} 
                className="reveal group relative transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#111111]"
                style={{ 
                  padding: "3rem 2.4rem",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none"
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(90deg, transparent, rgba(196,151,47,0.3), transparent)" }} />
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 400, color: "rgba(255,255,255,0.06)", marginBottom: "1.2rem", transition: "color 0.2s" }} className="group-hover:text-[rgba(196,151,47,0.2)]">{col.num}</div>
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: "0.8rem" }}>{col.title}</div>
                <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.85 }}>{col.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S10 — AI EDGE LAB (LIGHT, #FFFFFF) */}
      <section style={{ background: "#FFFFFF", padding: "8rem 3.5rem" }}>
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#A07820", marginBottom: "2rem" }}>
              THE AI EDGE LAB
            </div>
            <h2 className="reveal mb-8" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, lineHeight: 1.15, color: "#141412" }}>
              The live instrument layer of <em style={{ fontStyle: "italic", color: "#C4972F" }}>Axion Index.</em>
            </h2>

            {/* Doctrine block */}
            <div 
              className="reveal"
              style={{ 
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "#3A3935",
                borderLeft: "3px solid #C4972F",
                background: "#F7F6F3",
                padding: "1.2rem 1.5rem",
                lineHeight: 1.7
              }}
            >
              "When intelligence becomes cheap, the scarce resource is not information — it is the judgment to act on it. The AI Edge Lab is where that judgment becomes measurable."
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="reveal mb-4" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.9rem", color: "#3A3935", lineHeight: 1.85 }}>
              The application layer of the Axion Index doctrine. Every tool is built on the same framework — Belief → Conviction → Rhythm — made operational as a measurement system.
            </p>
            <p className="reveal mb-10" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.9rem", color: "#3A3935", lineHeight: 1.85 }}>
              Where the Axion Index framework becomes measurable.
            </p>

            {/* CTA pair */}
            <div className="reveal flex flex-wrap gap-4">
              <Link 
                href="/ai-edge-lab"
                className="no-underline transition-all hover:bg-[#111111]"
                style={{ 
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: "#141412",
                  color: "#FFFFFF",
                  padding: "14px 32px"
                }}
              >
                Enter the Lab
              </Link>
              <Link 
                href="/ai-edge-lab"
                className="no-underline transition-colors hover:text-[#141412]"
                style={{ 
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#878580",
                  padding: "14px 0"
                }}
              >
                Quick Mirror — Free, 5 min →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* S11 — FOUNDER (LIGHT, #F7F6F3) */}
      <section id="founder" style={{ background: "#F7F6F3", padding: "8rem 3.5rem" }}>
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">
          {/* Badge card */}
          <div className="reveal lg:sticky lg:top-[70px] text-center" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "4px", padding: "2rem 1.5rem" }}>
            <div className="w-[72px] h-[72px] rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C4972F, #8C3B28)" }}>
              <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "#FFFFFF" }}>N</span>
            </div>
            <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: "#141412", marginBottom: "0.3rem" }}>Nitin Nahata</div>
            <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4972F", marginBottom: "1rem" }}>Founder, Axion Index</div>
            <div style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.77rem", color: "#878580", lineHeight: 1.7 }}>
              Tata Group · Standard Chartered<br />Udaan · Gameskraft<br />22 Years · Operating Architect
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#A07820", marginBottom: "2rem" }}>
              THE FOUNDER
            </div>

            {/* Quote */}
            <blockquote className="reveal mb-8" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.55rem", fontStyle: "italic", color: "#141412", borderLeft: "3px solid #C4972F", paddingLeft: "1.5rem", lineHeight: 1.5, margin: 0 }}>
              "Most startup failures are not strategy failures. They are people system failures — happening silently, long before anyone notices."
            </blockquote>

            {/* Bio */}
            <p className="reveal mb-8" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.9rem", color: "#3A3935", lineHeight: 1.85 }}>
              22 years across Tata Group, Standard Chartered, Udaan, and Gameskraft — designing people systems under hypergrowth, regulatory shock, and institutional stress. Creator of the Operating Architect framework. Author of <em>Baptism by Chaos.</em>
            </p>

            {/* Origin case block */}
            <div className="reveal" style={{ background: "#FFFFFF", borderLeft: "3px solid #8C3B28", padding: "1.2rem 1.5rem" }}>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8C3B28", marginBottom: "0.8rem" }}>
                THE ORIGIN · GAMESKRAFT · 4AM · 2022
              </div>
              <p style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.85rem", color: "#3A3935", lineHeight: 1.8, margin: 0 }}>
                A regulatory notification threatened to erase an entire industry overnight. Leading the response — protecting organisational dignity under existential pressure, maintaining operating rhythm, rebuilding the architecture from inside — is the founding experience of everything Axion Index stands for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT BAND (DARK, #0A0A0A) */}
      <section style={{ background: "#0A0A0A", padding: "7rem 3.5rem" }}>
        <div className="max-w-[780px] mx-auto text-center">
          {/* Ornament */}
          <div className="reveal flex items-center justify-center gap-4 mb-8">
            <span className="h-[1px] w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(196,151,47,0.3))" }} />
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(196,151,47,0.4)" }}>THE FOUNDING STATEMENT</span>
            <span className="h-[1px] w-16" style={{ background: "linear-gradient(90deg, rgba(196,151,47,0.3), transparent)" }} />
          </div>

          {/* Statement */}
          <p className="reveal mb-8" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(1.35rem, 2.2vw, 1.9rem)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            HR's role is not to manage people or protect culture — but to architect the operating system that aligns human energy with organisational rhythm.
          </p>

          {/* Attribution */}
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
            Nitin Nahata · Founder · Axion Index
          </div>
        </div>
      </section>

      {/* S12 — FINAL CTA (DARK, #000000) */}
      <section style={{ background: "#000000", padding: "12rem 3.5rem", position: "relative" }}>
        {/* Gold glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 55% at 50% 52%, rgba(196,151,47,0.11) 0%, transparent 62%)" }} />

        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          <h2 className="reveal mb-8" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 6vw, 6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.85)", maxWidth: "18ch", margin: "0 auto 2rem" }}>
            Is your organisation structurally built for <em style={{ fontStyle: "italic", color: "#C4972F" }}>what comes next?</em>
          </h2>

          <p className="reveal mb-12" style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(255,255,255,0.38)" }}>
            Five minutes. One signal. A clearer next move.
          </p>

          <Link 
            href="/ai-edge-lab"
            className="reveal inline-block no-underline transition-all hover:-translate-y-[2px]"
            style={{ 
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: "#C4972F",
              color: "#000",
              padding: "1rem 2.8rem",
              borderRadius: "2px",
              boxShadow: "0 4px 20px rgba(196,151,47,0.15)"
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 32px rgba(196,151,47,0.28), 0 2px 8px rgba(196,151,47,0.15)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(196,151,47,0.15)"}
          >
            Try Quick Mirror — Free
          </Link>
        </div>
      </section>

      {/* FOOTER (DARK, #000000) */}
      <footer style={{ background: "#000000", padding: "2rem 3.5rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.38)" }}>
            AXION INDEX
          </div>

          {/* Links */}
          <div className="flex items-center gap-6" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em" }}>
            <a href="#framework" className="text-[rgba(255,255,255,0.18)] no-underline transition-colors hover:text-[rgba(255,255,255,0.38)]">Framework</a>
            <Link href="/ai-edge-lab" className="text-[rgba(255,255,255,0.18)] no-underline transition-colors hover:text-[rgba(255,255,255,0.38)]">AI Edge Lab</Link>
            <a href="#founder" className="text-[rgba(255,255,255,0.18)] no-underline transition-colors hover:text-[rgba(255,255,255,0.38)]">Founder</a>
            <a href="mailto:nitin@axionindex.org" className="text-[rgba(255,255,255,0.18)] no-underline transition-colors hover:text-[rgba(255,255,255,0.38)]">Contact</a>
          </div>

          {/* Copy */}
          <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", color: "rgba(255,255,255,0.18)" }}>
            © 2026 Axion Index · axionindex.org · Bengaluru, India · Codified energy for the unfinished
          </div>
        </div>
      </footer>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes fadeRise {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroLock {
          0% { opacity: 0; transform: translateY(16px); }
          70% { opacity: 1; transform: translateY(-2px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .reveal {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
