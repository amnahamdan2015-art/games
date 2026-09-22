import React from 'react';
import { motion } from 'motion/react';
import { FeedbackState } from '../types';

interface QatariBoyProps {
  feedback: FeedbackState;
  isWon?: boolean;
}

export const QatariBoy: React.FC<QatariBoyProps> = ({ feedback, isWon }) => {
  return (
    <motion.div
      className="relative select-none pointer-events-none"
      animate={
        isWon
          ? { y: [0, -18, 0, -14, 0], rotate: [0, -4, 4, -2, 0], scale: [1, 1.08, 1] }
          : feedback === 'correct'
          ? { y: [0, -22, 0], rotate: [0, -5, 5, 0], scale: [1, 1.06, 1] }
          : feedback === 'wrong'
          ? { x: [0, -8, 8, -6, 6, 0] }
          : { y: [0, -6, 0] }
      }
      transition={{
        duration: isWon ? 1.4 : feedback === 'correct' ? 0.6 : feedback === 'wrong' ? 0.5 : 2.5,
        repeat: feedback === 'none' && !isWon ? Infinity : isWon ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      {/* Speech bubble / Reaction bubble above character */}
      <motion.div
        className="absolute -top-12 -left-4 md:-top-14 md:-left-8 z-20 pointer-events-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        key={feedback + (isWon ? '-won' : '')}
      >
        <div className="bg-white/95 backdrop-blur-sm border-2 border-amber-300 shadow-md rounded-2xl px-3 py-1.5 text-xs md:text-sm font-bold text-slate-800 whitespace-nowrap flex items-center gap-1.5">
          {isWon ? (
            <>
              <span>🎉</span>
              <span className="text-emerald-700">مبارك! أنت بطل الرياضيات!</span>
            </>
          ) : feedback === 'correct' ? (
            <>
              <span className="text-emerald-600 text-base">⭐</span>
              <span className="text-emerald-700 font-extrabold">ممتاز يا بطل!</span>
            </>
          ) : feedback === 'wrong' ? (
            <>
              <span className="text-amber-600 text-base">💡</span>
              <span className="text-amber-800 font-bold">فكر جيداً، أنت تستطيع!</span>
            </>
          ) : (
            <>
              <span className="text-amber-500">✨</span>
              <span className="text-slate-700">هيا نضرب الأعداد معاً!</span>
            </>
          )}
        </div>
      </motion.div>

      {/* SVG Cartoon Boy in Qatari Dress (Ghutra, Eqal, White Thobe, Waving Hand) */}
      <svg
        viewBox="0 0 240 320"
        className="w-40 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72 drop-shadow-xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Shadow on Floor */}
        <ellipse cx="120" cy="308" rx="60" ry="8" fill="#000000" fillOpacity="0.14" />

        {/* Sneaker Shoes */}
        {/* Left Shoe */}
        <g id="left-foot">
          <ellipse cx="86" cy="296" rx="18" ry="10" fill="#2d3748" />
          <path d="M70 298 C72 305, 100 305, 102 298 Z" fill="#e2e8f0" />
          <path d="M76 293 C82 290, 92 290, 96 293" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Right Shoe (Leaping forward) */}
        <g id="right-foot">
          <ellipse cx="152" cy="288" rx="20" ry="11" fill="#2d3748" transform="rotate(-10 152 288)" />
          <path d="M134 291 C138 299, 168 296, 170 289 Z" fill="#e2e8f0" />
          <path d="M142 285 C148 282, 158 283, 163 286" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* White Qatari Thobe (Gown) */}
        <path
          d="M85 160 
             C85 190, 68 250, 64 286 
             C82 292, 158 292, 176 284 
             C172 250, 155 190, 155 160 Z"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        {/* Thobe subtle pleats and shade */}
        <path d="M120 165 L120 288" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M100 180 C96 220, 88 260, 82 286" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d="M140 180 C144 220, 152 260, 158 284" stroke="#e2e8f0" strokeWidth="1.5" />

        {/* Thobe Collar & Buttons */}
        <path d="M110 148 L130 148 L126 182 L114 182 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="120" cy="156" r="2" fill="#94a3b8" />
        <circle cx="120" cy="166" r="2" fill="#94a3b8" />
        <circle cx="120" cy="176" r="2" fill="#94a3b8" />

        {/* Left Arm (Relaxed at side or holding waist) */}
        <g id="left-arm">
          <path
            d="M86 162 C70 178, 62 205, 68 225 C72 228, 80 225, 82 216 C78 202, 84 182, 94 170 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          {/* Hand */}
          <circle cx="68" cy="226" r="8" fill="#fed7aa" />
        </g>

        {/* Right Arm (Waving high & cheering) */}
        <g id="right-arm">
          <path
            d="M152 162 C168 152, 192 136, 206 118 C213 122, 218 128, 210 138 C198 154, 178 172, 156 176 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          {/* Animated Waving Hand */}
          <motion.g
            animate={{ rotate: [0, 14, -8, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '210px 115px' }}
          >
            {/* Palm */}
            <ellipse cx="214" cy="112" rx="10" ry="11" fill="#fed7aa" />
            {/* Thumb */}
            <path d="M206 112 C204 106, 207 101, 211 102 C214 104, 212 110, 210 114 Z" fill="#fed7aa" />
            {/* Fingers spread open happily */}
            <circle cx="215" cy="100" r="3.2" fill="#fed7aa" />
            <circle cx="221" cy="103" r="3.2" fill="#fed7aa" />
            <circle cx="225" cy="109" r="3" fill="#fed7aa" />
            <circle cx="226" cy="116" r="2.8" fill="#fed7aa" />
          </motion.g>
        </g>

        {/* Neck */}
        <rect x="112" y="132" width="16" height="18" rx="4" fill="#fed7aa" />

        {/* Ghutra (Back / Flowing Fabric) */}
        <path
          d="M62 108 
             C50 140, 48 185, 52 215 
             C56 220, 68 210, 72 195 
             C74 165, 80 135, 88 120 Z"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
        <path
          d="M178 108 
             C190 140, 194 185, 188 215 
             C184 220, 172 210, 168 195 
             C166 165, 160 135, 152 120 Z"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />

        {/* Face */}
        <ellipse cx="120" cy="115" rx="34" ry="32" fill="#ffedd5" />
        <ellipse cx="120" cy="116" rx="32" ry="30" fill="#fed7aa" />

        {/* Cheerful anime eyes */}
        {/* Left eye */}
        <ellipse cx="107" cy="114" rx="7.5" ry="9.5" fill="#1e293b" />
        <circle cx="105" cy="110" r="3" fill="#ffffff" />
        <circle cx="109" cy="117" r="1.5" fill="#ffffff" />
        {/* Right eye */}
        <ellipse cx="133" cy="114" rx="7.5" ry="9.5" fill="#1e293b" />
        <circle cx="131" cy="110" r="3" fill="#ffffff" />
        <circle cx="135" cy="117" r="1.5" fill="#ffffff" />

        {/* Eyebrows */}
        <path d="M101 101 C105 98, 112 99, 115 102" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M125 102 C128 99, 135 98, 139 101" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />

        {/* Cute Rosy Cheeks */}
        <ellipse cx="98" cy="122" rx="6" ry="3.5" fill="#f43f5e" fillOpacity="0.4" />
        <ellipse cx="142" cy="122" rx="6" ry="3.5" fill="#f43f5e" fillOpacity="0.4" />

        {/* Friendly cute mouth */}
        {feedback === 'wrong' ? (
          <path d="M114 130 Q120 126 126 130" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M113 126 Q120 136 127 126 Z" fill="#e11d48" stroke="#be123c" strokeWidth="1" />
        )}

        {/* Little nose */}
        <circle cx="120" cy="120" r="1.5" fill="#f97316" />

        {/* Dark Hair Tufts peeking under Ghutra */}
        <path d="M96 98 C102 92, 108 94, 114 96 C110 93, 104 90, 96 98 Z" fill="#1e293b" />
        <path d="M126 96 C132 94, 138 92, 144 98 C136 90, 130 93, 126 96 Z" fill="#1e293b" />

        {/* Ghutra Front (White draped headdress) */}
        <path
          d="M80 92 
             C82 62, 158 62, 160 92 
             C155 106, 148 116, 148 124
             C142 120, 132 118, 120 118
             C108 118, 98 120, 92 124
             C92 116, 85 106, 80 92 Z"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="1.5"
        />

        {/* Double Black Eqal (Traditional Head Ring) */}
        {/* Lower Ring */}
        <ellipse cx="120" cy="78" rx="42" ry="10" fill="#0f172a" />
        <ellipse cx="120" cy="78" rx="37" ry="8" fill="#ffffff" />
        {/* Upper Ring */}
        <ellipse cx="120" cy="73" rx="40" ry="9" fill="#0f172a" />
        <ellipse cx="120" cy="73" rx="35" ry="7" fill="#ffffff" />
        {/* Decorative Eqal cords (Murabbah) */}
        <path d="M120 78 L120 86" stroke="#0f172a" strokeWidth="3" />
      </svg>
    </motion.div>
  );
};
