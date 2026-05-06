import type { QuizScore, QuizAnswer } from '../types/quiz';
import { formatDate } from '../utils/formatDate';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnswersModal from './AnswersModal';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface ResultsModalProps {
  title: string;
  scores: QuizScore[];
  onClose: () => void;
}

export default function ResultsModal({
  title,
  scores,
  onClose,
}: ResultsModalProps) {
  const [viewingAnswers, setViewingAnswers] = useState<QuizAnswer[] | null>(
    null,
  );
  useEscapeKey(onClose);

  return (
    <>
      <motion.div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="w-full max-w-xl bg-dark-grey border border-[#505050] rounded-2xl p-6 shadow-2xl text-left"
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                Results history
              </p>
              <h3 className="text-2xl font-bold">{title}</h3>
            </div>
            <motion.button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>

          <ul className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
            {[...scores]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
              .map((entry, index) => (
                <li
                  key={`${entry.date}-${index}`}
                  className="border border-[#555] rounded-xl px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      {entry.percentage === 100 ? (
                        <p className="font-semibold text-green-400">
                          {entry.score}/{entry.totalQuestions} (
                          {entry.percentage}
                          %)
                        </p>
                      ) : (
                        <p className="font-semibold text-gray-100">
                          {entry.score}/{entry.totalQuestions} (
                          {entry.percentage}
                          %)
                        </p>
                      )}
                      <p className="text-sm mt-1">{formatDate(entry.date)}</p>
                    </div>

                    {entry.answers && entry.answers.length > 0 && (
                      <motion.button
                        onClick={() => setViewingAnswers(entry.answers!)}
                        className="results-button py-2 text-sm"
                        whileTap={{ scale: 0.98 }}
                      >
                        View answers
                      </motion.button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {viewingAnswers && (
          <AnswersModal
            title={title}
            answers={viewingAnswers}
            onClose={() => setViewingAnswers(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
