"use client";

import { useEffect, useRef, useState } from "react";

const dimensions = [
  {
    letter: "E",
    title: "Exposure",
    description: "How much of your work is AI-compressible?",
    detail:
      "Measures the proportion of your working hours spent on tasks that AI can perform at comparable or superior quality. Higher exposure signals structural compression pressure.",
  },
  {
    letter: "D",
    title: "Decision Density",
    description: "How much consequence-bearing judgment do you own?",
    detail:
      "Captures the frequency and significance of decisions where you make the call and absorb the outcome. High decision density is the strongest AI-proof signal.",
  },
  {
    letter: "G",
    title: "Growth of Boundary",
    description: "Is your decision authority expanding over time?",
    detail:
      "Tracks whether your scope of judgment and consequence ownership is growing, stable, or contracting. Direction matters as much as current position.",
  },
  {
    letter: "E",
    title: "Economic Anchoring",
    description: "Is your compensation tied to scarce contribution?",
    detail:
      "Assesses whether your economic value is anchored to AI-proof work or compressible output. Salary defensibility follows structural position.",
  },
];

const workTypes = [
  {
    type: "Framing",
    classification: "AI-PROOF",
    compression: 5,
    signal: "Strong edge",
  },
  {
    type: "Deciding",
    classification: "AI-PROOF",
    compression: 8,
    signal: "Strong edge",
  },
  {
    type: "Insighting",
    classification: "AI-ASSISTED",
    compression: 12,
    signal: "Moderate edge",
  },
  {
    type: "Analysing",
    classification: "AI-ASSISTED",
    compression: 58,
    signal: "Moderate exposure",
  },
  {
    type: "Executing",
    classification: "AI-DOMINANT",
    compression: 85,
    signal: "High exposure",
  },
  {
    type: "Researching",
    classification: "AI-DOMINANT",
    compression: 88,
    signal: "High exposure",
  },
];

export function FrameworkSection() {
  const [visibleBars, setVisibleBars] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleBars(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="framework" className="py-16 lg:py-24 border-t border-rule">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="border-b border-rule pb-4 mb-12">
          <p className="font-label text-[9px] text-gold uppercase tracking-[0.3em]">
            Framework
          </p>
          <h2 className="mt-2 font-display text-4xl lg:text-5xl font-black">
            The E.D.G.E. Framework
          </h2>
          <p className="mt-4 text-cream2 text-lg max-w-2xl">
            Four dimensions measuring structural position in the AI economy.
            Your Edge Score is derived from where you sit across each dimension.
          </p>
        </div>

        {/* Dimension Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {dimensions.map((dim, index) => (
            <div
              key={index}
              className="border-l-2 border-gold bg-ink2 p-6 hover:bg-ink3 transition-colors"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display text-5xl font-black text-gold">
                  {dim.letter}
                </span>
                <span className="font-label text-[10px] text-stone uppercase tracking-[0.15em]">
                  {dim.title}
                </span>
              </div>
              <p className="text-cream text-base font-medium mb-3">
                {dim.description}
              </p>
              <p className="text-cream3 text-sm leading-relaxed">{dim.detail}</p>
            </div>
          ))}
        </div>

        {/* Work Types + Compression */}
        <div className="border-t border-rule pt-12">
          <h3 className="font-display text-2xl font-bold mb-8">
            Six Work Types & Compression Coefficients
          </h3>

          <div ref={barRef} className="space-y-4">
            {workTypes.map((work, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 items-center py-3 border-b border-rule2"
              >
                <div className="col-span-3 lg:col-span-2">
                  <p className="font-display text-lg font-bold text-cream">
                    {work.type}
                  </p>
                </div>
                <div className="col-span-3 lg:col-span-2">
                  <span
                    className={`font-label text-[9px] uppercase tracking-[0.1em] px-2 py-1 ${
                      work.classification === "AI-PROOF"
                        ? "bg-goldp text-gold"
                        : work.classification === "AI-ASSISTED"
                        ? "bg-ink3 text-cream3"
                        : "bg-stone3 text-stone"
                    }`}
                  >
                    {work.classification}
                  </span>
                </div>
                <div className="col-span-4 lg:col-span-6">
                  <div className="h-2 bg-stone3 relative">
                    <div
                      className="h-full bg-gold transition-all duration-1000 ease-out"
                      style={{
                        width: visibleBars ? `${work.compression}%` : "0%",
                      }}
                    />
                  </div>
                  <p className="mt-1 font-label text-[10px] text-stone">
                    ~{work.compression}% automatable
                  </p>
                </div>
                <div className="col-span-2 text-right">
                  <span
                    className={`font-label text-[10px] uppercase tracking-[0.1em] ${
                      work.signal.includes("Strong")
                        ? "text-gold"
                        : work.signal.includes("High")
                        ? "text-stone"
                        : "text-cream3"
                    }`}
                  >
                    {work.signal}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Bands */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-goldp border border-goldb p-6">
            <p className="font-label text-[10px] text-gold uppercase tracking-[0.2em] mb-2">
              75–100
            </p>
            <h4 className="font-display text-xl font-bold text-gold mb-3">
              Edge Accelerating
            </h4>
            <p className="text-cream2 text-sm leading-relaxed">
              Scope anchored to consequence-bearing judgment; AI compression
              present but leverage sits above it.
            </p>
          </div>

          <div className="bg-ink2 border border-rule p-6">
            <p className="font-label text-[10px] text-cream3 uppercase tracking-[0.2em] mb-2">
              50–74
            </p>
            <h4 className="font-display text-xl font-bold text-cream mb-3">
              Edge Holding
            </h4>
            <p className="text-cream2 text-sm leading-relaxed">
              Meaningful judgment combined with compressible output; edge intact
              but sensitive to time allocation.
            </p>
          </div>

          <div className="bg-ink3 border border-stone3 p-6">
            <p className="font-label text-[10px] text-stone uppercase tracking-[0.2em] mb-2">
              0–49
            </p>
            <h4 className="font-display text-xl font-bold text-cream3 mb-3">
              Edge Thinning
            </h4>
            <p className="text-stone text-sm leading-relaxed">
              Significant scope overlap with AI-compressible work; quiet
              structural pressure on compensation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
