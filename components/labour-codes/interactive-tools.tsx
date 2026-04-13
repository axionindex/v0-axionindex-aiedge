'use client';

import { useState } from 'react';

export function InteractiveToolsSection() {
  const [activeTool, setActiveTool] = useState('lookup');
  const [lookupValue, setLookupValue] = useState('');

  const lookupChips = ['Crèche', 'Canteen', 'PF', 'ESI', 'Gratuity', 'Maternity', 'ICC/POSH', 'Bonus', 'Standing Orders', 'FNF', 'Night Shift', 'Works Committee'];

  const whatsNewItems = [
    {
      type: 'update',
      title: 'Central Rules in Force',
      detail: 'All four Labour Code rules have been published and are now in force. Effective date: 21 November 2025.',
      date: '30 Dec 2025'
    },
    {
      type: 'clarification',
      title: '50% Rule FAQ Published',
      detail: 'MoLE FAQ clarifies exclusions from 50% test: HRA, conveyance, OT, commission, gratuity, bonus, travel concession.',
      date: '15 Jan 2026'
    },
    {
      type: 'update',
      title: 'FNF 2-Day Rule Active',
      detail: 'Wages must be settled within 2 working days of separation. Gratuity remains at 30-day timeline.',
      date: '21 Nov 2025'
    },
    {
      type: 'state',
      title: '8 States Now 4/4 Final',
      detail: 'Tamil Nadu, Gujarat, MP, UP, Uttarakhand, Haryana, Jharkhand, HP have finalized all four code rules.',
      date: 'Apr 2026'
    },
    {
      type: 'deadline',
      title: 'Karnataka Consultation Closes',
      detail: 'Karnataka state rules consultation period ends April 18, 2026. Submit feedback before deadline.',
      date: '18 Apr 2026'
    },
    {
      type: 'clarification',
      title: 'FTE Gratuity at 1 Year',
      detail: 'Fixed-term employees now eligible for pro-rata gratuity after 1 year of service (IR Code §53).',
      date: '21 Nov 2025'
    }
  ];

  return (
    <div className="tools-section">
      <div className="tools-nav">
        {['lookup', 'trigger', 'classify', 'news'].map((tool) => (
          <button
            key={tool}
            className={`tool-tab ${activeTool === tool ? 'active' : ''}`}
            onClick={() => setActiveTool(tool)}
          >
            {tool === 'lookup' && 'Quick Lookup'}
            {tool === 'trigger' && 'Trigger Engine'}
            {tool === 'classify' && 'Work Arrangement'}
            {tool === 'news' && "What's New"}
          </button>
        ))}
      </div>

      {activeTool === 'lookup' && (
        <div className="tool-panel">
          <div className="tool-card">
            <div className="tool-card-title">Quick Compliance Lookup</div>
            <div className="tool-card-desc">Search any benefit, compliance, committee, or threshold to understand when it applies.</div>

            <input
              type="text"
              className="lookup-input"
              placeholder="Search: crèche, PF, gratuity, ICC, canteen, bonus..."
              value={lookupValue}
              onChange={(e) => setLookupValue(e.target.value)}
            />

            <div className="lookup-chips">
              {lookupChips.map((chip) => (
                <span
                  key={chip}
                  className="lookup-chip"
                  onClick={() => setLookupValue(chip)}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="lookup-results">
              <div className="lookup-empty">🔍 Type a compliance term above or click a quick link</div>
            </div>
          </div>
        </div>
      )}

      {activeTool === 'news' && (
        <div className="tool-panel">
          <div className="tool-card">
            <div className="tool-card-title">What's New</div>
            <div className="tool-card-desc">Recent updates, clarifications, and deadlines you need to know.</div>

            <div className="whats-new-grid">
              {whatsNewItems.map((item, idx) => (
                <div key={idx} className="whats-new-item">
                  <div className={`whats-new-type ${item.type}`}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</div>
                  <div className="whats-new-title">{item.title}</div>
                  <div className="whats-new-detail">{item.detail}</div>
                  <div className="whats-new-date">{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(activeTool === 'trigger' || activeTool === 'classify') && (
        <div className="tool-panel">
          <div className="tool-card">
            <div className="tool-card-title">{activeTool === 'trigger' ? 'Compliance Trigger Engine' : 'Work Arrangement Assessment'}</div>
            <div className="tool-card-desc">
              {activeTool === 'trigger'
                ? 'Input your organisation details to see exactly what applies.'
                : 'Assess whether your work arrangement is correctly classified.'}
            </div>
            <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
              Coming soon in this release
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
