import { cn } from '@/helper/utils';
import { FC, useMemo } from 'react';

interface ProgressProps {
  total: number;
  current: number;
}

const Progress: FC<ProgressProps> = ({ total, current }) => {
  const list = useMemo(() => {
    return Array.from({ length: total }, (_, i) => i);
  }, [total]);

  return (
    <div className="mb-[32px] flex w-full justify-center  gap-x-[6px]">
      {list.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(
              'h-[6px] w-10 rounded-[2px]',
              item < current ? 'bg-[#FCC409]' : 'bg-[#DADADA]'
            )}
          ></div>
        );
      })}
    </div>
  );
};

export default Progress;
