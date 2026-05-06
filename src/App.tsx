import { useState } from 'react';
import Quiz from './components/Quiz';
import QuizOverview from './components/QuizOverview';
import { quizSets } from './data/quizSets';
import { useQuizHistory } from './hooks/useQuizHistory';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [resultsQuizId, setResultsQuizId] = useState<string | null>(null);
  const { getScoresByQuiz } = useQuizHistory();

  const selectedQuiz =
    quizSets.find((quiz) => quiz.id === selectedQuizId) ?? null;

  if (selectedQuiz) {
    return <Quiz quiz={selectedQuiz} onBack={() => setSelectedQuizId(null)} />;
  }

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <motion.main
          key="landing"
          className="min-h-screen text-white p-6 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            type="button"
            onClick={() => setShowLanding(false)}
            className="w-full max-w-3xl rounded-4xl lg:hover:shadow-pink bg-dark-grey/95 px-8 py-16 text-center shadow-2xl cursor-pointer"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <p className="text-sm uppercase tracking-[0.45em] text-pink-300 mb-4">
              Welcome to
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">QuizZilly</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
              Click to see the quizzes and choose what you want to play.
            </p>
            <p>Enjoy and have fun!</p>
          </motion.button>
        </motion.main>
      ) : (
        <QuizOverview
          key="overview"
          quizzes={quizSets}
          resultsQuizId={resultsQuizId}
          getScoresByQuiz={getScoresByQuiz}
          onStartQuiz={setSelectedQuizId}
          onShowResults={setResultsQuizId}
          onCloseResults={() => setResultsQuizId(null)}
        />
      )}
    </AnimatePresence>
  );
}

export default App;
