import type { QuizAnswer } from '../types/quiz';
import { motion } from 'framer-motion';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface AnswersModalProps {
  title: string;
  answers: QuizAnswer[];
  onClose: () => void;
}

export default function AnswersModal({
  title,
  answers,
  onClose,
}: AnswersModalProps) {
  useEscapeKey(onClose);

  return (
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
              Your answers
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

        <ul className="max-h-[60vh] overflow-y-auto space-y-4 pr-1">
          {answers.map((answer, index) => (
            <li
              key={index}
              className="border border-[#555] rounded-xl px-4 py-4"
            >
              <p className="font-semibold text-gray-100 mb-3">
                {index + 1}. {answer.question}
              </p>
              <ul className="space-y-1.5">
                {answer.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === answer.correctAnswer;
                  const isSelected = optionIndex === answer.selectedOption;
                  const isWrongSelected = isSelected && !isCorrect;

                  const optionStyle = isCorrect
                    ? 'border-2 border-green_1'
                    : isWrongSelected
                      ? 'border-2 border-red_dark'
                      : 'border-[#444] text-gray-400';

                  return (
                    <li
                      key={optionIndex}
                      className={`border rounded-lg px-3 py-2 text-sm flex items-center gap-2 ${optionStyle}`}
                    >
                      {option}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
