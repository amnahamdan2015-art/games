import React from 'react';
import { motion } from 'motion/react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

interface SmartWatchTimerProps {
  timeRemaining: number; // in seconds
  isRunning: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
}

export const SmartWatchTimer: React.FC<SmartWatchTimerProps> = ({
  timeRemaining,
  isRunning,
  onTogglePlay,
  onReset,
}) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isLowTime = timeRemaining <= 30 && timeRemaining > 0;
  const isTimeUp = timeRemaining === 0;

  return (
    <div className="flex flex-col items-center">
      {/* Smartwatch Outer Device container mimicking image top-left */}
      <div className="relative group">
        {/* Watch Straps Top & Bottom */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-sky-200/90 rounded-t-md border-t border-sky-300 z-0" />
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-sky-200/90 rounded-b-md border-b border-sky-300 z-0" />

        {/* Watch Body (Silver & Gloss) */}
        <motion.div
          className={`relative z-10 w-28 h-20 sm:w-32 sm:h-24 md:w-36 md:h-24 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 rounded-[22px] p-1.5 shadow-lg border-2 ${
            isLowTime ? 'border-amber-400' : isTimeUp ? 'border-red-400' : 'border-slate-300'
          }`}
          animate={
            isLowTime && isRunning
              ? { scale: [1, 1.03, 1] }
              : {}
          }
          transition={{ duration: 1, repeat: Infinity }}
        >
          {/* Watch Crown Button on right side */}
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-slate-400 rounded-l-sm" />

          {/* Inner Screen with cute school doodles border */}
          <div className="w-full h-full bg-[#f8fbff] rounded-[16px] border border-sky-100 flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-inner">
            {/* Subtle decorative icons in the background */}
            <div className="absolute inset-0 opacity-15 flex flex-wrap justify-between p-1 pointer-events-none text-[8px] font-mono select-none">
              <span>✏️</span>
              <span>📐</span>
              <span>⭐</span>
              <span>🎒</span>
            </div>

            {/* Top tiny label */}
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-500 z-10">
              <Clock className="w-2.5 h-2.5 text-sky-600" />
              <span>المؤقت</span>
            </div>

            {/* Big Digital Numbers */}
            <div
              className={`font-mono text-xl sm:text-2xl font-black tracking-wider z-10 ${
                isTimeUp
                  ? 'text-red-600 animate-pulse'
                  : isLowTime
                  ? 'text-amber-600'
                  : 'text-slate-800'
              }`}
              dir="ltr"
            >
              {formattedTime}
            </div>

            {/* Status indicator bar */}
            <div className="w-14 h-1 bg-slate-100 rounded-full mt-0.5 overflow-hidden z-10">
              <div
                className={`h-full transition-all duration-1000 ${
                  isTimeUp ? 'bg-red-500' : isLowTime ? 'bg-amber-500' : 'bg-sky-500'
                }`}
                style={{ width: `${(timeRemaining / 120) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Controls for smart board/teacher */}
      <div className="flex items-center gap-1.5 mt-2">
        <button
          onClick={onTogglePlay}
          className="p-1 px-2 text-xs font-bold rounded-lg bg-white/90 hover:bg-white text-slate-700 shadow-sm border border-slate-200 transition-transform active:scale-95 flex items-center gap-1"
          title={isRunning ? 'إيقاف مؤقت' : 'تشغيل'}
        >
          {isRunning ? (
            <>
              <Pause className="w-3 h-3 text-amber-600 fill-amber-600" />
              <span className="hidden sm:inline">إيقاف</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" />
              <span className="hidden sm:inline">تشغيل</span>
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="p-1 px-2 text-xs font-bold rounded-lg bg-white/90 hover:bg-white text-slate-700 shadow-sm border border-slate-200 transition-transform active:scale-95 flex items-center gap-1"
          title="إعادة ضبط المؤقت (02:00)"
        >
          <RotateCcw className="w-3 h-3 text-slate-500" />
          <span className="hidden sm:inline">إعادة</span>
        </button>
      </div>
    </div>
  );
};
