"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export function Navigation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [doctrineOpen, setDoctrineOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-stone3 z-[60]">
        <div
          className="h-full bg-gold transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-[1px] left-0 right-0 h-[52px] bg-ink/90 backdrop-blur-md border-b border-rule2 z-50">
        <div className="max-w-7xl mx-auto h-full px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-display text-lg font-black tracking-tight">
              AI <span className="text-gold">EDGE</span> LAB
            </span>
            <span className="hidden sm:block font-label text-[9px] text-stone uppercase tracking-[0.2em]">
              Doctrine · 2026
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/#concepts"
              className="font-label text-[10px] text-cream2 uppercase tracking-[0.15em] hover:text-gold transition-colors"
            >
              Concepts
            </Link>
            <Link
              href="/#framework"
              className="font-label text-[10px] text-cream2 uppercase tracking-[0.15em] hover:text-gold transition-colors"
            >
              Framework
            </Link>

            {/* Doctrine Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDoctrineOpen(true)}
              onMouseLeave={() => setDoctrineOpen(false)}
            >
              <button className="flex items-center gap-1 font-label text-[10px] text-cream2 uppercase tracking-[0.15em] hover:text-gold transition-colors">
                Doctrine
                <ChevronDown className="w-3 h-3" />
              </button>
              {doctrineOpen && (
                <div className="absolute top-full left-0 mt-2 py-2 px-1 bg-ink2 border border-rule min-w-[180px]">
                  <Link
                    href="/#workplace"
                    className="block px-3 py-2 font-label text-[10px] text-cream2 uppercase tracking-[0.1em] hover:text-gold hover:bg-goldp transition-colors"
                  >
                    The Workplace
                  </Link>
                  <Link
                    href="/#individual"
                    className="block px-3 py-2 font-label text-[10px] text-cream2 uppercase tracking-[0.1em] hover:text-gold hover:bg-goldp transition-colors"
                  >
                    The Individual
                  </Link>
                  <Link
                    href="/#leaders"
                    className="block px-3 py-2 font-label text-[10px] text-cream2 uppercase tracking-[0.1em] hover:text-gold hover:bg-goldp transition-colors"
                  >
                    Leadership
                  </Link>
                  <Link
                    href="/#organisation"
                    className="block px-3 py-2 font-label text-[10px] text-cream2 uppercase tracking-[0.1em] hover:text-gold hover:bg-goldp transition-colors"
                  >
                    Organisation
                  </Link>
                </div>
              )}
            </div>

            {/* Assessment Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAssessmentOpen(true)}
              onMouseLeave={() => setAssessmentOpen(false)}
            >
              <button className="flex items-center gap-1 font-label text-[10px] text-cream2 uppercase tracking-[0.15em] hover:text-gold transition-colors">
                Assessment
                <ChevronDown className="w-3 h-3" />
              </button>
              {assessmentOpen && (
                <div className="absolute top-full left-0 mt-2 py-2 px-1 bg-ink2 border border-rule min-w-[180px]">
                  <Link
                    href="/diagnostic"
                    className="block px-3 py-2 font-label text-[10px] text-cream2 uppercase tracking-[0.1em] hover:text-gold hover:bg-goldp transition-colors"
                  >
                    Individual
                  </Link>
                  <Link
                    href="/#assess"
                    className="block px-3 py-2 font-label text-[10px] text-cream2 uppercase tracking-[0.1em] hover:text-gold hover:bg-goldp transition-colors"
                  >
                    CXO & Leaders
                  </Link>
                  <Link
                    href="/#assess"
                    className="block px-3 py-2 font-label text-[10px] text-cream2 uppercase tracking-[0.1em] hover:text-gold hover:bg-goldp transition-colors"
                  >
                    Organisation
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#lexicon"
              className="font-label text-[10px] text-cream2 uppercase tracking-[0.15em] hover:text-gold transition-colors"
            >
              Lexicon
            </Link>
            <Link
              href="/#about"
              className="font-label text-[10px] text-cream2 uppercase tracking-[0.15em] hover:text-gold transition-colors"
            >
              About
            </Link>

            {/* CTA Button */}
            <Link
              href="/diagnostic"
              className="ml-4 px-4 py-2 bg-gold text-ink font-label text-[10px] uppercase tracking-[0.15em] hover:bg-gold2 transition-colors"
            >
              Take Diagnostic →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-cream"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-ink border-b border-rule py-4 px-4">
            <div className="flex flex-col gap-3">
              <Link
                href="/#concepts"
                className="font-label text-[11px] text-cream2 uppercase tracking-[0.15em] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Concepts
              </Link>
              <Link
                href="/#framework"
                className="font-label text-[11px] text-cream2 uppercase tracking-[0.15em] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Framework
              </Link>
              <Link
                href="/#workplace"
                className="font-label text-[11px] text-cream2 uppercase tracking-[0.15em] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Workplace Doctrine
              </Link>
              <Link
                href="/#individual"
                className="font-label text-[11px] text-cream2 uppercase tracking-[0.15em] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Individual Doctrine
              </Link>
              <Link
                href="/#lexicon"
                className="font-label text-[11px] text-cream2 uppercase tracking-[0.15em] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Lexicon
              </Link>
              <Link
                href="/#about"
                className="font-label text-[11px] text-cream2 uppercase tracking-[0.15em] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/diagnostic"
                className="mt-2 px-4 py-3 bg-gold text-ink font-label text-[11px] uppercase tracking-[0.15em] text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Take Diagnostic →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
