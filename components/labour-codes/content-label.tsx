'use client';

type ContentLabelType = 'fact' | 'interpretation' | 'grey' | 'central' | 'state';

interface ContentLabelProps {
  type: ContentLabelType;
  text?: string;
}

const labelConfig: Record<ContentLabelType, { bg: string; text: string; color: string }> = {
  fact: { bg: 'bg-green/10', text: 'Fact', color: 'text-green' },
  interpretation: { bg: 'bg-amber/10', text: 'Interpretation', color: 'text-amber' },
  grey: { bg: 'bg-rust/10', text: 'Grey', color: 'text-rust' },
  central: { bg: 'bg-blue/10', text: 'Central', color: 'text-blue' },
  state: { bg: 'bg-purple-500/10', text: 'State', color: 'text-purple-500' },
};

export function ContentLabel({ type, text }: ContentLabelProps) {
  const config = labelConfig[type];
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-dm-mono tracking-wider ${config.bg} ${config.color}`}>
      {text || config.text}
    </span>
  );
}
