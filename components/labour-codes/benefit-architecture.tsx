'use client';

import { useState } from 'react';

export function BenefitArchitectureSection() {
  const [expandedBenefits, setExpandedBenefits] = useState<string | null>(null);

  const benefits = [
    {
      id: 'gratuity',
      name: 'Gratuity',
      icon: '💰',
      impact: 'high',
      old: '5 years continuous service. Forfeited if resigned early.',
      new: 'FTE eligible after 1 year. 5 years for permanent.',
      formula: '(Last drawn wages × 15 × years) ÷ 26',
      detail: 'Cannot show gratuity as "part of CTC" — creates double liability.',
      actions: ['Update actuarial', 'Remove from CTC', 'Revise FTE contracts']
    },
    {
      id: 'pf',
      name: 'Provident Fund',
      icon: '💵',
      impact: 'high',
      old: '12% on Basic (often kept artificially low).',
      new: '12% on wages. Basic must be ≥50%.',
      formula: '50% Rule: If Basic is 40% → 50%, PF base increases 25%. ~₹1,200/month per ₹1L CTC',
      actions: ['Model wage cascade', 'Restructure CTC', 'Update payroll']
    },
    {
      id: 'leave',
      name: 'Leave & Encashment',
      icon: '📅',
      impact: 'high',
      old: 'Varied by Act. Encashment inconsistent.',
      new: '1 per 20 days. Encashment mandatory.',
      formula: 'Carry Forward: Up to 30 days. Cannot force encashment during employment.',
      actions: ['Update leave policy', 'Provision liability', 'FNF process']
    },
    {
      id: 'fnf',
      name: 'FNF Settlement',
      icon: '⚡',
      impact: 'high',
      old: 'No timeline. Often 30-60 days.',
      new: 'Wages within 2 working days.',
      formula: 'Sequential clearances won\'t work. Must move to parallel processing.',
      actions: ['Redesign exit', 'Pre-compute', 'Parallel clearances']
    },
    {
      id: 'fte',
      name: 'FTE Parity',
      icon: '👔',
      impact: 'high',
      old: 'FTEs often denied benefits.',
      new: 'Full parity. Gratuity at 1 year.',
      formula: 'Same wages, allowances, and benefits as permanent doing same work.',
      actions: ['Revise FTE contracts', 'Gratuity provisioning']
    },
    {
      id: 'maternity',
      name: 'Maternity',
      icon: '👶',
      impact: 'medium',
      old: '12-26 weeks varied. No WFH mandate.',
      new: '26 weeks. WFH option. Crèche.',
      formula: '8 weeks WFH post 26-week leave if work nature permits.',
      actions: ['Update policy', 'WFH framework', 'Crèche']
    }
  ];

  return (
    <div className="benefit-section">
      <div className="benefit-grid">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className={`benefit-card ${expandedBenefits === benefit.id ? 'expanded' : ''}`}
            onClick={() => setExpandedBenefits(expandedBenefits === benefit.id ? null : benefit.id)}
          >
            <div className="benefit-card-header">
              <div className="benefit-card-icon">{benefit.icon}</div>
              <div className="benefit-card-name">{benefit.name}</div>
              <div className={`benefit-card-impact ${benefit.impact}`}>{benefit.impact.charAt(0).toUpperCase() + benefit.impact.slice(1)}</div>
            </div>
            
            <div className="benefit-change-row">
              <div className="benefit-old">
                <div className="benefit-label">Old</div>
                <div className="benefit-text">{benefit.old}</div>
              </div>
              <div className="benefit-arrow">→</div>
              <div className="benefit-new">
                <div className="benefit-label">New</div>
                <div className="benefit-text">{benefit.new}</div>
              </div>
            </div>

            {expandedBenefits === benefit.id && (
              <div className="benefit-detail">
                <div className="benefit-detail-section">
                  <div className="benefit-detail-title">{benefit.id === 'gratuity' ? 'Formula' : benefit.id === 'pf' ? '50% Rule Impact' : 'Details'}</div>
                  <div className="benefit-detail-text">{benefit.formula}</div>
                </div>
                {benefit.detail && (
                  <div className="benefit-detail-section">
                    <div className="benefit-detail-title">Important</div>
                    <div className="benefit-detail-text">{benefit.detail}</div>
                  </div>
                )}
                <div className="benefit-detail-actions">
                  {benefit.actions.map((action, idx) => (
                    <span key={idx} className="action-chip">{action}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="benefit-summary">
        <div className="benefit-summary-title">Aggregate Cost Impact Estimate</div>
        <div className="benefit-summary-grid">
          <div className="benefit-summary-item">
            <div className="benefit-summary-label">PF Increase</div>
            <div className="benefit-summary-value">5-15%</div>
            <div className="benefit-summary-note">50% wage base</div>
          </div>
          <div className="benefit-summary-item">
            <div className="benefit-summary-label">Gratuity</div>
            <div className="benefit-summary-value">10-25%</div>
            <div className="benefit-summary-note">Base + FTE</div>
          </div>
          <div className="benefit-summary-item">
            <div className="benefit-summary-label">Leave</div>
            <div className="benefit-summary-value">+Provision</div>
            <div className="benefit-summary-note">Mandatory</div>
          </div>
          <div className="benefit-summary-item">
            <div className="benefit-summary-label">Total</div>
            <div className="benefit-summary-value">8-20%</div>
            <div className="benefit-summary-note">CTC increase</div>
          </div>
        </div>
      </div>
    </div>
  );
}
