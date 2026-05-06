import { AnimatePresence, motion } from 'framer-motion';
import BrandHeader from './BrandHeader';
import QuizCard from './QuizCard';
import ResultsModal from './ResultsModal';
import type { QuizScore, QuizSet } from '../types/quiz';

interface QuizOverviewProps {
  quizzes: QuizSet[];
  resultsQuizId: string | null;
  getScoresByQuiz: (quizId: string) => QuizScore[];
  onStartQuiz: (quizId: string) => void;
  onShowResults: (quizId: string) => void;
  onCloseResults: () => void;
}

export default function QuizOverview({
  quizzes,
  resultsQuizId,
  getScoresByQuiz,
  onStartQuiz,
  onShowResults,
  onCloseResults,
}: QuizOverviewProps) {
  const resultQuiz = quizzes.find((quiz) => quiz.id === resultsQuizId) ?? null;

  return (
    <motion.main
      className="min-h-screen text-white p-6 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <BrandHeader />
      <section className="w-full max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mt-8 mb-4">
            Choose a quiz
          </h1>
          <p className="text-pink-300 max-w-2xl mx-auto">
            Choose a category from the overview. Each quiz has a different theme
            and set of questions, some with images. Test your knowledge and
            track your scores!
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onStart={() => onStartQuiz(quiz.id)}
              onShowResults={() => onShowResults(quiz.id)}
            />
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {resultQuiz && (
          <ResultsModal
            title={resultQuiz.title}
            scores={getScoresByQuiz(resultQuiz.id)}
            onClose={onCloseResults}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}
