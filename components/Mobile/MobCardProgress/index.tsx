import { computeProgress } from '@/helper/formate';
import React, { useMemo } from 'react';

interface MobCardProgressProp {
  progress: number;
}

const MobCardProgress: React.FC<MobCardProgressProp> = ({ progress }) => {
  const percent = useMemo(() => {
    return `${computeProgress(progress)}%`;
  }, [progress]);
  return (
    <div className="flex w-full items-center justify-between gap-[8px]">
      <div className="h-[6px] w-full overflow-hidden rounded-[3px] bg-neutral-off-white">
        <div
          className="h-full rounded-[3px] bg-yellow-primary"
          style={{ width: percent }}
        ></div>
      </div>
      <div className="caption-10pt text-neutral-rich-gray">{percent}</div>
    </div>
  );
};

export default MobCardProgress;
