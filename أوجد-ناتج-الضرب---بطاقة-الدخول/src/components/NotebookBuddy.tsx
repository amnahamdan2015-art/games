import React from 'react';
import { motion } from 'motion/react';
import { FeedbackState } from '../types';

interface NotebookBuddyProps {
  feedback: FeedbackState;
}

export const NotebookBuddy: React.FC<NotebookBuddyProps> = ({ feedback }) => {
  return (
    <motion.div
      className="relative select-none pointer-events-none"
      animate={
        feedback === 'correct'
          ? { scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }
          : feedback === 'wrong'
          ? { rotate: [0, -5, 5, -5, 0] }
          : { y: [0, -4, 0] }
      }
      transition={{
        duration: feedback === 'correct' ? 0.5 : feedback === 'wrong' ? 0.4 : 2,
        repeat: feedback === 'none' ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      <svg
        viewBox="0 0 160 180"
        className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 drop-shadow-lg overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow */}
        <ellipse cx="80" cy="172" rx="46" ry="6" fill="#000000" fillOpacity="0.12" />

        {/* Rotated notebook angle like in the photo */}
        <g transform="rotate(-12 80 90)">
          {/* Notebook Back Pages Layer */}
          <rect x="28" y="24" width="94" height="126" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="24" y="20" width="94" height="126" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />

          {/* Green Front Cover */}
          <rect x="20" y="16" width="94" height="126" rx="10" fill="#4ade80" stroke="#16a34a" strokeWidth="3" />

          {/* White Bottom Lined Label / Insert */}
          <rect x="30" y="98" width="74" height="34" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="38" y1="108" x2="96" y2="108" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="38" y1="116" x2="96" y2="116" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="38" y1="124" x2="80" y2="124" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Big Cartoon Eyes */}
          {/* Left Eye */}
          <ellipse cx="50" cy="54" rx="14" ry="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          {/* Right Eye */}
          <ellipse cx="84" cy="54" rx="14" ry="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />

          {/* Pupils looking upwards curiously */}
          <motion.circle
            cx="54"
            cy="50"
            r="6"
            fill="#0f172a"
            animate={feedback === 'correct' ? { cy: [50, 46, 50] } : {}}
            transition={{ duration: 0.6 }}
          />
          <circle cx="56" cy="48" r="2.2" fill="#ffffff" />

          <motion.circle
            cx="88"
            cy="50"
            r="6"
            fill="#0f172a"
            animate={feedback === 'correct' ? { cy: [50, 46, 50] } : {}}
            transition={{ duration: 0.6 }}
          />
          <circle cx="90" cy="48" r="2.2" fill="#ffffff" />

          {/* Cheerful Smile */}
          {feedback === 'wrong' ? (
            <path d="M60 82 Q67 76 74 82" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M58 76 Q67 88 76 76" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="44" cy="74" rx="4" ry="2.5" fill="#f43f5e" fillOpacity="0.45" />
          <ellipse cx="90" cy="74" rx="4" ry="2.5" fill="#f43f5e" fillOpacity="0.45" />

          {/* Spiral Rings on Left Margin */}
          {[26, 40, 54, 68, 82, 96, 110, 124].map((yPos, i) => (
            <g key={i}>
              <ellipse cx="20" cy={yPos} rx="6" ry="3.5" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
              <circle cx="20" cy={yPos} r="2" fill="#1e293b" />
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
  );
};
