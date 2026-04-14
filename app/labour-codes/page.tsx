'use client';

import { useState, useMemo } from 'react';
import { Navigation } from '@/components/navigation';
import { AIEdgeFooter } from '@/components/ai-edge-footer';
import { ContentLabel } from '@/components/labour-codes/content-label';
import { SourceCitation } from '@/components/labour-codes/source-citation';
import { ComparisonGrid } from '@/components/labour-codes/comparison-grid';
import { GreyAreaCard } from '@/components/labour-codes/grey-area-card';
import { TriggerResult } from '@/components/labour-codes/trigger-result';
import { IntelPanel } from '@/components/labour-codes/intel-panel';
import { LiveTicker } from '@/components/labour-codes/live-ticker';
import { ShowcaseBanner } from '@/components/labour-codes/showcase-banner';
import { LabourCodesHero } from '@/components/labour-codes/hero';
import { ConsolidationArchitecture } from '@/components/labour-codes/consolidation-architecture';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function LabourCodesPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [triggerResults, setTriggerResults] = useState<any>(null);
  const [classificationAnswers, setClassificationAnswers] = useState<number[]>([]);
  const [classificationResult, setClassificationResult] = useState<string | null>(null);

  const handleClassificationAnswer = (index: number, score: number) => {
    const newAnswers = [...classificationAnswers];
    newAnswers[index] = score;
    setClassificationAnswers(newAnswers);

    if (newAnswers.length === 6 && newAnswers.every((a) => a > 0)) {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      if (total >= 11) setClassificationResult('Direct Employee');
      else if (total >= 7) setClassificationResult('Contingent Worker');
      else setClassificationResult('Genuine Consultant');
    }
  };

  const clarifications = [
    {
      id: '50-wage-rule',
      label: '50% Wage Rule',
      status: 'resolved',
      question: 'Does performance bonus count toward the 50% basic rule?',
      answer: 'Yes, if guaranteed and predictable. Discretionary bonuses do not count.',
      legal: '"Remuneration" under SS Code §2(u) includes all payments',
      formula: 'Basic + DA ≥ 50% × (Basic + DA + Variable + Bonus + Other)',
      risks: [
        'Incorrect CTC breakup may trigger PF/ESI disputes',
        'State wage boards may interpret differently',
        'May affect gratuity and severance calculations',
      ],
      source: 'MoL&E FAQ, Checked: 01 Apr 2026, High',
    },
    {
      id: 'it-worker',
      label: 'IT Worker Status',
      status: 'unresolved',
      question: 'Are IT employees exempt from standing orders?',
      answer: 'No exemption issued. Standing orders apply if workers ≥ 300.',
      legal: 'IR Code §30 applies to all sectors without IT exemption',
      risks: ['Some states may grant exemptions', 'Litigation risk if not filed'],
      source: 'Ministry Clarification, Checked: 15 Mar 2026, Medium',
    },
    {
      id: 'fnf-timeline',
      label: 'FNF Timeline',
      status: 'partial',
      question: 'What is the deadline for final settlement?',
      answer: 'Full FNF should be completed within 30 days of separation.',
      legal: 'Wages Code §4 mandates timely payment; IR Code §25 requires notification',
      risks: ['30-day rule is guidance, not statutory', 'State variations apply'],
      source: 'Multiple circulars, Checked: 08 Apr 2026, Medium',
    },
    {
      id: 'gratuity',
      label: 'Gratuity',
      status: 'resolved',
      question: 'Is gratuity calculation based on basic only?',
      answer: 'Yes. Gratuity = (Basic × 15 or 30) ÷ 26 × Years.',
      legal: 'Social Security Code §57(1) defines gratuity basis',
      formula: 'Gratuity = Basic × (15 or 30 days) ÷ 26 × Years Worked',
      risks: ['CTC models often incorrectly show gratuity as component'],
      source: 'SS Code Rules 2020, Checked: 01 Apr 2026, High',
    },
    {
      id: 'leave-accrual',
      label: 'Leave Accrual',
      status: 'resolved',
      question: 'Can leave be forfeited if not taken?',
      answer: 'Limited leaves can be forfeited with state permission. No forfeiture for sick/casual in most states.',
      legal: 'Wages Code §4(5) allows forfeiture only under state rules',
      risks: ['State-wise variation; audit focus area'],
      source: 'Wages Code Rules, Checked: 20 Mar 2026, High',
    },
  ];

  const greyAreas = [
    {
      title: 'IT Worker Classification',
      description: 'Whether IT employees qualify as workers',
      government: 'No exemption issued; standard rules apply',
      legal: 'Treat as employees; OT ambiguous',
      axion: 'Apply conservative interpretation; file standing orders if ≥300',
    },
    {
      title: 'Gratuity in CTC',
      description: 'Can gratuity be shown as CTC component?',
      government: 'Employer obligation per SS Code',
      legal: 'Should not be in CTC display',
      axion: 'Remove from CTC; accrue as liability',
    },
    {
      title: 'Recurring Incentives',
      description: 'Do guaranteed bonuses count in 50% test?',
      government: 'FAQ mentions ambiguously',
      legal: 'Include guaranteed variable',
      axion: 'Include if predictable; document policy',
    },
    {
      title: 'Remote Worker Jurisdiction',
      description: 'Which state code applies?',
      government: 'Employee work location',
      legal: 'Generally work location',
      axion: 'Apply strictest state; document in policy',
    },
    {
      title: 'Bonus Calculation Timing',
      description: 'When must bonus be paid?',
      government: 'Generally within 8 weeks',
      legal: 'Depends on company year-end',
      axion: 'Pay within 30 days of closure',
    },
    {
      title: 'Non-Compete Enforceability',
      description: 'Are non-competes valid under IR Code?',
      government: 'No position; courts decide',
      legal: 'Narrow scope: 6 months, 50km radius',
      axion: 'Avoid; focus on confidentiality',
    },
  ];

  return (
    <div className="min-h-screen bg-ink text-parchment" key="labour-codes-page-v2">
      <Navigation />

      {/* Live Ticker */}
      <LiveTicker />

      {/* Showcase Banner */}
      <ShowcaseBanner />

      {/* Live Status Strip */}
      <div className="bg-ink border-b border-gold-border">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs font-dm-mono">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
              Manually Updated
            </span>
          </div>
          <div className="text-mist">Last reviewed 01 Apr 2026 · 32/36 states finalized</div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="sticky top-0 z-30 bg-ink border-b border-gold-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {['overview', 'clarifications', 'readiness', 'cxo-guide', 'decision-tools'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 text-sm font-dm-mono tracking-wide border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-gold text-gold'
                    : 'border-transparent text-mist hover:text-parchment'
                }`}
              >
                {tab === 'cxo-guide' ? 'CXO Guide' : tab === 'decision-tools' ? 'Decision Tools' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {/* New Hero Section from Chunk 2 */}
            <LabourCodesHero />

            {/* New Consolidation Architecture from Chunk 2 */}
            <ConsolidationArchitecture />

            {/* What's New Section */}
            <div className="mb-16 mt-16">
              <div className="text-xl font-cormorant mb-6">What's New</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    type: 'Signal',
                    title: 'HP Finalizes All Rules',
                    desc: 'Himachal Pradesh completes rules across all four codes',
                    badge: 'Signal',
                    color: 'bg-green-dim text-green',
                  },
                  {
                    type: 'Update',
                    title: 'Performance Pay Clarity',
                    desc: 'MoLE indicates bonuses to be included in wages',
                    badge: 'Update',
                    color: 'bg-amber-dim text-amber',
                  },
                  {
                    type: 'Divergence',
                    title: 'State Variations',
                    desc: 'Karnataka extends consultation to June 2026',
                    badge: 'Divergence',
                    color: 'bg-rust-bg text-rust',
                  },
                  {
                    type: 'Action',
                    title: 'Non-Compete Ruling',
                    desc: 'Delhi HC clarifies non-compete principles',
                    badge: 'Action',
                    color: 'bg-gold/10 text-gold',
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-gold-border rounded-sm p-4 bg-ink3 hover:border-gold transition-colors">
                    <div className={`text-xs font-dm-mono tracking-wide mb-2 px-2 py-1 rounded w-fit ${item.color}`}>
                      {item.badge}
                    </div>
                    <h3 className="font-cormorant text-parchment mb-2 text-sm">{item.title}</h3>
                    <p className="text-xs text-mist">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Intel Panel */}
            <IntelPanel
              tabs={[
                {
                  id: 'faqs',
                  title: 'Live FAQs',
                  content: (
                    <div className="space-y-4">
                      <div className="p-4 border-l-4 border-gold">
                        <p className="text-sm font-dm-mono text-gold mb-2">Q: What % must be basic?</p>
                        <p className="text-parchment mb-2">A: At least 50% of remuneration must be basic+DA.</p>
                        <SourceCitation source="MoL&E FAQ" date="01 Apr 2026" confidence="High" />
                      </div>
                      <div className="p-4 border-l-4 border-amber">
                        <p className="text-sm font-dm-mono text-amber mb-2">Q: Does bonus count?</p>
                        <p className="text-parchment mb-2">A: Guaranteed bonuses count toward total; discretionary do not.</p>
                        <SourceCitation source="SS Code Rules" date="01 Apr 2026" confidence="High" />
                      </div>
                    </div>
                  ),
                },
                {
                  id: 'scenarios',
                  title: 'What If Scenarios',
                  content: (
                    <div className="space-y-4">
                      <div className="p-4 border-l-4 border-purple-500">
                        <p className="text-sm font-cormorant text-parchment mb-2">Scenario: Employee moves to new state</p>
                        <p className="text-sm text-mist">Apply rules of employee's new work location. Update in payroll and document change.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: 'grey-areas',
                  title: 'Grey Areas',
                  content: (
                    <div className="space-y-4">
                      <div className="p-4 border-l-4 border-rust">
                        <p className="text-sm font-dm-mono text-rust mb-2">Unresolved: IT Exemptions</p>
                        <p className="text-sm text-parchment">No sector exemption issued. Conservative approach: treat as standard.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: 'actions',
                  title: 'Priority Actions',
                  content: (
                    <ol className="space-y-3 list-decimal list-inside text-sm text-parchment">
                      <li>Validate wage structure against 50% rule</li>
                      <li>File Standing Orders if workers ≥ 300</li>
                      <li>Form statutory committees if thresholds crossed</li>
                      <li>Update leave and FNF policies</li>
                      <li>Document all edge cases in HR policies</li>
                    </ol>
                  ),
                },
                {
                  id: 'readiness',
                  title: 'Readiness Check',
                  content: (
                    <div className="space-y-3">
                      <div className="flex gap-3 text-sm">
                        <CheckCircle className="w-5 h-5 text-green flex-shrink-0" />
                        <span>Do you have a reviewed wage structure?</span>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <AlertTriangle className="w-5 h-5 text-amber flex-shrink-0" />
                        <span>Have you filed Standing Orders if required?</span>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <Clock className="w-5 h-5 text-rust flex-shrink-0" />
                        <span>Is your FNF process documented and tested?</span>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </>
        )}

        {/* CLARIFICATIONS TAB */}
        {activeTab === 'clarifications' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-8">
              {clarifications.map((c) => (
                <button key={c.id} className="px-3 py-2 text-xs font-dm-mono tracking-wide border border-gold-border rounded-sm hover:bg-ink3 transition-colors text-left">
                  {c.label}
                </button>
              ))}
            </div>

            {clarifications.map((c) => (
              <div key={c.id} className="border border-gold-border rounded-sm p-6 bg-ink3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-cormorant text-parchment">{c.label}</h3>
                  <ContentLabel type={c.status === 'resolved' ? 'fact' : c.status === 'partial' ? 'interpretation' : 'grey'} />
                </div>

                <div className="mb-4 pb-4 border-b border-gold-border">
                  <p className="text-sm text-mist font-dm-mono mb-1">QUESTION</p>
                  <p className="text-parchment">{c.question}</p>
                </div>

                <div className="mb-4 pb-4 border-b border-gold-border bg-green-dim rounded p-3">
                  <p className="text-sm text-green font-dm-mono mb-1">ANSWER</p>
                  <p className="text-parchment">{c.answer}</p>
                </div>

                <div className="mb-4 pb-4 border-b border-gold-border">
                  <p className="text-xs text-mist font-dm-mono mb-2">LEGAL BASIS</p>
                  <p className="text-sm text-parchment italic">{c.legal}</p>
                </div>

                {c.formula && (
                  <div className="mb-4">
                    <p className="text-xs text-mist font-dm-mono mb-2">FORMULA</p>
                    <div className="bg-ink4 p-4 rounded border border-gold-border font-dm-mono text-center text-parchment">{c.formula}</div>
                  </div>
                )}

                <div>
                  <p className="text-xs text-mist font-dm-mono mb-2">RISKS IF MISSED</p>
                  <ul className="space-y-1 text-sm text-parchment">
                    {c.risks.map((risk, i) => (
                      <li key={i}>• {risk}</li>
                    ))}
                  </ul>
                </div>

                <SourceCitation source={c.source.split(',')[0]} date={c.source.split(',')[1].trim()} confidence="High" />
              </div>
            ))}
          </div>
        )}

        {/* READINESS TAB */}
        {activeTab === 'readiness' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-cormorant">Org Readiness Framework</h2>

            {['Wage Structure', 'Leave Policy', 'Gratuity', 'Policies', 'Committees'].map((topic, i) => (
              <div key={i} className="border border-gold-border rounded-sm p-6 bg-ink3">
                <h3 className="text-lg font-cormorant mb-3">{topic}</h3>
                <p className="text-sm text-mist mb-4">Review and implement {topic.toLowerCase()} compliance</p>
                <div className="bg-ink p-4 rounded border border-gold-border text-sm text-parchment">
                  <p>Decision framework and implementation details coming soon.</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CXO GUIDE TAB */}
        {activeTab === 'cxo-guide' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-cormorant">CXO Role Guide</h2>
            <p className="text-mist mb-8">Strategic exposure points for each C-level role</p>

            {['CEO', 'CFO', 'CHRO', 'COO', 'CLO'].map((role, i) => (
              <div key={i} className="border border-gold-border rounded-sm p-6 bg-ink3">
                <h3 className="text-lg font-cormorant mb-4">{role}</h3>
                <div className="space-y-4">
                  <div className="bg-green-dim rounded p-3">
                    <p className="text-xs font-dm-mono text-green mb-2">OWNS</p>
                    <p className="text-sm text-parchment">{role}-specific strategic ownership areas</p>
                  </div>
                  <div className="bg-amber-dim rounded p-3">
                    <p className="text-xs font-dm-mono text-amber mb-2">SHOULD KNOW</p>
                    <p className="text-sm text-parchment">{role}-specific awareness requirements</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DECISION TOOLS TAB */}
        {activeTab === 'decision-tools' && (
          <div className="space-y-12">
            <h2 className="text-2xl font-cormorant">Decision Tools</h2>

            {/* Classification Test */}
            <div className="border border-gold-border rounded-sm p-6 bg-ink3">
              <h3 className="text-xl font-cormorant mb-6">Worker Classification Test</h3>

              <div className="space-y-6 mb-8">
                {[
                  'Who controls when, where, and how work is done?',
                  'Is this ongoing or project-based?',
                  'Is the work core to business?',
                  'Can worker send a substitute?',
                  'Who provides tools/equipment?',
                  'What % of income from this?',
                ].map((q, i) => (
                  <div key={i} className="pb-4 border-b border-gold-border">
                    <p className="text-sm font-cormorant text-parchment mb-3">{i + 1}. {q}</p>
                    <div className="flex gap-2">
                      {['No', 'Maybe', 'Yes'].map((option, j) => (
                        <button
                          key={j}
                          onClick={() => handleClassificationAnswer(i, j)}
                          className={`px-3 py-2 text-xs font-dm-mono border rounded transition-all ${
                            classificationAnswers[i] === j
                              ? 'bg-gold text-ink border-gold'
                              : 'border-gold-border text-mist hover:text-parchment'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {classificationResult && (
                <div className="bg-green-dim border border-green rounded-sm p-6">
                  <p className="text-xs font-dm-mono text-green mb-2">CLASSIFICATION RESULT</p>
                  <p className="text-2xl font-cormorant text-parchment">{classificationResult}</p>
                </div>
              )}
            </div>

            {/* Grey Areas */}
            <div className="space-y-6">
              <h3 className="text-xl font-cormorant">Grey Areas Register</h3>
              {greyAreas.map((area, i) => (
                <GreyAreaCard key={i} {...area} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 border-t border-gold-border text-center">
        <h2 className="text-3xl font-cormorant mb-4">Ready for Compliance?</h2>
        <p className="text-mist mb-8 max-w-2xl mx-auto">Run a 10-minute readiness check to understand your exposure and priority actions.</p>
        <button className="px-8 py-3 bg-gold text-ink font-dm-mono text-sm tracking-widest rounded-sm hover:bg-gold-light transition-colors">
          START READINESS CHECK
        </button>
      </div>

      <AIEdgeFooter />
    </div>
  );
}
