"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

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

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --ink: #0C0B09;
          --ink2: #141210;
          --gold: #C49A3C;
          --gold-dim: rgba(196,154,60,.45);
          --parchment: #F4EFE6;
          --rust: #8C3B28;
          --dim: #6B6358;
          --mist: #B0A898;
          --warm-grey: #2C2824;
          --green: #5BAD7A;
          --border-dark: rgba(196,154,60,.2);
          --border-light: rgba(140,59,40,.15);
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes tick {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        .fade-up {
          opacity: 0;
          animation: fadeUp 0.65s var(--ease) forwards;
        }
        
        .fade-up-d1 { animation-delay: 0.2s; }
        .fade-up-d2 { animation-delay: 0.38s; }
        .fade-up-d3 { animation-delay: 0.55s; }
        .fade-up-d4 { animation-delay: 0.72s; }
        
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.65s var(--ease), transform 0.65s var(--ease);
        }
        
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }
        
        .ticker-track {
          will-change: transform;
          animation: tick 140s linear infinite;
        }
        
        .ticker-track:hover {
          animation-play-state: paused;
        }
        
        .live-dot {
          animation: livePulse 1.8s infinite;
        }
        
        /* Nav dropdown styles */
        .nav-dropdown {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: opacity 0.2s var(--ease), transform 0.2s var(--ease), visibility 0.2s;
        }
        
        .nav-item:hover .nav-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .dropdown-link {
          border-left: 2px solid transparent;
          transition: all 0.15s var(--ease);
        }
        
        .dropdown-link:hover {
          color: var(--gold);
          border-left-color: var(--gold);
          padding-left: 16px;
          background: rgba(196,154,60,.04);
        }
        
        /* Mobile menu hamburger */
        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--gold);
          transition: all 0.25s var(--ease);
        }
        
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }
        
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(4px, -4px);
        }
        
        /* Mobile responsive hero */
        @media (max-width: 960px) {
          .hero-section {
            padding: calc(72px + 3rem) 1.5rem 3rem !important;
          }
          .hero-h1 {
            font-size: clamp(2.8rem, 8vw, 3.8rem) !important;
          }
        }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center justify-between"
        style={{
          background: "rgba(12,11,9,.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(196,154,60,.2)",
          padding: "0 3.5rem",
        }}
      >
        {/* Logo */}
        <Link 
          href="/" 
          className="flex-shrink-0 no-underline transition-all duration-[180ms]" 
          style={{ 
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", 
            fontSize: "1.1rem", 
            fontWeight: 700, 
            letterSpacing: "0.16em", 
            textTransform: "uppercase", 
            color: "#C49A3C" 
          }}
        >
          Axion Index
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-6">
          {/* AI Edge Lab with dropdown */}
          <div className="nav-item relative">
            <button 
              className="flex items-center gap-2 no-underline transition-colors duration-[180ms] hover:text-[#C49A3C] bg-transparent border-none cursor-pointer"
              style={{ 
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                fontSize: "0.6rem", 
                letterSpacing: "0.1em", 
                textTransform: "uppercase", 
                color: "#6B6358" 
              }}
            >
              <span className="w-[6px] h-[6px] rounded-full live-dot" style={{ background: "#5BAD7A" }} />
              AI Edge Lab
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: "2px" }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Dropdown */}
            <div 
              className="nav-dropdown absolute top-full left-0 pt-2"
              style={{ minWidth: "280px" }}
            >
              <div style={{ 
                background: "rgba(13,12,10,.97)", 
                backdropFilter: "blur(24px)", 
                border: "1px solid rgba(196,154,60,.2)", 
                borderTop: "2px solid #C49A3C",
                padding: "1rem 0"
              }}>
                <div style={{ 
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                  fontSize: "0.5rem", 
                  letterSpacing: "0.14em", 
                  textTransform: "uppercase", 
                  color: "rgba(196,154,60,.5)", 
                  padding: "0.5rem 1.2rem 0.8rem",
                  borderBottom: "1px solid rgba(196,154,60,.1)",
                  marginBottom: "0.5rem"
                }}>
                  The Four Indexes
                </div>
                
                {[
                  { name: "AI Replaceability Index", href: "/replaceability", badge: "LIVE", badgeType: "live" },
                  { name: "Brainpower Density Index", href: "/brainpower", badge: "BUILDING", badgeType: "building" },
                  { name: "AI Aligned Index", href: "/ai-aligned", badge: "BUILDING", badgeType: "building" },
                  { name: "Org Decision Architecture", href: "/org-design", badge: "ENGAGEMENT", badgeType: "engagement" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="dropdown-link flex items-center justify-between no-underline"
                    style={{ 
                      fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                      fontSize: "0.6rem", 
                      color: "#6B6358",
                      padding: "0.6rem 1.2rem",
                    }}
                  >
                    <span>{item.name}</span>
                    <span style={{
                      fontSize: "0.45rem",
                      letterSpacing: "0.06em",
                      padding: "2px 6px",
                      background: item.badgeType === "live" ? "rgba(91,173,122,.15)" : item.badgeType === "building" ? "rgba(196,154,60,.12)" : "rgba(107,99,88,.1)",
                      color: item.badgeType === "live" ? "#5BAD7A" : item.badgeType === "building" ? "#C49A3C" : "#6B6358",
                      border: `1px solid ${item.badgeType === "live" ? "rgba(91,173,122,.3)" : item.badgeType === "building" ? "rgba(196,154,60,.25)" : "rgba(107,99,88,.2)"}`,
                    }}>
                      {item.badge}
                    </span>
                  </Link>
                ))}
                
                <div style={{ height: "1px", background: "rgba(196,154,60,.1)", margin: "0.8rem 1.2rem" }} />
                
                <Link
                  href="/ai-edge-lab"
                  className="dropdown-link flex items-center no-underline"
                  style={{ 
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                    fontSize: "0.6rem", 
                    color: "#C49A3C",
                    padding: "0.6rem 1.2rem",
                  }}
                >
                  Enter the AI Edge Lab →
                </Link>
              </div>
            </div>
          </div>

          {/* Org Design - plain link */}
          <Link 
            href="/org-design" 
            className="no-underline transition-colors duration-[180ms] hover:text-[#C49A3C]"
            style={{ 
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
              fontSize: "0.6rem", 
              letterSpacing: "0.1em", 
              textTransform: "uppercase", 
              color: "#6B6358" 
            }}
          >
            Org Design
          </Link>

          {/* Framework - plain link */}
          <Link 
            href="/framework" 
            className="no-underline transition-colors duration-[180ms] hover:text-[#C49A3C]"
            style={{ 
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
              fontSize: "0.6rem", 
              letterSpacing: "0.1em", 
              textTransform: "uppercase", 
              color: "#6B6358" 
            }}
          >
            Framework
          </Link>

          {/* About with dropdown */}
          <div className="nav-item relative">
            <button 
              className="flex items-center gap-2 no-underline transition-colors duration-[180ms] hover:text-[#C49A3C] bg-transparent border-none cursor-pointer"
              style={{ 
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                fontSize: "0.6rem", 
                letterSpacing: "0.1em", 
                textTransform: "uppercase", 
                color: "#6B6358" 
              }}
            >
              About
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: "2px" }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Dropdown - right aligned */}
            <div 
              className="nav-dropdown absolute top-full right-0 pt-2"
              style={{ minWidth: "240px" }}
            >
              <div style={{ 
                background: "rgba(13,12,10,.97)", 
                backdropFilter: "blur(24px)", 
                border: "1px solid rgba(196,154,60,.2)", 
                borderTop: "2px solid #C49A3C",
                padding: "1rem 0"
              }}>
                {[
                  { name: "About Axion Index", href: "/about" },
                  { name: "The Axion Lexicon", href: "/lexicon" },
                  { name: "Writing & Publications", href: "/writing" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="dropdown-link block no-underline"
                    style={{ 
                      fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                      fontSize: "0.6rem", 
                      color: "#6B6358",
                      padding: "0.6rem 1.2rem",
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div style={{ height: "1px", background: "rgba(196,154,60,.1)", margin: "0.8rem 1.2rem" }} />
                
                {[
                  { name: "Labour Codes Practice", href: "/labour-codes" },
                  { name: "Family Business HR", href: "/family-business" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="dropdown-link block no-underline"
                    style={{ 
                      fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                      fontSize: "0.6rem", 
                      color: "#6B6358",
                      padding: "0.6rem 1.2rem",
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/engage"
          className="hidden lg:block flex-shrink-0 whitespace-nowrap no-underline transition-all duration-[180ms]"
          style={{ 
            fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
            fontSize: "0.6rem", 
            letterSpacing: "0.1em", 
            textTransform: "uppercase", 
            background: "#C49A3C", 
            color: "#0C0B09", 
            padding: "0.7rem 1.4rem",
            fontWeight: 500
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#D9AE52"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#C49A3C"; }}
        >
          Start an Engagement
        </Link>

        {/* Mobile Hamburger */}
        <button 
          className={`lg:hidden hamburger flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[999] lg:hidden"
          style={{ 
            top: "72px", 
            background: "rgba(12,11,9,.98)", 
            padding: "2rem",
            overflowY: "auto"
          }}
        >
          {/* Section: AI Edge Lab */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ 
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
              fontSize: "0.55rem", 
              letterSpacing: "0.14em", 
              textTransform: "uppercase", 
              color: "#C49A3C",
              paddingBottom: "0.8rem",
              borderBottom: "1px solid rgba(196,154,60,.2)",
              marginBottom: "1rem"
            }}>
              AI Edge Lab
            </div>
            {[
              { name: "AI Replaceability Index", href: "/replaceability", live: true },
              { name: "Brainpower Density Index", href: "/brainpower" },
              { name: "AI Aligned Index", href: "/ai-aligned" },
              { name: "Org Decision Architecture", href: "/org-design" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 no-underline py-3"
                style={{ 
                  fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", 
                  fontSize: "1rem", 
                  color: "#B0A898",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
                {item.live && (
                  <span style={{
                    fontSize: "0.45rem",
                    letterSpacing: "0.06em",
                    padding: "2px 6px",
                    background: "rgba(91,173,122,.15)",
                    color: "#5BAD7A",
                    border: "1px solid rgba(91,173,122,.3)",
                  }}>
                    LIVE
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Section: Platform */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ 
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
              fontSize: "0.55rem", 
              letterSpacing: "0.14em", 
              textTransform: "uppercase", 
              color: "#C49A3C",
              paddingBottom: "0.8rem",
              borderBottom: "1px solid rgba(196,154,60,.2)",
              marginBottom: "1rem"
            }}>
              Platform
            </div>
            {[
              { name: "Org Design", href: "/org-design" },
              { name: "Framework", href: "/framework" },
              { name: "Labour Codes", href: "/labour-codes" },
              { name: "Family Business", href: "/family-business" },
              { name: "Lexicon", href: "/lexicon" },
              { name: "About", href: "/about" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block no-underline py-3"
                style={{ 
                  fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", 
                  fontSize: "1rem", 
                  color: "#B0A898",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Section: Engage */}
          <div>
            <div style={{ 
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
              fontSize: "0.55rem", 
              letterSpacing: "0.14em", 
              textTransform: "uppercase", 
              color: "#C49A3C",
              paddingBottom: "0.8rem",
              borderBottom: "1px solid rgba(196,154,60,.2)",
              marginBottom: "1rem"
            }}>
              Engage
            </div>
            <Link
              href="/engage"
              className="inline-block no-underline mt-2"
              style={{ 
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                fontSize: "0.7rem", 
                letterSpacing: "0.1em", 
                textTransform: "uppercase", 
                background: "#C49A3C", 
                color: "#0C0B09", 
                padding: "1rem 2rem",
                fontWeight: 500
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Start an Engagement →
            </Link>
          </div>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="hero-section relative min-h-screen overflow-hidden"
        style={{ 
          background: "#0C0B09",
          padding: "calc(72px + 5rem) 3.5rem 5rem"
        }}
      >
        <div 
          className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          style={{ minHeight: "calc(100vh - 72px - 10rem)" }}
        >
          {/* Left Column */}
          <div>
            {/* Eyebrow */}
            <div 
              className="flex items-center gap-4 mb-6 fade-up fade-up-d1"
            >
              <div className="h-px w-8" style={{ background: "#C49A3C" }} />
              <span style={{ 
                fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                fontSize: "0.62rem", 
                letterSpacing: "0.2em", 
                textTransform: "uppercase", 
                color: "#C49A3C" 
              }}>
                Operating Intelligence · Bengaluru · 2026
              </span>
            </div>

            {/* H1 */}
            <h1
              className="hero-h1 fade-up fade-up-d2"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 5.5vw, 5.2rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#F4EFE6",
                marginBottom: "1.5rem",
              }}
            >
              AI is not changing work.<br />
              <em style={{ fontStyle: "italic", color: "#C49A3C" }}>It is exposing how badly</em><br />
              <em style={{ fontStyle: "italic", color: "#C49A3C" }}>it was designed.</em>
            </h1>

            {/* Sub */}
            <p
              className="fade-up fade-up-d3"
              style={{
                fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif",
                fontSize: "0.97rem",
                color: "#B0A898",
                maxWidth: "46ch",
                lineHeight: 1.85,
                borderLeft: "2px solid #C49A3C",
                paddingLeft: "1.3rem",
                marginBottom: "2.5rem",
              }}
            >
              Most organisations don&apos;t fail because of strategy. They fail because the system underneath cannot carry it. Axion Index makes that system visible — and redesigns it before the break.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 fade-up fade-up-d4">
              <Link
                href="/ai-edge-lab"
                className="no-underline transition-all duration-[180ms]"
                style={{ 
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                  fontSize: "0.68rem", 
                  letterSpacing: "0.14em", 
                  textTransform: "uppercase", 
                  fontWeight: 500,
                  background: "#C49A3C", 
                  color: "#0C0B09", 
                  padding: "14px 32px" 
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#D9AE52"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#C49A3C"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Enter the AI Edge Lab →
              </Link>
              <Link
                href="/engage"
                className="no-underline transition-all duration-[180ms]"
                style={{ 
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                  fontSize: "0.68rem", 
                  letterSpacing: "0.14em", 
                  textTransform: "uppercase",
                  color: "#B0A898", 
                  border: "1px solid rgba(196,154,60,.2)", 
                  padding: "14px 32px" 
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C49A3C"; e.currentTarget.style.color = "#C49A3C"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,154,60,.2)"; e.currentTarget.style.color = "#B0A898"; }}
              >
                Start an Engagement
              </Link>
            </div>
          </div>

          {/* Right Column - Index Panel */}
          <div 
            className="fade-up hidden lg:block"
            style={{ animationDelay: "0.5s" }}
          >
            <div style={{ 
              border: "1px solid rgba(196,154,60,.2)", 
              background: "rgba(20,18,16,.6)", 
              backdropFilter: "blur(12px)" 
            }}>
              {/* Header */}
              <div 
                className="flex items-center justify-between"
                style={{ 
                  padding: "1rem 1.3rem", 
                  background: "rgba(196,154,60,.05)", 
                  borderBottom: "1px solid rgba(196,154,60,.2)" 
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full" style={{ background: "#C49A3C", opacity: 0.5 }} />
                  <span style={{ 
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                    fontSize: "0.58rem", 
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C49A3C" 
                  }}>
                    The AI Edge Lab
                  </span>
                </div>
                <span style={{ 
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                  fontSize: "0.53rem", 
                  color: "#6B6358" 
                }}>
                  Four Indexes · One Framework
                </span>
              </div>

              {/* Index Rows */}
              {[
                { num: "01", name: "AI Replaceability Index", sub: "Role defensibility · Edge Score", status: "Live", statusColor: "#5BAD7A", statusIcon: "●" },
                { num: "02", name: "Brainpower Density Index", sub: "Leadership impact altitude", status: "Building", statusColor: "#C49A3C", statusIcon: "◐" },
                { num: "03", name: "AI Aligned Index", sub: "AI readiness & adaptability", status: "Building", statusColor: "#C49A3C", statusIcon: "◐" },
                { num: "04", name: "Org Decision Architecture", sub: "Structural AI exposure + redesign", status: "Engagement", statusColor: "#6B6358", statusIcon: "○" },
              ].map((item, i) => (
                <div 
                  key={item.num}
                  className="grid transition-colors duration-[150ms]"
                  style={{ 
                    gridTemplateColumns: "2.5rem 1fr auto", 
                    padding: "0.95rem 1.3rem", 
                    borderBottom: i < 3 ? "1px solid rgba(196,154,60,.09)" : "none",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,154,60,.04)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ 
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                    fontSize: "0.55rem", 
                    color: "rgba(196,154,60,.4)" 
                  }}>
                    {item.num}
                  </span>
                  <div>
                    <div style={{ 
                      fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", 
                      fontSize: "0.88rem", 
                      fontWeight: 500,
                      color: "#F4EFE6",
                      marginBottom: "0.15rem"
                    }}>
                      {item.name}
                    </div>
                    <div style={{ 
                      fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                      fontSize: "0.5rem", 
                      color: "#6B6358" 
                    }}>
                      {item.sub}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span style={{ color: item.statusColor, fontSize: "0.6rem" }}>{item.statusIcon}</span>
                    <span style={{ 
                      fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                      fontSize: "0.5rem", 
                      color: item.statusColor 
                    }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div 
                className="flex items-center justify-between"
                style={{ 
                  padding: "0.9rem 1.3rem", 
                  background: "rgba(196,154,60,.04)", 
                  borderTop: "1px solid rgba(196,154,60,.2)" 
                }}
              >
                <span style={{ 
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                  fontSize: "0.53rem", 
                  color: "#6B6358" 
                }}>
                  axionindex.org · AI Edge Lab
                </span>
                <Link 
                  href="/ai-edge-lab"
                  className="no-underline transition-colors duration-[150ms] hover:text-[#C49A3C]"
                  style={{ 
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                    fontSize: "0.53rem", 
                    color: "rgba(196,154,60,.6)" 
                  }}
                >
                  View all indexes →
                </Link>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ═══ TICKER ═══ */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          height: "36px", 
          background: "#0C0B09", 
          borderBottom: "1px solid rgba(196,154,60,.2)" 
        }}
      >
        {/* Fade edges */}
        <div 
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: "4rem", background: "linear-gradient(to right, #0C0B09, transparent)" }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: "4rem", background: "linear-gradient(to left, #0C0B09, transparent)" }}
        />
        
        <div 
          className="ticker-track flex items-center h-full whitespace-nowrap"
          style={{ width: "fit-content" }}
        >
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center">
              {[
                "AI Replaceability Index",
                "Brainpower Density Index",
                "Org Decision Architecture",
                "Labour Codes as Organisational Design",
                "Belief → Conviction → Rhythm",
                "The Unfinished Organisation",
                "Compression-Judgment Field",
                "Edge Score",
                "Family Business HR",
                "AI Aligned Index",
              ].map((item, i) => (
                <span key={`${setIdx}-${i}`} className="flex items-center" style={{ marginRight: "2rem" }}>
                  <span style={{ 
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
                    fontSize: "0.55rem", 
                    letterSpacing: "0.14em", 
                    textTransform: "uppercase", 
                    color: "rgba(196,154,60,.45)" 
                  }}>
                    {item}
                  </span>
                  <span style={{ marginLeft: "2rem", color: "rgba(196,154,60,.45)", fontSize: "0.5rem" }}>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder for remaining sections - Parts 2 and 3 will add these */}
      <section style={{ background: "#0C0B09", padding: "6rem 2rem", textAlign: "center" }}>
        <p style={{ 
          fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", 
          fontSize: "0.7rem", 
          color: "rgba(196,154,60,.4)",
          letterSpacing: "0.1em"
        }}>
          [Remaining sections will be added in Parts 2 and 3]
        </p>
      </section>
    </>
  );
}
