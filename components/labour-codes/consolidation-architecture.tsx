'use client';

import { useState } from 'react';
import { Tabs } from './tabs';
import { ChevronRight } from 'lucide-react';

interface ReplacedAct {
  name: string;
  year: number;
  covered: string;
  keyChange: string;
}

interface CodeData {
  id: string;
  title: string;
  actNo: string;
  year: number;
  replacedCount: number;
  replacedActs: ReplacedAct[];
  keyProvisions: string[];
}

const codesData: CodeData[] = [
  {
    id: 'wages',
    title: 'Code on Wages, 2019',
    actNo: '29 of 2019',
    year: 2019,
    replacedCount: 4,
    replacedActs: [
      {
        name: 'Payment of Wages Act',
        year: 1936,
        covered: 'Timely payment of wages, deductions, wage periods',
        keyChange: 'Now applies to all employees. Digital payment enabled. Wage period max 1 month.',
      },
      {
        name: 'Minimum Wages Act',
        year: 1948,
        covered: 'Scheduled employment minimum wages',
        keyChange: 'Floor wage concept. Universal coverage. Basic+DA ≥50% of total remuneration.',
      },
      {
        name: 'Payment of Bonus Act',
        year: 1965,
        covered: 'Statutory bonus for establishments with 20+',
        keyChange: 'Calculation basis aligned with new wage definition. 8.33% min to 20% max.',
      },
      {
        name: 'Equal Remuneration Act',
        year: 1976,
        covered: 'Equal pay for equal work regardless of gender',
        keyChange: 'Prohibition on gender discrimination in recruitment.',
      },
    ],
    keyProvisions: [
      'Basic + DA ≥ 50% of total remuneration',
      'Unified wage definition across all codes',
      'Floor wage by Central Government',
      'Payment within 7 days (monthly)',
      'Overtime at 2× ordinary rate',
    ],
  },
  {
    id: 'ir',
    title: 'Industrial Relations Code, 2020',
    actNo: '35 of 2020',
    year: 2020,
    replacedCount: 3,
    replacedActs: [
      {
        name: 'Trade Unions Act',
        year: 1926,
        covered: 'Registration and regulation of trade unions',
        keyChange: 'Negotiating union concept. 51% membership for sole negotiating agent.',
      },
      {
        name: 'Industrial Employment (Standing Orders) Act',
        year: 1946,
        covered: 'Terms of employment in industrial establishments',
        keyChange: 'Threshold raised to 300 workers. Model standing orders apply by default.',
      },
      {
        name: 'Industrial Disputes Act',
        year: 1947,
        covered: 'Investigation and settlement of industrial disputes',
        keyChange: 'Retrenchment threshold raised to 300 (from 100). 14-day strike notice. Re-skilling fund.',
      },
    ],
    keyProvisions: [
      'Standing orders threshold: 300 workers',
      'Retrenchment approval: 300 workers',
      'Fixed-term employment with parity',
      'FTE gratuity after 1 year',
      '14-day strike/lockout notice',
    ],
  },
  {
    id: 'ss',
    title: 'Code on Social Security, 2020',
    actNo: '36 of 2020',
    year: 2020,
    replacedCount: 9,
    replacedActs: [
      {
        name: 'Employees\' Provident Funds Act',
        year: 1952,
        covered: 'PF, pension, insurance for employees',
        keyChange: '20+ employee threshold. Wage definition aligned. Aadhaar-linked portability.',
      },
      {
        name: 'Employees\' State Insurance Act',
        year: 1948,
        covered: 'Health insurance for industrial workers',
        keyChange: 'ESIC extended PAN-India. Coverage for gig workers possible.',
      },
      {
        name: 'Payment of Gratuity Act',
        year: 1972,
        covered: 'Gratuity on retirement, resignation, death',
        keyChange: '10+ employee threshold. FTE eligible after 1 year. Calculation per 26 days.',
      },
      {
        name: 'Maternity Benefit Act',
        year: 1961,
        covered: 'Maternity leave and benefits',
        keyChange: '26 weeks for first two children. WFH option. Crèche requirement.',
      },
    ],
    keyProvisions: [
      'Gig & platform workers included',
      'Aadhaar-linked portability',
      'ESIC extended PAN-India',
      'FTE gratuity after 1 year',
      'Aggregator contribution model',
    ],
  },
  {
    id: 'osh',
    title: 'OSH & Working Conditions Code, 2020',
    actNo: '37 of 2020',
    year: 2020,
    replacedCount: 13,
    replacedActs: [
      {
        name: 'Factories Act',
        year: 1948,
        covered: 'Health, safety, welfare in factories',
        keyChange: 'Women can work night shifts with safeguards. Working hours flexibility.',
      },
      {
        name: 'Mines Act',
        year: 1952,
        covered: 'Safety and welfare in mines',
        keyChange: 'Consolidated under OSH Code with modern safety standards.',
      },
      {
        name: 'Dock Workers Act',
        year: 1986,
        covered: 'Safety and welfare of dock workers',
        keyChange: 'Merged into unified OSH framework.',
      },
      {
        name: 'Building and Other Construction Workers Act',
        year: 1996,
        covered: 'Protection of construction workers',
        keyChange: 'Expanded coverage under OSH Code.',
      },
    ],
    keyProvisions: [
      'Single registration for establishments',
      'Women can work all shifts with safeguards',
      'Annual health check-ups (40+ employees)',
      'Canteen at 100 workers',
      'Crèche at 50 workers + 30 women',
    ],
  },
];

export function ConsolidationArchitecture() {
  const [activeCode, setActiveCode] = useState('wages');

  const currentCode = codesData.find((c) => c.id === activeCode)!;

  return (
    <section className="py-16 bg-ink2 border-t-[3px]" style={{ borderColor: 'rgba(196,154,60,.2)' }}>
      <div className="max-w-4xl">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-px bg-rust" />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-rust">
              01 — Consolidation Architecture
            </span>
          </div>

          <h2 className="font-cormorant text-[clamp(1.6rem,3vw,2.2rem)] font-normal leading-[1.2] text-parchment mb-2">
            29 Laws →{' '}
            <span className="italic text-gold">4 Codes</span>
          </h2>

          <p className="text-[0.9rem] text-mist leading-[1.65] max-w-[700px]">
            Click each code to see which acts it replaces and what changed.
          </p>
        </div>

        {/* Tab Navigation */}
        <Tabs
          tabs={codesData.map((code) => ({
            id: code.id,
            label: code.title.split(',')[0],
            count: code.replacedCount,
          }))}
          activeTab={activeCode}
          onTabChange={setActiveCode}
        />

        {/* Code Panel */}
        <div className="bg-ink border border-rule">
          {/* Panel Header */}
          <div className="grid grid-cols-2 gap-4 items-start p-5 border-b border-rule2">
            {/* Left Side */}
            <div>
              <h3 className="font-cormorant text-xl font-medium text-parchment mb-1">
                {currentCode.title}
              </h3>
              <p className="font-mono text-[11px] text-gold">
                Act No. {currentCode.actNo} · Assented{' '}
                {new Date(currentCode.year, 0, 1).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>

            {/* Right Side - Stat Box */}
            <div className="text-right">
              <p className="font-cormorant text-3xl font-semibold text-gold leading-tight">
                {currentCode.replacedCount}
              </p>
              <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-dim">
                Acts Replaced
              </p>
            </div>
          </div>

          {/* Panel Body */}
          <div className="p-5">
            {/* Replaced Acts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
              {currentCode.replacedActs.map((act, idx) => {
                const ageInYears = new Date().getFullYear() - act.year;
                const [expanded, setExpanded] = useState(idx === 0);

                return (
                  <div
                    key={idx}
                    className="bg-ink2 border border-rule2 p-3.5 cursor-pointer transition-all hover:border-gold group"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 pr-3">
                        <p className="text-sm font-medium text-parchment">
                          {act.name}
                        </p>
                        <p className="font-mono text-[10px] text-dim mt-0.5">
                          {ageInYears} years old
                        </p>
                      </div>
                      <div className="text-gold transition-transform" style={{
                        transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Expanded Detail */}
                    {expanded && (
                      <div className="mt-3 pt-3 border-t border-rule3 space-y-2">
                        <div>
                          <p className="font-mono text-[10px] uppercase text-mist mb-1">
                            What it covered:
                          </p>
                          <p className="text-[0.78rem] text-mist leading-[1.55]">
                            {act.covered}
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase text-mist mb-1">
                            Key change:
                          </p>
                          <p className="text-[0.78rem] text-mist leading-[1.55]">
                            {act.keyChange}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Key Provisions Box */}
            <div
              className="mt-5 p-4 border border-rule rounded-sm"
              style={{ backgroundColor: 'rgba(196,154,60,.05)' }}
            >
              <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-gold mb-3">
                Key Provisions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentCode.keyProvisions.map((provision, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gold flex-shrink-0">→</span>
                    <p className="text-[0.8rem] text-parchment">{provision}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
