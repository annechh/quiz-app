import type { QuizScore, QuizAnswer } from '../types/quiz';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

      <motion.div
        key="finished"
        className="relative z-10 bg-dark-grey rounded-2xl p-8 max-w-lg w-full text-center shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
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
          <motion.button
            onClick={onBack}
            className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer"
            whileTap={{ scale: 0.98 }}
          >
            Back to overview
          </motion.button>
          <motion.button
            onClick={onRestart}
            className="primary-button"
            whileTap={{ scale: 0.98 }}
          >
            Start over
          </motion.button>
        </div>

        {allScores.length > 1 && (
          <div className="mt-8 pt-8 border-t border-[#555] flex justify-center flex-wrap gap-3">
            <motion.button
              onClick={() => setShowAnswersModal(true)}
              className="results-button py-2 text-sm"
              whileTap={{ scale: 0.98 }}
            >
              View Answers
            </motion.button>
            <motion.button
              onClick={() => setShowResultsModal(true)}
              className="results-button py-2 text-sm"
              whileTap={{ scale: 0.98 }}
            >
              View all Results
            </motion.button>
          </div>
        )}

        {allScores.length === 1 && answers.length > 0 && (
          <div className="mt-8 pt-8 border-t border-[#555] flex justify-center">
            <motion.button
              onClick={() => setShowAnswersModal(true)}
              className="results-button py-2 text-sm"
              whileTap={{ scale: 0.98 }}
            >
              View Answers
            </motion.button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {showAnswersModal && (
            <AnswersModal
              title={title}
              answers={answers}
              onClose={() => setShowAnswersModal(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showResultsModal && (
            <ResultsModal
              title={title}
              scores={allScores}
              onClose={() => setShowResultsModal(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
