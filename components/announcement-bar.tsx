'use client';

import { useRef } from 'react';

const TEXT =
  '💙 Welcome to Nexus Dev  •  Premium Digital Marketplace  •  Join our Discord for Secure Purchases & Support  •  Welcome to Nexus Dev  •  Premium Digital Marketplace  •  ';

export function AnnouncementBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-500 to-blue-600 border-b border-blue-400/20 h-9 flex items-center"
      onMouseEnter={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
      }}
      onMouseLeave={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
      }}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap announcement-track"
        style={{ animation: 'announcement-scroll 30s linear infinite', willChange: 'transform' }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="text-white/90 text-[13px] font-medium tracking-wide px-4">
            {TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
