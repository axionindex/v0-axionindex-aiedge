'use client';

import { useEffect, useState } from 'react';

const slides = [
  {
    id: 1,
    title: 'Core Architectures',
    items: [
      { icon: '📜', value: '29 → 4', label: 'Consolidation Map' },
      { icon: '⚡', value: '40+', label: 'Trigger Matrix' },
      { icon: '💰', value: '6', label: 'Benefit Changes' },
      { icon: '👔', value: '6', label: 'CXO Playbooks' },
      { icon: '✓', value: '30+', label: 'Clarity Items' },
      { icon: '🔧', value: '4', label: 'Decision Tools' },
    ],
  },
  {
    id: 2,
    title: 'Key Thresholds',
    items: [
      { icon: '📊', value: '50%', label: 'Basic Wage Rule' },
      { icon: '🏢', value: '300', label: 'Standing Orders' },
      { icon: '⏱️', value: '2 Days', label: 'FNF Settlement' },
      { icon: '👶', value: '1 Year', label: 'FTE Gratuity' },
      { icon: '🤰', value: '26 Wks', label: 'Maternity Leave' },
      { icon: '💵', value: '2×', label: 'Overtime Rate' },
    ],
  },
  {
    id: 3,
    title: 'State Status',
    items: [
      { icon: '●', value: '8', label: 'States 4/4 Final', color: 'text-green' },
      { icon: '●', value: '4', label: 'States 3+ Final', color: 'text-amber' },
      { icon: '●', value: '6', label: 'States Draft', color: 'text-dim' },
      { icon: '●', value: '1', label: 'State Pending', color: 'text-rust' },
      { icon: '📅', value: 'Apr 18', label: 'KA Deadline' },
      { icon: '🔄', value: '24h', label: 'Intel Refresh' },
    ],
  },
];

export function ShowcaseBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const slide = slides[currentSlide];

  return (
    <div
      className="bg-gradient-to-br from-ink2 to-ink3 border-b"
      style={{ borderColor: 'rgba(196,154,60,0.2)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        .radial-gold-accent {
          position: absolute;
          top: 0;
          left: 20%;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196,154,60,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeSlide {
          animation: fadeSlide 0.45s ease;
        }
      `}</style>

      <div className="relative px-14 py-6">
        <div className="radial-gold-accent" />

        {/* Header Row */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          {/* Left - Title */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.12em] uppercase text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Labour Codes Intelligence
            </span>
          </div>

          {/* Right - Dot Navigation */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className="transition-all rounded-full"
                style={{
                  width: idx === currentSlide ? '24px' : '8px',
                  height: '8px',
                  backgroundColor: idx === currentSlide ? '#C49A3C' : 'rgba(196,154,60,0.2)',
                  cursor: 'pointer',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slides Container */}
        <div className="min-h-[100px] relative z-10">
          <div key={slide.id} className="animate-fadeSlide">
            <div className="grid grid-cols-6 gap-4">
              {slide.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 text-center hover:transition-all hover:-translate-y-0.5 cursor-pointer"
                  style={{
                    backgroundColor: '#0C0B09',
                    border: '1px solid rgba(196,154,60,0.12)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C49A3C';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(196,154,60,0.12)';
                  }}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className={`font-cormorant text-lg font-semibold ${item.color || 'text-parchment'}`}>
                    {item.value}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.06em] text-mist uppercase">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
