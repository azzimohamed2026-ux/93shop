'use client';

export function Marquee({
  items,
  reverse = false,
  className = '',
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex gap-12 animate-marquee ${reverse ? 'flex-row-reverse' : ''}`}
        style={{ width: 'max-content' }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-2xl sm:text-3xl font-display font-bold text-white/10 hover:text-gold-400/40 transition-colors whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />
    </div>
  );
}
