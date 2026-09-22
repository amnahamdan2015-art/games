import React from 'react';

export const SchoolBook: React.FC = () => {
  return (
    <div className="relative select-none pointer-events-none transform rotate-12 hover:rotate-6 transition-transform duration-300">
      <svg
        viewBox="0 0 140 180"
        className="w-20 h-26 sm:w-24 sm:h-30 md:w-28 md:h-36 drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow */}
        <rect x="14" y="14" width="112" height="152" rx="6" fill="#000000" fillOpacity="0.1" />

        {/* Yellow/Golden Cover */}
        <rect x="10" y="8" width="116" height="156" rx="6" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />

        {/* Inner classic ornamental frame */}
        <rect x="20" y="24" width="96" height="124" rx="4" fill="#fef08a" stroke="#a16207" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Logo at top */}
        <text x="68" y="44" textAnchor="middle" fill="#713f12" fontSize="11" fontWeight="bold" fontFamily="Cairo, sans-serif">
          مادة الرياضيات
        </text>

        {/* School Lines on Cover */}
        <line x1="30" y1="62" x2="106" y2="62" stroke="#ca8a04" strokeWidth="1" />
        <text x="96" y="60" textAnchor="end" fill="#854d0e" fontSize="7" fontFamily="Cairo, sans-serif">
          الاسم: ....................
        </text>

        <line x1="30" y1="80" x2="106" y2="80" stroke="#ca8a04" strokeWidth="1" />
        <text x="96" y="78" textAnchor="end" fill="#854d0e" fontSize="7" fontFamily="Cairo, sans-serif">
          الصف: الثالث الابتدائي
        </text>

        <line x1="30" y1="98" x2="106" y2="98" stroke="#ca8a04" strokeWidth="1" />
        <text x="96" y="96" textAnchor="end" fill="#854d0e" fontSize="7" fontFamily="Cairo, sans-serif">
          الموضوع: جدول الضرب
        </text>

        {/* Emblem stamp */}
        <circle cx="68" cy="122" r="12" fill="#ca8a04" fillOpacity="0.2" stroke="#a16207" strokeWidth="1" />
        <polygon points="68,114 71,120 78,121 73,125 74,131 68,128 62,131 63,125 58,121 65,120" fill="#a16207" />
      </svg>
    </div>
  );
};
