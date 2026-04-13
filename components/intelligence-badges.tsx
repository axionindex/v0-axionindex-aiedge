'use client';

import { getStatusColor, getActionTagColor, formatDate } from '@/lib/intelligence';

interface ActionTagProps {
  tag: string;
  size?: 'sm' | 'md';
}

export function ActionTag({ tag, size = 'md' }: ActionTagProps) {
  const colors = getActionTagColor(tag);
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-xs';
  
  const labelMap: Record<string, string> = {
    act: 'ACT',
    watch: 'WATCH',
    no_action: 'NO ACTION'
  };

  return (
    <span className={`inline-block font-mono font-semibold border rounded ${sizeClass} ${colors}`}>
      {labelMap[tag] || tag.toUpperCase()}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: string;
  size?: 'sm' | 'md';
}

export function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const priorityMap: Record<string, { label: string; color: string }> = {
    high: { label: 'HIGH', color: 'border-red-500/50 text-red-300' },
    medium: { label: 'MEDIUM', color: 'border-amber-500/50 text-amber-300' },
    low: { label: 'LOW', color: 'border-gray-500/50 text-gray-300' }
  };

  const config = priorityMap[priority] || priorityMap.low;
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-xs';

  return (
    <span className={`inline-block font-mono font-semibold border rounded ${sizeClass} ${config.color}`}>
      {config.label}
    </span>
  );
}

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const colors = getStatusColor(status);
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-xs';
  
  const labelMap: Record<string, string> = {
    final: 'FINAL',
    draft: 'DRAFT',
    pending: 'PENDING',
    resolved: 'RESOLVED',
    partial: 'PARTIAL',
    unresolved: 'UNRESOLVED'
  };

  return (
    <span className={`inline-block font-mono font-semibold border rounded ${sizeClass} ${colors}`}>
      {labelMap[status] || status.toUpperCase()}
    </span>
  );
}

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md';
}

export function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const typeMap: Record<string, { label: string; color: string }> = {
    state_update: { label: 'STATE UPDATE', color: 'bg-blue-900/30 text-blue-300 border-blue-500/30' },
    grey_area_update: { label: 'GREY AREA', color: 'bg-purple-900/30 text-purple-300 border-purple-500/30' },
    legal_precedent: { label: 'LEGAL', color: 'bg-orange-900/30 text-orange-300 border-orange-500/30' },
    clarification: { label: 'CLARIFICATION', color: 'bg-green-900/30 text-green-300 border-green-500/30' }
  };

  const config = typeMap[type] || typeMap.clarification;
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-xs';

  return (
    <span className={`inline-block font-mono font-semibold border rounded ${sizeClass} ${config.color}`}>
      {config.label}
    </span>
  );
}

interface SourceCitationProps {
  name: string;
  type?: string;
  date?: string;
  url?: string;
}

export function SourceCitation({ name, type, date, url }: SourceCitationProps) {
  const content = (
    <div className="text-xs text-gray-400">
      <div className="flex items-center gap-2 mb-1">
        {type && <span className="text-amber-300/70">{type}</span>}
        {date && <span className="text-green-300/70">{formatDate(date)}</span>}
      </div>
      <div className="font-mono">{name}</div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
        {content}
      </a>
    );
  }

  return content;
}

interface VerifiedTimestampProps {
  date: string;
}

export function VerifiedTimestamp({ date }: VerifiedTimestampProps) {
  return (
    <div className="flex items-center gap-1 text-xs text-green-300/70 font-mono">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
      Verified: {formatDate(date)}
    </div>
  );
}

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading intelligence data...' }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-500/20 border-t-amber-500 mb-4"></div>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  error: Error | null;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-6 text-center">
      <p className="text-red-300 mb-4">Failed to load intelligence data</p>
      {error && <p className="text-red-300/70 text-sm mb-4">{error.message}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-900/20 border border-red-500/30 rounded text-red-300 hover:bg-red-900/30 transition-colors text-sm font-mono"
        >
          Retry
        </button>
      )}
    </div>
  );
}
