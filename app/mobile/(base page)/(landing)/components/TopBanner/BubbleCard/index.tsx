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
      className={`bg-neutral-black shadow-[3px_3px_0px_0px_#FFF] rounded-[24px] ${
        direction === 'left' ? 'rounded-br-[8px]' : 'rounded-bl-[8px]'
      } ${className}`}
    >
      <div
        className={`border border-neutral-white w-full h-full rounded-[24px] translate-x-[1px] translate-y-[1px] p-4 flex gap-4 items-center ${
          direction === 'left' ? 'rounded-br-[8px]' : 'rounded-bl-[8px]'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default BubbleCard;
