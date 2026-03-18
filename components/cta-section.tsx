import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 border-t border-rule bg-ink2">
      <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
        <p className="font-label text-[10px] text-gold uppercase tracking-[0.3em] mb-6">
          AI Edge Diagnostic™
        </p>

        <h2 className="font-display text-4xl lg:text-5xl font-black text-balance leading-tight">
          Where does your work sit relative to the compression line?
        </h2>

        <p className="mt-6 text-cream2 text-lg leading-relaxed max-w-xl mx-auto">
          Take the diagnostic. Understand your structural position. Receive a
          personalised action plan.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/diagnostic"
            className="px-8 py-4 bg-gold text-ink font-label text-[11px] uppercase tracking-[0.15em] hover:bg-gold2 transition-colors"
          >
            Take the Diagnostic →
          </Link>
          <Link
            href="/#framework"
            className="px-8 py-4 border border-rule text-cream2 font-label text-[11px] uppercase tracking-[0.15em] hover:border-gold hover:text-gold transition-colors"
          >
            Learn More
          </Link>
        </div>

        {/* Privacy note */}
        <p className="mt-8 font-label text-[9px] text-stone uppercase tracking-[0.15em]">
          Results are private — never shared with employers or organisations
        </p>
      </div>
    </section>
  );
}
