import React from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, RotateCcw, Sparkles } from 'lucide-react';
import { SmartWatchTimer } from './SmartWatchTimer';
import { SchoolBook } from './SchoolBook';

interface HeaderBarProps {
  timeRemaining: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onRestartGame: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  timeRemaining,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  isMuted,
  onToggleMute,
  isFullscreen,
  onToggleFullscreen,
  onRestartGame,
}) => {
  return (
    <header className="w-full max-w-5xl mx-auto px-2 sm:px-4 pt-3 pb-1 select-none">
      {/* Utility Actions Bar at very top */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
        <div className="flex items-center gap-1.5 font-bold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>الرياضيات - الصف الثالث الابتدائي - دولة قطر 🇶🇦</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 shadow-xs border border-slate-200 transition-all cursor-pointer flex items-center gap-1"
            title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-500" />
                <span className="text-[11px] font-bold">صامت</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-bold">صوت</span>
              </>
            )}
          </button>

          {/* Fullscreen toggle for smartboard */}
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 shadow-xs border border-slate-200 transition-all cursor-pointer flex items-center gap-1"
            title={isFullscreen ? 'تصغير الشاشة' : 'ملء الشاشة للسبورة الذكية'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4 text-sky-600" />
                <span className="text-[11px] font-bold hidden sm:inline">تصغير</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-sky-600" />
                <span className="text-[11px] font-bold hidden sm:inline">سبورة ذكية</span>
              </>
            )}
          </button>

          {/* Quick Restart */}
          <button
            onClick={onRestartGame}
            className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 shadow-xs border border-slate-200 transition-all cursor-pointer flex items-center gap-1"
            title="إعادة بدء اللعبة"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span className="text-[11px] font-bold hidden sm:inline">إعادة</span>
          </button>
        </div>
      </div>

      {/* Main Visual Header Trio (Wristwatch on left, "بطاقة دخول" in center, School Book on right) */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 relative py-1">
        {/* Left Side: Wristwatch Countdown Timer ("02:00") */}
        <div className="shrink-0">
          <SmartWatchTimer
            timeRemaining={timeRemaining}
            isRunning={isTimerRunning}
            onTogglePlay={onToggleTimer}
            onReset={onResetTimer}
          />
        </div>

        {/* Center: The Authentic "بطاقة دخول" Banner from the Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative group">
            {/* Warm peach/amber pill banner matching the image */}
            <div className="bg-[#fbcfa4] hover:bg-[#fad4b1] transition-colors px-6 sm:px-12 py-2 sm:py-3.5 rounded-2xl shadow-sm border-2 border-[#f5b87e] flex items-center justify-center">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-['Tajawal',sans-serif] drop-shadow-xs">
                بطاقة دخول
              </h1>
            </div>
            {/* Cute bottom shadow pin */}
            <div className="w-8 h-1 bg-[#e79a55] mx-auto rounded-full mt-0.5 opacity-60" />
          </div>
        </div>

        {/* Right Side: School Math Notebook Cover */}
        <div className="shrink-0 flex justify-end">
          <SchoolBook />
        </div>
      </div>
    </header>
  );
};
