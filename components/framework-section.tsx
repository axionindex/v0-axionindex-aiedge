"use client";

import { useEffect, useRef, useState } from "react";

const dimensions = [
  {
    letter: "E",
    title: "Exposure",
    description: "How much of your work is AI-compressible?",
    detail:
      "Measures the proportion of your working hours spent on tasks that AI can perform at comparable or superior quality.",
    metric: "0-100%",
  },
  {
    letter: "D",
    title: "Decision Density",
    description: "How much consequence-bearing judgment do you own?",
    detail:
      "Captures the frequency and significance of decisions where you make the call and absorb the outcome.",
    metric: "Calls/Week",
  },
  {
    letter: "G",
    title: "Growth of Boundary",
    description: "Is your decision authority expanding over time?",
    detail:
      "Tracks whether your scope of judgment and consequence ownership is growing, stable, or contracting.",
    metric: "24mo Trend",
  },
  {
    letter: "E",
    title: "Economic Anchoring",
    description: "Is your compensation tied to scarce contribution?",
    detail:
      "Assesses whether your economic value is anchored to AI-proof work or compressible output.",
    metric: "Defensibility",
  },
];

const workTypes = [
  { type: "Framing", classification: "AI-PROOF", compression: 5 },
  { type: "Deciding", classification: "AI-PROOF", compression: 8 },
  { type: "Insighting", classification: "AI-ASSISTED", compression: 12 },
  { type: "Analysing", classification: "AI-ASSISTED", compression: 58 },
  { type: "Executing", classification: "AI-DOMINANT", compression: 85 },
  { type: "Researching", classification: "AI-DOMINANT", compression: 88 },
];

export function FrameworkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [barsVisible, setBarsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const barsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBarsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (barsRef.current) barsObserver.observe(barsRef.current);

    return () => {
      observer.disconnect();
      barsObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="framework" className="py-24 lg:py-32 border-t border-rule/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header - Centered like OpenAI */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="font-label text-[11px] text-gold uppercase tracking-[0.3em]">
            Framework
          </span>
          <h2 className="mt-4 font-display text-4xl lg:text-5xl xl:text-6xl font-black">
            The E.D.G.E. Framework
          </h2>
          <p className="mt-6 text-cream2 text-lg leading-relaxed">
            Four dimensions measuring your structural position in the AI economy. 
            Your Edge Score derives from where you sit across each dimension.
          </p>
        </div>

        {/* Dimension Cards - Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {dimensions.map((dim, index) => (
            <div
              key={index}
              className={`group bg-ink2 border border-rule p-8 transition-all duration-700 hover:border-gold/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-5xl font-black text-gold group-hover:text-cream transition-colors">
                  {dim.letter}
                </span>
                <svg className="w-5 h-5 text-stone opacity-0 group-hover:opacity-100 group-hover:text-gold transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              
              <h3 className="font-label text-[11px] text-gold uppercase tracking-[0.2em] mb-3">
                {dim.title}
              </h3>
              
              <p className="text-cream text-base font-medium mb-3">
                {dim.description}
              </p>
              
              <p className="text-cream3 text-sm leading-relaxed mb-6">
                {dim.detail}
              </p>

              <div className="pt-4 border-t border-rule">
                <span className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">
                  Metric: {dim.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Work Types Section */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl lg:text-3xl font-bold">
              Six Work Types & Compression
            </h3>
            <p className="mt-3 text-cream3 text-sm">
              Not all work compresses equally. Understanding where your hours land determines your structural position.
            </p>
          </div>

          <div ref={barsRef} className="max-w-4xl mx-auto">
            {workTypes.map((work, index) => (
              <div
                key={index}
                className="group grid grid-cols-12 gap-4 items-center py-5 border-b border-rule/30 hover:bg-ink2/30 transition-colors"
              >
                <div className="col-span-3 lg:col-span-2">
                  <p className="font-display text-lg font-bold text-cream group-hover:text-gold transition-colors">
                    {work.type}
                  </p>
                </div>
                
                <div className="col-span-3 lg:col-span-2">
                  <span
                    className={`font-label text-[9px] uppercase tracking-[0.1em] px-3 py-1.5 inline-block ${
                      work.classification === "AI-PROOF"
                        ? "bg-goldp text-gold border border-gold/30"
                        : work.classification === "AI-ASSISTED"
                        ? "bg-ink3 text-cream3 border border-stone3"
                        : "bg-stone3/50 text-stone border border-stone2/50"
                    }`}
                  >
                    {work.classification}
                  </span>
                </div>
                
                <div className="col-span-5 lg:col-span-7">
                  <div className="h-2 bg-ink3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ease-out ${
                        work.classification === "AI-PROOF"
                          ? "bg-gold"
                          : work.classification === "AI-ASSISTED"
                          ? "bg-cream3"
                          : "bg-stone"
                      }`}
                      style={{
                        width: barsVisible ? `${work.compression}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                </div>
                
                <div className="col-span-1 text-right">
                  <span className="font-label text-[11px] text-stone">
                    {work.compression}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Bands */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`bg-goldp border border-gold/30 p-8 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-label text-[11px] text-gold uppercase tracking-[0.2em]">75-100</span>
              <div className="flex-1 h-px bg-gold/30" />
            </div>
            <h4 className="font-display text-2xl font-bold text-gold mb-3">Edge Accelerating</h4>
            <p className="text-cream2 text-sm leading-relaxed">
              Scope anchored to consequence-bearing judgment; AI compression present but leverage sits above it.
            </p>
          </div>

          <div className={`bg-ink2 border border-rule p-8 transition-all duration-700 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-label text-[11px] text-cream3 uppercase tracking-[0.2em]">50-74</span>
              <div className="flex-1 h-px bg-rule" />
            </div>
            <h4 className="font-display text-2xl font-bold text-cream mb-3">Edge Holding</h4>
            <p className="text-cream3 text-sm leading-relaxed">
              Meaningful judgment combined with compressible output; edge intact but sensitive to time allocation.
            </p>
          </div>

          <div className={`bg-ink3 border border-stone3 p-8 transition-all duration-700 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-label text-[11px] text-stone uppercase tracking-[0.2em]">0-49</span>
              <div className="flex-1 h-px bg-stone3" />
            </div>
            <h4 className="font-display text-2xl font-bold text-cream3 mb-3">Edge Thinning</h4>
            <p className="text-stone text-sm leading-relaxed">
              Significant scope overlap with AI-compressible work; quiet structural pressure on compensation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
