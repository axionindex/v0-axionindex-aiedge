'use client';

import { useState, useEffect } from 'react';

interface IntelPanelProps {
  tabs: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
}

export function IntelPanel({ tabs }: IntelPanelProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1.67));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setActiveTab((t) => (t + 1) % tabs.length);
      setProgress(0);
    }
  }, [progress, tabs.length]);

  return (
    <div className="border border-gold-border rounded-sm p-6 bg-ink3">
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(i);
              setProgress(0);
            }}
            className={`px-3 py-2 text-sm font-dm-mono tracking-wide whitespace-nowrap rounded-sm transition-all ${
              activeTab === i ? 'bg-gold text-ink font-semibold' : 'text-mist hover:text-parchment'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="w-full bg-ink4 h-1 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gold transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="min-h-64">{tabs[activeTab].content}</div>
    </div>
  );
}
