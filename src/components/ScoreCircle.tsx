import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScoreCircleProps {
  score: number;
  totalQuestions: number;
  percentage: number;
}

export default function ScoreCircle({
  score,
  totalQuestions,
  percentage,
}: ScoreCircleProps) {
  const countRef = useRef<{ count: number }>({ count: 0 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    const duration = 1500;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentCount = Math.floor(progress * score);
      countRef.current.count = currentCount;

      if (displayRef.current) {
        displayRef.current.textContent = String(currentCount);
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else if (displayRef.current) {
        displayRef.current.textContent = String(score);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [score]);

  const circumference = 2 * Math.PI * 90;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage === 100) return '#15803d';
    if (percentage >= 80) return '#22c55e';
    if (percentage >= 50) return '#3b82f6';
    return '#ef4444';
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-56 h-56 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#333"
            strokeWidth="8"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
            }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>

        <div className="absolute flex flex-row items-center justify-center gap-1">
          <motion.div
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span ref={displayRef}>0</span>
          </motion.div>
          <div className="text-gray-400 text-4xl">/ {totalQuestions}</div>
        </div>
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p className="text-2xl font-bold">
          {percentage === 100 ? (
            <span className="text-green-400">{percentage}%</span>
          ) : (
            <span className="text-blue-400">{percentage}%</span>
          )}
        </p>
      </motion.div>
    </div>
  );
}
