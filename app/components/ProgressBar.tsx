import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentProgress: number;
  maxProgress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentProgress, maxProgress }) => {

  const calculatePercentProgress = (current: number, max: number): number => {
    if (max === 0) return 0;
    const progress = (current / max) * 100;
    return Math.min(progress, 100);
  };


  const percentProgress = calculatePercentProgress(currentProgress, maxProgress);

  const containerVariants = {
    initial: { width: 0 },
    animate: { width: `${percentProgress}%`, transition: { duration: 1 } },
  };

  return (
    <div className="bg-lime-100 h-4 md:h-4 lg:h-6 w-full relative shadow-lg shadow-lime-400/50 my-2">
      <motion.div
        className="bg-lime-700 h-full"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      ></motion.div>
      <div className="absolute top-0 left-4 w-full h-full flex items-center justify-left">
        <span className="text-xs md:text-xs lg:text-sm text-lime-300">Rating {`${percentProgress.toFixed(2)}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
