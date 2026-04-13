'use client';

export function ImplementationArchitectureSection() {
  const phases = [
    {
      num: '1',
      label: 'Phase 1',
      name: 'Interpretation',
      desc: 'Map what applies. Define wages logic. Identify state footprint. Classify worker types. Separate settled from grey zones.',
      chips: ['Applicability mapping', 'Worker classification', 'State footprint', 'Grey zone register']
    },
    {
      num: '2',
      label: 'Phase 2',
      name: 'Implication',
      desc: 'Model cost impact. Calculate PF/gratuity cascades. Quantify leave exposure. Map contractor risk.',
      chips: ['Cost modelling', 'Liability cascade', 'Policy fragility', 'Stakeholder heatmap']
    },
    {
      num: '3',
      label: 'Phase 3',
      name: 'Implementation',
      desc: 'Redesign policies. Configure payroll. Update contracts. Build evidence layer. Train managers.',
      chips: ['Policy redesign', 'System updates', 'Vendor remediation', 'Audit readiness']
    }
  ];

  return (
    <div className="impl-section">
      <div className="impl-phases">
        {phases.map((phase) => (
          <div key={phase.num} className="impl-phase">
            <div className="impl-phase-num">{phase.num}</div>
            <div className="impl-phase-label">{phase.label}</div>
            <div className="impl-phase-name">{phase.name}</div>
            <div className="impl-phase-desc">{phase.desc}</div>
            <div className="impl-chips">
              {phase.chips.map((chip, idx) => (
                <span key={idx} className="impl-chip">{chip}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="impl-quote">
        The principle is simple: <strong>implication before implementation</strong>. Always.
      </div>
    </div>
  );
}
