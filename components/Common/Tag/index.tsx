import { cn } from '@/helper/utils';
import React from 'react';

interface TagProps {
  children: string;
  className?: string;
}

const Tag: React.FC<TagProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={cn(`w-fit rounded-[1.25rem] border border-solid border-[#676767] px-2 py-1 text-xs text-neutral-white`, className)}>
      {children}
    </div>
  );
};

export default Tag;
