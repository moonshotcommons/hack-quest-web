import { cn } from '@/helper/utils';
import React from 'react';

interface TagProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'large';
}

const Tag: React.FC<
  TagProps & Omit<React.HTMLAttributes<HTMLElement>, 'className'>
> = (props) => {
  const { icon, children, className, size = 'small', ...rest } = props;

  return (
    <span
      className={cn(
        `flex gap-2 items-center text-white text-xs not-italic font-normal whitespace-nowrap`,
        size === 'large' ? 'text-base gap-[10px]' : '',
        className
      )}
      {...rest}
    >
      <span className="text-white">{icon}</span>
      <span>{children}</span>
    </span>
  );
};

export default Tag;
