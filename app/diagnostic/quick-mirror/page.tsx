"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { QuickMirrorAssessment } from "@/components/quick-mirror-assessment";
import { QuickMirrorResults } from "@/components/quick-mirror-results";
import { calculateQuickMirrorScore } from "@/lib/assessment-data";

export default function QuickMirrorPage() {
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<ReturnType<
    typeof calculateQuickMirrorScore
  > | null>(null);

  const handleComplete = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers);
    const calculatedResults = calculateQuickMirrorScore(finalAnswers);
    setResults(calculatedResults);
    setCompleted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-ink">
      <Navigation />
      <div className="pt-[53px]">
        {/* Header */}
        <div className="border-b border-rule py-3 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="font-label text-[9px] text-stone uppercase tracking-[0.2em]">
              Quick Mirror · Free Assessment
            </span>
            {!completed && (
              <span className="font-label text-[9px] text-gold uppercase tracking-[0.2em]">
                6 Questions · ~5 Minutes
              </span>
            )}
          </div>
        </div>

        {completed && results ? (
          <QuickMirrorResults results={results} />
        ) : (
          <QuickMirrorAssessment onComplete={handleComplete} />
        )}
      </div>
      <Footer />
    </main>
  );
}
