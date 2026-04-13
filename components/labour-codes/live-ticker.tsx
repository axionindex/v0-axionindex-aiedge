'use client';

import { useEffect, useState } from 'react';

const tickerItems = [
  { text: '● CENTRAL: All 4 codes in force · Final rules published 30 Dec 2025', color: 'text-green' },
  { text: '● Karnataka: Consultation until 18 Apr', color: 'text-amber' },
  { text: '● Maharashtra: 3/4 codes final', color: 'text-green' },
  { text: '● Tamil Nadu: 4/4 final', color: 'text-green' },
  { text: '● Gujarat: 4/4 final', color: 'text-green' },
  { text: '● Delhi: 2/4 final', color: 'text-amber' },
  { text: '● Telangana: 3/4 final', color: 'text-green' },
  { text: '● Uttarakhand: 4/4 final', color: 'text-green' },
  { text: '● UP: 4/4 final', color: 'text-green' },
  { text: '● Haryana: 4/4 final', color: 'text-green' },
  { text: '● Jharkhand: 4/4 final', color: 'text-green' },
  { text: '● HP: 4/4 final', color: 'text-green' },
  { text: '● West Bengal: All draft', color: 'text-dim' },
  { text: '● Rajasthan: All draft', color: 'text-dim' },
  { text: '● Punjab: All draft', color: 'text-dim' },
  { text: '● Odisha: All draft', color: 'text-dim' },
  { text: '● Assam: All draft', color: 'text-dim' },
  { text: '● Bihar: IR, SS pending', color: 'text-rust' },
  { text: '● SUMMARY: 8 states 4/4 final · 4 states 3+ final · 7 states draft only · 1 state pending', color: 'text-gold' },
];

export function LiveTicker() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full left-0 right-0 bg-ink2 border-b" style={{ borderColor: 'rgba(196,154,60,0.2)' }}>
      <div className="flex items-center px-14 py-3 gap-8 h-16">
        {/* Left Badge */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase text-green px-2 py-1" style={{ backgroundColor: 'rgba(91,173,122,0.12)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            Live Status
          </span>
        </div>

        {/* Scrolling Track */}
        <div
          className="flex-1 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <style>{`
            @keyframes scroll-ticker {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            
            .ticker-track {
              display: flex;
              gap: 2rem;
              animation: scroll-ticker 90s linear infinite;
              animation-play-state: ${isHovered ? 'paused' : 'running'};
              width: fit-content;
            }
          `}</style>
          <div className="ticker-track">
            {/* Original items */}
            {tickerItems.map((item, idx) => (
              <div
                key={`original-${idx}`}
                className={`flex-shrink-0 font-mono text-[10px] tracking-[0.06em] whitespace-nowrap ${item.color}`}
              >
                {item.text}
              </div>
            ))}
            {/* Duplicated for seamless loop */}
            {tickerItems.map((item, idx) => (
              <div
                key={`duplicate-${idx}`}
                className={`flex-shrink-0 font-mono text-[10px] tracking-[0.06em] whitespace-nowrap ${item.color}`}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
