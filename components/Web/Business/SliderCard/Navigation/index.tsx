import { ChangeState } from '@/components/Common/ScrollContainer';
import React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

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
        className={`flex-center absolute left-0 top-[50%] z-[5] translate-y-[-50%] cursor-pointer rounded-[50%] bg-[rgba(244,244,244,0.8)] text-neutral-medium-gray ${isMobile ? 'h-[2rem] w-[2rem]' : ' h-[56px] w-[56px] '}`}
        onClick={() => {
          handleArrowClick?.('left');
        }}
      >
        <LuChevronLeft size={40} />
      </div>
      <div
        className={`flex-center absolute right-0 top-[50%] z-[5] translate-y-[-50%] cursor-pointer rounded-[50%] bg-[rgba(244,244,244,0.8)] text-neutral-medium-gray ${isMobile ? 'h-[2rem] w-[2rem]' : ' h-[56px] w-[56px] '}`}
        onClick={() => {
          handleArrowClick?.('right');
        }}
      >
        <LuChevronRight size={40} />
      </div>
    </>
  );
};

export default Navigation;
