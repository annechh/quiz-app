import type { QuizScore, QuizAnswer } from '../types/quiz';
import { useState } from 'react';
import Confetti from './Confetti';
import AnswersModal from './AnswersModal';
import ResultsModal from './ResultsModal';

interface QuizFinishedProps {
  title: string;
  score: number;
  totalQuestions: number;
  onBack: () => void;
  onRestart: () => void;
  allScores?: QuizScore[];
  answers?: QuizAnswer[];
}

export default function QuizFinished({
  title,
  score,
  totalQuestions,
  onBack,
  onRestart,
  allScores = [],
  answers = [],
}: QuizFinishedProps) {
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  const hasPerfectScore = percentage === 100;

  return (
    <div className="relative isolate overflow-hidden flex flex-col items-center justify-center min-h-screen text-white p-6">
      {hasPerfectScore && <Confetti />}

      <div className="relative z-10 bg-dark-grey rounded-2xl p-8 max-w-lg w-full text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-400 mb-3">
          {title}
        </p>
        <h2 className="text-3xl font-bold mb-4">Quiz completed!</h2>
        <p className="text-xl mb-6">
          You got <span className="text-green-400 font-bold">{score}</span> out
          of <span className="font-bold">{totalQuestions}</span> correct
        </p>
        <p className="text-lg mb-6 text-gray-300">
          Score:{' '}
          {percentage === 100 ? (
            <span className="text-green-400 font-bold">{percentage}%</span>
          ) : (
            <span className="text-blue-400 font-semibold">{percentage}%</span>
          )}
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onBack}
            className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer"
          >
            Back to overview
          </button>
          <button onClick={onRestart} className="primary-button">
            Start over
          </button>
        </div>

        {allScores.length > 1 && (
          <div className="mt-8 pt-8 border-t border-[#555] flex justify-center flex-wrap gap-3">
            <button
              onClick={() => setShowAnswersModal(true)}
              className="results-button"
            >
              View Answers
            </button>
            <button
              onClick={() => setShowResultsModal(true)}
              className="results-button"
            >
              View all Results
            </button>
          </div>
        )}

        {allScores.length === 1 && answers.length > 0 && (
          <div className="mt-8 pt-8 border-t border-[#555] flex justify-center">
            <button
              onClick={() => setShowAnswersModal(true)}
              className="results-button"
            >
              View Answers
            </button>
          </div>
        )}

        {showAnswersModal && (
          <AnswersModal
            title={title}
            answers={answers}
            onClose={() => setShowAnswersModal(false)}
          />
        )}

        {showResultsModal && (
          <ResultsModal
            title={title}
            scores={allScores}
            onClose={() => setShowResultsModal(false)}
          />
        )}
      </div>
    </div>
  );
}
