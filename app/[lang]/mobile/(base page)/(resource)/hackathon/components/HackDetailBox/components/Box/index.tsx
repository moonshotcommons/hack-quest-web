import { cn } from '@/helper/utils';
import React, { ReactNode } from 'react';

interface BoxProp {
  children: ReactNode;
  className?: string;
}

const Box: React.FC<BoxProp> = ({ children, className }) => {
  return (
    <div
      className={cn(`rounded-[1rem] bg-neutral-white p-[1rem] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]`, className)}
    >
      {children}
    </div>
  );
};

export default Box;
