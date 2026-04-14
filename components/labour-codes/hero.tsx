'use client';

import { ArrowRight } from 'lucide-react';

export function LabourCodesHero() {
  const architecturePills = [
    { label: 'Consolidation Map', href: '#consolidation' },
    { label: 'Trigger Architecture', href: '#triggers' },
    { label: 'Benefit Changes', href: '#benefits' },
    { label: 'Ownership Architecture', href: '#ownership' },
    { label: 'Clarity Framework', href: '#clarity' },
    { label: '3i Framework', href: '#implementation' },
  ];

  const handlePillClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[50vh] flex flex-col justify-center py-8 bg-ink mb-12">
      {/* Background effect */}
      <style>{`
        .hero-bg::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 70%;
          height: 140%;
          background: radial-gradient(ellipse at 70% 40%, rgba(196,154,60,.07) 0%, transparent 55%);
          pointer-events: none;
        }
      `}</style>

      <div className="hero-bg absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full">
        {/* Eyebrow */}
        <div className="reveal flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-rust" />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-rust">
            Labour Codes Decision System
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="reveal font-cormorant text-[clamp(2rem,4.5vw,3.2rem)] font-normal leading-[1.15] text-parchment mb-5 max-w-[850px]">
          The Complete{' '}
          <span className="italic text-gold">Decision Architecture</span> for
          India&apos;s Labour Code Transition
        </h1>

        {/* Subheadline */}
        <p className="reveal text-[0.95rem] text-mist leading-[1.7] max-w-[620px] mb-6">
          29 laws consolidated into 4 codes. This page provides the decision
          architecture to navigate the reset — not a compliance guide, but a
          system for understanding what applies, what changed, who owns it, and
          what to do.
        </p>

        {/* Kill Line / Callout Box */}
        <div
          className="reveal max-w-[680px] p-5 mb-7 leading-[1.55] text-[0.95rem] text-parchment border-l-[3px] border-rust"
          style={{ backgroundColor: 'rgba(140,59,40,.07)' }}
        >
          <p className="mb-3">
            The date has passed. The question is whether your organisation has.
          </p>
          <p>
            Where does it hit your system first —{' '}
            <span className="text-gold font-semibold">
              cost, classification, credibility, or control?
            </span>
          </p>
        </div>

        {/* Architecture Pills */}
        <div className="reveal flex flex-wrap gap-1 mb-6">
          {architecturePills.map((pill) => (
            <button
              key={pill.href}
              onClick={() => handlePillClick(pill.href)}
              className="font-mono text-[11px] tracking-[0.08em] uppercase text-parchment bg-ink2 border px-3.5 py-2.5 cursor-pointer transition-all hover:text-gold"
              style={{
                borderColor: 'rgba(196,154,60,.18)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C49A3C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(196,154,60,.18)';
              }}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* CTA Row */}
        <div className="reveal flex flex-wrap gap-3">
          {/* Primary CTA */}
          <button
            onClick={() => handlePillClick('#triggers')}
            className="flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase text-ink bg-gold px-6 py-3 hover:bg-gold-pale transition-all"
          >
            Map Your Triggers <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary CTA */}
          <a
            href="mailto:contact@axionindex.com?subject=Request%20Diagnostic"
            className="font-mono text-[12px] tracking-[0.08em] uppercase text-parchment px-6 py-3 transition-all"
            style={{
              border: '1px solid rgba(196,154,60,.18)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#C49A3C';
              e.currentTarget.style.color = '#C49A3C';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(196,154,60,.18)';
              e.currentTarget.style.color = '#F4EFE6';
            }}
          >
            Request Diagnostic
          </a>
        </div>
      </div>

      <style>{`
        @keyframes revealIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .reveal {
          animation: revealIn 0.6s ease-out forwards;
        }

        .reveal:nth-child(1) { animation-delay: 0s; }
        .reveal:nth-child(2) { animation-delay: 0.1s; }
        .reveal:nth-child(3) { animation-delay: 0.2s; }
        .reveal:nth-child(4) { animation-delay: 0.3s; }
        .reveal:nth-child(5) { animation-delay: 0.4s; }
        .reveal:nth-child(6) { animation-delay: 0.5s; }
      `}</style>
    </section>
  );
}
