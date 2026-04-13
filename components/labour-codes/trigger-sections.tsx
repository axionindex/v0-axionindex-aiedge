'use client';

import { useState } from 'react';

export function TriggerBenefitsSection() {
  return (
    <div className="panel" id="trigger-benefits">
      <div className="trigger-grid">
        {[
          {
            name: 'Gratuity',
            threshold: '≥10',
            basis: 'Employees · SS Code',
            desc: 'Payment on exit after 5 years (permanent) or 1 year (FTE). 15 days per year.',
            source: 'Central',
            detail: 'Max ₹25L tax-exempt'
          },
          {
            name: 'Statutory Bonus',
            threshold: '≥20',
            basis: 'Employees ≤₹21K · Wages Code',
            desc: '8.33% minimum to 20% maximum. Within 8 months of FY end.',
            source: 'Central'
          },
          {
            name: 'Maternity Benefit',
            threshold: '≥10',
            basis: 'Women employees · SS Code',
            desc: '26 weeks (first 2 children). WFH option. Employer-funded if not ESIC.',
            source: 'Central'
          },
          {
            name: 'Leave Encashment',
            threshold: '≥1',
            basis: 'All employees · OSH Code',
            desc: '1 day per 20 worked. Encashment on separation mandatory.',
            source: 'Central'
          },
          {
            name: 'Overtime',
            threshold: '≥1',
            basis: 'Workers · OSH Code',
            desc: '2× ordinary rate beyond 8 hrs/day or 48 hrs/week.',
            source: 'Judgment',
            detail: 'IC exemption debated'
          },
          {
            name: 'Retrenchment Comp',
            threshold: '≥1',
            basis: 'Workers 1+ year · IR Code',
            desc: '15 days per year. Govt approval at 300+. 90 days notice.',
            source: 'Central'
          }
        ].map((card, idx) => (
          <div key={idx} className="trigger-card">
            <div className="trigger-card-header">
              <div className="trigger-card-name">{card.name}</div>
              <div className="trigger-card-threshold">{card.threshold}</div>
            </div>
            <div className="trigger-card-basis">{card.basis}</div>
            <div className="trigger-card-desc">{card.desc}</div>
            <div className="trigger-card-source">
              <span className={`label label--${card.source.toLowerCase()}`}>{card.source}</span>
              {card.detail && ` ${card.detail}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TriggerCommitteesSection() {
  return (
    <div className="panel" id="trigger-committees">
      <div className="trigger-grid">
        {[
          {
            name: 'ICC / POSH',
            threshold: '≥10',
            basis: 'Employees · POSH Act 2013',
            desc: 'Internal Complaints Committee. Senior woman presiding officer. External member.',
            source: 'Central',
            detail: 'Annual report'
          },
          {
            name: 'GRC',
            threshold: '≥20',
            basis: 'Employees · IR Code',
            desc: 'Grievance Redressal Committee. Equal representation. 30-day resolution.',
            source: 'Central'
          },
          {
            name: 'Works Committee',
            threshold: '≥100',
            basis: 'Workers · IR Code',
            desc: 'Promote amity. Equal employer-worker representation.',
            source: 'Central'
          },
          {
            name: 'Safety Committee',
            threshold: '≥500',
            basis: 'Workers in hazardous · OSH',
            desc: 'Worker representation. Monthly meetings.',
            source: 'State',
            detail: 'Lower in some'
          },
          {
            name: 'Canteen Committee',
            threshold: '≥250',
            basis: 'Workers · OSH Code',
            desc: 'Managing committee. Worker representation.',
            source: 'State',
            detail: 'Canteen at 100'
          }
        ].map((card, idx) => (
          <div key={idx} className="trigger-card">
            <div className="trigger-card-header">
              <div className="trigger-card-name">{card.name}</div>
              <div className="trigger-card-threshold">{card.threshold}</div>
            </div>
            <div className="trigger-card-basis">{card.basis}</div>
            <div className="trigger-card-desc">{card.desc}</div>
            <div className="trigger-card-source">
              <span className={`label label--${card.source.toLowerCase()}`}>{card.source}</span>
              {card.detail && ` ${card.detail}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
