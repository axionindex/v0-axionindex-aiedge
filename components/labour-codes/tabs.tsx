'use client';

interface TabsProps {
  tabs: Array<{ id: string; label: string; count?: number }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-1 mb-5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`font-mono text-[11px] tracking-[0.06em] uppercase px-4 py-2.5 border transition-all ${
            activeTab === tab.id
              ? 'bg-gold text-ink border-gold'
              : 'bg-transparent text-mist'
          }`}
          style={{
            borderColor: activeTab === tab.id ? '#C49A3C' : 'rgba(196,154,60,.18)',
          }}
          onMouseEnter={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.borderColor = '#C49A3C';
              e.currentTarget.style.color = '#C49A3C';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.borderColor = 'rgba(196,154,60,.18)';
              e.currentTarget.style.color = '#B0A898';
            }
          }}
        >
          {tab.label} {tab.count !== undefined && `(${tab.count})`}
        </button>
      ))}
    </div>
  );
}
