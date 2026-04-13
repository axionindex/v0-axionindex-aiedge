"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { AIEdgeFooter } from "@/components/ai-edge-footer";
import { useIntelligence } from "@/hooks/useIntelligence";
import { DataStatusBar } from "@/components/data-status-bar";
import { DynamicStatsGrid } from "@/components/dynamic-stats";
import { WhatChanged } from "@/components/what-changed";
import { TruthLayer } from "@/components/truth-layer";
import { LoadingState, ErrorState, StatusBadge, SourceCitation, VerifiedTimestamp } from "@/components/intelligence-badges";
import { getCountByStatus, formatDate } from "@/lib/intelligence";

export default function LabourCodesPage() {
  const { data, loading, error, retry } = useIntelligence();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [triggerFormData, setTriggerFormData] = useState({
    employees: "",
    contractors: "",
    women: "",
    sector: "",
    state: "",
    establishment: "",
  });
  const [classificationAnswers, setClassificationAnswers] = useState<number[]>([]);
  const [classificationResult, setClassificationResult] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClassificationAnswer = (questionIndex: number, score: number) => {
    const newAnswers = [...classificationAnswers];
    newAnswers[questionIndex] = score;
    setClassificationAnswers(newAnswers);

    if (newAnswers.length === 6 && newAnswers.every((a) => a > 0)) {
      const totalScore = newAnswers.reduce((a, b) => a + b, 0);
      if (totalScore >= 16) {
        setClassificationResult("Direct Employee");
      } else if (totalScore >= 10) {
        setClassificationResult("Contingent Worker");
      } else {
        setClassificationResult("Genuine Consultant");
      }
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
        <Navigation />
        <div className="pt-24 max-w-7xl mx-auto px-4">
          <LoadingState message="Loading Labour Codes intelligence..." />
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
        <Navigation />
        <div className="pt-24 max-w-7xl mx-auto px-4">
          <ErrorState error={error} onRetry={retry} />
        </div>
      </div>
    );
  }

  const stats = data?.stats;
  const stateTracker = data?.stateTracker;
  const greyAreas = data?.greyAreas;
  const clarifications = data?.clarifications;
  const recentChanges = data?.recentChanges;

  const statesFinalized = stateTracker ? getCountByStatus(stateTracker.states, 'final') : 0;
  const statesDraft = stateTracker ? getCountByStatus(stateTracker.states, 'draft') : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pt-12">
      {/* Data Status Bar */}
      {data?.meta && (
        <DataStatusBar
          lastUpdated={data.meta.lastUpdated}
          lastVerified={data.meta.lastVerified}
          dataSource={data.meta.dataSource}
        />
      )}

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="mb-16">
          <div className="mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-300/70">
              Intelligence Dashboard
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-100 mb-4 max-w-3xl">
            The System Reset of Employment in India
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Real-time intelligence on India's four labour codes, state implementation status, and regulatory clarity.
          </p>
        </div>

        {/* Dynamic Stats */}
        {stats && (
          <div className="mb-16">
            <DynamicStatsGrid stats={stats} lastVerified={data?.meta.lastVerified} />
          </div>
        )}

        {/* What Changed Section */}
        {recentChanges?.changes && (
          <div className="mb-16">
            <div className="mb-6">
              <h2 className="font-serif text-3xl font-bold text-gray-100 mb-2">What Changed</h2>
              <p className="text-gray-400">Recent updates, clarifications, and signals</p>
            </div>
            <WhatChanged changes={recentChanges.changes} days={30} />
          </div>
        )}

        {/* Live Status Strip */}
        {stateTracker && (
          <div className="mb-16 bg-gradient-to-r from-green-900/20 to-transparent border border-green-500/20 rounded-lg p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-green-300/70 mb-4">
              State Implementation Status
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-mono font-bold text-green-300">{statesFinalized}</div>
                <div className="text-sm text-gray-400">States Finalized</div>
              </div>
              <div>
                <div className="text-3xl font-mono font-bold text-amber-300">{statesDraft}</div>
                <div className="text-sm text-gray-400">States in Draft</div>
              </div>
              <div>
                <div className="text-3xl font-mono font-bold text-gray-300">{stateTracker.states?.length || 0}</div>
                <div className="text-sm text-gray-400">Total States Tracked</div>
              </div>
            </div>
          </div>
        )}

        {/* Decision Tools Tabs */}
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="font-serif text-3xl font-bold text-gray-100 mb-2">Decision Tools</h2>
            <p className="text-gray-400">Navigate compliance with data-backed intelligence</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-gray-700/50">
            {[
              "Clarifications",
              "Grey Areas",
              "State Tracker",
              "Trigger Engine",
              "Classification Test",
            ].map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`font-mono text-xs uppercase tracking-widest px-4 py-3 whitespace-nowrap transition-colors ${
                  activeTab === idx
                    ? "text-amber-300 border-b-2 border-amber-500"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Clarifications Tab */}
            {activeTab === 0 && clarifications?.items && (
              <div className="space-y-6">
                {clarifications.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="border border-gray-700/50 rounded-lg p-6 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h4 className="font-serif text-xl text-gray-200">{item.title}</h4>
                      <StatusBadge status={item.status} size="sm" />
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-700/30">
                      <p className="text-sm text-amber-300/70 font-mono mb-2">Question</p>
                      <p className="text-gray-300">{item.question}</p>
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-700/30">
                      <p className="text-sm text-green-300/70 font-mono mb-2">Answer</p>
                      <p className="text-gray-300">{item.answer}</p>
                    </div>

                    {item.sources && (
                      <div className="mb-4 pb-4 border-b border-gray-700/30">
                        <p className="text-sm text-gray-400/70 font-mono mb-3">Sources</p>
                        <div className="space-y-2">
                          {item.sources.map((source: any, idx: number) => (
                            <SourceCitation
                              key={idx}
                              name={source.name}
                              type={source.type}
                              date={source.date}
                              url={source.url}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {item.actionItems && (
                      <div className="mb-4 pb-4 border-b border-gray-700/30">
                        <p className="text-sm text-amber-300/70 font-mono mb-3">Action Items</p>
                        <ul className="space-y-2">
                          {item.actionItems.map((action: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                              <span className="text-amber-500 mt-1">→</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.lastVerified && <VerifiedTimestamp date={item.lastVerified} />}
                  </div>
                ))}
              </div>
            )}

            {/* Grey Areas Tab */}
            {activeTab === 1 && greyAreas?.items && (
              <div className="space-y-6">
                {greyAreas.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="border border-gray-700/50 rounded-lg p-6 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h4 className="font-serif text-xl text-gray-200">{item.title}</h4>
                      <StatusBadge status={item.status} size="sm" />
                    </div>

                    <p className="text-sm text-amber-300/70 font-mono mb-2">Question</p>
                    <p className="text-gray-300 mb-6">{item.question}</p>

                    <TruthLayer
                      governmentPosition={item.governmentPosition}
                      legalConsensus={item.legalConsensus}
                      axionView={item.axionView}
                      verified={item.lastVerified}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* State Tracker Tab */}
            {activeTab === 2 && stateTracker?.states && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700/50">
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-gray-400">
                          State
                        </th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-gray-400">
                          Wage Code
                        </th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-gray-400">
                          IR Code
                        </th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-gray-400">
                          SS Code
                        </th>
                        <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-widest text-gray-400">
                          OSH Code
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stateTracker.states.map((state: any) => (
                        <tr key={state.name} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors">
                          <td className="py-4 px-4 font-mono text-gray-300">{state.name}</td>
                          <td className="py-4 px-4">
                            <StatusBadge status={state.wageCode.status} size="sm" />
                          </td>
                          <td className="py-4 px-4">
                            <StatusBadge status={state.irCode.status} size="sm" />
                          </td>
                          <td className="py-4 px-4">
                            <StatusBadge status={state.ssCode.status} size="sm" />
                          </td>
                          <td className="py-4 px-4">
                            <StatusBadge status={state.oshCode.status} size="sm" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Trigger Engine Tab */}
            {activeTab === 3 && (
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 space-y-4">
                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    value={triggerFormData.employees}
                    onChange={(e) =>
                      setTriggerFormData({
                        ...triggerFormData,
                        employees: e.target.value,
                      })
                    }
                    className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-gray-300 text-sm"
                    placeholder="Enter number of employees"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">
                    Sector
                  </label>
                  <select
                    value={triggerFormData.sector}
                    onChange={(e) =>
                      setTriggerFormData({
                        ...triggerFormData,
                        sector: e.target.value,
                      })
                    }
                    className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-gray-300 text-sm"
                  >
                    <option value="">Select sector</option>
                    <option value="tech">Technology</option>
                    <option value="retail">Retail</option>
                    <option value="mfg">Manufacturing</option>
                  </select>
                </div>
                <div className="pt-4 text-sm text-gray-400">
                  <p>Configure your organization profile to see compliance triggers.</p>
                </div>
              </div>
            )}

            {/* Classification Test Tab */}
            {activeTab === 4 && (
              <div className="space-y-6">
                <div className="text-sm text-gray-400 mb-4">
                  <p>Answer 6 questions to determine worker classification</p>
                </div>
                <div className="space-y-4">
                  {[
                    "Is the worker on a fixed salary/monthly remuneration?",
                    "Does the worker have a defined workday and location?",
                    "Is the worker provided with tools/equipment?",
                    "Can the worker be supervised by the employer?",
                    "Is the relationship ongoing for 3+ months?",
                    "Does the worker work primarily for you?",
                  ].map((q, idx) => (
                    <div key={idx} className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
                      <p className="text-sm font-mono text-gray-400 mb-3">Question {idx + 1}</p>
                      <p className="text-gray-300 mb-4">{q}</p>
                      <div className="flex gap-2">
                        {[1, 2, 3].map((score) => (
                          <button
                            key={score}
                            onClick={() => handleClassificationAnswer(idx, score)}
                            className={`px-3 py-2 text-sm font-mono rounded transition-colors ${
                              classificationAnswers[idx] === score
                                ? "bg-amber-900/40 border border-amber-500/50 text-amber-300"
                                : "bg-gray-900/40 border border-gray-700/50 text-gray-400 hover:border-gray-600/50"
                            }`}
                          >
                            {score === 1 ? "No" : score === 2 ? "Maybe" : "Yes"}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {classificationResult && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 mt-6">
                    <p className="text-sm text-green-300/70 font-mono mb-2">Classification Result</p>
                    <p className="text-xl font-serif text-green-300">{classificationResult}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-16 bg-gradient-to-r from-amber-900/20 to-transparent border border-amber-500/20 rounded-lg p-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-100 mb-4">
            Ready for Compliance?
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Use our decision tools, clarification library, and real-time state tracker to navigate the labour code landscape with confidence.
          </p>
          <button className="px-6 py-3 bg-amber-900/40 border border-amber-500/50 text-amber-300 hover:bg-amber-900/50 rounded-lg font-mono text-sm uppercase transition-colors">
            Run Readiness Check
          </button>
        </div>
      </div>

      <AIEdgeFooter />
    </div>
  );
}
