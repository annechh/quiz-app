import type { QuizQuestion, QuizSet } from '../types/quiz';
import { codeQuizData } from './quizQuestions/code';
import { disneyQuizData } from './quizQuestions/disney';
import { popQuizData } from './quizQuestions/popQuiz';
import { norwayQuizData } from './quizQuestions/norway';

export const testQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Test question: 2 + 2 = ?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
  },
];

export const quizSets: QuizSet[] = [
  {
    id: 'norge',
    title: 'Norway Quiz',
    description: 'General questions about Norway, history, and nature.',
    questions: norwayQuizData,
  },
  {
    id: 'kode',
    title: 'Code Quiz',
    description: 'A simple quiz about the web and development.',
    questions: codeQuizData,
  },
  {
    id: 'pop',
    title: 'Pop Quiz',
    description: 'A quiz about popular music and artists.',
    questions: popQuizData,
  },
  {
    id: 'disney',
    title: 'Disney Quiz',
    description: 'A quiz about Disney movies and characters.',
    questions: disneyQuizData,
  },
  {
    id: 'test',
    title: 'Test Quiz',
    description: 'Single-question quiz for quick testing.',
    questions: testQuizData,
  },
];
