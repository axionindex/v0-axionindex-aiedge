"use client";

import { useState } from "react";
import Link from "next/link";
import {
  bandDescriptions,
  directionalShifts,
  calculateQuickMirrorScore,
} from "@/lib/assessment-data";
import { ChevronDown, ChevronUp } from "lucide-react";

interface QuickMirrorResultsProps {
  results: ReturnType<typeof calculateQuickMirrorScore>;
}

export function QuickMirrorResults({ results }: QuickMirrorResultsProps) {
  const [showScoring, setShowScoring] = useState(false);
  const band = bandDescriptions[results.band];
  const shifts = directionalShifts[results.band];

  const directionText = {
    thinning: "Thinning",
    holding: "Holding",
    accelerating: "Accelerating",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
      {/* Band - Primary Signal */}
      <div className="text-center mb-8">
        <p className="font-label text-[10px] text-stone uppercase tracking-[0.3em] mb-4">
          Your Edge Band
        </p>
        <h1
          className={`font-display text-5xl lg:text-6xl font-black ${
            results.band === "accelerating"
              ? "text-gold"
              : results.band === "holding"
              ? "text-cream"
              : "text-cream3"
          }`}
        >
          {band.title}
        </h1>
      </div>

      {/* Score with Range */}
      <div className="text-center mb-8">
        <div className="inline-flex items-baseline gap-2">
          <span className="font-display text-7xl lg:text-8xl font-black text-cream">
            {results.edgeScore}
          </span>
          <span className="font-label text-lg text-stone">/100</span>
        </div>
        <p className="mt-2 font-label text-[10px] text-stone uppercase tracking-[0.15em]">
          Estimated range: {results.range.min}–{results.range.max}
        </p>
      </div>

      {/* Edge Direction */}
      <div className="text-center mb-12">
        <p className="font-label text-[10px] text-stone uppercase tracking-[0.2em] mb-2">
          Edge Direction
        </p>
        <p
          className={`font-display text-xl font-bold ${
            results.direction === "accelerating"
              ? "text-gold"
              : results.direction === "thinning"
              ? "text-cream3"
              : "text-cream2"
          }`}
        >
          {directionText[results.direction]}
        </p>
      </div>

      {/* Component Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-ink2 border border-rule p-5">
          <p className="font-label text-[9px] text-stone uppercase tracking-[0.15em] mb-3">
            Judgment Density
          </p>
          <div className="h-2 bg-stone3 mb-2">
            <div
              className="h-full bg-gold transition-all duration-1000"
              style={{ width: `${results.components.judgmentDensity}%` }}
            />
          </div>
          <p className="font-display text-2xl font-bold text-cream">
            {results.components.judgmentDensity}%
          </p>
        </div>

        <div className="bg-ink2 border border-rule p-5">
          <p className="font-label text-[9px] text-stone uppercase tracking-[0.15em] mb-3">
            Output Compression Exposure
          </p>
          <div className="h-2 bg-stone3 mb-2">
            <div
              className="h-full bg-gold transition-all duration-1000"
              style={{ width: `${100 - results.components.outputExposure}%` }}
            />
          </div>
          <p className="font-display text-2xl font-bold text-cream">
            {100 - results.components.outputExposure}%
          </p>
        </div>

        <div className="bg-ink2 border border-rule p-5">
          <p className="font-label text-[9px] text-stone uppercase tracking-[0.15em] mb-3">
            Decision Authority
          </p>
          <div className="h-2 bg-stone3 mb-2">
            <div
              className="h-full bg-gold transition-all duration-1000"
              style={{ width: `${results.components.decisionAuthority}%` }}
            />
          </div>
          <p className="font-display text-2xl font-bold text-cream">
            {results.components.decisionAuthority}%
          </p>
        </div>
      </div>

      {/* Scoring Logic (Expandable) */}
      <div className="mb-12">
        <button
          onClick={() => setShowScoring(!showScoring)}
          className="flex items-center gap-2 font-label text-[10px] text-stone uppercase tracking-[0.15em] hover:text-cream transition-colors"
        >
          {showScoring ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          View scoring logic
        </button>
        {showScoring && (
          <div className="mt-4 p-4 bg-ink2 border border-rule text-sm text-cream3 space-y-1">
            <p>
              Score = (Judgment Density × 0.6) + ((100 – Output Exposure) ×
              0.4)
            </p>
            <p>Range reflects response variance across questions</p>
            <p>Quick Mirror provides directional signal. (Framework: 2026-Q1)</p>
          </div>
        )}
      </div>

      {/* Band Description */}
      <div className="mb-12 p-6 bg-ink2 border-l-2 border-gold">
        <p className="text-cream leading-relaxed">{band.description}</p>
      </div>

      {/* Salary Defensibility Connector */}
      <div className="mb-12 text-center">
        <p className="text-cream3 italic text-sm">
          Salary defensibility strengthens as edge accelerates, stabilises as
          edge holds, and comes under quiet pressure as edge thins.
        </p>
      </div>

      {/* Three Directional Shifts */}
      <div className="mb-16">
        <h2 className="font-display text-2xl font-bold text-cream mb-6">
          Three Directional Shifts
        </h2>
        <div className="space-y-4">
          {shifts.map((shift, index) => (
            <div key={index} className="flex gap-4 p-5 bg-ink2 border border-rule">
              <span className="font-display text-2xl font-bold text-gold">
                {index + 1}
              </span>
              <p className="text-cream2 leading-relaxed">{shift}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Line */}
      <div className="text-center py-12 border-t border-rule">
        <p className="font-display text-xl lg:text-2xl font-bold text-cream italic">
          Performance earns the next cycle.
        </p>
        <p className="font-display text-xl lg:text-2xl font-bold text-gold italic mt-2">
          Positioning shapes the next five.
        </p>
      </div>

      {/* Upsell to Full Diagnostic */}
      <div className="mt-12 p-8 bg-goldp border border-goldb text-center">
        <p className="font-label text-[10px] text-gold uppercase tracking-[0.2em] mb-4">
          Want More Precision?
        </p>
        <h3 className="font-display text-2xl font-bold text-cream mb-4">
          Full Diagnostic
        </h3>
        <p className="text-cream2 mb-6 max-w-lg mx-auto">
          Get a comprehensive structural audit with 24+ inputs, detailed scoring
          breakdown, and a 5-page PDF working document with 90-day action plan.
        </p>
        <Link
          href="/full-diagnostic"
          className="inline-block px-8 py-4 bg-gold text-ink font-label text-[11px] uppercase tracking-[0.15em] hover:bg-gold2 transition-colors"
        >
          Take Full Diagnostic · ₹400
        </Link>
      </div>
    </div>
  );
}
