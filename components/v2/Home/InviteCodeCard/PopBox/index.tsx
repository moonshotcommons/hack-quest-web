import { cn } from '@/helper/utils';
import { FC, ReactNode } from 'react';

interface PopBoxProps {
  children: ReactNode;
  className?: string;
  showPopTriangle?: boolean;
}

const PopBox: FC<PopBoxProps> = ({
  children,
  className,
  showPopTriangle = false
}) => {
  return (
    <div
      className={cn(
        `absolute z-[9] flex flex-col items-center -right-[24px] top-[24px]`,
        className
      )}
    >
      {showPopTriangle && (
        <div className="w-[24px] h-[24px] -rotate-[135deg] bg-white self-end -mb-[12px] mr-[28px] shadow-[rgba(0,0,0,0.05)_1.5px_1.5px_1.5px]"></div>
      )}
      <div className="p-5 flex flex-col bg-white rounded-[10px] w-fit gap-y-[15px] shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
        {children}
      </div>
    </div>
  );
};

export default PopBox;
