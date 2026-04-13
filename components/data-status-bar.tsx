'use client';

import { formatDateTime } from '@/lib/intelligence';

interface DataStatusBarProps {
  lastUpdated?: string;
  lastVerified?: string;
  dataSource?: string;
}

export function DataStatusBar({
  lastUpdated,
  lastVerified,
  dataSource = 'Axion Index'
}: DataStatusBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-amber-900/20 to-transparent border-b border-amber-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 text-xs">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-amber-300/70">
              DATA STATUS: Last updated: {lastUpdated ? formatDateTime(lastUpdated) : 'Loading...'}
            </span>
            <span className="text-green-300/70">
              Last verified: {lastVerified ? formatDateTime(lastVerified) : 'Loading...'}
            </span>
          </div>
          <span className="text-gray-400/70">
            Source: {dataSource}
          </span>
        </div>
      </div>
    </div>
  );
}
