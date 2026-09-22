import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS } from './data/questions';
import { FeedbackState } from './types';
import { sound } from './utils/sound';
import { HeaderBar } from './components/HeaderBar';
import { ProgressBar } from './components/ProgressBar';
import { QuestionBoard } from './components/QuestionBoard';
import { CelebrationScreen } from './components/CelebrationScreen';
import { Clock, RotateCcw, PlusCircle } from 'lucide-react';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<FeedbackState>('none');
  const [starsCount, setStarsCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [solvedAnswers, setSolvedAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(120); // 2 minutes (02:00)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown timer effect
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0 && !isWon) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsTimerRunning(false);
            setShowTimeUpDialog(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeRemaining, isWon]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle student clicking an option
  const handleSelectOption = (selectedOption: number) => {
    const question = QUESTIONS[currentQuestionIndex];

    if (selectedOption === question.correctAnswer) {
      // Correct answer!
      setFeedback('correct');
      sound.playSuccess();

      // Only increment stars/score if question wasn't previously solved
      if (solvedAnswers[question.id] === undefined) {
        setStarsCount((prev) => prev + 1);
        setScore((prev) => prev + 100);
        setSolvedAnswers((prev) => ({ ...prev, [question.id]: selectedOption }));
      }

      // Automatically advance to the next question after a delightful delay
      setTimeout(() => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setFeedback('none');
        } else {
          // All 4 questions solved successfully!
          setIsWon(true);
          setIsTimerRunning(false);
          setFeedback('none');
        }
      }, 1300);
    } else {
      // Wrong answer!
      setFeedback('wrong');
      sound.playWrong();
    }
  };

  const handleDismissWrong = () => {
    setFeedback('none');
  };

  const handleRestartGame = () => {
    sound.playClick();
    setCurrentQuestionIndex(0);
    setFeedback('none');
    setStarsCount(0);
    setScore(0);
    setSolvedAnswers({});
    setTimeRemaining(120);
    setIsTimerRunning(true);
    setIsWon(false);
    setShowTimeUpDialog(false);
  };

  const handleToggleTimer = () => {
    sound.playClick();
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = () => {
    sound.playClick();
    setTimeRemaining(120);
    setIsTimerRunning(true);
    setShowTimeUpDialog(false);
  };

  const handleAddMoreTime = () => {
    sound.playClick();
    setTimeRemaining((prev) => prev + 60);
    setIsTimerRunning(true);
    setShowTimeUpDialog(false);
  };

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    sound.isMuted = newMuted;
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#faf7ee] text-slate-800 flex flex-col justify-between selection:bg-amber-200"
    >
      {/* Background Subtle School Paper Grid / Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage:
            'radial-gradient(#e2d9c2 1px, transparent 1px), radial-gradient(#e2d9c2 1px, #faf7ee 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 pb-4">
        {/* Top Header Trio: Watch Timer, "بطاقة دخول" Banner, School Book */}
        <HeaderBar
          timeRemaining={timeRemaining}
          isTimerRunning={isTimerRunning}
          onToggleTimer={handleToggleTimer}
          onResetTimer={handleResetTimer}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          onRestartGame={handleRestartGame}
        />

        {/* Progress Bar & Stars Counter */}
        {!isWon && (
          <ProgressBar
            currentIndex={currentQuestionIndex}
            total={QUESTIONS.length}
            starsCount={starsCount}
            score={score}
          />
        )}

        {/* Main Workspace: Active Question Board OR Celebration Screen */}
        <main className="flex-1 flex items-center justify-center py-1">
          {isWon ? (
            <CelebrationScreen
              totalQuestions={QUESTIONS.length}
              timeSpent={120 - timeRemaining}
              score={score}
              onRestart={handleRestartGame}
            />
          ) : (
            <QuestionBoard
              questions={QUESTIONS}
              currentQuestionIndex={currentQuestionIndex}
              feedback={feedback}
              onSelectOption={handleSelectOption}
              onDismissWrong={handleDismissWrong}
              solvedAnswers={solvedAnswers}
            />
          )}
        </main>

        {/* Time-Up Encouragement Dialog (for 3rd graders without anxiety) */}
        {showTimeUpDialog && !isWon && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 text-center animate-in fade-in zoom-in duration-200">
              <div className="w-16 h-16 mx-auto mb-3 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">انتهت الدقيقتان! ⏰</h3>
              <p className="text-sm font-semibold text-slate-600 mb-6">
                عمل رائع يا بطل! يمكنك إضافة دقيقة إضافية لإكمال المسائل أو البدء من جديد للحصول على بطاقة الدخول.
              </p>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleAddMoreTime}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>إضافة دقيقة إضافية (+1:00) والمتابعة</span>
                </button>
                <button
                  onClick={handleRestartGame}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>البدء من جديد (02:00)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer copyright & curriculum accreditation */}
      <footer className="relative z-10 text-center py-2 text-xs font-bold text-slate-400 select-none">
        <span>مادة الرياضيات - الصف الثالث الابتدائي • بطاقة دخول الحصة التفاعلية 🇶🇦</span>
      </footer>
    </div>
  );
}
