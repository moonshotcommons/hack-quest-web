import { cn } from '@/helper/utils';
import React from 'react';

interface TagProps {
  children: string;
  className?: string;
}

const Tag: React.FC<TagProps> = (props) => {
  const { children, className } = props;
  return (
    <div
      className={cn(
        `w-fit px-2 py-1 font-next-book-Thin text-[0.5625rem] rounded-[1.25rem] border border-solid border-[#676767] text-neutral-white`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
