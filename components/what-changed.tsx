'use client';

import { getRecentChanges, formatDate } from '@/lib/intelligence';
import { TypeBadge, ActionTag, PriorityBadge } from './intelligence-badges';

interface WhatChangedProps {
  changes: any[];
  days?: number;
}

export function WhatChanged({ changes, days = 7 }: WhatChangedProps) {
  const recent = getRecentChanges(changes, days);

  if (recent.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No recent changes in the last {days} days</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recent.map((change) => (
        <div
          key={change.id}
          className="border border-gray-700/50 rounded-lg p-4 hover:border-amber-500/30 transition-colors"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h4 className="font-serif text-lg text-gray-200 mb-2">{change.title}</h4>
              <p className="text-sm text-gray-400 mb-3">{change.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <TypeBadge type={change.type} size="sm" />
                <PriorityBadge priority={change.priority} size="sm" />
                {change.actionRequired && <ActionTag tag="act" size="sm" />}
              </div>
            </div>
            <div className="text-xs text-gray-500 font-mono whitespace-nowrap">
              {formatDate(change.date)}
            </div>
          </div>

          {change.action && (
            <div className="mt-4 pt-4 border-t border-gray-700/30">
              <div className="text-xs text-amber-300/70 font-mono uppercase mb-2">Action</div>
              <p className="text-sm text-gray-300">{change.action}</p>
            </div>
          )}

          {change.source && (
            <div className="mt-3 text-xs text-gray-500 font-mono">
              Source: {change.source}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
