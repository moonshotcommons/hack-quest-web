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
        `cursor-pointer bg-[#fff] rounded-[10px]  p-[30px] hover:-translate-y-1 transition-all duration-300 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
