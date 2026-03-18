"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Download, Mail } from "lucide-react";
import { fullDiagnosticSections, bandDescriptions, directionalShifts } from "@/lib/assessment-data";
import type { FullDiagnosticAnswers } from "@/app/diagnostic/full-diagnostic/page";

interface FullDiagnosticResultsProps {
  answers: FullDiagnosticAnswers;
  email: string;
}

function calculateFullDiagnosticResults(answers: FullDiagnosticAnswers) {
  // Section 1: Structural Authority (weight: 0.25)
  const s1Scores = Object.values(answers.section1);
  const s1Average = s1Scores.reduce((a, b) => a + b, 0) / s1Scores.length;
  const structuralAuthority = Math.round((s1Average / 4) * 100); // Normalize to 0-100

  // Derive level
  let derivedLevel = "Early Career";
  if (s1Average >= 4.2) derivedLevel = "CXO / Founder";
  else if (s1Average >= 3.4) derivedLevel = "Leadership";
  else if (s1Average >= 2.6) derivedLevel = "Senior Management";
  else if (s1Average >= 1.8) derivedLevel = "Middle Management";

  // Section 2: Scope allocation
  const framing = answers.section2.framing || 0;
  const research = answers.section2.research || 0;
  const analysis = answers.section2.analysis || 0;
  const decision = answers.section2.decision || 0;
  const influence = answers.section2.influence || 0;

  // Section 3: Decision Density (weight: 0.40)
  const ruleBased = answers.section3.ruleBased || 0;
  const patternBased = answers.section3.patternBased || 0;
  const tradeOff = answers.section3.tradeOff || 0;
  const unique = answers.section3.unique || 0;
  
  // % of decisions that are Type C or D
  const protectedDecisions = tradeOff + unique;
  const decisionDensityBase = (protectedDecisions / 10) * 100;

  // Section 4: Judgment depth
  const judgmentScores = Object.values(answers.section4);
  const judgmentAverage = judgmentScores.reduce((a, b) => a + b, 0) / judgmentScores.length;
  const judgmentDepth = (judgmentAverage / 5) * 100;

  // Combined decision density
  const decisionDensity = Math.round((decisionDensityBase + judgmentDepth) / 2);

  // Section 5: Compression Exposure (weight: 0.25)
  const compressionCategories = fullDiagnosticSections.section5.categories;
  let weightedCompression = 0;
  compressionCategories.forEach((cat) => {
    const allocation = answers.section5[cat.id] || 0;
    weightedCompression += (allocation / 100) * cat.coefficient;
  });
  const compressionExposure = Math.round(weightedCompression);

  // Section 6: Momentum Index (weight: 0.10)
  const directionScores = Object.values(answers.section6);
  const directionAverage = directionScores.reduce((a, b) => a + b, 0) / directionScores.length;
  const momentumIndex = Math.round((directionAverage / 4) * 100);

  // Calculate Edge Score
  // Edge Score = (Decision Density × 0.40) + (Structural Authority × 0.25) + ((100 − Compression Exposure) × 0.25) + (Momentum Index × 0.10)
  const edgeScore = Math.round(
    decisionDensity * 0.4 +
    structuralAuthority * 0.25 +
    (100 - compressionExposure) * 0.25 +
    momentumIndex * 0.1
  );

  // Determine band
  let band: "accelerating" | "holding" | "thinning";
  if (edgeScore >= 75) band = "accelerating";
  else if (edgeScore >= 50) band = "holding";
  else band = "thinning";

  // Determine direction
  let direction: "accelerating" | "holding" | "thinning";
  if (momentumIndex >= 75) direction = "accelerating";
  else if (momentumIndex >= 50) direction = "holding";
  else direction = "thinning";

  return {
    edgeScore,
    band,
    direction,
    range: { min: Math.max(0, edgeScore - 5), max: Math.min(100, edgeScore + 5) },
    components: {
      decisionDensity,
      structuralAuthority,
      compressionExposure,
      momentumIndex,
      judgmentDepth: Math.round(judgmentDepth),
    },
    derivedLevel,
    scopeAllocation: { framing, research, analysis, decision, influence },
    decisionTaxonomy: { ruleBased, patternBased, tradeOff, unique },
  };
}

export function FullDiagnosticResults({ answers, email }: FullDiagnosticResultsProps) {
  const [showScoring, setShowScoring] = useState(false);

  const results = useMemo(() => calculateFullDiagnosticResults(answers), [answers]);
  const band = bandDescriptions[results.band];
  const shifts = directionalShifts[results.band];

  const directionDescriptions = {
    accelerating:
      "Your decision boundary expanded and consequence visibility increased over the past 12 months. Your edge is not just present — it is in motion.",
    holding:
      "Your decision boundary and consequence visibility have remained largely stable over the past 12 months. Your edge is intact — but not yet compounding.",
    thinning:
      "Your scope has narrowed or your consequence visibility has decreased over the past 12 months. Your edge score reflects today — your direction shapes tomorrow.",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
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
      <div className="text-center mb-6">
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

      {/* Derived Level */}
      <div className="text-center mb-10">
        <p className="font-label text-[10px] text-stone uppercase tracking-[0.2em] mb-1">
          Derived Structural Level
        </p>
        <p className="font-display text-xl font-bold text-gold">
          {results.derivedLevel}
        </p>
      </div>

      {/* Edge Direction */}
      <div className="bg-ink2 border border-rule p-6 mb-10">
        <p className="font-label text-[10px] text-stone uppercase tracking-[0.2em] mb-2">
          Edge Direction
        </p>
        <p
          className={`font-display text-2xl font-bold mb-3 ${
            results.direction === "accelerating"
              ? "text-gold"
              : results.direction === "thinning"
              ? "text-cream3"
              : "text-cream"
          }`}
        >
          {results.direction.charAt(0).toUpperCase() + results.direction.slice(1)}
        </p>
        <p className="text-cream2 leading-relaxed">
          {directionDescriptions[results.direction]}
        </p>
      </div>

      {/* Component Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <ComponentBar
          label="Decision Density"
          value={results.components.decisionDensity}
          weight="40%"
        />
        <ComponentBar
          label="Structural Authority"
          value={results.components.structuralAuthority}
          weight="25%"
        />
        <ComponentBar
          label="Compression Protection"
          value={100 - results.components.compressionExposure}
          weight="25%"
        />
        <ComponentBar
          label="Momentum Index"
          value={results.components.momentumIndex}
          weight="10%"
        />
      </div>

      {/* Scope Allocation Breakdown */}
      <div className="bg-ink2 border border-rule p-6 mb-10">
        <h3 className="font-display text-xl font-bold text-cream mb-4">
          Your Scope Allocation
        </h3>
        <div className="space-y-3">
          {Object.entries(results.scopeAllocation).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="w-24 font-label text-[10px] text-stone uppercase tracking-[0.1em]">
                {key}
              </span>
              <div className="flex-grow h-2 bg-stone3">
                <div
                  className={`h-full ${
                    key === "framing" || key === "influence" || key === "decision"
                      ? "bg-gold"
                      : "bg-stone"
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="w-12 text-right font-label text-sm text-cream">
                {value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Taxonomy Breakdown */}
      <div className="bg-ink2 border border-rule p-6 mb-10">
        <h3 className="font-display text-xl font-bold text-cream mb-4">
          Your Decision Profile
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-ink border border-stone3">
            <p className="font-display text-3xl font-bold text-stone">
              {results.decisionTaxonomy.ruleBased}
            </p>
            <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em] mt-1">
              Rule-Based
            </p>
          </div>
          <div className="text-center p-4 bg-ink border border-stone3">
            <p className="font-display text-3xl font-bold text-cream3">
              {results.decisionTaxonomy.patternBased}
            </p>
            <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em] mt-1">
              Pattern-Based
            </p>
          </div>
          <div className="text-center p-4 bg-ink border border-rule">
            <p className="font-display text-3xl font-bold text-cream">
              {results.decisionTaxonomy.tradeOff}
            </p>
            <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em] mt-1">
              Trade-off
            </p>
          </div>
          <div className="text-center p-4 bg-goldp border border-goldb">
            <p className="font-display text-3xl font-bold text-gold">
              {results.decisionTaxonomy.unique}
            </p>
            <p className="font-label text-[9px] text-gold uppercase tracking-[0.1em] mt-1">
              Unique
            </p>
          </div>
        </div>
      </div>

      {/* Scoring Logic (Expandable) */}
      <div className="mb-10">
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
              Score = (Decision Density × 0.4) + (Structural Authority × 0.25) +
              ((100 – Compression) × 0.25) + (Momentum × 0.10)
            </p>
            <p>
              Range reflects response variance across decision classification and
              scope questions
            </p>
            <p>
              Full Diagnostic adds structural authority and momentum. (Framework
              Version: 2026-Q1)
            </p>
          </div>
        )}
      </div>

      {/* Band Description */}
      <div className="mb-10 p-6 bg-ink2 border-l-2 border-gold">
        <p className="text-cream leading-relaxed">{band.description}</p>
      </div>

      {/* Salary Defensibility */}
      <div className="mb-10 text-center">
        <p className="text-cream3 italic text-sm">
          Salary defensibility strengthens as edge accelerates, stabilises as
          edge holds, and comes under quiet pressure as edge thins.
        </p>
      </div>

      {/* Three Directional Shifts */}
      <div className="mb-12">
        <h2 className="font-display text-2xl font-bold text-cream mb-6">
          Three Directional Shifts
        </h2>
        <div className="space-y-4">
          {shifts.map((shift, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 bg-ink2 border border-rule"
            >
              <span className="font-display text-2xl font-bold text-gold">
                {index + 1}
              </span>
              <p className="text-cream2 leading-relaxed">{shift}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Download Section */}
      <div className="bg-goldp border border-goldb p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-label text-[10px] text-gold uppercase tracking-[0.2em] mb-2">
              Your Working Document
            </p>
            <h3 className="font-display text-xl font-bold text-cream mb-2">
              5-Page PDF Ready
            </h3>
            <p className="text-cream2 text-sm">
              Includes structural snapshot, scope allocation targets, decision
              profile, 90-day commitments, and quarterly tracking.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gold text-ink font-label text-[11px] uppercase tracking-[0.15em] hover:bg-gold2 transition-colors">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gold text-gold font-label text-[11px] uppercase tracking-[0.15em] hover:bg-goldp transition-colors">
              <Mail className="w-4 h-4" />
              Send to {email.split("@")[0]}...
            </button>
          </div>
        </div>
      </div>

      {/* Closing Line */}
      <div className="text-center py-12 border-t border-rule">
        <p className="font-display text-xl lg:text-2xl font-bold text-cream italic leading-relaxed max-w-2xl mx-auto">
          "The architecture of work is being redesigned. The only question is
          whether you are designing yours — or inheriting someone else's."
        </p>
      </div>
    </div>
  );
}

function ComponentBar({
  label,
  value,
  weight,
}: {
  label: string;
  value: number;
  weight: string;
}) {
  return (
    <div className="bg-ink2 border border-rule p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="font-label text-[9px] text-stone uppercase tracking-[0.15em]">
          {label}
        </p>
        <span className="font-label text-[9px] text-stone2">Weight: {weight}</span>
      </div>
      <div className="h-2 bg-stone3 mb-2">
        <div
          className="h-full bg-gold transition-all duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="font-display text-2xl font-bold text-cream">{value}%</p>
    </div>
  );
}
