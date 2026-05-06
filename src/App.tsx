import { useState } from 'react';
import Quiz from './components/Quiz';
import QuizCard from './components/QuizCard';
import ResultsModal from './components/ResultsModal';
import { quizSets } from './data/quizSets';
import { useQuizHistory } from './hooks/useQuizHistory';

function App() {
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [resultsQuizId, setResultsQuizId] = useState<string | null>(null);
  const { getScoresByQuiz } = useQuizHistory();

  const selectedQuiz =
    quizSets.find((quiz) => quiz.id === selectedQuizId) ?? null;

  if (selectedQuiz) {
    return <Quiz quiz={selectedQuiz} onBack={() => setSelectedQuizId(null)} />;
  }

  const resultQuiz = quizSets.find((quiz) => quiz.id === resultsQuizId) ?? null;

  return (
    <main className="min-h-screen text-white p-6 flex items-center justify-center">
      <section className="w-full max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-400 mb-3">
            Quiz App
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose a quiz</h1>
          <p className="text-pink-300 max-w-2xl mx-auto">
            Choose a category from the overview. Each quiz has a different theme
            and set of questions, some with images. Test your knowledge and
            track your scores!
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {quizSets.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onStart={() => setSelectedQuizId(quiz.id)}
              onShowResults={() => setResultsQuizId(quiz.id)}
            />
          ))}
        </div>
      </section>

      {resultQuiz && (
        <ResultsModal
          title={resultQuiz.title}
          scores={getScoresByQuiz(resultQuiz.id)}
          onClose={() => setResultsQuizId(null)}
        />
      )}
    </main>
  );
}

export default App;
