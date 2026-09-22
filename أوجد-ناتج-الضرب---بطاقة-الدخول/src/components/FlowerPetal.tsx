import React from 'react';

export const FlowerPetal: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-12 h-12 md:w-16 md:h-16 drop-shadow-sm select-none pointer-events-none opacity-80 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 5 Petals of pink blossom as seen in the original card */}
      <g transform="translate(50,50)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-24"
            rx="10"
            ry="20"
            fill="#fca5a5"
            transform={`rotate(${angle})`}
            fillOpacity="0.85"
          />
        ))}
        {/* Center dot */}
        <circle cx="0" cy="0" r="7" fill="#f87171" />
      </g>
    </svg>
  );
};
