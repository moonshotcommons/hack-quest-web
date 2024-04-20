import { cn } from '@/helper/utils';
import React from 'react';

interface TitleProp {
  title: string;
  className?: string;
}

const Title: React.FC<TitleProp> = ({ title, className = '' }) => {
  return (
    <div className={cn('relative mb-[.9375rem] pl-[.8125rem] text-neutral-black', className)}>
      <span className="text-h3-mob">{title}</span>
      <span className="absolute left-0 top-0 h-full w-[.3125rem] rounded-[6.25rem] bg-yellow-dark"></span>
    </div>
  );
};

export default Title;
