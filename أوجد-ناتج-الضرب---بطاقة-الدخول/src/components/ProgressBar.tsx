import React from 'react';
import { motion } from 'motion/react';
import { Star, Award } from 'lucide-react';

interface ProgressBarProps {
  currentIndex: number;
  total: number;
  starsCount: number;
  score: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  total,
  starsCount,
  score,
}) => {
  const percentage = ((currentIndex) / total) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-2">
      <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-sm border border-amber-100 flex flex-wrap items-center justify-between gap-3">
        {/* Progress Text & Steps */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-100/90 text-amber-900 px-3.5 py-1.5 rounded-xl font-black text-sm sm:text-base border border-amber-200 flex items-center gap-1.5 shadow-xs">
            <span>التقدم:</span>
            <span className="text-emerald-700 font-extrabold text-base sm:text-lg">
              {Math.min(currentIndex + 1, total)} من {total}
            </span>
          </div>

          {/* Stepper dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: total }).map((_, idx) => {
              const isDone = idx < starsCount;
              const isCurrent = idx === currentIndex && !isDone;

              return (
                <div
                  key={idx}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-200'
                      : isCurrent
                      ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-200 scale-110'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stars Collected & Points */}
        <div className="flex items-center gap-4">
          {/* Stars display */}
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <span className="text-xs sm:text-sm font-bold text-amber-900 ml-1">النجوم:</span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: total }).map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={idx < starsCount ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Star
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                      idx < starsCount
                        ? 'fill-amber-400 text-amber-500 filter drop-shadow-xs'
                        : 'text-slate-300 fill-slate-100'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Score display */}
          <div className="flex items-center gap-1.5 bg-sky-50 px-3.5 py-1.5 rounded-xl border border-sky-200 text-sky-900">
            <Award className="w-5 h-5 text-sky-600" />
            <span className="text-xs sm:text-sm font-bold">النقاط:</span>
            <span className="text-base sm:text-lg font-black text-sky-700 font-mono">{score}</span>
          </div>
        </div>
      </div>

      {/* Thin animated line bar */}
      <div className="w-full h-2 bg-slate-200/80 rounded-full mt-2 overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
};
