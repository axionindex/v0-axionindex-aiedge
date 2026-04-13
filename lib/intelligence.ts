const DATA_URL = '/data/intelligence-data.json';

export interface IntelligenceData {
  meta: {
    version: string;
    lastUpdated: string;
    lastVerified: string;
    updatedBy: string;
    dataSource: string;
    refreshFrequency: string;
  };
  stats: Record<string, any>;
  stateTracker: any;
  greyAreas: any;
  clarifications: any;
  recentChanges: any;
}

export async function fetchIntelligence(): Promise<IntelligenceData> {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Failed to fetch intelligence data: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('[Intelligence] Fetch error:', error);
    throw error;
  }
}

export function calculateDaysSince(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function getRecentChanges(changes: any[], days: number = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  return changes
    .filter(c => {
      const changeDate = new Date(c.date);
      return changeDate >= cutoff;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getCountByStatus(states: any[], status: string): number {
  return states.filter(s => s.overall === status).length;
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'border-red-500/50 bg-red-900/10';
    case 'medium':
      return 'border-amber-500/50 bg-amber-900/10';
    case 'low':
      return 'border-gray-500/50 bg-gray-900/10';
    default:
      return 'border-gray-500/50 bg-gray-900/10';
  }
}

export function getActionTagColor(actionTag: string): string {
  switch (actionTag) {
    case 'act':
      return 'bg-red-900/40 text-red-300 border-red-500/30';
    case 'watch':
      return 'bg-amber-900/40 text-amber-300 border-amber-500/30';
    case 'no_action':
      return 'bg-gray-800/40 text-gray-300 border-gray-500/30';
    default:
      return 'bg-gray-800/40 text-gray-300 border-gray-500/30';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'final':
      return 'bg-green-900/30 text-green-300 border-green-500/30';
    case 'draft':
      return 'bg-amber-900/30 text-amber-300 border-amber-500/30';
    case 'pending':
      return 'bg-red-900/30 text-red-300 border-red-500/30';
    case 'resolved':
      return 'bg-green-900/30 text-green-300 border-green-500/30';
    case 'partial':
      return 'bg-amber-900/30 text-amber-300 border-amber-500/30';
    case 'unresolved':
      return 'bg-red-900/30 text-red-300 border-red-500/30';
    default:
      return 'bg-gray-800/30 text-gray-300 border-gray-500/30';
  }
}

export function getTypeColor(type: string): string {
  switch (type) {
    case 'state_update':
      return 'bg-blue-900/30 text-blue-300 border-blue-500/30';
    case 'grey_area_update':
      return 'bg-purple-900/30 text-purple-300 border-purple-500/30';
    case 'legal_precedent':
      return 'bg-orange-900/30 text-orange-300 border-orange-500/30';
    case 'clarification':
      return 'bg-green-900/30 text-green-300 border-green-500/30';
    default:
      return 'bg-gray-800/30 text-gray-300 border-gray-500/30';
  }
}
