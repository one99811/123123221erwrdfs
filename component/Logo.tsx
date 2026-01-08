import React from 'react';

export const OneLogo = ({ className = "h-20" }: { className?: string }) => (
  <img 
    src="/logo.png" 
    alt="ONE Logo" 
    className={className} 
    style={{ objectFit: 'contain' }} 
  />
);