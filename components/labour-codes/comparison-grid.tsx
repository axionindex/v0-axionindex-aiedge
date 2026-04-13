'use client';

interface ComparisonItem {
  title: string;
  points: string[];
}

interface ComparisonGridProps {
  wrong: ComparisonItem;
  right: ComparisonItem;
}

export function ComparisonGrid({ wrong, right }: ComparisonGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div className="border-l-4 border-rust bg-rust-bg rounded-sm p-4">
        <div className="text-sm font-dm-mono text-rust mb-3 tracking-wide">❌ {wrong.title}</div>
        <ul className="space-y-2 text-sm text-parchment">
          {wrong.points.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-rust flex-shrink-0">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-l-4 border-green bg-green-dim rounded-sm p-4">
        <div className="text-sm font-dm-mono text-green mb-3 tracking-wide">✓ {right.title}</div>
        <ul className="space-y-2 text-sm text-parchment">
          {right.points.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-green flex-shrink-0">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
