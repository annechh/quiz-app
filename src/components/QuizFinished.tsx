import type { QuizScore, QuizAnswer } from '../types/quiz';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BrandHeader from './BrandHeader';
import Confetti from './Confetti';
import AnswersModal from './AnswersModal';
import ResultsModal from './ResultsModal';
import ScoreCircle from './ScoreCircle';

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
      <BrandHeader />
      {hasPerfectScore && <Confetti />}

      <motion.div
        key="finished"
        className="relative z-10 bg-dark-grey rounded-2xl p-8 max-w-lg w-full text-center shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
          {title}
        </p>
        <h2 className="text-3xl font-bold mb-8">Quiz completed!</h2>

        <div className="mt-8 flex flex-col justify-center gap-5">
          <ScoreCircle
            score={score}
            totalQuestions={totalQuestions}
            percentage={percentage}
          />

          <button onClick={onRestart} className="primary-button">
            Start over
          </button>
          <div className="flex flex-col gap-3">
            <p>Review your answers and results:</p>
            <div className=" flex justify-center gap-3">
              <button
                onClick={() => setShowAnswersModal(true)}
                className="results-button py-2 text-sm"
              >
                Answers
              </button>
              <button
                onClick={() => setShowResultsModal(true)}
                className="results-button py-2 text-sm"
              >
                Results
              </button>
            </div>
          </div>
          <div className="flex w-full justify-start">
            <button
              onClick={onBack}
              className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Back home
            </button>
          </div>
        </div>
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
