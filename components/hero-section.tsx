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
      
      // Easing function for smooth deceleration
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

function MiniEdgePreview() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [previewScore, setPreviewScore] = useState<number | null>(null);

  const questions = [
    {
      question: "How much of your work could AI do today?",
      options: ["Almost none", "Some tasks", "Most routine work", "Nearly everything"],
      weights: [25, 18, 10, 3],
    },
    {
      question: "How often do you make decisions with real consequences?",
      options: ["Rarely", "Sometimes", "Often", "Constantly"],
      weights: [5, 12, 20, 28],
    },
    {
      question: "Is your scope of responsibility growing?",
      options: ["Shrinking", "Stable", "Growing slowly", "Expanding fast"],
      weights: [3, 10, 18, 25],
    },
  ];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      // Calculate preview score
      const score = newAnswers.reduce((sum, answerIdx, qIdx) => {
        return sum + questions[qIdx].weights[answerIdx];
      }, 0);
      setPreviewScore(Math.min(100, Math.max(0, score)));
    }
  };

  const resetPreview = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setPreviewScore(null);
  };

  if (previewScore !== null) {
    const band = previewScore >= 75 ? "Edge Accelerating" : previewScore >= 50 ? "Edge Holding" : "Edge Thinning";
    const bandColor = previewScore >= 75 ? "text-gold" : previewScore >= 50 ? "text-cream" : "text-stone";
    
    return (
      <div className="h-full flex flex-col">
        <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-4">
          Preview Score
        </p>
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="font-display text-6xl font-black text-gold">{previewScore}</p>
          <p className={`font-label text-[11px] uppercase tracking-[0.15em] mt-2 ${bandColor}`}>
            {band}
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <Link
            href="/diagnostic"
            className="block w-full px-4 py-3 bg-gold text-ink font-label text-[10px] uppercase tracking-[0.15em] text-center hover:bg-gold2 transition-colors"
          >
            Get Full Analysis
          </Link>
          <button
            onClick={resetPreview}
            className="block w-full px-4 py-2 text-cream3 font-label text-[9px] uppercase tracking-[0.15em] text-center hover:text-gold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em]">
          Quick Preview
        </p>
        <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">
          {activeQuestion + 1} / {questions.length}
        </p>
      </div>
      
      <p className="text-cream text-sm leading-relaxed mb-4">
        {questions[activeQuestion].question}
      </p>
      
      <div className="flex-1 flex flex-col justify-center gap-2">
        {questions[activeQuestion].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="w-full px-3 py-2.5 text-left border border-rule text-cream2 font-label text-[10px] uppercase tracking-[0.1em] hover:border-gold hover:text-gold hover:bg-goldp transition-all"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setCardsVisible(true), 300);
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
    <section ref={heroRef} id="hero" className="pt-[53px]">
      {/* Masthead bar */}
      <div className="border-b border-rule py-3 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="font-label text-[9px] text-stone uppercase tracking-[0.2em]">
            The AI Edge Lab · Vol. I · 2026
          </span>
          <span className="font-label text-[9px] text-stone uppercase tracking-[0.2em] hidden md:block">
            The Doctrine of the Future Workplace
          </span>
          <span className="font-label text-[9px] text-stone uppercase tracking-[0.2em]">
            Nitin Nahata · Axionindex
          </span>
        </div>
      </div>

      {/* Bento Grid Hero */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 auto-rows-[minmax(140px,auto)]">
          
          {/* Main Headline - Large Card */}
          <div 
            className={`lg:col-span-7 lg:row-span-2 bg-ink2 border border-rule p-8 lg:p-10 flex flex-col justify-between transition-all duration-700 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <p className="font-label text-[9px] text-gold uppercase tracking-[0.3em] mb-6">
                A Framework for the AI Economy
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-balance">
                <span className="block">The</span>
                <span className="block text-gold">AI Edge</span>
                <span className="block">Lab</span>
              </h1>
            </div>
            
            <div className="mt-8">
              <p className="text-cream2 text-lg leading-relaxed max-w-xl">
                A structural framework for understanding how work, roles, and
                organisations must evolve when artificial intelligence compresses
                analytical and executional work.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/diagnostic"
                  className="px-6 py-3 bg-gold text-ink font-label text-[11px] uppercase tracking-[0.15em] text-center hover:bg-gold2 transition-colors"
                >
                  Take the Diagnostic
                </Link>
                <Link
                  href="/#framework"
                  className="px-6 py-3 border border-rule text-cream2 font-label text-[11px] uppercase tracking-[0.15em] text-center hover:border-gold hover:text-gold transition-colors"
                >
                  Explore Framework
                </Link>
              </div>
            </div>
          </div>

          {/* Central Law - Featured Quote */}
          <div 
            className={`lg:col-span-5 bg-goldp border border-goldb p-6 lg:p-8 flex flex-col justify-center transition-all duration-700 delay-100 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-4">
              The Central Law
            </p>
            <p className="font-display text-xl lg:text-2xl italic text-cream leading-relaxed">
              "When intelligence becomes cheap, judgment becomes the scarce
              resource."
            </p>
          </div>

          {/* Stat Card 1 - Animated */}
          <div 
            className={`lg:col-span-2 bg-ink2 border border-rule p-6 flex flex-col justify-center transition-all duration-700 delay-150 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-display text-4xl lg:text-5xl font-black text-gold">
              <AnimatedCounter target={78} suffix="%" isVisible={isVisible} />
            </p>
            <p className="mt-2 text-cream3 text-xs leading-relaxed">
              Analytical work now automatable by AI
            </p>
          </div>

          {/* Stat Card 2 - Animated */}
          <div 
            className={`lg:col-span-3 bg-ink2 border border-rule p-6 flex flex-col justify-center transition-all duration-700 delay-200 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-display text-4xl lg:text-5xl font-black text-gold">
              <AnimatedCounter target={3} suffix="x" isVisible={isVisible} duration={1500} />
            </p>
            <p className="mt-2 text-cream3 text-xs leading-relaxed">
              Faster compression of mid-level cognitive roles
            </p>
          </div>

          {/* Author Card */}
          <div 
            className={`lg:col-span-4 bg-ink2 border border-rule p-6 flex items-center gap-5 transition-all duration-700 delay-100 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-ink3 border border-rule flex items-center justify-center shrink-0">
              <span className="font-display text-2xl lg:text-3xl font-black text-gold">NN</span>
            </div>
            <div>
              <p className="font-label text-[9px] text-stone uppercase tracking-[0.2em] mb-1">
                By
              </p>
              <p className="font-display text-lg font-bold text-cream">
                Nitin Nahata
              </p>
              <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em] mt-1">
                CHRO · Gameskraft | Founder · Axionindex
              </p>
            </div>
          </div>

          {/* E.D.G.E. Preview Cards */}
          <div 
            className={`lg:col-span-4 bg-ink2 border border-rule p-6 transition-all duration-700 delay-250 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-4">
              The E.D.G.E. Framework
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { letter: "E", title: "Exposure" },
                { letter: "D", title: "Decision Density" },
                { letter: "G", title: "Growth" },
                { letter: "E", title: "Economic Anchoring" },
              ].map((dim, idx) => (
                <div 
                  key={idx} 
                  className="bg-ink3 p-3 border-l-2 border-gold hover:bg-goldp transition-colors cursor-default group"
                >
                  <span className="font-display text-2xl font-black text-gold group-hover:text-cream transition-colors">
                    {dim.letter}
                  </span>
                  <p className="font-label text-[8px] text-cream3 uppercase tracking-[0.1em] mt-1 group-hover:text-cream transition-colors">
                    {dim.title}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/#framework"
              className="block mt-4 font-label text-[9px] text-gold uppercase tracking-[0.15em] hover:text-cream transition-colors"
            >
              Learn More →
            </Link>
          </div>

          {/* Mini Diagnostic Preview - Interactive */}
          <div 
            className={`lg:col-span-4 lg:row-span-2 bg-ink2 border border-rule p-6 transition-all duration-700 delay-300 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <MiniEdgePreview />
          </div>

          {/* Compression Stats Visual */}
          <div 
            className={`lg:col-span-4 bg-ink3 border border-rule p-6 transition-all duration-700 delay-350 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-4">
              Work Type Compression
            </p>
            <div className="space-y-3">
              {[
                { type: "Framing", percent: 5, label: "AI-Proof" },
                { type: "Analysing", percent: 58, label: "AI-Assisted" },
                { type: "Executing", percent: 85, label: "AI-Dominant" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-label text-[9px] text-cream2 uppercase tracking-[0.1em]">
                      {item.type}
                    </span>
                    <span className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">
                      {item.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-stone3 relative overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${item.percent}%` : "0%",
                        transitionDelay: `${idx * 200 + 500}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stat Card 3 */}
          <div 
            className={`lg:col-span-2 bg-ink2 border border-rule p-6 flex flex-col justify-center transition-all duration-700 delay-400 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-display text-4xl lg:text-5xl font-black text-gold">
              <AnimatedCounter target={62} suffix="%" isVisible={isVisible} duration={2200} />
            </p>
            <p className="mt-2 text-cream3 text-xs leading-relaxed">
              Leaders see teams on automatable work
            </p>
          </div>

          {/* Diagnostic CTA Card */}
          <div 
            className={`lg:col-span-6 bg-goldp border border-goldb p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 delay-450 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-2">
                AI Edge Diagnostic™
              </p>
              <p className="text-cream text-sm">
                9 inputs · 12 minutes · Personalised Edge Score 0–100
              </p>
            </div>
            <Link
              href="/diagnostic"
              className="shrink-0 px-6 py-3 bg-gold text-ink font-label text-[11px] uppercase tracking-[0.15em] hover:bg-gold2 transition-colors"
            >
              Start Free →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
