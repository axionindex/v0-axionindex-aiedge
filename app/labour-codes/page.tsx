'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { AIEdgeFooter } from '@/components/ai-edge-footer';

export default function LabourCodesPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [classificationAnswers, setClassificationAnswers] = useState<number[]>([]);
  const [classificationResult, setClassificationResult] = useState<string | null>(null);

  const handleClassificationAnswer = (index: number, score: number) => {
    const newAnswers = [...classificationAnswers];
    newAnswers[index] = score;
    setClassificationAnswers(newAnswers);

    if (newAnswers.length === 6 && newAnswers.every((a) => a > 0)) {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      if (total >= 16) setClassificationResult('Direct Employee');
      else if (total >= 10) setClassificationResult('Contingent Worker');
      else setClassificationResult('Genuine Consultant');
    }
  };

  return (
    <div style={{ background: 'var(--ink)', color: 'var(--parchment)', minHeight: '100vh' }}>
      <Navigation />

      {/* Live Status Strip */}
      <div style={{ 
        position: 'fixed', 
        top: 'var(--nav-h)',
        left: 0,
        right: 0,
        background: 'var(--ink)',
        borderBottom: '1px solid var(--rule2)',
        padding: '16px 0',
        zIndex: 40,
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
            <div className="live-dot" style={{ width: '8px', height: '8px', background: 'var(--gold)', borderRadius: '50%' }} />
            <span style={{ color: 'var(--gold)' }}>4 Codes Live • 18 States Finalized</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--dim)', letterSpacing: '0.12em' }}>
            UPDATED 13 APR 2026
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', borderBottom: '1px solid var(--rule2)' }}>
        <div className="container">
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '24px',
          }}>
            The System Reset of <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Employment</span> in India
          </h1>
          <p style={{ 
            fontSize: '1.1rem',
            color: 'var(--mist)',
            maxWidth: '640px',
            lineHeight: 1.8,
          }}>
            Navigate India's four labour codes with decision intelligence, compliance triggers, and strategic readiness planning. Everything you need to redesign work before the system forces you to.
          </p>

          {/* Stats Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '32px',
            marginTop: '48px',
          }}>
            {[
              { label: 'Codes in Force', value: '4', source: 'Govt of India' },
              { label: 'Laws Replaced', value: '29', source: 'Central + States' },
              { label: 'Minimum Basic Rule', value: '50%', source: 'Wage Code §2(n)' },
              { label: 'IR Code Threshold', value: '300+', source: 'Per Establishment' },
            ].map((stat, idx) => (
              <div key={idx} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '20px' }}>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '8px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '2.8rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--parchment)', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--dim)' }}>
                  {stat.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div style={{ 
        position: 'sticky',
        top: 'calc(var(--nav-h) + 72px)',
        background: 'var(--ink)',
        borderBottom: '1px solid var(--rule2)',
        zIndex: 30,
      }}>
        <div className="container" style={{ display: 'flex', gap: '32px', paddingTop: '16px', paddingBottom: '16px', overflowX: 'auto' }}>
          {['overview', 'clarifications', 'decision-tools'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? 'var(--gold)' : 'var(--dim)',
                paddingBottom: '8px',
                borderBottom: activeTab === tab ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab === 'overview' ? 'Overview' : tab === 'clarifications' ? 'Clarifications' : 'Decision Tools'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div className="container">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '60px' }}>
                <h2 className="sec-title">What's New</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                  {[
                    { type: 'Signal', title: 'HP Finalizes All 4 Codes', date: '10 Apr 2026', status: 'live' },
                    { type: 'Update', title: 'MoLE Issues Wage Clarification', date: '08 Apr 2026', status: 'medium' },
                    { type: 'Divergence', title: 'Karnataka Extends Consultation', date: '05 Apr 2026', status: 'info' },
                    { type: 'Action Required', title: 'Review Non-Compete Clauses', date: '28 Mar 2026', status: 'action' },
                  ].map((item, idx) => (
                    <div key={idx} style={{ 
                      border: '1px solid var(--rule)',
                      borderLeft: '3px solid var(--gold)',
                      padding: '20px',
                      background: 'rgba(196,154,60,0.02)',
                    }}>
                      <div style={{ 
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        marginBottom: '8px',
                      }}>
                        {item.type}
                      </div>
                      <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--parchment)' }}>
                        {item.title}
                      </h3>
                      <div style={{ fontSize: '0.75rem', color: 'var(--dim)' }}>
                        {item.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CLARIFICATIONS TAB */}
          {activeTab === 'clarifications' && (
            <div>
              <h2 className="sec-title">Clarifications & FAQs</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                {[
                  {
                    id: '50-wage',
                    title: '50% Wage Rule',
                    question: 'Does performance bonus count toward the 50% basic rule?',
                    answer: 'Yes, if guaranteed and predictable. Discretionary bonuses do not count. The calculation is: Basic + DA ≥ 50% of (Total Remuneration).',
                    source: 'MoL&E FAQ, Verified 01 Apr 2026',
                  },
                  {
                    id: 'it-worker',
                    title: 'IT Workers Classification',
                    question: 'Are IT workers exempt from certain labour code provisions?',
                    answer: 'No blanket exemption exists. Classification depends on the employment contract and work nature under IR Code §2(k).',
                    source: 'Delhi HC Order, 28 Mar 2026',
                  },
                ].map((item) => (
                  <div key={item.id} style={{ 
                    border: '1px solid var(--rule)',
                    padding: '24px',
                    background: 'rgba(196,154,60,0.01)',
                  }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--parchment)' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--dim)', marginBottom: '16px', fontStyle: 'italic' }}>
                      Q: {item.question}
                    </p>
                    <p style={{ fontSize: '1rem', color: 'var(--mist)', marginBottom: '16px' }}>
                      A: {item.answer}
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold)', borderTop: '1px solid var(--rule)', paddingTop: '12px' }}>
                      {item.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DECISION TOOLS TAB */}
          {activeTab === 'decision-tools' && (
            <div>
              <h2 className="sec-title">Classification Test</h2>
              <p style={{ color: 'var(--mist)', marginBottom: '32px' }}>
                Answer 6 questions to determine worker classification under the Industrial Relations Code.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '32px' }}>
                {[
                  'Is the worker on fixed salary/monthly remuneration?',
                  'Does the worker have defined workday and location?',
                  'Are tools and equipment provided by the organization?',
                  'Can the worker be supervised by employer?',
                  'Is the relationship ongoing for 3+ months?',
                  'Does the worker work primarily for you?',
                ].map((q, idx) => (
                  <div key={idx} style={{ 
                    border: '1px solid var(--rule)',
                    padding: '20px',
                    background: 'rgba(196,154,60,0.01)',
                  }}>
                    <p style={{ fontSize: '1rem', color: 'var(--parchment)', marginBottom: '16px' }}>
                      {idx + 1}. {q}
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {[
                        { score: 1, label: 'No' },
                        { score: 2, label: 'Maybe' },
                        { score: 3, label: 'Yes' },
                      ].map(({ score, label }) => (
                        <button
                          key={score}
                          onClick={() => handleClassificationAnswer(idx, score)}
                          style={{
                            padding: '8px 16px',
                            border: classificationAnswers[idx] === score ? '2px solid var(--gold)' : '1px solid var(--rule)',
                            background: classificationAnswers[idx] === score ? 'rgba(196,154,60,0.1)' : 'transparent',
                            color: classificationAnswers[idx] === score ? 'var(--gold)' : 'var(--dim)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            transition: 'all 0.2s',
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {classificationResult && (
                <div style={{ 
                  border: '2px solid var(--gold)',
                  borderLeft: '4px solid var(--gold)',
                  padding: '24px',
                  background: 'rgba(196,154,60,0.04)',
                }}>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '8px' }}>
                    Your Classification
                  </div>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--gold)' }}>
                    {classificationResult}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <AIEdgeFooter />
    </div>
  );
}
