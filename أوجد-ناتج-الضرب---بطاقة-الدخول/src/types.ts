export interface Question {
  id: number;
  num1: number;
  num2: number;
  text: string; // e.g., "0 × 6 = ؟"
  options: number[]; // 3 options
  correctAnswer: number;
  hint: string;
}

export type FeedbackState = 'none' | 'correct' | 'wrong';

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  correctAnswersCount: number;
  starsCount: number;
  timeRemaining: number; // in seconds, starts at 120 (02:00)
  isTimerRunning: boolean;
  isGameOver: boolean;
  isWon: boolean;
  history: {
    questionId: number;
    attempts: number;
    solved: boolean;
  }[];
}
