import type { QuizSet } from '../types/quiz';
import { useQuizHistory } from '../hooks/useQuizHistory';
import { motion } from 'framer-motion';

interface QuizCardProps {
  quiz: QuizSet;
  onStart: () => void;
  onShowResults: () => void;
}

export default function QuizCard({
  quiz,
  onStart,
  onShowResults,
}: QuizCardProps) {
  const { getScoresByQuiz } = useQuizHistory();
  const scores = getScoresByQuiz(quiz.id);
  const latestScore = scores[scores.length - 1] ?? null;
  const bestPercentage =
    scores.length > 0
      ? Math.max(...scores.map((entry) => entry.percentage))
      : null;

  return (
    <article className="text-left bg-dark-grey rounded-3xl p-6 shadow-xl hover:test hover:shadow-pink transition-all h-full flex flex-col gap-2.5">
      <div className="flex flex-col flex-1/2 justify-between h-full">
        <div className="flex justify-between">
          <p className="text-sm text-pink-300 font-semibold mb-3">
            {quiz.questions.length} questions
          </p>
          {latestScore ? <p className="text-sm">{bestPercentage}%</p> : null}
        </div>
        <h2 className="text-2xl font-bold mb-3">{quiz.title}</h2>
        <p className="text-gray-300">{quiz.description}</p>
      </div>

      <div className="h-px bg-[#4f4f4f]"></div>

      <div className="flex flex-col flex-1/2 justify-between h-full gap-5">
        {latestScore ? (
          <div className="text-sm text-gray-200 space-y-1">
            <p>
              Latest score: {latestScore.score}/{latestScore.totalQuestions}
            </p>
            <p className="text-sm">{latestScore.percentage}%</p>
            <p className="text-gray-400">Attempts: {scores.length}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No attempts yet</p>
        )}

        <div className="mt-auto flex items-center gap-3">
          <motion.button
            onClick={onStart}
            className="primary-button"
            whileTap={{ scale: 0.98 }}
          >
            Start quiz
          </motion.button>

          {scores.length > 1 && (
            <motion.button
              onClick={onShowResults}
              className="results-button py-3"
              whileTap={{ scale: 0.98 }}
            >
              Results
            </motion.button>
          )}
        </div>
      </div>
    </article>
  );
}
