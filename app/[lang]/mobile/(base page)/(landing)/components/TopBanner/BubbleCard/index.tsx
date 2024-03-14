import { FC, ReactNode } from 'react';

interface BubbleCardProps {
  children: ReactNode;
  direction: 'left' | 'right';
  className?: string;
}

const BubbleCard: FC<BubbleCardProps> = ({
  children,
  direction,
  className
}) => {
  return (
    <div
      className={`rounded-[24px] bg-neutral-black shadow-[3px_3px_0px_0px_#FFF] ${
        direction === 'left' ? 'rounded-br-[8px]' : 'rounded-bl-[8px]'
      } ${className}`}
    >
      <div
        className={`flex h-full w-full translate-x-[1px] translate-y-[1px] items-center gap-4 rounded-[24px] border border-neutral-white p-4 ${
          direction === 'left' ? 'rounded-br-[8px]' : 'rounded-bl-[8px]'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default BubbleCard;
