import type { QuizSet } from '../types/quiz';
import { codeQuizData } from './quizQuestions/code';
import { disneyQuizData } from './quizQuestions/disney';
import { popQuizData } from './quizQuestions/popQuiz';
import { norwayQuizData } from './quizQuestions/norway';

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
];
