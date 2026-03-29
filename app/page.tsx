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
              <span className="w-[6px] h-[6px] rounded-full" style={{ background: "#C49A3C" }} />
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
                  { name: "AI Aligned Index", href: "/ai-aligned", badge: "BUILDING", badgeType: "building" },
                  { name: "AI Replaceability Index", href: "/replaceability", badge: "LIVE", badgeType: "live" },
                  { name: "Brainpower Density Index", href: "/brainpower", badge: "BUILDING", badgeType: "building" },
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
              { name: "AI Aligned Index", href: "/ai-aligned", badge: "Building" },
              { name: "AI Replaceability Index", href: "/replaceability", badge: "Live", live: true },
              { name: "Brainpower Density Index", href: "/brainpower", badge: "Building" },
              { name: "Org Decision Architecture", href: "/org-design", badge: "Engagement" },
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
                {item.badge && (
                  <span style={{
                    fontSize: "0.45rem",
                    letterSpacing: "0.06em",
                    padding: "2px 6px",
                    background: item.live ? "rgba(91,173,122,.15)" : item.badge === "Building" ? "rgba(196,154,60,.1)" : "rgba(107,99,88,.1)",
                    color: item.live ? "#5BAD7A" : item.badge === "Building" ? "#C49A3C" : "#6B6358",
                    border: `1px solid ${item.live ? "rgba(91,173,122,.3)" : item.badge === "Building" ? "rgba(196,154,60,.25)" : "rgba(107,99,88,.2)"}`,
                  }}>
                    {item.badge.toUpperCase()}
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
                  The operating intelligence layer
                </span>
              </div>

              {/* Index Rows */}
              {[
                { num: "01", name: "AI Aligned Index", sub: "Belief · Architecture · Readiness", status: "Building", statusColor: "#C49A3C", statusIcon: "◐" },
                { num: "02", name: "AI Replaceability Index", sub: "Roles · Compression · Redesign", status: "Live", statusColor: "#5BAD7A", statusIcon: "●" },
                { num: "03", name: "Brainpower Density Index", sub: "Judgment · Energy · Leverage", status: "Building", statusColor: "#C49A3C", statusIcon: "◐" },
                { num: "04", name: "Org Decision Architecture", sub: "Authority · Accountability · Speed", status: "Engagement", statusColor: "#6B6358", statusIcon: "○" },
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
                "The Evolving Organisation",
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

      {/* ═══ CAROUSEL ═══ */}
      <CarouselSection />

      {/* ═══ S1 — SYSTEM MAP ═══ */}
      <section style={{ background: "#141210", padding: "6rem 3.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,154,60,.6)", marginBottom: "1rem" }}>
            How the System Works
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "0.8rem" }}>
            Four instruments. <em style={{ fontStyle: "italic", color: "#C49A3C" }}>One compound logic.</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#6B6358", marginBottom: "3rem", maxWidth: "52ch" }}>
            Every Axion Index engagement begins with measurement, not assumption.
          </p>

          <div className="reveal reveal-d3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ border: "1px solid rgba(196,154,60,.2)" }}>
            {[
              { step: "Step 01", title: "Measure the Role", body: "AI Replaceability Index maps what % of the role's core tasks AI can already perform — returns an Edge Score 0–100." },
              { step: "Step 02", title: "Measure the Leader", body: "Brainpower Density Index measures what % of leadership hours are in genuinely consequential work vs. work at the wrong altitude." },
              { step: "Step 03", title: "Map the Organisation", body: "Org Decision Architecture aggregates scores — producing a structural AI exposure map and redesign roadmap." },
              { step: "Step 04", title: "Apply Domain Expertise", body: "Labour Codes, Family Business HR, and bespoke engagements apply the framework to your specific operating context." },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative transition-colors duration-[180ms]"
                style={{ padding: "2rem 1.5rem", borderRight: i < 3 ? "1px solid rgba(196,154,60,.2)" : "none", borderBottom: "1px solid rgba(196,154,60,.2)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,154,60,.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C49A3C", marginBottom: "1rem" }}>{item.step}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: "#F4EFE6", marginBottom: "0.8rem" }}>{item.title}</h3>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.8rem", color: "#6B6358", lineHeight: 1.65 }}>{item.body}</p>
                {i < 3 && (
                  <div className="hidden lg:flex absolute items-center justify-center" style={{ right: "-14px", top: "50%", transform: "translateY(-50%)", width: "28px", height: "28px", background: "#141210", border: "1px solid rgba(196,154,60,.2)", zIndex: 2 }}>
                    <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.8rem", color: "#C49A3C" }}>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S2 — THREE AUDIENCES ═══ */}
      <section style={{ background: "#F4EFE6", padding: "6rem 3.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8C3B28", marginBottom: "1rem" }}>
            Where Do You Need to Start?
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#0C0B09", marginBottom: "3rem" }}>
            The same question. <em style={{ fontStyle: "italic", color: "#8C3B28" }}>Three different answers.</em>
          </h2>

          <div className="reveal reveal-d2 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { tag: "For Individuals", q: "Is your role defensible as AI reshapes work?", body: "The AI Replaceability Index maps where your work sits on the Compression-Judgment Field and returns your Edge Score.", cta: "Take the Index →", href: "/replaceability" },
              { tag: "For Senior Leaders", q: "Are you creating impact at the right altitude?", body: "The Brainpower Density Index measures what % of your leadership time is in genuinely consequential work vs work that should never reach you.", cta: "Measure Your Impact →", href: "/brainpower" },
              { tag: "For Organisations", q: "Is your organisation structured for the AI economy?", body: "The Org Decision Architecture Index maps structural AI exposure and builds a redesign roadmap with hard 12-month targets.", cta: "Begin the Engagement →", href: "/org-design" },
            ].map((card) => (
              <div
                key={card.tag}
                className="relative transition-all duration-[180ms] group"
                style={{ padding: "2rem 1.6rem", border: "1px solid rgba(140,59,40,.15)", background: "#FAF8F4" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8C3B28"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(140,59,40,.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] origin-left transition-transform duration-[300ms] scale-x-0 group-hover:scale-x-100" style={{ background: "#8C3B28" }} />
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8C3B28", marginBottom: "1rem" }}>{card.tag}</div>
                <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.2rem", color: "#0C0B09", marginBottom: "1rem", lineHeight: 1.4 }}>{card.q}</p>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "#4A433C", lineHeight: 1.65, marginBottom: "1.5rem" }}>{card.body}</p>
                <Link href={card.href} className="no-underline transition-colors duration-[150ms] hover:opacity-70" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8C3B28" }}>{card.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT THIS MEANS FOR YOU ═══ */}
      <section style={{ background: "#0C0B09", padding: "6rem 3.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,154,60,.6)", marginBottom: "1rem" }}>
            What This Means for You
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "3rem" }}>
            Different leaders. <em style={{ fontStyle: "italic", color: "#C49A3C" }}>One system.</em>
          </h2>

          <div className="reveal reveal-d2 grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { role: "If you are a Founder", title: "Clarity on where your organisation will break — before it does", body: "Scale exposes every deferred decision. Axion Index makes the invisible visible — mapping where belief has not yet become conviction, where conviction has not yet become rhythm." },
              { role: "If you are a CFO", title: "Workforce risk and compliance as a financial architecture problem", body: "Labour codes are not a legal checkbox. They are a structural mirror. Axion Index translates regulatory complexity into operating architecture that protects value." },
              { role: "If you are a CHRO", title: "The shift from program ownership to system architecture", body: "HR is not a service function. It is the operating system underneath everything else. Axion Index provides the frameworks to architect systems, not administer programs." },
              { role: "If you sit on a Board", title: "Visibility into the invisible organisational risks", body: "Founder dependency. Decision latency. Cultural debt. The risks that don't appear on balance sheets until they explode. Axion Index makes them measurable." },
            ].map((card) => (
              <div
                key={card.role}
                className="relative group transition-all duration-[180ms]"
                style={{ padding: "2rem 1.8rem", border: "1px solid rgba(196,154,60,.15)", background: "rgba(196,154,60,.03)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C49A3C"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,154,60,.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] origin-left transition-transform duration-[300ms] scale-x-0 group-hover:scale-x-100" style={{ background: "#C49A3C" }} />
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8C3B28", marginBottom: "0.8rem" }}>{card.role}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 700, color: "#F4EFE6", marginBottom: "0.8rem", lineHeight: 1.3 }}>{card.title}</h3>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "#6B6358", lineHeight: 1.65 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE NAME — WHY AXION. WHY INDEX. ═══ */}
      <section style={{ background: "#141210", padding: "6rem 3.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,154,60,.6)", marginBottom: "1rem" }}>
            01 — The Name
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "1.5rem" }}>
            Why <em style={{ fontStyle: "italic", color: "#C49A3C" }}>Axion.</em> Why <em style={{ fontStyle: "italic", color: "#C49A3C" }}>Index.</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#B0A898", marginBottom: "3rem", maxWidth: "64ch", lineHeight: 1.75 }}>
            An <strong style={{ color: "#F4EFE6" }}>axion</strong> is a hypothetical particle in physics — invisible, yet believed to hold the universe together. An <strong style={{ color: "#F4EFE6" }}>index</strong> is a reference system — a way to locate, measure, and navigate. Together, they name what Axion Index does: make the invisible forces that hold organisations together visible, measurable, and navigable.
          </p>

          <div className="reveal reveal-d3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: "Ax·01", title: "Invisible but foundational", body: "Like the axion particle, the forces that hold organisations together are often invisible — belief, conviction, rhythm. They don't appear on org charts.", implication: "We name what others leave unnamed." },
              { code: "Ax·02", title: "Codified, not mystical", body: "An index is precise. It locates. It measures. It provides reference. Axion Index takes what feels intangible and makes it diagnostic.", implication: "We make the invisible measurable." },
              { code: "Ax·03", title: "Pre-institutional by design", body: "The axion was theorised to solve a problem before it was observed. Axion Index works the same way — designing for problems before they become crises.", implication: "We diagnose before breakdown." },
              { code: "Ax·04", title: "Energy, not capital", body: "The organisation runs on human energy, not just financial capital. Axion Index designs for the energy underneath the balance sheet.", implication: "We architect energy, not just structure." },
            ].map((item) => (
              <div
                key={item.code}
                className="transition-colors duration-[180ms]"
                style={{ padding: "1.5rem", border: "1px solid rgba(196,154,60,.15)", background: "rgba(196,154,60,.02)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,154,60,.06)"; e.currentTarget.style.borderColor = "rgba(196,154,60,.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(196,154,60,.02)"; e.currentTarget.style.borderColor = "rgba(196,154,60,.15)"; }}
              >
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", color: "#C49A3C", marginBottom: "0.8rem" }}>{item.code}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: "#F4EFE6", marginBottom: "0.6rem" }}>{item.title}</h3>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.78rem", color: "#6B6358", lineHeight: 1.6, marginBottom: "1rem" }}>{item.body}</p>
                <p style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.75rem", color: "#C49A3C", lineHeight: 1.5 }}>{item.implication}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S3 — THE AI EDGE LAB ═══ */}
      <section style={{ background: "#141210", padding: "6rem 3.5rem", position: "relative", overflow: "hidden" }}>
        {/* Large watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(6rem, 18vw, 14rem)", fontWeight: 700, color: "rgba(196,154,60,.04)", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          AI EDGE LAB
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", color: "rgba(196,154,60,.5)", marginBottom: "1.5rem" }}>
            axionindex.org / <span style={{ color: "#C49A3C" }}>The AI Edge Lab</span>
          </div>

          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C49A3C", marginBottom: "1rem" }}>
            07 — The AI Edge Lab
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "0.8rem" }}>
            Operating intelligence, <em style={{ fontStyle: "italic", color: "#C49A3C" }}>made measurable.</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#B0A898", marginBottom: "1.5rem", maxWidth: "64ch", lineHeight: 1.75 }}>
            The AI Edge Lab is Axion Index&apos;s work at the intersection of AI, Org Design and Human beings in the evolving workspace landscape. It translates complex workforce, compliance, and structural questions into quantified, decision-grade signals for founders, CFOs, CHROs, and boards.
          </p>

          <div className="reveal reveal-d2 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Intro + CTA */}
            <div>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "#B0A898", lineHeight: 1.75, marginBottom: "2rem" }}>
                Four indices. One compound logic. Every engagement begins with measurement — translating invisible organisational forces into quantified, decision-grade signals.
              </p>
              <Link
                href="/ai-edge-lab"
                className="inline-block no-underline transition-all duration-[180ms]"
                style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, background: "#C49A3C", color: "#0C0B09", padding: "14px 32px" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#D9AE52"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#C49A3C"; }}
              >
                Access the Lab →
              </Link>
            </div>

            {/* Right: 5 diagnostic tools */}
            <div style={{ border: "1px solid rgba(196,154,60,.25)", background: "rgba(196,154,60,.03)" }}>
              <div style={{ padding: "1rem 1.2rem", borderBottom: "1px solid rgba(196,154,60,.15)" }}>
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C49A3C" }}>Diagnostic Tools</div>
              </div>
              {[
                { name: "AI Replaceability Index", status: "live", href: "/replaceability" },
                { name: "Brainpower Density Index", status: "building", href: "/brainpower" },
                { name: "AI Aligned Index", status: "building", href: "/ai-aligned" },
                { name: "Org Decision Architecture", status: "engagement", href: "/org-design" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center justify-between transition-colors duration-[150ms]"
                  style={{ padding: "0.9rem 1.2rem", borderBottom: "1px solid rgba(196,154,60,.1)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,154,60,.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <Link href={tool.href} className="no-underline flex-1" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: tool.status === "live" ? "#F4EFE6" : "#6B6358" }}>
                    {tool.name}
                  </Link>
                  {tool.status === "live" && (
                    <span className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.08em", color: "#5BAD7A", background: "rgba(91,173,122,.12)", border: "1px solid rgba(91,173,122,.25)", padding: "2px 8px" }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#5BAD7A" }} />
                      LIVE
                    </span>
                  )}
                  {tool.status === "building" && (
                    <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.08em", color: "#C49A3C", background: "rgba(196,154,60,.1)", border: "1px solid rgba(196,154,60,.25)", padding: "2px 8px" }}>BUILDING</span>
                  )}
                  {tool.status === "soon" && (
                    <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.08em", color: "#6B6358", background: "rgba(107,99,88,.1)", border: "1px solid rgba(107,99,88,.2)", padding: "2px 8px" }}>SOON</span>
                  )}
                  {tool.status === "engagement" && (
                    <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.08em", color: "#6B6358", background: "rgba(107,99,88,.1)", border: "1px solid rgba(107,99,88,.2)", padding: "2px 8px" }}>ENGAGEMENT</span>
                  )}
                </div>
              ))}
              <div style={{ padding: "0.8rem 1.2rem", borderTop: "1px solid rgba(196,154,60,.15)" }}>
                <Link href="/ai-edge-lab" className="no-underline" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.1em", color: "#C49A3C" }}>
                  Enter the AI Edge Lab →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ S4 — SYSTEM FLOW ═══ */}
      <section style={{ background: "#141210", padding: "6rem 3.5rem" }}>
        <div className="max-w-[900px] mx-auto">
          <div className="reveal text-center" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,154,60,.6)", marginBottom: "1rem" }}>
            The Compound Logic
          </div>
          <h2 className="reveal reveal-d1 text-center" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "0.8rem" }}>
            Individual scores build into <em style={{ fontStyle: "italic", color: "#C49A3C" }}>organisational intelligence.</em>
          </h2>
          <p className="reveal reveal-d2 text-center" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#6B6358", marginBottom: "3rem", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The four indexes are not independent. They are a layered system.
          </p>

          <div className="reveal reveal-d3" style={{ border: "1px solid rgba(196,154,60,.2)", padding: "2.5rem", background: "rgba(196,154,60,.03)" }}>
            <div className="text-center" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6358", marginBottom: "2rem" }}>
              How the indexes compound
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              {[
                { tier: "Index 01", title: "Individual Score", metric: "Edge Score 0–100" },
                { tier: "Index 02", title: "Leadership Score", metric: "Density % + Altitude" },
                { tier: "Index 04", title: "Org Architecture", metric: "Exposure Map + Map" },
                { tier: "Output", title: "Redesign Logic", metric: "12-Month Targets" },
              ].map((node, i) => (
                <div key={node.tier} className="flex items-center gap-4">
                  <div className="text-center" style={{ padding: "1.5rem 2rem", border: "1px solid rgba(196,154,60,.2)", minWidth: "180px" }}>
                    <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6358", marginBottom: "0.5rem" }}>{node.tier}</div>
                    <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: "#F4EFE6", marginBottom: "0.3rem" }}>{node.title}</div>
                    <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", color: "#C49A3C" }}>{node.metric}</div>
                  </div>
                  {i < 3 && (
                    <span className="hidden lg:block" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "1.2rem", color: "rgba(196,154,60,.4)" }}>→</span>
                  )}
                  {i < 3 && (
                    <span className="lg:hidden" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "1.2rem", color: "rgba(196,154,60,.4)" }}>↓</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-center" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.95rem", color: "#6B6358", marginTop: "1.8rem" }}>
              The system builds on itself — <strong style={{ color: "#C49A3C" }}>individual clarity becomes organisational intelligence.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ═══ S5 — AXION FIELD ═══ */}
      <AxionFieldSection />

      {/* ═══ S6 — BRAINPOWER DENSITY ═══ */}
      <BrainpowerDensitySection />

      {/* ═══ S7 — FRAMEWORK ═══ */}
      <section style={{ background: "#141210", padding: "6rem 3.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,154,60,.6)", marginBottom: "1rem" }}>
            The Core Framework
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "0.8rem" }}>
            Belief → Conviction → <em style={{ fontStyle: "italic", color: "#C49A3C" }}>Rhythm</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#6B6358", marginBottom: "3rem", maxWidth: "64ch" }}>
            Every Axion Index engagement diagnoses where an organisation is stuck in this sequence. Not a leadership philosophy — an operating sequence whose failure is detectable before it becomes catastrophic.
          </p>

          <div className="reveal reveal-d3 grid grid-cols-1 lg:grid-cols-4" style={{ border: "1px solid rgba(196,154,60,.2)" }}>
            {[
              { stage: "Stage 01", word: "Belief", body: "The founder's private conviction. Felt before it can be articulated. Fragile if it lives in one person's head.", isLast: false },
              { stage: "Stage 02", word: "Conviction", body: "Belief that has been shared, tested, and internalised. Survives disagreement without the founder in the room.", isLast: false },
              { stage: "Stage 03", word: "Rhythm", body: "Conviction that has become repeatable behaviour — consistent decisions, predictable culture, governance under pressure.", isLast: false },
              { stage: "Failure Mode", word: "Fragility", body: "Belief without conviction becomes fragility. Conviction without rhythm becomes bureaucracy. This is where most organisations lose the plot.", isLast: true },
            ].map((node, i) => (
              <div
                key={node.stage}
                className="relative transition-colors duration-[180ms]"
                style={{ padding: "2.2rem 1.5rem", borderRight: i < 3 ? "1px solid rgba(196,154,60,.2)" : "none", borderBottom: "1px solid rgba(196,154,60,.2)", background: node.isLast ? "rgba(140,59,40,.06)" : "transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = node.isLast ? "rgba(140,59,40,.1)" : "rgba(196,154,60,.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = node.isLast ? "rgba(140,59,40,.06)" : "transparent"; }}
              >
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: node.isLast ? "#8C3B28" : "#C49A3C", marginBottom: "0.8rem" }}>{node.stage}</div>
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 700, color: node.isLast ? "#8C3B28" : "#F4EFE6", marginBottom: "0.8rem" }}>{node.word}</div>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.8rem", color: "#6B6358", lineHeight: 1.75 }}>{node.body}</p>
                {!node.isLast && (
                  <div className="hidden lg:flex absolute items-center justify-center" style={{ right: "-13px", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.9rem", color: "#C49A3C", background: "#141210", border: "1px solid rgba(196,154,60,.2)", padding: "2px 4px", zIndex: 2 }}>→</div>
                )}
              </div>
            ))}
          </div>

          <p className="reveal text-center" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1rem", color: "#6B6358", marginTop: "1.6rem" }}>
            Every engagement begins with one question: <strong style={{ color: "#C49A3C", fontStyle: "normal" }}>where in this sequence has your organisation broken down?</strong>
          </p>
        </div>
      </section>

      {/* ═══ THREE-LAYER ARCHITECTURE ═══ */}
      <section style={{ background: "#141210", padding: "6rem 3.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,154,60,.6)", marginBottom: "1rem" }}>
            04 — The Architecture
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "3rem" }}>
            Three Layers. <em style={{ fontStyle: "italic", color: "#C49A3C" }}>One System.</em>
          </h2>

          <div className="reveal reveal-d2 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                layer: "Layer One",
                name: "Nitin Nahata",
                role: "The Practitioner-Philosopher",
                roleColor: "#C49A3C",
                desc: "22 years across Tata Group, Standard Chartered, Udaan, and Gameskraft. The intellectual source behind every framework, conviction, and diagnostic.",
                subLabel: "The intellectual source",
                barColor: "#C49A3C"
              },
              {
                layer: "Layer Two",
                name: "Axion Index",
                role: "The Organisation & Intellectual Platform",
                roleColor: "#8C3B28",
                desc: "Publishing, research, diagnostic body. Where frameworks become reference systems. The platform designed to scale beyond any one practitioner.",
                subLabel: "Where frameworks become reference systems",
                barColor: "#8C3B28"
              },
              {
                layer: "Layer Three",
                name: "The Technology Layer",
                role: "Building",
                roleColor: "#4A6B8A",
                desc: "The Operating Architect framework made operational at scale. Intelligent payroll as the wedge. A people operating system as the destination — built for startups and evolving organisations who cannot afford to wait for their people systems to break.",
                subLabel: "The framework as software",
                barColor: "#4A6B8A",
                isBuilding: true
              },
            ].map((item, i) => (
              <div
                key={item.layer}
                className="relative transition-all duration-[180ms] group"
                style={{ padding: "2rem 1.8rem", border: "1px solid rgba(196,154,60,.15)", background: "rgba(26,32,48,.5)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = item.barColor; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,154,60,.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: item.barColor }} />
                
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B6358", marginBottom: "1rem" }}>{item.layer}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700, color: "#F4EFE6", marginBottom: "0.5rem" }}>{item.name}</h3>
                <div className="flex items-center gap-2" style={{ marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.08em", color: item.roleColor }}>{item.role}</span>
                  {item.isBuilding && (
                    <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.06em", color: "#C49A3C", background: "rgba(196,154,60,.1)", border: "1px solid rgba(196,154,60,.25)", padding: "2px 6px" }}>BUILDING</span>
                  )}
                </div>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "#B0A898", lineHeight: 1.65, marginBottom: "1.5rem" }}>{item.desc}</p>
                <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(196,154,60,.1)" }}>
                  <span style={{ fontFamily: "var(--font-lora), 'Lora', serif", fontStyle: "italic", fontSize: "0.78rem", color: item.roleColor }}>{item.subLabel}</span>
                </div>

                {/* Connector arrow */}
                {i < 2 && (
                  <div className="hidden lg:flex absolute items-center justify-center" style={{ right: "-22px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", background: "#141210", border: "1px solid rgba(196,154,60,.15)", zIndex: 2 }}>
                    <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "1rem", color: "#C49A3C" }}>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOUNDING CONVICTIONS ═══ */}
      <section style={{ background: "#F4EFE6", padding: "6rem 3.5rem" }}>
        <div className="max-w-[900px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8C3B28", marginBottom: "1rem" }}>
            03 — What We Believe
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#0C0B09", marginBottom: "3rem" }}>
            The Founding <em style={{ fontStyle: "italic", color: "#8C3B28" }}>Convictions</em>
          </h2>

          <div className="reveal reveal-d2">
            {[
              { num: "I", statement: "People systems fail before strategy does.", bold: "People systems" },
              { num: "II", statement: "HR is risk architecture, not happiness theatre.", bold: "HR is risk architecture" },
              { num: "III", statement: "Dignity is an operating constraint, not a cultural value.", bold: "Dignity" },
              { num: "IV", statement: "Governance without bureaucracy is possible.", bold: "Governance without bureaucracy" },
              { num: "V", statement: "Compliance is a mirror, not a burden.", bold: "Compliance is a mirror" },
              { num: "VI", statement: "The evolving organisation is a permanent form, not a transition phase.", bold: "The evolving organisation" },
            ].map((conviction, i) => (
              <div
                key={conviction.num}
                className="flex items-start gap-6 transition-colors duration-[180ms]"
                style={{ padding: "1.5rem 0", borderBottom: i < 5 ? "1px solid rgba(140,59,40,.12)" : "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(140,59,40,.03)"; e.currentTarget.style.paddingLeft = "1rem"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "0"; }}
              >
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#8C3B28", minWidth: "2.5rem" }}>{conviction.num}.</div>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "1rem", color: "#0C0B09", lineHeight: 1.6 }}>
                  <strong style={{ fontWeight: 600 }}>{conviction.bold}</strong>{conviction.statement.replace(conviction.bold, "")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S8 — DOMAINS ═══ */}
      <section style={{ background: "#FAF8F4", padding: "6rem 3.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8C3B28", marginBottom: "1rem" }}>
            Areas of Practice
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#0C0B09", marginBottom: "3rem" }}>
            Deep expertise in the domains <em style={{ fontStyle: "italic", color: "#8C3B28" }}>conventional HR has left most exposed.</em>
          </h2>

          <div className="reveal reveal-d2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { tag: "Domain Practice", title: "Labour Codes as Organisational Design", body: "India's new Labour Codes are not primarily a compliance question. They are a design problem — exposing the institutional debt organisations built while scaling past human infrastructure. Axion Index translates legislative complexity into operating architecture.", link: "Explore →", href: "/labour-codes" },
              { tag: "Domain Practice", title: "Family Business HR", body: "The largest employer class in India has almost no frameworks designed for it. Loyalty vs merit, patriarch authority, multi-generational belief systems — Axion Index builds operating logic for organisations where blood and business intersect.", link: "Explore →", href: "/family-business" },
            ].map((card) => (
              <div
                key={card.title}
                className="relative group transition-all duration-[250ms]"
                style={{ padding: "2.2rem", border: "1px solid rgba(140,59,40,.15)", background: "#FAF8F4" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8C3B28"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(140,59,40,.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] origin-left transition-transform duration-[300ms] scale-x-0 group-hover:scale-x-100" style={{ background: "#8C3B28" }} />
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8C3B28", marginBottom: "1rem" }}>{card.tag}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#0C0B09", marginBottom: "0.8rem" }}>{card.title}</h3>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.85rem", color: "#4A433C", lineHeight: 1.65, marginBottom: "1.5rem" }}>{card.body}</p>
                <Link href={card.href} className="no-underline transition-colors duration-[150ms] hover:opacity-70" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8C3B28" }}>{card.link}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UNCONVENTIONAL TABLE ═══ */}
      <section style={{ background: "#0C0B09", padding: "6rem 3.5rem" }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,154,60,.6)", marginBottom: "1rem" }}>
            05 — What Makes Us Unconventional
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "3rem" }}>
            We Operate <em style={{ fontStyle: "italic", color: "#C49A3C" }}>Differently.</em>
          </h2>

          {/* Horizontally scrollable table on mobile */}
          <div className="reveal reveal-d2 overflow-x-auto -mx-4 px-4" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(196,154,60,.3) transparent" }}>
            <table style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(196,154,60,.2)" }}>
                  <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B6358", fontWeight: 500 }}>The conventional world says...</th>
                  <th style={{ padding: "1rem 1.5rem", textAlign: "left", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C49A3C", fontWeight: 500 }}>Axion Index operates on the belief that...</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { conventional: "HR manages people", belief: "HR architects systems." },
                  { conventional: "Culture is owned by HR", belief: "Culture is owned by the operating logic." },
                  { conventional: "Compliance is legal, not strategic", belief: "Labour codes are a philosophical mirror." },
                  { conventional: "HR frameworks are universal", belief: "Context is everything." },
                  { conventional: "Technology is the solution", belief: "Technology is the codification of thinking." },
                  { conventional: "Engagement scores measure health", belief: "Decision latency, founder dependency curves, and regretted attrition are the real signals." },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="transition-colors duration-[150ms]"
                    style={{ borderBottom: "1px solid rgba(196,154,60,.1)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,154,60,.04)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <td style={{ padding: "1.2rem 1.5rem", fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "#6B6358", lineHeight: 1.5, verticalAlign: "top" }}>{row.conventional}</td>
                    <td style={{ padding: "1.2rem 1.5rem", fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "#F4EFE6", lineHeight: 1.5, verticalAlign: "top" }}>{row.belief}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ S9 — PROOF NUMBERS ═══ */}
      <section style={{ background: "#141210", padding: "6rem 3.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,154,60,.6)", marginBottom: "1rem" }}>
            The Evidence
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "3rem" }}>
            The numbers that make <em style={{ fontStyle: "italic", color: "#C49A3C" }}>the argument.</em>
          </h2>

          <div className="reveal reveal-d2 grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid rgba(196,154,60,.2)" }}>
            {[
              { num: "60%", label: "of work tasks are AI-compressible", body: "In the average knowledge-work role, more than half of daily task volume can be partially or fully performed by AI — without loss of output quality." },
              { num: "<40%", label: "of leadership time is genuinely consequential", body: "In most organisations, senior leaders spend less than 40% of their working week in the judgment-led work their role was designed for. The rest is execution drag." },
              { num: "1.3–1.5×", label: "productivity uplift from architectural redesign", body: "Organisations that realign role design with the Compression-Judgment framework consistently see measurable output gains — not from harder work, but from better architecture." },
            ].map((stat, i) => (
              <div
                key={stat.num}
                className="transition-colors duration-[180ms] text-center"
                style={{ padding: "3rem 2.5rem", borderRight: i < 2 ? "1px solid rgba(196,154,60,.2)" : "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,154,60,.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 7vw, 6rem)", fontWeight: 700, color: "#C49A3C", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "0.8rem" }}>{stat.num}</div>
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6358", marginBottom: "1rem" }}>{stat.label}</div>
                <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "#6B6358", lineHeight: 1.65 }}>{stat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S10 — ABOUT / INSTITUTION ═══ */}
      <section style={{ background: "#F4EFE6", padding: "6rem 3.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8C3B28", marginBottom: "1rem" }}>
            The Institution
          </div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#0C0B09", marginBottom: "3rem" }}>
            Axion Index is not a consulting firm. It is not a software company. <em style={{ fontStyle: "italic", color: "#8C3B28" }}>It is an operating intelligence platform.</em>
          </h2>

          <div className="reveal reveal-d2 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
            {/* Left: Paragraphs */}
            <div>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.93rem", color: "#4A433C", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                Axion Index measures the impact of AI on individuals, leaders, and organisations through four proprietary indexes. It redesigns organisations for the AI economy through expert engagements. It builds intellectual frameworks that define how serious organisations think about work.
              </p>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.93rem", color: "#4A433C", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                Every engagement begins with measurement, not assumption. The four indexes — AI Replaceability, Brainpower Density, AI Aligned, and the Organisation Decision Architecture Index — are Axion Index&apos;s signature intellectual property. <strong>They are not generic tools.</strong> The output of a specific point of view about how AI is restructuring the economics of work.
              </p>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.93rem", color: "#4A433C", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                Axion Index operates under the intellectual influence of <strong>Nitin Nahata</strong>, Operating Architect, with 22 years across Tata Group, Standard Chartered, Udaan, and Gameskraft. The thinking behind the platform is his. The platform itself is designed to scale beyond any one practitioner. <a href="https://www.nitinnahata.com" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: "#8C3B28", borderBottom: "1px solid rgba(140,59,40,.3)" }}>nitinnahata.com →</a> · <a href="https://linkedin.com/in/nahatanitin" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: "#8C3B28", borderBottom: "1px solid rgba(140,59,40,.3)" }}>LinkedIn →</a>
              </p>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.93rem", color: "#4A433C", lineHeight: 1.9 }}>
                Most organisations don&apos;t fail because of bad strategy. They fail because the system underneath cannot carry the strategy. Axion Index exists to solve that gap — before the break becomes visible.
              </p>
            </div>

            {/* Right: What Axion Index Is Not */}
            <div style={{ border: "1px solid rgba(140,59,40,.15)", padding: "1.8rem", background: "#FAF8F4" }}>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8C3B28", borderBottom: "1px solid rgba(140,59,40,.1)", paddingBottom: "0.6rem", marginBottom: "1rem" }}>
                What Axion Index Is Not
              </div>
              {[
                "Not a consulting firm — does not sell time",
                "Not a software company — does not sell licenses",
                "Not a training company — does not sell courses",
                "Not a personal brand platform — Nitin has his own site",
              ].map((item) => (
                <div key={item} style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "#4A433C", padding: "0.55rem 0", borderBottom: "1px solid rgba(140,59,40,.07)" }}>
                  <strong style={{ color: "#8C3B28" }}>Not</strong>{item.substring(3)}
                </div>
              ))}
              <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.95rem", color: "#8C3B28", lineHeight: 1.6, marginTop: "1rem" }}>
                It is an operating intelligence platform — a new category.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATEMENT BAND ═══ */}
      <section style={{ background: "#F4EFE6", padding: "7rem 3.5rem", textAlign: "center", borderBottom: "1px solid rgba(196,154,60,.2)" }}>
        <div className="max-w-[800px] mx-auto">
          <div className="reveal flex items-center justify-center gap-4" style={{ marginBottom: "2rem" }}>
            <div style={{ width: "2.2rem", height: "1px", background: "#8C3B28", opacity: 0.5 }} />
            <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.57rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8C3B28" }}>The Founding Statement</span>
            <div style={{ width: "2.2rem", height: "1px", background: "#8C3B28", opacity: 0.5 }} />
          </div>

          <blockquote className="reveal reveal-d1 relative" style={{ maxWidth: "56ch", margin: "0 auto 2rem", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", color: "#0C0B09", lineHeight: 1.65 }}>
            <span className="absolute hidden md:block" style={{ top: "-1.5rem", left: "-2rem", fontSize: "5.5rem", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: "#8C3B28", opacity: 0.13, lineHeight: 1 }}>&ldquo;</span>
            &ldquo;HR&apos;s role is not to manage people or protect culture — but to architect the operating system that aligns human energy with organisational rhythm, so belief becomes conviction, conviction becomes repeatable behaviour, and chaos evolves into sustainable performance.&rdquo;
          </blockquote>

          <div className="reveal reveal-d2" style={{ width: "2.5rem", height: "1px", background: "#8C3B28", opacity: 0.4, margin: "0.35rem auto 1rem" }} />
          <div className="reveal reveal-d3" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8C3B28" }}>
            Nitin Nahata, Founder · Axion Index
          </div>
        </div>
      </section>

      {/* ═══ S11 — FINAL CTA ═══ */}
      <section style={{ background: "#0C0B09", padding: "6rem 3.5rem", borderBottom: "1px solid rgba(196,154,60,.2)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left */}
          <div>
            <h2 className="reveal" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.02em", color: "#F4EFE6" }}>
              Is your organisation<br />
              structurally built for<br />
              what <em style={{ fontStyle: "italic", color: "#C49A3C" }}>comes next?</em>
            </h2>
            <p className="reveal reveal-d1" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#6B6358", marginTop: "1.2rem", maxWidth: "42ch", lineHeight: 1.75, borderLeft: "2px solid rgba(196,154,60,.2)", paddingLeft: "1.2rem" }}>
              For founders and CHROs in 50–500 person organisations. For startups navigating Labour Code exposure. For companies where AI is compressing the workforce and the architecture has not kept up.
            </p>
          </div>

          {/* Right */}
          <div className="reveal reveal-d2 flex flex-col gap-4">
            <Link
              href="/engage"
              className="no-underline text-center transition-all duration-[180ms]"
              style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", background: "#C49A3C", color: "#0C0B09", padding: "16px 32px" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#D9AE52"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#C49A3C"; }}
            >
              Start an Engagement →
            </Link>
            <Link
              href="/ai-edge-lab"
              className="no-underline text-center transition-all duration-[180ms]"
              style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B6358", border: "1px solid rgba(196,154,60,.2)", padding: "16px 32px" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C49A3C"; e.currentTarget.style.color = "#C49A3C"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,154,60,.2)"; e.currentTarget.style.color = "#6B6358"; }}
            >
              Explore the AI Edge Lab →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "#141210", borderTop: "1px solid rgba(196,154,60,.2)", padding: "3rem 3.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          {/* Top: 5-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Col 1: Brand */}
            <div className="lg:col-span-1">
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C49A3C", marginBottom: "0.5rem" }}>Axion Index</div>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.8rem", color: "#6B6358", maxWidth: "26ch" }}>Codified energy for the evolving organisation.</p>
            </div>

            {/* Col 2: AI Edge Lab */}
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C49A3C", borderBottom: "1px solid rgba(196,154,60,.1)", paddingBottom: "0.5rem", marginBottom: "0.9rem" }}>AI Edge Lab</div>
              {[
                { label: "AI Replaceability Index", href: "/replaceability" },
                { label: "Brainpower Density Index", href: "/brainpower" },
                { label: "AI Aligned Index", href: "/ai-aligned" },
                { label: "Org Decision Architecture", href: "/org-design" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="block no-underline transition-colors duration-[150ms] hover:text-[#C49A3C]" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", color: "#6B6358", marginBottom: "0.55rem" }}>{link.label}</Link>
              ))}
            </div>

            {/* Col 3: Expertise */}
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C49A3C", borderBottom: "1px solid rgba(196,154,60,.1)", paddingBottom: "0.5rem", marginBottom: "0.9rem" }}>Expertise</div>
              {[
                { label: "Labour Codes", href: "/labour-codes" },
                { label: "Family Business HR", href: "/family-business" },
                { label: "Org Design", href: "/org-design" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="block no-underline transition-colors duration-[150ms] hover:text-[#C49A3C]" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", color: "#6B6358", marginBottom: "0.55rem" }}>{link.label}</Link>
              ))}
            </div>

            {/* Col 4: Ideas */}
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C49A3C", borderBottom: "1px solid rgba(196,154,60,.1)", paddingBottom: "0.5rem", marginBottom: "0.9rem" }}>Ideas</div>
              {[
                { label: "The Framework", href: "/framework" },
                { label: "Axion Lexicon", href: "/lexicon" },
                { label: "Writing", href: "/writing" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="block no-underline transition-colors duration-[150ms] hover:text-[#C49A3C]" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", color: "#6B6358", marginBottom: "0.55rem" }}>{link.label}</Link>
              ))}
            </div>

            {/* Col 5: Platform */}
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C49A3C", borderBottom: "1px solid rgba(196,154,60,.1)", paddingBottom: "0.5rem", marginBottom: "0.9rem" }}>Platform</div>
              {[
                { label: "About", href: "/about" },
                { label: "Engage", href: "/engage" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="block no-underline transition-colors duration-[150ms] hover:text-[#C49A3C]" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", color: "#6B6358", marginBottom: "0.55rem" }}>{link.label}</Link>
              ))}
              <a href="https://www.nitinnahata.com" target="_blank" rel="noopener noreferrer" className="block no-underline transition-colors duration-[150ms] hover:text-[#C49A3C]" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", color: "#6B6358", marginBottom: "0.55rem" }}>Nitin Nahata ↗</a>
              <a href="https://linkedin.com/in/nahatanitin" target="_blank" rel="noopener noreferrer" className="block no-underline transition-colors duration-[150ms] hover:text-[#C49A3C]" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", color: "#6B6358", marginBottom: "0.55rem" }}>LinkedIn ↗</a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(196,154,60,.1)", paddingTop: "1.5rem" }}>
            <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", color: "#6B6358" }}>
              axionindex.org · Bengaluru · 2026 · <a href="mailto:nitin@axionindex.org" className="no-underline hover:text-[#C49A3C]" style={{ color: "#6B6358" }}>nitin@axionindex.org</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com/in/nahatanitin" target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-[150ms] hover:text-[#C49A3C]" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", color: "#6B6358" }}>LinkedIn ↗</a>
              <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.88rem", color: "#6B6358" }}>
                Intellectual foundation: <a href="https://www.nitinnahata.com" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-[#C49A3C]" style={{ color: "#6B6358", borderBottom: "1px solid rgba(196,154,60,.1)" }}>Nitin Nahata →</a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ═══ CAROUSEL COMPONENT ═══
function CarouselSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = [
    { world: "ink", pre: "The Operating Question", headline: "Is your organisation structurally built for what", em: "comes next?", body: "Most organisations have a strategy. Almost none have the operating architecture to carry it. Axion Index makes the gap visible.", cta: "Begin the Engagement →", href: "/engage" },
    { world: "grey", pre: "For Individuals", headline: "Where does your role sit on the", em: "Compression-Judgment Field?", body: "The AI Replaceability Index maps your work against what AI already does — returns an Edge Score of how defensible your role is.", cta: "Take the Index →", href: "/replaceability", cta2: "Explore the Lab →", href2: "/ai-edge-lab" },
    { world: "ink", pre: "For Senior Leaders", headline: "How much of your time is in", em: "genuinely consequential work?", body: "The Brainpower Density Index measures what % of leadership time is in decisions that require you — vs work that should never have reached you.", cta: "Measure Your Impact →", href: "/brainpower" },
    { world: "grey", pre: "For Organisations", headline: "What is your organisation's true", em: "AI exposure?", body: "The Org Decision Architecture Index maps structural AI exposure across your entire organisation — produces a redesign roadmap with hard 12-month targets.", cta: "Begin the Engagement →", href: "/org-design" },
    { world: "paper", pre: "On Labour Codes", headline: "India's Labour Codes are not a compliance question.", em: "They are a mirror.", body: "They expose every structural decision an organisation deferred. Compliance failure is philosophy failure.", cta: "Explore →", href: "/labour-codes" },
    { world: "ink", pre: "On Family Business", headline: "The largest employer class in India has almost", em: "no frameworks designed for it.", body: "Loyalty vs merit. Patriarch authority. Multi-generational belief systems.", cta: "Explore →", href: "/family-business" },
    { world: "grey", pre: "The Foundation", headline: "Belief becomes conviction. Conviction becomes", em: "rhythm.", body: "Every Axion Index engagement traces back to one governing logic. Where has your organisation broken down in this sequence?", cta: "Explore the Framework →", href: "/framework" },
  ];

  const getWorldStyles = (world: string) => {
    if (world === "paper") {
      return { bg: "#EDE9E0", headline: "#0C0B09", em: "#8C3B28", body: "#4A433C", border: "#8C3B28", ctaBg: "#8C3B28", ctaText: "#FFFFFF" };
    }
    if (world === "grey") {
      return { bg: "#2C2824", headline: "#F4EFE6", em: "#C49A3C", body: "#B0A898", border: "#C49A3C", ctaBg: "#C49A3C", ctaText: "#0C0B09" };
    }
    return { bg: "#0C0B09", headline: "#F4EFE6", em: "#C49A3C", body: "#B0A898", border: "#C49A3C", ctaBg: "#C49A3C", ctaText: "#0C0B09" };
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    resetAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, []);

  const goTo = (i: number) => { setActiveSlide(i); resetAutoPlay(); };
  const prev = () => { setActiveSlide((p) => (p - 1 + slides.length) % slides.length); resetAutoPlay(); };
  const next = () => { setActiveSlide((p) => (p + 1) % slides.length); resetAutoPlay(); };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStart;
    if (dx > 40) prev();
    else if (dx < -40) next();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const currentStyles = getWorldStyles(slides[activeSlide].world);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "92vh", borderBottom: "1px solid rgba(196,154,60,.2)", background: currentStyles.bg, transition: "background 1s ease" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, i) => {
        const styles = getWorldStyles(slide.world);
        return (
          <div
            key={i}
            className="absolute inset-0 flex items-center transition-opacity duration-500"
            style={{ padding: "0 3.5rem", opacity: activeSlide === i ? 1 : 0, pointerEvents: activeSlide === i ? "auto" : "none" }}
          >
            <div style={{ maxWidth: "640px" }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px" style={{ width: "2rem", background: styles.em }} />
                <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: styles.em }}>{slide.pre}</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 0.95, color: styles.headline, marginBottom: "1.5rem" }}>
                {slide.headline} <em style={{ fontStyle: "italic", color: styles.em }}>{slide.em}</em>
              </h2>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.96rem", color: styles.body, borderLeft: `2px solid ${styles.border}`, paddingLeft: "1.2rem", maxWidth: "52ch", lineHeight: 1.7, marginBottom: "2rem" }}>{slide.body}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={slide.href}
                  className="no-underline transition-all duration-[180ms]"
                  style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", background: styles.ctaBg, color: styles.ctaText, padding: "14px 28px" }}
                >
                  {slide.cta}
                </Link>
                {slide.cta2 && (
                  <Link
                    href={slide.href2 || "#"}
                    className="no-underline transition-all duration-[180ms]"
                    style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: styles.body, border: `1px solid ${styles.border}`, padding: "14px 28px", opacity: 0.7 }}
                  >
                    {slide.cta2}
                  </Link>
                )}
              </div>
            </div>
            <div className="absolute" style={{ right: "3.5rem", bottom: "3rem", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "6rem", fontWeight: 700, color: "rgba(196,154,60,.06)" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button onClick={prev} className="flex items-center justify-center transition-colors duration-[150ms] cursor-pointer" style={{ width: "36px", height: "36px", border: "1px solid rgba(196,154,60,.2)", background: "rgba(12,11,9,.5)", color: "#C49A3C" }} aria-label="Previous">
          <span style={{ fontSize: "1rem" }}>←</span>
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="h-[2px] transition-all duration-[200ms] cursor-pointer border-none" style={{ width: activeSlide === i ? "32px" : "20px", background: activeSlide === i ? "#C49A3C" : "rgba(196,154,60,.2)" }} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
        <button onClick={next} className="flex items-center justify-center transition-colors duration-[150ms] cursor-pointer" style={{ width: "36px", height: "36px", border: "1px solid rgba(196,154,60,.2)", background: "rgba(12,11,9,.5)", color: "#C49A3C" }} aria-label="Next">
          <span style={{ fontSize: "1rem" }}>→</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px]" style={{ width: `${((activeSlide + 1) / slides.length) * 100}%`, background: "#C49A3C", opacity: 0.5, transition: "width 0.5s ease" }} />
    </div>
  );
}

// ═══ AXION FIELD COMPONENT ═══
function AxionFieldSection() {
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  const dots = [
    { role: "Operating Architect", tier: "hi", left: 18, top: 12, score: 96 },
    { role: "Founder / CEO", tier: "hi", left: 24, top: 20, score: 91 },
    { role: "Board Member", tier: "hi", left: 16, top: 30, score: 88 },
    { role: "CHRO", tier: "mid", left: 34, top: 38, score: 74 },
    { role: "CFO", tier: "mid", left: 40, top: 46, score: 68 },
    { role: "Engineer", tier: "lo", left: 62, top: 62, score: 45 },
    { role: "Data Analyst", tier: "lo", left: 72, top: 72, score: 38 },
    { role: "Payroll Executive", tier: "lo", left: 82, top: 80, score: 18 },
  ];

  const getDotColor = (tier: string) => {
    if (tier === "hi") return "#C49A3C";
    if (tier === "mid") return "rgba(196,154,60,.5)";
    return "#6B6358";
  };

  const legend = [
    { name: "Structural Architect", desc: "Designs systems. AI cannot replace systemic judgment." },
    { name: "Strategic Leverager", desc: "Uses AI to amplify judgment. Stays above compression." },
    { name: "Boundary Builder", desc: "Manages AI-human interface. Role evolving rapidly." },
    { name: "Output Manager", desc: "Manages AI outputs. Partial compression exposure." },
    { name: "Execution Operator", desc: "High compression risk. Redesign required now." },
  ];

  return (
    <section style={{ background: "#2C2824", padding: "6rem 3.5rem" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,154,60,.6)", marginBottom: "1rem" }}>
          The Compression-Judgment Field
        </div>
        <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "0.8rem" }}>
          Every role has an <em style={{ fontStyle: "italic", color: "#C49A3C" }}>address.</em>
        </h2>
        <p className="reveal reveal-d2" style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#6B6358", marginBottom: "3rem", maxWidth: "64ch" }}>
          The CJF plots two forces: AI compression and judgment ownership. Where you sit determines what you must do next.
        </p>

        <div className="reveal reveal-d3 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Field */}
          <div className="relative" style={{ aspectRatio: "1/1", border: "1px solid rgba(196,154,60,.2)", background: "rgba(196,154,60,.03)" }}>
            {/* Axis labels */}
            <div className="absolute hidden lg:block" style={{ bottom: "1rem", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6358" }}>AI Compression →</div>
            <div className="absolute hidden lg:block" style={{ left: "1rem", top: "50%", transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6358" }}>← Human Judgment</div>

            {/* Quadrant labels */}
            <div className="absolute" style={{ top: "1rem", right: "1rem", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C49A3C" }}>Judgment Work</div>
            <div className="absolute" style={{ top: "1rem", left: "1rem", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6358" }}>Insight Work</div>
            <div className="absolute" style={{ bottom: "1rem", left: "1rem", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6358" }}>Automated Work</div>
            <div className="absolute" style={{ bottom: "1rem", right: "1rem", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6358" }}>Execution Work</div>

            {/* Zone labels */}
            <div className="absolute hidden lg:block" style={{ right: 0, top: "30%", transform: "translateX(50%)", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C49A3C", border: "1px solid rgba(196,154,60,.2)", background: "#2C2824", padding: "4px 8px" }}>Defensible ↑</div>
            <div className="absolute hidden lg:block" style={{ left: 0, bottom: "30%", transform: "translateX(-50%)", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8C3B28", border: "1px solid rgba(140,59,40,.25)", background: "#2C2824", padding: "4px 8px" }}>↑ Compressible</div>

            {/* Dots */}
            {dots.map((dot) => (
              <div
                key={dot.role}
                className="absolute cursor-pointer transition-transform duration-[150ms]"
                style={{ left: `${dot.left}%`, top: `${dot.top}%`, transform: hoveredDot === dot.role ? "scale(1.6)" : "scale(1)" }}
                onMouseEnter={() => setHoveredDot(dot.role)}
                onMouseLeave={() => setHoveredDot(null)}
              >
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: getDotColor(dot.tier) }} />
                {hoveredDot === dot.role && (
                  <div className="absolute z-10" style={{ bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "rgba(13,12,10,.97)", border: "1px solid rgba(196,154,60,.2)", padding: "0.6rem 0.9rem", whiteSpace: "nowrap" }}>
                    <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", color: "#F4EFE6", marginBottom: "0.2rem" }}>{dot.role}</div>
                    <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", color: "#C49A3C" }}>Edge Score: {dot.score}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Text + Legend */}
          <div>
            <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "#B0A898", lineHeight: 1.7, marginBottom: "1rem" }}>
              The Compression-Judgment Field is Axion Index&apos;s proprietary model for mapping the impact of AI on work. Every role occupies a position in the field — determined by two forces.
            </p>
            <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "#B0A898", lineHeight: 1.7, marginBottom: "2rem" }}>
              Roles high on judgment ownership are defensible. Roles high on AI compression are exposed. The AI Replaceability Index returns an Edge Score that locates your role precisely.
            </p>

            {/* Legend Table */}
            <div style={{ width: "100%" }}>
              <div className="flex" style={{ borderBottom: "1px solid rgba(196,154,60,.2)", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>
                <div style={{ flex: "0 0 140px", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6358" }}>Tier</div>
                <div style={{ flex: 1, fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6358" }}>Description</div>
              </div>
              {legend.map((row) => (
                <div key={row.name} className="flex" style={{ borderBottom: "1px solid rgba(196,154,60,.1)", padding: "0.6rem 0" }}>
                  <div style={{ flex: "0 0 140px", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.6rem", color: "#C49A3C" }}>{row.name}</div>
                  <div style={{ flex: 1, fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.78rem", color: "#6B6358" }}>{row.desc}</div>
                </div>
              ))}
            </div>

            <a
              href="https://www.axionindex.org/ai-edge-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block no-underline mt-6 transition-all duration-[180ms]"
              style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B0A898", border: "1px solid rgba(196,154,60,.2)", padding: "12px 24px" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C49A3C"; e.currentTarget.style.color = "#C49A3C"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,154,60,.2)"; e.currentTarget.style.color = "#B0A898"; }}
            >
              Locate your role — Try Quick Mirror →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══ BRAINPOWER DENSITY COMPONENT ═══
function BrainpowerDensitySection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Low Density", "Mid Density", "High Density"];
  const data = [
    { bars: [15, 10, 35, 25, 15], insight: "Low Density Leader", desc: "Less than 25% in judgment-led work. Execution, coordination and reporting dominate. Decision latency is high. Strategic output is compressed." },
    { bars: [35, 20, 25, 12, 8], insight: "Mid Density Leader", desc: "Around 55% in judgment and strategic work. Redesign opportunity exists — 10% reallocation produces disproportionate output gain." },
    { bars: [60, 22, 10, 5, 3], insight: "High Density Leader", desc: "Over 80% in judgment-led work. Operating architecture is working. Decision latency is low." },
  ];
  const labels = ["Judgment work", "Strategic input", "Coordination", "Execution", "Reporting/admin"];
  
  // Dynamic color based on category and value
  // For positive metrics (Judgment, Strategic): higher is better (green)
  // For negative metrics (Coordination, Execution, Reporting): lower is better (green)
  const getBarColor = (value: number, categoryIndex: number) => {
    // Judgment work: >50% green, 30-50% gold, <30% rust
    if (categoryIndex === 0) {
      if (value >= 50) return "#5BAD7A";
      if (value >= 30) return "#C49A3C";
      return "#8C3B28";
    }
    // Strategic input: >18% green, 12-18% gold, <12% rust
    if (categoryIndex === 1) {
      if (value >= 18) return "#5BAD7A";
      if (value >= 12) return "#C49A3C";
      return "#8C3B28";
    }
    // Coordination: <15% green, 15-25% gold, >25% rust (inverse)
    if (categoryIndex === 2) {
      if (value <= 15) return "#5BAD7A";
      if (value <= 25) return "#C49A3C";
      return "#8C3B28";
    }
    // Execution: <10% green, 10-20% gold, >20% rust (inverse)
    if (categoryIndex === 3) {
      if (value <= 10) return "#5BAD7A";
      if (value <= 20) return "#C49A3C";
      return "#8C3B28";
    }
    // Reporting/admin: <8% green, 8-12% gold, >12% rust (inverse)
    if (categoryIndex === 4) {
      if (value <= 8) return "#5BAD7A";
      if (value <= 12) return "#C49A3C";
      return "#8C3B28";
    }
    return "#C49A3C";
  };

  return (
    <section style={{ background: "#141210", padding: "6rem 3.5rem" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal" style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(196,154,60,.6)", marginBottom: "1rem" }}>
          Brainpower Density Index
        </div>
        <h2 className="reveal reveal-d1" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#F4EFE6", marginBottom: "3rem" }}>
          What percentage of your week is <em style={{ fontStyle: "italic", color: "#C49A3C" }}>genuinely consequential?</em>
        </h2>

        <div className="reveal reveal-d2 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Tabs + Insight */}
          <div>
            <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#B0A898", lineHeight: 1.7, marginBottom: "1rem" }}>
              Most senior leaders spend less than 30% of their time in work that actually requires them. The rest is coordination, execution, and administration that should never reach their desk.
            </p>
            <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#B0A898", lineHeight: 1.7, marginBottom: "2rem" }}>
              The Brainpower Density Index measures this distribution and returns a redesign roadmap.
            </p>

            {/* Tab selector */}
            <div className="flex" style={{ border: "1px solid rgba(196,154,60,.2)", marginBottom: "1.5rem" }}>
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className="flex-1 text-center cursor-pointer transition-colors duration-[150ms]"
                  style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.6rem 1.2rem",
                    borderRight: i < 2 ? "1px solid rgba(196,154,60,.2)" : "none",
                    background: activeTab === i ? "rgba(196,154,60,.1)" : "transparent",
                    color: activeTab === i ? "#C49A3C" : "#6B6358",
                    border: "none",
                    borderBottom: "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Insight box */}
            <div style={{ padding: "1rem 1.3rem", border: "1px solid rgba(196,154,60,.2)", background: "rgba(196,154,60,.04)" }}>
              <p style={{ fontFamily: "var(--font-instrument), 'Instrument Sans', sans-serif", fontSize: "0.82rem", color: "#B0A898", lineHeight: 1.6 }}>
                <strong style={{ color: "#C49A3C" }}>{data[activeTab].insight}</strong> — {data[activeTab].desc}
              </p>
            </div>
          </div>

          {/* Right: Bar Chart */}
          <div style={{ border: "1px solid rgba(196,154,60,.2)", padding: "1.5rem", background: "rgba(196,154,60,.02)" }}>
            {labels.map((label, i) => (
              <div key={label} className="flex items-center gap-3 mb-4">
                <div style={{ minWidth: "120px", textAlign: "right", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.55rem", color: "#6B6358" }}>{label}</div>
                <div className="flex-1" style={{ height: "8px", background: "rgba(196,154,60,.1)" }}>
                  <div style={{ height: "100%", width: `${data[activeTab].bars[i]}%`, background: getBarColor(data[activeTab].bars[i], i), transition: "width 0.5s ease" }} />
                </div>
                <div style={{ minWidth: "32px", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "0.54rem", color: "#6B6358" }}>{data[activeTab].bars[i]}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
