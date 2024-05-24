import { cn } from '@/helper/utils';
import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Title: React.FC<TitleProps & Omit<React.HTMLAttributes<HTMLElement>, 'className'>> = (props) => {
  const { children, className, title, ...rest } = props;

  return (
    <div className={cn('text-h3 relative pl-[21px] text-neutral-black', className)}>
      {title || children}
      <div className="absolute left-0 top-0 h-full w-[5px] rounded-[100px] bg-yellow-dark"></div>
    </div>
  );
};

export default Title;
