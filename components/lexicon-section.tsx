"use client";

import { useEffect, useRef, useState } from "react";

const lexiconTerms = [
  {
    term: "Compressible Work",
    definition:
      "Work AI can perform at comparable or superior quality: Research (88%), Executing (85%), Analysis (58%)",
    note: "Compression coefficients updated quarterly",
  },
  {
    term: "Structural Position",
    definition:
      "Where your work sits relative to the AI compression line — independent of title, salary band, or years of experience",
    note: "Primary output of the AI Edge Diagnostic™",
  },
  {
    term: "Judgment Ownership",
    definition:
      "The degree to which a professional makes consequential calls and absorbs outcomes",
    note: "AI-proof range: 0.12–1.00",
  },
  {
    term: "Brainpower Density",
    definition:
      "Proportion of total working hours anchored to AI-proof contribution: Framing (5%), Deciding (8%), Insighting (12%)",
    note: "Replaces headcount as primary indicator of organisational structural health",
  },
  {
    term: "The E.D.G.E. Framework",
    definition:
      "Four dimensions measuring structural position: Exposure, Decision Density, Growth of Boundary, Economic Anchoring",
    note: "Measurement architecture behind the Diagnostic",
  },
  {
    term: "Scope Evolution",
    definition:
      "Directional movement of a professional's decision authority over 24 months — expanding, stable, or contracting",
    note: "Most overlooked structural signal",
  },
  {
    term: "Edge Score",
    definition:
      "A 0–100 structural position score produced by the AI Edge Diagnostic™",
    note: "Bands: Edge Accelerating (75+) · Edge Holding (50–74) · Edge Thinning (below 50)",
  },
  {
    term: "ORG AI DARS",
    definition: "Organisational Decision Architecture Realignment System",
    note: "Primary enterprise engagement pathway",
  },
  {
    term: "Compression Line",
    definition:
      "The boundary between work that retains human structural premium and work that AI can compress",
    note: "Position relative to this line determines career trajectory",
  },
];

export function LexiconSection() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setTimeout(() => {
                setVisibleItems((prev) => new Set([...prev, index]));
              }, index * 60);
            }
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="lexicon" className="py-16 lg:py-24 border-t border-rule">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="border-b border-rule pb-4 mb-12">
          <p className="font-label text-[9px] text-gold uppercase tracking-[0.3em]">
            Lexicon
          </p>
          <h2 className="mt-2 font-display text-4xl lg:text-5xl font-black">
            The Language of Edge
          </h2>
          <p className="mt-4 text-cream2 text-lg max-w-2xl">
            Nine terms that define the structural vocabulary of the AI economy.
          </p>
        </div>

        {/* Terms grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lexiconTerms.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`border-l-2 border-gold bg-ink2 p-6 transition-all duration-500 ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <h3 className="font-display text-lg font-bold text-cream mb-3">
                {item.term}
              </h3>
              <p className="text-cream2 text-sm leading-relaxed mb-3">
                {item.definition}
              </p>
              <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
