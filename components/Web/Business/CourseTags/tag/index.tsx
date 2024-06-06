import { cn } from '@/helper/utils';
import React from 'react';

interface TagProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'large';
}

const Tag: React.FC<TagProps & Omit<React.HTMLAttributes<HTMLElement>, 'className'>> = (props) => {
  const { icon, children, className, size = 'small', ...rest } = props;
  if (!children) return null;
  return (
    <span
      className={cn(
        `button-text-s flex items-center gap-2  whitespace-nowrap`,
        size === 'large' ? 'gap-[10px] text-base' : '',
        className
      )}
      {...rest}
    >
      <span className="text-course-card-title-text-color">{icon}</span>
      <span>{children}</span>
    </span>
  );
};

export default Tag;
