import { computeProgress } from '@/helper/formate';
import React, { useMemo } from 'react';

interface CardProgressProp {
  progress: number;
}

const CardProgress: React.FC<CardProgressProp> = ({ progress }) => {
  const percent = useMemo(() => {
    return `${computeProgress(progress)}%`;
  }, [progress]);
  return (
    <div className="flex w-full items-center justify-between gap-[8px]">
      <div className="h-[6px] w-full overflow-hidden rounded-[3px] bg-neutral-off-white">
        <div className="h-full rounded-[3px] bg-yellow-primary" style={{ width: percent }}></div>
      </div>
      <div className="button-text-s font-bold text-neutral-rich-gray">{percent}</div>
    </div>
  );
};

export default CardProgress;
