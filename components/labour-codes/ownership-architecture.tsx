'use client';

import { useState } from 'react';

export function OwnershipArchitectureSection() {
  const [activeStakeholder, setActiveStakeholder] = useState('ceo');

  const stakeholders = {
    ceo: {
      title: 'CEO / Board',
      subtitle: 'Strategic exposure · Personal liability · Governance',
      icon: '👔',
      owns: [
        'Strategic decision to implement Labour Codes compliance',
        'Board accountability for wage structure, FTE parity, exit processes',
        'Personal liability for gross negligence in compliance',
        'Capital allocation for system remediation'
      ],
      knows: [
        'Aggregate cost impact (typically 8-20% CTC increase)',
        'State-by-state implementation status and deadlines',
        'Trigger thresholds specific to your workforce',
        'Key policy changes that impact organizational culture'
      ],
      risks: [
        'Wage structure non-compliance leading to director liability',
        'Reputation damage from labour disputes',
        'Unexpected compliance costs during growth phase',
        'Regulatory action against the entity'
      ]
    },
    cfo: {
      title: 'CFO',
      subtitle: 'Cost modeling · Cash flow · Actuarial impact',
      icon: '💼',
      owns: [
        'Cost modeling and financial impact quantification',
        'PF base recalculation (50% rule implementation)',
        'Gratuity provisioning and actuarial reserves',
        'Leave encashment liability provisioning'
      ],
      knows: [
        '₹X impact per ₹1L CTC from wage restructuring',
        'PF base increase from 50% rule',
        'Gratuity liability increase from FTE parity',
        'FNF process timeline and cash flow implications'
      ],
      risks: [
        'Underestimation of compliance costs',
        'Actuarial miscalculation of gratuity liability',
        'Unexpected leave encashment payout',
        'Cash flow disruption from 2-day FNF requirement'
      ]
    },
    chro: {
      title: 'CHRO',
      subtitle: 'Policy redesign · Contracts · Stakeholder alignment',
      icon: '👥',
      owns: [
        'Wage structure redesign (50% rule)',
        'FTE contract revision and parity alignment',
        'Leave policy redesign (1 per 20 days rule)',
        'Exit process redesign (2-day FNF)',
        'Committee formation (GRC, ICC, Works, Safety, Canteen)'
      ],
      knows: [
        'Exact worker classification breakdown',
        'Current wage structure components and issues',
        'State-specific committee requirements',
        'Cultural impact of FTE parity and wage redesign'
      ],
      risks: [
        'Employee confusion during wage restructuring',
        'Unequal FTE compensation causing equity issues',
        'Committee formation delays causing non-compliance',
        'Exit process chaos if not redesigned in parallel'
      ]
    }
  };

  const stake = stakeholders[activeStakeholder as keyof typeof stakeholders];

  return (
    <div className="ownership-section">
      <div className="tabs">
        {Object.entries(stakeholders).map(([key, value]) => (
          <button
            key={key}
            className={`tab ${activeStakeholder === key ? 'active' : ''}`}
            onClick={() => setActiveStakeholder(key)}
          >
            {value.title}
          </button>
        ))}
      </div>

      <div className="stakeholder-panel">
        <div className="stakeholder-header">
          <div className="stakeholder-icon">{stake.icon}</div>
          <div>
            <div className="stakeholder-title">{stake.title}</div>
            <div className="stakeholder-subtitle">{stake.subtitle}</div>
          </div>
        </div>

        <div className="stakeholder-body">
          <div className="owns-section">
            <div className="section-badge owns">OWNS</div>
            <div className="ownership-list">
              {stake.owns.map((item, idx) => (
                <div key={idx} className="ownership-item">
                  <div className="ownership-bullet">→</div>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="owns-section">
            <div className="section-badge knows">KNOWS</div>
            <div className="ownership-list">
              {stake.knows.map((item, idx) => (
                <div key={idx} className="ownership-item">
                  <div className="ownership-bullet">✓</div>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="owns-section">
            <div className="section-badge risks">RISKS</div>
            <div className="ownership-list">
              {stake.risks.map((item, idx) => (
                <div key={idx} className="ownership-item">
                  <div className="ownership-bullet">⚠</div>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
