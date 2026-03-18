"use client";

import { useState } from "react";
import { quickMirrorQuestions } from "@/lib/assessment-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuickMirrorAssessmentProps {
  onComplete: (answers: Record<number, number>) => void;
}

export function QuickMirrorAssessment({
  onComplete,
}: QuickMirrorAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = quickMirrorQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quickMirrorQuestions.length) * 100;
  const isLastQuestion = currentQuestion === quickMirrorQuestions.length - 1;
  const hasAnswer = answers[question.id] !== undefined;

  const handleSelect = (points: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: points }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label text-[10px] text-stone uppercase tracking-[0.15em]">
            Question {currentQuestion + 1} of {quickMirrorQuestions.length}
          </span>
          <span className="font-label text-[10px] text-gold uppercase tracking-[0.15em]">
            {question.dimension}
          </span>
        </div>
        <div className="h-[2px] bg-stone3">
          <div
            className="h-full bg-gold transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question instruction (if any) */}
      {"instruction" in question && question.instruction && (
        <div className="mb-6 p-4 bg-goldp border border-goldb">
          <p className="font-label text-[10px] text-gold uppercase tracking-[0.1em]">
            {question.instruction}
          </p>
        </div>
      )}

      {/* Question */}
      <div className="mb-10">
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-cream leading-tight text-balance">
          {question.question}
        </h2>
        <p className="mt-3 text-cream3 text-sm italic">
          {question.whyThisQuestion}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-10">
        {question.options.map((option) => (
          <button
            key={option.label}
            onClick={() => handleSelect(option.points)}
            className={`w-full text-left p-5 border transition-all ${
              answers[question.id] === option.points
                ? "border-gold bg-goldp"
                : "border-rule hover:border-goldb"
            }`}
          >
            <div className="flex items-start gap-4">
              <span
                className={`font-label text-sm font-medium ${
                  answers[question.id] === option.points
                    ? "text-gold"
                    : "text-stone"
                }`}
              >
                {option.label}
              </span>
              <div className="flex-grow">
                <p
                  className={`${
                    answers[question.id] === option.points
                      ? "text-cream"
                      : "text-cream2"
                  }`}
                >
                  {option.text}
                </p>
                <p className="mt-1 font-label text-[9px] text-stone uppercase tracking-[0.1em]">
                  {option.signal}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center gap-2 px-4 py-2 font-label text-[10px] uppercase tracking-[0.15em] transition-colors ${
            currentQuestion === 0
              ? "text-stone2 cursor-not-allowed"
              : "text-cream2 hover:text-gold"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!hasAnswer}
          className={`flex items-center gap-2 px-6 py-3 font-label text-[11px] uppercase tracking-[0.15em] transition-colors ${
            hasAnswer
              ? "bg-gold text-ink hover:bg-gold2"
              : "bg-stone3 text-stone cursor-not-allowed"
          }`}
        >
          {isLastQuestion ? "See Results" : "Next"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
