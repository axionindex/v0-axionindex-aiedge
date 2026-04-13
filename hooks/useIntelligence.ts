'use client';

import { useEffect, useState } from 'react';
import { fetchIntelligence, IntelligenceData } from '@/lib/intelligence';

const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useIntelligence() {
  const [data, setData] = useState<IntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const newData = await fetchIntelligence();
      setData(newData);
      setLastFetch(new Date());
      console.log('[v0] Intelligence data fetched successfully at', new Date().toISOString());
    } catch (err) {
      console.error('[v0] Intelligence fetch error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch intelligence data'));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up 24-hour refresh interval
    const interval = setInterval(() => {
      console.log('[v0] Running 24-hour intelligence refresh');
      fetchData();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const retry = () => fetchData();

  return { data, loading, error, lastFetch, retry };
}
