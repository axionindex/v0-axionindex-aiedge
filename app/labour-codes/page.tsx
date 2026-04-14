'use client';

import { useState, useMemo } from 'react';
import { Navigation } from '@/components/navigation';
import { AIEdgeFooter } from '@/components/ai-edge-footer';
import { LiveTicker } from '@/components/labour-codes/live-ticker';
import { ShowcaseBanner } from '@/components/labour-codes/showcase-banner';
import { LabourCodesHero } from '@/components/labour-codes/hero';
import { ConsolidationArchitecture } from '@/components/labour-codes/consolidation-architecture';
import { IntelPanel } from '@/components/labour-codes/intel-panel';
import { SourceCitation } from '@/components/labour-codes/source-citation';
import { ContentLabel } from '@/components/labour-codes/content-label';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function LabourCodesPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-ink text-parchment">
      <Navigation />
      <LiveTicker />
      <ShowcaseBanner />

      {/* Status Strip */}
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

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-ink border-b border-gold-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {['overview', 'clarifications', 'readiness', 'cxo-guide', 'decision-tools'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 text-sm font-dm-mono tracking-wide border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab ? 'border-gold text-gold' : 'border-transparent text-mist hover:text-parchment'
                }`}
              >
                {tab === 'cxo-guide' ? 'CXO Guide' : tab === 'decision-tools' ? 'Decision Tools' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <>
            <LabourCodesHero />
            <ConsolidationArchitecture />
            
            {/* What's New */}
            <div className="mb-16 mt-16">
              <div className="text-xl font-cormorant mb-6">What's New</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'HP Finalizes All Rules', desc: 'Himachal Pradesh completes rules across all four codes', badge: 'Signal', color: 'bg-green-dim text-green' },
                  { title: 'Performance Pay Clarity', desc: 'MoLE indicates bonuses to be included in wages', badge: 'Update', color: 'bg-amber-dim text-amber' },
                  { title: 'State Variations', desc: 'Karnataka extends consultation to June 2026', badge: 'Divergence', color: 'bg-rust-bg text-rust' },
                  { title: 'Non-Compete Ruling', desc: 'Delhi HC clarifies non-compete principles', badge: 'Action', color: 'bg-gold/10 text-gold' },
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
                    </div>
                  ),
                },
                {
                  id: 'scenarios',
                  title: 'What If Scenarios',
                  content: (
                    <div className="space-y-4">
                      <div className="p-4 border-l-4 border-purple-500">
                        <p className="text-sm font-cormorant text-parchment mb-2">Employee moves to new state</p>
                        <p className="text-sm text-mist">Apply rules of new work location.</p>
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
                      <li>Update leave and FNF policies</li>
                    </ol>
                  ),
                },
              ]}
            />
          </>
        )}

        {activeTab === 'clarifications' && <div className="text-xl font-cormorant">Clarifications coming soon</div>}
        {activeTab === 'readiness' && <div className="text-xl font-cormorant">Readiness Framework coming soon</div>}
        {activeTab === 'cxo-guide' && <div className="text-xl font-cormorant">CXO Guide coming soon</div>}
        {activeTab === 'decision-tools' && <div className="text-xl font-cormorant">Decision Tools coming soon</div>}
      </div>

      <AIEdgeFooter />
    </div>
  );
}
