export interface QuizQuestion {
  id: number;
  question: string;
  image?: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizSet {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizScore {
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  date: string;
  percentage: number;
  answers?: QuizAnswer[];
}

export interface QuizAnswer {
  question: string;
  image?: string;
  options: string[];
  selectedOption: number;
  correctAnswer: number;
  isCorrect: boolean;
}
