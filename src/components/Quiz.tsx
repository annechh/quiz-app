import { useState } from 'react';
import QuizFinished from './QuizFinished';
import type { QuizSet, QuizScore, QuizAnswer } from '../types/quiz';
import { useQuizHistory } from '../hooks/useQuizHistory';
import { AnimatePresence, motion } from 'framer-motion';

interface QuizProps {
  quiz: QuizSet;
  onBack: () => void;
}

export default function Quiz({ quiz, onBack }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [savedScore, setSavedScore] = useState<QuizScore | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const { saveScore, getScoresByQuiz } = useQuizHistory();

  const question = quiz.questions[currentIndex];
  const isAnswered = selectedOption !== null;
  const isLast = currentIndex === quiz.questions.length - 1;

  function handleSelect(index: number) {
    if (isAnswered) return;
    setSelectedOption(index);
  }

  function handleNext() {
    if (!isAnswered) return;

    const isCorrect = selectedOption === question.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    const newAnswers = [
      ...answers,
      {
        question: question.question,
        image: question.image,
        options: question.options,
        selectedOption,
        correctAnswer: question.correctAnswer,
        isCorrect,
      },
    ];
    setAnswers(newAnswers);

    if (isLast) {
      setScore(newScore);
      const saved = saveScore(
        quiz.id,
        quiz.title,
        newScore,
        quiz.questions.length,
        newAnswers,
      );
      setSavedScore(saved);
      setFinished(true);
    } else {
      setScore(newScore);
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setFinished(false);
    setScore(0);
    setAnswers([]);
  }

  if (finished && savedScore) {
    return (
      <QuizFinished
        title={quiz.title}
        score={score}
        totalQuestions={quiz.questions.length}
        onBack={onBack}
        onRestart={handleRestart}
        allScores={getScoresByQuiz(quiz.id)}
        answers={answers}
      />
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-dark-grey rounded-2xl p-8 max-w-lg w-full shadow-xl">
        {/* Progress */}
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <span>
            {quiz.title}: {currentIndex + 1} of {quiz.questions.length}
          </span>
          <span>Score: {score}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#444] rounded-full h-2 mb-6">
          <div
            className="bg-green_1 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(currentIndex / quiz.questions.length) * 100}%`,
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            {/* Question */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                {question.question}
              </h2>
              {question.image && (
                <img
                  src={question.image}
                  alt="quiz image"
                  className="w-full h-auto mb-6 rounded-xl"
                />
              )}
            </div>

            {/* Options */}
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
                    onClick={isAnswered ? undefined : () => handleSelect(index)}
                    className={`rounded-xl px-4 py-3 transition-colors select-none ${style}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.06 }}
                    whileTap={isAnswered ? undefined : { scale: 0.98 }}
                  >
                    {option}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        <div className="flex justify-end">
          <motion.button
            onClick={handleNext}
            disabled={!isAnswered}
            whileTap={isAnswered ? { scale: 0.98 } : undefined}
            transition={{ duration: 0.25 }}
            className={
              isAnswered
                ? 'primary-button next-quiz-shake'
                : 'not-allowed-button'
            }
          >
            {isLast ? 'See results' : 'Next'}
          </motion.button>
        </div>

        <div className="mt-4 flex justify-start">
          <motion.button
            onClick={onBack}
            className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
            whileTap={{ scale: 0.98 }}
          >
            Back to overview
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
