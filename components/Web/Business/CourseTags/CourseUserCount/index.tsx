import { cn, separationNumber } from '@/helper/utils';
import React from 'react';
import { BiUser } from 'react-icons/bi';

interface CourseUserCountProp {
  count: number;
  size?: number;
  className?: string;
}

const CourseUserCount: React.FC<CourseUserCountProp> = ({ count = 0, size = 16, className }) => {
  return (
    <div className={cn('body-xs flex items-center gap-[4px] text-neutral-rich-gray', className)}>
      <BiUser size={size}></BiUser>
      <span>{separationNumber(count)}</span>
    </div>
  );
};

export default CourseUserCount;
