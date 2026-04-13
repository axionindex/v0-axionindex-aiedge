'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { AIEdgeFooter } from '@/components/ai-edge-footer';
import intelligenceData from '@/data/intelligence-data.json';

export default function LabourCodesPage() {
  const [activePageTab, setActivePageTab] = useState('overview');
  const [activeDecisionTab, setActiveDecisionTab] = useState('quickLookup');
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleString('en-IN'));
  const [classificationAnswers, setClassificationAnswers] = useState<number[]>([]);
  const [classificationResult, setClassificationResult] = useState<string | null>(null);

  useEffect(() => {
    const refreshTimer = setInterval(() => {
      setLastRefresh(new Date().toLocaleString('en-IN'));
    }, 3600000);

    return () => clearInterval(refreshTimer);
  }, []);

  const handleClassificationAnswer = (index: number, score: number) => {
    const newAnswers = [...classificationAnswers];
    newAnswers[index] = score;
    setClassificationAnswers(newAnswers);

    if (newAnswers.length === 6 && newAnswers.every(a => a > 0)) {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      if (total >= 16) setClassificationResult('Direct Employee');
      else if (total >= 10) setClassificationResult('Contingent Worker');
      else setClassificationResult('Genuine Consultant');
    }
  };

  const stats = intelligenceData.stats;
  const daysSince = Math.floor((Date.now() - new Date('2025-11-21').getTime()) / (1000 * 60 * 60 * 24));
  const dt = intelligenceData.decisionTools;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f2ec]">
      <Navigation />

      {/* Live Status Strip */}
      <div className="fixed top-[72px] left-0 right-0 bg-[#0a0a0a] border-b border-[#c9a84c]/20 py-2 px-4 z-40 text-xs tracking-widest">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#c9a84c] rounded-full animate-pulse"></span>
              <span className="text-[#c9a84c]">{stats.codesInForce.value} Codes Live</span>
            </div>
            <div className="text-[#f5f2ec]/40 hidden sm:block">
              {stats.statesFinalized.value} States Finalized • {daysSince} Days Since
            </div>
          </div>
          <div className="text-[#f5f2ec]/30 text-[10px]">
            UPDATED {intelligenceData.meta.lastUpdated.split('T')[0]}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-28 max-w-7xl mx-auto px-4 py-12 border-b border-[#c9a84c]/10">
        <h1 className="text-5xl sm:text-6xl font-light leading-tight mb-6 font-serif">
          The System Reset of Employment in India
        </h1>
        <p className="text-lg text-[#f5f2ec]/60 max-w-3xl font-light leading-relaxed">
          Navigate the four labour codes with decision intelligence, compliance triggers, and implementation playbooks. Get curated analysis of every ambiguity, state variation, and decision point.
        </p>
      </div>

      {/* Page Nav Tabs */}
      <div className="sticky top-[106px] bg-[#0a0a0a]/95 backdrop-blur border-b border-[#c9a84c]/10 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {['overview', 'decision-tools', 'explore'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePageTab(tab)}
                className={`py-4 px-1 text-sm tracking-widest uppercase font-light border-b-2 transition-all whitespace-nowrap ${
                  activePageTab === tab
                    ? 'border-[#c9a84c] text-[#c9a84c]'
                    : 'border-transparent text-[#f5f2ec]/40 hover:text-[#f5f2ec]/60'
                }`}
              >
                {tab === 'decision-tools' ? 'Decision Tools' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* OVERVIEW TAB */}
        {activePageTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Codes in Force', value: stats.codesInForce.value },
                { label: 'Laws Replaced', value: stats.lawsReplaced.value },
                { label: 'States Finalized', value: stats.statesFinalized.value },
                { label: 'Days Since', value: daysSince },
              ].map((stat, i) => (
                <div key={i} className="bg-[#0f0f0f] border-l-2 border-[#c9a84c]/40 p-4">
                  <div className="text-xs text-[#f5f2ec]/40 tracking-widest uppercase mb-2">{stat.label}</div>
                  <div className="text-4xl font-light text-[#f5f2ec]">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* What Changed */}
            <div className="mb-12">
              <h2 className="text-2xl font-light mb-6 border-b border-[#c9a84c]/20 pb-4">What Changed</h2>
              <div className="space-y-3">
                {intelligenceData.recentChanges.changes.slice(0, 4).map((change: any, i: number) => (
                  <div key={i} className="bg-[#0f0f0f] border-l-2 border-[#c9a84c]/30 p-4 hover:border-[#c9a84c]/60 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-light text-[#f5f2ec]">{change.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        change.priority === 'high' ? 'bg-[#c9a84c]/20 text-[#c9a84c]' : 'bg-[#c9a84c]/10 text-[#c9a84c]/60'
                      }`}>
                        {change.priority}
                      </span>
                    </div>
                    <p className="text-sm text-[#f5f2ec]/60 mb-2">{change.description}</p>
                    <div className="flex justify-between items-center text-xs text-[#f5f2ec]/40">
                      <span>{change.source}</span>
                      <span>{change.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* DECISION TOOLS TAB */}
        {activePageTab === 'decision-tools' && (
          <>
            {/* Tool Selection */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {['quickLookup', 'roleGuide', 'strategicDecisions', 'triggerEngine', 'classificationTest', 'stateTracker', 'clarifications', 'greyAreas'].map((tool) => (
                <button
                  key={tool}
                  onClick={() => setActiveDecisionTab(tool)}
                  className={`px-4 py-2 text-xs tracking-widest whitespace-nowrap border transition-all ${
                    activeDecisionTab === tool
                      ? 'bg-[#c9a84c] text-[#0a0a0a]'
                      : 'border-[#c9a84c]/30 text-[#f5f2ec]/60 hover:border-[#c9a84c]/60'
                  }`}
                >
                  {tool === 'quickLookup' ? 'Quick Lookup' : tool === 'roleGuide' ? 'Role Guide' : tool === 'strategicDecisions' ? 'Strategic' : tool === 'triggerEngine' ? 'Triggers' : tool === 'classificationTest' ? 'Classification' : tool === 'stateTracker' ? 'States' : tool === 'clarifications' ? 'Clarifications' : 'Grey Areas'}
                </button>
              ))}
            </div>

            {/* Tool Content */}
            <div className="bg-[#0f0f0f] border border-[#c9a84c]/20 p-6">
              <h2 className="text-2xl font-light mb-4">{dt[activeDecisionTab as keyof typeof dt].title}</h2>
              <p className="text-[#f5f2ec]/60 mb-6">{dt[activeDecisionTab as keyof typeof dt].description}</p>

              {/* Quick Lookup */}
              {activeDecisionTab === 'quickLookup' && (
                <div className="space-y-3">
                  {dt.quickLookup.data.map((item: any) => (
                    <div key={item.id} className="bg-[#0a0a0a] p-4 border-l-2 border-[#c9a84c]/30">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-light text-[#c9a84c]">{item.keyword}</h3>
                        <span className="text-xs text-[#c9a84c]/60">{item.code}</span>
                      </div>
                      <p className="text-sm text-[#f5f2ec]/60 mb-2">{item.definition}</p>
                      <div className="text-xs text-[#f5f2ec]/40 space-y-1">
                        <p><strong>Requirement:</strong> {item.requirement}</p>
                        <p><strong>Source:</strong> {item.source}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Role Guide */}
              {activeDecisionTab === 'roleGuide' && (
                <div className="space-y-4">
                  {dt.roleGuide.roles.map((role: any) => (
                    <div key={role.id} className="bg-[#0a0a0a] p-4 border-l-2 border-[#c9a84c]/30">
                      <h3 className="font-light text-[#c9a84c] mb-2">{role.role}</h3>
                      <p className="text-xs text-[#f5f2ec]/40 mb-3">{role.responsibility}</p>
                      <ul className="text-sm text-[#f5f2ec]/60 space-y-1">
                        {role.keyPoints.map((point: string, idx: number) => (
                          <li key={idx}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Strategic Decisions */}
              {activeDecisionTab === 'strategicDecisions' && (
                <div className="space-y-4">
                  {dt.strategicDecisions.decisions.map((dec: any) => (
                    <div key={dec.id} className="bg-[#0a0a0a] p-4 border-l-2 border-[#c9a84c]/30">
                      <h3 className="font-light text-[#c9a84c] mb-2">{dec.title}</h3>
                      <div className="text-xs text-[#f5f2ec]/40 mb-3 space-x-4">
                        <span>Impact: {dec.impact}</span>
                        <span>Timeline: {dec.timeline}</span>
                      </div>
                      <p className="text-sm text-[#f5f2ec]/60 mb-3">{dec.description}</p>
                      <p className="text-xs text-[#c9a84c]/70"><strong>Recommendation:</strong> {dec.recommendation}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Trigger Engine */}
              {activeDecisionTab === 'triggerEngine' && (
                <div className="space-y-4">
                  {dt.triggerEngine.triggers.map((trigger: any) => (
                    <div key={trigger.id} className="bg-[#0a0a0a] p-4 border-l-2 border-[#c9a84c]/30">
                      <h3 className="font-light text-[#c9a84c] mb-2">{trigger.trigger}</h3>
                      <div className="text-sm text-[#f5f2ec]/60 space-y-1">
                        <p><strong>Threshold:</strong> {trigger.threshold}</p>
                        <p><strong>Amount:</strong> {trigger.amount}</p>
                        <p><strong>Code:</strong> {trigger.code}</p>
                        <p><strong>Action:</strong> {trigger.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Classification Test */}
              {activeDecisionTab === 'classificationTest' && (
                <div className="space-y-4">
                  {[
                    'Fixed salary/monthly remuneration?',
                    'Defined workday and location?',
                    'Tools/equipment provided?',
                    'Supervised by employer?',
                    'Ongoing 3+ months?',
                    'Works primarily for you?',
                  ].map((q, i) => (
                    <div key={i} className="bg-[#0a0a0a] p-4 border-l-2 border-[#c9a84c]/30">
                      <p className="text-sm text-[#f5f2ec]/60 mb-3">{i + 1}. {q}</p>
                      <div className="flex gap-2">
                        {[
                          { score: 1, label: 'No' },
                          { score: 2, label: 'Maybe' },
                          { score: 3, label: 'Yes' },
                        ].map(({ score, label }) => (
                          <button
                            key={score}
                            onClick={() => handleClassificationAnswer(i, score)}
                            className={`px-3 py-1 text-xs border rounded transition-all ${
                              classificationAnswers[i] === score
                                ? 'bg-[#c9a84c] text-[#0a0a0a] border-[#c9a84c]'
                                : 'border-[#c9a84c]/30 text-[#f5f2ec]/60 hover:border-[#c9a84c]/60'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {classificationResult && (
                    <div className="bg-[#0a0a0a] p-4 border-l-2 border-[#c9a84c] mt-4">
                      <p className="text-xs text-[#c9a84c]/70 mb-1">CLASSIFICATION</p>
                      <p className="text-lg font-light text-[#c9a84c]">{classificationResult}</p>
                    </div>
                  )}
                </div>
              )}

              {/* State Tracker */}
              {activeDecisionTab === 'stateTracker' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[#c9a84c]/20">
                        <th className="text-left py-3 px-4 text-[#f5f2ec]/40 tracking-widest">State</th>
                        <th className="text-left py-3 px-4 text-[#f5f2ec]/40 tracking-widest">Wage</th>
                        <th className="text-left py-3 px-4 text-[#f5f2ec]/40 tracking-widest">IR</th>
                        <th className="text-left py-3 px-4 text-[#f5f2ec]/40 tracking-widest">SS</th>
                        <th className="text-left py-3 px-4 text-[#f5f2ec]/40 tracking-widest">OSH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {intelligenceData.stateTracker.states.map((state: any) => (
                        <tr key={state.name} className="border-b border-[#c9a84c]/10 hover:bg-[#c9a84c]/5">
                          <td className="py-3 px-4 text-[#f5f2ec]/60">{state.name}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded ${
                              state.wageCode.status === 'final' ? 'bg-[#c9a84c]/20 text-[#c9a84c]' : 'bg-[#c9a84c]/10 text-[#c9a84c]/60'
                            }`}>
                              {state.wageCode.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded ${
                              state.irCode.status === 'final' ? 'bg-[#c9a84c]/20 text-[#c9a84c]' : 'bg-[#c9a84c]/10 text-[#c9a84c]/60'
                            }`}>
                              {state.irCode.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded ${
                              state.ssCode.status === 'final' ? 'bg-[#c9a84c]/20 text-[#c9a84c]' : 'bg-[#c9a84c]/10 text-[#c9a84c]/60'
                            }`}>
                              {state.ssCode.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded ${
                              state.oshCode.status === 'final' ? 'bg-[#c9a84c]/20 text-[#c9a84c]' : 'bg-[#c9a84c]/10 text-[#c9a84c]/60'
                            }`}>
                              {state.oshCode.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Clarifications */}
              {activeDecisionTab === 'clarifications' && (
                <div className="space-y-4">
                  {intelligenceData.clarifications.items.map((item: any) => (
                    <div key={item.id} className="bg-[#0a0a0a] p-4 border-l-2 border-[#c9a84c]/30">
                      <h3 className="font-light text-[#c9a84c] mb-2">{item.title}</h3>
                      <p className="text-xs text-[#f5f2ec]/40 mb-2"><strong>Q:</strong> {item.question}</p>
                      <p className="text-sm text-[#f5f2ec]/60 mb-3"><strong>A:</strong> {item.answer}</p>
                      <div className="text-xs text-[#c9a84c]/70">
                        {item.actionItems?.length > 0 && (
                          <>
                            <strong>Actions:</strong>
                            <ul className="mt-1 space-y-1">
                              {item.actionItems.map((a: string, i: number) => (
                                <li key={i}>→ {a}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Grey Areas */}
              {activeDecisionTab === 'greyAreas' && (
                <div className="space-y-4">
                  {intelligenceData.greyAreas.items.map((item: any) => (
                    <div key={item.id} className="bg-[#0a0a0a] p-4 border-l-2 border-[#c9a84c]/30">
                      <h3 className="font-light text-[#c9a84c] mb-2">{item.title}</h3>
                      <p className="text-xs text-[#f5f2ec]/40 mb-3">{item.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="border-l border-[#c9a84c]/20 pl-3">
                          <p className="text-[#c9a84c]/70 mb-1"><strong>Government</strong></p>
                          <p className="text-[#f5f2ec]/60">{item.governmentPosition.stance}</p>
                        </div>
                        <div className="border-l border-[#c9a84c]/20 pl-3">
                          <p className="text-[#c9a84c]/70 mb-1"><strong>Legal</strong></p>
                          <p className="text-[#f5f2ec]/60">{item.legalConsensus.stance}</p>
                        </div>
                        <div className="border-l border-[#c9a84c]/20 pl-3">
                          <p className="text-[#c9a84c]/70 mb-1"><strong>Axion</strong></p>
                          <p className="text-[#f5f2ec]/60">{item.axionView.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* EXPLORE TAB */}
        {activePageTab === 'explore' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#0f0f0f] border border-[#c9a84c]/20 p-6">
              <h2 className="text-xl font-light mb-4">State Implementation</h2>
              <div className="space-y-2 text-sm">
                {intelligenceData.stateTracker.states.slice(0, 10).map((state: any) => (
                  <div key={state.name} className="flex justify-between text-[#f5f2ec]/60">
                    <span>{state.name}</span>
                    <span className={state.overall === 'final' ? 'text-[#c9a84c]' : 'text-[#f5f2ec]/40'}>
                      {state.overall}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f0f0f] border border-[#c9a84c]/20 p-6">
              <h2 className="text-xl font-light mb-4">Key Metrics</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-[#f5f2ec]/40 text-xs mb-1">Implementation Progress</p>
                  <div className="w-full bg-[#0a0a0a] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#c9a84c] h-full"
                      style={{ width: `${(intelligenceData.stateTracker.states.filter((s: any) => s.overall === 'final').length / intelligenceData.stateTracker.states.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#f5f2ec]/60 mt-2">
                    {intelligenceData.stateTracker.states.filter((s: any) => s.overall === 'final').length} of {intelligenceData.stateTracker.states.length} states finalized
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Last Updated Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-t border-[#c9a84c]/10 text-xs text-[#f5f2ec]/40 tracking-widest">
        <p>Data last refreshed: {lastRefresh}</p>
        <p className="mt-1">Auto-refresh: Every 1 hour | Data accuracy verified by Axion Index Editorial Team</p>
      </div>

      <AIEdgeFooter />
    </div>
  );
}
