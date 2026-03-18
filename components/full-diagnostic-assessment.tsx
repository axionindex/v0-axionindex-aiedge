"use client";

import { useState } from "react";
import { fullDiagnosticSections } from "@/lib/assessment-data";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import type { FullDiagnosticAnswers } from "@/app/diagnostic/full-diagnostic/page";

interface FullDiagnosticAssessmentProps {
  onComplete: (answers: FullDiagnosticAnswers) => void;
}

const sectionOrder = [
  "section1",
  "section2",
  "section3",
  "section4",
  "section5",
  "section6",
] as const;

export function FullDiagnosticAssessment({
  onComplete,
}: FullDiagnosticAssessmentProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<FullDiagnosticAnswers>({
    section1: {},
    section2: {},
    section3: {},
    section4: {},
    section5: {},
    section6: {},
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const sectionKey = sectionOrder[currentSection];
  const progress = ((currentSection + 1) / sectionOrder.length) * 100;
  const isLastSection = currentSection === sectionOrder.length - 1;

  const validateSection = (): boolean => {
    setValidationError(null);

    if (sectionKey === "section1") {
      const section = fullDiagnosticSections.section1;
      const allAnswered = section.questions.every(
        (q) => answers.section1[q.id] !== undefined
      );
      if (!allAnswered) {
        setValidationError("Please answer all questions before proceeding.");
        return false;
      }
    }

    if (sectionKey === "section2") {
      const total = Object.values(answers.section2).reduce(
        (sum, val) => sum + (val || 0),
        0
      );
      if (total !== 100) {
        setValidationError(
          `Total allocation must equal 100%. Current total: ${total}%`
        );
        return false;
      }
    }

    if (sectionKey === "section3") {
      const total = Object.values(answers.section3).reduce(
        (sum, val) => sum + (val || 0),
        0
      );
      if (total !== 10) {
        setValidationError(
          `Total must equal 10 decisions. Current total: ${total}`
        );
        return false;
      }
    }

    if (sectionKey === "section4") {
      const section = fullDiagnosticSections.section4;
      const allAnswered = section.statements.every(
        (s) => answers.section4[s.id] !== undefined
      );
      if (!allAnswered) {
        setValidationError("Please rate all statements before proceeding.");
        return false;
      }
    }

    if (sectionKey === "section5") {
      const total = Object.values(answers.section5).reduce(
        (sum, val) => sum + (val || 0),
        0
      );
      if (total !== 100) {
        setValidationError(
          `Total allocation must equal 100%. Current total: ${total}%`
        );
        return false;
      }
    }

    if (sectionKey === "section6") {
      const section = fullDiagnosticSections.section6;
      const allAnswered = section.questions.every(
        (q) => answers.section6[q.id] !== undefined
      );
      if (!allAnswered) {
        setValidationError("Please answer all questions before proceeding.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateSection()) return;

    if (isLastSection) {
      onComplete(answers);
    } else {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setValidationError(null);
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const updateAnswer = (key: string, value: number) => {
    setValidationError(null);
    setAnswers((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [key]: value,
      },
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label text-[10px] text-stone uppercase tracking-[0.15em]">
            Section {currentSection + 1} of {sectionOrder.length}
          </span>
          <span className="font-label text-[10px] text-gold uppercase tracking-[0.15em]">
            {fullDiagnosticSections[sectionKey].title}
          </span>
        </div>
        <div className="h-[2px] bg-stone3">
          <div
            className="h-full bg-gold transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Section Content */}
      <div className="mb-8">
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-cream mb-2">
          {fullDiagnosticSections[sectionKey].title}
        </h2>
        <p className="text-cream3">
          {fullDiagnosticSections[sectionKey].purpose}
        </p>
      </div>

      {/* Section 1: Multiple Choice Questions */}
      {sectionKey === "section1" && (
        <Section1Questions answers={answers.section1} onUpdate={updateAnswer} />
      )}

      {/* Section 2: Scope Allocation (100%) */}
      {sectionKey === "section2" && (
        <Section2Allocation
          answers={answers.section2}
          onUpdate={updateAnswer}
        />
      )}

      {/* Section 3: Decision Taxonomy (10 total) */}
      {sectionKey === "section3" && (
        <Section3Taxonomy answers={answers.section3} onUpdate={updateAnswer} />
      )}

      {/* Section 4: Rating Statements */}
      {sectionKey === "section4" && (
        <Section4Ratings answers={answers.section4} onUpdate={updateAnswer} />
      )}

      {/* Section 5: Compression Exposure (100%) */}
      {sectionKey === "section5" && (
        <Section5Compression
          answers={answers.section5}
          onUpdate={updateAnswer}
        />
      )}

      {/* Section 6: Direction Questions */}
      {sectionKey === "section6" && (
        <Section6Direction answers={answers.section6} onUpdate={updateAnswer} />
      )}

      {/* Validation Error */}
      {validationError && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-cream2 text-sm">{validationError}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        <button
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className={`flex items-center gap-2 px-4 py-2 font-label text-[10px] uppercase tracking-[0.15em] transition-colors ${
            currentSection === 0
              ? "text-stone2 cursor-not-allowed"
              : "text-cream2 hover:text-gold"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-gold text-ink font-label text-[11px] uppercase tracking-[0.15em] hover:bg-gold2 transition-colors"
        >
          {isLastSection ? "Complete Assessment" : "Next Section"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Section 1: Multiple Choice Questions
function Section1Questions({
  answers,
  onUpdate,
}: {
  answers: Record<string, number>;
  onUpdate: (key: string, value: number) => void;
}) {
  const section = fullDiagnosticSections.section1;

  return (
    <div className="space-y-8">
      {section.questions.map((q) => (
        <div key={q.id} className="border-b border-rule2 pb-8">
          <h3 className="font-display text-lg font-bold text-cream mb-4">
            {q.question}
          </h3>
          <div className="space-y-2">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => onUpdate(q.id, opt.points)}
                className={`w-full text-left p-4 border transition-all ${
                  answers[q.id] === opt.points
                    ? "border-gold bg-goldp"
                    : "border-rule hover:border-goldb"
                }`}
              >
                <span
                  className={`font-label text-sm ${
                    answers[q.id] === opt.points ? "text-gold" : "text-stone"
                  }`}
                >
                  {opt.label}.
                </span>{" "}
                <span
                  className={
                    answers[q.id] === opt.points ? "text-cream" : "text-cream2"
                  }
                >
                  {opt.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Section 2: Scope Allocation
function Section2Allocation({
  answers,
  onUpdate,
}: {
  answers: Record<string, number>;
  onUpdate: (key: string, value: number) => void;
}) {
  const section = fullDiagnosticSections.section2;
  const total = Object.values(answers).reduce((sum, val) => sum + (val || 0), 0);

  return (
    <div>
      <div className="mb-6 p-4 bg-ink2 border border-rule">
        <p className="font-label text-[10px] text-stone uppercase tracking-[0.1em] mb-1">
          {section.instruction}
        </p>
        <p className={`font-display text-2xl font-bold ${total === 100 ? "text-gold" : "text-cream"}`}>
          Total: {total}%
        </p>
      </div>

      <div className="space-y-6">
        {section.workTypes.map((wt) => (
          <div key={wt.id} className="border-b border-rule2 pb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-display text-lg font-bold text-cream">
                  {wt.name}
                </h4>
                <span
                  className={`font-label text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 ${
                    wt.aiRelationship === "AI-PROOF"
                      ? "bg-goldp text-gold"
                      : wt.aiRelationship === "AI-DOMINANT"
                      ? "bg-stone3 text-stone"
                      : "bg-ink3 text-cream3"
                  }`}
                >
                  {wt.aiRelationship}
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={answers[wt.id] || 0}
                onChange={(e) =>
                  onUpdate(wt.id, Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))
                }
                className="w-20 bg-ink border border-rule px-3 py-2 text-cream font-label text-center focus:border-gold focus:outline-none"
              />
            </div>
            <p className="text-cream3 text-sm">{wt.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Section 3: Decision Taxonomy
function Section3Taxonomy({
  answers,
  onUpdate,
}: {
  answers: Record<string, number>;
  onUpdate: (key: string, value: number) => void;
}) {
  const section = fullDiagnosticSections.section3;
  const total = Object.values(answers).reduce((sum, val) => sum + (val || 0), 0);

  return (
    <div>
      <div className="mb-6 p-4 bg-ink2 border border-rule">
        <p className="font-label text-[10px] text-stone uppercase tracking-[0.1em] mb-1">
          Distribute your last 10 meaningful decisions
        </p>
        <p className={`font-display text-2xl font-bold ${total === 10 ? "text-gold" : "text-cream"}`}>
          Total: {total}/10
        </p>
      </div>

      <div className="space-y-6">
        {section.decisionTypes.map((dt) => (
          <div key={dt.id} className="border-b border-rule2 pb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-display text-lg font-bold text-cream">
                  {dt.name}
                </h4>
                <span className="font-label text-[9px] uppercase tracking-[0.1em] text-stone">
                  {dt.aiCompression}
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="10"
                value={answers[dt.id] || 0}
                onChange={(e) =>
                  onUpdate(dt.id, Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))
                }
                className="w-20 bg-ink border border-rule px-3 py-2 text-cream font-label text-center focus:border-gold focus:outline-none"
              />
            </div>
            <p className="text-cream3 text-sm">{dt.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Section 4: Rating Statements
function Section4Ratings({
  answers,
  onUpdate,
}: {
  answers: Record<string, number>;
  onUpdate: (key: string, value: number) => void;
}) {
  const section = fullDiagnosticSections.section4;

  return (
    <div className="space-y-8">
      {section.statements.map((stmt) => (
        <div key={stmt.id} className="border-b border-rule2 pb-8">
          <p className="text-cream leading-relaxed mb-2">{stmt.text}</p>
          <p className="font-label text-[9px] text-stone uppercase tracking-[0.1em] mb-4">
            Measures: {stmt.measures}
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onUpdate(stmt.id, rating)}
                className={`flex-1 py-3 border transition-all font-label text-sm ${
                  answers[stmt.id] === rating
                    ? "border-gold bg-goldp text-gold"
                    : "border-rule text-cream2 hover:border-goldb"
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-label text-[9px] text-stone">Rarely true</span>
            <span className="font-label text-[9px] text-stone">Almost always true</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Section 5: Compression Exposure
function Section5Compression({
  answers,
  onUpdate,
}: {
  answers: Record<string, number>;
  onUpdate: (key: string, value: number) => void;
}) {
  const section = fullDiagnosticSections.section5;
  const total = Object.values(answers).reduce((sum, val) => sum + (val || 0), 0);

  return (
    <div>
      <div className="mb-6 p-4 bg-ink2 border border-rule">
        <p className="font-label text-[10px] text-stone uppercase tracking-[0.1em] mb-1">
          {section.instruction}
        </p>
        <p className={`font-display text-2xl font-bold ${total === 100 ? "text-gold" : "text-cream"}`}>
          Total: {total}%
        </p>
      </div>

      <div className="space-y-6">
        {section.categories.map((cat) => (
          <div key={cat.id} className="border-b border-rule2 pb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-grow pr-4">
                <h4 className="font-display text-base font-bold text-cream">
                  {cat.name}
                </h4>
                <span className="font-label text-[9px] uppercase tracking-[0.1em] text-stone">
                  Compression coefficient: {cat.coefficient}%
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={answers[cat.id] || 0}
                onChange={(e) =>
                  onUpdate(cat.id, Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))
                }
                className="w-20 bg-ink border border-rule px-3 py-2 text-cream font-label text-center focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Section 6: Direction Questions
function Section6Direction({
  answers,
  onUpdate,
}: {
  answers: Record<string, number>;
  onUpdate: (key: string, value: number) => void;
}) {
  const section = fullDiagnosticSections.section6;

  return (
    <div className="space-y-8">
      {section.questions.map((q) => (
        <div key={q.id} className="border-b border-rule2 pb-8">
          <h3 className="font-display text-lg font-bold text-cream mb-4">
            {q.question}
          </h3>
          <div className="space-y-2">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => onUpdate(q.id, opt.points)}
                className={`w-full text-left p-4 border transition-all ${
                  answers[q.id] === opt.points
                    ? "border-gold bg-goldp"
                    : "border-rule hover:border-goldb"
                }`}
              >
                <span
                  className={`font-label text-sm ${
                    answers[q.id] === opt.points ? "text-gold" : "text-stone"
                  }`}
                >
                  {opt.label}.
                </span>{" "}
                <span
                  className={
                    answers[q.id] === opt.points ? "text-cream" : "text-cream2"
                  }
                >
                  {opt.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
