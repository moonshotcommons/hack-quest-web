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
    <div className="w-full flex items-center justify-between gap-[8px]">
      <div className="w-full bg-neutral-off-white rounded-[3px] h-[6px] overflow-hidden">
        <div
          className="h-full bg-yellow-primary rounded-[3px]"
          style={{ width: percent }}
        ></div>
      </div>
      <div className="text-neutral-rich-gray button-text-s font-bold">
        {percent}
      </div>
    </div>
  );
};

export default CardProgress;
