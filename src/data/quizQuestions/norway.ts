import type { QuizQuestion } from '../../types/quiz';

export const norwayQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the capital of Norway?',
    options: ['Bergen', 'Trondheim', 'Oslo', 'Stavanger'],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: 'How many counties does Norway have?',
    options: ['12', '15', '18', '20'],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: 'In what year did Norway get its constitution?',
    options: ['1776', '1814', '1905', '1945'],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "What is Norway's national bird?",
    options: ['Eagle', 'Puffin', 'White-throated dipper', 'Raven'],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: 'Which animal is this?',
    image:
      'https://images.unsplash.com/photo-1549471013-3364d7220b75?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    options: ['Hedgehog', 'Wolf', 'Moose', 'Bear'],
    correctAnswer: 2,
  },
];
