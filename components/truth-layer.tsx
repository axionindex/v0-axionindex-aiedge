'use client';

import { VerifiedTimestamp, SourceCitation, ActionTag } from './intelligence-badges';

interface TruthLayerProps {
  governmentPosition: {
    stance: string;
    source?: string | null;
    date?: string | null;
  };
  legalConsensus: {
    stance: string;
    confidence?: string;
    reasoning?: string;
  };
  axionView: {
    recommendation: string;
    actionTag: string;
  };
  verified?: string;
}

export function TruthLayer({
  governmentPosition,
  legalConsensus,
  axionView,
  verified
}: TruthLayerProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-amber-500/10">
      {/* Government Position */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs uppercase tracking-widest text-amber-300/70">Government</h4>
        <p className="text-sm text-gray-300">{governmentPosition.stance}</p>
        {governmentPosition.source && (
          <SourceCitation
            name={governmentPosition.source}
            type="government"
            date={governmentPosition.date || undefined}
          />
        )}
      </div>

      {/* Legal Consensus */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400/70">Legal Consensus</h4>
        <p className="text-sm text-gray-300">{legalConsensus.stance}</p>
        {legalConsensus.reasoning && (
          <p className="text-xs text-gray-400/70 italic">{legalConsensus.reasoning}</p>
        )}
        {legalConsensus.confidence && (
          <div className="text-xs font-mono text-amber-300/70">
            Confidence: {legalConsensus.confidence}
          </div>
        )}
      </div>

      {/* Axion View */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs uppercase tracking-widest text-amber-300/70">Axion View</h4>
        <p className="text-sm text-gray-300">{axionView.recommendation}</p>
        <div className="pt-2">
          <ActionTag tag={axionView.actionTag} size="sm" />
        </div>
        {verified && <VerifiedTimestamp date={verified} />}
      </div>
    </div>
  );
}
