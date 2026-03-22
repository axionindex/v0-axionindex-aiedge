"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AxionIndexSite() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Scroll reveal for statement parts
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-3");
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal-item").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white antialiased overflow-x-hidden" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      {/* Fixed background glow */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse 60% 50% at top center, rgba(198,168,110,0.10), transparent 60%), radial-gradient(ellipse 40% 40% at 78% 18%, rgba(255,255,255,0.04), transparent 50%)" }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 h-[68px] z-[1000] border-b border-white/10" style={{ background: "rgba(10,10,10,0.82)", backdropFilter: "blur(20px)", boxShadow: scrolled ? "0 1px 40px rgba(0,0,0,0.5)" : "none" }}>
        <div className="max-w-[1360px] mx-auto h-full px-10 flex items-center gap-8">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0 mr-auto no-underline">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-[#C6A86E] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>Axion Index</div>
            <div className="text-[0.85rem] text-white/65 mt-[0.18rem] italic">Codified energy for your success</div>
          </a>

          {/* Nav Links - Desktop */}
          <ul className="hidden xl:flex items-center list-none gap-0">
            {/* The System */}
            <li className="relative h-[68px] flex items-center group">
              <button className="text-[0.85rem] text-white/65 bg-transparent border-none cursor-pointer px-[1.1rem] h-full flex items-center gap-[0.35rem] transition-colors hover:text-white whitespace-nowrap">
                The System
                <svg className="w-[6px] h-[6px] opacity-45 transition-transform group-hover:rotate-180 group-hover:opacity-90" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 min-w-[220px] rounded-[0.8rem] p-[0.4rem_0] opacity-0 invisible pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-[6px] z-[200]" style={{ background: "rgba(16,15,14,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="px-[1.1rem] py-[0.3rem] text-[0.52rem] tracking-[0.18em] uppercase text-white/40" style={{ fontFamily: "'DM Mono', monospace" }}>The Institution</div>
                <a href="#why" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Why Axion. Why Index.</a>
                <a href="#why-exists" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Why We Exist</a>
                <a href="#different" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Why We&rsquo;re Different</a>
                <div className="h-px bg-white/10 mx-[0.8rem] my-[0.3rem]" />
                <div className="px-[1.1rem] py-[0.3rem] text-[0.52rem] tracking-[0.18em] uppercase text-white/40" style={{ fontFamily: "'DM Mono', monospace" }}>Architecture</div>
                <a href="#architecture" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Three-Layer Architecture</a>
                <a href="#founder" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Founder — Nitin Nahata</a>
              </div>
            </li>

            {/* Framework */}
            <li className="relative h-[68px] flex items-center group">
              <button className="text-[0.85rem] text-white/65 bg-transparent border-none cursor-pointer px-[1.1rem] h-full flex items-center gap-[0.35rem] transition-colors hover:text-white whitespace-nowrap">
                Framework
                <svg className="w-[6px] h-[6px] opacity-45 transition-transform group-hover:rotate-180 group-hover:opacity-90" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 min-w-[220px] rounded-[0.8rem] p-[0.4rem_0] opacity-0 invisible pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-[6px] z-[200]" style={{ background: "rgba(16,15,14,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <a href="#framework" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Belief → Conviction → Rhythm</a>
                <a href="#approach" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">The Indices</a>
                <a href="#compression" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Work Compression Model</a>
              </div>
            </li>

            {/* Work */}
            <li className="relative h-[68px] flex items-center group">
              <button className="text-[0.85rem] text-white/65 bg-transparent border-none cursor-pointer px-[1.1rem] h-full flex items-center gap-[0.35rem] transition-colors hover:text-white whitespace-nowrap">
                Work
                <svg className="w-[6px] h-[6px] opacity-45 transition-transform group-hover:rotate-180 group-hover:opacity-90" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 min-w-[220px] rounded-[0.8rem] p-[0.4rem_0] opacity-0 invisible pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-[6px] z-[200]" style={{ background: "rgba(16,15,14,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="px-[1.1rem] py-[0.3rem] text-[0.52rem] tracking-[0.18em] uppercase text-white/40" style={{ fontFamily: "'DM Mono', monospace" }}>What We Do</div>
                <a href="#what-we-do" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Diagnose Risk</a>
                <a href="#what-we-do" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Redesign Work</a>
                <a href="#what-we-do" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Translate Regulation</a>
                <a href="#what-we-do" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Prepare for AI</a>
                <div className="h-px bg-white/10 mx-[0.8rem] my-[0.3rem]" />
                <div className="px-[1.1rem] py-[0.3rem] text-[0.52rem] tracking-[0.18em] uppercase text-white/40" style={{ fontFamily: "'DM Mono', monospace" }}>Domains</div>
                <a href="#domains" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Core Domains</a>
                <a href="#domains" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Extended Domains</a>
              </div>
            </li>

            {/* Insights */}
            <li className="relative h-[68px] flex items-center group">
              <button className="text-[0.85rem] text-white/65 bg-transparent border-none cursor-pointer px-[1.1rem] h-full flex items-center gap-[0.35rem] transition-colors hover:text-white whitespace-nowrap">
                Insights
                <svg className="w-[6px] h-[6px] opacity-45 transition-transform group-hover:rotate-180 group-hover:opacity-90" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 min-w-[220px] rounded-[0.8rem] p-[0.4rem_0] opacity-0 invisible pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-[6px] z-[200]" style={{ background: "rgba(16,15,14,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <a href="#who" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Who We Work With</a>
                <a href="#proof" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">What We Help Make Visible</a>
              </div>
            </li>

            {/* THE AI EDGE LAB - with pulsing green dot and dropdown */}
            <li className="relative h-[68px] flex items-center group">
              <Link
                href="https://www.axionindex.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[0.85rem] text-[#C6A86E] no-underline px-[0.9rem] py-[0.45rem] rounded-full transition-all flex-shrink-0 whitespace-nowrap hover:text-[#DFC090] hover:bg-[rgba(198,168,110,0.08)]"
                style={{ border: "1px solid rgba(198,168,110,0.3)" }}
              >
                <span className="w-[5px] h-[5px] rounded-full bg-[#5BAD7A] animate-pulse" />
                The AI Edge Lab
                <svg className="w-[7px] h-[7px] opacity-50 ml-[0.2rem]" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 min-w-[280px] rounded-[0.8rem] p-[0.4rem_0] opacity-0 invisible pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-[6px] z-[200]" style={{ background: "rgba(16,15,14,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)", borderTop: "2px solid #C6A86E" }}>
                <div className="px-[1.1rem] py-[0.3rem] text-[0.52rem] tracking-[0.18em] uppercase text-white/40" style={{ fontFamily: "'DM Mono', monospace" }}>Live Assessments</div>
                <a href="https://www.axionindex.org/quick-mirror" target="_blank" rel="noreferrer" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">
                  Quick Mirror — Free, 5 min
                  <span className="text-[0.5rem] px-[6px] py-[1px] rounded-[3px] flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace", background: "rgba(91,173,122,0.15)", color: "#5BAD7A", border: "1px solid rgba(91,173,122,0.3)" }}>Live</span>
                </a>
                <a href="https://www.axionindex.org/full-diagnostic" target="_blank" rel="noreferrer" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">
                  Full Diagnostic — PDF Report
                  <span className="text-[0.5rem] px-[6px] py-[1px] rounded-[3px] flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace", background: "rgba(91,173,122,0.15)", color: "#5BAD7A", border: "1px solid rgba(91,173,122,0.3)" }}>Live</span>
                </a>
                <a href="https://www.axionindex.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">
                  3i Labour Code Readiness Index™
                  <span className="text-[0.5rem] px-[6px] py-[1px] rounded-[3px] flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace", background: "rgba(91,173,122,0.15)", color: "#5BAD7A", border: "1px solid rgba(91,173,122,0.3)" }}>Live</span>
                </a>
                <div className="h-px bg-white/10 mx-[0.8rem] my-[0.3rem]" />
                <div className="px-[1.1rem] py-[0.3rem] text-[0.52rem] tracking-[0.18em] uppercase text-white/40" style={{ fontFamily: "'DM Mono', monospace" }}>Doctrine &amp; Framework</div>
                <a href="https://www.axionindex.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">E.D.G.E. Framework</a>
                <a href="https://www.axionindex.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Brainpower Density Curve™</a>
                <a href="https://www.axionindex.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Ownership Ladders</a>
                <div className="h-px bg-white/10 mx-[0.8rem] my-[0.3rem]" />
                <a href="https://www.axionindex.org/AI-Edge-Doctrine-2026.pdf" target="_blank" rel="noreferrer" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">The Doctrine — PDF ↓</a>
                <a href="https://www.axionindex.org/sample-report" target="_blank" rel="noreferrer" className="flex items-center justify-between px-[1.1rem] py-[0.5rem] text-[0.82rem] text-white/65 no-underline rounded-[0.4rem] mx-[0.3rem] transition-all hover:text-white hover:bg-white/10">Sample Diagnostic Report ↗</a>
              </div>
            </li>
          </ul>

          {/* CTA Button */}
          <a href="#cta" className="text-[0.85rem] font-medium text-[#0A0A0A] bg-[#C6A86E] px-[1.3rem] py-[0.55rem] rounded-full no-underline transition-all flex-shrink-0 ml-2 hover:bg-[#DFC090] hover:scale-[1.02]">Speak With Us</a>

          {/* Hamburger */}
          <div className="xl:hidden flex flex-col gap-[5px] cursor-pointer p-[0.4rem] ml-auto" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            <span className={`block w-[22px] h-[1.5px] bg-white transition-all ${mobileNavOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block w-[22px] h-[1.5px] bg-white transition-all ${mobileNavOpen ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-[1.5px] bg-white transition-all ${mobileNavOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`${mobileNavOpen ? "block" : "hidden"} fixed top-[68px] left-0 right-0 bottom-0 z-[999] p-8 overflow-y-auto`} style={{ background: "rgba(10,10,10,0.99)" }}>
        <div className="mb-8">
          <div className="text-[0.58rem] tracking-[0.2em] uppercase text-[#C6A86E] mb-[0.6rem] pb-[0.4rem] border-b border-white/10" style={{ fontFamily: "'DM Mono', monospace" }}>Axion Index</div>
          <a href="#why" onClick={() => setMobileNavOpen(false)} className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">Why Axion. Why Index.</a>
          <a href="#what-we-do" onClick={() => setMobileNavOpen(false)} className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">What We Do</a>
          <a href="#framework" onClick={() => setMobileNavOpen(false)} className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">Framework</a>
          <a href="#domains" onClick={() => setMobileNavOpen(false)} className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">Domains</a>
          <a href="#founder" onClick={() => setMobileNavOpen(false)} className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">Founder</a>
        </div>
        <div className="mb-8">
          <div className="text-[0.58rem] tracking-[0.2em] uppercase text-[#C6A86E] mb-[0.6rem] pb-[0.4rem] border-b border-white/10" style={{ fontFamily: "'DM Mono', monospace" }}>The AI Edge Lab</div>
          <a href="https://www.axionindex.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">Open AI Edge Lab ↗</a>
          <a href="https://www.axionindex.org/quick-mirror" target="_blank" rel="noreferrer" className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">Quick Mirror — Free ↗</a>
          <a href="https://www.axionindex.org/full-diagnostic" target="_blank" rel="noreferrer" className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">Full Diagnostic ↗</a>
          <a href="https://www.axionindex.org/AI-Edge-Doctrine-2026.pdf" target="_blank" rel="noreferrer" className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">The Doctrine ↓</a>
        </div>
        <div className="mb-8">
          <div className="text-[0.58rem] tracking-[0.2em] uppercase text-[#C6A86E] mb-[0.6rem] pb-[0.4rem] border-b border-white/10" style={{ fontFamily: "'DM Mono', monospace" }}>Contact</div>
          <a href="#cta" onClick={() => setMobileNavOpen(false)} className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">Speak With Us</a>
          <a href="mailto:nitin@axionindex.org" className="flex items-center justify-between py-[0.6rem] text-[0.95rem] text-white/65 no-underline border-b border-white/[0.06] hover:text-white">nitin@axionindex.org</a>
        </div>
      </div>

      {/* HERO */}
      <section id="home" className="min-h-screen relative z-[1]" style={{ padding: "calc(68px + 5rem) 2.5rem 5rem" }}>
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
          <div>
            <div className="text-[0.62rem] tracking-[0.28em] uppercase text-white/40 mb-6 animate-[fadeup_0.8s_0.1s_forwards] opacity-0" style={{ fontFamily: "'DM Mono', monospace" }}>Operating intelligence for the future of work</div>
            <h1 className="text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.93] tracking-[-0.04em] mb-8 animate-[fadeup_0.9s_0.25s_forwards] opacity-0">
              Your organisation is<br />already breaking.<br />
              <span className="text-[#C6A86E]">You just haven&rsquo;t seen<br />where.</span>
            </h1>
            <div className="max-w-[52ch] animate-[fadeup_0.9s_0.4s_forwards] opacity-0">
              <p className="text-base text-white/65 leading-[1.8] mb-[0.8rem]">Most organisations don&rsquo;t fail because of bad strategy. They fail because the system underneath cannot carry the strategy.</p>
              <p className="text-base text-white/65 leading-[1.8]">Axion Index helps organisations <strong className="text-white">diagnose, design, and control</strong> the forces that actually determine whether they scale — or break.</p>
            </div>
            <div className="flex gap-4 flex-wrap mt-10 animate-[fadeup_0.9s_0.55s_forwards] opacity-0">
              <a href="#what-we-do" className="text-[0.9rem] font-medium text-[#0A0A0A] bg-[#C6A86E] px-[1.8rem] py-[0.75rem] rounded-full no-underline transition-all inline-block hover:bg-[#DFC090] hover:scale-[1.02]">Explore Our Work</a>
              <a href="#framework" className="text-[0.9rem] text-white/85 border border-white/18 px-[1.8rem] py-[0.75rem] rounded-full no-underline transition-all inline-block hover:border-white/40 hover:bg-white/10">Explore the Framework</a>
            </div>
            <a href="https://www.axionindex.org/" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[0.62rem] tracking-[0.12em] uppercase no-underline transition-colors animate-[fadeup_0.9s_0.7s_forwards] opacity-0 hover:text-[#C6A86E]" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.55)" }}>
              <span className="w-[5px] h-[5px] rounded-full bg-[#5BAD7A] animate-pulse" />
              The AI Edge Lab — diagnostics &amp; instruments →
            </a>
          </div>

          {/* Framework Panel */}
          <div className="hidden lg:block rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 animate-[fadeup_0.9s_0.3s_forwards] opacity-0">
            <div className="text-[0.58rem] tracking-[0.3em] uppercase text-white/40 mb-[1.2rem]" style={{ fontFamily: "'DM Mono', monospace" }}>Signature sequence</div>
            <div className="flex flex-col gap-[0.8rem]">
              {[
                { name: "Belief", num: "01", body: "Founder-led. Implicit. Fragile. Powerful — but unscalable if it lives in one person's head." },
                { name: "Conviction", num: "02", body: "Shared. Tested. Internalised. It now survives disagreement and moves without the founder in the room." },
                { name: "Rhythm", num: "03", body: "Repeatable. Predictable. System-led. Conviction becomes behaviour, governance, and operating cadence." },
              ].map((item, idx) => (
                <div key={item.name} className="bg-black/25 border border-white/10 rounded-[1.2rem] p-[1.3rem_1.4rem] transition-all hover:border-white/18 hover:bg-white/[0.04]">
                  <div className="flex items-center justify-between mb-[0.8rem]">
                    <div className="text-[1.5rem] font-medium tracking-[-0.03em]">{item.name}</div>
                    <div className="text-[0.62rem] tracking-[0.2em] text-[#C6A86E]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.num}</div>
                  </div>
                  <div className="text-[0.85rem] text-white/65 leading-[1.65] mb-[0.8rem]">{item.body}</div>
                  {idx < 2 && <div className="text-[#C6A86E] text-base">→</div>}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-[0.7rem] mt-[0.4rem]">
              <div className="bg-white/[0.02] border border-white/10 rounded-[1rem] p-[0.9rem_1rem]">
                <div className="text-[0.5rem] tracking-[0.2em] uppercase text-white/40 mb-[0.4rem]" style={{ fontFamily: "'DM Mono', monospace" }}>Failure mode</div>
                <div className="text-[0.88rem] text-white/65">Belief → Fragility</div>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-[1rem] p-[0.9rem_1rem]">
                <div className="text-[0.5rem] tracking-[0.2em] uppercase text-white/40 mb-[0.4rem]" style={{ fontFamily: "'DM Mono', monospace" }}>Failure mode</div>
                <div className="text-[0.88rem] text-white/65">Conviction → Bureaucracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TENSION STRIP */}
      <div className="border-t border-b border-white/10 py-[1.4rem] px-10" style={{ background: "rgba(0,0,0,0.35)" }}>
        <div className="text-center text-[0.62rem] tracking-[0.3em] uppercase text-white/42" style={{ fontFamily: "'DM Mono', monospace" }}>
          AI Compression &nbsp;•&nbsp; Regulatory Reset &nbsp;•&nbsp; Workforce Fragmentation
        </div>
      </div>

      {/* PROBLEM */}
      <section id="problem" className="py-24 px-10 relative z-[1] border-t border-white/10">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-[0.62rem] tracking-[0.28em] uppercase text-white/40 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>The problem</div>
          <h2 className="text-[clamp(2.2rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] mb-8">
            The system underneath work<br />is <span className="text-[#C6A86E]">breaking.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-12">
            {["Workforce models are fragmented", "Compliance is reactive", "Decision ownership is unclear", "AI is compressing entire layers of work"].map((text) => (
              <div key={text} className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-6">
                <div className="w-[38px] h-[38px] bg-white/[0.04] border border-white/10 rounded-[0.75rem] mb-8" />
                <div className="text-[1.1rem] tracking-[-0.03em] text-white/90 leading-[1.4]">{text}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-[55ch]">
            <p className="text-base text-white/65 leading-[1.8] mb-[1.2rem]">Yet organisations continue to operate as if nothing has changed. What looks like inefficiency is not inefficiency.</p>
            <p className="text-[1.2rem] font-medium tracking-[-0.03em] text-white mt-2">It is structural fragility.</p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="what-we-do" className="py-24 px-10 relative z-[1] border-t border-white/10">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-[0.62rem] tracking-[0.28em] uppercase text-white/40 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>What Axion Index does</div>
          <h2 className="text-[clamp(2.2rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] mb-8">
            We don&rsquo;t manage people.<br />We design the system they operate in.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-12">
            {[
              { title: "Diagnose Risk", body: "Reveal structural, compliance, and workforce risk before it surfaces as business failure." },
              { title: "Redesign Work", body: "Rebuild roles, accountability, and decision logic so scale does not produce silent fracture." },
              { title: "Translate Regulation", body: "Convert labour complexity into cost, control, and operating design decisions." },
              { title: "Prepare for AI", body: "Map what is compressing, what remains defensible, and where judgment becomes the scarce resource." },
            ].map((card) => (
              <div key={card.title} className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-6 transition-all hover:border-white/18 hover:bg-white/[0.05] hover:-translate-y-[2px]">
                <div className="w-[42px] h-[42px] bg-white/[0.04] border border-white/10 rounded-[0.9rem] mb-[1.2rem]" />
                <h3 className="text-[1.2rem] font-medium tracking-[-0.03em] mb-[0.8rem]">{card.title}</h3>
                <p className="text-[0.85rem] text-white/65 leading-[1.65]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AXION IDEA */}
      <section id="why" className="py-24 px-10 relative z-[1] border-t border-white/10">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-12">
            <div>
              <div className="text-[0.62rem] tracking-[0.28em] uppercase text-white/40 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>The Axion idea</div>
              <h2 className="text-[clamp(2.2rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                The forces that determine<br />outcomes are <span className="text-[#C6A86E]">invisible.</span>
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-base text-white/65 leading-[1.85]">In physics, an axion is a particle believed to hold matter together — invisible, but foundational.</p>
              <p className="text-base text-white/65 leading-[1.85]">Organisations are no different. They are held together by belief systems, operating rhythm, decision architecture, and human energy. These forces are rarely measured. They are felt — and usually discovered only when they break.</p>
              <p className="text-base text-white/65 leading-[1.85]"><strong className="text-white">Axion Index exists to codify them.</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE FRAMEWORK VISUAL */}
      <section id="framework" className="py-24 px-10 relative z-[1] border-t border-b border-white/10" style={{ background: "#0D0D0D" }}>
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center text-[0.58rem] tracking-[0.28em] uppercase mb-12" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.5)" }}>The Signature Framework · Axion Index</div>

          {/* BIG VISUAL LINE */}
          <div className="text-center text-[clamp(2.5rem,6vw,6rem)] font-medium tracking-[-0.04em] leading-none mb-6">
            <span className="text-white">BELIEF</span>
            <span className="mx-4" style={{ color: "rgba(198,168,110,0.4)" }}>→</span>
            <span className="text-white">CONVICTION</span>
            <span className="mx-4" style={{ color: "rgba(198,168,110,0.4)" }}>→</span>
            <span className="text-[#C6A86E]">RHYTHM</span>
          </div>
          <div className="text-center text-base tracking-[0.12em] mb-16" style={{ color: "rgba(255,255,255,0.35)" }}>Fragile &nbsp;→&nbsp; Shared &nbsp;→&nbsp; System</div>

          {/* NODE CARDS */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-0 mb-8">
            <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-[1.8rem_1.5rem]">
              <div className="text-[0.52rem] tracking-[0.22em] uppercase text-[#C6A86E] mb-[0.8rem]" style={{ fontFamily: "'DM Mono', monospace" }}>Stage 01</div>
              <div className="text-[1.8rem] font-medium tracking-[-0.03em] mb-[0.8rem]">Belief</div>
              <div className="text-[0.85rem] text-white/50 leading-[1.6]">Founder-led. Implicit. Fragile. Powerful — but unscalable if it lives in one person&apos;s head.</div>
            </div>
            <div className="flex items-center justify-center px-[0.8rem] text-[1.5rem]" style={{ color: "rgba(198,168,110,0.35)" }}>→</div>
            <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-[1.8rem_1.5rem]">
              <div className="text-[0.52rem] tracking-[0.22em] uppercase text-[#C6A86E] mb-[0.8rem]" style={{ fontFamily: "'DM Mono', monospace" }}>Stage 02</div>
              <div className="text-[1.8rem] font-medium tracking-[-0.03em] mb-[0.8rem]">Conviction</div>
              <div className="text-[0.85rem] text-white/50 leading-[1.6]">Shared. Tested. Internalised. Survives disagreement and moves without the founder in the room.</div>
            </div>
            <div className="flex items-center justify-center px-[0.8rem] text-[1.5rem]" style={{ color: "rgba(198,168,110,0.35)" }}>→</div>
            <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-[1.8rem_1.5rem]">
              <div className="text-[0.52rem] tracking-[0.22em] uppercase text-[#C6A86E] mb-[0.8rem]" style={{ fontFamily: "'DM Mono', monospace" }}>Stage 03</div>
              <div className="text-[1.8rem] font-medium tracking-[-0.03em] mb-[0.8rem]">Rhythm</div>
              <div className="text-[0.85rem] text-white/50 leading-[1.6]">Repeatable. Predictable. System-led. Conviction becomes behaviour, governance, operating cadence.</div>
            </div>
            <div className="flex items-center justify-center px-[0.8rem] text-[1.5rem]" style={{ color: "rgba(140,59,40,0.5)" }}>→</div>
            <div className="rounded-[1.5rem] p-[1.8rem_1.5rem]" style={{ background: "rgba(140,59,40,0.08)", border: "1px solid rgba(140,59,40,0.25)" }}>
              <div className="text-[0.52rem] tracking-[0.22em] uppercase text-[#8C3B28] mb-[0.8rem]" style={{ fontFamily: "'DM Mono', monospace" }}>Failure Mode</div>
              <div className="text-[1.8rem] font-medium tracking-[-0.03em] mb-[0.8rem] text-[#8C3B28]">Fragility</div>
              <div className="text-[0.85rem] text-white/40 leading-[1.6]">Where most organisations quietly break — before anyone sees it coming.</div>
            </div>
          </div>

          {/* Mobile stacked version */}
          <div className="lg:hidden space-y-4 mb-8">
            {[
              { stage: "01", name: "Belief", body: "Founder-led. Implicit. Fragile. Powerful — but unscalable if it lives in one person's head." },
              { stage: "02", name: "Conviction", body: "Shared. Tested. Internalised. Survives disagreement and moves without the founder in the room." },
              { stage: "03", name: "Rhythm", body: "Repeatable. Predictable. System-led. Conviction becomes behaviour, governance, operating cadence." },
            ].map((item) => (
              <div key={item.name} className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-[1.8rem_1.5rem]">
                <div className="text-[0.52rem] tracking-[0.22em] uppercase text-[#C6A86E] mb-[0.8rem]" style={{ fontFamily: "'DM Mono', monospace" }}>Stage {item.stage}</div>
                <div className="text-[1.8rem] font-medium tracking-[-0.03em] mb-[0.8rem]">{item.name}</div>
                <div className="text-[0.85rem] text-white/50 leading-[1.6]">{item.body}</div>
              </div>
            ))}
          </div>

          {/* FAILURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/[0.025] border border-white/[0.08] rounded-[1.2rem] p-[1.2rem_1.5rem]">
              <div className="text-[0.5rem] tracking-[0.2em] uppercase text-white/35 mb-[0.4rem]" style={{ fontFamily: "'DM Mono', monospace" }}>Failure mode</div>
              <div className="text-base tracking-[-0.02em] text-white/80">Belief without conviction → Fragility</div>
            </div>
            <div className="bg-white/[0.025] border border-white/[0.08] rounded-[1.2rem] p-[1.2rem_1.5rem]">
              <div className="text-[0.5rem] tracking-[0.2em] uppercase text-white/35 mb-[0.4rem]" style={{ fontFamily: "'DM Mono', monospace" }}>Failure mode</div>
              <div className="text-base tracking-[-0.02em] text-white/80">Conviction without rhythm → Bureaucracy</div>
            </div>
          </div>

          <div className="text-center mt-10 pt-8 border-t border-white/[0.07] text-[1.05rem] italic text-white/45" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Every Axion Index engagement begins with one question: <span className="text-[#C6A86E] not-italic">where in this sequence has your organisation broken down?</span>
          </div>
        </div>
      </section>

      {/* PERSONAS */}
      <section id="who" className="py-24 px-10 relative z-[1] border-t border-white/10">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-[0.62rem] tracking-[0.28em] uppercase text-white/40 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>What this means for you</div>
          <h2 className="text-[clamp(2.2rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] mb-8">
            Different leaders.<br />Same underlying problem.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-12">
            {[
              { role: "Founder / CEO", body: "You sense something is breaking before you can name it. The belief that built the company has not yet become conviction that can survive your absence." },
              { role: "CFO", body: "Workforce is your largest cost and your least understood operating system. Labour codes, classification, and payroll architecture are cost decisions — not HR decisions." },
              { role: "CHRO", body: "You are expected to solve problems that are not really HR problems. Engagement surveys and culture decks are not people systems." },
              { role: "Board", body: "You have visibility into outcomes — not the system producing them. Decision latency and founder dependency curves are the real signals." },
            ].map((persona) => (
              <div key={persona.role} className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-6">
                <div className="text-[1.2rem] font-medium tracking-[-0.03em] mb-[0.8rem]">{persona.role}</div>
                <p className="text-[0.85rem] text-white/65 leading-[1.65]">{persona.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOMAINS */}
      <section id="domains" className="py-24 px-10 relative z-[1] border-t border-white/10" style={{ background: "#111010" }}>
        <div className="max-w-[1360px] mx-auto">
          <div className="text-[0.62rem] tracking-[0.28em] uppercase text-white/40 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Domains of work</div>
          <h2 className="text-[clamp(2.2rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] mb-8">Where we go deep.</h2>

          <div className="text-[0.58rem] tracking-[0.22em] uppercase mt-8 mb-[0.8rem]" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.7)" }}>Core Domains</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: "01", name: "Labour Code Readiness", body: "India's Labour Codes are mirrors exposing institutional design debt. Compliance as a people system, not a checkbox.", proof: "3i Labour Code Index™ — live" },
              { num: "02", name: "Workforce Architecture Diagnostics", body: "Maps how work is distributed and controlled — and where the model is breaking under growth or regulatory pressure.", proof: "Active across 6 founder-led organisations" },
              { num: "03", name: "AI & Work Redesign", body: "Which layers of work are compressing, which are defensible, and how to redesign roles before AI-led role collapse becomes a workforce event.", proof: "AI Edge Lab instruments — live" },
            ].map((domain) => (
              <div key={domain.num} className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-6 flex flex-col transition-all hover:border-white/18 hover:bg-white/[0.05]">
                <div className="text-[0.55rem] tracking-[0.22em] uppercase mb-[1.2rem]" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.45)" }}>Domain {domain.num}</div>
                <div className="text-[1.1rem] font-medium tracking-[-0.03em] mb-[0.6rem] leading-[1.25]">{domain.name}</div>
                <div className="text-[0.85rem] text-white/65 leading-[1.65] flex-1">{domain.body}</div>
                <div className="mt-4 pt-[0.8rem] border-t border-white/10 text-[0.54rem] tracking-[0.06em]" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.6)" }}>{domain.proof}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { num: "04", name: "Decision Ownership Models", body: "Where accountability truly sits — and where strategic ambiguity is creating execution risk at leadership level.", proof: "Led across Tata, Udaan, Gameskraft" },
              { num: "05", name: "Operating Architecture for Startups & Scaleups", body: "Designing people operating systems before structure hardens. Each stage from Seed to IPO has distinct operating physics.", proof: "Active across 6 organisations" },
              { num: "06", name: "Family Business HR", body: "Operating logic for organisations where loyalty, authority, and multi-generational belief intersect.", proof: "Deployed across 4 transitions" },
            ].map((domain) => (
              <div key={domain.num} className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-6 flex flex-col transition-all hover:border-white/18 hover:bg-white/[0.05]">
                <div className="text-[0.55rem] tracking-[0.22em] uppercase mb-[1.2rem]" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.45)" }}>Domain {domain.num}</div>
                <div className="text-[1.1rem] font-medium tracking-[-0.03em] mb-[0.6rem] leading-[1.25]">{domain.name}</div>
                <div className="text-[0.85rem] text-white/65 leading-[1.65] flex-1">{domain.body}</div>
                <div className="mt-4 pt-[0.8rem] border-t border-white/10 text-[0.54rem] tracking-[0.06em]" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.6)" }}>{domain.proof}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING + CONTRAST */}
      <section id="different" className="py-24 px-10 relative z-[1] border-t border-white/10">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-[0.62rem] tracking-[0.28em] uppercase text-white/40 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Positioning</div>
          <h2 className="text-[clamp(2.2rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] mb-8">
            We are not a consulting firm.<br />We are not a software company.
          </h2>
          <p className="text-base text-white/65 leading-[1.8] max-w-[60ch] mb-[1.2rem]">We are an operating intelligence layer. We diagnose before we recommend. We design before we implement. We translate before we optimise.</p>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 px-[1.3rem] py-[0.7rem] bg-white/[0.04] border-b border-white/10">
              <span className="text-[0.56rem] tracking-[0.16em] uppercase text-white/40" style={{ fontFamily: "'DM Mono', monospace" }}>The conventional world says…</span>
              <span className="text-[0.56rem] tracking-[0.16em] uppercase hidden md:block" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.7)" }}>Axion Index operates on the belief that…</span>
            </div>
            {[
              { left: "HR manages people", right: "HR architects systems.", desc: "People manage themselves when the system gives them the conditions to do so." },
              { left: "Culture is curated", right: "Culture emerges from operating logic.", desc: "HR's job is to design that logic, not curate mythology." },
              { left: "Compliance is legal, not strategic", right: "Labour codes are a philosophical mirror.", desc: "They expose what the organisation deferred." },
              { left: "Technology is the solution", right: "Technology is codified thinking.", desc: "HROS exists because the framework came first." },
              { left: "Engagement scores measure health", right: "Decision latency and founder dependency curves", desc: "are the real signals. We measure architecture." },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 bg-white/[0.02] border-b border-white/[0.06] last:border-b-0 transition-colors hover:bg-white/[0.04]">
                <div className="px-[1.3rem] py-4 text-[0.65rem] tracking-[0.08em] text-white/40 border-r-0 md:border-r border-white/[0.06]" style={{ fontFamily: "'DM Mono', monospace" }}>{row.left}</div>
                <div className="px-[1.3rem] py-4 text-[0.9rem] text-white/65"><strong className="text-[#C6A86E]">{row.right}</strong> {row.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI EDGE LAB STRIP */}
      <div id="aiedge" className="border-t border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-[1360px] mx-auto py-12 px-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-[0.62rem] tracking-[0.22em] uppercase text-[#C6A86E] mb-[0.7rem]" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span className="w-[5px] h-[5px] rounded-full bg-[#5BAD7A] animate-pulse" />
              The AI Edge Lab
            </div>
            <div className="text-[1.4rem] font-medium tracking-[-0.03em] text-white mb-[0.6rem]">Live diagnostics, frameworks, and instruments.</div>
            <div className="text-[0.9rem] text-white/65 max-w-[58ch] leading-[1.75]">
              Where the Axion Index frameworks run as active tools — <strong className="text-white">Quick Mirror</strong> (free, 5 min), <strong className="text-white">Full Diagnostic</strong> (paid, PDF), <strong className="text-white">3i Labour Code Index™</strong>, E.D.G.E. framework, Brainpower Density Curve™, Ownership Ladders, and more building.
            </div>
          </div>
          <div className="flex flex-col gap-[0.8rem] flex-shrink-0">
            <a href="https://www.axionindex.org/" target="_blank" rel="noreferrer" className="text-[0.65rem] tracking-[0.12em] uppercase text-[#0A0A0A] bg-[#C6A86E] px-6 py-[0.7rem] rounded-full no-underline text-center transition-colors hover:bg-[#DFC090]" style={{ fontFamily: "'DM Mono', monospace" }}>Enter the Lab →</a>
            <a href="https://www.axionindex.org/quick-mirror" target="_blank" rel="noreferrer" className="text-[0.6rem] tracking-[0.1em] uppercase text-white/40 no-underline text-center transition-colors hover:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>Quick Mirror — Free, 5 min ↗</a>
            <a href="https://www.axionindex.org/full-diagnostic" target="_blank" rel="noreferrer" className="text-[0.6rem] tracking-[0.1em] uppercase text-white/40 no-underline text-center transition-colors hover:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>Full Diagnostic ↗</a>
            <a href="https://www.axionindex.org/AI-Edge-Doctrine-2026.pdf" target="_blank" rel="noreferrer" className="text-[0.6rem] tracking-[0.1em] uppercase text-white/40 no-underline text-center transition-colors hover:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>The Doctrine — PDF ↓</a>
          </div>
        </div>
      </div>

      {/* ARCHITECTURE */}
      <section id="architecture" className="py-24 px-10 relative z-[1] border-t border-white/10" style={{ background: "#111010" }}>
        <div className="max-w-[1360px] mx-auto">
          <div className="text-[0.62rem] tracking-[0.28em] uppercase text-white/40 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>The architecture</div>
          <h2 className="text-[clamp(2.2rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] mb-8">Three layers. One system.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-12">
            {[
              { num: "Nitin Nahata — Source of Thinking", name: "Nitin Nahata", role: "The Practitioner-Philosopher", body: "22 years across Tata, Udaan, and Gameskraft. Credibility earned from inside the unfinished organisation. Author of Baptism by Chaos and the Operating Architect framework.", sub: "↓ The intellectual source", color: "#C6A86E" },
              { num: "Axion Index — Platform of Ideas", name: "Axion Index", role: "The Organisation & Intellectual Platform", body: "Publishing, research, and diagnostic body. Think tank, content platform, and toolkit — for founders, CHROs, boards, and operating architects.", sub: "↓ Where frameworks become reference systems", color: "#8C3B28" },
              { num: "HROS — System of Execution", name: "HROS", role: "The Technology Product", body: "Intelligent payroll as the wedge. A people operating system as the destination. The Operating Architect framework running as software — built for startups who cannot afford to wait.", sub: "↓ The framework as software · Coming soon", color: "#C6A86E" },
            ].map((arch) => (
              <div key={arch.name} className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-[2rem_1.8rem] relative overflow-hidden transition-colors hover:bg-white/[0.05]">
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: arch.color }} />
                <div className="text-[0.54rem] tracking-[0.18em] uppercase text-white/40 mb-[1.2rem]" style={{ fontFamily: "'DM Mono', monospace" }}>{arch.num}</div>
                <div className="text-[1.4rem] font-medium tracking-[-0.03em] mb-[0.3rem]">{arch.name}</div>
                <div className="text-[0.6rem] tracking-[0.08em] mb-[1.2rem] pb-4 border-b border-white/10" style={{ fontFamily: "'DM Mono', monospace", color: arch.color }}>{arch.role}</div>
                <div className="text-[0.85rem] text-white/65 leading-[1.75]">{arch.body}</div>
                <div className="mt-4 pt-[0.8rem] border-t border-white/[0.06] text-[0.54rem] tracking-[0.1em] uppercase" style={{ fontFamily: "'DM Mono', monospace", color: arch.color === "#C6A86E" ? "rgba(198,168,110,0.6)" : "rgba(140,59,40,0.7)" }}>{arch.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder" className="py-24 px-10 relative z-[1] border-t border-white/10">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-[0.62rem] tracking-[0.28em] uppercase text-white/40 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Built from inside the system</div>
          <div className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-medium tracking-[-0.04em] leading-[1.4] text-white border-l-[3px] border-[#C6A86E] pl-6 max-w-[55ch] mb-12">
            &ldquo;I work with founders at moments of inflection — when growth outpaces people systems and belief must be redesigned into rhythm before scale breaks what the company was built on.&rdquo;
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] p-8 text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-[2rem] font-medium" style={{ background: "linear-gradient(135deg, #C6A86E, #8C3B28)" }}>N</div>
              <div className="text-[1.3rem] font-medium tracking-[-0.03em] mb-[0.2rem]">Nitin Nahata</div>
              <div className="text-[0.56rem] tracking-[0.1em] uppercase mb-[0.8rem]" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.7)" }}>Founder, Axion Index</div>
              <div className="text-[0.56rem] tracking-[0.06em] text-white/40 leading-8" style={{ fontFamily: "'DM Mono', monospace" }}>
                Tata Group · Standard Chartered<br />Udaan · Gameskraft<br />22 Years · Operating Architect
              </div>
            </div>
            <div className="space-y-4 text-[0.95rem] text-white/65 leading-[1.85]">
              <p>Nitin Nahata is an HR and operating architect with 22 years across large enterprises, joint ventures, and high-growth startups — Tata Group, Standard Chartered, Udaan, and Gameskraft.</p>
              <p>His defining insight: most startup failures are not strategy failures. They are people system failures that happen silently. Belief fragments, conviction weakens, rhythm disappears — and by the time it shows up as attrition or culture issues, the damage is already structural.</p>
              <p>Most notably, he led Gameskraft through a 4AM regulatory notification that threatened to erase an industry overnight — designing the response, protecting the organisation&rsquo;s dignity, and rebuilding the operating architecture from the inside. <em className="text-white/90">That experience is the origin of everything Axion Index stands for.</em></p>
              <p>Author of <em>Baptism by Chaos</em> and creator of the Operating Architect framework. Building Axion Index as the intellectual platform that defines how organisations — not just HR departments — should think about the future of work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="text-center py-32 px-10 border-t border-white/10">
        <div className="flex items-center justify-center gap-4 text-[0.56rem] tracking-[0.24em] uppercase mb-12" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.55)" }}>
          <span className="w-8 h-px" style={{ background: "rgba(198,168,110,0.3)" }} />
          The Founding Statement
          <span className="w-8 h-px" style={{ background: "rgba(198,168,110,0.3)" }} />
        </div>
        <div className="max-w-[52ch] mx-auto">
          <div className="reveal-item text-[clamp(1.1rem,2vw,1.55rem)] leading-[1.65] text-white/65 py-4 transition-all duration-700 opacity-0 translate-y-3">HR&rsquo;s role is not to manage people or protect culture —</div>
          <div className="reveal-item text-[clamp(1.3rem,2.4vw,1.9rem)] leading-[1.65] text-white py-4 border-t border-b border-white/10 transition-all duration-700 opacity-0 translate-y-3">but to architect the operating system that aligns human energy with organisational rhythm,</div>
          <div className="reveal-item text-[clamp(1.1rem,2vw,1.55rem)] leading-[1.65] text-white/65 py-4 transition-all duration-700 opacity-0 translate-y-3">so belief becomes conviction, conviction becomes repeatable behaviour, and chaos evolves into sustainable performance.</div>
        </div>
        <div className="w-8 h-px mx-auto mt-8 mb-4" style={{ background: "rgba(198,168,110,0.3)" }} />
        <div className="text-[0.6rem] tracking-[0.18em] uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.55)" }}>Nitin Nahata, Founder · Axion Index</div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 px-10 border-t border-white/10">
        <div className="max-w-[1360px] mx-auto">
          <div className="bg-white/[0.04] border border-white/10 rounded-[1.8rem] p-[3rem_3.5rem] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end">
            <div>
              <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-medium tracking-[-0.04em] leading-[1.05]">
                The system is<br />already speaking.
              </h2>
              <p className="text-[1.15rem] text-white/50 mt-2 mb-[0.8rem] leading-[1.6] max-w-[38ch]">The question is whether you know how to read it.</p>
              <p className="text-[0.95rem] text-white/65 max-w-[40ch] leading-[1.8]">Most organisations are already carrying the signals. We help you see them — and act before the market forces it.</p>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-[1.4rem] p-[1.8rem]">
              <div className="text-[0.56rem] tracking-[0.22em] uppercase text-white/40 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Start the conversation</div>
              <div className="flex flex-col gap-[0.8rem] mb-8">
                <div className="text-base text-white/90">Strategy engagements</div>
                <div className="text-base text-white/90">Diagnostic reviews</div>
                <div className="text-base text-white/90">Speaking &amp; advisory</div>
              </div>
              <div className="flex flex-col gap-[0.7rem]">
                <a href="mailto:nitin@axionindex.org" className="text-[0.9rem] font-medium text-[#0A0A0A] bg-[#C6A86E] px-[1.8rem] py-[0.75rem] rounded-full no-underline text-center transition-all hover:bg-[#DFC090] hover:scale-[1.02]">nitin@axionindex.org</a>
                <a href="https://www.axionindex.org/quick-mirror" target="_blank" rel="noreferrer" className="text-[0.6rem] tracking-[0.1em] uppercase text-center no-underline transition-colors mt-[0.3rem] hover:text-[#C6A86E]" style={{ fontFamily: "'DM Mono', monospace", color: "rgba(198,168,110,0.6)" }}>Quick Mirror — Free, 5 min ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 px-10 relative z-[1]">
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <div className="text-[0.6rem] tracking-[0.18em] uppercase text-white/40" style={{ fontFamily: "'DM Mono', monospace" }}>Axion Index · axionindex.org · Bengaluru · 2026</div>
            <div className="text-[0.8rem] italic mt-1" style={{ color: "rgba(198,168,110,0.3)" }}>From ambiguity to architecture. From systems to operating intelligence.</div>
          </div>
          <nav className="flex gap-8 flex-wrap justify-center">
            <a href="#why" className="text-[0.58rem] tracking-[0.12em] uppercase text-white/40 no-underline transition-colors hover:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>About</a>
            <a href="#what-we-do" className="text-[0.58rem] tracking-[0.12em] uppercase text-white/40 no-underline transition-colors hover:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>What We Do</a>
            <a href="#framework" className="text-[0.58rem] tracking-[0.12em] uppercase text-white/40 no-underline transition-colors hover:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>Framework</a>
            <a href="https://www.axionindex.org/" target="_blank" rel="noreferrer" className="text-[0.58rem] tracking-[0.12em] uppercase text-white/40 no-underline transition-colors hover:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>AI Edge Lab ↗</a>
            <a href="#domains" className="text-[0.58rem] tracking-[0.12em] uppercase text-white/40 no-underline transition-colors hover:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>Domains</a>
            <a href="#founder" className="text-[0.58rem] tracking-[0.12em] uppercase text-white/40 no-underline transition-colors hover:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>Founder</a>
            <a href="#cta" className="text-[0.58rem] tracking-[0.12em] uppercase text-white/40 no-underline transition-colors hover:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>Contact</a>
          </nav>
          <div className="text-[0.54rem] tracking-[0.08em] text-white/40" style={{ fontFamily: "'DM Mono', monospace" }}>Nitin Nahata · Founder, Axion Index</div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeup {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
