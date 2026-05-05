import type { QuizQuestion } from '../../types/quiz';

export const popQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which artist released the song "Someone You Loved"?',
    options: ['Ed Sheeran', 'Lewis Capaldi', 'Sam Smith', 'Harry Styles'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Which pop star is known for the album "1989"?',
    options: ['Taylor Swift', 'Ariana Grande', 'Dua Lipa', 'Billie Eilish'],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: 'Which band performed the hit song "As It Was"?',
    options: ['One Direction', 'Harry Styles', 'Coldplay', 'Maroon 5'],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: 'Which artist sang "Bad Guy"?',
    options: ['Olivia Rodrigo', 'Billie Eilish', 'Doja Cat', 'SZA'],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: 'Lewis Capaldi is originally from which country?',
    options: ['England', 'Ireland', 'Scotland', 'Wales'],
    correctAnswer: 2,
  },
];
