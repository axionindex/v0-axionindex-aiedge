"use client";

import { useEffect, useRef, useState } from "react";

const dimensions = [
  {
    letter: "E",
    title: "Exposure",
    description: "How much of your work is AI-compressible?",
    detail:
      "Measures the proportion of your working hours spent on tasks that AI can perform at comparable or superior quality. Higher exposure signals structural compression pressure.",
    metric: "0-100%",
    insight: "Most professionals underestimate their exposure by 20-30 points",
  },
  {
    letter: "D",
    title: "Decision Density",
    description: "How much consequence-bearing judgment do you own?",
    detail:
      "Captures the frequency and significance of decisions where you make the call and absorb the outcome. High decision density is the strongest AI-proof signal.",
    metric: "Calls/Week",
    insight: "The strongest predictor of structural position",
  },
  {
    letter: "G",
    title: "Growth of Boundary",
    description: "Is your decision authority expanding over time?",
    detail:
      "Tracks whether your scope of judgment and consequence ownership is growing, stable, or contracting. Direction matters as much as current position.",
    metric: "24mo Trend",
    insight: "Directional velocity often matters more than current state",
  },
  {
    letter: "E",
    title: "Economic Anchoring",
    description: "Is your compensation tied to scarce contribution?",
    detail:
      "Assesses whether your economic value is anchored to AI-proof work or compressible output. Salary defensibility follows structural position.",
    metric: "Defensibility",
    insight: "Compensation follows structure with a 12-18 month lag",
  },
];

const workTypes = [
  {
    type: "Framing",
    classification: "AI-PROOF",
    compression: 5,
    signal: "Strong edge",
    description: "Defining the problem, setting constraints, establishing success criteria",
  },
  {
    type: "Deciding",
    classification: "AI-PROOF",
    compression: 8,
    signal: "Strong edge",
    description: "Making consequential calls with incomplete information",
  },
  {
    type: "Insighting",
    classification: "AI-ASSISTED",
    compression: 12,
    signal: "Moderate edge",
    description: "Synthesizing patterns into novel understanding",
  },
  {
    type: "Analysing",
    classification: "AI-ASSISTED",
    compression: 58,
    signal: "Moderate exposure",
    description: "Processing data, identifying trends, generating reports",
  },
  {
    type: "Executing",
    classification: "AI-DOMINANT",
    compression: 85,
    signal: "High exposure",
    description: "Implementing defined processes and procedures",
  },
  {
    type: "Researching",
    classification: "AI-DOMINANT",
    compression: 88,
    signal: "High exposure",
    description: "Gathering information, summarizing sources, fact-finding",
  },
];

function AnimatedCounter({
  target,
  suffix = "",
  isVisible,
}: {
  target: number;
  suffix?: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 1500, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function FrameworkSection() {
  const [visibleBars, setVisibleBars] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [activeDimension, setActiveDimension] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleBars(true);
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleCards((prev) => new Set([...prev, index]));
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      barObserver.observe(barRef.current);
    }

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      barObserver.disconnect();
      cardObserver.disconnect();
    };
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

        {/* Interactive Dimension Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {dimensions.map((dim, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseEnter={() => setActiveDimension(index)}
              onMouseLeave={() => setActiveDimension(null)}
              className={`group relative border-l-2 border-gold bg-ink2 p-6 cursor-default transition-all duration-500 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              } ${
                activeDimension === index
                  ? "bg-goldp border-gold shadow-lg shadow-gold/10 -translate-y-1"
                  : "hover:bg-ink3"
              }`}
            >
              {/* Dimension Letter + Title */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className={`font-display text-5xl font-black transition-colors duration-300 ${
                  activeDimension === index ? "text-cream" : "text-gold"
                }`}>
                  {dim.letter}
                </span>
                <span className="font-label text-[10px] text-stone uppercase tracking-[0.15em]">
                  {dim.title}
                </span>
              </div>
              
              {/* Question */}
              <p className="text-cream text-base font-medium mb-3">
                {dim.description}
              </p>
              
              {/* Detail Text */}
              <p className={`text-cream3 text-sm leading-relaxed mb-4 transition-all duration-300 ${
                activeDimension === index ? "text-cream2" : ""
              }`}>
                {dim.detail}
              </p>

              {/* Metric Badge */}
              <div className="flex items-center justify-between">
                <span className="font-label text-[9px] text-gold uppercase tracking-[0.1em] px-2 py-1 bg-goldp">
                  {dim.metric}
                </span>
              </div>

              {/* Hover Insight */}
              <div className={`mt-4 pt-4 border-t border-rule transition-all duration-300 overflow-hidden ${
                activeDimension === index ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
              }`}>
                <p className="font-label text-[9px] text-gold uppercase tracking-[0.1em]">
                  Insight
                </p>
                <p className="text-cream2 text-xs mt-1 italic">
                  {dim.insight}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Work Types + Compression - Enhanced */}
        <div className="border-t border-rule pt-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <h3 className="font-display text-2xl font-bold">
                Six Work Types & Compression Coefficients
              </h3>
              <p className="mt-2 text-cream3 text-sm max-w-lg">
                Not all work compresses equally. Understanding where your hours land determines your structural position.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-goldp border border-gold"></div>
                <span className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">AI-Proof</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-ink3 border border-stone3"></div>
                <span className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">AI-Assisted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-stone3"></div>
                <span className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">AI-Dominant</span>
              </div>
            </div>
          </div>

          <div ref={barRef} className="space-y-4">
            {workTypes.map((work, index) => (
              <div
                key={index}
                className="group grid grid-cols-12 gap-4 items-center py-4 border-b border-rule2 hover:bg-ink2/50 transition-colors px-2 -mx-2"
              >
                <div className="col-span-12 sm:col-span-3 lg:col-span-2">
                  <p className="font-display text-lg font-bold text-cream group-hover:text-gold transition-colors">
                    {work.type}
                  </p>
                  <p className="text-cream3 text-xs mt-0.5 hidden sm:block">
                    {work.description}
                  </p>
                </div>
                <div className="col-span-4 sm:col-span-3 lg:col-span-2">
                  <span
                    className={`font-label text-[9px] uppercase tracking-[0.1em] px-2 py-1 inline-block ${
                      work.classification === "AI-PROOF"
                        ? "bg-goldp text-gold border border-goldb"
                        : work.classification === "AI-ASSISTED"
                        ? "bg-ink3 text-cream3 border border-stone3"
                        : "bg-stone3 text-stone border border-stone2"
                    }`}
                  >
                    {work.classification}
                  </span>
                </div>
                <div className="col-span-6 sm:col-span-4 lg:col-span-6">
                  <div className="h-3 bg-stone3/50 relative overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ease-out ${
                        work.classification === "AI-PROOF"
                          ? "bg-gold"
                          : work.classification === "AI-ASSISTED"
                          ? "bg-cream3"
                          : "bg-stone"
                      }`}
                      style={{
                        width: visibleBars ? `${work.compression}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                    {/* Percentage marker */}
                    <div 
                      className="absolute top-0 h-full w-px bg-cream/30 transition-all duration-1000"
                      style={{
                        left: visibleBars ? `${work.compression}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                  <p className="mt-1 font-label text-[10px] text-stone">
                    ~<AnimatedCounter target={work.compression} suffix="%" isVisible={visibleBars} /> automatable
                  </p>
                </div>
                <div className="col-span-2 text-right hidden sm:block">
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

        {/* Score Bands - Enhanced Bento Style */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="bg-goldp border border-goldb p-6 lg:p-8 group hover:shadow-lg hover:shadow-gold/5 transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="font-label text-[10px] text-gold uppercase tracking-[0.2em]">
                75–100
              </p>
              <div className="w-12 h-1 bg-gold"></div>
            </div>
            <h4 className="font-display text-2xl font-bold text-gold mb-3">
              Edge Accelerating
            </h4>
            <p className="text-cream2 text-sm leading-relaxed mb-4">
              Scope anchored to consequence-bearing judgment; AI compression
              present but leverage sits above it.
            </p>
            <div className="pt-4 border-t border-gold/30">
              <p className="font-label text-[9px] text-gold/70 uppercase tracking-[0.1em]">
                Structural Position: Above the compression line
              </p>
            </div>
          </div>

          <div className="bg-ink2 border border-rule p-6 lg:p-8 group hover:border-cream3 transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="font-label text-[10px] text-cream3 uppercase tracking-[0.2em]">
                50–74
              </p>
              <div className="w-12 h-1 bg-cream3"></div>
            </div>
            <h4 className="font-display text-2xl font-bold text-cream mb-3">
              Edge Holding
            </h4>
            <p className="text-cream2 text-sm leading-relaxed mb-4">
              Meaningful judgment combined with compressible output; edge intact
              but sensitive to time allocation.
            </p>
            <div className="pt-4 border-t border-rule">
              <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">
                Structural Position: At the compression line
              </p>
            </div>
          </div>

          <div className="bg-ink3 border border-stone3 p-6 lg:p-8 group hover:border-stone transition-all">
            <div className="flex items-center justify-between mb-4">
              <p className="font-label text-[10px] text-stone uppercase tracking-[0.2em]">
                0–49
              </p>
              <div className="w-12 h-1 bg-stone"></div>
            </div>
            <h4 className="font-display text-2xl font-bold text-cream3 mb-3">
              Edge Thinning
            </h4>
            <p className="text-stone text-sm leading-relaxed mb-4">
              Significant scope overlap with AI-compressible work; quiet
              structural pressure on compensation.
            </p>
            <div className="pt-4 border-t border-stone3">
              <p className="font-label text-[9px] text-stone2 uppercase tracking-[0.1em]">
                Structural Position: Below the compression line
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
