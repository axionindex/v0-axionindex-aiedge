'use client';

interface TriggerResultProps {
  name: string;
  threshold: string;
  status: 'Mandatory' | 'Assess' | 'Not Required';
  legal: string;
  detail: string;
}

const statusStyles = {
  Mandatory: 'bg-green-dim text-green',
  Assess: 'bg-amber-dim text-amber',
  'Not Required': 'bg-ink4 text-mist',
};

export function TriggerResult({ name, threshold, status, legal, detail }: TriggerResultProps) {
  return (
    <div className="border border-gold-border rounded-sm p-4 bg-ink3 hover:border-gold transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-cormorant text-parchment">{name}</h4>
        <span className={`text-xs font-dm-mono px-2 py-1 rounded ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
      <div className="text-sm text-mist space-y-1">
        <p className="font-dm-mono tracking-wide text-xs">{threshold}</p>
        <p className="text-xs">{legal}</p>
        <p className="text-xs text-parchment">{detail}</p>
      </div>
    </div>
  );
}
