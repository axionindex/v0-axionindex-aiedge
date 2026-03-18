"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 border-t border-rule bg-ink2 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div 
            className={`lg:col-span-7 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="font-label text-[10px] text-gold uppercase tracking-[0.3em] mb-6">
              AI Edge Diagnostic™
            </p>

            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-black text-balance leading-tight">
              Where does your work sit relative to the{" "}
              <span className="text-gold">compression line</span>?
            </h2>

            <p className="mt-6 text-cream2 text-lg leading-relaxed max-w-xl">
              Take the diagnostic. Understand your structural position. Receive a
              personalised action plan — not generic career advice.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/diagnostic"
                className="group px-8 py-4 bg-gold text-ink font-label text-[11px] uppercase tracking-[0.15em] hover:bg-gold2 transition-all flex items-center gap-2"
              >
                Take the Diagnostic
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/#framework"
                className="px-8 py-4 border border-rule text-cream2 font-label text-[11px] uppercase tracking-[0.15em] hover:border-gold hover:text-gold transition-colors"
              >
                Explore Framework
              </Link>
            </div>

            {/* Privacy note */}
            <p className="mt-8 font-label text-[9px] text-stone uppercase tracking-[0.15em]">
              Results are private — never shared with employers or organisations
            </p>
          </div>

          {/* Right - Feature Cards */}
          <div 
            className={`lg:col-span-5 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "9", label: "Structured Inputs", sublabel: "Guided questions" },
                { value: "12", label: "Minutes", sublabel: "Quick assessment" },
                { value: "0-100", label: "Edge Score", sublabel: "Personalised rating" },
                { value: "90", label: "Day Action Plan", sublabel: "Structural roadmap" },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`bg-ink3 border border-rule p-5 transition-all duration-500 hover:border-gold hover:bg-goldp group ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${300 + idx * 100}ms` }}
                >
                  <p className="font-display text-3xl font-black text-gold group-hover:text-cream transition-colors">
                    {item.value}
                  </p>
                  <p className="font-label text-[10px] text-cream2 uppercase tracking-[0.1em] mt-2">
                    {item.label}
                  </p>
                  <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em] mt-1">
                    {item.sublabel}
                  </p>
                </div>
              ))}
            </div>

            {/* Benefit List */}
            <div className="mt-6 bg-goldp border border-goldb p-5">
              <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-4">
                What You Get
              </p>
              <ul className="space-y-2">
                {[
                  "AI exposure profile mapped to six work types",
                  "Structural position band with percentile ranking",
                  "90-day priority roadmap for edge protection",
                  "Downloadable report for personal reference",
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-cream2 text-sm">
                    <span className="text-gold mt-0.5 shrink-0">·</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
