'use client';

interface GreyAreaCardProps {
  title: string;
  description: string;
  government: string;
  legal: string;
  axion: string;
}

export function GreyAreaCard({ title, description, government, legal, axion }: GreyAreaCardProps) {
  return (
    <div className="border border-gold-border rounded-sm p-6 bg-ink3">
      <div className="mb-4">
        <h3 className="text-lg font-cormorant text-parchment mb-2">{title}</h3>
        <p className="text-sm text-mist">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="border-l-4 border-blue pl-4">
          <p className="text-xs font-dm-mono text-blue tracking-wide mb-2">GOVERNMENT</p>
          <p className="text-sm text-parchment">{government}</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <p className="text-xs font-dm-mono text-purple-500 tracking-wide mb-2">LEGAL</p>
          <p className="text-sm text-parchment">{legal}</p>
        </div>
        <div className="border-l-4 border-gold pl-4">
          <p className="text-xs font-dm-mono text-gold tracking-wide mb-2">AXION VIEW</p>
          <p className="text-sm text-parchment">{axion}</p>
        </div>
      </div>
    </div>
  );
}
