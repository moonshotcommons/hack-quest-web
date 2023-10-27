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
        `shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)] bg-[#fff] rounded-[10px] mb-[30px] py-[30px] px-[25px]`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
