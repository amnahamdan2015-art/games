import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Sparkles, HelpCircle } from 'lucide-react';
import { Question, FeedbackState } from '../types';
import { sound } from '../utils/sound';
import { QatariBoy } from './QatariBoy';
import { NotebookBuddy } from './NotebookBuddy';
import { FlowerPetal } from './FlowerPetal';
import { FeedbackOverlay } from './FeedbackOverlay';

interface QuestionBoardProps {
  questions: Question[];
  currentQuestionIndex: number;
  feedback: FeedbackState;
  onSelectOption: (option: number) => void;
  onDismissWrong: () => void;
  solvedAnswers: Record<number, number>; // questionId -> answer
}

export const QuestionBoard: React.FC<QuestionBoardProps> = ({
  questions,
  currentQuestionIndex,
  feedback,
  onSelectOption,
  onDismissWrong,
  solvedAnswers,
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const [selectedWrongOption, setSelectedWrongOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleOptionClick = (option: number) => {
    sound.playClick();
    if (option === currentQuestion.correctAnswer) {
      setSelectedWrongOption(null);
      setShowHint(false);
      onSelectOption(option);
    } else {
      setSelectedWrongOption(option);
      onSelectOption(option);
    }
  };

  const handleDismiss = () => {
    setSelectedWrongOption(null);
    onDismissWrong();
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-3 px-2 sm:px-4 select-none">
      {/* Central Soft Lime Chalkboard Card (Matching original photo) */}
      <div className="relative bg-[#d7ecb9] rounded-3xl p-5 sm:p-7 md:p-9 shadow-xl border-4 border-[#b9db90] overflow-hidden min-h-[520px] flex flex-col justify-between">
        {/* Subtle chalkboard background texture & soft ambient glow */}
        <div className="absolute inset-0 bg-radial from-white/20 to-transparent pointer-events-none" />

        {/* Decorative corner bolts/chalk pins */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#9ebb73] opacity-60" />
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#9ebb73] opacity-60" />
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#9ebb73] opacity-60" />
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#9ebb73] opacity-60" />

        {/* Board Header: «أوجد ناتج الضرب» underlined as in the image */}
        <div className="text-center mb-6 z-10 relative">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight drop-shadow-xs font-['Tajawal',sans-serif]">
              أوجد ناتج الضرب
            </h2>
            {/* The authentic thick blackboard underline from original picture */}
            <div className="h-1.5 md:h-2 bg-slate-900 rounded-full w-full mt-1.5" />
          </div>
        </div>

        {/* Interactive Math Area */}
        <div className="z-10 flex-1 flex flex-col items-center justify-center py-2">
          {/* Active Question Focus Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl flex flex-col items-center"
            >
              {/* Question Equation Display */}
              <div className="bg-white/70 backdrop-blur-xs rounded-2xl px-6 py-4 sm:px-10 sm:py-6 shadow-md border-2 border-white flex items-center justify-center gap-3 sm:gap-5 mb-6">
                <span className="text-4xl sm:text-6xl md:text-7xl font-mono font-black text-slate-900 tracking-wider">
                  {currentQuestion.num1}
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl font-black text-amber-600">
                  ×
                </span>
                <span className="text-4xl sm:text-6xl md:text-7xl font-mono font-black text-slate-900 tracking-wider">
                  {currentQuestion.num2}
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-700">
                  =
                </span>
                <span className="text-4xl sm:text-6xl md:text-7xl font-black text-emerald-700 font-mono">
                  {feedback === 'correct' ? currentQuestion.correctAnswer : '؟'}
                </span>
              </div>

              {/* Feedback Alert Banner */}
              <FeedbackOverlay feedback={feedback} onDismissWrong={handleDismiss} />

              {/* 3 Large Touch-Friendly Answer Choice Buttons (Optimized for Smart Board) */}
              <div className="w-full mt-4">
                <div className="text-center text-slate-700 font-extrabold text-sm sm:text-base mb-3 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>المس أو انقر الإجابة الصحيحة من الخيارات الثلاثة:</span>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl mx-auto">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelectedWrong = selectedWrongOption === option && feedback === 'wrong';
                    const isSelectedCorrect = feedback === 'correct' && option === currentQuestion.correctAnswer;

                    return (
                      <motion.button
                        key={`${currentQuestion.id}-opt-${idx}`}
                        onClick={() => handleOptionClick(option)}
                        disabled={feedback === 'correct'}
                        whileHover={{ scale: feedback === 'correct' ? 1 : 1.05 }}
                        whileTap={{ scale: feedback === 'correct' ? 1 : 0.95 }}
                        animate={
                          isSelectedWrong
                            ? { x: [0, -10, 10, -8, 8, 0], backgroundColor: '#fee2e2' }
                            : isSelectedCorrect
                            ? { scale: [1, 1.1, 1], backgroundColor: '#d1fae5' }
                            : {}
                        }
                        transition={{ duration: 0.4 }}
                        className={`relative min-h-[80px] sm:min-h-[105px] md:min-h-[120px] rounded-2xl sm:rounded-3xl shadow-lg border-3 sm:border-4 font-mono font-black text-4xl sm:text-5xl md:text-6xl flex items-center justify-center cursor-pointer transition-all duration-200 select-none ${
                          isSelectedCorrect
                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-200'
                            : isSelectedWrong
                            ? 'bg-rose-100 text-rose-700 border-rose-400 shadow-rose-200'
                            : 'bg-white hover:bg-amber-50/80 text-slate-900 border-white hover:border-amber-300 shadow-slate-300/60'
                        }`}
                      >
                        {/* Choice Number */}
                        <span className="font-mono">{option}</span>

                        {/* Status Icon Badge on Option */}
                        {isSelectedCorrect && (
                          <div className="absolute top-2 left-2 w-7 h-7 sm:w-9 sm:h-9 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-md text-base sm:text-xl font-bold">
                            <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                          </div>
                        )}
                        {isSelectedWrong && (
                          <div className="absolute top-2 left-2 w-7 h-7 sm:w-9 sm:h-9 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-md text-base sm:text-xl font-bold">
                            <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                          </div>
                        )}

                        {/* Smart board touch indicator circle */}
                        <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-slate-300 opacity-50" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Math Hint for 3rd Graders */}
              <div className="mt-4 flex flex-col items-center">
                {showHint ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-amber-100 text-amber-900 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border border-amber-300 shadow-xs flex items-center gap-2"
                  >
                    <span>💡 تلميح:</span>
                    <span>{currentQuestion.hint}</span>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setShowHint(true)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white/40 hover:bg-white/70 px-3 py-1 rounded-full border border-slate-300/60 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>تحتاج مساعدة؟ تلميح خاص بالصف الثالث</span>
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Sequential Questions Overview Strip (Showing progress through all 4 equations from the card) */}
          <div className="w-full max-w-2xl mt-6 pt-4 border-t-2 border-dashed border-[#b3d789]">
            <div className="text-xs font-black text-slate-700 mb-2 flex items-center justify-between">
              <span>مسائل بطاقة الدخول الأربع:</span>
              <span className="text-emerald-800 font-bold">
                {Object.keys(solvedAnswers).length} من 4 مكتملة
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {questions.map((q, idx) => {
                const isSolved = solvedAnswers[q.id] !== undefined;
                const isCurrent = idx === currentQuestionIndex;

                return (
                  <div
                    key={q.id}
                    className={`rounded-xl p-2 text-center font-mono font-bold text-sm sm:text-base border transition-all ${
                      isSolved
                        ? 'bg-emerald-100/90 text-emerald-900 border-emerald-300 shadow-xs'
                        : isCurrent
                        ? 'bg-amber-200/90 text-amber-950 border-amber-400 ring-2 ring-amber-300 font-black'
                        : 'bg-white/50 text-slate-500 border-white/60'
                    }`}
                  >
                    <div className="text-[10px] text-slate-500 mb-0.5 font-sans font-semibold">
                      مسألة {idx + 1}
                    </div>
                    <div>
                      {q.num1} × {q.num2} = {isSolved ? (
                        <span className="text-emerald-700 font-black">{q.correctAnswer} ✓</span>
                      ) : isCurrent ? (
                        <span className="text-amber-700 animate-pulse font-black">؟</span>
                      ) : (
                        '؟'
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Area with Original Visual Elements: Notebook, Pink Flower, Qatari Boy */}
        <div className="relative mt-4 flex items-end justify-between pointer-events-none">
          {/* Bottom Left: Smiling Spiral Notebook Buddy */}
          <div className="pointer-events-auto">
            <NotebookBuddy feedback={feedback} />
          </div>

          {/* Center: Delicate Pink Flower Petal from image */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
            <FlowerPetal />
          </div>

          {/* Bottom Right: Waving Qatari Cartoon Student */}
          <div className="pointer-events-auto">
            <QatariBoy feedback={feedback} />
          </div>
        </div>
      </div>
    </div>
  );
};
