import type { QuizSet } from '../types/quiz';
import { useQuizHistory } from '../hooks/useQuizHistory';

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
    <article className="text-left bg-dark-grey border border-[#494949] rounded-3xl p-6 shadow-xl hover:test hover:shadow-pink transition-all h-full flex flex-col gap-2.5">
      <div className="flex flex-col flex-1/2">
        <p className="text-sm text-pink-300 font-semibold mb-3">
          {quiz.questions.length} questions
        </p>
        <h2 className="text-2xl font-bold mb-3">{quiz.title}</h2>
        <p className="text-gray-300">{quiz.description}</p>
      </div>

      <div className="h-px bg-[#4f4f4f]"></div>

      <div className="flex flex-col flex-1/2 justify-between h-full bg-pink-300/20">
        {latestScore ? (
          <div className="text-sm text-gray-200 pt-4 space-y-1">
            <p>
              Latest score: {latestScore.score}/{latestScore.totalQuestions}
            </p>
            <p>Best result: {bestPercentage}%</p>
            <p className="text-gray-400">Attempts: {scores.length}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 pt-4">No attempts yet</p>
        )}

        <div className="mt-auto flex items-center gap-3">
          <button onClick={onStart} className="primary-button">
            Start quiz
          </button>

          {scores.length > 1 && (
            <button onClick={onShowResults} className="results-button">
              View all Results
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
