'use client';

interface SourceCitationProps {
  source: string;
  date: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export function SourceCitation({ source, date, confidence }: SourceCitationProps) {
  const dotColor = confidence === 'High' ? 'bg-green' : confidence === 'Medium' ? 'bg-amber' : 'bg-rust';
  
  return (
    <div className="text-xs text-mist font-dm-mono tracking-wide">
      <span className="inline-block mr-2">↳</span>
      <span>Source: {source}</span>
      <span className="mx-2">·</span>
      <span>Checked: {date}</span>
      <span className="mx-2">·</span>
      <span className="inline-flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
        Confidence: {confidence}
      </span>
    </div>
  );
}
