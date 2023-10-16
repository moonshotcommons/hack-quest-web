import { cn } from '@/helper/utils';
import React from 'react';

interface BadgeProp {
  count: number;
  className?: string;
}
const Badge: React.FC<BadgeProp> = ({ count, className }) => {
  const renderBadge = () => {
    if (count <= 0) return null;
    else
      return (
        <div
          className={cn(
            `w-[18px] h-[18px] rounded-[50%] flex-center bg-[#FCC409] text-[#fff] text-[11px] absolute right-[-16px] top-[-6px]`,
            className
          )}
        >
          {count > 99 ? 99 : count}
        </div>
      );
  };
  return renderBadge();
};

export default Badge;
