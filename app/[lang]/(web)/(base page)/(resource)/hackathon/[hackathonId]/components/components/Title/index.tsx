import { cn } from '@/helper/utils';
import React from 'react';

interface TitleProp {
  title: string;
  className?: string;
}

const Title: React.FC<TitleProp> = ({ title, className = '' }) => {
  return (
    <div className={cn('relative mb-[32px] pl-[21px] text-neutral-black', className)}>
      <span className="text-h3 ">{title}</span>
      <span className="absolute left-0 top-0 h-full w-[5px] rounded-[100px] bg-yellow-dark"></span>
    </div>
  );
};

export default Title;
