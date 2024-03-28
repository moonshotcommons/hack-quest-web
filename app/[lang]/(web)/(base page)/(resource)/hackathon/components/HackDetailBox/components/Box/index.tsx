import { cn } from '@/helper/utils';
import React, { ReactNode } from 'react';

interface BoxProp {
  children: ReactNode;
  className?: string;
}

const Box: React.FC<BoxProp> = ({ children, className }) => {
  return (
    <div
      className={cn(`mb-[30px] rounded-[10px] bg-neutral-white px-[25px] py-[30px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]`, className)}
    >
      {children}
    </div>
  );
};

export default Box;
