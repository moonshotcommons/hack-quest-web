import { cn } from '@/helper/utils';
import { FC } from 'react';

interface LoadingMessageProps {}

const LoadingMessage: FC<LoadingMessageProps> = (props) => {
  return (
    <div className={cn('flex h-12 w-full items-center p-3')}>
      <div className="flex w-fit items-center gap-2 rounded-[8px] bg-neutral-off-white p-3 text-neutral-black">
        <span className="inline-flex h-[2px] w-[2px] animate-ping rounded-full bg-neutral-black "></span>
        <span className="inline-flex h-[2px] w-[2px] animate-ping rounded-full bg-neutral-black  delay-200"></span>
        <span className="inline-flex h-[2px] w-[2px] animate-ping rounded-full bg-neutral-black delay-500"></span>
      </div>
    </div>
  );
};

export default LoadingMessage;
