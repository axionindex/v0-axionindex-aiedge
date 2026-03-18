import Link from "next/link";

export function HeroSection() {
  return (
    <section id="hero" className="pt-[53px]">
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

      {/* Main hero content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1 - Main headline */}
          <div className="lg:col-span-5 lg:border-r lg:border-rule lg:pr-8">
            <h1 className="font-display text-[64px] sm:text-[80px] lg:text-[100px] font-black leading-[0.9] tracking-tight text-balance">
              <span className="block">The</span>
              <span className="block text-gold">AI</span>
              <span className="block text-gold">Edge</span>
              <span className="block">Lab</span>
            </h1>

            <p className="mt-8 text-cream2 text-lg leading-relaxed">
              A structural framework for understanding how work, roles, and
              organisations must evolve when artificial intelligence compresses
              analytical and executional work.
            </p>

            <p className="mt-4 text-cream3 italic">
              When intelligence becomes cheap, judgment becomes the scarce
              resource.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <span className="font-label text-[9px] text-stone uppercase tracking-[0.2em]">
                By
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="font-label text-[10px] text-cream2 uppercase tracking-[0.1em]">
                  Nitin Nahata
                </span>
                <span className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">
                  CHRO · Gameskraft
                </span>
                <span className="font-label text-[9px] text-stone uppercase tracking-[0.1em]">
                  Founder · Axionindex
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 - Central Law + Stats */}
          <div className="lg:col-span-4 lg:border-r lg:border-rule lg:pr-8">
            {/* The Central Law */}
            <div className="border border-goldb bg-goldp p-6 mb-8">
              <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-3">
                The Central Law
              </p>
              <p className="font-display text-xl italic text-cream leading-relaxed">
                "When intelligence becomes cheap, judgment becomes the scarce
                resource."
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <div className="border-l-2 border-gold pl-4">
                <p className="font-display text-5xl font-black text-gold">78%</p>
                <p className="mt-1 text-cream2 text-sm leading-relaxed">
                  Analytical work now partially or fully automatable by frontier
                  AI tools
                </p>
              </div>

              <div className="border-l-2 border-gold pl-4">
                <p className="font-display text-5xl font-black text-gold">3×</p>
                <p className="mt-1 text-cream2 text-sm leading-relaxed">
                  Faster compression of mid-level cognitive roles vs entry-level
                  work
                </p>
              </div>

              <div className="border-l-2 border-gold pl-4">
                <p className="font-display text-5xl font-black text-gold">62%</p>
                <p className="mt-1 text-cream2 text-sm leading-relaxed">
                  Leaders report teams spend majority of time on automatable
                  work
                </p>
              </div>
            </div>
          </div>

          {/* Column 3 - Diagnostic CTA */}
          <div className="lg:col-span-3">
            <div className="bg-ink2 border border-rule p-6">
              <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-4">
                AI Edge Diagnostic™
              </p>

              <ul className="space-y-3 text-cream2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">·</span>
                  Nine structured inputs · Under 12 minutes · Free
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">·</span>
                  Personalised AI exposure profile and Edge Score 0–100
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">·</span>
                  90-day structural action plan — not generic advice
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">·</span>
                  Entirely private — results are yours alone, never shared
                </li>
              </ul>

              <div className="mt-6 space-y-3">
                <Link
                  href="/diagnostic"
                  className="block w-full px-4 py-3 bg-gold text-ink font-label text-[11px] uppercase tracking-[0.15em] text-center hover:bg-gold2 transition-colors"
                >
                  Take the Diagnostic →
                </Link>
                <Link
                  href="/#framework"
                  className="block w-full px-4 py-3 border border-rule text-cream2 font-label text-[11px] uppercase tracking-[0.15em] text-center hover:border-gold hover:text-gold transition-colors"
                >
                  Explore the Framework
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
