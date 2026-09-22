import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    num1: 0,
    num2: 6,
    text: '0 × 6 = ؟',
    options: [0, 6, 1],
    correctAnswer: 0,
    hint: 'أي عدد نضربه في الصفر يكون الناتج صفرًا دائماً!',
  },
  {
    id: 2,
    num1: 1,
    num2: 7,
    text: '1 × 7 = ؟',
    options: [1, 7, 8],
    correctAnswer: 7,
    hint: 'أي عدد نضربه في الواحد يبقى كما هو (العنصر المحايد للضرب)!',
  },
  {
    id: 3,
    num1: 2,
    num2: 1,
    text: '2 × 1 = ؟',
    options: [3, 2, 1],
    correctAnswer: 2,
    hint: '2 مكررة مرة واحدة فقط تساوي 2!',
  },
  {
    id: 4,
    num1: 9,
    num2: 0,
    text: '9 × 0 = ؟',
    options: [9, 0, 1],
    correctAnswer: 0,
    hint: 'تذكر خاصية الضرب في صفر: الناتج دائمًا صفر!',
  },
];
