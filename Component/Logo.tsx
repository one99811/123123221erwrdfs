import React from 'react';

export const OneLogo = ({ className = "h-20" }: { className?: string }) => (
  <svg viewBox="0 0 300 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* 1 Cutout Mask */}
      <mask id="mask-1">
        <rect width="300" height="100" fill="white" />
        {/* '1' shape: Stem with curved serif */}
        <path d="M 20 45 Q 40 22 42 22 L 62 22 L 62 78 L 42 78 L 42 45 Z" fill="black" />
      </mask>
      
      {/* n Cutout Mask */}
      <mask id="mask-n">
        <rect width="300" height="100" fill="white" />
        {/* Arch shape */}
        <path d="M 130 100 L 130 60 A 20 20 0 0 1 170 60 L 170 100 Z" fill="black" />
      </mask>
      
      {/* e Cutout Mask */}
      <mask id="mask-e">
        <rect width="300" height="100" fill="white" />
        {/* Slot shape */}
        <path d="M 300 38 L 245 38 A 12 12 0 0 0 245 62 L 300 62 Z" fill="black" />
      </mask>
    </defs>
    
    {/* Circle 1 (1) */}
    <circle cx="50" cy="50" r="50" mask="url(#mask-1)" />
    
    {/* Circle 2 (n) */}
    <circle cx="150" cy="50" r="50" mask="url(#mask-n)" />

    {/* Circle 3 (e) */}
    <circle cx="250" cy="50" r="50" mask="url(#mask-e)" />
  </svg>
);
