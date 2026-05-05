import type { QuizScore, QuizAnswer } from '../types/quiz';

const STORAGE_KEY = 'quiz_history';

export function useQuizHistory() {
  const getAllScores = (): QuizScore[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const saveScore = (
    quizId: string,
    quizTitle: string,
    score: number,
    total: number,
    answers: QuizAnswer[] = [],
  ): QuizScore => {
    const quizScore: QuizScore = {
      quizId,
      quizTitle,
      score,
      totalQuestions: total,
      date: new Date().toISOString(),
      percentage: Math.round((score / total) * 100),
      answers,
    };

    const history = getAllScores();
    history.push(quizScore);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

    return quizScore;
  };

  const getScoresByQuiz = (quizId: string): QuizScore[] => {
    return getAllScores().filter((score) => score.quizId === quizId);
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    saveScore,
    getAllScores,
    getScoresByQuiz,
    clearHistory,
  };
}
