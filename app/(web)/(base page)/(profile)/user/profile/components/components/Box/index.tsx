import { cn } from '@/helper/utils';
import React, { ReactNode } from 'react';

interface BoxProp {
  children: ReactNode;
  className?: string;
}

const Box: React.FC<BoxProp> = ({ children, className }) => {
  return (
    <div
      className={cn(
        `cursor-pointer rounded-[10px] bg-[#fff]  p-[30px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
