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
            `flex-center body-xs absolute right-[-16px] top-[-6px] h-[18px] w-[18px] rounded-[50%] bg-[#FCC409] text-neutral-white`,
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
