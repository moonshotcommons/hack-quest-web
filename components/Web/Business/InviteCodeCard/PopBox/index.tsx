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
        `absolute -right-[24px] top-[24px] z-[9] flex flex-col items-center`,
        className
      )}
    >
      {showPopTriangle && (
        <div className="-mb-[12px] mr-[28px] h-[24px] w-[24px] -rotate-[135deg] self-end bg-neutral-white shadow-[rgba(0,0,0,0.05)_1.5px_1.5px_1.5px]"></div>
      )}
      <div className="flex w-fit flex-col gap-y-[15px] rounded-[10px] bg-neutral-white p-5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
        {children}
      </div>
    </div>
  );
};

export default PopBox;
