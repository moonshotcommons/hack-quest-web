import { ChangeState } from '@/components/Common/ScrollContainer';
import { cn } from '@/helper/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React from 'react';

interface NavigationProp {
  changeState?: ChangeState;
  isMobile?: boolean;
}

const Navigation: React.FC<NavigationProp> = ({ changeState, isMobile = false }) => {
  const { handleArrowClick, leftArrowVisible, rightArrowVisible } = changeState || {};
  if (!leftArrowVisible && !rightArrowVisible) return null;
  return (
    <>
      <div
        className={cn(
          'absolute left-0 top-1/2 z-[99] flex h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/95 text-neutral-off-black drop-shadow-[0px_0px_8px_rgba(0,0,0,0.12)] transition-all hover:text-neutral-off-black  sm:bg-[rgba(244,244,244,0.8)] sm:text-neutral-medium-gray sm:hover:bg-white/95 sm:hover:text-neutral-off-black',
          {
            'h-8 w-8': isMobile
          }
        )}
        onClick={() => {
          handleArrowClick?.('left');
        }}
      >
        <ChevronLeftIcon className="h-6 w-6 sm:h-10 sm:w-10" />
      </div>
      <div
        className={cn(
          'absolute right-0 top-1/2 z-[99] flex h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/95 text-neutral-off-black drop-shadow-[0px_0px_8px_rgba(0,0,0,0.12)] transition-all hover:text-neutral-off-black  sm:bg-[rgba(244,244,244,0.8)] sm:text-neutral-medium-gray sm:hover:bg-white/95 sm:hover:text-neutral-off-black',
          {
            'h-8 w-8': isMobile
          }
        )}
        onClick={() => {
          handleArrowClick?.('right');
        }}
      >
        <ChevronRightIcon className="h-6 w-6 sm:h-10 sm:w-10" />
      </div>
    </>
  );
};

export default Navigation;
