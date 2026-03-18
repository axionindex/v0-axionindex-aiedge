export function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 border-t border-rule">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="border-b border-rule pb-4 mb-12">
          <p className="font-label text-[9px] text-gold uppercase tracking-[0.3em]">
            About
          </p>
          <h2 className="mt-2 font-display text-4xl lg:text-5xl font-black">
            Nitin Nahata
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Bio */}
          <div className="lg:col-span-7">
            <p className="text-cream text-lg leading-relaxed mb-6">
              Nitin Nahata is a CHRO and organisational architect whose work
              focuses on how organisations evolve when intelligence becomes
              abundant.
            </p>
            <p className="text-cream2 leading-relaxed mb-6">
              Two decades across institutions and high-growth companies have
              shaped his thinking on the architecture of decision-making, the
              future structure of work, and how organisations redesign talent
              systems in the AI Era.
            </p>
            <p className="text-cream2 leading-relaxed mb-6">
              As CHRO of Gameskraft, he sees firsthand how AI is changing the
              structure of work inside a fast-scaling organisation. As Founder
              of Axionindex, he is building the frameworks and instruments to
              measure and redesign those changes at scale.
            </p>

            {/* Doctrine quote */}
            <div className="border-l-2 border-gold pl-6 mt-8">
              <p className="font-display text-xl italic text-cream leading-relaxed">
                "AI does not eliminate work first. It eliminates the structural
                premium on intelligence inside work — and what replaces that
                premium is judgment."
              </p>
            </div>
          </div>

          {/* Info cards */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <div className="bg-ink2 border border-rule p-6">
                <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-2">
                  Current Role
                </p>
                <p className="font-display text-lg font-bold text-cream">
                  CHRO · Gameskraft
                </p>
              </div>

              <div className="bg-ink2 border border-rule p-6">
                <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-2">
                  Founder
                </p>
                <p className="font-display text-lg font-bold text-cream">
                  Axionindex
                </p>
              </div>

              <div className="bg-ink2 border border-rule p-6">
                <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-2">
                  Creator
                </p>
                <p className="font-display text-lg font-bold text-cream">
                  AI Edge Diagnostic™
                </p>
              </div>

              <div className="bg-ink2 border border-rule p-6">
                <p className="font-label text-[9px] text-gold uppercase tracking-[0.2em] mb-2">
                  Contact
                </p>
                <a
                  href="mailto:nitin@axionindex.org"
                  className="font-label text-sm text-gold hover:text-gold2 transition-colors"
                >
                  nitin@axionindex.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
