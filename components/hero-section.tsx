"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  isVisible,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} id="hero" className="pt-[53px] min-h-screen relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-20 lg:pt-32 pb-16">
        {/* Breadcrumb */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="font-label text-[11px] text-gold uppercase tracking-[0.3em]">
            AI Edge Lab
          </span>
        </div>

        {/* Main Headline - Large, Centered, Statement */}
        <div className={`max-w-5xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[1.05] tracking-tight text-balance">
            The structural economics of work in the{" "}
            <span className="text-gold">AI era</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`mt-8 max-w-2xl transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-cream2 text-lg lg:text-xl leading-relaxed">
            A framework for understanding how roles, careers, and organisations must evolve 
            when artificial intelligence compresses analytical and executional work.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link
            href="/diagnostic"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-cream text-ink font-label text-[12px] uppercase tracking-[0.15em] hover:bg-gold transition-colors"
          >
            Start the Diagnostic
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/#framework"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-cream2/30 text-cream2 font-label text-[12px] uppercase tracking-[0.15em] hover:border-gold hover:text-gold transition-colors"
          >
            Explore Framework
          </Link>
        </div>

        {/* Author Attribution */}
        <div className={`mt-12 flex items-center gap-4 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="w-12 h-12 bg-ink2 border border-rule flex items-center justify-center">
            <span className="font-display text-lg font-black text-gold">NN</span>
          </div>
          <div>
            <p className="text-cream text-sm font-medium">Nitin Nahata</p>
            <p className="font-label text-[10px] text-stone uppercase tracking-[0.1em]">
              CHRO, Gameskraft | Founder, Axionindex
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards Section - OpenAI Style */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* E.D.G.E. Framework Card */}
          <div className={`group bg-ink2 border border-rule p-8 transition-all duration-700 delay-500 hover:border-gold/50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-label text-[11px] text-gold uppercase tracking-[0.2em]">
                Framework
              </span>
              <svg className="w-5 h-5 text-stone group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            
            <h3 className="font-display text-2xl font-bold text-cream mb-4 group-hover:text-gold transition-colors">
              E.D.G.E.
            </h3>
            
            <p className="text-cream3 text-sm leading-relaxed mb-6">
              Four dimensions measuring your structural position in the AI economy: 
              Exposure, Decision Density, Growth, and Economic Anchoring.
            </p>

            {/* Mini Grid */}
            <div className="grid grid-cols-2 gap-3">
              {["Exposure", "Decision", "Growth", "Economic"].map((item, idx) => (
                <div key={idx} className="bg-ink3 px-3 py-2 border-l-2 border-gold/50 group-hover:border-gold transition-colors">
                  <span className="font-label text-[9px] text-cream3 uppercase tracking-[0.1em]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Card */}
          <div className={`group bg-ink2 border border-rule p-8 transition-all duration-700 delay-600 hover:border-gold/50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-label text-[11px] text-gold uppercase tracking-[0.2em]">
                Assessment
              </span>
              <svg className="w-5 h-5 text-stone group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            
            <h3 className="font-display text-2xl font-bold text-cream mb-4 group-hover:text-gold transition-colors">
              AI Edge Diagnostic
            </h3>
            
            <p className="text-cream3 text-sm leading-relaxed mb-6">
              9 inputs. 12 minutes. A personalised Edge Score from 0-100 revealing 
              your structural position relative to AI compression.
            </p>

            {/* Stats */}
            <div className="flex gap-6">
              <div>
                <p className="font-display text-3xl font-black text-gold">
                  <AnimatedCounter target={9} isVisible={isVisible} duration={1500} />
                </p>
                <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">Inputs</p>
              </div>
              <div>
                <p className="font-display text-3xl font-black text-gold">
                  <AnimatedCounter target={12} isVisible={isVisible} duration={1500} />
                </p>
                <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">Minutes</p>
              </div>
              <div>
                <p className="font-display text-3xl font-black text-gold">100</p>
                <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">Score</p>
              </div>
            </div>
          </div>

          {/* Insight Card */}
          <div className={`group bg-ink2 border border-rule p-8 transition-all duration-700 delay-700 hover:border-gold/50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-label text-[11px] text-gold uppercase tracking-[0.2em]">
                Insight
              </span>
              <svg className="w-5 h-5 text-stone group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            
            <h3 className="font-display text-2xl font-bold text-cream mb-4 group-hover:text-gold transition-colors">
              The Central Law
            </h3>
            
            <p className="text-cream2 text-lg leading-relaxed italic mb-6">
              "When intelligence becomes cheap, judgment becomes the scarce resource."
            </p>

            {/* Compression Stats */}
            <div className="space-y-3">
              {[
                { label: "Analytical Work", value: 78 },
                { label: "Execution Work", value: 85 },
                { label: "Framing Work", value: 5 },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="font-label text-[9px] text-cream3 uppercase tracking-[0.1em]">{stat.label}</span>
                    <span className="font-label text-[9px] text-gold uppercase tracking-[0.1em]">
                      <AnimatedCounter target={stat.value} suffix="%" isVisible={isVisible} duration={2000} />
                    </span>
                  </div>
                  <div className="h-1 bg-ink3 overflow-hidden">
                    <div 
                      className="h-full bg-gold transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${stat.value}%` : "0%",
                        transitionDelay: `${800 + idx * 150}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <span className="font-label text-[9px] text-stone uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
