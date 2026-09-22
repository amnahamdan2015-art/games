import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Sparkles, RefreshCw } from 'lucide-react';
import { FeedbackState } from '../types';

interface FeedbackOverlayProps {
  feedback: FeedbackState;
  onDismissWrong?: () => void;
}

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  feedback,
  onDismissWrong,
}) => {
  return (
    <AnimatePresence>
      {feedback !== 'none' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="w-full max-w-lg mx-auto my-3"
        >
          {feedback === 'correct' ? (
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white p-4 sm:p-5 rounded-2xl shadow-xl border-2 border-emerald-300 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-emerald-600 flex items-center justify-center text-2xl sm:text-3xl shadow-md shrink-0">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 fill-emerald-100" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                    <span>أحسنت! إجابة صحيحة</span>
                    <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                  </h3>
                  <p className="text-emerald-100 text-xs sm:text-sm font-semibold mt-0.5">
                    رائع! الانتقال إلى السؤال التالي...
                  </p>
                </div>
              </div>
              <div className="text-3xl">⭐</div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 text-white p-4 sm:p-5 rounded-2xl shadow-xl border-2 border-rose-300 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-rose-600 flex items-center justify-center text-2xl sm:text-3xl shadow-md shrink-0">
                  <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600 fill-rose-100" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    حاول مرة أخرى
                  </h3>
                  <p className="text-rose-100 text-xs sm:text-sm font-medium mt-0.5">
                    لا بأس يا بطل، يمكنك المحاولة من جديد واختيار الإجابة الصحيحة!
                  </p>
                </div>
              </div>

              {onDismissWrong && (
                <button
                  onClick={onDismissWrong}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold p-2.5 rounded-xl border border-white/30 flex items-center gap-1 text-xs sm:text-sm shrink-0 active:scale-95 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>محاولة</span>
                </button>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
