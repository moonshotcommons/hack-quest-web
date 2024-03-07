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
        `flex items-center gap-2 whitespace-nowrap font-GT-Walsheim-Trial text-[.75rem] font-normal not-italic leading-[100%] text-white`,
        size === 'large' ? 'gap-[10px] text-base' : '',
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
