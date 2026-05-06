import { useState } from 'react';
import QuizFinished from './QuizFinished';
import ConfirmActionModal from './ConfirmActionModal';
import QuizQuestionPanel from './QuizQuestionPanel';
import type { QuizSet, QuizScore, QuizAnswer } from '../types/quiz';
import { useQuizHistory } from '../hooks/useQuizHistory';
import { motion } from 'framer-motion';

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
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const { saveScore, getScoresByQuiz } = useQuizHistory();

  const question = quiz.questions[currentIndex];
  const isAnswered = selectedOption !== null;
  const isLast = currentIndex === quiz.questions.length - 1;
  const displayedScore =
    score + (isAnswered && selectedOption === question.correctAnswer ? 1 : 0);
  const hasStartedQuiz = answers.length > 0 || isAnswered;
  const progressPercent =
    ((currentIndex + (isAnswered ? 1 : 0)) / quiz.questions.length) * 100;

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

  function handleBackClick() {
    if (!hasStartedQuiz) {
      onBack();
      return;
    }

    setShowExitConfirm(true);
  }

  function handleConfirmExit() {
    setShowExitConfirm(false);
    onBack();
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
    <>
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen text-white p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
      >
        <QuizQuestionPanel
          quizTitle={quiz.title}
          currentIndex={currentIndex}
          totalQuestions={quiz.questions.length}
          displayedScore={displayedScore}
          progressPercent={progressPercent}
          question={question}
          isAnswered={isAnswered}
          selectedOption={selectedOption}
          isLast={isLast}
          onSelectOption={handleSelect}
          onNext={handleNext}
          onBack={handleBackClick}
        />
      </motion.div>

      <ConfirmActionModal
        open={showExitConfirm}
        title={'Leave quiz?'}
        message={
          'You have already started this quiz. Do you want to end it and go back home?'
        }
        confirmText={'Yes'}
        cancelText={'No'}
        onConfirm={handleConfirmExit}
        onCancel={() => setShowExitConfirm(false)}
      />
    </>
  );
}
