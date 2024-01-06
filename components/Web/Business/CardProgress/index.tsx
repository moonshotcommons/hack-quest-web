import { computeProgress } from '@/helper/formate';
import { cn } from '@/helper/utils';
import React, { useMemo } from 'react';

interface CardProgressProp {
  progress: number;
  className?: string;
}

const CardProgress: React.FC<CardProgressProp> = ({ progress, className }) => {
  const percent = useMemo(() => {
    return `${computeProgress(progress)}%`;
  }, [progress]);
  return (
    <>
      <div className={cn('text-[#3e3e3e] text-[16px] mb-[12px]', className)}>
        Completed：<span className="font-next-book-bold">{percent}</span>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-full bg-home-learning-track-progress-bg rounded-[4px] h-[8px] overflow-hidden">
          <div
            className="h-full bg-home-learning-track-progress-active-bg rounded-[4px]"
            style={{ width: percent }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CardProgress;
