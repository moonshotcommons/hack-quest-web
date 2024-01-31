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
            `flex-center absolute right-[-16px] top-[-6px] h-[18px] w-[18px] rounded-[50%] bg-[#FCC409] font-next-book text-[11px] text-[#fff]`,
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
