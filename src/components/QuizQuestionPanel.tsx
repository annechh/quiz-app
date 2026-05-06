import { AnimatePresence, motion } from 'framer-motion';
import type { QuizQuestion } from '../types/quiz';

interface QuizQuestionPanelProps {
  quizTitle: string;
  currentIndex: number;
  totalQuestions: number;
  displayedScore: number;
  progressPercent: number;
  question: QuizQuestion;
  isAnswered: boolean;
  selectedOption: number | null;
  isLast: boolean;
  onSelectOption: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function QuizQuestionPanel({
  quizTitle,
  currentIndex,
  totalQuestions,
  displayedScore,
  progressPercent,
  question,
  isAnswered,
  selectedOption,
  isLast,
  onSelectOption,
  onNext,
  onBack,
}: QuizQuestionPanelProps) {
  return (
    <div className="bg-dark-grey rounded-2xl p-8 max-w-lg w-full shadow-xl">
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>
          {quizTitle}: {currentIndex + 1} of {totalQuestions}
        </span>
        <span>Score: {displayedScore}</span>
      </div>

      <div className="w-full bg-[#444] rounded-full h-2 mb-6">
        <div
          className="bg-green_1 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
        >
          <div>
            <h2 className="text-xl font-semibold mb-6">{question.question}</h2>
            {question.image && (
              <img
                src={question.image}
                alt="quiz image"
                className="w-full h-auto mb-6 rounded-xl"
              />
            )}
          </div>

          <ul className="flex flex-col gap-3 mb-8">
            {question.options.map((option, index) => {
              const style = isAnswered
                ? index === question.correctAnswer
                  ? 'border-2 border-green_1 cursor-default'
                  : index === selectedOption
                    ? 'border-2 border-red_dark cursor-default'
                    : 'border-2 border-[#555] bg-light-grey opacity-40 cursor-default'
                : 'border-2 border-[#555] bg-light-grey hover:bg-[#424242] cursor-pointer';

              return (
                <motion.li
                  key={`${currentIndex}-${index}`}
                  onClick={isAnswered ? undefined : () => onSelectOption(index)}
                  className={`rounded-xl px-4 py-3 transition-colors select-none ${style}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.06 }}
                >
                  {option}
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!isAnswered}
          className={
            isAnswered ? 'primary-button next-quiz-shake' : 'not-allowed-button'
          }
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>

      <div className="mt-4 flex justify-start">
        <button
          onClick={onBack}
          className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          Back home
        </button>
      </div>
    </div>
  );
}
