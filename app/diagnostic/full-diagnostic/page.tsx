"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FullDiagnosticAssessment } from "@/components/full-diagnostic-assessment";
import { PaymentGate } from "@/components/payment-gate";
import { FullDiagnosticResults } from "@/components/full-diagnostic-results";

export type FullDiagnosticAnswers = {
  section1: Record<string, number>;
  section2: Record<string, number>;
  section3: Record<string, number>;
  section4: Record<string, number>;
  section5: Record<string, number>;
  section6: Record<string, number>;
};

export default function FullDiagnosticPage() {
  const [stage, setStage] = useState<"assessment" | "payment" | "results">(
    "assessment"
  );
  const [answers, setAnswers] = useState<FullDiagnosticAnswers | null>(null);
  const [email, setEmail] = useState("");

  const handleAssessmentComplete = (finalAnswers: FullDiagnosticAnswers) => {
    setAnswers(finalAnswers);
    setStage("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentComplete = (userEmail: string) => {
    setEmail(userEmail);
    setStage("results");
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
              Full Diagnostic · ₹400
            </span>
            {stage === "assessment" && (
              <span className="font-label text-[9px] text-gold uppercase tracking-[0.2em]">
                24+ Inputs · 6 Sections · ~15 Minutes
              </span>
            )}
            {stage === "payment" && (
              <span className="font-label text-[9px] text-gold uppercase tracking-[0.2em]">
                Assessment Complete · Unlock Results
              </span>
            )}
            {stage === "results" && (
              <span className="font-label text-[9px] text-gold uppercase tracking-[0.2em]">
                Your Full Diagnostic Results
              </span>
            )}
          </div>
        </div>

        {stage === "assessment" && (
          <FullDiagnosticAssessment onComplete={handleAssessmentComplete} />
        )}

        {stage === "payment" && (
          <PaymentGate onComplete={handlePaymentComplete} />
        )}

        {stage === "results" && answers && (
          <FullDiagnosticResults answers={answers} email={email} />
        )}
      </div>
      <Footer />
    </main>
  );
}
