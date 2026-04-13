'use client';

import { useState } from 'react';
import { calculateDaysSince, formatDate } from '@/lib/intelligence';

interface DynamicStatProps {
  value: number | null;
  label: string;
  definition?: string;
  source?: string;
  sourceUrl?: string;
  asOf?: string;
  lastVerified?: string;
  autoCalculate?: boolean;
  calculatedFrom?: string;
}

export function DynamicStat({
  value,
  label,
  definition,
  source,
  sourceUrl,
  asOf,
  lastVerified,
  autoCalculate,
  calculatedFrom
}: DynamicStatProps) {
  const [showDetails, setShowDetails] = useState(false);

  let displayValue = value;
  if (autoCalculate && calculatedFrom) {
    displayValue = calculateDaysSince(calculatedFrom);
  }

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Main Stat */}
      <div className="bg-gradient-to-br from-amber-900/20 to-transparent border border-amber-500/20 rounded-lg p-4 hover:border-amber-500/40 transition-colors">
        <div className="text-3xl font-mono font-bold text-amber-300 mb-2">{displayValue}</div>
        <div className="font-mono text-xs uppercase tracking-widest text-gray-400">{label}</div>
      </div>

      {/* Hover Details */}
      {showDetails && (definition || source) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-amber-500/30 rounded-lg p-4 z-50 backdrop-blur-sm text-sm space-y-3">
          {definition && (
            <div>
              <div className="text-amber-300/70 font-mono text-xs uppercase mb-1">Definition</div>
              <p className="text-gray-300">{definition}</p>
            </div>
          )}
          
          {source && (
            <div>
              <div className="text-amber-300/70 font-mono text-xs uppercase mb-1">Source</div>
              {sourceUrl ? (
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 transition-colors">
                  {source}
                </a>
              ) : (
                <p className="text-gray-300">{source}</p>
              )}
            </div>
          )}

          {asOf && (
            <div className="text-xs text-gray-400">
              <span className="text-amber-300/70">As of:</span> {formatDate(asOf)}
            </div>
          )}

          {lastVerified && (
            <div className="text-xs text-green-300/70 flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-green-500"></span>
              Verified: {formatDate(lastVerified)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface DynamicStatsGridProps {
  stats: Record<string, any>;
  lastVerified?: string;
}

export function DynamicStatsGrid({ stats, lastVerified }: DynamicStatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(stats).map(([key, stat]) => (
        stat && typeof stat === 'object' && 'value' in stat && (
          <DynamicStat
            key={key}
            value={stat.value}
            label={stat.label}
            definition={stat.definition}
            source={stat.source}
            sourceUrl={stat.sourceUrl}
            asOf={stat.asOf}
            lastVerified={stat.lastVerified || lastVerified}
            autoCalculate={stat.autoCalculate}
            calculatedFrom={stat.calculatedFrom}
          />
        )
      ))}
    </div>
  );
}
