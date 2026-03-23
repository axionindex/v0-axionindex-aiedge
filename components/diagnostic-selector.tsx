"use client";

import Link from "next/link";

export function DiagnosticSelector() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Quick Mirror - Free */}
      <div className="bg-ink2 border border-rule p-8 flex flex-col">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-2xl font-bold text-cream">
            Quick Mirror
          </h2>
          <span className="font-label text-[11px] text-cream2 uppercase tracking-[0.1em]">
            Free
          </span>
        </div>

        <p className="font-label text-[10px] text-stone uppercase tracking-[0.1em] mb-4">
          5 minutes · 6 questions · Immediate clarity
        </p>

        <p className="text-cream2 leading-relaxed mb-6 flex-grow">
          A rapid structural read of where your edge currently sits. You'll
          receive your Edge band, a directional score, and three structural
          shifts to consider.
        </p>

        <p className="text-cream3 italic text-sm mb-8">
          For when you want signal, not detail.
        </p>

        <ul className="space-y-2 mb-8 text-cream2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">·</span>
            Edge band classification (Accelerating / Holding / Thinning)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">·</span>
            Directional Edge Score with range
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">·</span>
            Three personalised directional shifts
          </li>
        </ul>

        <Link
          href="/diagnostic/quick-mirror"
          className="block w-full px-4 py-4 border border-rule text-cream font-label text-[11px] uppercase tracking-[0.15em] text-center hover:border-gold hover:text-gold transition-colors"
        >
          Start Quick Mirror →
        </Link>
      </div>

      {/* Full Diagnostic - Paid */}
      <div className="bg-ink2 border border-goldb p-8 flex flex-col">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-2xl font-bold text-cream">
            Full Diagnostic
          </h2>
          <span className="font-label text-[11px] text-gold uppercase tracking-[0.1em]">
            ₹400
          </span>
        </div>

        <p className="font-label text-[10px] text-stone uppercase tracking-[0.1em] mb-4">
          15 minutes · Strict completion · PDF working document
        </p>

        <p className="text-cream2 leading-relaxed mb-6 flex-grow">
          A structured audit of your scope allocation, decision density,
          judgment depth, and edge trajectory. You'll receive a detailed
          breakdown, a quarterly-trackable score, and a personal working
          document to guide redesign.
        </p>

        <p className="text-cream3 italic text-sm mb-8">
          For when you want precision, not just direction.
        </p>

        <ul className="space-y-2 mb-8 text-cream2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">·</span>
            24+ structured inputs across 6 diagnostic sections
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">·</span>
            Detailed component breakdown with scoring logic
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">·</span>
            5-page PDF working document with quarterly tracking
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold mt-0.5">·</span>
            90-day structural redesign commitments
          </li>
        </ul>

        <Link
          href="/full-diagnostic"
          className="block w-full px-4 py-4 bg-gold text-ink font-label text-[11px] uppercase tracking-[0.15em] text-center hover:bg-gold2 transition-colors"
        >
          Start Full Diagnostic →
        </Link>
      </div>
    </div>
  );
}
