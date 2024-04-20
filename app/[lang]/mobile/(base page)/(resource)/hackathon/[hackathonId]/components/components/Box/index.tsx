import { cn } from '@/helper/utils';
import React, { ReactNode } from 'react';

interface BoxProp {
  children: ReactNode;
  className?: string;
}

const Box: React.FC<BoxProp> = ({ children, className }) => {
  return (
    <div className={cn(`overflow-hidden rounded-[1rem] border border-neutral-light-gray bg-neutral-white`, className)}>
      {children}
    </div>
  );
};

export default Box;
