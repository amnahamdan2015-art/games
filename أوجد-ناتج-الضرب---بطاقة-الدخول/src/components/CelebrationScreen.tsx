import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, Award, CheckCircle, Ticket, Star, Sparkles, Printer, User } from 'lucide-react';
import { sound } from '../utils/sound';
import { QatariBoy } from './QatariBoy';

interface CelebrationScreenProps {
  totalQuestions: number;
  timeSpent: number; // in seconds
  score: number;
  onRestart: () => void;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  totalQuestions,
  timeSpent,
  score,
  onRestart,
}) => {
  const [studentName, setStudentName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    // Play grand fanfare
    sound.playVictory();

    // Trigger celebratory confetti burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins > 0 ? `${mins} دقيقة و ` : ''}${remainingSecs} ثانية`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="w-full max-w-3xl mx-auto my-4 px-4 select-none"
    >
      {/* Top Victory Banner */}
      <div className="text-center mb-6">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="inline-flex items-center justify-center text-5xl mb-3"
        >
          🎫 ⭐ 🏆 ⭐ 🎫
        </motion.div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          «رائع! لقد حصلت على بطاقة الدخول 🎫»
        </h1>
        <p className="text-base sm:text-lg text-emerald-800 font-bold mt-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
          <span>أحسنت صنعاً! لقد أتممت جميع مسائل الضرب الأربع بنجاح وتميز</span>
        </p>
      </div>

      {/* The Printable / Visual Digital Entry Ticket ("بطاقة دخول") */}
      <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-100/60 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 overflow-hidden mb-8">
        {/* Ticket Perforated Edge Notches Left & Right */}
        <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#fbf9f4] rounded-full border-r-4 border-amber-300" />
        <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#fbf9f4] rounded-full border-l-4 border-amber-300" />

        {/* Ticket Header */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-dashed border-amber-300 pb-5 mb-5 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Ticket className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                مدرسة قطر الابتدائية للبنين
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">
                بطاقة دخول حصة الرياضيات
              </h2>
            </div>
          </div>

          {/* Stamp Seal */}
          <div className="border-4 border-emerald-600 rounded-2xl p-2 px-4 rotate-[-6deg] text-emerald-700 font-black text-center shadow-sm bg-white/70">
            <div className="text-xs">معتمد للدرس</div>
            <div className="text-lg sm:text-xl font-black">ناجح بتفوق ✅</div>
          </div>
        </div>

        {/* Ticket Body Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Details Column */}
          <div className="md:col-span-2 space-y-3.5">
            {/* Student Name */}
            <div className="bg-white/80 rounded-xl p-3 border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-amber-600" />
                <span className="text-xs sm:text-sm font-bold text-slate-600">اسم الطالب:</span>
                {isEditingName ? (
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="اكتب اسم الطالب..."
                    className="border border-amber-400 rounded-lg px-2 py-0.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50 text-slate-800"
                    autoFocus
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  />
                ) : (
                  <span className="font-extrabold text-base sm:text-lg text-slate-800">
                    {studentName.trim() || 'بطل الرياضيات المتفوق'}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsEditingName(!isEditingName)}
                className="text-xs font-bold text-amber-700 hover:text-amber-900 underline px-2 py-1"
              >
                {isEditingName ? 'حفظ' : 'تغيير'}
              </button>
            </div>

            {/* Class & Subject */}
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-bold">
              <div className="bg-white/80 rounded-xl p-3 border border-amber-200">
                <span className="text-slate-500">الصف:</span>{' '}
                <span className="text-slate-800">الثالث الابتدائي</span>
              </div>
              <div className="bg-white/80 rounded-xl p-3 border border-amber-200">
                <span className="text-slate-500">الموضوع:</span>{' '}
                <span className="text-slate-800">حقائق الضرب الأساسية</span>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-700">المسائل</div>
                <div className="text-lg font-black text-emerald-900 mt-0.5">
                  {totalQuestions} / {totalQuestions}
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200">
                <div className="text-xs font-bold text-amber-700">النجوم المكتسبة</div>
                <div className="text-lg font-black text-amber-900 mt-0.5 flex justify-center items-center gap-0.5">
                  <span>4</span>
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
              </div>
              <div className="bg-sky-50 rounded-xl p-2.5 border border-sky-200">
                <div className="text-xs font-bold text-sky-700">النقاط الإجمالية</div>
                <div className="text-lg font-black text-sky-900 mt-0.5">{score}</div>
              </div>
            </div>

            {/* Time Taken */}
            <div className="text-xs text-slate-500 text-center pt-1 font-medium">
              الوقت المستغرق: {formatTime(timeSpent)}
            </div>
          </div>

          {/* Character Column */}
          <div className="flex flex-col items-center justify-center">
            <QatariBoy feedback="correct" isWon={true} />
          </div>
        </div>

        {/* Solved Questions List summary */}
        <div className="mt-5 pt-4 border-t border-amber-200/80">
          <div className="text-xs font-bold text-slate-600 mb-2">المسائل المحلولة بصحة:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm font-mono font-bold">
            <div className="bg-white p-1.5 rounded-lg border border-emerald-200 text-emerald-800">
              0 × 6 = 0 ✓
            </div>
            <div className="bg-white p-1.5 rounded-lg border border-emerald-200 text-emerald-800">
              1 × 7 = 7 ✓
            </div>
            <div className="bg-white p-1.5 rounded-lg border border-emerald-200 text-emerald-800">
              2 × 1 = 2 ✓
            </div>
            <div className="bg-white p-1.5 rounded-lg border border-emerald-200 text-emerald-800">
              9 × 0 = 0 ✓
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Large Prominent Restart Button (Mandatory as per request) */}
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xl sm:text-2xl px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-emerald-400 flex items-center gap-3 transition-all cursor-pointer min-h-[70px] min-w-[240px] justify-center"
        >
          <RotateCcw className="w-7 h-7" />
          <span>ابدأ من جديد</span>
        </motion.button>

        {/* Print / Save Ticket Button for classroom use */}
        <button
          onClick={handlePrint}
          className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-base sm:text-lg px-6 py-5 rounded-2xl shadow-md border border-slate-200 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer min-h-[70px]"
        >
          <Printer className="w-5 h-5 text-slate-500" />
          <span>طباعة بطاقة الدخول</span>
        </button>
      </div>
    </motion.div>
  );
};
