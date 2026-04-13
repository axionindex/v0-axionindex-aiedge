'use client';

interface FormulaBoxProps {
  formula: string;
  label?: string;
}

export function FormulaBox({ formula, label }: FormulaBoxProps) {
  return (
    <div className="border border-gold-border bg-ink3 rounded-sm p-4 my-4 font-dm-mono text-sm text-parchment">
      {label && <div className="text-xs text-mist mb-2 tracking-wide">{label}</div>}
      <div className="text-center py-2">{formula}</div>
    </div>
  );
}
